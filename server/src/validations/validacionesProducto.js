const { validarTexto, validarYFormatearPrecio } = require('./validacionesGenerales');

const validarProducto = (producto,precioCosto,precioVenta, esActualizacion = false) => {
  const errores = {};
  if (!esActualizacion || producto !== undefined) {
    const errorProducto = validarTexto(producto, 'producto');
    if (errorProducto) {
      errores.producto = errorProducto;
    };
  };
  if (!esActualizacion || precioCosto !== undefined) {
    const errorPrecioCosto = validarYFormatearPrecio(precioCosto, 'precio de costo', esActualizacion);
    if (errorPrecioCosto) {
      errores.precioCosto = errorPrecioCosto;
    };
  };
  if (!esActualizacion || precioVenta !== undefined) {
    const errorPrecioVenta = validarYFormatearPrecio(precioVenta, 'precio de venta', esActualizacion);
    if (errorPrecioVenta) {
      errores.precioVenta = errorPrecioVenta;
    };
  };
  return Object.keys(errores).length === 0 ? null : errores;
};

const validarCreacionProducto = (producto, precioCosto, precioVenta) => {
  return validarProducto(producto, precioCosto, precioVenta, false);
};

const validarActualizacionProducto = (producto, precioCosto, precioVenta) => {
  return validarProducto(producto, precioCosto, precioVenta, true);
};

module.exports = {
  validarCreacionProducto,
  validarActualizacionProducto
};