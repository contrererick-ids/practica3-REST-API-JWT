// Guardamos en 'Product' el modelo de datos de producto.
const Product = require('../models/product.model');

// Se define una función 'createProduct' que maneja la creación de un nuevo producto.
exports.createProduct = async (request, response) => {
    try {
        // Creamos un nuevo producto utilizando el modelo 'Product' y los datos del cuerpo de la solicitud.
        const product = await Product.create(request.body);
        // Respondemos con un código de estado 201 (Created) y el nuevo producto creado en formato JSON.
        response.status(201).json(product);
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'getProducts' que maneja la obtención de todos los productos.
exports.getProducts = async (request, response) => {
    // Utilizamos el método 'find' del modelo 'Product' para obtener todos los productos.
    const products = await Product.find();
    // Respondemos con un código de estado 200 (OK) y la lista de productos en formato JSON.
    response.json(products);
};

// Se define una función 'getProductById' que maneja la obtención de un producto por su ID.
exports.getProductById = async (request, response) => {
    try {
        // Buscamos el producto por su ID utilizando el método 'findById' del modelo 'Product'.
        const product = await Product.findById(request.params.id);
        // Si el producto no se encuentra, respondemos con un código de estado 404 (Not Found) y un mensaje.
        if (!product){
            return response.status(404).json({ message: 'product no found.' });
        }
        // Si el producto se encuentra, respondemos con un código de estado 200 (OK) y el producto en formato JSON.
        response.json(product);
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'updateProduct' que maneja la actualización de un producto por su ID.
exports.updateProduct = async (request, response) => {
    try {
        // Buscamos el producto por su ID utilizando el método 'findByIdAndUpdate' del modelo 'Product'.
        const product = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true });
        // Si el producto no se encuentra, respondemos con un código de estado 404 (Not Found) y un mensaje.
        if (!product){
            return response.status(404).json({ message: 'product no found.' });
        }
        // Si el producto se encuentra, respondemos con un código de estado 200 (OK) y el producto actualizado en formato JSON.
        response.json(product);
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'deleteProduct' que maneja la eliminación de un producto por su ID.
exports.deleteProduct = async (request, response) => {
    try {
        // Buscamos el producto por su ID utilizando el método 'findByIdAndDelete' del modelo 'Product'.
        const product = await Product.findByIdAndDelete(request.params.id);
        // Si el producto no se encuentra, respondemos con un código de estado 404 (Not Found) y un mensaje.
        if (!product){
            return res.status(404).json({ message: 'Product  no found.' });
        }
        // Si el producto se encuentra, respondemos con un código de estado 200 (OK) y un mensaje indicando que el producto fue eliminado.
        response.json({ message: 'Product  was deleted' });
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};