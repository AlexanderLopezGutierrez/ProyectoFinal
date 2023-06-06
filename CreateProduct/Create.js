
const nom = document.getElementById("nombre");
const des = document.getElementById("descripcion");
const mar = document.getElementById("marca");
const fot = document.getElementById("foto");
const qty = document.getElementById("unidades");
const ean = document.getElementById("ean");
const boton = document.getElementById('boton');

class Producto {
	constructor(descriptionproduct, codeean, brandproduct, inventoryquantity, nameproduct, asset) {
		this.descriptionproduct = descriptionproduct;
        this.codeean = codeean;
        this.brandproduct = brandproduct;
        this.inventoryquantity = inventoryquantity;
        this.nameproduct = nameproduct;	
        this.asset = asset;
    }
}


boton.onclick = function (event) {
	event.preventDefault();
    insertData()
	//if (validarSignUp()) {
        document.getElementById("transactionFom").reset();
		mostrarAlerta("Producto agragado con exito", "success");
	//}
}


async function insertData() {
    
    var producto = new Producto(des.value, ean.value, mar.value, qty.value, nom.value, 1);
    console.log(producto)
	try {
        const response = await fetch("http://localhost:8080/productos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
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


// Obtener los parámetros de consulta de la URL
const params = new URLSearchParams(window.location.search);

// Asignar los valores a los campos del formulario
document.getElementById("ean").value = params.get("codeean");
document.getElementById("nombre").value = params.get("nameproduct");
document.getElementById("descripcion").value = params.get("descriptionproduct");
document.getElementById("marca").value = params.get("brandproduct");
document.getElementById("unidades").value = params.get("inventoryquantity");
