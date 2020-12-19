const Router = require('express-promise-router');

const usuarioRouter = require('./usuario');
const categoriaRouter = require('./categoria');
const articuloRouter = require('./articulo');

const router = Router();

// Aquí van a ir los diversos enrutadores de nuestro API
router.use('/usuario', usuarioRouter);
router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);

// Exportamos el enrutador para poder ser referenciado por fuera del modulo
module.exports = router;