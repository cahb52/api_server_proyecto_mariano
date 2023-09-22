const { DataTypes } = require('sequelize');
const db = require('../config/database');
const usuarios = require('../models/usuarios');

const personals = db.define('personal',{
    id_personal: {
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
      cui: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fecha_nacimiento: {
        type: DataTypes.DATE,
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
      id_users: {
        type: DataTypes.INTEGER,
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

    personals.hasOne(usuarios,{foreignKey:'id_users'});
    usuarios.hasMany(personals,{foreignKey:'id_users'});
    usuarios.belongsTo(personals,{foreignKey:'id_users',targetKey:'id_users'})
    

module.exports = personals;