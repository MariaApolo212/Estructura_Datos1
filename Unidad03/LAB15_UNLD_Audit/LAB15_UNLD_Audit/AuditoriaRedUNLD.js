/**
 * @fileoverview Módulo de auditoría de red de distribución urbana y pruebas de estrés (UNLD).
 * @module AuditoriaRedUNLD
 */

/**
 * Clase encargada de gestionar la topología de los centros de acopio
 * y ejecutar las pruebas de estrés mediante simulación estocástica.
 * 
 * @class AuditoriaRedUrbana
 */
class AuditoriaRedUrbana {

    /**
     * Constructor: Inicializa la estructura para almacenar los centros.
     * Usamos Map (Tabla Hash) para acceso rápido en tiempo constante.
     * 
     * @constructor
     * @complexity O(1) - La creación e inicialización de la estructura Map toma tiempo constante.
     */
    constructor() {
        /**
         * Almacena los centros de acopio: clave = ID, valor = lista de paquetes.
         * @type {Map<number, Array<string>>}
         */
        this.centrosAcopio = new Map();
    }

    /**
     * Método que simula la carga masiva de eventos aleatorios.
     * Aplica el método de Monte Carlo con distribución uniforme.
     * 
     * @param {number} cantidadEventos - Total de operaciones a simular.
     * @returns {void} No retorna ningún valor, imprime resultados en consola.
     * 
     * @complexity O(n) - Donde 'n' es la cantidadEventos. Las operaciones en el Map 
     * (.has, .set, .get) y el .push del Array toman tiempo constante O(1), por lo que 
     * el tiempo de ejecución crece de forma lineal respecto al número de eventos.
     */
    simularCargaEstocastica(cantidadEventos) {
        console.log("=== INICIANDO AUDITORÍA DE ESTRÉS ===");
        console.log(`Cantidad de eventos a simular: ${cantidadEventos}\n`);

        // Repetimos la operación la cantidad de veces indicada
        for (let i = 0; i < cantidadEventos; i++) {

            // Generamos un ID aleatorio de centro (valores entre 0 y 99)
            // Distribución uniforme: todos los números tienen la misma probabilidad
            const idCentro = Math.floor(Math.random() * 100);

            // Verificamos si el centro ya existe en la red
            if (!this.centrosAcopio.has(idCentro)) {
                // Si no existe, lo creamos con una lista vacía de paquetes
                this.centrosAcopio.set(idCentro, []);
            }

            // Agregamos un paquete aleatorio al centro seleccionado
            this.centrosAcopio.get(idCentro).push(`Paquete-Eco-${i}`);
        }

        // Mostramos los resultados finales de la auditoría
        console.log("=== AUDITORÍA FINALIZADA ===");
        console.log(`Total de centros de acopio activos: ${this.centrosAcopio.size}`);
        console.log(`Eventos procesados correctamente: ${cantidadEventos}`);
    }
}

// ------------------- EJECUCIÓN DE LA PRUEBA -------------------
// Creamos una instancia de la auditoría
const auditoria = new AuditoriaRedUrbana();

// Ejecutamos la prueba con 10,000 eventos como solicita la guía
auditoria.simularCargaEstocastica(10000);