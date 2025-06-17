const sequ = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Comanda',{
        idComanda:{
            type:DataTypes.UUIDV4,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
        },
        fecha:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW,
            allowNull:false,
        },
        totalYape:{
            type:DataTypes.DECIMAL(10,2),
            defaultValue:0.00,
            validate:{min:0},
        },
        totalEfectivo:{
            type:DataTypes.FLOAT,
            defaultValue:0.00,
            validate:{min:0},
        },
        totalTarjeta:{
            type:DataTypes.FLOAT,
            defaultValue:0.00,
            validate:{min:0},
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