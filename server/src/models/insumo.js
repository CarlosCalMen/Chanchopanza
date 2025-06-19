const {DataTypes} =require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Insumo',{
        idInsumo:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,
        },
        insumo:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        categoria:{
            type:DataTypes.ENUM('BEBIDAS','RODUCTO ELABORADO', 'INSUMO','SERVICIO'),
            allowNull:false,
        },
        precio:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        unidad:{
            type:DataTypes.ENUM('KG','UN','PQT','ATADO'),
            allowNull:false,
        },
        stock:{
            type:DataTypes.FLOAT,
            allowNull:false,
            defaultValue: 0,
        },
        eliminado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
    },
    {   timestamps:false,
        tableName:'insumo',
    });
};