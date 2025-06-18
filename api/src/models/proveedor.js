const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Proveedor',{
        idProveedor:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUV4,
        },
        proveedor:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        direccion:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        telefono1:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isValidPhoneNumber(value) {
                const regex = /^9\d{8}$/;
                if (!regex.test(value)) {
                    throw new Error('El número debe tener 9 dígitos y comenzar con 9.');
                };
                },
            },
        },
        telefono2:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isValidPhoneNumber(value) {
                const regex = /^9\d{8}$/;
                if (!regex.test(value)) {
                    throw new Error('El número debe tener 9 dígitos y comenzar con 9.');
                };
                },
            },
        },
    },
    {timestamps:false});
};