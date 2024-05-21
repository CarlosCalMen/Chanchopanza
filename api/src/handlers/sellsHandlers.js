const sellsControllers = require('../controllers/sellsControllers.js');

const getAllSellsHandler=(req,res)=>{
    const {fechaInicio,fechaFin} = req.query;
    if (fechaInicio) {
        res.status(200).send('Queremos las ventas de un periodo de tiempo');
        return;
    };
    res.status(200).send('Quiero todas las ventas');
};

const getSellByIdHandler=(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en la venta con id:${id}`);
};

const postSellHandler=(req,res)=>{
    res.status(200).send('Estoy garbando una Venta');
};

const putSellHandler=(req,res)=>{
    res.status(200).send('Estoy modificando una Venta');
};

const deleteSellHandler=(req,res)=>{
    res.status(200).send('Estoy eliminando una Venta');
};

module.exports = {
    getAllSellsHandler,
    getSellByIdHandler,
    postSellHandler,
    putSellHandler,
    deleteSellHandler};