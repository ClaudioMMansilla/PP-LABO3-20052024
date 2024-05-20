
export function showSpinner(delay){
    if(delay >0){
        insertSpinner();
        setTimeout(()=>{
            removeSpinner();
        }, delay);
    } else {
        removeSpinner();
    }
    return true;
}

function insertSpinner() {
    const spinner = document.createElement("img");
    const contenedor = document.getElementById("spinner-container");
    spinner.setAttribute("src", "./assets/images/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");
    spinner.setAttribute("height", "64px");
    spinner.setAttribute("width", "64px");
    contenedor.appendChild(spinner);
}

function removeSpinner() {
    const contenedor = document.getElementById("spinner-container");
    contenedor.removeChild(contenedor.firstChild);
}