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
const boton = document.getElementById('boton');

class Usuario {
	constructor(name, last_name, birth_date, department, city, phone, email, password, asset) {
		this.name = name;
		this.last_name = last_name;
		this.birth_date = birth_date;
		this.department = department;
		this.city = city;
		this.phone = phone;
		this.email = email;
		this.password = password;
		this.asset = asset;
	}
}

boton.onclick = function (event) {
	event.preventDefault();
	if (validarSignUp()) {
		verificarCorreo()
		mostrarAlerta("Usuario registrado con exito", "success");
		setTimeout(function() {
			window.location.href = "../Login/Login.html";
		}, 3000);
	}
}


async function insertData() {
    var usuario = new Usuario(nom.value, ape.value, fec.value, dep.value, ciu.value, tel.value, cor.value, con.value, 1);
	try {
        const response = await fetch("http://localhost:8080/usuarios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para cargar los departamentos de Colombia desde la API
async function cargarDepartamentos() {
	try {
		const response = await fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json");
		const data = await response.json();
		// Obtener todos los departamentos
		const departamentos = [...new Set(data.map(item => item.departamento))];
		// Agregar los departamentos al input correspondiente
		departamentos.forEach(departamento => {
			const option = document.createElement("option");
			option.text = departamento;
			dep.add(option);
		});
	} catch (error) {
		console.error("Error al cargar los departamentos:", error);
	}
}

// Función para filtrar las ciudades según el departamento seleccionado
async function filtrarCiudades() {
	const departamentoSeleccionado = dep.value;
	try {
		const response = await fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json");
		const data = await response.json();
		// Limpiar las opciones previas
		ciu.innerHTML = "";
		// Obtener todas las ciudades del departamento seleccionado
		const ciudades = data.filter(item => item.departamento === departamentoSeleccionado).map(item => item.municipio);
		// Agregar las ciudades al input correspondiente
		ciudades.forEach(ciudad => {
			const option = document.createElement("option");
			option.text = ciudad;
			ciu.add(option);
		});
	} catch (error) {
		console.error("Error al cargar las ciudades:", error);
	}
}

// Asignar el evento "change" al input de departamentos
dep.addEventListener("change", filtrarCiudades);
// Cargar los departamentos al cargar la página
cargarDepartamentos();

async function verificarCorreo() {
    const correo = cor.value;
    try {
        const response = await fetch(`http://localhost:8080/usuarios/filterByEmail?email=${correo}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
				mostrarAlerta("El correo electrónico ya está en uso. No se permite el registro.", "error");
            } else {
                insertData();
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
