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
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            defaultValue:0,
        },
        precioVenta:{
            type:DataTypes.FLOAT,
            allowNull:false,
            defaultValue: 0,
        },
    },
    {timestamps:false})
};