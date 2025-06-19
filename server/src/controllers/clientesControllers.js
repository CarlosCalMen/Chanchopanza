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
const obtenerClientePorId = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
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

