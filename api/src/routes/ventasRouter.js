const {Router} = require('express');

const ventasRouter = Router();

ventasRouter.get('/',(req,res)=>{
    res.status(200).send('Estoy en Ventas');
});

ventasRouter.get('/:id',(req,res)=>{
    res.status(200).send('Estoy en una venta en particular');
});

ventasRouter.post('/',(req,res)=>{
    res.status(200).send('Estoy garbando una Venta');
});

ventasRouter.put('/',(req,res)=>{
    res.status(200).send('Estoy modificando una Venta');
});

ventasRouter.delete('/',(req,res)=>{
    res.status(200).send('Estoy eliminando una Venta');
});

module.exports = ventasRouter;