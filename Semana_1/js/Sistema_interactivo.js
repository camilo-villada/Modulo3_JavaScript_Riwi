
// Usamos prompt() para solicitar nombre y edad.
// Declaramos variables con let o const y nombres descriptivos en camelCase.
const userName = prompt("¿Cuál es tu nombre?: ");
const ageInput = prompt("¿Cuál es tu edad?: ");

// Convertimos la entrada de edad a número usando Number().
// Luego comprobamos si es un número válido con isNaN().
const ageUser = Number(ageInput);

if (isNaN(ageUser)) {
    // Si no es un número, mostramos error en consola.
    console.error("Error: Por favor, ingresa una edad válida en números.");
} else {

    // Si la edad es menor a 18, mostramos mensaje para menores.
    if (ageUser < 18) {
        alert(`Hola ${userName}, eres menor de edad. `);
        console.log(`Hola ${userName}, eres menor de edad. `);
    } else {
        
        //Si la edad es mayor a 18, mostramos mensaje para mayores
        alert(`Hola ${userName}, eres mayor de edad. `);
        console.log(`Hola ${userName}, eres mayor de edad. `);
    }
}
