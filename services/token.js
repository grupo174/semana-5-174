const jwt = require('jsonwebtoken');
const models = require('../models');
const { config } = require('../config');

// Chequea si es un token de usuario autenticado sigue siendo válido , si el
// token expiró la función genera uno nuevo
async function checkToken(token) {
    let localId = null;
    try {
        const { id } = jwt.decode(token);
        localId = id;
    } catch (error) {
        return false;
    }

    const usr = await models.Usuario.findByPk(localId);
    if (usr) {
        const newToken = jwt.sign({ id: localId, rol: usr.rol},
            config.secretKey,
            {expiresIn: '1d'});
        return { token: newToken, rol: usr.rol };
    } else {
        return false;
    }
}

module.exports = {

    //generar el token
    encode: async(id, rol) => {
        const token = jwt.sign({id: id, rol: rol}, config.secretKey, { expiresIn: '1d'});
        return token;
    },

    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token, config.secretKey);
            const user = await models.Usuario.findByPk(id);
            if (user) {
                return user;
            } else {
                return false;
            }

        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}