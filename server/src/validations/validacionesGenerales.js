// Valida si una fecha es real y en formato DD-MM-YYYY
const esFechaValidaDDMMYYYY = (fechaStr) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(fechaStr)) return false;
    const [dia, mes, anio] = fechaStr.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    return (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia
    );
};

// Valida un rango de fechas usando la función anterior
const validarRangoFechas = (desde, hasta) => {
    if (!esFechaValidaDDMMYYYY(desde) || !esFechaValidaDDMMYYYY(hasta)) {
        throw new Error('Las fechas deben tener el formato DD-MM-YYYY y ser válidas.');
    };
    const [diaDesde, mesDesde, anioDesde] = desde.split('-').map(Number);
    const [diaHasta, mesHasta, anioHasta] = hasta.split('-').map(Number);
    const fechaDesde = new Date(anioDesde, mesDesde - 1, diaDesde);
    const fechaHasta = new Date(anioHasta, mesHasta - 1, diaHasta);
    if (fechaDesde > fechaHasta) {
        throw new Error('La fecha inicial no puede ser posterior a la fecha final.');
    };
    return true;
};

const validarTexto = (valor, nombreCampo, esOpcional = false) => {
  if (esOpcional && (valor === undefined || valor === null || valor === '')) {
    return null;
  };
  if (!valor && !esOpcional) {
    return `El campo ${nombreCampo} es requerido`;
  };
  if (typeof valor !== 'string') {
    return `El campo ${nombreCampo} debe ser texto`;
  };
  if (/\d/.test(valor)) {
    return `El campo ${nombreCampo} no debe contener números`;
  };
  return null;
};

//Funcion de apoyo para validar que los campos que deebn ser númericos
//cumplan esa condición, aparte de que sean valores váidos para DNIs o RUCs
const validarNumero = (valor, nombreCampo, longitud, esOpcional = false, valorPorDefecto = null) => {
  if (esOpcional && !valor) {
    return valorPorDefecto ? null : { error: null, valor: valorPorDefecto };
  };
  if (!valor && !esOpcional) {
    return `El campo ${nombreCampo} es requerido`;
  };
  const strValor = valor.toString();
  if (!/^\d+$/.test(strValor)) {
    return `El campo ${nombreCampo} solo debe contener dígitos`;
  };
  if (strValor.length !== longitud) {
    return `El campo ${nombreCampo} debe tener ${longitud} dígitos`;
  };
  return null;
};


//función de apoyo para validar que el teléfono sea válido
const validarTelefono = (telefono, esOpcional = true) => {
  if (esOpcional && !telefono) return null;
  const errorGeneral = validarNumero(telefono, 'teléfono', 9, esOpcional);
  if (errorGeneral && typeof errorGeneral === 'string') return errorGeneral;
  const numTelefono = parseInt(telefono);
  if (numTelefono <= 900000000) {
    return 'El teléfono debe ser mayor a 900000000';
  };
  return null;
};

//funcion de apoyo para validar que el RUC sea válido
const validarRUC = (ruc) => {
  const errorGeneral = validarNumero(ruc, 'RUC', 11, false);
  if (errorGeneral) return errorGeneral;
  if (!/^[12]/.test(ruc)) {
    return 'El RUC debe comenzar con 1 ó 2';
  };
  return null;
};

//funcion de apoyo para validar que el DNI sea válido
const validarDNI = (dni, esGenerico = false) => {
  if (esGenerico) {
    return { error: null, valor: '00000000' };
  }
  const resultado = validarNumero(dni, 'DNI', 8, false);
  return typeof resultado === 'string' ? { error: resultado } : { error: null, valor: dni };
};

const validarYFormatearPrecio =(valor, nombreCampo, isUpdate = false)=> {
  if (!isUpdate && (valor === undefined || valor === null)) return `El ${nombreCampo} es un campo obligatorio`;
  if (isUpdate && (valor === undefined || valor === null))return null; 
  const numero = parseFloat(valor);
  if (isNaN(numero)) return `El ${nombreCampo} debe ser un número válido`;
  if (numero < 0) return `El ${nombreCampo} no puede ser negativo`;
  valor = parseFloat(numero.toFixed(2));
  return null;
};

module.exports = { 
                esFechaValidaDDMMYYYY,
                validarRangoFechas,
                validarTexto,
                validarDNI,
                validarRUC,
                validarTelefono,
                validarYFormatearPrecio,
                };
