const sequ = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Comanda',{
        idComanda:{
            type:DataTypes.UUID,
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
            type:DataTypes.DECIMAL(10,2),
            defaultValue:0.00,
            validate:{min:0},
        },
        totalTarjeta:{
            type:DataTypes.DECIMAL(10,2),
            defaultValue:0.00,
            validate:{min:0},
        },
        total:{
            type:DataTypes.VIRTUAL,
            get(){
                if (!this.DetallesComandas) return 0;
                return this.DetallesComandas.reduce((suma,detalle)=>{
                        return suma + detalle.subTotal 
                },0);
            },
        },
        eliminado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
        estado:{
            type:DataTypes.ENUM('Pendiente',/*'EnProceso','Finalizada',*/'Cancelada'),
            defaultValue:'Pendiente',
        },
    },
    {   timestamps:false,
        tableName:'comandas',
        hooks: {
            beforeSave:(comanda)=>{
                // Validación: Medios de pago vs Total
                const sumaPagos = comanda.totalYape + comanda.totalEfectivo + comanda.totalTarjeta;
                if (Math.abs(sumaPagos - comanda.total) > 0.01)  // Permite pequeñas diferencias por redondeo
                    throw new Error(`La suma de pagos (${sumaPagos}) no coincide con el total (${comanda.total})`);
            },   
        }
    });
};