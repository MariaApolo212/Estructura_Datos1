// EJERCICIO 4.1: Fibonaci
function fibonacciConArbol(n, prefijo = "") {

    console.log(prefijo + "fibonacci(" + n + ")");

    if (n <= 1) {
        return n;
    }

    const izquierda = fibonacciConArbol(n - 1, prefijo + "├── ");
    const derecha = fibonacciConArbol(n - 2, prefijo + "└── ");

    return izquierda + derecha;
}

console.log("Resultado:", fibonacciConArbol(4));

// EJERCICIO 4.3: Factorial con Recursividad de Cola
function factorialCola(n, acumulador = 1) {
    if (n <= 1) {
        return acumulador;
    }
    return factorialCola(n - 1, n * acumulador);
}

console.assert(factorialCola(5)  === 120,     "Error en factorialCola(5)");
console.assert(factorialCola(10) === 3628800, "Error en factorialCola(10)");
console.assert(factorialCola(0)  === 1,       "Error en factorialCola(0)");
console.log(" Ejercicio 4.3 superado.");