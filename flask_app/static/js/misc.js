document.addEventListener("DOMContentLoaded", function() {
    const form = document.forms["form-donde"]
    const addBtn = document.getElementById("send-act-btn")
    const confirmBox = document.getElementById("confirmation-box")
    const formBox = document.getElementById("form-add")
    const congratsBox = document.getElementById("congrats-box")
    const sureBtn = document.getElementById("sure-btn")
    const notSureBtn = document.getElementById("notsure-btn")

    

    notSureBtn.addEventListener("click", function() {
        confirmBox.hidden = true
        formBox.style.display = "";
        formBox.hidden = false
    })

    sureBtn.addEventListener("click", function() {
        const datos = new FormData(form)
        fetch(form.action, {
            method: "POST",
            body: datos
        })
        .then(response=> {
            if (!response.ok) {
                throw new Error("Error al guardar la actividad")
            }
            confirmBox.hidden = true
            congratsBox.hidden = false
        })
        .catch(error=> {
            console.error(error)
        })
    })
})
