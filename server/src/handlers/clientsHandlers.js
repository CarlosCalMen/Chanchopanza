const {getAllClientes,getClienteById,getClienteByApellido,getClienteByDni,
    getClienteByRuc,createCliente,updateCliente,deleteCliente,} = require('../controllers/clientesControllers.js'); 

const getAllClientsHandler = async(req,res)=>{
    try {
        res.status(200).json(await getAllClientes());
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
}; 

const getClientByIdHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!id) throw new Error(`Debe proporcionarse un Id para realizar la búsqueda`);
        return res.status(200).json(await getClienteById(id));
    } catch (error) {
        return res.status(400).json({error: error.message});     
    }
};

const getClientByApellidoHandler = async(req,res)=>{
    const {apellido} = req.params;
    try {
        if(!apellido) throw new Error(`Debe proporcionarse un apellido para realizar la búsqueda`);
        return res.status(200).json(await getClienteByApellido(apellido));
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getClienteByDniHandler = async(req,res)=>{
    const {dni} = req.params;
    try {
        if(!dni || isNaN(dni)) throw new Error(`Debe proporcionarse dni correcto realizar la búsqueda`);
        return res.status(200).json(await getClienteByDni(dni));
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getClienteByRucHandler = async(req,res)=>{
    const {ruc} = req.params;
    try {
        if(!ruc || isNaN(ruc)) throw new Error(`Debe proporcionarse ruc correcto realizar la búsqueda`);
        return res.status(200).json(await getClienteByRuc(ruc));
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const postClientHandler = async(req,res)=>{
    try {
        const {body} = req;
        if(!body) throw new Error(`Debe proporcionarse un cliente para crear`);
        return res.status(200).json(await createCliente(body));
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
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
                getClientByApellidoHandler,
                getClienteByDniHandler,
                getClienteByRucHandler,
                postClientHandler,
                putClientHandler,
                deleteClientHandler}