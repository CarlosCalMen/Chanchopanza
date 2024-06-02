const {}=require('../controllers/reportsControllers.js');

const getAllOrdersHandler = (req,res)=>{
    const {fechaInicio,fechaFin} = req.query;
    if (fechaInicio) {
        if (!fechaFin) fechaFin = Date.now();
        res.status(200).send('Queremos las ventas de un periodo de tiempo');
        return;
    };
    res.status(200).send('Traigo todas las ordenes registrasdas');
};

const getOrderByIdHandler =(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en la comanda con id:${id}`);
};

const getStockAllProductsHandler = (req,res)=>{
    res.status(200).send('Estoy mostrando el stock de productos');
};

const getStockProductHandler = (req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy mostrando el stock de producto con id:${id}`);
};

const getAllShoppingsHandler = (req, res) =>{
    const {fechaInicio,fechaFin} = req.query;
    if(fechaInicio){
        if (!fechaFin) fechaFin = Date.now();
        res.status(200).send(`Traigo todas las compras entre ${fechaInicio} y ${fechaFin}`);
    };
    res.status(200).send('Traigo todas las compra');
};

const getShoppingsByProductHandler=(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy mostrando las compras del producto con id:${id}`);
};


module.exports = {
    getAllOrdersHandler,
    getOrderByIdHandler,
    getStockAllProductsHandler,
    getStockProductHandler,
    getAllShoppingsHandler,
    getShoppingsByProductHandler,
};