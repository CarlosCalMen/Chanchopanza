const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Producto',{
        idProducto:{
            type:DataTypes.UUIDV4,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,
        },
        producto:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        precioCosto:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        /*precioVenta:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },*/
    },
    {timestamps:false})
};