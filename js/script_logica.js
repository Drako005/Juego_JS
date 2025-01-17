// Pantalla de carga
function seleccionarPersonaje(boton) {
    localStorage.setItem('personajeSeleccionado', boton);
  }

document.querySelectorAll('button[name="boton"]').forEach(function(boton) {
    boton.addEventListener('click', function(event) {
        event.preventDefault();
        
        document.getElementById('loading-screen').style.display = 'flex';
        
        setTimeout(function() {
            window.location.href = '../paginas/juego.html';
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000);
    });
});


  // Pantalla de carga FIN



  // LOGICA DEL JUEGO
  let habilidadSeleccionada = null;

  const personajes = {
    ozuna: {
        imagen: '../fotos/ozuna_elegir.png',
        nombre: "Ozuna",
        vida: 100,
        habilidades: [
            { img: '../fotos/ozuna1.png', alt: 'La Fórmula', accion: 'ataque1ozuna'},
            { img: '../fotos/ozuna2.png', alt: 'Moraleja', accion: 'ataque2ozuna'},
            { img: '../fotos/ozuna3.png', alt: 'Negrito Ojos Claros', accion: 'ataque3ozuna'},
            { img: '../fotos/ozuna4.png', alt: 'Frase Filosófica', accion: 'ataque4ozuna'}
        ]
    },
    shrek: {
        imagen: '../fotos/shrek_elegir.png',
        nombre: "Shrek",
        vida: 150,
        habilidades: [
            { img: '../fotos/shrek1.png', alt: 'Huevo Duro', accion: 'ataque1shrek'},
            { img: '../fotos/shrek2.png', alt: 'Graznido de Asno', accion: 'ataque2shrek'},
            { img: '../fotos/shrek3.png', alt: 'Eructo Mortal', accion: 'ataque3shrek'},
            { img: '../fotos/shrek4.png', alt: 'Baño en la Ciénaga', accion: 'ataque4shrek'}
        ]
    },
    pablo: {
        imagen: '../fotos/pablo_elegir.png',
        nombre: "Pablo Motos",
        vida: 125,
        habilidades: [
            { img: '../fotos/pablo1.png', alt: 'Ataque Yoga', accion: 'ataque1pablo'},
            { img: '../fotos/pablo2.png', alt: 'Pregunta Incómoda', accion: 'ataque2pablo'},
            { img: '../fotos/pablo3.png', alt: 'Experimento Explosivo', accion: 'ataque3pablo'},
            { img: '../fotos/pablo4.png', alt: 'Trancas y Barrancas', accion: 'ataque4pablo'}
        ]
    },
    walter: {
        imagen: '../fotos/walter_elegir.png',
        nombre: "Walter",
        vida: 100,
        habilidades: [
            { img: '../fotos/walter1.png', alt: 'Ataque Cristal', accion: 'ataque1walter'},
            { img: '../fotos/walter2.png', alt: 'Ataque Gorro', accion: 'ataque2walter'},
            { img: '../fotos/walter3.png', alt: 'Mirada Penetrante', accion: 'ataque3walter'},
            { img: '../fotos/walter4.png', alt: 'Descanso en la Caravana', accion: 'ataque4walter'}
        ]
    }
};
let turnos = 0;
const personajesArray = Object.keys(personajes);
const personaje = localStorage.getItem('personajeSeleccionado');
//PONER LOS NOMBRES DE LOS 2 EN EL LOG
let enemigoAleatorio = personajesArray[Math.floor(Math.random() * personajesArray.length)];
  window.addEventListener('load', function() {
    //Aqui estaba declarado personaje
    
    const imgElemento = document.querySelector('.fotoPersonaje');
    const h2Elemento = this.document.querySelector('.nombrePersonaje');
    const titulo = this.document.querySelector('.personajesBatalla');
    const contenedorHabilidades = document.querySelector(".habilidades");
    const nombreAtaque = this.document.querySelector(".nombreAtaque");
    const barraVidaJugador = document.querySelector('#nivel-vida-personaje');
    const barraVidaEnemigo = document.querySelector('#nivel-vida-enemigo');


    if (personaje && personajes[personaje]) {
        vidaJugador = personajes[personaje].vida;
        vidaEnemigo = 100;

        imgElemento.src = personajes[personaje].imagen;
        imgElemento.alt = personaje;
        h2Elemento.innerHTML = personajes[personaje].nombre;
        
        barraVidaJugador.style.width = vidaJugador + '%';
        barraVidaJugador.textContent = vidaJugador;

        contenedorHabilidades.innerHTML = "";
        personajes[personaje].habilidades.forEach(function(habilidad){
            const botonHabilidad = document.createElement("button");
            botonHabilidad.classList.add('botonHabilidad');
            const imgHabilidad = document.createElement('img');
            imgHabilidad.src = habilidad.img;
            imgHabilidad.alt = habilidad.alt;
            imgHabilidad.classList.add('habilidades');
            botonHabilidad.appendChild(imgHabilidad);
            contenedorHabilidades.appendChild(botonHabilidad);

                botonHabilidad.addEventListener('click', function() {
                habilidadSeleccionada = habilidad; 
                nombreAtaque.innerHTML=habilidad.alt;
                });
        }); 
    } else {
        imgElemento.src = ''; 
        imgElemento.alt = 'Personaje no encontrado';
    }

    //Enemigo aleatorio
   
    while (enemigoAleatorio === personaje) {
        enemigoAleatorio = personajesArray[Math.floor(Math.random() * personajesArray.length)];
    }

    const imgEnemigo = document.querySelector('.fotoEnemigo');
    h2Enemigo = document.querySelector('.nombreEnemigo');
    vidaEnemigo = personajes[enemigoAleatorio].vida;

    imgEnemigo.src = personajes[enemigoAleatorio].imagen;
    imgEnemigo.alt = enemigoAleatorio;
    h2Enemigo.innerHTML = personajes[enemigoAleatorio].nombre;

    barraVidaEnemigo.style.width = vidaEnemigo + '%';
    barraVidaEnemigo.textContent = vidaEnemigo;

    titulo.innerHTML = personajes[personaje].nombre + " VS " + personajes[enemigoAleatorio].nombre;
});

//BOTON DE ATAQUE, cambio de TEXTO
const btnAtacar = document.getElementById('botonAtacar');

btnAtacar.addEventListener('mouseover', () => {
    btnAtacar.textContent = '¡MEME!'; 
});

btnAtacar.addEventListener('mouseout', () => {
    btnAtacar.textContent = 'Atacar'; 
});

//ATAQUE DE JUGADOR Y RESPUESTA DEL ENEMIGO
let isEnemyTurn = false;
btnAtacar.addEventListener('click', function() {
    if (isEnemyTurn) {
        alert("Espera a que el enemigo termine su turno antes de atacar de nuevo.");
        return;
    }

    if (habilidadSeleccionada) {
        // Bloqueamos el botón para evitar múltiples ataques
        isEnemyTurn = true;

        // Ejecuta el ataque del jugador
        ejecutarAccion(habilidadSeleccionada.accion);

        const enemigo = personajes[enemigoAleatorio];

        if (vidaEnemigo > 1) {
            if (enemigo) {
                // Elegimos una habilidad al azar de las habilidades del enemigo
                let habilidadRandom = enemigo.habilidades[
                    Math.floor(Math.random() * enemigo.habilidades.length)
                ];

                // Añadimos el ataque del jugador al log inmediatamente
                turnos++;
                document.getElementById('logBatalla').innerHTML += 
                    "Turno " + turnos + "\n" +
                    personajes[personaje].nombre + ": " + habilidadSeleccionada.alt + "\n";

                // Retrasamos el ataque del enemigo usando setTimeout
                setTimeout(() => {
                    // Ejecutamos esa habilidad seleccionada al azar
                    ejecutarRespuesta(habilidadRandom.accion);

                    // Añadimos el ataque del enemigo al log
                    document.getElementById('logBatalla').innerHTML += 
                        personajes[enemigoAleatorio].nombre + ": " + habilidadRandom.alt + "\n\n";
                    
                    // Desplazamos el log hacia abajo automáticamente
                    const logBatalla = document.getElementById('logBatalla');
                    logBatalla.scrollTop = logBatalla.scrollHeight;

                    // Desbloqueamos el botón para el siguiente turno
                    isEnemyTurn = false;
                }, 1000); // 1000 ms = 1 segundo
            }
        } else {
            // Si el enemigo está derrotado, desbloqueamos el botón
            isEnemyTurn = false;
        }
    } else {
        alert("Por favor, selecciona un ataque primero.");
    }

    comprobarVida();
});



function mostrarReglas() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-pantalla').style.display = 'block';
  }

