const {getAllProductos, getProductoById, getProductoByNombre,
        createProducto, updateProducto, deleteProducto} = require('../controllers/productsControllers.js');

const getAllProductosHandler=(req,res)=>{
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
    const {id} = req.params;
    if (id) {
        res.status(200).send(`Estoy modificando el Producto con id: ${id}`);
    };    
};

const deleteProductHandler=(req,res)=>{
    const {id} = req.params;
    if (id) {
        res.status(200).send(`Estoy eliminando el Producto con id: ${id}`);
    };
};

module.exports = {
    getAllProductsHandler,
    getProductByIdHandler,
    postProductHandler,
    putProductHandler,
    deleteProductHandler};