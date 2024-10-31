const express = require('express')

const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

    if (!token) {
        return res.status(403).send('Token requerido.');
    }

    jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido.');
        }
        req.usuario = decoded;
        next();
    });
}

routes.post('/', function(req, res) {
    controller.insertar_materia( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

routes.get('/', function(req, res) {
    controller.obtener_materia( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

routes.put('/', function(req, res) {
    controller.actualizar_materia(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.delete('/', function(req, res) {
    controller.eliminar_materia(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

module.exports = routes