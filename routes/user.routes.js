// Con require('express') se importa el módulo 'express' que es una biblioteca de aplicaciones web para Node.js.
const express = require('express');
// Se crea una instancia del enrutador de Express.
const router = express.Router();
// Se importa el controlador de usuarios.
const userController = require('../controllers/user.controller');
// Se importa el middleware de autenticación.
const authMiddleware = require('../middleware/auth');

// Se generan las rutas para el controlador de usuarios y sus operaciones CRUD.
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', authMiddleware, userController.getUsers);

// Se generan las rutas para el controlador de usuarios por ID.
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

// Se exporta el enrutador.
module.exports = router;