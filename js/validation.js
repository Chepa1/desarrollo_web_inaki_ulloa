const validateRegion = (region) => {
    if (!region) return false;
}

const validateComuna = (comuna) => {
    if (!comuna) return false;
}

const validateName = (name) => {
    if (!name) return false;
    let lengthValid = name.trim().length <= 200;

    return lengthValid;
};

const validateEmail = (email) => {
    if (!email) return false;
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);
    let lengthValid = email.trim().length <= 100;

    return formatValid && lengthValid;
};

// tel es opcional, pero hay que validar el formato del input ingresado
const validateTel = (tel) => {
    if (tel != "") {
        let re = /^\+\d{11}$/;
        return re.test(tel);
    }
    return true;
};

const validateFormaContacto = (forma) => {
    if (forma != "") {
        let validLength = 4 <= forma.trim().length && forma.trim().length <= 50;
        return validLength;
    }
    return true;
};

const validateFechaIni = (fecha) => {
    if (!fecha) return false;
    let re = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    return re.test(fecha);
};

const validateFechaTer = (fechaTer, fechaIni) => {
    if (fechaTer != "") {
        let re = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        let formatValid = re.test(fechaTer);

        let timeValid = false;
        if (formatValid && fechaIni) {
            let dateIni = new Date(fechaIni);
            let dateTer = new Date(fechaTer);
            timeValid = dateTer > dateIni;
        }

        return formatValid && timeValid;
    }
    return true;
};

const validateTema = (tema) => {
    if (!tema) return false;
    else if (tema == "Otro") {
        let otroTema = document.getElementById("otro-tema");

        if (!otroTema.value) return false;
        let lengthValid = 3 <= otroTema.value.trim().length && otroTema.value.trim().length <= 15;

        return lengthValid;
    }
};

const validateFotos = (foto) => {
    if (!foto) return false;
};

const validateForm = () => {
    let myForm = document.getElementById("form-add");

    let isValid = true;

    let confirmationBox = document.getElementById("confirmation-box");

    if (!isValid) {
    }
    else {
        myForm.style.display = "none";
        confirmationBox.style.display = "block";
    }
}

document.getElementById("send-act-btn").addEventListener("click", validateForm);