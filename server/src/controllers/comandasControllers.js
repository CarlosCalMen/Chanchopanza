require('dotenv').config();
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
        if (!comandas) throw new Error(`No existen comandas para el cliente con el documento indicado`);
        return comandas;
    } catch (error) {
        throw new Error(`Error al obtener la comanda: ${error.message}`);
    };
};

//obtener comandas de una sucursal por fecha
const getComandasByFecha=async(fechaConsumo, sucursalId)=>{
    try {
        const comandas = await Comanda.findAll({
            where: {
                fecha: fechaConsumo,
                idSucursal: sucursalId,
            },
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
        if (!comandas) throw new Error(`No existen comandas con fecha: ${fechaConsumo}`);
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
        if (!comandas) throw new Error(`No existen comandas en estado: ${estadoComanda}`);
        return comandas;
    } catch (error) {
        throw new Error(`Error al obtener las comandas: ${error.message}`);
    };
};

//obtener ingresos por fecha
const getIngresosByFecha=async(desde,hasta)=>{
    try {
        // Asume que las fechas ya están validadas
        const resultado = await Comanda.sum('total', {
            where: {
                fecha: {
                    [Op.between]: [new Date(desde), new Date(hasta)],
                },
                estado: 'Cancelada',
            },
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
        // 1. Actualizar comanda principal
        const comanda = await Comanda.findByPk(comandaId, { transaction });
        if (!comanda) throw new Error('Comanda no encontrada');
        
        if (comandaData) {
            await comanda.update(comandaData, { transaction });
        };
        // 2. Procesar detalles solo si se enviaron
        if (detalles) {
            const detallesActuales = await DetalleComanda.findAll({ 
                where: { comandaId }, 
                transaction, 
            });
            // --- Lógica de sincronización ---
            // IDs de detalles recibidos (los que tienen id son existentes)
            const detallesRecibidosIds = detalles.filter(d => d.idDetalleComanda).map(d => d.idDetalleComanda);
            // Eliminar detalles no incluidos en la petición
            const detallesAEliminar = detallesActuales.filter(da => !detallesRecibidosIds.includes(da.idDetalleComanda));
            await DetalleComanda.destroy({
                where: { 
                    idDetalleComanda: detallesAEliminar.map(d => d.idDetalleComanda) 
                },
                transaction,
            });
            // Actualizar/Crear detalles
            for (const detalle of detalles) {
                if (detalle.idDetalleComanda) {
                    // Actualizar detalle existente
                    await DetalleComanda.update(detalle, {
                        where: { idDetalleComanda: detalle.idDetalleComanda },
                        transaction
                    });
                } else {
                    // Crear nuevo detalle
                    await DetalleComanda.create({
                        ...detalle,
                        comandaId
                    }, { transaction });
                };
            };
        };
        await transaction.commit();
        // Devolver comanda actualizada con detalles
        return await Comanda.findByPk(comandaId, {
            include: [{
                model: DetalleComanda,
                include: [Producto] // Opcional: incluir productos si es necesario
            }],
            transaction,
        });
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al actualizar comanda: ${error.message}`);
    };
};

//obtener ranking de productos
const getProductosVendidos = async (sucursalId,Desde,Hasta) => {
    try {
        const reporte = await DetalleComanda.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('cantidad')), 'totalVendido'],
                [sequelize.fn('SUM', sequelize.literal('cantidad * "DetalleComanda"."precioVenta"')), 'ingresosTotales']
            ],
            include: [
                {
                    model: Producto,
                    attributes: ['nombre'], 
                    required: true
                },
                {
                    model: Comanda,
                    where: {
                        fecha: { [Op.between]: [new Date(fechaDesde), new Date(fechaHasta)] },
                        sucursalId: sucursalId,
                        estado: 'Pagado',
                    },
                   // attributes: []
                }
            ],
            group: ['Producto.nombre'],
            order: [[sequelize.literal('totalVendido'), 'DESC']], 
            raw: true
        });
        return reporte.map(item => ({
            producto: item['Producto.nombre'],
            unidadesVendidas: parseInt(item.totalVendido),
            ingresos: parseFloat(item.ingresosTotales).toFixed(2) // Formato monetario
        }));
    } catch (error) {
        throw new Error(`Error generando reporte: ${error.message}`);
    }
};

//eliminar comanda
const deleteComanda = async (comandaId) => {
    try {
        const comanda = await Comanda.findByPk(id);
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
    getProductosVendidos
};