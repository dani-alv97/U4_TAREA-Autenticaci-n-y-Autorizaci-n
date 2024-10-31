let materiaActual = null;

document.addEventListener('DOMContentLoaded', () => {
    const rol = localStorage.getItem('rol');

    // Llamar a la función listar() para cargar las materias
    listar(rol);
});

function listar(rol) {
    fetch('http://localhost:3000/materia')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener las Materias');
            }
            return response.json();
        })
        .then((data) => {
            const materias = data.body;
            const tabla = document.getElementById('tabla-materia').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';

            if (Array.isArray(materias)) {
                materias.forEach((materia) => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td contenteditable="true" id="nombre-${materia._id}">${materia.nombre}</td>
                        <td contenteditable="true" id="ciclos-${materia._id}">${materia.ciclos}</td>
                        <td><button class="btn-eliminar" onclick="eliminar_materia('${materia._id}')">Eliminar</button></td>
                        <td><button class="btn-actualizar" onclick="prepararActualizar('${materia._id}')">Actualizar</button></td>`;
                    tabla.appendChild(fila);
                });

                // Ocultar botones si el rol no es Admin
                if (rol !== 'Admin') {
                    const eliminarButtons = document.querySelectorAll('.btn-eliminar');
                    const actualizarButtons = document.querySelectorAll('.btn-actualizar');

                    eliminarButtons.forEach(btn => btn.style.display = 'none');
                    actualizarButtons.forEach(btn => btn.style.display = 'none');
                }
            } else {
                console.error('La respuesta no es un array:', materias);
            }
        })
        .catch((error) => {
            console.error(`[error]: ${error}`);
        });
}

function guardar() {
    let nombre_ = document.getElementById('nombre').value;
    let ciclos_ = document.getElementById('ciclos').value;

    let data = { nombre: nombre_, ciclos: ciclos_ };

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:3000/materia', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    });
}

function eliminar_materia(id) {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        };

        fetch('http://localhost:3000/materia', request_options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el materia');
                }
                alert('Registro eliminado exitosamente.');
                listar(localStorage.getItem('rol')); // Volver a listar materias
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(`[error]: ${error}`));
    });
}

function guardar_materia() {
    if (materiaActual) {
        const nombre = document.getElementById('nombre').value;
        const ciclos = document.getElementById('ciclos').value;

        actualizar_materia({ ...materiaActual, nombre, ciclos });
    } else {
        guardar()
            .then((response) => {
                alert('Registro exitoso.');
                listar(localStorage.getItem('rol'));
            })
            .catch((error) => {
                alert('Error al ingresar.');
            });
    }
}

function actualizar_materia(data) {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:3000/materia', request_options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el materia');
                }
                alert('Registro actualizado exitosamente.');
                materiaActual = null; 
                listar(localStorage.getItem('rol')); 
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(`[error]: ${error}`));
    });
}

function mostrarFormularioActualizar(nombre, ciclos) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('ciclos').value = ciclos;

    materiaActual = { nombre, ciclos }; 
}

function prepararActualizar(id) {
    const nombre = document.getElementById(`nombre-${id}`).innerText.trim();
    const ciclos = document.getElementById(`ciclos-${id}`).innerText.trim();

    actualizar_materia({ _id: id, nombre, ciclos });
}
