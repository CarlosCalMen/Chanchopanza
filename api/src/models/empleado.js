const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Empleado',{
        empleadoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
           autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
         },
        cargo: {
            type: DataTypes.STRING,
        },
        salario: {
            type: DataTypes.FLOAT,
        },
        fechaInicio: {
            type: DataTypes.DATE,
        },
    },{
    tableName: 'empleados',
    timestamps: false,
    });
};
