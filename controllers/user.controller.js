// Guardamos en 'User' el modelo de usuario
const User = require('../models/user.model');
// Con require('jsonwebtoken') importamos el módulo jsonwebtoken para generar y verificar tokens JWT.
const jwt = require('jsonwebtoken');

// Se define una función 'createUser' que maneja la creación de un nuevo usuario.
exports.createUser = async (request, response) => {
    try {
        // Creamos un nuevo usuario utilizando el modelo 'User' y los datos del cuerpo de la solicitud.
        const user = await User.create(request.body);
        // Respondemos con un código de estado 201 (Created) y el nuevo usuario creado en formato JSON.
        response.status(201).json(user);
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'getUsers' que maneja la obtención de todos los usuarios.
exports.getUsers = async (request, response) => {
    // Utilizamos el método 'find' del modelo 'User' para obtener todos los usuarios.
    const users = await User.find();
    // Respondemos con un código de estado 200 (OK) y la lista de usuarios en formato JSON.
    response.json(users);
};

// Se define una función asincrónica 'getUserById' que maneja la obtención de un usuario por su ID.
exports.getUserById = async (request, response) => {
    try {
        // Utilizamos el método 'findById' del modelo 'User' para buscar un usuario por su ID.
        const user = await User.findById(request.params.id);
        // Si no se encuentra el usuario, respondemos con un código de estado 404 (Not Found) y un mensaje de error.
        if (!user){
            return response.status(404).json({ message: 'User no found.' });
        }
        // Respondemos con un código de estado 200 (OK) y el usuario encontrado en formato JSON.
        response.json(user);
    } catch (err) {
        //  Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'updateUser' que maneja la actualización de un usuario por su ID.
exports.updateUser = async (request, response) => {
    try {
        // Utilizamos el método 'findByIdAndUpdate' del modelo 'User' para buscar y actualizar un usuario por su ID.
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        // Si no se encuentra el usuario, respondemos con un código de estado 404 (Not Found) y un mensaje de error.
        if (!user){
            return response.status(404).json({ message: 'User no found.' });
        }
        // Respondemos con un código de estado 200 (OK) y el usuario actualizado en formato JSON.
        response.json(user);
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 400 (Bad Request) y un mensaje de error.
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'deleteUser' que maneja la eliminación de un usuario por su ID.
exports.deleteUser = async (request, response) => {
    try {
        // Utilizamos el método 'findByIdAndDelete' del modelo 'User' para buscar y eliminar un usuario por su ID.
        const user = await User.findByIdAndDelete(request.params.id);
        // Si no se encuentra el usuario, respondemos con un código de estado 404 (Not Found) y un mensaje de error.
        if (!user){
            return response.status(404).json({ message: 'User no found.' });
        }
        // Respondemos con un código de estado 200 (OK) y un mensaje indicando que el usuario fue eliminado.
        response.json({ message: 'User was deleted' });
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
};

// Se define una función 'loginUser' que maneja el inicio de sesión de un usuario.
exports.loginUser = async (request, response) => {
    // Extraemos el correo electrónico y la contraseña del cuerpo de la solicitud.
    const { email, password } = request.body;
    try {
        // Utilizamos el método 'findOne' del modelo 'User' para buscar un usuario por su correo electrónico.
        const user = await User.findOne({ email });
        // Si no se encuentra el usuario, respondemos con un código de estado 401 (Unauthorized) y un mensaje de error.
        if (!user){
            return response.status(401).json({ error: 'Invalid credentials' });
        }
        // Utilizamos el método 'comparePassword' del modelo 'User' para comparar la contraseña proporcionada con la contraseña almacenada.
        const isMatch = await user.comparePassword(password);
        // Si las credenciales no son válidas, respondemos con un código de estado 401 (Unauthorized) y un mensaje de error.
        if (!isMatch){
            return response.status(401).json({ error: 'Invalid credentials' });
        }
        // Si las credenciales son válidas, generamos un token JWT utilizando el ID del usuario y una clave secreta.
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        // Respondemos con un código de estado 200 (OK) y el token generado en formato JSON.
        response.json({ token });
    } catch (err) {
        // Si ocurre un error, respondemos con un código de estado 500 (Internal Server Error) y un mensaje de error.
        response.status(500).json({ error: 'Server Error' });
    }
};