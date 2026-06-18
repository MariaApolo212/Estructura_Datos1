/**
 * La Programación Orientada a Objetos (POO) se basa en cuatro pilares fundamentales, y JavaScript los implementa todos, aunque de una manera un poco distinta a lenguajes como Java o C# por su naturaleza basada en prototipos. Te explico cada uno con ejemplos.
Encapsulamiento
Consiste en agrupar datos y comportamiento dentro de una misma unidad (la clase), y ocultar los detalles internos que no necesitan ser accesibles desde afuera. En JavaScript esto se logra con los campos privados (#)
 */

class CuentaBancaria {
  #saldo;

  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  depositar(monto) {
    if (monto > 0) this.#saldo += monto;
  }

  get saldo() {
    return this.#saldo;
  }
}

const cuenta = new CuentaBancaria(100);
cuenta.depositar(50);
console.log(cuenta.saldo); // 150
// cuenta.#saldo // Error: no se puede acceder desde fuera

/**
 * Abstracción
Es mostrar solo lo esencial y esconder la complejidad interna. El usuario de la clase no necesita saber cómo está implementado un método, solo cómo usarlo:
 */

class Pago {
  procesar(monto) {
    this.#validar(monto);
    this.#registrarEnSistema(monto);
    return "Pago procesado correctamente";
  }

  #validar(monto) {
    if (monto <= 0) throw new Error("Monto inválido");
  }

  #registrarEnSistema(monto) {
    console.log(`Registrando pago de $${monto}`);
  }
}

const pago = new Pago();
console.log(pago.procesar(200));

/**
 * Herencia
Permite que una clase reutilice y extienda el comportamiento de otra, evitando duplicar código:
 */

class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }

  mover() {
    return `${this.marca} se está moviendo`;
  }
}

class Moto extends Vehiculo {
  hacerCaballito() {
    return `${this.marca} hace un caballito`;
  }
}

const moto = new Moto("Yamaha");
console.log(moto.mover()); // Yamaha se está moviendo
console.log(moto.hacerCaballito()); // Yamaha hace un caballito

/**
 * Polimorfismo
Significa que distintas clases pueden responder de forma diferente al mismo método, normalmente sobrescribiéndolo:
 */
class Animal {
  hacerSonido() {
    return "Sonido genérico";
  }
}

class Perro extends Animal {
  hacerSonido() {
    return "Guau";
  }
}

class Gato extends Animal {
  hacerSonido() {
    return "Miau";
  }
}

const animales = [new Perro(), new Gato(), new Animal()];
animales.forEach(a => console.log(a.hacerSonido()));
// Guau
// Miau
// Sonido genérico

