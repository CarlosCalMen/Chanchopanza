const {getAllComandas,getComandaById, getComandasByClienteId,getComandasByFecha,
    getComandasByEstado,getIngresosByFecha,getProductosVendidos,pagarComanda,
    updateComanda,deleteComanda,createComanda,} = require('../controllers/comandasControllers.js');

const {validarComanda}=require('../validations/validacionesComanda.js');    

const {validarRangoFechas}=require('../validations/validacionesGenerales.js');

const getAllComandasHandler= async(req,res)=>{
    try {
        res.status(200).json(await getAllComandas());
        return;
    } catch (error) {
        res.status(400).json(error.message);
        return;        
    };
};

const getComandaByIdHandler= async(req,res)=>{
    const {id} = req.params;
    try {
        if (!id) {
            res.status(400).json(`Debe proporcionarse un ID de comanda a buscar`);
            return;
        };
        res.status(200).json(await getComandaById(id));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const getComandasByClienteIdHandler= async(req,res)=>{
    const {id} = req.params;
    try {
        if (!id) {
            res.status(404).json(`Debe proporcionarse un ID de cliente para buscar`);
            return;
        };
        res.status(200).json(await getComandasByClienteId(id));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const getComandasByFechaHandler= async(req,res)=>{
    const {desde,hasta} = req.query;
    try {
        validarRangoFechas(desde,hasta);
        res.status(200).json(await getComandasByFecha(desde,hasta));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const getComandasByEstadoHandler= async(req,res)=>{
    const {estado} = req.params;
    try {
        if (!estado) {
            res.status(400).json(`Debe proporcionarse un estado de comanda`);
            return;
        };
        res.status(200).json(await getComandasByEstado(estado));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const getIngresosByFechaHandler= async(req,res)=>{
    const {desde,hasta} = req.query;
    try {
        validarRangoFechas(desde,hasta);
        res.status(200).json(await getIngresosByFecha(desde,hasta));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const getProductosVendidosHandler= async(req,res)=>{
    const {desde,hasta} = req.query;
    try {
        if (!desde || !hasta) {
            res.status(400).json(`Debe proporcionarse una fecha de inicio y una fecha de fin`);
            return;
        };
        res.status(200).json(await getProductosVendidos(desde,hasta));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const pagarComandaHandler= async(req,res)=>{
    const {id} = req.params;
    try {
        if (!id) {
            res.status(400).json(`Debe proporcionarse un ID de comanda a pagar`);
            return;
        };
        res.status(200).json(await pagarComanda(id));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const updateComandaHandler= async(req,res)=>{
    const {comandaId} = req.params;
    const {comandaData,detalles} = req.body;
    try {
        if (!comandaId) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        if (!uuid.validate(comandaId)) throw new Error( 'ID de comanda inválido');
        const {valido, errores} = await validarComanda(compraData, detalles);
        if (!valido) {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores,
            });
        };
        res.status(200).json(await updateComanda(id,comandaData,detalles));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const deleteComandaHandler= async(req,res)=>{
    const {id} = req.params;
    try {
        if (!id) {
            res.status(400).json(`Debe proporcionarse un ID de comanda a eliminar`);
            return;
        };
        res.status(200).json(await deleteComanda(id));
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};

const createComandaHandler= async(req,res)=>{
    const {comandaData,detalles} = req.body;
    try {
        const {valido, errores} = await validarCompra(compraData, detalles);
        if (!valido) {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores,
            });
        };
        const comanda = await createComanda(comandaData,detalles);
        res.status(200).json(comanda);
    } catch (error) {
        res.status(400).json(error.message);
        return;
    };
};


module.exports = {
    getAllComandasHandler,
    getComandaByIdHandler,
    getComandasByClienteIdHandler,
    getComandasByFechaHandler,
    getComandasByEstadoHandler,
    getIngresosByFechaHandler,
    getProductosVendidosHandler,
    pagarComandaHandler,
    updateComandaHandler,
    deleteComandaHandler,
    createComandaHandler,
 };