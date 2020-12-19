// Aquí vamos a colocar las operaciones del controlador de usuarios
const models = require("../models");

// La librería de encriptación de JavaScript
const bcrypt = require("bcryptjs");

// Los servicios de generación y decodificación de tokens
const tokenService = require("../services/token");

// Esta operación se encarga de permitirle al usuario hacer login
exports.login = async (req, res, next) => {
    try {
        let theEmail = req.body.email;
        let thePasswd = req.body.password;
        // Buscamos el usuario en la BD
        let user = await models.Usuario.findOne({ where: { email: theEmail } });
        if (user) {
            // Usuario existe, vamos a validar la contraseña
            let passwordIsValid = await bcrypt.compare(thePasswd, user.password);
            if (passwordIsValid) {
                let tokenReturn = await tokenService.encode(user.id, user.rol);
                res.status(200).json({ user, tokenReturn, auth: true });
            } else {
                res.status(401).send({ auth: false, tokenReturn: null, reason: "Invalid Password!" });
            }
        } else {
            res.status(404).send({
                reason: "User Not Foud!",
            });
        }
    } catch (error) {
        res.status(500).send({
            reason: "Error happenned",
        });
        next(e);
    }
};

// Obtener la lista de todos los usuarios que hay en la base de datos
exports.list = async (req, res, next) => {
    try {
        const listaUsuarios = await models.Usuario.findAll({
            attributes: ["id", "nombre", "email", "rol", "estado"],
        });
        res.status(200).json(listaUsuarios);
    } catch (error) {
        res.status(500).send({
            reason: "Error getting the list of users!",
        });
        next(error);
    }
};

// Agregar un nuevo usuario. Por ahora cualquiera puede agregar usuarios
exports.add = async (req, res, next) => {
    try {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const rol = req.body.rol;
        const password = req.body.password;
        const estado = req.body.estado || 1;

        const rolesPermitidos = ["Administrador", "Vendedor", "Almacenero"];

        if (!rolesPermitidos.includes(rol)) {
            throw new `The rol ${rol} is not allowed in this application`();
        }

        // Encriptamos la palabra clave
        const claveEncriptada = await bcrypt.hash(password, 8);

        // Guardamos el nuevo usuario en la base de datos
        const resultado = await models.Usuario.create({
            nombre: nombre,
            email: email,
            password: claveEncriptada,
            rol: rol,
            estado: estado,
        });

        // Enviamos la respuesta al cliente
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: "Error adding a new user",
        });
        next(error);
    }
};

// Permite cambiar la información de un usuario. Por ahora, cualquiera puede hacer el cambio de información
exports.update = async (req, res, next) => {
    try {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const rol = req.body.rol;
        const password = req.body.password;

        const ident = req.body.id;

        const rolesPermitidos = ["Administrador", "Vendedor", "Almacenero"];

        if (!rolesPermitidos.includes(rol)) {
            throw new `The rol ${rol} is not allowed in this application`();
        }

        // Encriptamos la palabra clave
        const claveEncriptada = await bcrypt.hash(password, 8);

        // Guardamos el nuevo usuario en la base de datos
        const resultado = await models.Usuario.update(
            {
                nombre: nombre,
                email: email,
                password: claveEncriptada,
                rol: rol,
            },
            {
                where: { id: ident },
            }
        );

        // Enviamos la respuesta al cliente
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: "Error modifying a new user",
        });
        next(error);        
    }
}

// Activa el usuario, cambiando el estado a uno
exports.activate = async (req, res, next) => {
    try {
        const ident = req.body.id;
        const resultado = await models.Usuario.update({
            estado: 1
        },
        {
            where: { id: ident }
        });
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error activating user'
        });
        next(error);
    }
}

// Activa el usuario, cambiando el estado a uno
exports.deactivate = async (req, res, next) => {
    try {
        const ident = req.body.id;
        const resultado = await models.Usuario.update({
            estado: 0
        },
        {
            where: { id: ident }
        });
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({
            reason: 'Error deactivating user'
        });
        next(error);
    }
}
