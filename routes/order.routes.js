// Con require('express') se importa el módulo de express, que es una biblioteca de Node.js para crear aplicaciones web.
const express = require('express');
// Con express.Router() se crea un objeto de enrutador de express, que es un objeto que se utiliza para definir las rutas de la aplicación.
const router = express.Router();
// Con require('../controllers/order.controller') se importa el archivo que contiene los controladores de la aplicación.
const orderController = require('../controllers/order.controller.js');

// Se define la ruta para crear una orden.
router.post('/', orderController.createOrder);
// Se define la ruta para obtener todas las ordenes.
router.get('/', orderController.getOrders);
// Se define la ruta para obtener una orden por su id.
router.get('/:id', orderController.getOrderById);

// Se exporta el enrutador.
module.exports = router;