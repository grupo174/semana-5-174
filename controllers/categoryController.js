// Aquí están todas las operaciones que se pueden llevar a cabo con las categorias
const models = require('../models');

// Esta operacion me permite obtener todas las categorias de la BD
exports.list = async (req, res, next) => {
    try {
        const listaCategorias = await models.Categoria.findAll();
        res.status(200).json(listaCategorias);
    } catch (error) {
        res.status(500).send({
            reason: 'Error happenned!'
        });
        next(error);
    }
}

// Esta operacion permite agregar una nueva categoria a la BD
exports.add = async (req, res, next) => {
    try {
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const estado = req.body.estado || 0;
        const resultado = await models.Categoria.create({nombre, descripcion, estado});
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error: impossible to add category!'
        });
        next(error);
    }
}

// Actualiza una categoría dada a partir del identificador
exports.update = async (req, res, next) => {
    try {
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const ident = req.body.id;
        const resultado = await models.Categoria.update({nombre, descripcion}, {where: {id: ident}});
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error updating category'
        });
        next(error);
    }
}

// Actualizar estado de la categoria
exports.activate = async (req, res, next) => {
    try {
        const ident = req.body.id;
        const resultado = await models.Categoria.update({
            estado: 1
        },
        {
            where: { id: ident }
        });
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error activating category'
        });
        next(error);
    }
}

// Actualizar estado de la categoria
exports.deactivate = async (req, res, next) => {
    try {
        const ident = req.body.id;
        const resultado = await models.Categoria.update({
            estado: 0
        },
        {
            where: { id: ident }
        });
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error activating category'
        });
        next(error);
    }
}