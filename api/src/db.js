const {Sequelize, UUIDV4, DataTypes} = require('sequelize');
require ('dotenv').config();

const {DB_DIALECT, DB_USER,DB_PASSWORD,DB_HOST,DB_NAME } =  process.env
const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
{
    logging: false,
    native:false,
});

sequelize.define('Cliente',{
    idCliente:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'GENERICO'
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
},
{timestamps:false});

sequelize.define('Empleado',{
    dni:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    apellidoPaterno:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    apellidoMaterno:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    cargo:{
        type:DataTypes.STRING,
        validate:{
                isIn:{
                    args:[['AYUDANTE DE COCINA', 'MESERO','CHEFF','CAJERO','ADMINISTRADOR']],
                    msg:' El cargo debe ser uno de los siguientes: AYUDANTE DE COCINA, MESERO,CHEFF,CAJERO,ADMINISTRADOR...'
                },
        },
    },
    salario:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
    fechaIngreso:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    fechaCese:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
},
{timestamps:false});

sequelize.define('Proveedor',{
    idProveedor:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},
{timestamps:false});

sequelize.define('Insumo',{
    idInsumo:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    insumo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    unidad:{
        type:DataTypes.STRING,
        validate:{
                isIn:{
                    args:[['Kilo', 'Unidad','Ciento']],
                    msg:'La unidad debe ser: Kilo, Unidad o Ciento',
                },
        }
    },
    precio:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
    },
    stock:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
    },
},
{timestamps:false});

sequelize.define('Producto',{
    idProducto:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    producto:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    precioCosto:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
    },
    precioVenta:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
    },
},
{timestamps:false});

sequelize.define('Comanda',{
    idComanda:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    idCliente:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    total:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:false,
    },
    efectivo:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:true,
    },
    yape:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:true,
    },
    tarjeta:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:true,
    },
    cancelado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    descuento:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:true,
    },
    adicional:{
        type:DataTypes.DECIMAL(6,2 ),
        allowNull:true,
    }
},
{timestamps:false});

sequelize.define('DetalleComanda',{
    idDetalle:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    idComanda:{
        type:DataTypes.INTEGER,
        allowNullValues:false,
    },
    idProducto:{
        type:DataTypes.INTEGER,
        allowNullValues:false,
    },
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    subTotal:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},
{timestamps:false});


sequelize.define('Compra',{
    idCompra:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    idProveedor:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }, 
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    total:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:false,
    },
},
{timestamps:false});

sequelize.define('DetalleCompra',{
    idDetalleCompra:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    idCompra:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    idProducto:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    cantidad:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    subTotal:{
        type:DataTypes.DECIMAL(6,2),
        allowNull:false,
    },
},
{timestamps:false});

sequelize.define('Usuario',{
    idUsuario:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    idEmpleado:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    perfil:{
        type:DataTypes.STRING,
        validate:{
            isIn:{
                args:[['EMPLEADO','SOCIO','ADMINISTRADOR']],
                msg:'El perfil debe ser: EMPLEADO, SOCIO o ADMINISTRADOR',
            }
        }
    },
},
{timestamps:false});

module.exports = {
                conn:sequelize
};

//está oendiente implemantar las relaciones entra cada una de las tablas. lo cual haré próximammente, con eso procedo a culminar lo necesario para el back end
//definiendo los atributods que serán FK en las tablas lo cual  se debe concretar proximammete
//actualmente con un proyecto que no permite culminar esto