// Con require('mongoose') se importa el módulo de Mongooose, que es una biblioteca de Node.js para trabajar con MongoDB.
const mongoose = require('mongoose');
// Con require('bcryptjs') se importa el módulo de bcryptjs, que es una biblioteca de Node.js para el cifrado de contraseñas.
const bcrypt = require('bcryptjs');

// Declaramos el esquema de usuario creando un nuevo objeto de esquema de Mongoose.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 18, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Con el método pre('save') se ejecuta una función antes de que se guarde un documento en la base de datos.
userSchema.pre('save', async function (next) {
    // Si el campo password no ha sido modificado, se pasa al siguiente middleware.
    if (!this.isModified('password')) return next();
    // Se genera un salt aleatorio con 20 rondas de encriptación.
    const salt = await bcrypt.genSalt(20);
    // Se cifra la contraseña con el salt generado.
    this.password = await bcrypt.hash(this.password, salt);
    // Se pasa al siguiente middleware.
    next();
});

// Con el método comparePassword() se compara una contraseña en texto plano con la contraseña cifrada almacenada en la base de datos.
userSchema.methods.comparePassword = function (password) {
    // Se utiliza el método compare() de bcryptjs para comparar las contraseñas.
    return bcrypt.compare(password, this.password);
};

// Con el método set('toJSON') se establece una función que se ejecuta antes de que se convierta un documento en JSON.
userSchema.set('toJSON', {
    // Se transforma el documento en un objeto JSON.
    transform: function (doc, ret) {
        // Se elimina el campo password del objeto JSON devuelto.
        delete ret.password;
        // Se devuelve el objeto JSON modificado.
        return ret;
    }
});

// Se exporta el modelo de usuario.
module.exports = mongoose.model('User', userSchema);