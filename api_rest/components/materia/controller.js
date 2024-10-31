const storage = require('./storage')

function insertar_materia( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.ciclos ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_materia( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

function actualizar_materia(dato) {
    return new Promise((resolve, reject) => {
        let resultado = storage.actualizar(dato);
        if (resultado) {
            return resolve(dato);
        } else {
            reject('No existe usuario para actualizar.');
        }
    });
}

function eliminar_materia(dato) {
    return new Promise((resolve, reject) => {
        storage.eliminar(dato)
            .then(() => resolve(dato))
            .catch(() => reject('Error al eliminar el usuario.'));
    });
}

module.exports = {
    insertar_materia,
    obtener_materia,
    actualizar_materia,
    eliminar_materia
}