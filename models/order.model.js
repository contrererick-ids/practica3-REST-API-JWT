// Con require('mongoose') se importa el módulo de Mongooose, que es una biblioteca de Node.js para trabajar con MongoDB.
const mongoose = require('mongoose');

// Se define el esquema para una Orden de compra a partir de un nuevo esquema de Mongoose.
const OrderSchema = new mongoose.Schema({
    // El campo 'user' es un ObjectId que hace referencia al modelo User.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // El campo 'shippingAddress' es un objeto que contiene información sobre la dirección de envío.
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    // El campo 'items' es un array de objetos que contienen información sobre los productos en la orden.
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        price: Number,
        quantity: Number
    }],
    subtotal: Number,
    tax: Number,
    total: Number,
    // El campo 'createdAt' es una fecha que indica cuándo se creó la orden.
    createdAt: { type: Date, default: Date.now }
});

// Se exporta el modelo de datos a partir del esquema definido.
module.exports = mongoose.model('Order', OrderSchema);