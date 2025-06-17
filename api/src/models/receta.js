const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Receta',{
        cantidad:{
            type:DataTypes.DECIMAL(5,3),
            allownull:false,
            defaultValue:0.001,
        },
        merma:{
            type:DataTypes.DECIMAL(5,3),
            allownull:false,
            defaultValue:0.001,
        },
        },
        {timestamps:false}
    );
};