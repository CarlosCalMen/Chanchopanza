const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
sequelize.define('Cliente',{
    idCliente:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
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
{   timestamps:false,
    tableName:'clientes',
});
};
