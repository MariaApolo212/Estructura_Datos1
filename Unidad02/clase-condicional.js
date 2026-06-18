/**
 * condicionales operadires de condicion 
 * == si un valor es igual a otr
 * === va a comparar si el del mismo tipo numerioc y si tienen el mismo valor 
 * != 
 * !== si son diferentes en tipo y valor 
 * los tipos de condicionales que son y como se utilizan investigar crean un llamado de html y lo mandan a llamar a java script 
 * 
 * 
 * Que son los condicionales en JavaScript
Los condicionales son estructuras de control que 
permiten tomar decisiones en el código. 
Ejecutan un bloque de código si se cumple una condición determinada. 
La condición se evalúa como verdadera o falsa, 
y en función de ese resultado se decide que código ejecutar a continuación.

Los 4 tipos que existen
1.if
La declaración if se usa para evaluar una expresión. 
Si la condición es verdadera, ejecuta el bloque de código adentro. 
Si es falsa, no hace nada.

2. if / else y if / else if / else
El if...else ejecutara un bloque de codigo cuando la condicion sea verdadera. 
Si la condición es falsa, se ejecutará el bloque else. Cuando hay más de dos opciones,
se encadenan varias else if.

3.switch
La expresión se evalúa y se compara con cada uno de los valores usando el operador de igualdad. 
Si se encuentra una coincidencia, 
se ejecuta el código correspondiente y se usa breakpara salir de la estructura switch. 
Si ningún caso coincide, se ejecuta el bloque default

4. Operador Ternario? :
La condición va antes de la ? y si es verdadera ejecuta el código entre ? y :. 
Si la condición es falsa, se ejecuta el código después de :. 
Es la forma concisa de escribir condicionales simples que requieren elegir entre dos valores.

Cuando usar cada uno
Tipo          Úsalo cuando 
if / else     Tienes 2 posibilidades 
else if       Tienes 3 o más posibilidades 
switch        Comparas un mismo valor contra muchas opciones exactas 
Ternario      La condición es simple y cabe en una sola línea.


 */ 

 let nombre = "Fernando";

if (nombre === "Fernando") {
  console.log("Hola fer");
} else if (nombre === "Cristian") {
  console.log("Hola Cris");
} else {
  console.log("No encontre tu nombre");
}

const a = 10;
const b = 20;
const c = "30"
a == b

a === b
a === c
a == c

