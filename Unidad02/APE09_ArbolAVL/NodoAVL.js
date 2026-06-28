class NodoAVL {
    constructor(idSensor, lectura) {
        this.idSensor = idSensor;
        this.lectura = lectura;
        this.altura = 1;
        this.izquierdo = null;
        this.derecho = null;
    }
}

module.exports = NodoAVL;