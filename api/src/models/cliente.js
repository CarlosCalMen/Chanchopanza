const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
sequelize.define('Cliente',{
    idCliente:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        defaultValue:DataTypes.UUV4,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'GENERICO'
    },
    dni:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            is:/^\d{8}$/
        },
    },
    ruc:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            is:/^\d{11}$/
        },
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
},
{timestamps:false});
};
