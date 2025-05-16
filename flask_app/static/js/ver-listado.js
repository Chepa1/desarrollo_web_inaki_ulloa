const mostrarDetalleActividad = (id) => {
    //ocultar el listado
    let listadoSection = document.getElementById("listado-section");
    listadoSection.hidden = true;
    
    //mostrar el div de detalle correspondiente
    let detalleActividad = document.getElementById(`detalle-actividad-${id}`);
    detalleActividad.hidden = false;
};

const volverAlListado = () => {
    //ocultar detalles
    let detallesActividades = document.querySelectorAll("[id^='detalle-actividad-']");
    detallesActividades.forEach(detalle => {
        detalle.hidden = true;
    });
    
    //mostrar listado
    let listadoSection = document.getElementById("listado-section");
    listadoSection.hidden = false;
    
    //ocultar imagen ampliada si está visible
    let imagenAmpliada = document.getElementById("imagen-ampliada-container");
    imagenAmpliada.style.display = "none";
};

const ampliarImagen = (event) => {
    let img = event.target;
    let imagenAmpliada = document.getElementById("imagen-ampliada");
    let contenedor = document.getElementById("imagen-ampliada-container");
    
    //ruta de la imagen y su descripción
    imagenAmpliada.src = img.src;
    imagenAmpliada.alt = img.alt;
    
    imagenAmpliada.style.width = "800px";
    imagenAmpliada.style.height = "600px";
    
    contenedor.style.display = "flex";
};

const cerrarImagen = () => {
    document.getElementById("imagen-ampliada-container").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
    //eventos para las filas de la tabla
    for (let i = 1; i <= 5; i++) {
        let fila = document.getElementById(`fila-${i}`);
        fila.addEventListener("click", () => mostrarDetalleActividad(i));
    }
    
    //eventos para botones de volver al listado
    let botonesVolver = document.querySelectorAll(".btn-volver-listado");
    botonesVolver.forEach(boton => {
        boton.addEventListener("click", volverAlListado);
    });
    
    //eventos para ampliar imágenes
    let imagenesActividades = document.querySelectorAll(".img-actividad");
    imagenesActividades.forEach(img => {
        img.addEventListener("click", ampliarImagen);
        img.style.cursor = "pointer";
    });
    
    //botón para cerrar la imagen ampliada
    document.getElementById("cerrar-imagen").addEventListener("click", cerrarImagen);
    
    //también cerrar la imagen ampliada al hacer click afuera
    document.getElementById("imagen-ampliada-container").addEventListener("click", (event) => {
        if (event.target === document.getElementById("imagen-ampliada-container")) {
            cerrarImagen();
        }
    });
});