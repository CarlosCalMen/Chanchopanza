const {Router} = require('express');
const shoppingsRouter = require('./shoppingsRouter.js');
const ordersRouter = require('./ordersRouter.js');
const usersRouter = require('./usersRouter.js');
const productsRouter = require('./productsRouter.js');
const clientsRouter = require('./clientsRouter.js');
const reportsRouter = require('./reportsRouter.js');

const mainRouter = Router();

mainRouter.use('/pedidos', ordersRouter);
mainRouter.use('/compras', shoppingsRouter);
mainRouter.use('/usuarios', usersRouter);
mainRouter.use('/productos', productsRouter);
mainRouter.use('/clientes', clientsRouter); 
mainRouter.use('/reportes', reportsRouter);

module.exports = mainRouter;