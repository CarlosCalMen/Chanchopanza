//require('dotenv').config();
const { Comanda, Sucursal, Cliente, Producto, DetalleComanda} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todas las comandas
const getAllComandas=async()=>{
    try {
        const comandas = await Comanda.findAll({
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
                        attributes:['idProducto', 'producto', 'precioVenta' ],
                    }],
                },
                {
                    model: Sucursal,
                    attributes: ['idSucursal', 'nombre']
                },
            ],
            order: [['fecha', 'DESC']], 
        });
        return comandas;
    } catch (error) {
        throw new Error(`Error al obtener las comandas ${error.message}`);
    };
};
//obtener comanda por id
const getComandaById=async(comandaId)=>{
    try {
        const comanda = await Comanda.findByPk(comandaId, {
            where:{
                idComanda: comandaId,
            },
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
                        attributes: ['idProducto', 'producto', 'precioVenta'],
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
const getComandasByClienteId=async(clienteId)=>{
    try {
        const comandas = await Comanda.findAll({
            where: {
                idCliente: clienteId,
            },
            include: [
                {
                    model: Cliente,
                    attributes: ['idCliente', 'nombre', 'apellido', 'dni', 'ruc']
                },
                {
                    model: DetalleComanda,
                    attributes:['idDetalleComanda', 'cantidad','precioVenta', 'variacion', 'subTotal'],
                    include:[{
                        model: Producto,
                        attributes: ['idProducto', 'producto', 'precioVenta'],
                    }]
                },
                {
                    model: Sucursal,
                    attributes: ['idSucursal', 'nombre']
                },
            ],
            order: [['fecha', 'DESC']]           
        });
        if (comandas.length === 0) throw new Error(`No existen comandas para el cliente con el documento indicado`);
        return comandas;
    } catch (error) {
        throw new Error(`Error al obtener la comanda: ${error.message}`);
    };
};

//obtener comandas de una sucursal por fecha
const getComandasByFecha=async(desde, hasta, sucursalId=null)=>{
    try {
        const whereConditions = {
            fecha: {
                [Op.between]: [desde, hasta],
            },
        };
        if (sucursalId) {
            whereConditions.idSucursal = sucursalId;
        };
        const comandas = await Comanda.findAll({
            where: whereConditions,
            include: [
                {
                    model: Cliente,
                    attributes: ['idCliente', 'nombre', 'apellido', 'dni', 'ruc'],
                },
                {
                    model: DetalleComanda,
                    attributes:['idDetalleComanda', 'cantidad', 'precioVenta', 'variacion', 'subTotal'],
                    include:[{
                        model: Producto,
                        attributes: ['idProducto', 'producto', 'precioVenta'],
                    }],
                },
                {
                    model: Sucursal,
                    attributes: ['idSucursal', 'nombre']
                },
            ],
            order: [['total', 'DESC']] 
        });
        if (comandas.length === 0) throw new Error(`No existen comandas en el rango de fechas especificado${sucursalId ? ' para esta sucursal' : ''}`);
        return comandas;
    } catch (error) {
        throw new Error(`Error al obtener las comandas: ${error.message}`);
    };
};  

//Obtener comandas por estado
const getComandasByEstado=async(estadoComanda)=>{
    try {
        const comandas = await Comanda.findAll({
            where: {
                estado: estadoComanda,
            },
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
                        attributes: ['idProducto', 'producto', 'precioVenta'],
                    }],
                },
                {
                    model: Sucursal,
                    attributes: ['idSucursal', 'nombre']
                },
            ],
            order: [['fecha', 'DESC']], 
        });
        if (comandas.length === 0) throw new Error(`No existen comandas en estado: ${estadoComanda}`);
        return comandas;
    } catch (error) {
        throw new Error(`Error al obtener las comandas: ${error.message}`);
    };
};

//obtener ingresos por fecha
const getIngresosByFecha=async(desde,hasta,sucursalId=null)=>{
    try {
        // Asume que las fechas ya están validadas
        const whereConditions = {
            fecha: {
                [Op.between]: [new Date(desde), new Date(hasta)],
            },
            estado: 'Cancelada',
        };
        if (sucursalId) {
            whereConditions.idSucursal = sucursalId;
        };
        const resultado = await Comanda.sum('total', {
            where: whereConditions,
        });
        return resultado || 0;
    } catch (error) {
        throw new Error(`Error al totalizar comandas: ${error.message}`);
    }
};

