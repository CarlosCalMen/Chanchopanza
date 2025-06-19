require('dotenv').config();
const { Cliente } = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los clientes
const obtenerClientes = async () => {
  try {
    const clientes = await Cliente.findAll();
    return clientes;
  } catch (error) {
    throw new Error('Error al obtener los clientes');
  };
};

//obtener un cliente por id
const obtenerClienteById = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error(`No existe Cliente con ID ${id}`);
    }
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener el cliente');
  };
};

//obtener un cliente por apellido o nombre de empresa que estará almacenado en apellido paterno
const obtenerClienteByApellido = async (apellido) => {
  try {
    const clientes = await Cliente.findAll({
      where: {
        [Op.iLike]: `%${apellido}%`
      }});
    if (!clientes) throw new Error('Clientes no encontrados');
    return clientes.slice(0,15);
  } catch (error) {
    throw new Error('Error al obtener el cliente');
  };
};

//obtener un cliente por dni
const obtenerClienteByDni = async (dni) => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        dni: dni
      }
    });
    if (!cliente) {
      throw new Error(`No existe Cliente con DNI ${dni}`);
    }
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener el cliente');
  };
};

//obtener un cliente por ruc
const obtenerClienteByRuc = async (ruc) => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        ruc: ruc
      }
    });
    if (!cliente) throw new Error(`No existe Cliente con RUC ${ruc}`);
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener el cliente');
  };
};

//crear un cliente
const crearCliente = async (clienteData) => {
  try {
    const nuevoCliente = await Cliente.create(clienteData);
    return nuevoCliente;
  } catch (error) {
    throw new Error('Error al crear Cliente');
  };
}; 

//actualizar un cliente
const actualizarCliente = async (id, clienteData) => {
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        };
        await cliente.update(clienteData);
        return cliente;
    } catch (error) {
        throw new Error('Error al actualizar el cliente');
    };
};

//Eliminar un cliente
const eliminarCliente = async (id) => {
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        };
        await cliente.update({ eliminado: true });
        return cliente;
    } catch (error) {
        throw new Error('Error al eliminar el cliente');
    };
};

module.exports = {
    obtenerClientes,
    obtenerClienteById,
    obtenerClienteByApellido,
    obtenerClienteByDni,
    obtenerClienteByRuc,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};