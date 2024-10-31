const model = require('./materia')

async function insertar_materia(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_materia(dato) {
     let filter = {}

     if (dato.nombre) {
        filter = { nombre: dato.nombre }
     }
     
     const resultado = await model.find( filter )
     return resultado
}

async function actualizar_materia(dato) {
    const objeto = await model.findById(dato._id);

    if (objeto) {
        objeto.nombre = dato.nombre;
        objeto.ciclos = dato.ciclos;
        return await objeto.save();
    } else {
        return null;
    }
}

async function eliminar_materia(dato) {
    return await model.deleteOne({ _id: dato._id });
}

module.exports = {
    insertar:insertar_materia,
    obtener:obtener_materia,
    actualizar:actualizar_materia,
    eliminar:eliminar_materia
}