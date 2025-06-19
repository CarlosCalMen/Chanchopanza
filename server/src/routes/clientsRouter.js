const {Router} = require('express');
const {getAllClientsHandler,getClientByIdHandler,
    postClientHandler,putClientHandler,deleteClientHandler} = require('../handlers/clientsHandlers');

const clientsRouter = Router();

clientsRouter.get('/', getAllClientsHandler); 

clientsRouter.get('/:id',getClientByIdHandler); 

clientsRouter.post('/',postClientHandler); 

clientsRouter.put('/:id',putClientHandler);

clientsRouter.delete('/:id',deleteClientHandler); 

module.exports = clientsRouter;
