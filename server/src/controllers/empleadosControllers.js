const {Empleado} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los empleados
 const getAllEmpleados=(sucursalId = null) => {
    try {
        const whereConditions ={};
        if (sucursalId) {
            whereConditions.sucursalId = sucursalId;
        };
        const empleados = Empleado.findAll({
            where: whereConditions,
            order: [['apellido', 'ASC'], ['nombre', 'ASC']],
        });
        return empleados;
    } catch (error) {
        throw new Error(`Error al obtener los empleados: ${error.message}`);
    };
 };

 //obtener un empleado por id
const getEmpleadoById = async (empleadoId) => {
    try {
        const empleado = await Empleado.findByPk(empleadoId);
        if (!empleado) {
            throw new Error(`No existe Empleado con ID ${empleadoId}`);
        }
        return empleado;
    } catch (error) {
        throw new Error(`Error al obtener el empleado: ${error.message}`);
    };
};
//obtener un empleado por apellido
const getEmpleadoByApellido = async (apellido) => {
    try {
        const empleados = await Empleado.findAll({
            where: {
                [Op.iLike]: `%${apellido}%`
            }});
        if (!empleados) throw new Error('Empleados no encontrados');
        return empleados.slice(0,15);
    } catch (error) {
        throw new Error(`Error al obtener el empleado: ${error.message}`);
    };
};
//obtener un empleado por dni
const getEmpleadoByDni = async (dni) => {
    try {
        const empleado = await Empleado.findOne({
            where: {
                dni: dni
            },
        });
        if (!empleado) {
            throw new Error(`No existe Empleado con DNI ${dni}`);
        }
        return empleado;
    } catch (error) {
        throw new Error(`Error al obtener el empleado: ${error.message}`);
    }
};

//crear un empleado
const createEmpleado = async (empleadoData) => {
    try {
        const nuevoEmpleado = await Empleado.create(empleadoData);
        return nuevoEmpleado;
    } catch (error) {
        throw new Error(`Error al obtener el empleado: ${error.message}`);
    };
};

//actualizar un empleado
const updateEmpleado = async (empleadoId, empleadoData) => {
    try {
        const empleado = await Empleado.findByPk(empleadoId);
        if (!empleado) {
            throw new Error(`No existe Empleado con ID ${empleadoId}`);
        };
        await empleado.update(empleadoData);
        return empleado;
    } catch (error) {
        throw new Error(`Error al obtener el empleado: ${error.message}`);
    };
};

//Eliminar un empleado
const deleteEmpleado = async (empleadoId) => {
    try {
        const empleado = await Empleado.findByPk(empleadoId);
        if (!empleado) {
            throw new Error(`No existe Empleado con ID ${empleadoId}`);
        };
        await empleado.update({ eliminado: true });
        return empleado;
    } catch (error) {
        throw new Error(`Error al obtener el empleado: ${error.message}`);
    };
};
  

module.exports = {
    getAllEmpleados,
    getEmpleadoById,
    getEmpleadoByApellido,
    getEmpleadoByDni,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
};