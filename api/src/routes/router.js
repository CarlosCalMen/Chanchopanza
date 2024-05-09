const {Router} = require('express');
const comprasRouter = require('./comprasRouter.js');
const ventasRouter = require('./ventasRouter.js');

const mainRouter = Router();

mainRouter.use('/ventas', ventasRouter);
mainRouter.use('/compras', comprasRouter);

module.exports = mainRouter;