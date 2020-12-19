// Para definir las rutas de los usuarios
const Router = require('express-promise-router');

// El controlador de los usuarios los traemos de la carpeta correspondiente
const UserController = require('../controllers/userController');

// El manejo de autorizaciones y tipos de usuarios, con el token
const auth = require('../middlewares/auth');

// Creamos el enrutador y especificamos quien va a manejar la petición
const router = Router()

// Las diversas rutas que vamos a atender con este endPoint
router.post('/login', UserController.login);
router.get('/list', auth.verificarUsuarioAdministrador, UserController.list);

// Exportamos el enrutador
module.exports = router;