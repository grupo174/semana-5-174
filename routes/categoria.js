// Aquí se gestionan todas las peticiones de categorias
const Router = require('express-promise-router');

const categoryController = require('../controllers/categoryController');
const { verifyUsuario } = require('../middlewares/auth');

// Creamos el objeto enrutador
router = Router();

// Las rutas que vamos a manejar
router.get('/list', verifyUsuario, categoryController.list);
router.post('/add', verifyUsuario, categoryController.add);
router.put('/update', verifyUsuario, categoryController.update);
router.put('/activate', verifyUsuario, categoryController.activate);
router.put('/deactivate', verifyUsuario, categoryController.deactivate);

// Exportamos el enrutador que acabamos de crear
module.exports = router;