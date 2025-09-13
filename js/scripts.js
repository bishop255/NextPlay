/* =======================================
   NextPlay - scripts.js
   Incluye:
   - Lógica del carrito de compras
   - Validaciones de registro
   - Validaciones de inicio de sesión
   ======================================= */


/* =======================================
   FUNCIONES DEL CARRITO DE COMPRAS
   ======================================= */

// Agregar producto al carrito
function anadirAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Validación: si el juego ya existe, preguntar antes de duplicar
  const existe = carrito.find(p => p.nombre === nombre);
  if (existe) {
    const confirmar = confirm(`El juego "${nombre}" ya fue agregado. ¿Quieres agregarlo de nuevo?`);
    if (!confirmar) {
      return; // si el usuario cancela, no se agrega
    }
  }

  // Agregar producto
  carrito.push({ nombre, precio: Number(precio) });
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Avisar al usuario
  alert(`Se agregó "${nombre}" al carrito ✅`);
}

// Mostrar el contenido del carrito en carrito.html
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoBody = document.getElementById('carrito');
  const totalEl = document.getElementById("total");

  if (!carritoBody || !totalEl) return; // seguridad

  carritoBody.innerHTML = ''; // limpiar tabla
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;
    carritoBody.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td class="text-center">${Number(producto.precio).toLocaleString('es-CL',{style:'currency',currency:'CLP'})}</td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        </td>
      </tr>`;
  });

  if (carrito.length === 0) {
    carritoBody.innerHTML = '<tr><td colspan="3" class="text-center">No hay productos en el carrito.</td></tr>';
  }

  // Actualizar total formateado
  totalEl.innerText = `TOTAL: ${total.toLocaleString('es-CL',{style:'currency',currency:'CLP'})}`;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1); // eliminar por índice
  localStorage.setItem("carrito", JSON.stringify(carrito)); // actualizar localStorage
  mostrarCarrito(); // refrescar vista
}

// Finalizar compra
function pagar() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Validación: carrito vacío
  if (carrito.length === 0) {
    alert("No puedes finalizar la compra: tu carrito está vacío.");
    return;
  }

  // Confirmación antes de pagar
  const confirmar = confirm("¿Estás seguro de que quieres finalizar la compra o prefieres seguir comprando?");
  if (!confirmar) {
    alert("Puedes seguir comprando en la tienda 🛒");
    return;
  }

  // Si confirma, mensaje de éxito
  alert("🎉 ¡Felicidades por su compra! 🎉");

  // Vaciar carrito después de comprar
  localStorage.removeItem("carrito");
  mostrarCarrito();
  document.getElementById("total").innerText = "TOTAL: $0";
}


/* =======================================
   FUNCIONES REGISTRO
   ======================================= */

function registarUsuario() {
  const form = document.querySelector('.form-container2');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let hayErrores = false;

    // Limpiar errores previos
    document.querySelectorAll('.mb-3').forEach(c => c.classList.remove('error'));

    // Validar campos de texto obligatorios
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

    // Resultado
    if (!hayErrores) {
      alert('Registro Exitoso, Bienvenido a la comunidad de NextPlay');
      form.submit();
      window.location.href = "index.html";
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  });
}


/* =======================================
   FUNCIONES INICIO DE SESION
   ======================================= */

function validarSesion(event) {
  event.preventDefault(); // evitar envío normal

  const email = document.getElementById('exampleInputEmail1').value;
  const password = document.getElementById('exampleInputPassword1').value;

  if (!email || !password) {
    alert('Ingrese su email y su contraseña correctamente!');
  } else {
    alert('Bienvenido de vuelta amigo gamer!');
    window.location.href = "index.html";
  }
}
