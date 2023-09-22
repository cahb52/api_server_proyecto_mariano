const { DataTypes } = require('sequelize');
const db = require('../config/database');

const servicios = db.define('servicio',{
    id_servicio: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      tipo_servicio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: true
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: true
      }
    });


module.exports = servicios;