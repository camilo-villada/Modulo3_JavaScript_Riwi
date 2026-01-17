// Task 1
const productos = [
    { id: 1, nombre: "Laptop", precio: 3500 },
    { id: 2, nombre: "Mouse inalámbrico", precio: 80 },
    { id: 3, nombre: "Teclado mecánico", precio: 150 },
    { id: 4, nombre: "Monitor 24 pulgadas", precio: 1200 },
    { id: 5, nombre: "Auriculares Bluetooth", precio: 300 }
];


//for... in

for (const producto of productos) {

  // recorrer propiedades del producto
  for (const propiedad in producto) {
    console.log(`${propiedad}: ${producto[propiedad]}`);
  }

  console.log("----");
}


// Task 2

const numeros = new Set ([1, 2, 3, 4, 5, 2, 4, 6, 7, 5]);

console.log(numeros)

// agregar con .add()

numeros.add(8)

console.log(numeros)

//verificar si existe con .has()

console.log(numeros.has(3))

//Eliminar con .delete()

numeros.delete(4)
console.log(numeros)

//Recorrer con for..of

for ( let numero of numeros){
    console.log(numero)
}
 
// Task 3

const frutas = new Map()

//Agregamos pares clave-valor con .set()

frutas.set("citricos", "naranja")
frutas.set("frutos rojos", "fresa")
frutas.set("tropical", "mango")
 

//for...of

for(let fruta of frutas){
    console.log("Con for..of")
    console.log(fruta)
}

//forEach
console.log("contenido del map con forEach: ");
frutas.forEach((fruta, categoria) =>{
    console.log(`categoria: ${categoria}, Fruta: ${fruta}`)
})


// TASK 5 - Validaciones y pruebas


const productosValidos = [];
const productosInvalidos = [];

productos.forEach(producto => {

  const idValido = typeof producto.id === "number";
  const nombreValido =
    typeof producto.nombre === "string" && producto.nombre.trim() !== "";
  const precioValido =
    typeof producto.precio === "number" && producto.precio > 0;

  if (idValido && nombreValido && precioValido) {
    productosValidos.push(producto);
  } else {
    productosInvalidos.push(producto);
  }
});

console.log("Lista completa de productos:");
console.log(productos);

console.log("Productos válidos:");
console.log(productosValidos);

console.log("Productos inválidos:");
console.log(productosInvalidos);