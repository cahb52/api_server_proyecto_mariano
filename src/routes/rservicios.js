const { Router } = require('express');
const router = Router();
const { listarServicios, crearServicio, actualizarServicio, eliminarServicio, verServicio } = require('../controllers/servicios.controller');
const {isAdmin, isSupervisor, isTecnico} = require('../middleware/autorizacion');
//servicios supervisor
router.get('/listar',isSupervisor,listarServicios);
router.get('/ver/:id',isSupervisor,verServicio);
router.post('/crear',isSupervisor,crearServicio);
router.post('/actualizar/:id',isSupervisor,actualizarServicio);
router.get('/eliminar/:id',isSupervisor,eliminarServicio);


module.exports = router
