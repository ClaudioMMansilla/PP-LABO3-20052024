import { CryptoBase } from "./cryptobase.js";

class Crypto extends CryptoBase{
    constructor(id, nombre, fecha, simbolo, precioActual, consenso, cantidad, algoritmo, sitioWeb) {
        super(id, nombre, fecha, simbolo, precioActual);
        this.consenso = consenso;
        this.cantidad = cantidad;
        this.algoritmo = algoritmo;
        this.sitioWeb = sitioWeb;
    }

    verify(nombre, simbolo, precioActual, cantidad, sitioWeb) {

        if(super.verify(nombre, simbolo, precioActual) &&
        this.checkCantidad(cantidad) && 
        this.checkSitioweb(sitioWeb) 
        ){
            return true;
        } else {return false; }
    }

    checkCantidad(cantidad) {
        if(cantidad != null && parseInt(cantidad) >0){
            return true;
        } else { 
            alert("El campo 'cantidad' es inválido, verifique datos (debe ser mayor a cero)");
            return false;
        }
    }

    checkSitioweb(sitioWeb) {
        if(sitioWeb != null && sitioWeb.length >0 && sitioWeb.length <31){
            return true;
        } else { 
            alert("El campo 'Sitio Web' es inválido, verifique datos (máx 30 carácteres)");
            return false;
        }
    }


}

export { Crypto };