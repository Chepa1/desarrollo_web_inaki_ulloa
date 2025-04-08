const validateRegion = (region) => {
    if (!region) return false;
    return true;
}

const validateComuna = (comuna) => {
    if (!comuna) return false;
    return true;
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
        let urlContacto = document.getElementById("url-contacto");
        if (urlContacto.value != "") {
            let validLength = 4 <= urlContacto.value.trim().length && urlContacto.value.trim().length <= 50;
            return validLength;
        }
        return true;
    }
    return false;
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
    return true;
};

const validateFotos = (foto) => {
    if (!foto) return false;
};

const validateForm = () => {
    let myForm = document.forms["form-donde"];
    let email = myForm["email"].value;
    let phoneNumber = myForm["phone"].value;
    let name = myForm["nombre"].value;
    let region = myForm["select-region"].value;
    let comuna = myForm["select-comuna"].value;
    let formaContacto = myForm["select-forma-contacto"].value;
    let fechaIni = myForm["tiempo-inicio"].value;
    let fechaTer = myForm["tiempo-termino"].value;
    let tema = myForm["select-tema"].value;

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    // lógica de validación
    if (!validateRegion(region)) {
        setInvalidInput("Región");
    }
    if (!validateComuna(comuna)) {
        setInvalidInput("Comuna");
    }
    if (!validateName(name)) {
        setInvalidInput("Nombre");
    }
    if (!validateEmail(email)) {
        setInvalidInput("Email");
    }
    if (!validateTel(phoneNumber)) {
        setInvalidInput("Número");
    }
    if (!validateFormaContacto(formaContacto)) {
        setInvalidInput("Forma de contacto");
    }
    if (!validateFechaIni(fechaIni)) {
        setInvalidInput("Fecha de inicio");
    }
    if (!validateFechaTer(fechaTer, fechaIni)) {
        setInvalidInput("Fecha de Ter");
    }
    if (!validateTema(tema)) {
        setInvalidInput("Tema");
    }

    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
    let confirmationBox = document.getElementById("confirmation-box");

    if (!isValid) {
        validationListElem.textContent = "";
        
        for (input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        // establecer val-msg
        validationMessageElem.innerText = "Los siguientes campos son inválidos:";

        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    }
    else {
        let formDiv = document.getElementById("form-add");
        validationBox.hidden = true;
        formDiv.style.display = "none";
        confirmationBox.style.display = "block";
    }
}

document.getElementById("send-act-btn").addEventListener("click", validateForm);