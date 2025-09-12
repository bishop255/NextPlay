// FUNCIONES DEL CARRITO DE COMPRAS //  


function anadirAlCarrito(nombre, precio) {
  // total += precio;
  // document.getElementById("total").innerText = total;
  // document.getElementById("mensaje").innerText = "Productos en el carrito:";
  // document.getElementById("totalInput").value = total;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} ha sido agregado al carrito.`);
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoBody = document.getElementById('carrito');
    carritoBody.innerHTML = ''; // Para limipiar el carrito de compras

    let total = 0;
    carrito.forEach((producto,index) => {
        total += producto.precio;
        carritoBody.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><button class="btn btn-warning btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            </tr>`;
    });

    if (carrito.length === 0) {
        carritoBody.innerHTML =
        '<tr><td colspan="3">No hay productos en el carrito.</td></tr>';
    }

    document.getElementById("total").innerText = `TOTAL: $${total}`;

}

function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index,1); // eliminamos el producto
    localStorage.setItem("carrito",JSON.stringify(carrito)) //Actualizamos el localStorage
    mostrarCarrito();
}


function pagar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("No hay productos en el carrito para pagar");
    } else {
        alert("Pago recibido. Gracias por su compra!");
        localStorage.removeItem("carrito"); // vaciar el carrito
        mostrarCarrito(); // actualizar la vista del carrito
        document.getElementById("total").innerText = "TOTAL: $0"; // limpiar total
    }
}



// FUNCIONES REGISTRO //

function registarUsuario() {
    const form = document.querySelector('.form-container2');

    form.addEventListener('submit', function(event) { 
        event.preventDefault();

        let hayErrores = false;

        // Limpiar errores 
        document.querySelectorAll('.mb-3').forEach(c => c.classList.remove('error'));

        // Validar campos de texto
        function validarCampo(id) {
            const input = document.getElementById(id);
            const contenedor = input.closest('.mb-3');
            if (!input.value.trim()) {
                contenedor.classList.add('error');
                hayErrores = true;
            }
        }

        validarCampo('inputEmail4');
        validarCampo('inputPassword4');
        validarCampo('inputAddress');
        validarCampo('inputCity');

        // Validar select
        const select = document.getElementById('inputState');
        if (select.value === "Seleccione Género") {
            select.closest('.mb-3').classList.add('error');
            hayErrores = true;
        }

        // Validar checkbox
        const checkbox = document.getElementById('gridCheck');
        if (!checkbox.checked) {
            checkbox.closest('.form-check').classList.add('error');
            hayErrores = true;
        }

        if (!hayErrores) {
            alert('Registro Exitoso, Bienvenido a la comunidad de NextPlay')
            form.submit();
            window.location.href = "index.html";
        } else {
            alert('Por favor, completa todos los campos obligatorios.');
        }
    });
}

// FUNCIONES INICIO DE SESION //

function validarSesion(event) {
    event.preventDefault(); // evitar el envío por defecto

    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;

    if (!email || !password) {
        alert('Ingrese su email y su contraseña correctamente!');
    } else {
        alert('Bienvenido de vuelta amigo gamer!');
        window.location.href = "index.html";
    }
}
