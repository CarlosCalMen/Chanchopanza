const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Orden',{
        idOrden:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        fecha:{
            type:DataTypes.DATEONLY,
            defaultValue:Sequelize.NOW,
        },
        totalYape:{
            type:DataTypes.FLOAT,
            defaultValue:0,
        },
        totalEfectivo:{
            type:DataTypes.FLOAT,
            defaultValue:0,
        },
        totalTarjeta:{
            type:DataTypes.FLOAT,
            defaultValue:0,
        },
        total:{
            type:DataTypes.VIRTUAL,
            get(){
                return this.totalYape + this.totalEfectivo + this.totalTarjeta;
            },
        },
    },
    {timestamps:false});
};