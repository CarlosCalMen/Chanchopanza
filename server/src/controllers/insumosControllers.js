const {Insumo} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los Insumos
 const getAllInsumos=(sucursalId = null) => {
    try {
        const whereConditions ={};
        if (sucursalId) {
            whereConditions.sucursalId = sucursalId;
        };
        const Insumos = Insumo.findAll({
            where: whereConditions,
            order: [['insumo', 'ASC']],
        });
        return Insumos;
    } catch (error) {
        throw new Error(`Error al obtener los Insumos: ${error.message}`);
    };
 };

 //obtener un Insumo por id
const getInsumoById = async (insumoId) => {
    try {
        const insumo = await Insumo.findByPk(insumoId);
        if (!insumo) {
            throw new Error(`No existe Insumo con ID ${insumoId}`);
        }
        return insumo;
    } catch (error) {
        throw new Error(`Error al obtener el Insumo: ${error.message}`);
    };
};
//obtener un Insumo por apellido
const getInsumoByNombre = async (insumo) => {
    try {
        const insumos = await Insumo.findAll({
            where: {
                insumo:{
                    [Op.iLike]: `%${insumo}%`
                },
            }});
        if (insumos.length===0) throw new Error('Insumos no encontrados');
        return insumos.slice(0,15);
    } catch (error) {
        throw new Error(`Error al obtener el Insumo: ${error.message}`);
    };
};
//obtener un Insumo por categoría
const getInsumoByCategoria = async (categoriaInsumo)=> {
    try {
        const insumos = await Insumo.findAll({
            where: {
                categoria: categoriaInsumo,
            },
        });
        if (insumos.length===0) {
            throw new Error(`No existe Insumo con categoría ${categoriaInsumo}`);
        }
        return insumos;
    } catch (error) {
        throw new Error(`Error al obtener el Insumo: ${error.message}`);
    }
};

//crear un Insumo
const createInsumo = async (insumoData) => {
    try {
        const nuevoInsumo = await Insumo.create(insumoData);
        return nuevoInsumo;
    } catch (error) {
        throw new Error(`Error al obtener el Insumo: ${error.message}`);
    };
};

//actualizar un Insumo
const updateInsumo = async (insumoId, insumoData) => {
    try {
        const insumo = await Insumo.findByPk(insumoId);
        if (!insumo) {
            throw new Error(`No existe Insumo con ID ${insumoId}`);
        };
        await Insumo.update(insumoData);
        return insumo;
    } catch (error) {
        throw new Error(`Error al obtener el Insumo: ${error.message}`);
    };
};

//Eliminar un Insumo
const deleteInsumo = async (insumoId) => {
    try {
        const insumo = await Insumo.findByPk(insumoId);
        if (!insumo) {
            throw new Error(`No existe Insumo con ID ${insumoId}`);
        };
        await Insumo.update({ eliminado: true });
        return insumo;
    } catch (error) {
        throw new Error(`Error al obtener el Insumo: ${error.message}`);
    };
};
  

module.exports = {
    getAllInsumos,
    getInsumoById,
    getInsumoByNombre,
    getInsumoByCategoria,
    createInsumo,
    updateInsumo,
    deleteInsumo,
};