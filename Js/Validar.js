function validarSignUp() {
    const nom = document.getElementById("nombres");
    const ape = document.getElementById("apellidos");
    const fec = document.getElementById("fechaNacimiento");
    const dep = document.getElementById("departamento");
    const ciu = document.getElementById("ciudad");
    const tel = document.getElementById("telefono");
    const cor = document.getElementById("email");
    const conf_correo = document.getElementById("confirmarCorreo");
    const con = document.getElementById("contrasena");
    const conf_contrasena = document.getElementById("confirmarContrasena");

    const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nom.value);
    const apellidosValidos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(ape.value);
    const emailValido = /^\S+@\S+\.\S+$/.test(cor.value);
    const confirmarEmailValido = cor.value === conf_correo.value;
    const contrasenaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(con.value);
    const confirmarContrasenaValida = con.value === conf_contrasena.value;
    const telefonoValido = /^[0-9]{10}$/.test(tel.value);

    if (!nombreValido) {
        document.getElementById("nombres").style.borderColor = "red";
        document.getElementById("nombres").style.color = "red";
        mostrarAlerta("El nombre solo puede contener letras y espacios", "error");
        return false;
    }
    
    if (!apellidosValidos) {
        document.getElementById("apellidos").style.borderColor = "red";
        document.getElementById("apellidos").style.color = "red";
        mostrarAlerta("Los apellidos solo pueden contener letras y espacios", "error");
        return false;
    }
    
    if (!emailValido) {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("email").style.color = "red";
        mostrarAlerta("Ingrese un email válido", "error");
        return false;
    }
    
    if (!confirmarEmailValido) {
        document.getElementById("confirmarCorreo").style.borderColor = "red";
        document.getElementById("confirmarCorreo").style.color = "red";
        mostrarAlerta("El email de confirmación no coincide", "error");
        return false;
    }
    
    if (!contrasenaValida) {
        document.getElementById("contrasena").style.borderColor = "red";
        document.getElementById("contrasena").style.color = "red";
        mostrarAlerta("La contraseña debe tener al menos 8 caracteres, una letra mayuscula, un numero y un caracter especial", "error");
        return false;
    }
    
    if (!confirmarContrasenaValida) {
        document.getElementById("confirmarContrasena").style.borderColor = "red";
        document.getElementById("confirmarContrasena").style.color = "red";
        mostrarAlerta("La contraseña de confirmación no coincide", "error");
        return false;
    }
    
    // Validar el telefono
    
    if (!telefonoValido) {
        document.getElementById("telefono").style.borderColor = "red";
        document.getElementById("telefono").style.color = "red";
        mostrarAlerta("El código debe tener 8 números", "error");
        return false;
    }
    
    // Validar la fecha de nacimiento
    const hoy = new Date();
    const fechaNacimientoValue = new Date(fec.value);
    const edad = hoy.getFullYear() - fechaNacimientoValue.getFullYear();
    if (edad < 18) {
        document.getElementById("fechaNacimiento").style.borderColor = "red";
        document.getElementById("fechaNacimiento").style.color = "red";
        mostrarAlerta("Debe ser mayor de edad para registrarse", "error");
        return false;
}

const fechaHabilitada = new Date();
fechaHabilitada.setFullYear(fechaHabilitada.getFullYear() - 18);
const fechaMinima = fechaHabilitada.toISOString().slice(0, 10);
fec.setAttribute("max", fechaMinima);
    // Si todas las validaciones pasan, retorna verdadero para indicar que el formulario es válido
    return true;
}

function restablecerEstilo(campo) {
    campo.style.borderColor = "";
    campo.style.color = "";
}

function validarLogin() {
    const cor = document.getElementById("email");
    const con = document.getElementById("contrasena");

    const emailValido = /^\S+@\S+\.\S+$/.test(cor.value);
    const contrasenaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(con.value);

    if (!emailValido) {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("email").style.color = "red";
        mostrarAlerta("Ingrese un email válido", "error");
        return false;
    }
    
    if (!contrasenaValida) {
        document.getElementById("contrasena").style.borderColor = "red";
        document.getElementById("contrasena").style.color = "red";
        mostrarAlerta("La contraseña debe tener al menos 8 caracteres, una letra mayuscula, un numero y un caracter especial", "error");
        return false;
    }
    return true;
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
