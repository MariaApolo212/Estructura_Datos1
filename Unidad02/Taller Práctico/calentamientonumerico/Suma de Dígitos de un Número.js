function sumaDigitos(n) {

    // Caso base
    if (n < 10) {
        return n;
    }

    // Caso recursivo
    return (n % 10) + sumaDigitos(Math.floor(n / 10));
}

// Pruebas
console.assert(sumaDigitos(1243) === 10);
console.assert(sumaDigitos(0) === 0);
console.assert(sumaDigitos(9) === 9);

console.log("Ejercicio 1.1 superado.");