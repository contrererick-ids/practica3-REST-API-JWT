// Con require('mongoose') se importa el módulo de Mongooose, que es una biblioteca de Node.js para trabajar con MongoDB.
const mongoose = require('mongoose');

// Se crea una función 'connectDB' que se exporta para conectar a la base de datos de MongoDB.
async function connectDB() {
    try {
        // Se utiliza el método 'connect' de Mongoose para conectar a la base de datos proporcionada por la variable de entorno 'MONGO_URI'.
        await mongoose.connect(process.env.MONGO_URI);
        console.log(' MongoDB connection success');
    } catch (err) {
        console.error(' Error in DB connection:', err);
        process.exit(1);
    }
};

// Se exporta la función 'connectDB' para que pueda ser utilizada en otros archivos.
module.exports = connectDB;