//pagar comanda
const pagarComanda=async(comandaId)=>{
    try {
        const comanda = await Comanda.findByPk(comandaId);
        if (!comanda) throw new Error(`Comanda con id: ${comandaId} no encontrada`);
        await comanda.update({estado: 'Cancelada'});
        return comanda;
    } catch (error) {
        throw new Error(`Error al obtener las comandas: ${error.message}`);
    };
};

//actualizar comandas
const updateComanda = async (comandaId, { comandaData, detalles }) => {
    const transaction = await sequelize.transaction();
    try {
        const comanda = await Comanda.findByPk(comandaId, { transaction });
        await comanda.update(comandaData || {}, { transaction });
        //  Procesar detalles si se proporcionan
        if (detalles) {
            // Separar detalles en operaciones
            const [toUpdate, toCreate] = detalles.reduce(
                (acc, detalle) => {
                    acc[detalle.idDetalleComanda ? 0 : 1].push(detalle);
                    return acc;
                }, 
                [[], []]
            );
            // Eliminación eficiente
            if (toUpdate.length > 0) {
                await DetalleComanda.destroy({
                    where: {
                        comandaId,
                        idDetalleComanda: { 
                            [Op.notIn]: toUpdate.map(detalle => detalle.idDetalleComanda) 
                        }
                    },
                    transaction,
                });
            } else {
                // Si no hay detalles para actualizar, eliminar todos
                await DetalleComanda.destroy({
                    where: { comandaId },
                    transaction,
                });
            };
            // Actualización en lote
            await Promise.all(
                toUpdate.map(detalle =>
                    DetalleComanda.update(detalle, {
                        where: { idDetalleComanda: detalle.idDetalleComanda },
                        transaction
                    }),
                ),
            );
            // Creación en lote
            if (toCreate.length > 0) {
                await DetalleComanda.bulkCreate(
                    toCreate.map(d => ({ ...d, comandaId })),
                    { transaction }
                );
            };
        };
        await transaction.commit();
        // Devolver comanda con relaciones
        return await Comanda.findByPk(comandaId, {
            include: [{
                model: DetalleComanda,
                include: [Producto]
            }],
            transaction
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

//obtener ranking de productos
const getProductosVendidos = async (desde, hasta, sucursalId = null) => {
    try {
        const whereConditions = {
            fecha: { [Op.between]: [new Date(desde), new Date(hasta)] },
            estado: 'Pagada'
        };
        if (sucursalId) {
            whereConditions.sucursalId = sucursalId;
        };
        const reporte = await DetalleComanda.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('cantidad')), 'totalVendido'],
                [sequelize.fn('SUM', sequelize.literal('cantidad * "DetalleComanda"."subTotal"')), 'ingresosTotales']
            ],
            include: [
                {
                    model: Producto,
                    attributes: ['nombre'],
                    required: true
                },
                {
                    model: Comanda,
                    where: whereConditions,
                },
            ],
            group: ['Producto.nombre'],
            order: [[sequelize.literal('totalVendido'), 'DESC']],
            raw: true
        });
        return reporte.map(item => ({
            producto: item['Producto.nombre'],
            unidadesVendidas: parseInt(item.totalVendido),
            ingresos: parseFloat(item.ingresosTotales).toFixed(2)
        }));
    } catch (error) {
        throw new Error(`Error generando reporte: ${error.message}`);
    }
};
//eliminar comanda
const deleteComanda = async (comandaId) => {
    try {
        const comanda = await Comanda.findByPk(comandaId);
        if (!comanda) {
            throw new Error(`Comanda con id: ${comandaId}`);
        };
        await comanda.udpdate({ eliminado: true });
        return comanda;
    } catch (error) {
        throw new Error(`Error al eliminar comanda: ${error.message}`);
    };
};

//crear comandas
const createComanda = async (comandaData, detalles) => {
    const transaction = await sequelize.transaction();
    try {
        const nuevaComanda = await Comanda.create(comandaData, { transaction });
        await DetalleComanda.bulkCreate(
            detalles.map(detalle => ({ ...detalle, comandaId: nuevaComanda.idComanda })),
            { transaction }
        );
        await transaction.commit();
        return await Comanda.findByPk(nuevaComanda.idComanda, {
            include: [DetalleComanda],
            transaction,
        });
    } catch (error) {
        try {
            await transaction.rollback();
        } catch (rollbackError) {
            console.error('Rollback fallido:', rollbackError);
        }
        error.message = `Error al crear la comanda: ${error.message}`;
        throw error;
    }
};

module.exports = {
    getAllComandas,
    getComandaById,
    getComandasByClienteId,
    getComandasByFecha,
    getComandasByEstado,
    getIngresosByFecha,
    getProductosVendidos,
    pagarComanda,
    updateComanda,
    deleteComanda,
    createComanda,
};