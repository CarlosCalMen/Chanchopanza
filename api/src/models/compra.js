const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Compra',{
        idCompra:{
            type:DataTypes.UUIDV4,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,            
        },
        fecha:{
            type:DataTypes.DATEONLY,
            },
        total:{
            type:DataTypes.FLOAT,
        },    
    },{timestamps:false})
};