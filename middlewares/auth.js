//Middleware de autenticacion;
const tokenService = require("../services/token");

module.exports = {
    verifyUsuario: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                reason: "No token",
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == "Administrador" || response.rol == "Vendedor" || response.rol == "Almacenero") {
            next();
        } else {
            return res.status(403).send({
                reason: "Not authorized",
            });
        }
    },
    verificarUsuarioAdministrador: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                reason: "No token",
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == "Administrador") {
            next();
        } else {
            return res.status(403).send({
                reason: "This module is only for admins! You are not authorized",
            });
        }
    }
};
