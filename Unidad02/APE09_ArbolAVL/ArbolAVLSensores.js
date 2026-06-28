const NodoAVL = require("./NodoAVL");

class ArbolAVLSensores {

    constructor() {
        this.raiz = null;
    }

    getAltura(nodo) {
        if (nodo == null)
            return 0;
        return nodo.altura;
    }

    getBalance(nodo) {
        if (nodo == null)
            return 0;

        return this.getAltura(nodo.derecho) - this.getAltura(nodo.izquierdo);
    }

    rotacionDerecha(y) {

        let x = y.izquierdo;
        let T2 = x.derecho;

        x.derecho = y;
        y.izquierdo = T2;

        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;
        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;

        return x;
    }

    rotacionIzquierda(x) {

        let y = x.derecho;
        let T2 = y.izquierdo;

        y.izquierdo = x;
        x.derecho = T2;

        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;
        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;

        return y;
    }

    insertar(idSensor, lectura) {
        this.raiz = this._insertar(this.raiz, idSensor, lectura);
    }

    _insertar(nodo, idSensor, lectura) {

        if (nodo == null)
            return new NodoAVL(idSensor, lectura);

        if (idSensor < nodo.idSensor)
            nodo.izquierdo = this._insertar(nodo.izquierdo, idSensor, lectura);

        else if (idSensor > nodo.idSensor)
            nodo.derecho = this._insertar(nodo.derecho, idSensor, lectura);

        else
            return nodo;

        nodo.altura = 1 + Math.max(
            this.getAltura(nodo.izquierdo),
            this.getAltura(nodo.derecho)
        );

        let balance = this.getBalance(nodo);

        // LL
        if (balance < -1 && idSensor < nodo.izquierdo.idSensor)
            return this.rotacionDerecha(nodo);

        // RR
        if (balance > 1 && idSensor > nodo.derecho.idSensor)
            return this.rotacionIzquierda(nodo);

        // LR
        if (balance < -1 && idSensor > nodo.izquierdo.idSensor) {
            nodo.izquierdo = this.rotacionIzquierda(nodo.izquierdo);
            return this.rotacionDerecha(nodo);
        }

        // RL
        if (balance > 1 && idSensor < nodo.derecho.idSensor) {
            nodo.derecho = this.rotacionDerecha(nodo.derecho);
            return this.rotacionIzquierda(nodo);
        }

        return nodo;
    }

    buscar(idSensor) {
        return this._buscar(this.raiz, idSensor);
    }

    _buscar(nodo, idSensor) {

        if (nodo == null)
            return null;

        if (idSensor == nodo.idSensor)
            return nodo;

        if (idSensor < nodo.idSensor)
            return this._buscar(nodo.izquierdo, idSensor);

        return this._buscar(nodo.derecho, idSensor);
    }

}

module.exports = ArbolAVLSensores;