
const dep = document.getElementById("producto");
const botonB = document.getElementById('boton');
const botonC = document.getElementById('boton1');

const nom = document.getElementById("nombre");
const des = document.getElementById("descripcion");
const mar = document.getElementById("marca");
const fot = document.getElementById("foto");
const qty = document.getElementById("unidades");
const ean = document.getElementById("ean");


botonB.onclick = function (event) {
	event.preventDefault();
    BuscarProducto()
}


async function BuscarProducto() {
    const producto = dep.value;
    try {
        const response = await fetch(`http://localhost:8080/productos/filterByNameproduct?nameproduct=${producto}`);
        
        if (response.ok) {
            const data = await response.json();
            actualizarTablaProductos(data);
        } else {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
    } catch (error) {
        console.log(error);
    }
}

async function cargarProductos() {
	try {
		const response = await fetch("http://localhost:8080/productos");
		const data = await response.json();
		// Obtener todos los departamentos
		const productos = [...new Set(data.map(item => item.nameproduct))];
		// Agregar los departamentos al input correspondiente
		productos.forEach(producto => {
			const option = document.createElement("option");
			option.text = producto;
			dep.add(option);
		});
	} catch (error) {
		console.error("Error al cargar los productos:", error);
	}
}


function actualizarTablaProductos(data) {
	const tablaProductos = document.getElementById("tabla-productos");
    console.log(tablaProductos)
	tablaProductos.innerHTML = "";
	data.forEach(producto => {
		const fila = document.createElement("tr");
		fila.innerHTML = `
        <td>${producto.id}</td>
		<td>${producto.codeean}</td>
		<td>${producto.nameproduct}</td>
		<td>${producto.descriptionproduct}</td>
		<td>${producto.brandproduct}</td>
		<td>${producto.inventoryquantity}</td>
		<td>
			<button data-codigo="${producto.id}" class="boton-editar">Editar</button>
			<button data-codigo="${producto.id}" class="boton-borrar">Borrar</button>
		</td>
		`;

		tablaProductos.appendChild(fila);
		
		const botonBorrar = fila.querySelector(".boton-borrar");
		botonBorrar.addEventListener("click", function() {
			const id = producto.id;
			eliminarRegistro(id);
		});

		const botonEditar = fila.querySelector(".boton-editar");
		botonEditar.addEventListener("click", () => cargarDatosEditar(producto, botonEditar));
        //window.location.href = "../CreateProduct/Create.html";
	});

	function cargarDatosEditar(producto, botonEditar) {
        console.log(producto);
        
        // Construir la URL del formulario con los datos como parámetros de consulta
        const url = `../CreateProduct/Create.html?codeean=${encodeURIComponent(producto.codeean)}&nameproduct=${encodeURIComponent(producto.nameproduct)}&descriptionproduct=${encodeURIComponent(producto.descriptionproduct)}&brandproduct=${encodeURIComponent(producto.brandproduct)}&inventoryquantity=${encodeURIComponent(producto.inventoryquantity)}`;
    
        // Redireccionar a la página del formulario
        window.location.href = url;
    }
    
}


async function eliminarRegistro(id) {
    try {
        const response = await fetch(`http://localhost:8080/productos?id=${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
        
        BuscarProducto();
    } catch (error) {
        console.log(error);
    }
}




cargarProductos();