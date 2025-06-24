const {Producto} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los Productos
 const getAllProductos=(sucursalId = null) => {
    try {
        const whereConditions ={};
        if (sucursalId) {
            whereConditions.sucursalId = sucursalId;
        };
        const productos = Producto.findAll({
            where: whereConditions,
            order: [['producto', 'ASC']],
        });
        return productos;
    } catch (error) {
        throw new Error(`Error al obtener los Productos: ${error.message}`);
    };
 };

 //obtener un Producto por id
const getProductoById = async (productoId) => {
    try {
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            throw new Error(`No existe Producto con ID ${productoId}`);
        }
        return producto;
    } catch (error) {
        throw new Error(`Error al obtener el Producto: ${error.message}`);
    };
};
//obtener un Producto por nombre de peroducto
const getProductoByNombre = async (producto) => {
    try {
        const productos = await Producto.findAll({
            where: {
                producto: {
                    [Op.iLike]: `%${producto}%`
                },
            }});
        if (productos.length===0) throw new Error('Productos no encontrados');
        return productos.slice(0,15);
    } catch (error) {
        throw new Error(`Error al obtener el Producto: ${error.message}`);
    };
};

//crear un Producto
const createProducto = async (productoData) => {
    try {
        const nuevoProducto = await Producto.create(productoData);
        return nuevoProducto;
    } catch (error) {
        throw new Error(`Error al obtener el Producto: ${error.message}`);
    };
};

//actualizar un Producto
const updateProducto = async (productoId, productoData) => {
    try {
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            throw new Error(`No existe Producto con ID ${productoId}`);
        };
        await Producto.update(productoData);
        return producto;
    } catch (error) {
        throw new Error(`Error al obtener el Producto: ${error.message}`);
    };
};

//Eliminar un Producto
const deleteProducto = async (productoId) => {
    try {
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            throw new Error(`No existe Producto con ID ${productoId}`);
        };
        await Producto.update({ eliminado: true });
        return producto;
    } catch (error) {
        throw new Error(`Error al obtener el Producto: ${error.message}`);
    };
};
  

module.exports = {
    getAllProductos,
    getProductoById,
    getProductoByNombre,
    createProducto,
    updateProducto,
    deleteProducto,
};