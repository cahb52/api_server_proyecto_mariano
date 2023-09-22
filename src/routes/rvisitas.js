const { Router } = require('express');
const router = Router();
const { listarVisitas,crearVisita,verVisita,actualizarVisita,eliminarVisita} = require('../controllers/visitas.controller');
const {isSupervisor} = require('../middleware/autorizacion');
//servicios supervisor
router.get("/listar",isSupervisor,listarVisitas);
router.get("/ver/:id",isSupervisor,verVisita);
router.post("/crear",isSupervisor,crearVisita);
router.get("/eliminar/:id",isSupervisor,eliminarVisita);
router.post("/actualizar/:id",isSupervisor,actualizarVisita);



module.exports = router