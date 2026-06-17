const numeroSecreto = Math.floor(Math.random() * 10 + 1);
const numeroJugador = parseInt(prompt("Adivina el numero secreto del 1 al 10:"));

console.log(`Este es el numero con el que juegas: ${numeroJugador}`);

if (numeroJugador === numeroSecreto) {
    console.log("Felicitaciones, adivinaste el numero secreto !!");
} else if (numeroJugador < numeroSecreto) {
    console.log("numero menor!!! intenta nuevamente");
} else if (numeroJugador > numeroSecreto) {
    console.log("numero mayor/muy alto, intenta nuevamente");
}
