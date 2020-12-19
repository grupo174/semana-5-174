// Aquí vamos a colocar las operaciones del controlador de usuarios
const models = require('../models');

// La librería de encriptación de JavaScript
const bcrypt = require('bcryptjs');

// Los servicios de generación y decodificación de tokens
const tokenService = require('../services/token');

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
                res.status(200).json({user, tokenReturn, auth: true});
            } else {
                res.status(401).send({auth: false, tokenReturn: null, reason: "Invalid Password!"});
            }
        } else {
            res.status(404).send({
                reason: 'User Not Foud!'
            });
        }

    } catch (error) {
        res.status(500).send({
            reason: 'Error happenned'
        });
        next(e);
    }
}