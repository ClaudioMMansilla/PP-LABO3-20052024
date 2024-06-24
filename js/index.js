import { Crypto } from "./crypto.js";
import { read, save, clear, jsonToObject, objectToJson } from "./local-storage-async.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";
import { getDateNowFormatted } from "./dateHandler.js";

const KEY_STORAGE = "monedas";
const FAKE_DELAY = 2500;
let items = []; // array vacio
let itemIndex = -1;
const form = document.getElementById("form-group"); // recupero el form declarado en el body
const table = document.getElementById("table-items");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const btnEliminar = document.getElementById("btnEliminar");
const btnEditar = document.getElementById("btnEditar");

document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis, es un callback

function onInit() {
  loadItems();

  //setTable();
  getForm();
  tableTDListener();
  // escuchandoFormulario();
  // escuchandoBtnDeleteAll();
  handleCancellation();
  handleDelete();
  handleEdit();
  handleDeleteAll();
}


async function loadItems() {
  mostrarSpinner();
  let str = await read(KEY_STORAGE);
  ocultarSpinner();

  const objArray = jsonToObject(str) || [];

  objArray.forEach(obj => {
    /*
      Las propiedas a recuperar tienen que coincidir a la estructura del json
      sino, no las reconoce y la tabla tendrá esos campos vacios
    */
    const model = new Crypto(
      obj.id,
      obj.nombre,
      obj.fechaCreacion,
      obj.simbolo,
      obj.precioActual,
      obj.consenso,
      obj.cantidad,
      obj.algoritmo,
      obj.sitioWeb
    );

    items.push(model);
  });

  setTable();
}


/**
 * Quiero que obtenga el elemento del DOM table
 * luego quiero agregarle las filas que sean necesarias
 * se agregaran dependiendo de la cantidad de items que poseo
 */
function setTable() {

  let tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = ''; // Me aseguro que esté vacio, hago referencia al agregar otro

  const rows = ["id", "nombre", "simbolo", "fechaCreacion", "precioActual", "consenso", "cantidad", "algoritmo", "sitioWeb"];

  items.forEach((item) => {
    let newRow = document.createElement("tr");

    rows.forEach((row) => {
      let newElement = document.createElement("td");
      newElement.textContent = item[row];
      newRow.appendChild(newElement);
    });

    // Agregar la fila al tbody
    tbody.appendChild(newRow);
  });
}


function tableTDListener() {
  table.addEventListener("dblclick", (event) => {
    const target = event.target;
    if (target.matches("td")) {
      // Lógica a implementar al hacer doble clic en una celda
      const row = target.parentNode;
      const cells = row.getElementsByTagName("td");
      btnIsVisible(true);
      setForm(cells);
    }
  });
}


function getForm() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const object = new Crypto();
    // nombre, simbolo, precioActual, cantidad, sitioWeb
    const response = object.verify(
      form.nombre.value,
      form.simbolo.value,
      form.precio.value,
      form.cantidad.value,
      form.sitioweb.value
    );

    if (response) {

      const model = new Crypto(
        Date.now(),
        form.nombre.value,
        getDateNowFormatted(),
        form.simbolo.value,
        form.precio.value,
        form.dropdownCurrency.value,
        form.cantidad.value,
        form.dropdownType.value,
        form.sitioweb.value
      );
      console.log(model);

      items.push(model);
      const str = objectToJson(items);

      try {
        mostrarSpinner();
        await save(KEY_STORAGE, str);
        resetForm();

        setTable();
        ocultarSpinner();
      }
      catch (error) {
        alert(error);
      }
    }
  });
}

/**
 * Data es un array de elementos td
 */
