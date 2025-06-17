const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('DetalleComanda', {
        cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate:{min:1},
        },
        variacion: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        defaultValue:0,
        },
        precioVenta:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            
        },
        subTotal:{
            type:DataTypes.VIRTUAL,
            allowNull:false,
            get(){
                return this.cantidad * this.precioVenta + (this.variacion || 0);
            },
        },
    },
    { timestamps: false,
      hooks:{
            beforeCreate: async(detalle)=>{
                // Solo si no se proporcionó el precio manualmente
                if (!detalle.precioVenta) {
                    const producto = await sequelize.models.Producto.findByPk(detalle.productoId);
                    if (!producto) throw new Error('Producto no encontrado');
                        detalle.precioVenta = producto.precioVenta; // Asigna el precio actual
                }; 
            },
        },
    });
};