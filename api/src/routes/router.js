const {Router} = require('express');
const shoppingsRouter = require('./shoppingsRouter.js');
const sellsRouter = require('./sellsRouter.js');
const usersRouter = require('./usersRouter.js');
const productsRouter = require('./productsRouter.js');

const mainRouter = Router();

mainRouter.use('/ventas', sellsRouter);
mainRouter.use('/compras', shoppingsRouter);
mainRouter.use('/usuarios', usersRouter);
mainRouter.use('/productos', productsRouter);

module.exports = mainRouter;