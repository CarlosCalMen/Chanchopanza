const {Router} = require('express');

const comprasRouter = Router();

comprasRouter.get('/',(req,res)=>{
    res.status(200).send('Me trae todas las compras');
});

comprasRouter.get('/:id',(req,res)=>{
    res.status(200).send('Estoy en una compra en particular');
});

comprasRouter.post('/',(req,res)=>{
    res.status(200).send('Estoy grabando una Compra');
});

comprasRouter.put('/',(req,res)=>{
    res.status(200).send('Estoy modificando una Compra');
});

comprasRouter.delete('/',(req,res)=>{
    res.status(200).send('Estoy eliminando una Compra');
});


module.exports = comprasRouter;