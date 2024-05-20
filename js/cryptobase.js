class CryptoBase{
    constructor(id, nombre, fecha, simbolo, precioActual) {
        this.id = id;
        this.nombre = nombre;
        this.simbolo = simbolo;
        this.fechaCreacion = fecha;
        this.precioActual = precioActual;
    }
}

export { CryptoBase };