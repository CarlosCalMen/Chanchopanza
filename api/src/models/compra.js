const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Compra',{
        idCompra:{
            type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,            
        },
        fecha:{
            type:DataTypes.DATEONLY,
            },
        total:{
            type:DataTypes.FLOAT,
        },    
    },{timestamps:false})
};