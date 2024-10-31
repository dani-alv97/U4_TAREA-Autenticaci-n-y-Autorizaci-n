const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const jwt = require('jsonwebtoken');

const routes = express.Router();

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
        req.usuario = decoded; // Puedes usar la info del token en el request
        next();
    });
}

// Rutas protegidas por el middleware
routes.post('/', function(req, res) {
    controller.insertar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.get('/', function(req, res) {
    controller.obtener_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.put('/', function(req, res) {
    controller.actualizar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.delete('/', function(req, res) {
    controller.eliminar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

// Login no necesita autenticación
routes.post('/login',function(req, res) {
    controller.loguear_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

module.exports = routes;
