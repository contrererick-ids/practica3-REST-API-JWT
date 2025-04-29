// Con require('mongoose') se importa el módulo de Mongooose, que es una biblioteca de Node.js para trabajar con MongoDB.
const mongoose = require('mongoose');

// Se define el esquema de datos a partir de un nuevo esquema de Mongoose.
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String }

}, { timestamps: true });

// Se exporta el modelo de datos a partir del esquema definido.
module.exports = mongoose.model('Product', productSchema);