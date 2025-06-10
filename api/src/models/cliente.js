const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
sequelize.define('Cliente',{
    idCliente:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'GENERICO'
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
},
{timestamps:false});
};
