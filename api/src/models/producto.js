const {DataTypes} =require('sequelize');

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
        categoria:{
            type:DataTypes.ENUM('Bebidas','Producto elaborado', 'Insumo','Servicio'),
            allowNull:false,
        },
        precio:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        unidad:{
            type:DataTypes.ENUM('Kg','Un','Pqt'),
            allowNull:false,

        },
     /*   stock:{
            type:DataTypes.FLOAT,
            //allowNull:false,
        },*/
    },
    {timestamps:false});
};