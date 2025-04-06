// Agregar múltiples fotos

const unhideFile2 = () => {
    let foto = document.getElementById("hidden-foto1");
    let prevBtn = document.getElementById("agregar-foto1");
    let foto1 = document.getElementById("foto1");
    foto1.style.width = "100%";
    prevBtn.style.display = "none";
    foto.style.display = "block";
};

const unhideFile3 = () => {
    let foto = document.getElementById("hidden-foto2");
    let prevBtn = document.getElementById("agregar-foto2");
    let foto1 = document.getElementById("foto2");
    foto1.style.width = "100%";
    prevBtn.style.display = "none";
    foto.style.display = "block";
};

const unhideFile4 = () => {
    let foto = document.getElementById("hidden-foto3");
    let prevBtn = document.getElementById("agregar-foto3");
    let foto1 = document.getElementById("foto3");
    foto1.style.width = "100%";
    prevBtn.style.display = "none";
    foto.style.display = "block";
};

const unhideFile5 = () => {
    let foto = document.getElementById("hidden-foto4");
    let prevBtn = document.getElementById("agregar-foto4");
    let foto1 = document.getElementById("foto4");
    foto1.style.width = "100%";
    prevBtn.style.display = "none";
    foto.style.display = "block";
};

document.getElementById("agregar-foto1").addEventListener("click",unhideFile2);
document.getElementById("agregar-foto2").addEventListener("click", unhideFile3);
document.getElementById("agregar-foto3").addEventListener("click", unhideFile4);
document.getElementById("agregar-foto4").addEventListener("click", unhideFile5);