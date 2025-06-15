const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Proveedor',{
        idProveedor:{
            type:DataTypes.UUIDV4,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,
        },
        proveedor:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        direccion:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        telefono1:{
            type:DataTypes.JSON,
            allowNull:false,
        },
        telefono2:{
            type:DataTypes.JSON,
            allowNull:true,
        },
    },
    {timestamps:false});
};