// =====================================================================
// TAREA 2: DEFINICIÓN DE CLASES (TDA Árbol Binario de Búsqueda)
// =====================================================================

// Estructura del Nodo del Índice [cite: 37]
class NodoBusqueda {
    constructor(keyword, urlCache) {
        this.keyword = keyword;       // Llave de búsqueda (ej. "estructura de datos") [cite: 45, 54]
        this.urlCache = urlCache;     // Valor (ej. "es.wikipedia.org/...") [cite: 47, 56]
        this.visitas = 1;             // Frecuencia de búsqueda [cite: 52, 59]
        this.izquierdo = null;        // [cite: 57]
        this.derecho = null;          // [cite: 58]
    }
}

// Implementación del TDA Árbol Binario de Búsqueda [cite: 60]
class MotorIndexacionBST {
    constructor() {
        this.raiz = null;             // [cite: 64]
    }

    // Indexar nueva consulta de forma ITERATIVA (Inmune a Stack Overflow) [cite: 65]
    indexar(keyword, urlCache) {
        const nuevoNodo = new NodoBusqueda(keyword, urlCache); // [cite: 67]
        
        if (this.raiz === null) {
            this.raiz = nuevoNodo; // [cite: 69]
            return;
        }

        let nodoActual = this.raiz;
        while (true) {
            // Comparación alfabética exacta usando localeCompare [cite: 80]
            const comparacion = keyword.localeCompare(nodoActual.keyword);

            if (comparacion === 0) {
                // Si el 'keyword' ya existe, incrementamos las visitas [cite: 81, 82]
                nodoActual.visitas += 1;
                return;
            } else if (comparacion < 0) {
                // Ir al subárbol izquierdo
                if (nodoActual.izquierdo === null) {
                    nodoActual.izquierdo = nuevoNodo;
                    return;
                }
                nodoActual = nodoActual.izquierdo;
            } else {
                // Ir al subárbol derecho
                if (nodoActual.derecho === null) {
                    nodoActual.derecho = nuevoNodo;
                    return;
                }
                nodoActual = nodoActual.derecho;
            }
        }
    }

    // Buscar una palabra clave (Implementación ITERATIVA) [cite: 83, 85]
    buscar(keyword) {
        let nodoActual = this.raiz;
        let ciclosCPU = 0; // Variable que cuenta cuántas comparaciones realiza [cite: 98]

        while (nodoActual !== null) {
            ciclosCPU++;
            const comparacion = keyword.localeCompare(nodoActual.keyword);

            if (comparacion === 0) {
                return { nodo: nodoActual, ciclosCPU: ciclosCPU };
            } else if (comparacion < 0) {
                nodoActual = nodoActual.izquierdo;
            } else {
                nodoActual = nodoActual.derecho;
            }
        }

        return { nodo: null, ciclosCPU: ciclosCPU }; // No encontrado [cite: 87]
    }

    // Recorrido Inorden para exportar de forma ordenada (A-Z) [cite: 89]
    exportarHistorial(nodo = this.raiz, resultado = []) {
        if (nodo !== null) {
            this.exportarHistorial(nodo.izquierdo, resultado);
            resultado.push({ keyword: nodo.keyword, visitas: nodo.visitas, url: nodo.urlCache });
            this.exportarHistorial(nodo.derecho, resultado);
        }
        return resultado;
    }
}


// =====================================================================
// TAREA 3: SCRIPT DE AUDITORÍA ENERGÉTICA [cite: 94]
// =====================================================================

// Algoritmo de barajado Fisher-Yates [cite: 106]
function barajar(array) {
    let lista = [...array];
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

// 1. Generar 20,000 palabras en estricto orden alfabético 
console.log("Generando base de datos de 20,000 elementos...");
let palabrasSecuenciales = [];
for (let i = 0; i < 20000; i++) {
    let formatoNumero = String(i).padStart(5, '0');
    palabrasSecuenciales.push(`clave-${formatoNumero}`);
}

// SIMULACIÓN 1: PEOR ESCENARIO (Alta Huella de Carbono) [cite: 96]
const motorDegenerado = new MotorIndexacionBST();

// Inyectar datos secuenciales 
palabrasSecuenciales.forEach(p => motorDegenerado.indexar(p, `https://cache.unl.edu.ec/${p}`));

// Buscar el último elemento ingresado [cite: 103]
const ultimaPalabra = palabrasSecuenciales[palabrasSecuenciales.length - 1];
const resultadoPeor = motorDegenerado.buscar(ultimaPalabra);

console.log("\n--- PEOR ESCENARIO ---");
console.log(`Búsqueda en árbol degenerado: [${resultadoPeor.ciclosCPU}] ciclos de CPU`); // [cite: 103]


// SIMULACIÓN 2: REFACTORIZACIÓN SOSTENIBLE (Baja Huella de Carbono) [cite: 104]
const motorBalanceado = new MotorIndexacionBST();

// Barajar aleatoriamente los mismos datos [cite: 106]
const palabrasAleatorias = barajar(palabrasSecuenciales);

// Inyectar datos mezclados [cite: 106]
palabrasAleatorias.forEach(p => motorBalanceado.indexar(p, `https://cache.unl.edu.ec/${p}`));

// Buscar exactamente la misma palabra clave [cite: 107]
const resultadoMejor = motorBalanceado.buscar(ultimaPalabra);

console.log("\n--- ESCENARIO SOSTENIBLE ---");
console.log(`Búsqueda en árbol pseudo-balanceado: [${resultadoMejor.ciclosCPU}] ciclos de CPU`); // [cite: 107]


// 3. CÁLCULO DE EFICIENCIA [cite: 108]
const ciclosAhorrados = resultadoPeor.ciclosCPU - resultadoMejor.ciclosCPU;
const porcentajeAhorro = ((ciclosAhorrados / resultadoPeor.ciclosCPU) * 100).toFixed(4);

console.log("\n--- MÉTRICAS DE IMPACTO COMPUTACIONAL ---");
console.log(`Ciclos de CPU desperdiciados ahorrados: ${ciclosAhorrados}`);
console.log(`Porcentaje de optimización energética: ${porcentajeAhorro}%`);