function setForm(data) {
  console.log(data); // debuggeo el array para saber que indice corresponde con cual td
  //const rows = ["nombre", "simbolo", "fechaCreacion", "precioActual", "consenso", "cantidad", "algoritmo", "sitioWeb"];
  form.nombre.value = data[1].innerText;    // nombre
  form.simbolo.value = data[2].innerText;  // simbolo
  form.precio.value = data[4].innerText;  // precio
  form.dropdownCurrency.value = data[5].innerText; // consenso
  form.cantidad.value = data[6].innerText;      // cantidad
  form.dropdownType.value = data[7].innerText; // algoritmo
  form.sitioweb.value = data[8].innerText;    // sitio web
  itemIndex = getIndexOf();
  //console.log(items[itemIndex]);
}

function getIndexOf() {
  let itemIndex = -1;
  itemIndex = items.findIndex(item => (
    item.nombre === form.nombre.value &&
    item.simbolo === form.simbolo.value &&
    item.precioActual === form.precio.value &&
    item.cantidad === form.cantidad.value &&
    item.consenso === form.dropdownCurrency.value &&
    item.algoritmo === form.dropdownType.value &&
    item.sitioWeb === form.sitioweb.value
  ));
  return itemIndex;
}

function btnIsVisible(isVisible) {
  if (isVisible) {
    btnGuardar.setAttribute("class", "oculto");
    btnEliminar.removeAttribute("class");
    btnCancelar.removeAttribute("class");
    btnEditar.removeAttribute("class");
  } else if (!isVisible) {
    btnGuardar.removeAttribute("class");
    btnEliminar.setAttribute("class", "oculto");
    btnCancelar.setAttribute("class", "oculto");
    btnEditar.setAttribute("class", "oculto");
  }
}

function resetForm() {
  form.reset();
  btnIsVisible(false);
}

function handleCancellation() {
  btnCancelar.addEventListener("click", () => {
    resetForm();
  });
}

function handleDelete() {
  btnEliminar.addEventListener("click", async (e) => {
    if (confirm('Desea eliminar el item seleccionado?')) {
      items.splice(itemIndex, 1);
      const str = objectToJson(items);
      try {
        mostrarSpinner();
        await save(KEY_STORAGE, str);
        ocultarSpinner();

        resetForm();
        btnIsVisible(false);
        setTable();
      }
      catch (error) {
        alert(error);
      }
    }
  });
}


function handleEdit() {
  btnEditar.addEventListener("click", async () => {
    console.log(itemIndex);

    if (confirm('¿Desea editar el item seleccionado?')) {
      const response = items[itemIndex].verify(
        form.nombre.value,
        form.simbolo.value,
        form.precio.value,
        form.cantidad.value,
        form.sitioweb.value
      );

      if (response) {
        if (itemIndex > -1) {
          //constructor(id, nombre, tamanio, masa, tipo, distancia, anillo, vida, composicion)
          items[itemIndex].nombre = form.nombre.value;
          items[itemIndex].simbolo = form.simbolo.value;
          items[itemIndex].precioActual = form.precio.value;
          items[itemIndex].cantidad = form.cantidad.value;
          items[itemIndex].consenso = form.dropdownCurrency.value;
          items[itemIndex].algoritmo = form.dropdownType.value;
          items[itemIndex].sitioWeb = form.sitioweb.value;

          const str = objectToJson(items);
          console.log(items[itemIndex]);
          try {
            mostrarSpinner();
            await save(KEY_STORAGE, str);
            ocultarSpinner();
            resetForm();
            btnIsVisible(false);
            setTable();
          } catch (error) {
            alert(error);
          }
        }
      }
    }
  });
}

function handleDeleteAll() {
  const btn = document.getElementById("btnLimpiar");

  btn.addEventListener("click", async (e) => {

    const userAnswer = confirm('Desea eliminar todos los Items?');

    if (userAnswer) {
      items.splice(0, items.length);

      try {
        await clear(KEY_STORAGE);

        mostrarSpinner();
        resetForm();
        setTable();
        ocultarSpinner();
      }
      catch (error) {
        alert(error);
      }
    }
  });
}