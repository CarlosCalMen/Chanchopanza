const {}=require('../controllers/usersControllers.js');

const getAllUsersHandler = (req,res)=>{
    res.status(200).send('Estoy en usuarios');
};

const getUserByIdHandler =(req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en el usuario con id: ${id}`);
};

const postUserHandler = (req,res)=>{
    res.status(200).send('Estoy grabando un usuario');
};

const putUserHandler =(req,res)=>{
    const {id} = req.params;
    try {
         if(id){
            res.status(200).send(`Estoy modificando el usuario con id: ${id}`);
        }
    } catch (error) {
        res.status(400).send(`El usuario con id: ${id} no existe`);
    }
};

const deleteUserHandler =(req,res)=>{
    const {id} = req.params;
    if(id){
        res.status(200).send(`Estoy eliminando el usuario con id: ${id}`);
        return;  
    }
    res.status(404).send(`El usuario con id: ${id} no existe`);
};

module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    postUserHandler,
    putUserHandler,
    deleteUserHandler
};