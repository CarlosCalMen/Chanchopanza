const {}=require('../controllers/shoppingsControllers.js');

const getAllShoppingsHandler = (req,res)=>{
    res.status(200).send('Me trae todas las compras');
};

const getShoppingByIdHandler = (req,res)=>{
    const {id} = req.params;
    res.status(200).send(`Estoy en la compra con id: ${id}`);
};

const postShoppingHandler = (req,res)=>{
    res.status(200).send('Estoy grabando una Compra');
};

const putShoppingHandler = (req,res)=>{
    res.status(200).send('Estoy modificando una Compra');
};

const deleteShoppingHandler = (req,res)=>{
    res.status(200).send('Estoy eliminando una Compra');
};


module.exports = {
                    getAllShoppingsHandler,
                    getShoppingByIdHandler,
                    postShoppingHandler,
                    putShoppingHandler,
                    deleteShoppingHandler,
};