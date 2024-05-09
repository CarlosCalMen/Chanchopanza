const {Router} = require('express');

const usersRouter = Router();

usersRouter.get('/',(req,res)=>{
    res.status(200).send('Estoy en usuarios');
});

usersRouter.get('/:id',(req,res)=>{
    res.status(200).send('Estoy en un usuario en particular');
});

usersRouter.post('/',(req,res)=>{
    res.status(200).send('Estoy garbando un usuario');
});

usersRouter.put('/',(req,res)=>{
    res.status(200).send('Estoy modificando un usuario');
});

usersRouter.delete('/',(req,res)=>{
    res.status(200).send('Estoy eliminando un usuario');
});

module.exports = usersRouter;
