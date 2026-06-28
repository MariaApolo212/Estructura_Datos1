const ArbolAVLSensores = require("./ArbolAVLSensores");

class RegistroEnergia {

    constructor() {
        this.voltaje = +(110 + Math.random() * 130).toFixed(2);
    }

}

const redElectrica = new ArbolAVLSensores();

for (let i = 1; i <= 20; i++) {

    let lectura = new RegistroEnergia();
    redElectrica.insertar(i, lectura);

}

console.log("Árbol AVL creado correctamente.");

let resultado = redElectrica.buscar(15);

console.log(resultado);