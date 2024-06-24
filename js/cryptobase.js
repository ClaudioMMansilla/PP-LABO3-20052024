class CryptoBase{
    constructor(id, nombre, fecha, simbolo, precioActual) {
        this.id = id;
        this.nombre = nombre;
        this.simbolo = simbolo;
        this.fechaCreacion = fecha;
        this.precioActual = precioActual;
    }

    verify(nombre, simbolo, precioActual) {
        if(this.checkNombre(nombre) && 
        this.checkSimbolo(simbolo) &&
        this.checkPrecio(precioActual)
        ){
            return true;
        } else {return false; }
    }
    
    checkNombre(nombre) {
        if(nombre != null && nombre.length >0 && nombre.length <20){
            return true;
        } else { 
            alert("El campo 'nombre' es inválido, verifique datos (máx 20 carácteres)");
            return false;
        }
    }

    checkSimbolo(simbolo) {
        if(simbolo != null && simbolo.length >0 && simbolo.length <20){
            return true;
        } else { 
            alert("El campo 'simbolo' es inválido, verifique datos (máx 20 carácteres)");
            return false;
        }
    }

    checkPrecio(precioActual) {
        if(precioActual != null && parseInt(precioActual) >0){
            return true;
        } else { 
            alert("El campo 'precio' es inválido, verifique datos (debe ser mayor a cero)");
            return false;
        }
    }

}

export { CryptoBase };