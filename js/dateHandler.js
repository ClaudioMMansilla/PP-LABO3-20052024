function getDateNowFormatted() {
    const today = new Date(Date.now());
  
    // Obtenemos los componentes de la today
    const day = String(today.getDate()).padStart(2, '0'); // Día con ceros iniciales si es necesario
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes (se suma 1 porque los meses van de 0 a 11)
    const year = today.getFullYear(); // Año
  
    // Formateamos la fecha como dd-mm-yyyy
    const strToday = `${day}-${month}-${year}`;
    return strToday;
  }

export { getDateNowFormatted };