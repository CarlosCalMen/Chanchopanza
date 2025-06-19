const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Compra',{
        idCompra:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,            
        },
        fecha:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW,
            },
        total:{
            type:DataTypes.DECIMAL(10,2),
            get (){
                if (!this.DetalleCompras) return 0;
                return this.DetalleCompras.reduce((suma,detalle)=>{
                    return suma + detalle.subTotal; 
                },0);
            },
        },
        eliminado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        }
    },
    {   timestamps:false,
        tableName:'compras',
    });
};