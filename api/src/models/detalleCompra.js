const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('DetalleCompra', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    variacion:{
      type:DataTypes.FLOAT,
      allowNull:true,
    },
    subTotal:{
      allowNull:false,
      get(){
        cantidad*precio;       
      },
    },
  },
  {
    timestamps: false
  });
};
