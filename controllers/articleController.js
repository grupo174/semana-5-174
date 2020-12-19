// Aquí están todas las operaciones que se pueden llevar a cabo con las categorias
const models = require("../models");

// Esta operacion me permite obtener todas los articulos de la base de datos
exports.list = async (req, res, next) => {
    try {
        const listaArticulos = await models.Articulo.findAll({ include: [{ model: models.Categoria, as: "categoria" }] });
        res.status(200).json(listaArticulos);
    } catch (error) {
        res.status(500).send({
            reason: "Error getting articles!!",
        });
        next(error);
    }
};


// Esta operacion permite agregar un nuevo artículo a la base de datos
exports.add = async (req, res, next) => {
    try {
        const codigo = req.body.codigo;
        const nombre= req.body.nombre;
        const descripcion = req.body.descripcion;
        const estado = req.body.estado || 0;
        const categoriaId = req.body.categoriaId;

        // Buscamos la categoria primero a ver si existe
        const categoria = models.Categoria.findByPk(categoriaId);
        if (categoria) {
            const resultado = await models.Articulo.create({codigo, nombre, descripcion, estado, categoriaId});
            res.status(200).json(resultado);    
        }
        else {
            return res.status(500).send({
                reason: `Error: Add an article: Category ${categoriaId} does not exist!`
            });
        }
    } catch (error) {
        res.status(500).send({
            reason: 'Error: impossible to add article!'
        });
        next(error);
    }
}

// Permite cambiar la información de un articulo dado
exports.update = async (req, res, next) => {
    try {
        const nuevoCodigo = req.body.codigo;
        const nuevoNombre = req.body.nombre;
        const nuevaDescripcion = req.body.descripcion;
        const nuevaCategoria = req.body.categoriaId;
        const identArticulo = req.body.id;

        let articulo = {};

        if (nuevaCategoria) {
            const categoria = models.Categoria.findByPk(nuevaCategoria);
            if (categoria) {
                articulo = {codigo: nuevoCodigo, nombre: nuevoNombre, descripcion: nuevaDescripcion, categoriaId: nuevaCategoria};
            }
            else {
                return res.status(500).send({
                    reason: `Error: updating an article: Category ${nuevaCategoria} does not exist!`
                });
            }
        }
        else {
            articulo = {codigo: nuevoCodigo, nombre: nuevoNombre, descripcion: nuevaDescripcion};
        }

        const resultado = await models.Articulo.update(articulo, { where: {id: identArticulo}});
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error: impossible modify the article'
        });
        next(error);
    }
}

// Actualizar estado del articulo
exports.activate = async (req, res, next) => {
    try {
        const ident = req.body.id;
        const resultado = await models.Articulo.update({
            estado: 1
        },
        {
            where: { id: ident }
        });
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error activating article'
        });
        next(error);
    }
}

// Actualizar estado del articulo
exports.deactivate = async (req, res, next) => {
    try {
        const ident = req.body.id;
        const resultado = await models.Articulo.update({
            estado: 0
        },
        {
            where: { id: ident }
        });
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error deactivating article'
        });
        next(error);
    }
}