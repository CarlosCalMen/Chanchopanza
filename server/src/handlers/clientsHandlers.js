const {} = require('../controllers/costumersControllers'); 

const getAllClientsHandler = (req,res)=>{
    res.status(200).send('estoy trayendo todos los clientes');
}; 

const getClientByIdHandler = (req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy trayendo al cliente con id: ${id}`); 
};

const postClientHandler = (req, res)=>{
    res.status(200).send('Estoy grabando al cliente');
};

const putClientHandler = (req, res)=>{
    const {id} = req.params
    if (id){
        res.status(200).send(`Estoy modificando al cliente con id: ${id}`);
        return;
    }
    res.status(400).send(`No existe el cliente con id: ${id}`);

};

const deleteClientHandler = (req, res)=>{
    const {id} = req.params
    if (id){
        res.status(200).send(`Estoy eliminando al cliente con id: ${id}`);
        return;
    }
};

module.exports = {
                getAllClientsHandler,
                getClientByIdHandler,
                postClientHandler,
                putClientHandler,
                deleteClientHandler}