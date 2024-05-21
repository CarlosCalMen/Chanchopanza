const sellsControllers = require('../controllers/productsControllers.js');

const getAllProductsHandler=(req,res)=>{
   // const {fechaInicio,fechaFin} = req.query;
   // if (fechaInicio) {
        // res.status(200).send('Queremos las ventas de un periodo de tiempo');
    //     return;
    // };
    res.status(200).send('Quiero todos los productos');
};

const getProductByIdHandler=(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en el producto con id:${id}`);
};

const postProductHandler=(req,res)=>{
    res.status(200).send('Estoy grabando una producto');
};

const putProductHandler=(req,res)=>{
    res.status(200).send('Estoy modificando un Producto');
};

const deleteProductHandler=(req,res)=>{
    res.status(200).send('Estoy eliminando un Producto');
};

module.exports = {
    getAllProductsHandler,
    getProductByIdHandler,
    postProductHandler,
    putProductHandler,
    deleteProductHandler};