const { DataTypes } = require('sequelize');
const db = require('../config/database');
const activity_permisions = db.define('activity_permision',{
    id_activity: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      id_rol: {
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
    activity_permisions.hasOne(roles,{foreignKey:'id_rol'})
module.exports = activity_permisions;