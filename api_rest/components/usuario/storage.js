const model = require('./model');
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
    let filter = {};
    if (dato.apellido) {
        filter = { apellido: dato.apellido };
    }
    const resultado = await model.find(filter);
    return resultado;
}

async function loguear_usuario(dato) {
    const usuario = await model.findOne({ usuario: dato.usuario });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    // Generar el token
    const token = jwt.sign({ id: usuario._id, usuario: usuario.usuario }, 'secret', { expiresIn: '1h' });
    return { usuario, token };
}

async function actualizar_usuario(dato) {
    const objeto = await model.findById(dato._id);
    if (objeto) {
        objeto.nombre = dato.nombre;
        objeto.apellido = dato.apellido;
        objeto.usuario = dato.usuario;
        objeto.contraseña = dato.contraseña;

        return await objeto.save();
    } else {
        return null;
    }
}

async function eliminar_usuario(dato) {
    return await model.deleteOne({ _id: dato._id });
}

module.exports = {
    insertar: insertar_usuario,
    obtener: obtener_usuario,
    loguear: loguear_usuario, // Agregar método de logueo
    actualizar: actualizar_usuario,
    eliminar: eliminar_usuario,
};
