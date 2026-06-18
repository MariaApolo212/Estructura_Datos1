// Las clases en JavaScript se introdujeron oficialmente en ES6 (2015) y se crean con la palabra clave class.
//Es importante entender que, internamente, las clases son "azúcar sintáctico" sobre el sistema de prototipos que JavaScript ya tenía desde sus inicios. 
// Es decir, no es un sistema de POO nuevo como en Java o C++, sino una forma más legible de escribir lo que antes se hacía con funciones constructoras y prototype.


class NombreDeLaClase {
  constructor(parametro1, parametro2) {
    this.propiedad1 = parametro1;
    this.propiedad2 = parametro2;
  }

  metodo() {
    // lógica del método
  }
}

/**
 * El constructor
Es un método especial que se ejecuta automáticamente cuando creas una instancia con new. Solo puede haber un constructor por clase. Si no lo escribes, JavaScript genera uno vacío por defecto.
Métodos de instancia
Cualquier función definida dentro de la clase (sin la palabra function) se convierte en un método disponible para todas las instancias. Estos métodos se almacenan en el prototype de la clase, no se copian en cada objeto, lo cual es más eficiente en memoria.
Getters y setters
Permiten definir propiedades que se comportan como si fueran datos normales pero ejecutan lógica al leerse o escribirse:
javascript
 */

//Getters y setters
class Rectangulo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
  }

  get area() {
    return this.ancho * this.alto;
  }

  set escalar(factor) {
    this.ancho *= factor;
    this.alto *= factor;
  }
}

const rect = new Rectangulo(4, 5);
console.log(rect.area); // 20
rect.escalar = 2;
console.log(rect.area); // 80

//. Métodos estáticos
class Calculadora {
  static sumar(a, b) {
    return a + b;
  }
}

console.log(Calculadora.sumar(3, 7)); // 10

//campos privados
class Usuario {
  #password;

  constructor(nombre, password) {
    this.nombre = nombre;
    this.#password = password;
  }

  verificar(intento) {
    return this.#password === intento;
  }
}

const user = new Usuario("Carlos", "1234");
console.log(user.verificar("1234")); // true
console.log(user.password); // undefined (no se puede acceder)

//herencia con extends y super 
class Empleado {
  constructor(nombre, salario) {
    this.nombre = nombre;
    this.salario = salario;
  }

  info() {
    return `${this.nombre} gana $${this.salario}`;
  }
}

class Gerente extends Empleado {
  constructor(nombre, salario, equipo) {
    super(nombre, salario);
    this.equipo = equipo;
  }

  info() {
    return `${super.info()} y dirige a ${this.equipo} personas`;
  }
}

const gerente = new Gerente("María", 3000, 5);
console.log(gerente.info()); // María gana $3000 y dirige a 5 personas


