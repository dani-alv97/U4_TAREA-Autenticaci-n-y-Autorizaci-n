const usuario = require('../components/usuario/interface')
const materia = require('../components/materia/interface')

const routes = function( server ) {
    server.use('/usuario', usuario)
    server.use('/materia', materia)
}

module.exports = routes