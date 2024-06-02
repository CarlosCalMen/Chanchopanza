const {Router} = require('express');
const {getAllOrdersHandler, getOrderByIdHandler,getStockAllProductsHandler,getStockProductHandler,
        getAllShoppingsHandler,getShoppingsByProductHandler} = require ('../handlers/reportsHandlers.js');

const reportsRouter = Router();

reportsRouter.get('/orders',getAllOrdersHandler); 
reportsRouter.get('/orders/:id',getOrderByIdHandler);
reportsRouter.get('/stock',getStockAllProductsHandler);  
reportsRouter.get('/stock/:id',getStockProductHandler);
reportsRouter.get('/shops',getAllShoppingsHandler); 
reportsRouter.get('/shops/:id',getShoppingsByProductHandler);

//balance en un periodo de timepo
//stock
//productos a comprar

module.exports = reportsRouter;