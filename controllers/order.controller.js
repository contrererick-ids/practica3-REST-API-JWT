// Guardamos en 'Order' el modelo de datos de ordenes.
const Order = require('../models/order.model');
// Guardamos en 'Product' el modelo de datos de productos.
const Product = require('../models/product.model');
// Guardamos en 'User' el modelo de datos de usuarios.
const User = require('../models/user.model');

// Se define la función 'createOrder' que crea una nueva orden.
exports.createOrder = async (request, response) => {
    try {
        // Se obtienen los datos de la orden del 'request'.
        const { userId, shippingAddress, items } = request.body;
        // Se verifica si el usuario existe en la base de datos.
        const user = await User.findById(userId);
        // Si el usuario no existe, se devuelve un mensaje de error.
        if (!user){
            return response.status(404).json({ message: 'user no found' });
        }
        // Se define la variable 'subtotal' que guarda el subtotal de la orden (inicialmente en cero).
        let subtotal = 0;
        // Se define la variable 'orderItems' que guarda los productos de la orden.
        const orderItems = await Promise.all(items.map(async item => {
            // Se obtiene el producto de la base de datos.
            const product = await Product.findById(item.id);
            // Si el producto no existe, se devuelve un mensaje de error.
            if (!product){
                throw new Error(`Product ID ${item.product} no found in DB`);
            }
            // Se calcula el precio total del producto.
            const totalPrice = product.price * item.quantity;
            // Se suma el precio total del producto al subtotal de la orden.
            subtotal += totalPrice;
            // Se devuelve el producto con el precio total.
            return {
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            };
        }));

        // Se calculan los valores de impuestos y total.
        const tax = subtotal * 0.16;
        const total = subtotal + tax;

        // Se crea la orden.
        const order = new Order({
            user: user._id,
            shippingAddress,
            items: orderItems,
            subtotal,
            tax,
            total
        });

        // Se guarda la orden en la base de datos.
        await order.save();
        // Se la orden se guarda, respondemos con un código 200 (OK) y la orden creada.
        response.status(201).json(order);
    } catch (error) {
        // Si ocurre un error, respondemos con un código de estado 500 (Bad Request) y un mensaje de error.
        response.status(500).json({ message: error.message });
    }
};

// Se define la función 'getOrders' que obtiene todas las ordenes.
exports.getOrders = async (request, response) => {
    try {
        // Se obtienen todas las ordenes de la base de datos.
        const orders = await Order.find().populate('user', 'name email').populate('items.product', 'description price');
        // Se devuelven las ordenes y un código de estado 200 (OK).
        response.status(200).json(orders);
    } catch (error) {
        // Si ocurre un error, respondemos con un código de estado 500 (Bad Request) y un mensaje de error.
        response.status(500).json({ message: error.message });
    }
};

// Se crea la función getOrderById que obtiene una orden por su id
exports.getOrderById = async (request, response) => {
    try {
        // Se obtiene la orden por su id
        const order = await Order.findById(request.params.id).populate('user', 'name email').populate('items.product', 'description price');
        // Si no se encuentra la orden, respondemos con un código de estado 404 (Not Found) y un mensaje.
        if (!order){
            return response.status(404).json({ message: 'Order no found.' });
        }
        // Si se encuentra la orden, respondemos con un código de estado 200 (OK) y la orden.
        response.status(200).json(order);
    } catch (error) {
        // Si ocurre un error, respondemos con un código de estado 500 (Bad Request) y un mensaje de error.
        response.status(500).json({ message: error.message });
    }
};