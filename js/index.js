import { Crypto } from "./crypto.js";
import { read, save, clear, jsonToObject, objectToJson } from "./local-storage-async.js";
import { showSpinner } from "./spinner.js";

const KEY_STORAGE = "monedas";
const FAKE_DELAY = 2500;
let items = []; // array vacio
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
  handleDeleteAll();
}


async function loadItems() {
  // mostrarSpinner();
  let str = await read(KEY_STORAGE);
  // ocultarSpinner();

  const objArray = jsonToObject(str) || [];

  objArray.forEach(obj => {
    const model = new Crypto(
      obj.id,
      obj.nombre,
      obj.simbolo,
      obj.precio,
      obj.consenso,
      obj.dropdownCurrency,
      obj.cantidad,
      obj.dropdownType,
      obj.sitioweb
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

  const rows = ["id", "nombre", "fecha", "simbolo", "precio", "dropdownCurrency", "cantidad", "dropdownType", "sitioweb"];

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
      setForm(cells);
      btnIsVisible(true);
    }
  });
}


function getForm() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 
    const model = new Crypto(
      Date.now(),
      form.nombre.value,
      Date.now(),
      form.simbolo.value,
      form.precio.value,
      form.dropdownCurrency.value,
      form.cantidad.value,
      form.dropdownType.value,
      form.sitioweb.value
    );

    console.log(model);

    const response = model.verify();

    if (response) {
      items.push(model);
      const str = objectToJson(items);

      try {
        await save(KEY_STORAGE, str);
        
        showSpinner(FAKE_DELAY);
        setTimeout(()=>{
          resetForm(); 
          setTable();
        }, FAKE_DELAY); 
      }
      catch (error) {
        alert(error);
      }
    }
    else {
      alert(respuesta.rta);
    }
  });
}


function setForm(data) {
  form.id.value = data[0].innerText;
  form.nombre.value = data[1].innerText;
  form.fecha.value = data[2].innerText;
  form.simbolo.value = data[3].innerText;
  form.precio.value = data[4].innerText;
  form.dropdownCurrency.value = data[5].innerText;
  form.cantidad.value = data[6].innerText;
  form.dropdownType.value = data[7].innerText;
  form.sitioweb.value = data[8].innerText;
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
    if(confirm('Desea eliminar todos los Items?')){
      let id = parseInt(form.id.value);
      let arrayFiltered = items.filter((p) => p.id != id);
      items = arrayFiltered;
      const str = objectToJson(items);
      try {
        await save(KEY_STORAGE, str);
        showSpinner(FAKE_DELAY); 
        setTimeout(()=>{
          resetForm();
          btnIsVisible(false);
          setTable();
        }, FAKE_DELAY);
      }
      catch (error) {
        alert(error);
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
        
        showSpinner(FAKE_DELAY);
        setTimeout(()=>{
          resetForm(); 
          setTable();
        }, FAKE_DELAY); 
      }
      catch (error) {
        alert(error);
      }
    }
  });
}