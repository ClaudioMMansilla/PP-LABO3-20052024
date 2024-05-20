import { CryptoBase } from "./cryptobase.js";

class Crypto extends CryptoBase{
    constructor(id, nombre, fecha, simbolo, precioActual, consenso, cantidad, algoritmo, sitioWeb) {
        super(id, nombre, fecha, simbolo, precioActual);
        this.consenso = consenso;
        this.cantidad = cantidad;
        this.algoritmo = algoritmo;
        this.sitioWeb = sitioWeb;
    }

    verify() {
        return this.checkNombre();
    }

    checkNombre() {
        return nombre != null && nombre != "";
    }


}

export { Crypto };