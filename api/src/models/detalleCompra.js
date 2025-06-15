const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('DetalleCompra', {
    idCompra: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fechaCompra: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  });
};
