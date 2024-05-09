const {Router} = require('express');
const comprasRouter = require('./comprasRouter.js');
const ventasRouter = require('./ventasRouter.js');
const usersRouter = require('./usersRouter.js');

const mainRouter = Router();

mainRouter.use('/ventas', ventasRouter);
mainRouter.use('/compras', comprasRouter);
mainRouter.use('/users', usersRouter);

module.exports = mainRouter;