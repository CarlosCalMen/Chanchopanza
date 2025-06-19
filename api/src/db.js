const {Sequelize} = require('sequelize');
require ('dotenv').config();

const clienteModel = require('../src/models/cliente.js'); 
const comandaModel = require('../src/models/comanda.js');
const compraModel = require('../src/models/compra.js');
const detalleComandaModel = require('../src/models/detalleComanda.js');
const detalleCompraModel = require('../src/models/detalleCompra.js');
const empleadoModel = require('../src/models/empleado.js');
const insumoModel = require('../src/models/insumo.js');
const productoModel = require('../src/models/producto.js');
const proveedorModel = require('../src/models/proveedor.js');
const recetaModel = require('../src/models/receta.js');
const sucursalModel = require('../src/models/sucursal.js');
const usuarioModel = require('../src/models/usuario.js');

const {DB_DIALECT, DB_USER,DB_PASSWORD,DB_HOST,DB_NAME } =  process.env
const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
{
    logging: false,
    native:false,
});

//Inyectamos la conexion sequlize a cada uno de los modelos

comandaModel(sequelize); 
clienteModel(sequelize); 
compraModel(sequelize);
detalleComandaModel(sequelize);
detalleCompraModel(sequelize);
empleadoModel(sequelize);
insumoModel(sequelize);
productoModel(sequelize);
proveedorModel(sequelize);
recetaModel(sequelize);
sucursalModel(sequelize);
usuarioModel(sequelize); 

//destructuramos todos los modelos contenidos en sequelize


const {Comanda,Cliente,Compra,DetalleComanda,DetalleCompra,
        Empleado,Insumo,Producto,Proveedor,Receta,Sucursal,Usuario} =sequelize.models;

//definimos las relaciones

const setupRelations = () => {
  // 1. Usuario -> Empleado (1:1)
  Usuario.hasOne(Empleado, { foreignKey: 'idUsuario' });
  Empleado.belongsTo(Usuario, { foreignKey: 'idUsuario' });

  // 2. Empleado -> Sucursal (M:1)
  Sucursal.hasMany(Empleado, { foreignKey: 'idSucursal' });
  Empleado.belongsTo(Sucursal, { foreignKey: 'idSucursal' });

  // 3. Sucursal <-> Proveedor (M:M)
  Sucursal.belongsToMany(Proveedor, { through: 'proveedoresSucursal' });
  Proveedor.belongsToMany(Sucursal, { through: 'proveedoresSucursal' });

  // 4. Proveedor -> Compra (1:M)
  Proveedor.hasMany(Compra, { foreignKey: 'idProveedor' });
  Compra.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

  // 5. Compra <-> Insumo (M:M)
  Compra.belongsToMany(Insumo, {through: DetalleCompra,foreignKey: 'idCompra'});
  Insumo.belongsToMany(Compra, {through: DetalleCompra,foreignKey: 'idInsumo'});

  // 6. Producto <-> Insumo (M:M) - Receta
  Producto.belongsToMany(Insumo, {through: Receta,foreignKey: 'idProducto',as: 'Insumos'});
  Insumo.belongsToMany(Producto, {through: Receta,foreignKey: 'idInsumo'});

  // 7. Sucursal <-> Cliente (M:M)
  Sucursal.belongsToMany(Cliente, { through: 'clientesSucursal' });
  Cliente.belongsToMany(Sucursal, { through: 'clientesSucursal' });

  // 8. Cliente -> Comanda (1:M)
  Cliente.hasMany(Comanda, { foreignKey: 'idCliente' });
  Comanda.belongsTo(Cliente, { foreignKey: 'idCliente' });

  // 9. Comanda <-> Producto (M:M)
  Comanda.belongsToMany(Producto, {through: DetalleComanda,foreignKey: 'idComanda',as: 'Productos'});
  Producto.belongsToMany(Comanda, {through: DetalleComanda,foreignKey: 'idProducto'});

  // Relaciones adicionales para acceder a detalles
  Comanda.hasMany(DetalleComanda, {foreignKey: 'idComanda',as: 'DetalleComandas'});
  Compra.hasMany(DetalleCompra, {foreignKey: 'idCompra',as: 'DetalleCompras'});
  Producto.hasMany(Receta, {foreignKey: 'idProducto'});
};

// Inicializar relaciones
setupRelations();

module.exports = {...sequelize.models, conn:sequelize};

