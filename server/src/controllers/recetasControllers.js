const { Receta,Producto,Insumo } = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los recetas
const getAllRecetas = async () => {
  try {
    const recetas = await Receta.findAll({
      attributes: ['idReceta', 'idProducto', 'idInsumo', 'cantidad'],
      include: [
        {
          model: Producto,
          attributes: ['idProducto', 'producto'] 
        },
        {
          model: Insumo, 
          attributes: ['idInsumo', 'insumo'] 
        },
      ],
    });
    return recetas;
  } catch (error) {
    throw new Error(`Error al obtener las recetas: ${error.message}`);
  }
};
//obtener un Receta por id
const getRecetaById = async (recetaId) => {
  try {
    const receta = await Receta.findByPk(recetaId,{
        attributes: ['idReceta', 'idProducto', 'idInsumo', 'cantidad'],
        include: [
          {
            model: Producto,
            attributes: ['idProducto', 'producto']
          },
          {
            model: Insumo,
            attributes: ['idInsumo', 'insumo']
          },
        ],  
    });
    if (!receta) {
      throw new Error(`No existe Receta con ID ${id}`);
    }
    return Receta;
  } catch (error) {
    throw new Error(`Error al obtener la receta, ${error.message}`);
  };
};

const getRecetaByProducto = async (nombreProducto) => {
  try {
    const recetas = await Receta.findAll({
      attributes: ['idReceta', 'idProducto', 'idInsumo', 'cantidad'],
      include: [
        {
          model: Producto,
          where: {
            producto: {
              [Op.iLike]: `%${nombreProducto}%` 
            }
          },
          attributes: ['idProducto', 'producto'],
          required: true,
        },
        {
          model: Insumo,
          attributes: ['idInsumo', 'insumo']
        },
      ],
    });
    if (recetas.length === 0) {
      throw new Error('No se encontraron recetas con ese producto');
    };
    return recetas;
  } catch (error) {
    throw new Error(`Error al buscar recetas: ${error.message}`);
  };
};

//obtener todas las recetas que usen un insumo
const getRecetaByInsumo = async (nombreInsumo) => {
  try {
    const recetas = await Receta.findAll({
      attributes: ['idReceta', 'idProducto', 'idInsumo', 'cantidad'],
      include: [
        {
          model: Insumo,
          where: {
            insumo: {
              [Op.iLike]: `%${nombreInsumo}%` 
            },
          },
          attributes: ['idInsumo', 'insumo'],
          required: true,
        },
        {
          model: Producto,
          attributes: ['idProducto', 'producto']
        },
      ],
    });
    if (recetas.length === 0) {
      throw new Error('No se encontraron recetas con ese insumo');
    };
    return recetas;
  } catch (error) {
    throw new Error(`Error al buscar recetas: ${error.message}`);
  };
};

//crear un Receta
const createReceta = async (recetaData) => {
  try {
    const nuevaReceta = await Receta.create(recetaData);
    return nuevaReceta;
  } catch (error) {
    throw new Error(`Error al crear Receta: ${error.message}`);
  };
}; 

//actualizar un Receta
const updateReceta = async (recetaId, recetaData) => {
    try {
        const receta = await Receta.findByPk(recetaId);
        if (!receta) {
            throw new Error(`Receta no encontrada con Id: ${recetaId}`);
        };
        await Receta.update(recetaData);
        return Receta;
    } catch (error) {
        throw new Error(`Error al actualizar la Receta: ${error.message}`);
    };
};

//Eliminar un Receta
const deleteReceta = async (recetaId) => {
    try {
        const receta = await Receta.findByPk(id);
        if (!receta) {
            throw new Error(`Receta no encontrada con Id: ${recetaId}`);
        };
        await Receta.update({ eliminado: true });
        return receta;
    } catch (error) {
        throw new Error(`Receta no encontrada con Id: ${error.message}`);
    };
};

module.exports = {
    getAllRecetas,
    getRecetaById,
    getRecetaByProducto,
    getRecetaByInsumo,
    createReceta,
    updateReceta,
    deleteReceta,
};