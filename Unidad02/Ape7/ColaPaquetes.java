package Unidad02.Ape7;

public class ColaPaquetes {
    private Paquete[] queue; //atributos internos arreglo estatico circular. Tamaño fijo definido al crear
    private int frente, fin, total;  //indice del primer elemento (el que sale primero)Empieza en 0
                                     // int fin indice donde se insertara el proximo elemento. Empieza en 0
                                     // int total contador de elementos actuales en la cola
    public ColaPaquetes(int capacidad) {
        this.queue  = new Paquete[capacidad];
        this.frente = 0;
        this.fin    = 0;
        this.total  = 0;
    }

    // Agrega un paquete al final de la cola
    // El operador % permite que el arreglo sea circular:
    // cuando "fin" llega al último índice, vuelve a 0
    public void enqueue(Paquete p) {
        if (total == queue.length) {
            System.out.println("Cola llena. No se puede agregar el paquete " + p.getId());
            return;
        }
        queue[fin] = p;
        fin = (fin + 1) % queue.length;   // el operador (modulo) hace que cuando el indice llega al final del arreglo, vuelva al incio asi reutiliza posiciones que ya fueron liberadas
        total++;
    }

    // Retira y retorna el paquete del frente (FIFO: primero en entrar, primero en salir)
    public Paquete dequeu() {
        if (total == 0) {
            System.out.println("Cola vacía. No hay paquetes para despachar.");
            return null;
        }
        Paquete p = queue[frente];
        queue[frente] = null;              // Limpiar referencia
        frente = (frente + 1) % queue.length;  // avance circular
        total--;
        return p;
    }

    public boolean estaVacia() { return total == 0;             }
    public boolean estaLlena() { return total == queue.length;  }
    public int size()          { return total;                  }
}