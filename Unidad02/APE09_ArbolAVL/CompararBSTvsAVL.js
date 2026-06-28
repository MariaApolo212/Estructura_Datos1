const ArbolBSTSensores = require("./ArbolBSTSensores");

class RegistroEnergia {
    constructor() {
        this.voltaje = +(110 + Math.random() * 130).toFixed(2);
    }
}

function probarBST(numSensores) {
    console.log(`\n--- BST simple (sin balanceo) con ${numSensores} sensores secuenciales ---`);
    const red = new ArbolBSTSensores();

    try {
        const inicioInsercion = performance.now();
        for (let i = 0; i < numSensores; i++) {
            red.insertar(i, new RegistroEnergia());
        }
        const finInsercion = performance.now();
        console.log(`Inserción completada: ${(finInsercion - inicioInsercion).toFixed(4)} ms`);

        const idBuscado = numSensores - 1;
        const inicioBusqueda = performance.now();
        const resultado = red.buscar(idBuscado);
        const finBusqueda = performance.now();

        console.log(`Búsqueda ID ${idBuscado}: ${(finBusqueda - inicioBusqueda).toFixed(4)} ms`);
        console.log("Resultado:", resultado ? "encontrado" : "no encontrado");

    } catch (error) {
        console.log(`>>> ERROR: ${error.message}`);
        console.log(">>> El árbol degeneró en una lista enlazada de profundidad N");
        console.log(">>> La recursión de _insertar/_buscar agotó la pila de llamadas (stack)");
    }
}

// Con pocos miles ya empieza a notarse la degradación
probarBST(1000);
probarBST(10000);
probarBST(100000); // aquí se espera el "Maximum call stack size exceeded"