
const config = { 
    // El modo de trabajo de la aplicación
	env: process.env.NODE_ENV,
	// de igual forma llamamos al puerto
    port: process.env.PORT || 3000,
    secretKey: "Grupo174EsElMejor"
};

//exportamos el objeto config
module.exports = { config };
