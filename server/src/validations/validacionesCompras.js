const { validate: uuidValidate } = require('uuid');
const {esFechaValidaDDMMYYYY} = require('./validacionesGenerales.js');
const { Insumo } = require('../db.js'); 


const validarItemCompra = async (item, index) => {
    const errores = {};
    // Validación de insumo
    if (!item.idInsumo) {
        errores.idInsumo = "Debe especificar un insumo";
    } else if (!uuidValidate(item.idInsumo)) {
        errores.idInsumo = "ID de insumo inválido";
    } else {
        // Verificar existencia del insumo
        const insumo = await Insumo.findByPk(item.idInsumo);
        if (!insumo) {
            errores.idInsumo = "Insumo no encontrado";
        } else if (insumo.eliminado) {
            errores.idInsumo = "Este insumo está marcado como eliminado";
        };
    };
    // Validación de cantidad
    if (!item.cantidad || isNaN(item.cantidad)) {
        errores.cantidad = "La cantidad debe ser un número";
    } else if (item.cantidad <= 0) {
        errores.cantidad = "La cantidad debe ser mayor a cero";
    };
    // Validación de precio
    if (!item.precio || isNaN(item.precio)) {
        errores.precio = "El precio debe ser un número";
    } else if (item.precio <= 0) {
        errores.precio = "El precio debe ser mayor a cero";
    };
    // Validación de variación (opcional)
    if (item.variacion && isNaN(item.variacion)) {
        errores.variacion = "La variación debe ser un número";
    };
    return Object.keys(errores).length > 0 ? { itemIndex: index, errores } : null;
};

const validarCompra = async (compraData) => {
    const errores = {};
    // Validación de estado
    const estadosValidos = ['Pendiente', 'Cancelada'];
    if (compraData.estado && !estadosValidos.includes(compraData.estado)) {
        errores.estado = `Estado inválido. Debe ser: ${estadosValidos.join(', ')}`;
    };
    // Validación de fecha
    if(!esFechaValidaDDMMYYYY(compraData.fecha)) {
        errores.fecha = "Fecha inválida";
    };
    // Validación de detalles (items de compra)
    if (compraData.detalles) {
        if (!Array.isArray(compraData.detalles) || compraData.detalles.length === 0) {
            errores.detalles = "La compra debe incluir al menos un insumo";
        } else {
            const erroresItems = [];
            for (const [index, item] of compraData.detalles.entries()) {
                const errorItem = await validarItemCompra(item, index);
                if (errorItem) erroresItems.push(errorItem);
            };
            if (erroresItems.length > 0) errores.detalles = erroresItems;
        };
    };
    return {
        valido: Object.keys(errores).length === 0,
        errores: Object.keys(errores).length > 0 ? errores : null,
        datosValidados: {
            ...compraData,
            fecha: compraData.fecha || new Date().toISOString().split('T')[0],
            estado: compraData.estado || 'Pendiente',
            eliminado: false,
        },
    };
};

module.exports = { validarCompra };

