const { DataTypes } = require('sequelize');
const db = require('../config/database');
const usuarios = require('./usuarios');
const roles = db.define('role',{
    id_rol: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      rol: {
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

module.exports = roles;