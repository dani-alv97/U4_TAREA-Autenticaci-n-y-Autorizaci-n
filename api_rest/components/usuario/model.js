const mongoose = require('mongoose')
const schema = mongoose.Schema

const req_string = {
    type: String,
    required: true
}

const usuario_schema = new schema({
    nombre: req_string,
    apellido: req_string,
    rol: req_string,
    usuario: req_string,
    contraseña: req_string,
    fecha_registro: Date,
    fecha_actualizacion: Date,
}, {
    timestamps: { createdAt: 'fecha_registro', updatedAt: 'fecha_actualizacion' }
})

const model = mongoose.model('Usuario', usuario_schema)
module.exports = model