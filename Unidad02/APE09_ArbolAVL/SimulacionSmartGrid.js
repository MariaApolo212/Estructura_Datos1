const ArbolAVLSensores = require("./ArbolAVLSensores");

class RegistroEnergia {
    constructor() {
        // Generación de un registro de energía ficticio (ej. 110V a 240V)
        this.voltaje = +(110 + Math.random() * 130).toFixed(2);
    }
}

// Clase para la simulación principal
class SimulacionSmartGrid {
    static ejecutarPrueba() {
        const redElectrica = new ArbolAVLSensores();
        const numSensores = 100000;

        console.log(`Iniciando despliegue de ${numSensores} sensores inteligentes...`);

        // 1 y 2. Inserción completamente secuencial
        // (Esto provocaría el peor caso O(n) en un BST normal)
        const inicioInsercion = performance.now();

        for (let i = 0; i < numSensores; i++) {
            let lectura = new RegistroEnergia();
            redElectrica.insertar(i, lectura);
        }

        const finInsercion = performance.now();
        const tiempoInsercionMs = finInsercion - inicioInsercion;

        console.log("Red eléctrica AVL construida y balanceada con éxito.");
        console.log(`Tiempo total de inserción de ${numSensores} sensores: ${tiempoInsercionMs.toFixed(4)} ms.`);

        // 3. Medición del tiempo de búsqueda
        const idBuscado = 99999;

        // Capturamos el tiempo con precisión submilisegundo en JS
        const inicioBusqueda = performance.now();

        const resultado = redElectrica.buscar(idBuscado);

        const finBusqueda = performance.now();
        const tiempoMs = finBusqueda - inicioBusqueda;

        console.log(`Tiempo de búsqueda del Sensor ID ${idBuscado}: ${tiempoMs.toFixed(4)} ms.`);
        console.log("Resultado encontrado:", resultado);

        // Altura final del árbol, para verificar que está balanceado (≈ log2(n))
        console.log(`Altura final del árbol AVL: ${redElectrica.getAltura(redElectrica.raiz)}`);
        console.log(`log2(${numSensores}) ≈ ${Math.log2(numSensores).toFixed(4)}`);
    }
}

// Iniciar simulación
SimulacionSmartGrid.ejecutarPrueba();