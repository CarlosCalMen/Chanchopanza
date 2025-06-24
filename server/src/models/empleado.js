const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Empleado',{
        idEempleado: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue:DataTypes.UUV4,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         apellidoPaterno: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         apellidoMaterno: {
            type: DataTypes.STRING,
            allowNull: false,
         },
        dni:{
            type:DataTypes.STRING,
            allowNull:true,
            validate:{
                is:/^\d{8}$/
                },
        },
        birthMonth:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                min:1,
                max:12,
            },
        },
        birthDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
                validate: {
                min: 1,
                max: 31,
                isValidDay(value) {
                    const month = this.birthMonth;
                    // Solo validar si birthMonth también está presente
                    if (month == null || value == null) return;
                    const testDate = new Date(2000, month - 1, value); // Año bisiesto
                    if (
                        testDate.getMonth() + 1 !== month ||
                        testDate.getDate() !== value
                    ) {
                        throw new Error(`El día ${value} no es válido para el mes ${month}.`);
                    }
                }
                }
        },
        cargo: {
            type: DataTypes.ENUM(['AYUDANTE DE COCINA', 'MESERO','CHEFF','CAJERO','ADMINISTRADOR']),
            allowNull:false,
        },
        salario: {
            type: DataTypes.FLOAT,
        },
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        fechaFin: {
            type: DataTypes.DATE,
        },
        eliminado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
    },
    {
        tableName: 'empleados',
        timestamps: false,
    });
};
