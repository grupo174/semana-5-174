const jwt = require("jsonwebtoken")
const { config } = require("../config");
const models = require("../models")

async function encode(id, rol) {
    console.log("Clave: " + config.secretKey);
    const token = jwt.sign({id: id, rol: rol}, config.secretKey,{expiresIn: "1d"});
    console.log("token " + token);

    try {
        const { rol } = await jwt.verify(token, config.secretKey);
        console.log("Decodificado: " + rol);
    } catch (error) {
        console.error("Error = " + error);
    }

    const usr = await models.Usuario.findByPk(id)
    console.log(usr)
}

encode(2, "Administrador");

console.log("Bien!")