const { validate: uuidValidate } = require('uuid');
const { Producto } = require('../db.js'); 

const validarMediosPago = (comandaData) => {
    const { totalYape = 0, totalEfectivo = 0, totalTarjeta = 0 } = comandaData;
    const errores = {};
    if (totalYape < 0) errores.totalYape = "El monto Yape no puede ser negativo";
    if (totalEfectivo < 0) errores.totalEfectivo = "El monto en efectivo no puede ser negativo";
    if (totalTarjeta < 0) errores.totalTarjeta = "El monto con tarjeta no puede ser negativo";
    const sumaPagos = Number(totalYape) + Number(totalEfectivo) + Number(totalTarjeta);
    if (comandaData.total && Math.abs(sumaPagos - comandaData.total) > 0.01) {
        errores.mediosPago = `La suma de pagos (${sumaPagos}) no coincide con el total (${comandaData.total})`;
    };
    return errores;
};

const validarItemComanda = async (item, index) => {
    const errores = {};
    if (!item.productoId) {
        errores.productoId = "Debe especificar un producto";
    } else if (!uuidValidate(item.productoId)) {
        errores.productoId = "ID de producto inválido";
    } else {
        // Verificar existencia y disponibilidad del producto
        const producto = await Producto.findByPk(item.productoId);
        if (!producto) {
            errores.productoId = "Producto no encontrado";
        } else if (producto.eliminado) {
            errores.productoId = "Este producto no está disponible";
        };
    };
    if (!item.cantidad || isNaN(item.cantidad)) {
        errores.cantidad = "La cantidad debe ser un número";
    } else if (item.cantidad <= 0) {
        errores.cantidad = "La cantidad debe ser mayor a cero";
    };
    if (item.precioUnitario && isNaN(item.precioUnitario)) {
        errores.precioUnitario = "Precio unitario inválido";
    };
    return Object.keys(errores).length > 0 ? { itemIndex: index, errores } : null;
};

const validarComanda = async (comandaData) => {
    const errores = {};
    const estadosValidos = ['Pendiente', 'Cancelada'];
    if (comandaData.estado && !estadosValidos.includes(comandaData.estado)) {
        errores.estado = `Estado inválido. Debe ser: ${estadosValidos.join(', ')}`;
    };
    const erroresPagos = validarMediosPago(comandaData);
    Object.assign(errores, erroresPagos);
    if (!comandaData.detalles || !Array.isArray(comandaData.detalles) || comandaData.detalles.length === 0) {
        errores.detalles = "La comanda debe incluir al menos un producto";
    } else {
        const erroresItems = [];
        for (const [index, item] of comandaData.detalles.entries()) {
            const errorItem = await validarItemComanda(item, index);
            if (errorItem) erroresItems.push(errorItem);
        };
        if (erroresItems.length > 0) errores.detalles = erroresItems;
    };
    return {
        valido: Object.keys(errores).length === 0,
        errores: Object.keys(errores).length > 0 ? errores : null,
        datosValidados: {
            ...comandaData,
            fecha: comandaData.fecha || new Date().toISOString().split('T')[0], // Formato DATEONLY
            estado: comandaData.estado || 'Pendiente',
            totalYape: comandaData.totalYape || 0,
            totalEfectivo: comandaData.totalEfectivo || 0,
            totalTarjeta: comandaData.totalTarjeta || 0,
            eliminado: false
        },
    };
};

module.exports = { validarComanda };