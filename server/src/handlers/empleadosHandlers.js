const { UUIDV4 } = require('sequelize');
const {getAllEmpleados, getEmpleadoById, getEmpleadoByApellido,getEmpleadoByDni,
         createEmpleado, updateEmpleado, deleteEmpleado} = require('../controllers/empleadosControllers.js');

const {validarTexto, validarDNI} = require('../validations/validacionesGenerales.js');

const getAllEmpleadosHandler = async(req,res)=>{
    try {
        res.status(200).json(await getAllEmpleados());
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getEmpleadoByIdHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de empleado inválido');
        return res.status(200).json(await getEmpleadoById(id));
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getEmpleadoByApellidoHandler = async(req,res)=>{
    const {apellido} = req.params;
    try {
        const errorApellido = validarTexto(apellido);
        if (errorApellido) throw new Error(errorApellido);
        return res.status(200).json(await getEmpleadoByApellido(apellido));
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getEmpleadoByDniHandler = async(req,res)=>{
    const {dni} = req.params;
    try {
        const validacionDNI = validarDNI(dni);
        if (validacionDNI.error) throw new Error(validacionDNI.error);
        return res.status(200).json(await getEmpleadoByDni(dni));
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};
const createEmpleadoHandler = async(req,res)=>{
    const {nombre, apellidoPaterno, apellidoMaterno, dni, fechaNacimiento, fechaIngreso, sucursalId} = req.body;
    try {
        const errorNombre = validarTexto(nombre);
        const errorApellidoPaterno = validarTexto(apellidoPaterno);
        const errorApellidoMaterno = validarTexto(apellidoMaterno);
        const errorDni = validarDNI(dni);
        if (errorNombre) throw new Error(errorNombre);
        if (errorApellidoPaterno) throw new Error(errorApellidoPaterno);
        if (errorApellidoMaterno) throw new Error(errorApellidoMaterno);
        if (errorDni.error) throw new Error(errorDni.error);
        return res.status(200).json(await createEmpleado({nombre, apellidoPaterno, apellidoMaterno, dni, fechaNacimiento, fechaIngreso, sucursalId}));
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};  

const updateEmpleadoHandler = async(req,res)=>{
    const {id} = req.params;
    const {nombre, apellidoPaterno, apellidoMaterno, dni, birthMonth, birthDay, cargo, salario, fechaInicio, fechaFin, sucursalId} = req.body;
    try {
        if(!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de empleado inválido');
        const errorNombre = validarTexto(nombre);
        const errorApellidoPaterno = validarTexto(apellidoPaterno);
        const errorApellidoMaterno = validarTexto(apellidoMaterno);
        const errorDni = validarDNI(dni);
        if (errorNombre) throw new Error(errorNombre);
        if (errorApellidoPaterno) throw new Error(errorApellidoPaterno);
        if (errorApellidoMaterno) throw new Error(errorApellidoMaterno);
        if (errorDni.error) throw new Error(errorDni.error);
        return res.status(200).json(await updateEmpleado(id,{nombre, apellidoPaterno, apellidoMaterno, dni, fechaNacimiento, fechaIngreso, sucursalId}));
    }
    catch (error) {
        return res.status(400).json({error: error.message});
    };
};  

const deleteEmpleadoHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de empleado inválido');
        return res.status(200).json(await deleteEmpleado(id));
    }
    catch (error) {
        return res.status(400).json({error: error.message});
    };
};   
 
  module.exports = {
                    getAllEmpleadosHandler,
                    getEmpleadoByIdHandler,
                    getEmpleadoByApellidoHandler,
                    getEmpleadoByDniHandler,
                    createEmpleadoHandler,
                    updateEmpleadoHandler,
                    deleteEmpleadoHandler,
                    };