var palabraElegida = "";
var letrasCorrectas, letrasFallidas, error, finJuego;

var listaPalabras = ["PELOTA","REMERA","DIBUJO","BANDERA","JIRAFA","FUXIA", "MILANESA","PARLANTE","BRAZO","ROPERO"];

var expresionRegular=/^[A-Z\s]{1,8}$/; //solo letras mayusculas, sin acentos ni caracteres especiales y hasta 8 caracteres.

var cajaJuego = document.querySelector(".cajaJuego");
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var cajaLetras = document.querySelector(".cajaLetras");
var cajaLetrasFallidas = document.querySelector(".cajaLetrasFallidas");
var botonDesistir = document.querySelector(".botonDesistir");
var botonNuevoJuego = document.querySelector(".botonNuevoJuego");



var cajaInicio = document.querySelector(".cajaInicio");
var cajaAgregarPalabra = document.querySelector(".cajaAgregarPalabra");
var botonIniciarJuego = document.querySelector(".botonIniciarJuego");
var botonAgregarPalabra = document.querySelector(".botonAgregarPalabra");

var palabraIngresada = document.querySelector(".inputPalabra");
var cartelError = document.querySelector(".cartelError");
var botonGuardar = document.querySelector(".botonGuardar");
var botonCancelar = document.querySelector(".botonCancelar");



// comienza el codigo del bloque de INICIO



botonIniciarJuego.addEventListener('click', () => {
  comenzarJuego();
  cajaInicio.style.display = "none";
  cajaJuego.style.display = "flex";    
})

botonAgregarPalabra.addEventListener('click', () => {
  cajaInicio.style.display = "none";
  cajaAgregarPalabra.style.display = "flex";
})



// comienza el codigo del bloque del JUEGO



botonNuevoJuego.addEventListener('click', () => {
  comenzarJuego();   
})

botonDesistir.addEventListener('click', () => {
  cajaInicio.style.display = "flex";
  cajaJuego.style.display = "none";
})



// comienza el codigo del bloque de AGREGAR PALABRA



botonGuardar.addEventListener('click', () => {
  var palabra = palabraIngresada.value.trim();
  if (expresionRegular.test(palabra)) {
    listaPalabras.push(palabra);
    comenzarJuego();
    cajaAgregarPalabra.style.display = "none";
    cajaJuego.style.display = "flex";
    palabraIngresada.value = "";
  }else{
    cartelError.style.display = "flex";  
  }
})

botonCancelar.addEventListener('click', () => {
  cajaInicio.style.display = "flex";
  cajaAgregarPalabra.style.display = "none";
  cartelError.style.display = "none";
  palabraIngresada.value = "";
})

function palabraSecreta() {
  let posicionSecreta = Math.floor(Math.random() * listaPalabras.length);
  return listaPalabras[posicionSecreta];    
}

function crearGuiones(palabra) {
  let fragment = new DocumentFragment();
  for(let i =0; i<palabra.length; i++){       
    let cajita = document.createElement('div');
    cajita.innerHTML = `<div class="letraSecreta${i}"><div>`;
    cajita.className = "cajitaLetra"
    fragment.appendChild(cajita);                                                                 
  }
  cajaLetras.appendChild(fragment)
}

document.addEventListener('keydown', (evento) => {     
  if (evento.keyCode >= 65 && evento.keyCode <= 90 && finJuego == 0) {
    var teclaLetra = evento.key.toUpperCase();
    mostrarLetras(teclaLetra);
  }
})

function comenzarJuego() {
  limpiar();
  palabraElegida = palabraSecreta();
  crearGuiones(palabraElegida);  
}

function mostrarLetras(letra) {  

  for (var i = 0; i < palabraElegida.length; i++){
    if(palabraElegida.includes(letra)){
      var posicion = palabraElegida.indexOf(letra);
      i = posicion;
      var cajaLetra = document.querySelector(`.letraSecreta${posicion}`);
      cajaLetra.innerHTML = letra;
      palabraElegida = palabraElegida.replace(letra,"0");
      letrasCorrectas+=letra;
        
    }else if(letrasCorrectas.indexOf(letra) == -1 && letrasFallidas.indexOf(letra) == -1){
      letrasFallidas+=letra + ' ';
      cajaLetrasFallidas.innerHTML = letrasFallidas;
      error++;
      dibujarHorca();
    }
  }
  if(letrasCorrectas.length == palabraElegida.length){
    finJuego = 1;
    mensajeGanarPerder(1);
  }
}

function mensajeGanarPerder(validacion) {
  switch (validacion) {
    case 1:
      pincel.fillStyle = "green"
      pincel.font = "40px Haettenschweiler";
      pincel.fillText("Ganaste,",550,270);
      pincel.fillText("Felicidades!",530,315);
      break
    case 2:
      pincel.fillStyle = "red"
      pincel.font = "40px Haettenschweiler";
      pincel.fillText("Fin del juego!",550,270);
      break
  }
}

function dibujarHorca() {  
  switch (error) {
    case 1: //error 1
      pincel.beginPath();
      pincel.moveTo(300,480);
      pincel.lineWidth = 10;
      pincel.lineTo(300,100);
      pincel.stroke();
      break;

    case 2: //error 2
      pincel.lineTo(450,100);
      pincel.stroke();
      break;

    case 3: //error 3
      pincel.lineTo(450,150);
      pincel.stroke();
      break;

    case 4: //error 4
      pincel.beginPath();
      pincel.arc(450,175,25,0,2*3.14);
      pincel.stroke();
      break;

    case 5: //error 5
      pincel.moveTo(450,200);
      pincel.lineTo(450,320);
      pincel.stroke();
      break;

    case 6: //error 6
      pincel.lineTo(410,380);
      pincel.stroke();
      break;

    case 7: //error 7
      pincel.moveTo(450,320);
      pincel.lineTo(490,380);
      pincel.stroke();
      break;

    case 8: //error 8
      pincel.moveTo(450,240);
      pincel.lineTo(410,300);
      pincel.stroke();
      break;

    case 9: //error 9
      pincel.moveTo(450,240);
      pincel.lineTo(490,300);
      pincel.stroke();      
      mensajeGanarPerder(2);
      finJuego = 1;
      break;
  }  
}

function limpiar() {
  letrasCorrectas = "";
  letrasFallidas = "";
  cajaLetrasFallidas.innerHTML = "";
  finJuego = 0;
  error = 0;
  pincel.clearRect(0, 0, pantalla.width, pantalla.height);
  for(let i =0; i<palabraElegida.length; i++){    
    cajaLetras.removeChild(document.querySelector(".cajitaLetra"));                                              
  }
  pincel.beginPath();
  pincel.moveTo(200,480);
  pincel.lineWidth = 10;
  pincel.strokeStyle = "#0A3871"
  pincel.lineTo(600,480);
  pincel.stroke();
}