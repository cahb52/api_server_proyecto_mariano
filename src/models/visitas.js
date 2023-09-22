const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const clientes = require('./clientes');
const servicio = require('./servicios');
const personal = require('./personal');

const visitas = db.define('visitas',{
    id_visita: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_personal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      hora_visita: {
        type: DataTypes.TIME,
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      observaciones: {
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
    visitas.hasOne(clientes,{foreignKey:'id_cliente'});
    clientes.belongsTo(visitas,{foreignKey:'id_cliente',targetKey:'id_cliente'});
    visitas.hasOne(servicio,{foreignKey:'id_servicio'});
    servicio.belongsTo(visitas,{foreignKey:'id_servicio',targetKey:'id_servicio'});
    visitas.hasOne(personal,{foreignKey:'id_personal'});
    personal.belongsTo(visitas,{foreignKey:'id_personal',targetKey:'id_personal'});

module.exports = visitas;