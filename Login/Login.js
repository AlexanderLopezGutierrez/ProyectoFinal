const cor = document.getElementById("email");
const con = document.getElementById("contrasena");
const boton = document.getElementById('boton');

boton.onclick = function (event) {
	event.preventDefault();
	if (validarLogin()) {
		verificarCorreo()
	}
}

async function verificarCorreo() {
    const correo = cor.value;
    const contrasena = con.value;
    try {
        const response = await fetch(`http://localhost:8080/usuarios/filterByEmail?email=${correo}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                if (data[0].password === contrasena){
                    window.location.href = "../home.html";
                }else{
                    mostrarAlerta("Autenticación inválida", "error");
                }
            } else {
                mostrarAlerta("Usuario no registrado", "error");
                document.getElementById("transactionFom").reset();
            }
        } else {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
    } catch (error) {
        console.log(error);
    }
}

function mostrarAlerta(mensaje, tipo) {
    const alertContainer = document.getElementById("alert-container");
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", tipo);
    alertElement.textContent = mensaje;
    alertContainer.appendChild(alertElement);

    // Establecer un temporizador para eliminar la alerta después de 3 segundos (3000 milisegundos)
    setTimeout(function() {
        alertElement.remove(); // Eliminar la alerta
    }, 8000);
}