// static/js/ver-listado.js

const mostrarDetalleActividad = id => {
    const listadoSection = document.getElementById("listado-section")
    listadoSection.hidden = true

    const detalle = document.getElementById("detalle-actividad-"+id)
    detalle.hidden = false
}

const volverAlListado = () => {
    document.querySelectorAll("[id^='detalle-actividad-']").forEach(det => {
        det.hidden = true
    })
    document.getElementById("listado-section").hidden = false
    document.getElementById("imagen-ampliada-container").style.display = "none"
}

const ampliarImagen = event => {
    const img = event.target
    const cont = document.getElementById("imagen-ampliada-container")
    const ampliada = document.getElementById("imagen-ampliada")

    ampliada.src = img.src
    ampliada.alt = img.alt
    ampliada.style.width = "800px"
    ampliada.style.height = "600px"
    cont.style.display = "flex"
}

const cerrarImagen = () => {
    document.getElementById("imagen-ampliada-container").style.display = "none"
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".fila-actividad").forEach(function(fila) {
        const id = fila.id.split("-")[1]
        fila.addEventListener("click", function() {
            mostrarDetalleActividad(id)
        })
    })

    document.querySelectorAll(".btn-volver-listado").forEach(function(btn) {
        btn.addEventListener("click", volverAlListado)
    })

    document.querySelectorAll(".img-actividad").forEach(function(img) {
        img.addEventListener("click", ampliarImagen)
        img.style.cursor = "pointer"
    })

    document.getElementById("cerrar-imagen")
            .addEventListener("click", cerrarImagen)
    document.getElementById("imagen-ampliada-container")
            .addEventListener("click", function(event) {
        if (event.target === this) {
            cerrarImagen()
        }
    })
})
