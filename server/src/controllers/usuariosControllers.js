const {Usuario} = require('../db.js');
const { Op } = require('sequelize');

//Obtener todos los usuarios
 const getAllUsuarios=() => {
    try {
        const usuarios = Usuario.findAll({
            order: [['Usuario', 'ASC']],
        });
        return usuarios;
    } catch (error) {
        throw new Error(`Error al obtener las usuarios: ${error.message}`);
    };
 };

 //obtener un Usuario por id
const getUsuarioById = async (usuarioId) => {
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            throw new Error(`No existe Usuario con ID ${usuarioId}`);
        }
        return usuario;
    } catch (error) {
        throw new Error(`Error al obtener Usuario: ${error.message}`);
    };
};
//obtener un Usuario por nombre de Usuario
const getUsuarioByNombre = async (usuario) => {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                usuario: {
                    [Op.iLike]: `%${usuario}%`
                },
            }});
        if (usuarios.length===0) throw new Error('Usuarios no encontrados');
        return usuarios.slice(0,15);
    } catch (error) {
        throw new Error(`Error al obtener el Usuario: ${error.message}`);
    };
};

//crear un Usuario
const createUsuario = async (usuarioData) => {
    try {
        const nuevoUsuario = await Usuario.create(usuarioData);
        return nuevoUsuario;
    } catch (error) {
        throw new Error(`Error al crear el Usuario: ${error.message}`);
    };
};

//actualizar un Usuario
const updateUsuario = async (usuarioId, usuarioData) => {
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            throw new Error(`No existe Usuario con ID ${usuarioId}`);
        };
        await Usuario.update(usuarioData);
        return usuario;
    } catch (error) {
        throw new Error(`Error al obtener el Usuario: ${error.message}`);
    };
};

//Eliminar un Usuario
const deleteusuario = async (usuarioId) => {
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            throw new Error(`No existe Usuario con ID ${usuarioId}`);
        };
        await Usuario.update({ eliminado: true });
        return usuario;
    } catch (error) {
        throw new Error(`Error al obtener el Usuario: ${error.message}`);
    };
};
  

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByNombre,
    createUsuario,
    updateUsuario,
    deleteusuario,
};