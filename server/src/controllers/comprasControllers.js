const {Compra,Insumo,Proveedor,DetalleCompra} = require('../db.js');
const { Op } = require('sequelize');

//obtener todas las compras    
const getAllCompras =()=>{
    try {
        const compras = Compra.findAll({
            include: [
                {
                    model: DetalleCompra,
                    attributes: ['idDetalleCompra', 'cantidad', 'precioCompra', 'variacion', 'subTotal'],
                    include: [
                        {
                            model: Insumo,
                            attributes: ['idInsumo', 'insumo', 'precioCompra'],
                        },
                    ],
                },
                {
                    model: Proveedor,
                    attributes: ['idProveedor', 'nombre', 'ruc'],
                },
            ],
            order: [['fecha', 'DESC']],
        });
        return compras;
    } catch (error) {
        throw new Error(`Error al obtener las compras ${error.message}`);
    };
};

//obtener compra por id
const getCompraById = async (compraId) => {
    try {
        const compra = await Compra.findByPk(compraId, {
            where: {
                idCompra: compraId,
            },
            include: [
                {
                    model: DetalleCompra,
                    attributes: ['idDetalleCompra', 'cantidad', 'precioCompra', 'variacion', 'subTotal'],
                    include: [
                        {
                            model: Insumo,
                            attributes: ['idInsumo', 'insumo', 'precioCompra'],
                        },
                    ],
                },
                {
                    model: Proveedor,
                    attributes: ['idProveedor', 'nombre', 'ruc'],
                },
            ],
        });
        if (!compra) throw new Error(`No existe la compra con el id ${compraId}`);
        return compra;
    } catch (error) {
        throw new Error(`Error al obtener la compra ${error.message}`);
    };
};

//obtener compras por id de proveedor
const getComprasByProveedorId = async (proveedorId) => {
    try {
        const compras = await Compra.findAll({
            where: {
                idProveedor: proveedorId,
            },
            include: [
                {
                    model: DetalleCompra,
                    attributes: ['idDetalleCompra', 'cantidad', 'precioCompra', 'variacion', 'subTotal'],
                    include: [
                        {
                            model: Insumo,
                            attributes: ['idInsumo', 'insumo', 'precioCompra'],
                        },
                    ],
                },
                {
                    model: Proveedor,
                    attributes: ['idProveedor', 'nombre', 'ruc'],
                },
            ],
            order: [['fecha', 'DESC']],
        });
        if (!compras) throw new Error(`No existen compras para el proveedor con el ID ${proveedorId}`);
        return compras;
    } catch (error) {
        throw new Error(`Error al obtener la compra: ${error.message}`);
    };
};

//obtener compras por fecha en sucursal, si sucursal es null todas las compras en general
const getComprasByFecha = async (desde, hasta, sucursalId = null) => {
    try {
        const whereConditions = {
            fecha: {
                [Op.between]: [desde, hasta],
            },
        };
        if (sucursalId) {
            whereConditions.idSucursal = sucursalId;
        };
        const compras = await Compra.findAll({
            where: whereConditions,
            include: [
                {
                    model: DetalleCompra,
                    attributes: ['idDetalleCompra', 'cantidad', 'precioCompra', 'variacion', 'subTotal'],
                    include: [
                        {
                            model: Insumo,
                            attributes: ['idInsumo', 'insumo', 'precioCompra'],
                        },
                    ],
                },
                {
                    model: Proveedor,
                    attributes: ['idProveedor', 'nombre', 'ruc'],
                },
            ],
            order: [['fecha', 'DESC']],
        });
        if (compras.length === 0) {
            throw new Error(`No existen compras en el rango de fechas especificado${sucursalId ? ' para esta sucursal' : ''}`);
        }
        return compras;
    } catch (error) {
        throw new Error(`Error al obtener las compras: ${error.message}`);
    }
};

//obtener compras por estado
const getComprasByEstado = async (estado) => {
    try {
        const compras = await Compra.findAll({
            where: {
                estado: estado,
            },
            include: [
                {
                    model: DetalleCompra,
                    attributes: ['idDetalleCompra', 'cantidad', 'precioCompra', 'variacion', 'subTotal'],
                    include: [
                        {
                            model: Insumo,
                            attributes: ['idInsumo', 'insumo', 'precioCompra'],
                        },
                    ],
                },
                {
                    model: Proveedor,
                    attributes: ['idProveedor', 'nombre', 'ruc'],
                },
                {
                    model: Sucursal,
                    attributes: ['idSucursal', 'sucursal'],
                },
            ],
            order: [['fecha', 'DESC']],
        });
        if (!compras) throw new Error(`No existen compras con el estado ${estado}`);
        return compras;
    } catch (error) {
        throw new Error(`Error al obtener las compras: ${error.message}`);
    };
};

//obtener egresos por fecha y sucursal
const getEgresosByFecha = async (desde, hasta, sucursalId = null) => {
    try {
        const whereConditions = {
            fecha: {
                [Op.between]: [desde, hasta],
            },
            estado: 'Cancelada',
        };
        if (sucursalId) {
            whereConditions.idSucursal = sucursalId;
        };
        const egresos = Compra.sum('total', {
            where: whereConditions,
        });
        return egresos || 0;
    } catch (error) {
        throw new Error(`Error al totalizar los egresos: ${error.message}`);
    }
};

