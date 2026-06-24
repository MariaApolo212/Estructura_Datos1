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
