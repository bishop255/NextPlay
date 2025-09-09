

const muestraMensaje = (event) => {
            event.preventDefault(); // Evita el envío del formulario
            const name = document.getElementById('name').value;
            if (!name){
                alert('Ingresa tu nombre');
                console.log('Nombre no ingresado')
                return;
            }
            document.getElementById('message').innerText = `¡Bienvenido, ${name}!`;
            document.getElementById('form1').reset(); // Reinicia el formulario
        };
