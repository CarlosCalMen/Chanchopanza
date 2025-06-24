const {Proveedor} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los Proveedors
 const getAllProveedores=(sucursalId = null) => {
    try {
        const whereConditions ={};
        if (sucursalId) {
            whereConditions.sucursalId = sucursalId;
        };
        const proveedores = Proveedor.findAll({
            where: whereConditions,
            order: [['proveedor', 'ASC']],
        });
        return proveedores;
    } catch (error) {
        throw new Error(`Error al obtener los Proveedors: ${error.message}`);
    };
 };

 //obtener un Proveedor por id
const getProveedorById = async (proveedorId) => {
    try {
        const proveedor = await Proveedor.findByPk(proveedorId);
        if (!proveedor) {
            throw new Error(`No existe Proveedor con ID ${proveedorId}`);
        }
        return proveedor;
    } catch (error) {
        throw new Error(`Error al obtener el Proveedor: ${error.message}`);
    };
};
//obtener un Proveedor por nombre de proveedor
const getProveedorByNombre = async (proveedor) => {
    try {
        const proveedores = await Proveedor.findAll({
            where: {
                proveedor: {
                    [Op.iLike]: `%${proveedor}%`
                },
            }});
        if (proveedores.length===0) throw new Error('Proveedores no encontrados');
        return proveedores.slice(0,15);
    } catch (error) {
        throw new Error(`Error al obtener el Proveedor: ${error.message}`);
    };
};

//crear un Proveedor
const createProveedor = async (productoData) => {
    try {
        const nuevoProveedor = await Proveedor.create(productoData);
        return nuevoProveedor;
    } catch (error) {
        throw new Error(`Error al obtener el Proveedor: ${error.message}`);
    };
};

//actualizar un Proveedor
const updateProveedor = async (proveedorId, productoData) => {
    try {
        const proveedor = await Proveedor.findByPk(proveedorId);
        if (!proveedor) {
            throw new Error(`No existe Proveedor con ID ${proveedorId}`);
        };
        await Proveedor.update(productoData);
        return proveedor;
    } catch (error) {
        throw new Error(`Error al obtener el Proveedor: ${error.message}`);
    };
};

//Eliminar un Proveedor
const deleteProveedor = async (proveedorId) => {
    try {
        const proveedor = await Proveedor.findByPk(proveedorId);
        if (!proveedor) {
            throw new Error(`No existe Proveedor con ID ${proveedorId}`);
        };
        await Proveedor.update({ eliminado: true });
        return proveedor;
    } catch (error) {
        throw new Error(`Error al obtener el Proveedor: ${error.message}`);
    };
};
  

module.exports = {
    getAllProveedores,
    getProveedorById,
    getProveedorByNombre,
    createProveedor,
    updateProveedor,
    deleteProveedor,
};