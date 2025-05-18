const rrss = ["WhatsApp","Telegram","X","Instagram","TikTok","Facebook"];
const tema = ["Música","Deporte","Ciencias","Religión","Política","Tecnología","Juegos","Baile","Comida","Otro"];


const poblarRRSS = () => {
    let formaContactoSelect = document.getElementById("select-forma-contacto");
    for (const red of rrss) {
        let option = document.createElement("option");
        option.value = red;
        option.text = red;
        formaContactoSelect.appendChild(option);
    }
};

const poblarTema = () => {
    let temaSelect = document.getElementById("select-tema");
    for (const theme of tema) {
        let option = document.createElement("option");
        option.value = theme;
        option.text = theme;
        temaSelect.appendChild(option);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const regionSelect = document.getElementById("select-region")
    const comunaSelect = document.getElementById("select-comuna")

    fetch("/api/regions")
    .then(response=>response.json())
    .then(data=>{
        data.forEach(function(reg){
            const option = document.createElement("option")
            option.value   = reg.id
            option.textContent = reg.nombre
            regionSelect.appendChild(option)
        })
    })

    regionSelect.addEventListener("change", function() {
        const regionId = this.value
        comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>'
        if (!regionId) {
            return
        }
        fetch("/api/comunas?region_id="+regionId)
        .then(response=>response.json())
        .then(data=>{
            data.forEach(function(com){
                const option = document.createElement("option")
                option.value   = com.id
                option.textContent = com.nombre
                comunaSelect.appendChild(option)
            })
        })
    })
});

const mostrarUrlContacto = () => {
    let urlBox = document.getElementById("url-contacto");
    let formaContactoSelect = document.getElementById("select-forma-contacto");
    if (formaContactoSelect.value == "") {
        urlBox.hidden = true;
    }
    else {
        urlBox.hidden = false;
    }
};

const checkOtro = () => {
    let temaSelect = document.getElementById("select-tema");
    let otroBox = document.getElementById("otro-tema");
    if (temaSelect.value == "Otro") {
        otroBox.hidden = false;
    }
    else {
        otroBox.hidden = true;
    }
};

const setDefaultDates = () => {
    let fechaActual = new Date()

    let anno = fechaActual.getFullYear()
    let mes = String(fechaActual.getMonth() + 1).padStart(2, "0")
    let dia = String(fechaActual.getDate()).padStart(2, "0")
    let hora = String(fechaActual.getHours()).padStart(2, "0")
    let min = String(fechaActual.getMinutes()).padStart(2, "0")

    let fechaFormateada = `${anno}-${mes}-${dia}T${hora}:${min}`

    let tiempoInicio = document.getElementById("tiempo-inicio")
    tiempoInicio.value = fechaFormateada

    let fechaTer = new Date(fechaActual)
    fechaTer.setHours(fechaActual.getHours() + 3)

    let annoFin = fechaTer.getFullYear()
    let mesFin = String(fechaTer.getMonth() + 1).padStart(2, "0")
    let diaFin = String(fechaTer.getDate()).padStart(2, "0")
    let horaFin = String(fechaTer.getHours()).padStart(2, "0")
    let minFin = String(fechaTer.getMinutes()).padStart(2, "0")

    let fechaTerFormateada = `${annoFin}-${mesFin}-${diaFin}T${horaFin}:${minFin}`

    let tiempoTermino = document.getElementById("tiempo-termino")
    tiempoTermino.value = fechaTerFormateada
}

document.getElementById("select-forma-contacto").addEventListener("change", mostrarUrlContacto);
document.getElementById("select-tema").addEventListener("change", checkOtro);

window.onload = () => {
    poblarRRSS();
    poblarTema();
    setDefaultDates();
};