function esconderReglas() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-pantalla').style.display = 'none';
  }
  
  
function ejecutarAccion(accion){
    //Animaciones aleatorias
    const animacion = document.getElementById('animacion');
    const animaciones = ['girar', 'pulso', 'mover'];
    const animacionRandom = animaciones[Math.floor(Math.random() * animaciones.length)];

    let probabilidad = Math.random();
    switch(accion){
        //OZUNA ATAQUES
        case 'ataque1ozuna':
            // Mostrar el popup de animacion
            animacion.innerHTML = "La Foooooormulaaa🎵🎶🎵";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 15;
        break;
        case 'ataque2ozuna':
            animacion.innerHTML = "MORALEJA🗿";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.25) {
                vidaEnemigo -= 10;
            }
        break;
        case 'ataque3ozuna':
            animacion.innerHTML = "El negrito ojos claro'🤑";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= (vidaEnemigo * 0.17);
        break;
        case 'ataque4ozuna':
            const frases = ["No sé si vivir o morir, me encuentro en un limbo desde que te fuiste de aquí🤔", "Mi libertad, no la quiero, tampoco la vida de soltero.", "La vida te pone obstaculos, pero los limites los pones tu", "Prefiero decir por lo menos lo intenté a tuve miedo y fracasé"];
            const random = Math.floor(Math.random() * frases.length);
            animacion.innerHTML = frases[random];
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaJugador += (100 - vidaJugador)*0.3;
        break;

        //SHREK ATAQUES
        case 'ataque1shrek':
            animacion.innerHTML = "Huevo duro🥚";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 15;
            break;
        case 'ataque2shrek':
            animacion.innerHTML = "Graznido de Asno🫏";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.20) {
                vidaEnemigo -= 10;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3shrek':
            animacion.innerHTML = "Eructo mortal🤮";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= (vidaEnemigo * 0.13);
        break;
        case 'ataque4shrek':
            animacion.innerHTML = "Baño en la cienaga🤢";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaJugador += (150 - vidaJugador)*0.2;
        break;

        //PABLO ATAQUES
        case 'ataque1pablo':
            animacion.innerHTML = "Ataque Yoga 🧘‍♂️";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 15;
            break;
        case 'ataque2pablo':
            animacion.innerHTML = "Pregunta incomoda❓";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.22) {
                vidaEnemigo -= 10;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3pablo':
            animacion.innerHTML = "Experimento Explosivo ☢️💣";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= (vidaEnemigo * 0.15);
        break;
        case 'ataque4pablo':
            animacion.innerHTML = "Trancas y Barrancas🐜🐜";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaJugador += (125 - vidaJugador)*0.25;
        break;

        //WALTER ATAQUES
        case 'ataque1walter':
            animacion.innerHTML = "Ataque cristal💉";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 15;
            break;
        case 'ataque2walter':
            animacion.innerHTML = "Ataque gorro🎩";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.30) {
                vidaEnemigo -= 12;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3walter':
            animacion.innerHTML = "Mirada Penetrante👀";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaEnemigo -= (vidaEnemigo * 0.18);
        break;
        case 'ataque4walter':
            animacion.innerHTML = "Descanso en la Caravana🚙";
            animacion.classList.add(animacionRandom, 'show');
            setTimeout(()=>{
                animacion.classList.remove('show', animacionRandom);
            }, 1000);
            vidaJugador += (100 - vidaJugador)*0.25;
        break;
    }
    actualizarBarrasDeVida();
    
  }

  //Ataque enemigo (Respuesta)
  function ejecutarRespuesta(accion1){
    
    let probabilidad = Math.random();
    switch(accion1){
        //OZUNA ATAQUES
        case 'ataque1ozuna':
            vidaJugador -= 15;
        break;
        case 'ataque2ozuna':
            vidaJugador -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.25) {
                vidaJugador -= 10;
            }
        break;
        case 'ataque3ozuna':
            vidaJugador -= (vidaJugador * 0.15);
        break;
        case 'ataque4ozuna':
            vidaEnemigo += (100 - vidaEnemigo)*0.3;
        break;

        //SHREK ATAQUES
         case 'ataque1shrek':
            vidaJugador -= 15;
            break;
        case 'ataque2shrek':
            vidaJugador -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.20) {
                vidaJugador -= 10;
            }
        break;
        case 'ataque3shrek':
            vidaJugador -= (vidaJugador * 0.13);
        break;
        case 'ataque4shrek':
            vidaEnemigo += (150 - vidaEnemigo)*0.2;
        break;

        //PABLO ATAQUES
        case 'ataque1pablo':
            vidaJugador -= 15;
            break;
        case 'ataque2pablo':
            vidaJugador -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.22) {
                vidaJugador -= 10;
            }
        break;
        case 'ataque3pablo':
            vidaJugador -= (vidaJugador * 0.15);
        break;
        case 'ataque4pablo':
            vidaEnemigo += (125 - vidaEnemigo)*0.25;
        break;

        //WALTER ATAQUES
        case 'ataque1walter':
            vidaJugador -= 15;
            break;
        case 'ataque2walter':
            vidaJugador -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.30) {
                vidaJugador -= 12;
            }
        break;
        case 'ataque3walter':
            vidaJugador -= (vidaJugador * 0.18);
        break;
        case 'ataque4walter':
            vidaEnemigo += (100 - vidaEnemigo)*0.25;
        break;
    }
    actualizarBarrasDeVida();
    
  }

  function actualizarBarrasDeVida() {
    const barraVidaJugador = document.querySelector('#nivel-vida-personaje'); // Barra del jugador
    const barraVidaEnemigo = document.querySelector('#nivel-vida-enemigo');   // Barra del enemigo

    // Asegurarse de que la vida no sea inferior a 0
    const vidaJugadorMostrar = Math.max(vidaJugador, 0);
    const vidaEnemigoMostrar = Math.max(vidaEnemigo, 0);

    // Calcular el porcentaje de vida para el jugador y el enemigo
    const porcentajeVidaJugador = (vidaJugadorMostrar / personajes[localStorage.getItem('personajeSeleccionado')].vida) * 100;
    const porcentajeVidaEnemigo = (vidaEnemigoMostrar / personajes[enemigoAleatorio].vida) * 100;

    // Actualizar la barra de vida del jugador
    barraVidaJugador.style.width = Math.max(porcentajeVidaJugador, 0) + '%';
    barraVidaJugador.textContent = Math.round(vidaJugadorMostrar);

    // Actualizar la barra de vida del enemigo
    barraVidaEnemigo.style.width = Math.max(porcentajeVidaEnemigo, 0) + '%';
    barraVidaEnemigo.textContent = Math.round(vidaEnemigoMostrar);
}

function comprobarVida() {
    const popup_cambioPartida = document.getElementById('popup_cambioPartida');
    const parrafo_cambio = document.getElementById('parrafo_cambio');

    // Actualizar las barras de vida antes de verificar
    actualizarBarrasDeVida();

    // Verificar si alguien ha ganado o perdido
    if (vidaJugador <= 0) {
        parrafo_cambio.innerHTML = "HAS PERDIDO😭😭<br>REINICIANDO PARTIDA";
        popup_cambioPartida.classList.add('show', 'pierde');
        setTimeout(() => {
            popup_cambioPartida.classList.remove('show');
            reiniciarJuego();
        }, 3500);
    } else if (vidaEnemigo <= 0) {
        parrafo_cambio.innerHTML = "HAS GANADO🎉🎉<br>REINICIANDO PARTIDA";
        popup_cambioPartida.classList.add('show', 'gana');
        setTimeout(() => {
            popup_cambioPartida.classList.remove('show');
            reiniciarJuego();
        }, 2000);
    }
}

function reiniciarJuego() {
    window.location.href = '../paginas/juego.html';
}
