require('dotenv').config();
const { Comanda, Sucursal, Cliente, Producto, DetalleComanda} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todas las comandas
const getAllComandas=async()=>{
    try {
        const comandas = await Comanda.findAll();
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};
//obtener comandas por id
const getComandaById=async(id)=>{
    try {
        const comanda = await Comanda.findByPk(id, {
            include: [
                {
                    model: Cliente,
                    attributes: ['idCliente', 'nombre', 'apellido', 'dni', 'ruc']
                },
                {
                    model: DetalleComanda,
                    attributes:['idDetalleComanda', 'cantidad', 'precioVenta', 'variacion', 'subTotal'],
                    include:[{
                        model: Producto,
                        attributes: ['idProducto', 'nombre', 'precioVenta'],
                    }],
                },
                {
                    model: Sucursal,
                    attributes: ['idSucursal', 'nombre']
                }   
            ]
        });
        if (!comanda) throw new Error(`No existe Comanda con ID ${id}`);
        return comanda;
    } catch (error) {
        throw new Error(`Error al obtener la comanda: ${error.message}`);
    };
};
//obtener comandas por id de cliente
const getComandasByClienteId=async(id)=>{
    try {
        const comandas = await Comandas.findAll({
            where: {
                clienteId: id
            }
        });
        if (!comandas) throw new Error('Comanda no encontradas');
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};

//obtener comandas por fecha
const getComandasByFecha=async(fecha)=>{
    try {
        const comandas = await Comandas.findAll({
            where: {
                fecha: fecha
            }
        });
        if (!comandas) throw new Error('Comanda no encontradas');
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};  

//Obtener comandas por estado
const getComandasByEstado=async(estado)=>{
    try {
        const comandas = await Comandas.findAll({
            where: {
                estado: estado
            }
        });
        if (!comandas) throw new Error('Comanda no encontradas');
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};

//obtener ingresos por fecha
const getIngresosByFecha=async(fecha)=>{
    try {
        const comandas = await Comandas.findAll({
            where: {
                fecha: fecha
            }
        });
        if (!comandas) throw new Error('Comanda no encontradas');
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};

//pagar comanda
const pagarComanda=async(id)=>{
    try {
        const comandas = await Comandas.findByPk(id);
        if (!comandas) throw new Error('Comanda no encontradas');
        await comandas.update({estado: 'pagado'});
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};

//añadir producto a Comanda
const addProductoToComanda=async(id,producto)=>{
    try {
        const comandas = await Comandas.findByPk(id);
        if (!comandas) throw new Error('Comanda no encontradas');
        await comandas.update({productos: [...comandas.productos, producto]});
        return comandas;
    } catch (error) {
        throw new Error('Error al obtener las comandas');
    };
};

//actualizar comandas
const updateComandas = async (id, comandasData) => {
    try {
        const comandas = await Comandas.findByPk(id);
        if (!comandas) {
            throw new Error('Comanda no encontrada');
        };
        await comandas.update(comandasData);
        return comandas;
    } catch (error) {
        throw new Error('Error al actualizar la comanda');
    };
};

//obtener Produtos más vendidos
const getProductosMasVendidos=async()=>{
    try {
        const comandas = await Comandas.findAll();
        if (!comandas) throw new Error('No se pudiroen obtener los productos más vendidos');
        return comandas;
    } catch (error){
        throw new Error('Error al obtener las comandas');
    }
};    

//eliminar comandas
const deleteComandas = async (id) => {
    try {
        const comandas = await Comandas.findByPk(id);
        if (!comandas) {
            throw new Error('Comanda no encontrada');
        };
        await comandas.destroy();
        return comandas;
    } catch (error) {
        throw new Error('Error al eliminar la comanda');
    };
};

//crear comandas
const createComandas = async (comandasData) => {
    try {
        const nuevaComanda = await Comandas.create(comandasData);
        return nuevaComanda;
    } catch (error) {
        throw new Error('Error al crear Comanda');
    };
};