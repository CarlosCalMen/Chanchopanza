const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('DetalleCompra', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {min: 1},
    },
    precio:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
    },
    variacion:{
      type:DataTypes.DECIMAL(10,2),
      defaultValue:0,
    },
    subTotal:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
      get(){
        return (this.cantidad * this.precio) + (this.variacion || 0);       
      },
    },
},
  {
    timestamps: false,
    tableName:'detalleCompra',
    hooks: {
      beforeCreate: async (detalle)=>{
        if (!detalle.precio) {
          const insumo = await sequelize.models.Insumo.FindByPk (detalle.idInsumo);
          detalle.precio = insumo.precioUnitario;
        };
      },
    },
  });
};
