const materia = require('../components/materia/interface')

const routes = function( server ) {
    server.use('/materia', materia)
}

module.exports = routes