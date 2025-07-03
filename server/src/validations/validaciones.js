//Funcion de apoyo para validar que los campos a llenar
//sean válidos, es decir, que por ejemplo en el mombre del cliente no vaya un número
//o que tengan una longitud mayir a 2 caracteres

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

//funcion de apoyo para establecer los valores a vacio en caso de cliente GENERICO
const esClienteGenerico = (cliente) => {
  return (
    cliente.tipoCliente === 'NATURAL' &&
    (!cliente.nombre || cliente.nombre.trim() === '') &&
    (!cliente.apellidoPaterno || cliente.apellidoPaterno.trim() === '') &&
    (!cliente.apellidoMaterno || cliente.apellidoMaterno.trim() === '')
  );
};

//funcion de apoyo para validar los datos del cliente persona NATURAL
const validarClienteNatural = (cliente) => {
  const errores = {};
  const esGenerico = esClienteGenerico(cliente);
  errores.nombre = validarTexto(cliente.nombre, 'nombre', true);
  errores.apellidoPaterno = validarTexto(cliente.apellidoPaterno, 'apellido paterno', true);
  errores.apellidoMaterno = validarTexto(cliente.apellidoMaterno, 'apellido materno', true);
  const validacionDNI = validarDNI(cliente.dni, esGenerico);
  if (validacionDNI.error) {
    errores.dni = validacionDNI.error;
  } else {
    cliente.dni = validacionDNI.valor; // Asigna '00000000' si es genérico
  };
  errores.telefono = validarTelefono(cliente.telefono, true);
  if (esGenerico) {
    if (!errores.apellidoPaterno) cliente.apellidoPaterno = 'GENERICO';
    if (!cliente.nombre) cliente.nombre = '';
    if (!cliente.apellidoMaterno) cliente.apellidoMaterno = '';
  };
  return errores;
};

//funcion de apooyo para validar los datos del cliente persona JURIDICA
const validarClienteJuridico = (cliente) => {
  const errores = {};
  if (!cliente.razonSocial) {
    errores.razonSocial = 'La razón social es requerida';
  } else if (typeof cliente.razonSocial !== 'string') {
    errores.razonSocial = 'La razón social debe ser texto';
  };
  errores.ruc = validarRUC(cliente.ruc);
  errores.telefono = validarTelefono(cliente.telefono, true);
  return errores;
};

//la función que llama a todas las auxiliares y que realiza las validaciones
const validarCliente = (cliente) => {
  if (!cliente.tipoCliente || !['NATURAL', 'JURIDICA'].includes(cliente.tipoCliente)) {
    throw new Error('Tipo de cliente inválido');
  };
  const errores = cliente.tipoCliente === 'NATURAL'
    ? validarClienteNatural(cliente)
    : validarClienteJuridico(cliente);
  const camposConError = Object.entries(errores)
    .filter(([_, valor]) => valor !== null)
    .reduce((acc, [key]) => ({ ...acc, [key]: errores[key] }), {});
  return {
    valido: Object.keys(camposConError).length === 0,
    errores: camposConError,
    datosValidados: cliente
  };
};

module.exports = {
  validarCliente,
};