package invento;

public class pilasPaquete {
    private Paquete[] pila; //atributos internos arreglo estatico que guarda los paquetes (tamaño fijo)
    private int tope;       //indice del ultimo elemento. empieza en -1 (pila vacia)
    private int capacidad;  //tamaño maximo del arreglo, se define al crear la pila

    public pilasPaquete(int capacidad) { 
        this.capacidad = capacidad;
        this.pila = new Paquete[capacidad];
        this.tope = -1;          // -1 indica pila vacía
    }

    // Agrega un paquete al tope de la pila (LIFO)
    public void push(Paquete p) { // Metodos Agrega paquete al tope primero verifica que no este llena 
        if (tope < capacidad - 1) {   // Verificar que no esté llena
            tope++;
            pila[tope] = p;
        } else {
            System.out.println("Pila llena. No se puede agregar el paquete " + p.getId());
        }
    }

    // Retira y retorna el paquete del tope ( o sea LIFO último en entrar, primero en salir) deja null en esa posicion
    public Paquete pop() {
        if (tope >= 0) {              // Verificar que no esté vacía
            Paquete p = pila[tope];
            pila[tope] = null;        // Limpiar referencia
            tope--;
            return p;
        }
        System.out.println("Pila vacía. No hay paquetes para retirar.");
        return null;
    }

    // Ver el tope sin retirarlo. No modifica la pila
    public Paquete peek() { 
        if (tope >= 0) return pila[tope];
        return null;
    }

    public boolean estaVacia() { return tope == -1; } //True si tope == -1 (no hay elementos)
    public int size()          { return tope + 1;   } //cantidades de elementos actuales en la pila 
}

