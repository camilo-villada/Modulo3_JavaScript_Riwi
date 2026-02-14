

// ===============================
// Selección de elementos del DOM
// ===============================

const inputNota = document.getElementById("inputNota");
const btnAgregar = document.querySelector("#btnAgregar");
const listaNotas = document.getElementById("listaNotas");

console.log("Input:", inputNota);
console.log("Botón:", btnAgregar);
console.log("UL:", listaNotas);

// ===============================
// Estado en memoria
// ===============================
let notas = [];

// ===============================
// Funciones
// ===============================
function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Notas guardadas:", notas);
}

function agregarNotaAlDOM(texto) {
    const li = document.createElement("li");
    li.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        listaNotas.removeChild(li);
        notas = notas.filter(nota => nota !== texto);
        guardarNotas();
        console.log("Nota eliminada:", texto);
    });

    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);
}

// ===============================
// Eventos
// ===============================
btnAgregar.addEventListener("click", () => {
    const texto = inputNota.value.trim();

    if (texto === "") {
        alert("La nota no puede estar vacía");
        return;
    }

    agregarNotaAlDOM(texto);
    notas.push(texto);
    guardarNotas();

    console.log("Nota agregada:", texto);

    inputNota.value = "";
    inputNota.focus();
});

// ===============================
// Cargar notas al iniciar
// ===============================
const notasGuardadas = localStorage.getItem("notas");

if (notasGuardadas) {
    notas = JSON.parse(notasGuardadas);

    notas.forEach(nota => {
        agregarNotaAlDOM(nota);
    });

    console.log(`Se cargaron ${notas.length} notas desde Local Storage`);
}

