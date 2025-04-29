// Con require('swagger-ui-express') se importa el módulo de swagger-ui-express, que es una biblioteca de Node.js para generar
// una interfaz de usuario interactiva para la documentación de la API.
const swaggerUi = require("swagger-ui-express");
// Con require('../swagger.json') se importa el archivo JSON que contiene la documentación de la API.
const swaggerDocument = require("../swagger.json");
// Se define una función 'setupSwagger' que toma un objeto 'app' como parámetro.
const setupSwagger = (app) => {
    // Se utiliza el método 'use' de la aplicación para configurar el middleware de Swagger UI.
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

// Se exporta la función 'setupSwagger' para que pueda ser utilizada en otros archivos.
module.exports = setupSwagger;