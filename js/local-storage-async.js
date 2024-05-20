// local-storage.js
// Simulando una respuesta asincrónica con un retardo de 2 segundos

const delay = 2.5; // en segundos

// Función asincrónica para leer del localStorage
export function read(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const value = JSON.parse(localStorage.getItem(key));
        resolve(value);
      } 
      catch (error) {
        reject(error);
      }
    }, delay * 1000);
  });
}

// Función asincrónica para escribir en el localStorage
export function save(key, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    }, delay * 1000);
  });
}

// Función asincrónica para limpiar una clave del localStorage
export function clear(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.removeItem(key);
        resolve();
      } catch (error) {
        reject(error);
      }
    }, delay * 1000);
  });
}


// Función para convertir de JSON string a objeto
export function jsonToObject(jsonString) {
  return JSON.parse(jsonString);
}

// Función para convertir de objeto a JSON string
export function objectToJson(objeto) {
  return JSON.stringify(objeto);
}
