const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Plato',{
        idPlato:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        plato:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        precio:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
    },
    {timestamps:false})
};