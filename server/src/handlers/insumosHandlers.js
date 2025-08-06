const { UUIDV4 } = require('sequelize');
const {validarActualizacionInsumo, validarCreacionInsumo} = require('../validations/validacionesInsumos.js');
const {getAllInsumos, getInsumoById, getInsumoByNombre, getInsumoByCategoria,
        createInsumo, updateInsumo, deleteInsumo}=require('../controllers/insumosControllers.js');

const getAllInsumosHandler = async (req, res) => {
    try {
        const insumos = await getAllInsumos();
        res.status(200).json(insumos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

const getInsumoByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw Error('Debe proporcionar ID del insumo');
         if (!uuid.validate(id)) throw new Error( 'ID de Insumo inválido');
        const insumo = await getInsumoById(id);
        res.status(200).json(insumo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

const getInsumoByNombreHandler = async (req, res) => {
    const { nombre } = req.query;
    try {
        if (!nombre) throw Error('Debe proporcionar nombre del insumo');
        const insumos = await getInsumoByNombre(nombre);
        res.status(200).json(insumos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

const getInsumoByCategoriaHandler = async (req, res) => {
    const { categoria } = req.query;
    try {
        if (!categoria) throw Error('Debe proporcionar categoria del insumo');
        const insumos = await getInsumoByCategoria(categoria);
        res.status(200).json(insumos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

const createInsumoHandler = async (req, res) => {
    const { insumo, categoria, precio, unidad, sucursalId } = req.body;
    try {
        const erroresCreacion = validarCreacionInsumo(insumo, categoria, precio, unidad,eliminado);
        if (erroresCreacion){
            const mensajeError = Object.entries(erroresCreacion)
                .map(([campo, mensaje]) => `• ${campo}: ${mensaje}`)
                .join('\n');
            throw new Error(`Errores de validación:\n${mensajeError}`);
        }; 
        const insumoCreado = await(createInsumo(insumo,categoria,precio,unidad,sucursalId));
        res.status(201).json(insumoCreado);
    } catch (error) {
        if (error.message.startsWith('Errores de validación')) {
            res.status(400).json({
                success: false,
                message: error.message,
                errors: error.message.split('\n').slice(1), 
            });
        } else {
            console.error('Error inesperado:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        };
    };
};

const updateInsumoHandler = async (req,res) => {
    const {insumoId, insumo, categoria, precio, unidad, sucursalId} = req.body;
    try {
        if (!uuid.validate(insumoId)) throw new Error('Id de insumo Inválido');
        const erroresActualizacion = validarActualizacionInsumo(insumo, categoria, precio, unidad,eliminado,true);
        if (erroresActualizacion) throw new Error(erroresActualizacion);
        const insumoActualizado = await(updateInsumo(insumoId,insumo,categoria,precio,unidad,sucursalId));
        res.status(200).json(insumoActualizado);
    } catch (error) {
        res.status(400).json(erroresActualizacion);
    };
};

const deleteInsumoHandler=async(req,res)=>{
    const insumoId=req.params;
    try {
        const insumoEliminado = await deleteInsumo(insumoId);
        res.status(201).json(insumoEliminado);
    } catch (error) {
        res.status(401).json({error:error.message});
    };
};

module.exports={
    getAllInsumosHandler,
    getInsumoByIdHandler,
    getInsumoByNombreHandler,
    getInsumoByCategoriaHandler,
    createInsumoHandler,
    updateInsumoHandler,
    deleteInsumoHandler,
};