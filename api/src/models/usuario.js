const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Usuario',{
        idUsuario:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 20],
                    msg: 'El campo debe tener entre 5 y 20 caracteres'
                    },
                is: {
                    args: /^[a-zA-Z0-9]+$/i,  // Solo letras y números
                    msg: 'Solo se permiten letras y números, sin caracteres especiales'
                    },
            },
        },
        clave:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 10],
                    msg: 'La contraseña debe tener entre 6 y 10 caracteres.'
                },
                isStrongPassword(value) {
                    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;
                    if (!regex.test(value)) {
                    throw new Error(
                        'La contraseña debe tener al menos una mayúscula, una minúscula y un número, sin caracteres especiales.');
                    }
                }
            },
        },
        claveAnterior:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                msg: 'Debe ser un correo electrónico válido.'
                },
                hasValidExtension(value) {
                const regex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
                if (!regex.test(value)) {
                    throw new Error('El correo debe terminar con una extensión de 3 letras (como .com, .net, etc.)');
                };
                },
            }   
        },
        telefono:{
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
        fechaFinClave:{
            type:DataTypes.DATEONLY,
            allowNull:true,
        },
        perfil:{
        type:DataTypes.STRING,
        validate:{
            isIn:{
                args:[['USUARIO','SOCIO','ADMINISTRADOR']],
                msg:'El perfil debe ser: USUARIO, SOCIO o ADMINISTRADOR',
            },
        },
    },
    },
    {timestamps:false});
};