const { validarTexto } = require('./validacionesGenerales');

const categoriasValidas = ['BEBIDAS', 'PRODUCTO ELABORADO', 'INSUMO', 'SERVICIO'];
const unidadesValidas = ['KG', 'UN', 'PQT', 'ATADO'];

const validarInsumo = ({ insumo,categoria,precio,unidad,eliminado}, esActualizacion = false) => {
  const errores = {};
  if (!esActualizacion || insumo !== undefined) {
    const errorInsumo = validarTexto(insumo, 'insumo');
    if (errorInsumo) {
      errores.insumo = errorInsumo;
    };
  };
  if (!esActualizacion || categoria !== undefined) {
    const errorCategoria = validarTexto(categoria, 'categoria');
    if (errorCategoria) {
      errores.categoria = errorCategoria;
    } else if (categoria && !categoriasValidas.includes(categoria)) {
      errores.categoria = `La categoría debe ser una de: ${categoriasValidas.join(', ')}`;
    };
  };
  if (!esActualizacion || unidad !== undefined) {
    const errorUnidad = validarTexto(unidad, 'unidad');
    if (errorUnidad) {
      errores.unidad = errorUnidad;
    } else if (unidad && !unidadesValidas.includes(unidad)) {
      errores.unidad = `La unidad debe ser una de: ${unidadesValidas.join(', ')}`;
    };
  };
  if (!esActualizacion || precio !== undefined) {
    if (precio === undefined || precio === null) {
      errores.precio = 'El campo precio es requerido';
    } else if (typeof precio !== 'number' || isNaN(precio)) {
      errores.precio = 'El campo precio debe ser un número';
    } else if (precio < 0) {
      errores.precio = 'El precio no puede ser negativo';
    };
  };
  if (eliminado !== undefined && typeof eliminado !== 'boolean') {
    errores.eliminado = 'El campo eliminado debe ser un booleano';
  };
  return Object.keys(errores).length === 0 ? null : errores;
};

const validarCreacionInsumo = (insumo, categoria, precio, unidad, stock, eliminado) => {
  return validarInsumo({ insumo, categoria, precio, unidad, stock, eliminado }, false);
};

const validarActualizacionInsumo = (insumo, categoria, precio, unidad, stock, eliminado) => {
  return validarInsumo({ insumo, categoria, precio, unidad, stock, eliminado }, true);
};

module.exports = {
  validarCreacionInsumo,
  validarActualizacionInsumo
};