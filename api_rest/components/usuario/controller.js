const storage = require('./storage')

function insertar_usuario(dato) {
    return new Promise((resolve, reject) => {
        if (!dato.nombre || !dato.apellido || !dato.rol || !dato.usuario || !dato.contraseña) {
            reject('Los datos se encuentran incompletos.');
        } else {
            resolve(storage.insertar(dato));
        }
    });
}

function obtener_usuario(dato) {
    return new Promise((resolve, reject) => {
        if (!dato) {
            reject('No existen datos');
        } else {
            resolve(storage.obtener(dato));
        }
    });
}

function loguear_usuario(dato) {
    return new Promise((resolve, reject) => {
        if (!dato.usuario || !dato.contraseña) {
            reject('Los datos de login son incompletos.');
        } else {
            resolve(storage.loguear(dato));
        }
    });
}

function actualizar_usuario(dato) {
    return new Promise((resolve, reject) => {
        let resultado = storage.actualizar(dato);
        if (resultado) {
            return resolve(dato);
        } else {
            reject('No existe usuario para actualizar.');
        }
    });
}

function eliminar_usuario(dato) {
    return new Promise((resolve, reject) => {
        storage.eliminar(dato)
            .then(() => resolve(dato))
            .catch(() => reject('Error al eliminar el usuario.'));
    });
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    loguear_usuario, // Agregar el método logueo
    actualizar_usuario,
    eliminar_usuario,
};
