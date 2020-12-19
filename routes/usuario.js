// Para definir las rutas de los usuarios

const Router = require('express-promise-router');

// El controlador de los usuarios los traemos de la carpeta correspondiente
const UserController = require('../controllers/userController');

// Creamos el enrutador y especificamos quien va a manejar la petición
const router = Router()
router.post('/login', UserController.login);

// Exportamos el enrutador
module.exports = router;