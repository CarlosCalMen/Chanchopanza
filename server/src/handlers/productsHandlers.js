const {getAllProductos, getProductoById, getProductoByNombre,
        createProducto, updateProducto, deleteProducto} = require('../controllers/productsControllers.js');
const { validarTexto } = require('../validations/validacionesGenerales.js');
const { validarCreacionProducto, validarActualizacionProducto } = require('../validations/validacionesProducto.js');

const getAllProductosHandler = async(req,res)=>{
    try {
        const productos = await getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        return res.status(400).json({error: error.message});    
    };
};

const getProductoByIdHandler = async (req,res)=>{
    const {id} = req.params;
    if (!uuid.validate(id)) throw new Error( 'ID de producto inválido');
    try {
        const producto = await getProductoById(id);
        res.status(200).json(producto);
    } catch (error) {
        return res.status(400).json({error: error.message}); 
    };
};

const getProductoByNombreHandler = async(req,res)=>{
    const {nombre} = req.query;
    const errorNombre = validarTexto(nombre);
    if (errorNombre) throw new Error ('Nombre de produto inválido');
    try {
        const productos = await getProductoByNombre();
        requestAnimationFrame.status(200).json(productos);    
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};

const createProductoHandler = async (req, res) => {
    const { producto, precioCosto, precioVenta } = req.body;
    try {
        const erroresValidacion = validarCreacionProducto(producto,precioCosto,precioVenta);
        if (erroresValidacion) {
            const mensajeError = Object.entries(erroresValidacion)
                .map(([campo, mensaje]) => `• ${campo}: ${mensaje}`)
                .join('\n');
            throw new Error(`Errores de validación:\n${mensajeError}`);
        };
        const productoCreado = await createProducto(producto,precioCosto,precioVenta,);
        res.status(201).json(productoCreado);
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

const updateProductoHandler=async (req,res)=>{
    const {productoId, producto, precioCosto, precioVenta}=req.body;
    const erroresValidacion = validarActualizacionProducto(producto,precioCosto,precioVenta,true);
    if (erroresValidacion) {
        const mensajeError = Object.entries(erroresValidacion)
            .map(([campo, mensaje]) => `• ${campo}: ${mensaje}`)
            .join('\n');
        throw new Error(`Errores de validación:\n${mensajeError}`);
    };
    try {
        const productoActualizado=await updateProducto(productoId,{producto:producto,preciosCosto:precioCosto,precioVenta:precioVenta});
        res.status(201).json(productoActualizado);
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
 
const deleteProductoHandler = async (req,res)=>{
    const {productoId} = req.params;
    try {
        const productoEliminado = await deleteProducto(productoId);
        res.status(201).json(productoEliminado);
    } catch (error) {
        res.status(401)-json({error:erros.message});        
    };
};


module.exports = {
    getAllProductosHandler,
    getProductoByIdHandler,
    getProductoByNombreHandler,
    createProductoHandler,
    updateProductoHandler,
    deleteProductoHandler};