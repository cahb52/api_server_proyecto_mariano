const { Router } = require('express');
const router = Router();
//obtenemos ruta a servicios (admin, supervisor)
const rservicios = require('./rservicios');
//obtenemos las rutas a clientes (admin, supervisor)
const rclientes = require('./rclientes');
//obtenemos las rutas a usuarios (admin, supervisor)
const rusuarios = require('./rusuarios');
//obtenemos las rutas para personals
const rpersonal = require('./rpersonal');
//otbenemos las rutas para visitas
const rvisitas = require('./rvisitas');
const { isSupervisor } = require('../middleware/autorizacion');

//rutas de usuarios incluyendo el login
router.use('/api',rusuarios);
//rutas para los servicios
router.use('/api/servicios',rservicios);
//Obtener todos los clientes
router.use('/api/clientes',rclientes);
//obtenemos las rutas para personals
router.use('/api/personal',rpersonal);
//obtenemos las rutas para visitas
router.use('/api/visitas',rvisitas);




module.exports = router;