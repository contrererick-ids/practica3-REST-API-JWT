// Guardamos en 'jwt' el módulo 'jsonwebtoken' que es una biblioteca de Node.js para crear y verificar tokens JWT.
const jwt = require('jsonwebtoken');

// Se define una función que recibe una petición, una respuesta y un siguiente middleware.
module.exports = (request, response, next) => {
    // Se obtiene el token de la petición.
    const token = request.header('Authorization')?.split(' ')[1];
    // Si no hay token, se devuelve un error.
    if (!token){
        // Si no hay token, respondemos con un código de estado 401 y un mensaje de error.
        return response.status(401).json({ error: 'Access denied' });
    }
    try {
        // Si hay token, se verifica con el secreto.
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Si el token es válido, se guarda en la petición.
        request.user = verified;
        // Aquí el 'next()' es para que siga con el siguiente middleware.
        next();
    } catch (err) {
        // Si el token no es válido, se devuelve un error y respondemos con un código de estado 400 y un mensaje de error.
        response.status(400).json({ error: 'Invalid Token' });
    }
};