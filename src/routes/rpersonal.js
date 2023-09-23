const { Router } = require('express');
const router = Router();
const { listarPersonals, crearPersonals,verPersonal,actualizarPersonal,eliminarPersonal, listarTecnicos} = require('../controllers/personals.controller');
const {isSupervisor} = require('../middleware/autorizacion');

//servicios supervisor

router.get("/listar",isSupervisor,listarPersonals);
router.get("/ver/:id",isSupervisor,verPersonal);
router.post("/crear",isSupervisor,crearPersonals);
router.post("/actualizar/:id",isSupervisor,actualizarPersonal);
router.get("/eliminar/:id",isSupervisor,eliminarPersonal);
router.get("/listartecnicos",isSupervisor,listarTecnicos);

module.exports = router