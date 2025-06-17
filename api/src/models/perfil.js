const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define = ('perfil',{
       idPerfil : {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4,
       }, 
       perfil:{
        type:DataTypes.ENUM('ADMINISTRADOR','USUARIO','SOCIO');
        allownull:false,
       },
    },
    {timestapms : false});
};