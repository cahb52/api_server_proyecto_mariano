const { Router } = require('express');
const router = Router();
const { crearUsuarios, listarUsuarios, verUsuario,actualizarUsuario,eliminarUsuario, verUsuarioAdmin } = require('../controllers/usuarios.controller');
const { login,verificarToken } = require('../controllers/login.controller');
const {isAdmin, isSupervisor, isTecnico,verifyToken} = require('../middleware/autorizacion');
const configApp = require('../config/config');
const jwt = require("jsonwebtoken");

router.post("/login",login);
// router.post('/verificar',verificarToken);
router.get('/verificar/:token',verificarToken);

//URL EXCLUSIVAS ADMIN

router.get('/listarusuarios',isSupervisor,listarUsuarios);
router.post('/crearusuario',isAdmin,crearUsuarios);
router.get('/usuario/:id',isSupervisor,verUsuario);
router.post('/actualizarusuario/:id',isAdmin,actualizarUsuario);
router.get('/eliminarusuario/:id',isAdmin,eliminarUsuario);
router.get('/usuarioadmin/:id',isAdmin,verUsuarioAdmin);

module.exports = router;