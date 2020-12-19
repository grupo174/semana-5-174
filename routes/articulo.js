/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articleController = require('../controllers/articleController');
const { verifyUsuario } = require('../middlewares/auth');

const router = routerx();

router.get('/list', articleController.list);
router.post('/add', verifyUsuario, articleController.add);
router.put('/update', verifyUsuario, articleController.update);
router.put('/activate', verifyUsuario, articleController.activate);
router.put('/deactivate', verifyUsuario, articleController.deactivate);

module.exports = router;