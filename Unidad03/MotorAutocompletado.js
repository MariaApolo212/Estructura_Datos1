// Estructura del Nodo Trie con enfoque Green Computing (Ahorro de RAM)
class NodoTrie {
    constructor() {
        // Usamos Map en lugar de Array [26] para evitar el desperdicio de memoria
        // en nodos dispersos, reduciendo la huella energética del servidor.
        this.hijos = new Map();
        this.esFinDePalabra = false;
    }
}

class MotorAutocompletado {
    constructor() {
        this.raiz = new NodoTrie();
    }

    // Inserción eficiente: solo se crean nodos para caracteres presentes
    insertarTermino(termino) {
        let actual = this.raiz;
        const palabra = termino.toLowerCase();

        for (const char of palabra) {
            if (!actual.hijos.has(char)) {
                actual.hijos.set(char, new NodoTrie());
            }
            actual = actual.hijos.get(char);
        }
        actual.esFinDePalabra = true;
    }

    buscarNodoPrefijo(prefijo) {
        let actual = this.raiz;
        const p = prefijo.toLowerCase();

        for (const char of p) {
            if (!actual.hijos.has(char)) return null;
            actual = actual.hijos.get(char);
        }
        return actual;
    }

    obtenerSugerencias(prefijo) {
        const resultados = [];
        const nodoInicial = this.buscarNodoPrefijo(prefijo);
        
        if (nodoInicial) {
            this.dfsExtraerPalabras(nodoInicial, prefijo.toLowerCase(), resultados);
        }
        return resultados;
    }

    // DFS Optimizado para evitar desbordamiento de pila y fugas de memoria
    dfsExtraerPalabras(nodo, palabraActual, resultados) {
        if (nodo.esFinDePalabra) {
            resultados.push(palabraActual);
        }
        
        for (const [char, hijo] of nodo.hijos) {
            this.dfsExtraerPalabras(hijo, palabraActual + char, resultados);
        }
    }
}
// ==========================================
// TAREA 3: SIMULADOR DE BARRA DE BÚSQUEDA
// ==========================================

// 1. Inicialización y Carga de Diccionario
const motor = new MotorAutocompletado();

// Diccionario de términos logísticos para simulación
const diccionario = [
    "paquete_express", 
    "postal_nacional", 
    "prioritario", 
    "estandar", 
    "perecedero"
];

// Carga de términos al Trie
diccionario.forEach(termino => motor.insertarTermino(termino));
console.log("Diccionario de paquetería cargado exitosamente en el Trie.");


// 2. Guía para la Simulación de Búsqueda
console.log("\n--- Búsqueda Manual ---");
console.log("Sugerencias para 'p':", motor.obtenerSugerencias("p"));
console.log("Sugerencias para 'pa':", motor.obtenerSugerencias("pa"));
console.log("Sugerencias para 'pos':", motor.obtenerSugerencias("pos"));


// 3. Prueba de Bucle Iterativo con Medición de Tiempo (Análisis de Escalabilidad)
const prefijosPrueba = ["p", "pa", "pos", "e", "pe"];
console.log("\n--- Simulación de Bucle de Búsqueda (Carga de Trabajo) ---");

prefijosPrueba.forEach(prefijo => {
    console.time(`Tiempo_Busqueda_${prefijo}`); // Medición de latencia en ms
    const resultados = motor.obtenerSugerencias(prefijo);
    console.timeEnd(`Tiempo_Busqueda_${prefijo}`);
    console.log(`> Sugerencias para '${prefijo}':`, resultados);
});
