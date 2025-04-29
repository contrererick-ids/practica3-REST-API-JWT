// Con require('express') se importa el módulo 'express' que es una biblioteca de aplicaciones web para Node.js.
const express = require('express');
// Se crea una instancia del enrutador de Express.
const router = express.Router();
// Se importa el controlador de productos.
const productController = require('../controllers/product.controller');
// Se importa el middleware de autenticación.
const authMiddleware = require('../middleware/auth');

//Se generan las rutas para el controlador de productos y sus operaciones CRUD.
router.get('/', authMiddleware, productController.getProducts);
router.get('/:id', authMiddleware, productController.getProductById);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

// Se exporta el enrutador.
module.exports = router;