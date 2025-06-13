document.addEventListener('DOMContentLoaded', function() {
    //carga comentarios en detalles
    document.getElementById('actividades-tabla')
        .addEventListener('click', function(e) {
        var fila = e.target.closest('tr.fila-actividad');
        if (!fila) return;
        var idx = fila.id.split('-')[1];
        var detalle = document.getElementById('detalle-actividad-' + idx);
        if (!detalle) return;
        document.getElementById('listado-section').hidden = true;
        detalle.hidden = false;
        cargarComentarios(detalle.dataset.actividadId, detalle);
    });

    //botón volver al listado
    document.querySelectorAll('.btn-volver-listado')
        .forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[id^="detalle-actividad-"]')
                .forEach(function(div) { div.hidden = true; });
            document.getElementById('listado-section').hidden = false;
        });
    });
});

function cargarComentarios(actividadId, detalle) {
    var lista = detalle.querySelector('#comentarios-list');
    lista.innerHTML = '';
    fetch('/api/actividades/' + actividadId + '/comentarios')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            data.forEach(function(c) {
                var li = document.createElement('li');
                li.textContent = c.fecha + ' - ' + c.nombre + ': ' + c.texto;
                lista.appendChild(li);
            });
        });

    var submitBtn = detalle.querySelector('#comentario-submit');
    submitBtn.onclick = function() {
        var nombreInput = detalle.querySelector('#comentario-nombre');
        var textoInput = detalle.querySelector('#comentario-texto');
        var erroresDiv = detalle.querySelector('#comentario-error');
        var erroresList = detalle.querySelector('#comentario-error-list');
        erroresList.innerHTML = '';
        var errores = {};
        if (nombreInput.value.trim().length < 3) {
            errores['nombre'] = 'Nombre debe tener al menos 3 caracteres.';
        }
        if (textoInput.value.trim().length < 5) {
            errores['texto'] = 'Comentario debe tener al menos 5 caracteres.';
        }
        if (Object.keys(errores).length) {
            erroresDiv.hidden = false;
            Object.keys(errores).forEach(function(key) {
                var li = document.createElement('li');
                li.textContent = errores[key];
                erroresList.appendChild(li);
            });
            return;
        } else {
            erroresDiv.hidden = true;
        }

        fetch('/api/actividades/' + actividadId + '/comentarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombreInput.value.trim(),
                texto: textoInput.value.trim()
            })
        }).then(function(res) {
            if (res.ok) {
                nombreInput.value = '';
                textoInput.value = '';
                cargarComentarios(actividadId, detalle);
            } else {
                res.json().then(function(data) {
                    erroresDiv.hidden = false;
                    erroresList.innerHTML = '';
                    Object.values(data.errores).forEach(function(msg) {
                        var li = document.createElement('li');
                        li.textContent = msg;
                        erroresList.appendChild(li);
                    });
                });
            }
        });
    };
}