const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Plato',{
        idPlato:{
            type:DataTypes.UUIDV4,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,
        },
        plato:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        precioCosto:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        precioVenta:{
            type:DataTypes.FLOAT,
            allowNull:false,

        }
    },
    {timestamps:false})
};