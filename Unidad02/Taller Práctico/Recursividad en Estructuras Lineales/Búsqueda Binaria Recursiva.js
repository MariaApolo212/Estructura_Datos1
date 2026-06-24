function busquedaBinariaRecursiva(arr, objetivo, bajo, alto) {

    // Caso base
    if (bajo > alto) {
        return -1;
    }

    let medio = Math.floor((bajo + alto) / 2);

    // Elemento encontrado
    if (arr[medio] === objetivo) {
        return medio;
    }

    // Buscar a la izquierda
    if (objetivo < arr[medio]) {
        return busquedaBinariaRecursiva(
            arr,
            objetivo,
            bajo,
            medio - 1
        );
    }

    // Buscar a la derecha
    return busquedaBinariaRecursiva(
        arr,
        objetivo,
        medio + 1,
        alto
    );
}

// Pruebas

const datosOrdenados = [2,5,8,12,16,23,38,56,72,91];

console.assert(
busquedaBinariaRecursiva(datosOrdenados,23,0,9) === 5
);

console.assert(
busquedaBinariaRecursiva(datosOrdenados,100,0,9) === -1
);

console.log("Ejercicio 2.2 superado.");