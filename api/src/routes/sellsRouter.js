const {Router} = require('express');
const {getAllSellsHandler,getSellByIdHandler,
        postSellHandler,putSellHandler,deleteSellHandler} = require('../handlers/sellsHandlers');

const sellsRouter = Router();


sellsRouter.get('/',getAllSellsHandler);

sellsRouter.get('/:id',getSellByIdHandler); 

sellsRouter.post('/',postSellHandler); 

sellsRouter.put('/',putSellHandler);

sellsRouter.delete('/',deleteSellHandler); 


module.exports = sellsRouter;