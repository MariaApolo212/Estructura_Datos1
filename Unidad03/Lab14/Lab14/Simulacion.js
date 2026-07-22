import LogisticaGrafo from './LogisticaGrafo.js';

try {
const redLogistica = new LogisticaGrafo(5);

redLogistica.agregarRuta(0, 1, 4); 
redLogistica.agregarRuta(0, 2, 2); 
redLogistica.agregarRuta(1, 3, 5); 
redLogistica.agregarRuta(2, 1, 1); 
redLogistica.agregarRuta(2, 4, 8); 
redLogistica.agregarRuta(3, 4, 3); 

const resultado = redLogistica.dijkstra(0, 4);

console.log("Ruta optimizada para el camión eléctrico:");
console.log("Centros visitados:", resultado.ruta.join(" -> "));
console.log("Consumo total estimado:", resultado.consumoTotal, "kWh");

} catch (error) {
console.error("Error en la planificación de la ruta:", error.message);
}
