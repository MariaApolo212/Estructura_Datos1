// BST tradicional SIN auto-balanceo, usado solo para comparación académica.
// Con inserción secuencial (0,1,2,3...) este árbol degenera en una lista
// enlazada: cada nodo nuevo se cuelga siempre a la derecha del anterior.

class NodoBST {
    constructor(idSensor, lectura) {
        this.idSensor = idSensor;
        this.lectura = lectura;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ArbolBSTSensores {
    constructor() {
        this.raiz = null;
    }

    // Versión RECURSIVA (la que realmente provoca el desbordamiento de pila,
    // porque cada inserción secuencial agrega un nivel más de recursión)
    insertar(idSensor, lectura) {
        this.raiz = this._insertar(this.raiz, idSensor, lectura);
    }

    _insertar(nodo, idSensor, lectura) {
        if (nodo == null)
            return new NodoBST(idSensor, lectura);

        if (idSensor < nodo.idSensor)
            nodo.izquierdo = this._insertar(nodo.izquierdo, idSensor, lectura);
        else if (idSensor > nodo.idSensor)
            nodo.derecho = this._insertar(nodo.derecho, idSensor, lectura);

        return nodo;
    }

    buscar(idSensor) {
        return this._buscar(this.raiz, idSensor);
    }

    _buscar(nodo, idSensor) {
        if (nodo == null) return null;
        if (idSensor == nodo.idSensor) return nodo;
        if (idSensor < nodo.idSensor) return this._buscar(nodo.izquierdo, idSensor);
        return this._buscar(nodo.derecho, idSensor);
    }
}

module.exports = ArbolBSTSensores;