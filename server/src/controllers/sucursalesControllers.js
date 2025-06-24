const {Sucursal} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los sucursals
 const getAllSucursales=() => {
    try {
        const sucursales = Sucursal.findAll({
            order: [['Sucursal', 'ASC']],
        });
        return sucursales;
    } catch (error) {
        throw new Error(`Error al obtener las sucursals: ${error.message}`);
    };
 };

 //obtener un Sucursal por id
const getSucursalById = async (sucursalId) => {
    try {
        const sucursal = await Sucursal.findByPk(sucursalId);
        if (!sucursal) {
            throw new Error(`No existe Sucursal con ID ${sucursalId}`);
        }
        return sucursal;
    } catch (error) {
        throw new Error(`Error al obtener Sucursal: ${error.message}`);
    };
};
//obtener un Sucursal por nombre de Sucursal
const getSucursalByNombre = async (sucursal) => {
    try {
        const sucursales = await Sucursal.findAll({
            where: {
                sucursal: {
                    [Op.iLike]: `%${sucursal}%`
                },
            }});
        if (sucursales.length===0) throw new Error('sucursales no encontrados');
        return sucursales.slice(0,15);
    } catch (error) {
        throw new Error(`Error al obtener el Sucursal: ${error.message}`);
    };
};

//crear un Sucursal
const createSucursal = async (sucursalData) => {
    try {
        const nuevaSucursal = await Sucursal.create(sucursalData);
        return nuevaSucursal;
    } catch (error) {
        throw new Error(`Error al obtener el Sucursal: ${error.message}`);
    };
};

//actualizar un Sucursal
const updatesucursal = async (sucursalId, sucursalData) => {
    try {
        const sucursal = await Sucursal.findByPk(sucursalId);
        if (!sucursal) {
            throw new Error(`No existe Sucursal con ID ${sucursalId}`);
        };
        await Sucursal.update(sucursalData);
        return sucursal;
    } catch (error) {
        throw new Error(`Error al obtener el Sucursal: ${error.message}`);
    };
};

//Eliminar un Sucursal
const deletesucursal = async (sucursalId) => {
    try {
        const sucursal = await Sucursal.findByPk(sucursalId);
        if (!sucursal) {
            throw new Error(`No existe Sucursal con ID ${sucursalId}`);
        };
        await Sucursal.update({ eliminado: true });
        return sucursal;
    } catch (error) {
        throw new Error(`Error al obtener el Sucursal: ${error.message}`);
    };
};
  

module.exports = {
    getAllSucursales,
    getSucursalById,
    getSucursalByNombre,
    createSucursal,
    updatesucursal,
    deletesucursal,
};