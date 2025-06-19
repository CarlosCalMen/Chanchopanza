const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Sucursal',{
        idSucursal:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        direccion:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        finContrato:{
            type:DataTypes.DATEONLY,
        },
        eliminado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        }
    },
    {   timestamps:false,
        tableName:'sucursales',    
    });
};
