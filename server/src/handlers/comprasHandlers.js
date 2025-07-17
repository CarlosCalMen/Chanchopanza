const {getAllCompras, getCompraById, getComprasByProveedorId, getComprasByFecha,
        getComprasByEstado, getEgresosByFecha, getInsumosComprados, pagarCompra,
        updateCompra, deleteCompra, createCompra} = require('../controllers/comprasControllers.js');

const {validarRangoFechas} = require('../validations/validacionesGenerales.js');

const {validarCompra}=require('../validations/validacionesCompra.js');

const getAllComprasHandler= async(req,res)=>{
    try {
        res.status(200).json(await getAllCompras());
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

const getCompraByIdHandler= async (req,res)=>{
    const {id} = req.params;
    try {
        if(!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de compra inválido');
        const compra = await getCompraById(id);
        return res.status(200).json(compra);
    } catch (error) {
        return res.status(400).json({error: error.message});     
    }
};

const getComprasByProveedorIdHandler= async(req,res)=>{
    const {id} = req.params;
    try {
        if(!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de proveedor inválido');
        const compras = await getComprasByProveedorId(id);
        return res.status(200).json(compras);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getComprasByFechaHandler= async(req,res)=>{
    const {desde, hasta,sucursalId} = req.query;
    try {
        validarRangoFechas(desde,hasta);
        if (sucursalId && !uuid.validate(sucursalId)) throw new Error( 'ID de sucursal inválido');
        const compras = await getComprasByFecha(desde,hasta,sucursalId);
        return res.status(200).json(compras);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getComprasByEstadoHandler = async (req, res) => {
    const { estado } = req.params;
    try {
        if (!estado || !['Pendiente', 'Cancelada'].includes(estado)) {
            throw new Error('Debe proporcionarse un estado válido para realizar la búsqueda');
        };
        const compras = await getComprasByEstado(estado);
        return res.status(200).json(compras);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const getEgresosByFechaHandler = async (req, res) => {
    const { desde, hasta, sucursalId } = req.query;
    try {
        validarRangoFechas(desde, hasta);
        if (sucursalId && !uuid.validate(sucursalId)) throw new Error( 'ID de sucursal inválido');
        const egresos = await getEgresosByFecha(desde, hasta,sucursalId);
        return res.status(200).json(egresos);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const getInsumosCompradosHandler = async (req, res) => {
    const { desde, hasta, sucursalId } = req.query;
    try {
        validarRangoFechas(desde, hasta);
        if (sucursalId && !uuid.validate(sucursalId)) throw new Error( 'ID de sucursal inválido');
        const insumos = await getInsumosComprados(desde, hasta, sucursalId);
        return res.status(200).json(insumos);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const pagarCompraHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de compra inválido');
        const compra = await pagarCompra(id);
        return res.status(200).json(compra);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const updateCompraHandler = async (req, res) => {
    const { compraId } = req.params;
    const { compraData, detalles } = req.body;
    try {
        if (!compraId) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(compraId)) throw new Error( 'ID de compra inválido');
        const {valido, errores} = await validarCompra(compraData, detalles);
        if (!valido) {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores,
            });
        };
        const compra = await updateCompra(compraId, {compraData, detalles});
        return res.status(200).json(compra);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const deleteCompraHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(id)) throw new Error( 'ID de compra inválido');
        const compra = await deleteCompra(id);
        return res.status(200).json(compra);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const createCompraHandler = async (req, res) => {
    const { compraData, detalles } = req.body;
    try {
        const {valido, errores} = await validarCompra(compraData, detalles);
        if (!valido) {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores,
            });
        };
        const compra = await createCompra({compraData, detalles});
        return res.status(200).json(compra);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};


module.exports={
    getAllComprasHandler,
    getCompraByIdHandler,
    getComprasByProveedorIdHandler,
    getComprasByFechaHandler,
    getComprasByEstadoHandler,
    getEgresosByFechaHandler,
    getInsumosCompradosHandler,
    pagarCompraHandler,
    updateCompraHandler,
    deleteCompraHandler,
    createCompraHandler,
};