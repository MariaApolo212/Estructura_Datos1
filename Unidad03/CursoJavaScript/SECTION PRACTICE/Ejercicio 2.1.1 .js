//Question 1
// Boolean
let b1 = true;               // Literal
let b2 = Boolean(true);      // Función constructora

// Number
let n1 = 100;                // Literal
let n2 = Number(200);        // Función constructora

// BigInt
let bi1 = 100n;              // Literal
let bi2 = BigInt(200);       // Función constructora

// String
let s1 = "Hello";            // Literal
let s2 = String("Hello");    // Función constructora

// Undefined
let u1 = undefined;          // Literal (o asignación explícita)
let u2;                      // ¡FALTABA! Literal implícito (por defecto es undefined)
let u3 = void 0;             // ¡FALTABA! Alternativa funcional para generar undefined


//Question 2
console.log(`${b1} [${typeof b1}]`);
console.log(`${b2} [${typeof b2}]`);

console.log(`${n1} [${typeof n1}]`);
console.log(`${n2} [${typeof n2}]`);

console.log(`${bi1} [${typeof bi1}]`);
console.log(`${bi2} [${typeof bi2}]`);

console.log(`${s1} [${typeof s1}]`);
console.log(`${s2} [${typeof s2}]`);

console.log(`${u1} [${typeof u1}]`);

//Question 3
// Yes, it is perfectly possible.

// Option 1: Inline chain
let b = Boolean(BigInt(Number("1234")));
console.log(`${b} [${typeof b}]`); // Outputs: true [boolean]

// or

// Option 2: Step-by-step chain
let s = "1234";
let n = Number(s);
let bi = BigInt(n);
let b2 = Boolean(bi);
console.log(`${b2} [${typeof b2}]`); // Outputs: true [boolean]

//Question 4
let b = true + false;
let n = 100 + 200;
let bi = 100n + 200n;
let s = "He" + "llo";
let u = undefined + undefined;
let nu = null + null; // ¡FALTABA!

console.log(`${b} [${typeof b}]`);   // 1 [number]
console.log(`${n} [${typeof n}]`);   // 300 [number]
console.log(`${bi} [${typeof bi}]`); // 300 [bigint]
console.log(`${s} [${typeof s}]`);   // Hello [string]
console.log(`${u} [${typeof u}]`);   // NaN [number]
console.log(`${nu} [${typeof nu}]`); // 0 [number]

// ¡FALTABA SYMBOL! 
// Nota: Sumar dos símbolos arroja un TypeError, por lo que no se puede ejecutar directamente:
// let sym = Symbol('a') + Symbol('b'); // TypeError: Cannot convert a Symbol value to a number

//Question 5
let b1 = true + 100; 
// let b2 = true + 100n; // -> error!
let b3 = true + "100"; 
// let n1 = 100 + 200n; // -> error!
let n2 = 100 + true;
let n3 = 100 + "200";
// let bi1 = 100n + 200;  // -> error!
// let bi2 = 100n + true  // -> error!
let bi3 = 100n + "200"; 
let s1 = "100" + 200;
let s2 = "100" + 200n;
let s3 = "100" + true;
let s4 = "abc" + 200;
let s5 = "abc" + 200n;
let s6 = "abc" + true;

console.log(`${b1} [${typeof b1}]`);    // -> 101 [number]
// console.log(`${b2} [${typeof b2}]`);
console.log(`${b3} [${typeof b3}]`);    // -> true100 [string]
// console.log(`${n1} [${typeof n1}]`);
console.log(`${n2} [${typeof n2}]`);    // -> 101 [number]
console.log(`${n3} [${typeof n3}]`);    // -> 100200 [string]
// console.log(`${bi1} [${typeof bi1}]`);
// console.log(`${bi2} [${typeof bi2}]`);
console.log(`${bi3} [${typeof bi3}]`);  // -> 100200 [string]
console.log(`${s1} [${typeof s1}]`);    // -> 100200 [string]
console.log(`${s2} [${typeof s2}]`);    // -> 100200 [string]
console.log(`${s3} [${typeof s3}]`);    // -> 100true [string]
console.log(`${s4} [${typeof s4}]`);    // -> abc200 [string]
console.log(`${s5} [${typeof s5}]`);    // -> abc200 [string]
console.log(`${s6} [${typeof s6}]`);    // -> abctrue [string]
// ... (Todo tu código anterior se queda igual)

// Casos adicionales con undefined y null:
let u1 = 100 + undefined;
let u2 = "abc" + undefined;
let nu1 = 100 + null;
let nu2 = "abc" + null;

// Impresiones adicionales:
console.log(`${u1} [${typeof u1}]`);    // -> NaN [number]
console.log(`${u2} [${typeof u2}]`);    // -> abcundefined [string]
console.log(`${nu1} [${typeof nu1}]`);  // -> 100 [number] (null cuenta como 0)
console.log(`${nu2} [${typeof nu2}]`);  // -> abcnull [string]

//Question 5
const str1 = 42 + +"1";