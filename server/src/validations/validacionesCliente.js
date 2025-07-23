const {validarTexto, validarDNI, validarRUC,validarTelefono } = require('./validacionesGenerales');



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