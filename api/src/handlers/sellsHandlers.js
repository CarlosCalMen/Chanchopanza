const sellsControllers = require('../controllers/sellsControllers.js');

const getAllSellsHandler=(req,res)=>{
    res.status(200).send('Estoy en Ventas');
};

const getSellByIdHandler=(req,res)=>{
    res.status(200).send('Estoy en una venta en particular');
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