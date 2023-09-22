const { Pool } = require('pg');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize('gaiaa', 'postgres', 'Felipito#12', {
  host: 'localhost',
  dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
  }
});
// db.authenticate()
// .then(()=>console.log("se conecto")
// )
// .catch(err=>console.log("no se conecto"))