/**
 * @module LogisticaVerde
 * @description Módulo para la optimización de rutas de flotas eléctricas.
 */

class LogisticaGrafo {
/**
   * @private
   * @type {Map<number, Map<number, number>>}
   */
#rutas;

/**
   * Inicializa la red logística.
   * @param {number} totalCentros - Número total de centros de acopio en la red.
   */
constructor(totalCentros) {
    if (!Number.isInteger(totalCentros) || totalCentros <= 0) {
    throw new Error("El número de centros debe ser un entero positivo.");
    }
    this.totalCentros = totalCentros;
    this.#rutas = new Map();

    // Inicializamos el grafo con Mapas para búsquedas O(1)
    for (let i = 0; i < totalCentros; i++) {
    this.#rutas.set(i, new Map());
    }
}

/**
   * Añade una ruta entre dos centros con su impacto energético estimado.
   * @param {number} origen - ID del centro de acopio de origen.
   * @param {number} destino - ID del centro de acopio de destino.
   * @param {number} consumoKwh - Consumo energético estimado en kWh (debe ser >= 0).
   * @throws {Error} Si los centros son inválidos o el consumo es negativo.
   */
agregarRuta(origen, destino, consumoKwh) {
    if (!this.#rutas.has(origen) || !this.#rutas.has(destino)) {
    throw new Error("El centro de origen o destino no existe en la red.");
    }
    if (consumoKwh < 0) {
    throw new Error("El consumo energético no puede ser negativo (viola la condición de Dijkstra).");
    }
    
    // Almacenamos la ruta. Usamos Map interno para evitar colisiones de propiedades
    this.#rutas.get(origen).set(destino, consumoKwh);
}

/**
   * Calcula la ruta de menor consumo energético (Dijkstra).
   * @param {number} inicio - Centro de partida.
   * @param {number} fin - Centro de destino.
   * @returns {{ ruta: number[], consumoTotal: number }} Objeto inmutable con el resultado.
   */
dijkstra(inicio, fin) {
    const consumoMinimo = new Map();
    const centroAnterior = new Map();
    const centrosNoVisitados = new Set(this.#rutas.keys());

    // Inicialización al infinito (consumo máximo teórico)
    for (let i = 0; i < this.totalCentros; i++) {
    consumoMinimo.set(i, Infinity);
    }
    consumoMinimo.set(inicio, 0);

    while (centrosNoVisitados.size > 0) {
      // 1. Encontrar el centro no visitado con el menor consumo acumulado
    let centroActual = null;
    for (const centro of centrosNoVisitados) {
        if (centroActual === null || consumoMinimo.get(centro) < consumoMinimo.get(centroActual)) {
        centroActual = centro;
        }
    }

      // Si llegamos al destino o no hay rutas viables, terminamos
    if (centroActual === fin || consumoMinimo.get(centroActual) === Infinity) {
        break;
    }

    centrosNoVisitados.delete(centroActual);

      // 2. Evaluar vecinos y actualizar el consumo si encontramos una ruta más "verde"
    const vecinos = this.#rutas.get(centroActual);
    for (const [vecino, consumoHaciaVecino] of vecinos.entries()) {
        if (centrosNoVisitados.has(vecino)) {
        const consumoTotalPosible = consumoMinimo.get(centroActual) + consumoHaciaVecino;

        if (consumoTotalPosible < consumoMinimo.get(vecino)) {
            consumoMinimo.set(vecino, consumoTotalPosible);
            centroAnterior.set(vecino, centroActual);
        }
        }
    }
    }

    // 3. Reconstruir la ruta óptima
    const rutaOptima = [];
    let pasoActual = fin;
    
    if (centroAnterior.has(pasoActual) || pasoActual === inicio) {
    while (pasoActual !== undefined) {
        rutaOptima.unshift(pasoActual);
        pasoActual = centroAnterior.get(pasoActual);
    }
    }

    // Retornamos un objeto inmutable (Object.freeze previene mutaciones accidentales en el resultado)
    return Object.freeze({
    ruta: rutaOptima,
    consumoTotal: consumoMinimo.get(fin)
    });
}
}

export default LogisticaGrafo;

