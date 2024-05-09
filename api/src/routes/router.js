const {Router} = require('express');
const shoppingsRouter = require('./shoppingsRouter.js');
const sellsRouter = require('./sellsRouter.js');
const usersRouter = require('./usersRouter.js');

const mainRouter = Router();

mainRouter.use('/ventas', sellsRouter);
mainRouter.use('/compras', shoppingsRouter);
mainRouter.use('/usuarios', usersRouter);

module.exports = mainRouter;