const {Router} = require('express');
const {getAllOrdersHandler,getOrderByIdHandler,
        postOrderHandler,putOrderHandler,deleteOrderHandler} = require('../handlers/ordersHandlers');

const ordersRouter = Router();


ordersRouter.get('/',getAllOrdersHandler);

ordersRouter.get('/:id',getOrderByIdHandler); 

ordersRouter.post('/',postOrderHandler); 

ordersRouter.put('/:id',putOrderHandler);

ordersRouter.delete('/:id',deleteOrderHandler); 


module.exports = ordersRouter;