const { DataTypes } = require('sequelize');
const db = require('../config/database');

const clientes = db.define('cliente',{
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      primer_apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      segundo_apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      primer_nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      segundo_nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      entidad: {
        type: DataTypes.STRING,
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitud: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitud: {
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


module.exports = clientes;