const {getAllClientes,getClienteById,getClienteByApellido,getClienteByDni,
    getClienteByRuc,createCliente,updateCliente,deleteCliente,} = require('../controllers/clientesControllers.js'); 

const {validarCliente} =require('../validations/validacionesCliente.js');

const {validarDNI,validarRUC} = require('../validations/validacionesGenerales.js'); 

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


const getClienteByDniHandler = async(req, res) => {
    const { dni } = req.params;
    try {
        if (!dni) return res.status(400).json({ error: 'El parámetro DNI es requerido' });
        const validacion = validarDNI(dni);
        if (validacion.error) return res.status(400).json({ error: validacion.error });
        const cliente = await getClienteByDni(dni); 
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado con el DNI: ${dni}' });
        };
        return res.status(200).json(cliente);
    } catch (error) {
        console.error(`Error buscando cliente por DNI ${dni}:`, error);
        return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    };
};

const getClienteByRucHandler = async(req,res)=>{
    const {ruc} = req.params;
    try {
        if (!ruc) return res.status(400).json({ error: 'El parámetro RUC es requerido' });
        const validacion = validarRUC(ruc);
        if (validacion.error) return res.status(400).json({ error: validacion.error });
        const cliente = await getClienteByRuc(ruc); 
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        };
        return res.status(200).json(cliente);
    } catch (error) {
        console.error(`Error buscando cliente por RUC ${ruc}:`, error);
        return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    };
};    

const postClientHandler = async(req,res)=>{
    try {
        const {body} = req;
        const validacionCliente = validarCliente(body);
        if (!validacionCliente.valido){
            return res.status(400).json({error: `Datos de cliente inválidos`,
                                         detalles:validacionCliente.errores});
        };
        return res.status(201).json(await createCliente(body));
    } catch (error) {
        return res.status(400).json({error: error.message,
                                     detalles:error.errors.map(detalle =>detalle.message),   
        });
    };
};

const { v4: uuidv4 } = require('uuid');

const putClientHandler = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar datos para actualizar' });
        };
        const validacion = validarCliente(body);
        if (!validacion.valido) {
            return res.status(400).json({
                error: 'Datos del cliente inválidos',
                detalles: validacion.errores
            });
        }
        const clienteActualizado = await updateCliente(id, validacion.datosValidados);
        if (!clienteActualizado) {
            return res.status(404).json({ error: `Cliente con ID ${id} no encontrado` });
        };
        return res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error(`Error al actualizar cliente ${id}:`, error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ 
                error: 'Conflicto de datos únicos',
                detalles: error.errors.map(error => error.message)
            });
        };
        return res.status(500).json({ 
            error: 'Error interno al actualizar cliente',
            detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    };
};

const deleteClientHandler = async(req, res)=>{
    const {id} = req.params
    if (id){
        try {
            return res.status(201).json(await deleteCliente(id));
        } catch (error) {
            return res.status(400).json(`Error eliminando el cliente con ID: ${id}, `,error.message)           
        };
    };
};

module.exports = {
                getAllClientsHandler,
                getClientByIdHandler,
                getClientByApellidoHandler,
                getClienteByDniHandler,
                getClienteByRucHandler,
                postClientHandler,
                putClientHandler,
                deleteClientHandler,
};