//obtener productos comprados en un rango de fechas y sucursal
const getInsumosComprados = async (desde, hasta, sucursalId = null) => {
    try {
        const whereConditions = {
            fecha: { [Op.between]: [new Date(desde), new Date(hasta)] },
            estado: 'Pagada'
        };
        if (sucursalId) {
            whereConditions.sucursalId = sucursalId;
        };
        const reporte = await DetalleCompra.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('cantidad')), 'totalComprado'],
                [sequelize.fn('SUM', sequelize.col('subtotal')), 'egresosTotales'],
            ],
            include: [
                {
                    model: Insumo,
                    attributes: ['nombre'],
                    required: true,
                },
                {
                    model: Compra,
                    where: whereConditions,
                    required: true,
                },
            ],
            group: ['Insumo.nombre'],
            order: [[sequelize.literal('egresosTotales'), 'DESC']], // Ordenar por egresos
            raw: true,
        });
        return reporte.map(item => ({
            insumo: item['Insumo.nombre'],
            unidadesCompradas: parseInt(item.totalComprado),
            egresos: parseFloat(item.egresosTotales).toFixed(2)
        }));
    } catch (error) {
        throw new Error(`Error generando reporte de compras: ${error.message}`);
    };
}; 

//pgar compra
const pagarCompra = async (idCompra) => {
    try {
        const compra = await Compra.findByPk(idCompra);
        if (!compra) throw new Error(`No existe la compra con id ${idCompra}`);
        if (compra.estado === 'Pagada') throw new Error(`La compra con id ${idCompra} ya fue pagada`);
        compra.estado = 'Pagada';
        await compra.save();
        return compra;
    } catch (error) {
        throw new Error(`Error al pagar la compra: ${error.message}`);
    };
};

//actualizar compra
const updateCompra = async (compraId, { compraData, detalles }) => {
    const transaction = await sequelize.transaction();
    try {
        const compra = await Compra.findByPk(compraId, { transaction });
        await compra.update(compraData || {}, { transaction });
        // 2. Procesar detalles si se proporcionan
        if (detalles) {
            // Separar detalles a actualizar y crear
            const [toUpdate, toCreate] = detalles.reduce((acc, detalle) => {
                acc[detalle.idDetalleCompra ? 0 : 1].push(detalle);
                return acc;
            }, [[], []]);
            // Eliminar detalles no incluidos
            await DetalleCompra.destroy({
                where: {
                    compraId,
                    idDetalleCompra: {
                        [Op.notIn]: toUpdate.map(detalle => detalle.idDetalleCompra)
                    },
                },
                transaction,
            });
            // Actualizar existentes en lote
            await Promise.all(
                toUpdate.map(detalle =>
                    DetalleCompra.update(detalle, {
                        where: { idDetalleCompra: detalle.idDetalleCompra },
                        transaction,
                    }),
                ),
            );
            // Crear nuevos en lote
            if (toCreate.length > 0) {
                await DetalleCompra.bulkCreate(
                    toCreate.map(detalle => ({ ...detalle, compraId })),
                    { transaction },
                );
            };
        };
        await transaction.commit();
        // Devolver compra actualizada
        return await Compra.findByPk(compraId, {
            include: [{
                model: DetalleCompra,
                include: [Insumo]
            }],
            transaction,
        });
    } catch (error) {
        await transaction.rollback();
        throw error; // Simplemente relanzamos el error
    };
};

//eliminar compra
const deleteCompra = async (compraId) => {
    try {
        const compra = await Compra.findByPk(compraId);
        if (!compra) {
            throw new Error(`Comanda con id: ${compraId}`);
        };
        await compra.udpdate({ eliminado: true });
        return compra;
    } catch (error) {
        throw new Error(`Error al eliminar compra: ${error.message}`);
    };
};

//crear compra
const createCompra = async (compraData, detalles) => {
    const transaction = await sequelize.transaction();
    try {
        const nuevaCompra = await Compra.create(compraData, { transaction });
        await DetalleCompra.bulkCreate(
            detalles.map(detalle => ({ ...detalle, compraId: nuevaCompra.idCompra })),
            { transaction },
        );
        await actualizarStockPorCompra(nuevaCompra.idCompra,{transaction});
        await transaction.commit();
        const compraCreada = await Compra.findByPk(nuevaCompra.idCompra, {
            include: [DetalleCompra],
            transaction,
        });
        return {
            success:true,
            compra:compraCreada,
            message:'Compra registrada y stock actualizado'
            } 
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

//const updateStockInsumosCompra
const actualizarStockPorCompra = async (compraId) => {
  const transaction = await sequelize.transaction();
  try {
    const compra = await Compra.findByPk(compraId, {
      include: [{
        model: DetalleCompra,
        attributes: ['idDetalle', 'idInsumo','cantidad'],
        include: [Insumo], 
      }],
      transaction,
    });
    if (!compra) throw new Error(`Compra no encontrada con ID: ${compraId}`);
    await Promise.all(
      compra.DetalleCompras.map(async detalle => {
      await Insumo.increment('stock', {
        by: detalle.cantidad,
        where: { idInsumo: detalle.insumoId },
        transaction,
      });
      })
    );
    await transaction.commit();
    return { success: true, message: 'Stock actualizado correctamente' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al procesar compra: ${error.message}`);
  }
};

module.exports={
    getAllCompras,
    getCompraById,
    getComprasByProveedorId,
    getComprasByFecha,
    getComprasByEstado,
    getEgresosByFecha,
    getInsumosComprados,
    pagarCompra,
    updateCompra,
    deleteCompra,
    createCompra,
};