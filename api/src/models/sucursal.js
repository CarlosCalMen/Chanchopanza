const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
sequelize.define('Sucursal',{
    idSucursal:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
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
},
{timestamps:false});
};
