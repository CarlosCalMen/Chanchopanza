const {}=require('../controllers/usersControllers.js');

const getAllUsersHandler = (req,res)=>{
    res.status(200).send('Estoy en usuarios');
};

const getUserByIdHandler =(req,res)=>{
    res.status(200).send('Estoy en un usuario en particular');
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