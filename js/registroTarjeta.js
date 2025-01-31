const tarjeta = document.querySelector('#tarjeta')

const fondoTarjetaDelantera = document.querySelector('#tarjeta .delantera')
const fondoTarjetaTrasera = document.querySelector('#tarjeta .trasera')

const formulario = document.querySelector('#formulario')

const numeroTarjeta = document.querySelector('#tarjeta .numero')
const nombreTarjeta = document.querySelector('#tarjeta .nombre')

const logoMarca = document.querySelector('#logo-marca')
const firma = document.querySelector('#tarjeta .firma p')

const mesExpiracion = document.querySelector('#tarjeta .mes')
const yearExpiracion = document.querySelector('#tarjeta .year')
const ccv = document.querySelector('#tarjeta .ccv')

const botonEnviar = document.querySelector('#btn-enviar');

/* Declara una variable global */

let banderaNumero = 0
let banderaNombre = 0
let banderaMes = 0
let banderaYear = 0
let banderaCCV = 0
let banNom=false


// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if (tarjeta.classList.contains('active')) {
		tarjeta.classList.remove('active');
	}
}

const mostrarTrasera = () => {
	if (!tarjeta.classList.contains('active')) {
		tarjeta.classList.add('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

/* Entada y verificacion de la tarjeta */
formulario.numeroTarjeta.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.numeroTarjeta.value = valorInput
		// Eliminar espacios en blanco
		.replace(/\s/g, '')
		// Eliminar letras
		.replace(/\D/g, '')
		// Poner espacios cada 4 numeros
		.replace(/([0-9]{4})/g, '$1 ')
		// Eliminar el ultimo espaciado
		.trim();


	numeroTarjeta.textContent = valorInput;

	if (valorInput == '') {
		numeroTarjeta.textContent = 'xxxx - xxxx - xxxx - xxxx'
		logoMarca.innerHTML = ''
		fondoTarjetaDelantera.style.backgroundImage = 'linear-gradient(45deg, #cdcdcd 5%, #4d4d4d)'
		fondoTarjetaTrasera.style.backgroundImage = 'linear-gradient(-45deg, #cdcdcd -5%, #4d4d4d)'
		banderaNumero = 0
	}

	if (valorInput[0] == 4) {
		logoMarca.innerHTML = ''
		const imagen = document.createElement('img');
		imagen.src = 'css/assets/logos-banco/visa.png';
		logoMarca.appendChild(imagen);
		fondoTarjetaDelantera.style.backgroundImage = 'linear-gradient(45deg, #5a75e3 5%, #173e7d)';
		fondoTarjetaTrasera.style.backgroundImage = 'linear-gradient(-45deg, #5a75e3 -5%, #173e7d)';

		if (valorInput.length == 19) {
			banderaNumero = 1
		}
		else {
			banderaNumero = 0
		}
	}
	else if (valorInput[0] == 5) {
		logoMarca.innerHTML = ''
		const imagen = document.createElement('img');
		imagen.src = 'css/assets/logos-banco/mastercard.png';
		logoMarca.appendChild(imagen);
		fondoTarjetaDelantera.style.backgroundImage = 'linear-gradient(45deg, #ea2315 5%, #80140c)';
		fondoTarjetaTrasera.style.backgroundImage = 'linear-gradient(-45deg, #ea2315 -5%, #80140c)';

		if (valorInput.length == 19) {
			banderaNumero = 1
		}
		else {
			banderaNumero = 0
		}
	}
	else if (valorInput[0] == 3) {
		logoMarca.innerHTML = ''
		const imagen = document.createElement('img');
		imagen.src = 'css/assets/logos-banco/amex.svg';
		logoMarca.appendChild(imagen);
		fondoTarjetaDelantera.style.backgroundImage = 'linear-gradient(45deg, #006ecf -5%, #9dd7f5)';
		fondoTarjetaTrasera.style.backgroundImage = 'linear-gradient(-45deg, #006ecf 5%, #9dd7f5)';
		if (valorInput.length == 19) {
			banderaNumero = 1
		}
		else {
			banderaNumero = 0
		}
	}
	else if (valorInput[0] == 6) {
		logoMarca.innerHTML = ''
		const imagen = document.createElement('img');
		imagen.src = 'css/assets/logos-banco/discover.png';
		logoMarca.appendChild(imagen);
		fondoTarjetaDelantera.style.backgroundImage = 'linear-gradient(45deg, #c14a0d 5%, #ec9e24)';
		fondoTarjetaTrasera.style.backgroundImage = 'linear-gradient(-45deg, #c14a0d -5%, #ec9e24)';

		if (valorInput.length == 19) {
			banderaNumero = 1
		}
		else {
			banderaNumero = 0
		}
	}

	mostrarFrente()
	/* desbloquearBoton() */
})


const expresiones = {
    cadenas:/^[a-zA-ZÁ-ý\s]{3,100}$/
}

formulario.nombrePropietario.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.nombrePropietario.value = valorInput
	// Eliminar numeros
    .replace(/[0-9]/g, '')
     // Eliminar caracteres especiales
    .replace(/[üâäàåçê♪ëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒªº¿⌐¬½¼«»÷±~!¡@#$%^&^*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');

	if (!expresiones.cadenas.test(valorInput)) {
        nombrePropietario.style.border = "3px solid red";
        banNom = false
	}else{
        nombrePropietario.removeAttribute("style");
        banNom = true
    }
	nombreTarjeta.textContent = valorInput;
	

	firma.textContent = valorInput;

	if (valorInput == '') {
		nombreTarjeta.textContent = 'Nombre Y Apellido';
	}

	if (valorInput.length > 3) {
		banderaNombre = 1
	}
	else {
		banderaNombre = 0
	}
	mostrarFrente()
	/* desbloquearBoton() */
	validar();
})

formulario.mesCaja.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.mesCaja.value = valorInput.replace(/\s/g, '').replace(/\D/g, '');

	if (valorInput > 12) {
		valorInput = 0
		formulario.mesCaja.value = ""
		mesExpiracion.textContent = 'MM';
		banderaMes = 0
	}
	else if (valorInput < 1) {
		valorInput = 0
		formulario.mesCaja.value = ""
		mesExpiracion.textContent = 'MM'
		banderaMes = 0
	}
	else if (valorInput == '') {
		valorInput = 'MM'
		formulario.mesCaja.value = 'MM'
		banderaMes = 0
	}

	else if (valorInput >= 1 && valorInput < 10) {
		cadena = '0' + valorInput
		mesExpiracion.textContent = cadena;
		banderaMes = 1
	}
	else if (valorInput >= 10 && valorInput <= 12) {
		mesExpiracion.textContent = valorInput;
		banderaMes = 1
	}

	mostrarFrente()
	/* desbloquearBoton() */

})

