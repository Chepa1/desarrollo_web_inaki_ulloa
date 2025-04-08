const showCongrats = () => {
    let congrats = document.getElementById("congrats-box");
    let confirmationBox = document.getElementById("confirmation-box");

    confirmationBox.hidden = true;
    congrats.hidden = false;
}

const backToForm = () => {
    let form = document.getElementById("form-add");
    let confirmationBox = document.getElementById("confirmation-box");

    confirmationBox.hidden = true;
    form.style.display = "block";
}

document.getElementById("sure-btn").addEventListener("click", showCongrats);
document.getElementById("notsure-btn").addEventListener("click", backToForm);