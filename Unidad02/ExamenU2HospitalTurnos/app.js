/**
 * ============================================================
 * app.js · Controlador de la Interfaz de Usuario
 * Conecta la lógica de la Cola con los elementos del DOM
 * ============================================================
 */

// ---- Instancia global del gestor ----
const gestor = new GestorTurnos();

// ---- Resultados acumulados de pruebas de rendimiento ----
const resultadosPruebas = [];

// ============================================================
// OBJETO UI: Contiene todas las funciones que interactúan
// con la interfaz HTML (DOM).
// ============================================================
const UI = {

  /**
   * Registra un nuevo paciente desde el formulario HTML
   * y actualiza la vista de la cola.
   */
  registrar() {
    const nombre = document.getElementById('inputNombre').value.trim();
    const especialidad = document.getElementById('selectEspecialidad').value;
    const prioridad = document.querySelector('input[name="prioridad"]:checked').value;

    // Validación básica
    if (!nombre) {
      this.toast('Por favor ingresa el nombre del paciente.', 'warn');
      document.getElementById('inputNombre').focus();
      return;
    }

    // Llamar al gestor para registrar el paciente en la cola
    const paciente = gestor.registrarPaciente(nombre, especialidad, prioridad);

    // Limpiar campo de nombre
    document.getElementById('inputNombre').value = '';

    // Registrar evento en el log
    this.log(`✅ Registrado: ${paciente.nombre} · ${paciente.turno} · ${especialidad}`, 'success');
    this.toast(`Turno asignado: ${paciente.turno}`, 'success');

    // Actualizar la interfaz
    this.actualizarCola();
    this.actualizarStats();
  },

  /**
   * Atiende al siguiente paciente en la cola (FIFO)
   * y muestra los resultados.
   */
  atender() {
    const paciente = gestor.atenderSiguiente();

    if (!paciente) {
      this.toast('No hay pacientes en la cola.', 'warn');
      this.log('⚠️ Intento de atención: cola vacía.', 'warn');
      return;
    }

    this.log(
      `▶ Atendido: ${paciente.nombre} (${paciente.turno}) · ${paciente.especialidad}`,
      'info'
    );
    this.toast(`${paciente.nombre} fue atendido ✓`, 'success');

    this.actualizarCola();
    this.actualizarStats();
  },

  /**
   * Cancela el turno de un paciente según el ID ingresado
   * en el campo de texto correspondiente.
   */
  cancelar() {
    const id = document.getElementById('inputCancelar').value.trim();
    if (!id) {
      this.toast('Ingresa un ID de paciente válido.', 'warn');
      return;
    }

    const ok = gestor.cancelarTurno(id);
    if (ok) {
      this.log(`❌ Cancelado: turno del paciente ${id}`, 'danger');
      this.toast(`Turno de ${id} cancelado.`, 'danger');
      document.getElementById('inputCancelar').value = '';
    } else {
      this.toast(`No se encontró el ID "${id}" en la cola.`, 'warn');
      this.log(`⚠️ Cancelación fallida: ID ${id} no encontrado.`, 'warn');
    }

    this.actualizarCola();
    this.actualizarStats();
  },

  /**
   * Lanza la simulación recursiva de re-consultas.
   * Un paciente pasa por múltiples etapas del sistema de salud.
   */
  simularRecursivo() {
    const nombre = document.getElementById('inputRecNombre').value.trim() || 'Paciente Ejemplo';
    const profundidad = parseInt(document.getElementById('inputRecProfundidad').value) || 3;

    // Etapas de atención hospitalaria (modelo real)
    const etapas = [
      'Consulta Inicial',
      'Laboratorio / Exámenes',
      'Revisión de Resultados',
      'Farmacia'
    ].slice(0, Math.min(profundidad, 4));

    this.log(`🔄 INICIO simulación recursiva: ${nombre} (${etapas.length} etapas)`, 'info');

    // Llamar a la función recursiva con un callback para el log
    simularReconsulta(gestor, nombre, profundidad, etapas, (msg, tipo) => {
      this.log(msg, tipo);
    });

    this.actualizarCola();
    this.actualizarStats();
  },

  /**
   * Ejecuta una prueba de rendimiento con N registros,
   * añade el resultado a la tabla acumulada.
   * @param {number} n - Cantidad de pacientes
   */
  ejecutarPrueba(n) {
    // Crear una instancia temporal para no afectar el sistema principal
    const gestorPrueba = new GestorTurnos();

    this.toast(`Ejecutando prueba con ${n.toLocaleString()} registros...`, 'info');
    this.log(`⏱ Iniciando prueba de rendimiento: ${n.toLocaleString()} registros...`, 'info');

    // Usar setTimeout para no bloquear el hilo UI en volúmenes grandes
    setTimeout(() => {
      const resultado = PruebasRendimiento.ejecutar(n, gestorPrueba);
      resultadosPruebas.push(resultado);

      this.log(
        `📊 Prueba ${n.toLocaleString()}: inserción ${resultado.tiempoInsercionMs}ms · atención ${resultado.tiempoAtencionMs}ms · total ${resultado.tiempoTotalMs}ms`,
        'success'
      );

      this.renderizarTablaPruebas();
    }, 50);
  },

  /**
   * Renderiza la tabla con todos los resultados de pruebas
   * de rendimiento acumulados hasta el momento.
   */
  renderizarTablaPruebas() {
    const contenedor = document.getElementById('tablaRendimiento');
    if (resultadosPruebas.length === 0) {
      contenedor.innerHTML = '<p class="hint" style="padding:12px 0">Haz clic en un volumen para iniciar la prueba.</p>';
      return;
    }

    /**
     * Clasifica el tiempo total en una etiqueta de rendimiento
     * @param {string} msStr - Tiempo en milisegundos como string
     * @returns {string} HTML del badge de rendimiento
     */
    const badge = (msStr) => {
      const ms = parseFloat(msStr);
      if (ms < 50)   return `<span class="tag-fast">⚡ Rápido</span>`;
      if (ms < 500)  return `<span class="tag-med">⚠ Medio</span>`;
      return              `<span class="tag-slow">🐢 Lento</span>`;
    };

    const filas = resultadosPruebas.map(r => `
      <tr>
        <td><strong>${r.registros.toLocaleString()}</strong></td>
        <td class="mono">${r.tiempoInsercionMs} ms</td>
        <td class="mono">${r.tiempoAtencionMs} ms</td>
        <td class="mono">${r.tiempoTotalMs} ms</td>
        <td class="mono">${r.operacionesPorSegundo.toLocaleString()} op/s</td>
        <td>${badge(r.tiempoTotalMs)}</td>
      </tr>
    `).join('');

    contenedor.innerHTML = `
      <table class="perf-table">
        <thead>
          <tr>
            <th>Registros</th>
            <th>Inserción</th>
            <th>Atención</th>
            <th>Total</th>
            <th>Op/seg</th>
            <th>Clasificación</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    `;
  },

  /**
   * Actualiza la lista visual de la cola de espera
   * leyendo el estado actual del GestorTurnos.
   */
  actualizarCola() {
    const lista = document.getElementById('listaEspera');
    const badge = document.getElementById('badgeCola');
    const pacientes = gestor.colaEspera.aArray();

    badge.textContent = pacientes.length;

    if (pacientes.length === 0) {
      lista.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🏥</span>
          <p>No hay pacientes en espera.</p>
        </div>`;
      return;
    }

    lista.innerHTML = pacientes.map((p, i) => `
      <div class="queue-item queue-item--${p.prioridad}">
        <span class="q-pos">${i + 1}</span>
        <span class="q-turno">${p.turno}</span>
        <div class="q-info">
          <div class="q-nombre">${p.nombre}</div>
          <div class="q-detalle">${p.especialidad}</div>
          <div class="q-id">${p.id}</div>
        </div>
        <span class="q-badge q-badge--${p.prioridad}">${p.prioridad}</span>
      </div>
    `).join('');
  },

  /**
   * Actualiza los contadores del header y pie de estadísticas.
   */
  actualizarStats() {
    const s = gestor.obtenerEstadisticas();
    document.getElementById('hEspera').textContent     = s.enEspera;
    document.getElementById('hAtendidos').textContent  = s.totalAtendidos;
    document.getElementById('hCancelados').textContent = s.totalCancelados;
  },

  /**
   * Añade una entrada al log visual de eventos con timestamp.
   * @param {string} mensaje - Texto del evento
   * @param {string} tipo    - 'success' | 'danger' | 'info' | 'warn'
   */
  log(mensaje, tipo = 'info') {
    const log = document.getElementById('logEventos');
    const hora = new Date().toLocaleTimeString('es-EC', { hour12: false });
    const entry = document.createElement('p');
    entry.className = `log-entry log-entry--${tipo}`;
    entry.innerHTML = `<span class="log-time">[${hora}]</span>${mensaje}`;
    log.prepend(entry);

    // Limitar a 100 entradas para no saturar el DOM
    while (log.children.length > 100) {
      log.removeChild(log.lastChild);
    }
  },

  /**
   * Muestra un toast (notificación flotante) temporal.
   * @param {string} msg  - Mensaje a mostrar
   * @param {string} tipo - 'success' | 'danger' | 'info' | 'warn'
   */
  toast(msg, tipo = 'info') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast toast--visible toast--${tipo}`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.className = 'toast'; }, 3000);
  },

  /**
   * Limpia el log de eventos visual.
   */
  limpiarLog() {
    document.getElementById('logEventos').innerHTML =
      '<p class="log-entry log-entry--info">🟢 Log reiniciado.</p>';
  },

  /**
   * Resetea todo el sistema: cola, estadísticas y UI.
   */
  limpiar() {
    if (!confirm('¿Deseas limpiar todo el sistema? Se perderán todos los turnos activos.')) return;
    gestor.resetear();
    resultadosPruebas.length = 0;
    this.actualizarCola();
    this.actualizarStats();
    this.renderizarTablaPruebas();
    this.log('🗑 Sistema reiniciado completamente.', 'warn');
    this.toast('Sistema limpiado.', 'warn');
  }
};

// ---- Permitir registrar con Enter en el campo de nombre ----
document.getElementById('inputNombre').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') UI.registrar();
});

// ---- Renderizado inicial ----
UI.actualizarCola();
UI.actualizarStats();
