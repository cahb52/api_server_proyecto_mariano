const { Router } = require('express');
const router = Router();
const { listarClientes,crearClientes,verCliente,actualizarCliente,eliminarCliente} = require('../controllers/client.controller');
const {isSupervisor, isTecnico} = require('../middleware/autorizacion');
//servicios supervisor
router.get("/listar",isTecnico,listarClientes);
router.get("/ver/:id",isTecnico,verCliente);
router.post("/crear",isSupervisor,crearClientes);
router.get("/eliminar/:id",isSupervisor,eliminarCliente);
router.post("/actualizar/:id",isSupervisor,actualizarCliente);



module.exports = router