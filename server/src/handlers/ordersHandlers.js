const ordersControllers = require('../controllers/ordersControllers.js');

const getAllOrdersHandler=(req,res)=>{
    res.status(200).send('Quiero todas las ventas');
};

const getOrderByIdHandler=(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en la venta con id:${id}`);
};

const postOrderHandler=(req,res)=>{
    res.status(200).send('Estoy garbando una Venta');
};

const putOrderHandler=(req,res)=>{
    const {id} = req.params;
    if (id) {
        res.status(200).send(`Estoy modificando la Venta con id: ${id}`);
    }    
};

const deleteOrderHandler=(req,res)=>{
    const {id} = req.params;
    if (id) {
        res.status(200).send(`Estoy eliminando la Venta con id: ${id}`);
    };    
};

module.exports = {
    getAllOrdersHandler,
    getOrderByIdHandler,
    postOrderHandler,
    putOrderHandler,
    deleteOrderHandler};