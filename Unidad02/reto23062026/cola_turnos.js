

class Cola {
    constructor() {
        this.turnos = [];
    }

    
    ingresar(nombre) {
        this.turnos.push(nombre);
        console.log(nombre + " ingresó a la cola.");
    }

    // Atender a la primera persona
    atender() {
        if (this.turnos.length === 0) {
            console.log("No hay personas en espera.");
            return;
        }

        let persona = this.turnos.shift();
        console.log(persona + " fue atendido.");
    }

    
    mostrar() {
        console.log("Personas en espera:");

        if (this.turnos.length === 0) {
            console.log("La cola está vacía.");
            return;
        }

        this.turnos.forEach((persona, indice) => {
            console.log((indice + 1) + ". " + persona);
        });
    }
}



const farmacia = new Cola();

farmacia.ingresar("Ana");
farmacia.ingresar("Carlos");
farmacia.ingresar("María");

farmacia.mostrar();

farmacia.atender();

farmacia.mostrar();