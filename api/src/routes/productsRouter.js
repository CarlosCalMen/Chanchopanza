const {Router} = require('express');
const {getAllProductsHandler,getProductByIdHandler,
        postProductHandler,putProductHandler,deleteProductHandler} = require('../handlers/productsHandlers');

const productsRouter = Router();


productsRouter.get('/',getAllProductsHandler);

productsRouter.get('/:id',getProductByIdHandler); 

productsRouter.post('/',postProductHandler); 

productsRouter.put('/',putProductHandler);

productsRouter.delete('/',deleteProductHandler); 

module.exports = productsRouter;