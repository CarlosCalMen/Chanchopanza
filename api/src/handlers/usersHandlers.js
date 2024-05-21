const {}=require('../controllers/usersControllers.js');

const getAllUsersHandler = (req,res)=>{
    res.status(200).send('Estoy en usuarios');
};

const getUserByIdHandler =(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en el usuario con id:${id}`);
};

const postUserHandler = (req,res)=>{
    res.status(200).send('Estoy grabando un usuario');
};

const putUserHandler =(req,res)=>{
    res.status(200).send('Estoy modificando un usuario');
};

const deleteUserHandler =(req,res)=>{
    res.status(200).send('Estoy eliminando un usuario');
};

module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    postUserHandler,
    putUserHandler,
    deleteUserHandler
};