formulario.yearCaja.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.yearCaja.value = valorInput.replace(/\s/g, '').replace(/\D/g, '');

	if (valorInput == '') {
		yearExpiracion.textContent = 'YY';
	}
	else if (valorInput.length == 2) {

		if (valorInput >= 15 && valorInput <= 35) {
			cadena = '20' + valorInput
			yearExpiracion.textContent = cadena;
			banderaYear = 1
		}
		else {
			valorInput = ''
			formulario.yearCaja.value = ""
			yearExpiracion.textContent = 'YY';
			banderaYear = 0
		}
	}

	mostrarFrente()
	/* desbloquearBoton() */
})

formulario.ccvCaja.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.ccvCaja.value = valorInput.replace(/\s/g, '').replace(/\D/g, '');

	if (valorInput == '') {
		ccv.textContent = 'CCV';
	}
	ccv.textContent = valorInput;

	if (valorInput.length == 3) {
		banderaCCV = 1
	}
	else {
		banderaCCV = 0
	}
	mostrarTrasera()
	/* desbloquearBoton() */
})


function desbloquearBoton(){
	if(banderaNumero == 1 && banderaNombre == 1 && banderaMes == 1 && banderaYear == 1 && banderaCCV == 1 ) {
		botonEnviar.style.display = 'flex'
	}
	else {
		botonEnviar.style.display = 'none'
	}
}

function validar(){
    const siguiente = document.getElementById('siguiente');
    if(banNom == true){
        siguiente.disabled=false;
    }
    else{
        siguiente.disabled=true;
    }

}