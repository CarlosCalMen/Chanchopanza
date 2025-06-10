const {DataTypes} =require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Producto',{
        idProducto:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        producto:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        categoria:{
            type:DataTypes.ENUM('Bebidas','Producto elaborado', 'Insumo' ),
        },
        precio:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        stock:{
            type:DataTypes.FLOAT,
            //allowNull:false,
        },
    },
    {timestamps:false});
};