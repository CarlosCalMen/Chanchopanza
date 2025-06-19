const {Router} = require('express');

const shoppingsRouter = Router();
const {getAllShoppingsHandler,getShoppingByIdHandler,postShoppingHandler,
        putShoppingHandler,deleteShoppingHandler} = require('../handlers/shoppingsHandlers.js');

shoppingsRouter.get('/',getAllShoppingsHandler);

shoppingsRouter.get('/:id',getShoppingByIdHandler); 

shoppingsRouter.post('/',postShoppingHandler); 

shoppingsRouter.put('/:id',putShoppingHandler);

shoppingsRouter.delete('/:id',deleteShoppingHandler); 

module.exports = shoppingsRouter;