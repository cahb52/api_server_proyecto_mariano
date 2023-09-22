const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const roles = require('../models/roles');

const usuarios = db.define('usuario',{
    id_users: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users: {
        type: DataTypes.CHAR,
        allowNull: false
      },
      estado: {
        type: DataTypes.CHAR,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
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
    usuarios.hasOne(roles,{foreignKey:'id_rol'});
    roles.hasMany(usuarios,{foreignKey:'id_rol'});
    roles.belongsTo(usuarios,{foreignKey:'id_rol',targetKey:'id_rol'})
module.exports = usuarios;