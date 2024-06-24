
// export function showSpinner(delay) {
//     if (delay > 0) {
//         insertSpinner();
//         setTimeout(() => {
//             removeSpinner();
//         }, delay);
//     } else {
//         removeSpinner();
//     }
//     return true;
// }

// function insertSpinner() {
//     const spinner = document.createElement("img");
//     const contenedor = document.getElementById("spinner-container");
//     // spinner.setAttribute("src", "./assets/images/spinner.gif");
//     spinner.setAttribute("src", "./assets/images/logo.svg");
//     spinner.setAttribute("alt", "imagen spinner");
//     spinner.setAttribute("height", "64px");
//     spinner.setAttribute("width", "64px");
//     contenedor.appendChild(spinner);
// }

// function removeSpinner() {
//     const contenedor = document.getElementById("spinner-container");
//     contenedor.removeChild(contenedor.firstChild);
// }

// Función para mostrar el spinner
export function mostrarSpinner() {
    action(true);
}

// Función para ocultar el spinner
export function ocultarSpinner() {
    action();
}




function action(visible = false) {
    const display = visible ? 'flex' : 'none';
    document.getElementById('spinner').style.display = display;
}