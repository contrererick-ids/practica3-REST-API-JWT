// Con 'dotenv' se maneja la configuracion de las variables de entorno en el archivo '.env'.
require('dotenv').config();
// Con 'express' se maneja el servidor.
const express = require('express');
// Se realiza una conexión a la base de datos.
const connectDB = require('./config/database.js');
// Con 'swagger' se maneja la documentación de la API.
const setupSwagger = require("./config/swaggerConfig.js");
// Se importan las rutas de los usuarios, productos y ordenes.
const userRoutes = require('./routes/user.routes.js');
const productRoutes = require('./routes/product.routes.js');
const orderRoutes = require('./routes/order.routes.js');
// Con 'cors' se maneja la comunicación entre el servidor y el cliente.
const cors = require('cors');
// La variable 'app' se utiliza para crear el servidor ya que guarda una instancia de express.
const app = express();
// Se utiliza 'cors' para que el servidor pueda recibir peticiones de cualquier origen.
app.use(cors({
    origin: '*',
    credentials: true
}));
// Mandamos a llamar la función de conexión a la base de datos para que se ejecute al iniciar el servidor.
connectDB();
// Al hacer .use(express.json()) se indica que el servidor va a recibir datos en formato JSON.
app.use(express.json());
// Con la función setupSwagger() se configura la documentación de la API con SwaggerUI.
setupSwagger(app);

// Se definen las rutas de los usuarios, productos y ordenes.
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Se define el puerto en el que se va a ejecutar el servidor.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Running server on http://localhost:${PORT}`);
});