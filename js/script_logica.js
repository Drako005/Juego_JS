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
            { img: '../fotos/espada_daño.png', alt: 'La Fórmula', accion: 'ataque1ozuna'},
            { img: '../fotos/corazon_vida.png', alt: 'Moraleja', accion: 'ataque2ozuna'},
            { img: '../fotos/espada_daño.png', alt: 'Negrito Ojos Claros', accion: 'ataque3ozuna'},
            { img: '../fotos/corazon_vida.png', alt: 'Frase Filosófica', accion: 'ataque4ozuna'}
        ]
    },
    shrek: {
        imagen: '../fotos/shrek_elegir.png',
        nombre: "Shrek",
        vida: 150,
        habilidades: [
            { img: '../fotos/espada_daño.png', alt: 'Huevo Duro', accion: 'ataque1shrek'},
            { img: '../fotos/corazon_vida.png', alt: 'Graznido de Asno', accion: 'ataque2shrek'},
            { img: '../fotos/espada_daño.png', alt: 'Eructo Mortal', accion: 'ataque3shrek'},
            { img: '../fotos/corazon_vida.png', alt: 'Baño en la Ciénaga', accion: 'ataque4shrek'}
        ]
    },
    pablo: {
        imagen: '../fotos/pablo_elegir.png',
        nombre: "Pablo Motos",
        vida: 125,
        habilidades: [
            { img: '../fotos/espada_daño.png', alt: 'Ataque Yoga', accion: 'ataque1pablo'},
            { img: '../fotos/corazon_vida.png', alt: 'Pregunta Incómoda', accion: 'ataque2pablo'},
            { img: '../fotos/espada_daño.png', alt: 'Experimento Explosivo', accion: 'ataque3pablo'},
            { img: '../fotos/corazon_vida.png', alt: 'Trancas y Barrancas', accion: 'ataque4pablo'}
        ]
    },
    walter: {
        imagen: '../fotos/walter_elegir.png',
        nombre: "Walter",
        vida: 100,
        habilidades: [
            { img: '../fotos/espada_daño.png', alt: 'Ataque Cristal', accion: 'ataque1walter'},
            { img: '../fotos/corazon_vida.png', alt: 'Ataque Gorro', accion: 'ataque2walter'},
            { img: '../fotos/espada_daño.png', alt: 'Mirada Penetrante', accion: 'ataque3walter'},
            { img: '../fotos/corazon_vida.png', alt: 'Descanso en la Caravana', accion: 'ataque4walter'}
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


btnAtacar.addEventListener('click', function() {
    if (habilidadSeleccionada) {
        ejecutarAccion(habilidadSeleccionada.accion); // Ejecuta el ataque del jugador
        const enemigo = personajes[enemigoAleatorio];

        if (enemigo) {
            // Elegimos una habilidad al azar de las habilidades del enemigo
            let habilidadRandom = enemigo.habilidades[
                Math.floor(Math.random() * enemigo.habilidades.length)
                
            ];
            // Ejecutamos esa habilidad seleccionada al azar
            ejecutarRespuesta(habilidadRandom.accion);
            turnos++;
            // Añadimos el ataque del enemigo al log
            document.getElementById('logBatalla').innerHTML += 
                    "Turno "+turnos+"\n"+
                    personajes[personaje].nombre+": "+habilidadSeleccionada.alt+"\n"+
                    personajes[enemigoAleatorio].nombre+": "+habilidadRandom.alt+"\n\n";
                    const logBatalla = document.getElementById('logBatalla');
                    logBatalla.scrollTop = logBatalla.scrollHeight;
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
    let probabilidad = Math.random();
    switch(accion){
        //REVISAR VARIABLE PROBABILIDAD POR FALLOS CON LOS ATAQUES 2 DE TODOS MENOS OZUNA
        //OZUNA ATAQUES
        case 'ataque1ozuna':
            vidaEnemigo -= 15;
        break;
        case 'ataque2ozuna':
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.25) {
                vidaEnemigo -= 10;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3ozuna':
            vidaEnemigo -= (vidaEnemigo * 0.17);
        break;
        case 'ataque4ozuna':
            vidaJugador += (100 - vidaJugador)*0.3;
        break;

        //SHREK ATAQUES
        case 'ataque1shrek':
            vidaEnemigo -= 15;
            break;
        case 'ataque2shrek':
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.20) {
                vidaEnemigo -= 10;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3shrek':
            vidaEnemigo -= (vidaEnemigo * 0.13);
        break;
        case 'ataque4shrek':
            vidaJugador += (150 - vidaJugador)*0.2;
        break;

        //PABLO ATAQUES
        case 'ataque1pablo':
            vidaEnemigo -= 15;
            break;
        case 'ataque2pablo':
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.22) {
                vidaEnemigo -= 10;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3pablo':
            vidaEnemigo -= (vidaEnemigo * 0.15);
        break;
        case 'ataque4pablo':
            vidaJugador += (125 - vidaJugador)*0.25;
        break;

        //WALTER ATAQUES
        case 'ataque1walter':
            vidaEnemigo -= 15;
            break;
        case 'ataque2walter':
            vidaEnemigo -= 10;
            probabilidad = Math.random();
            if (probabilidad <= 0.30) {
                vidaEnemigo -= 12;
                alert("¡Golpe crítico! Hiciste 10 puntos adicionales de daño.");
            }
        break;
        case 'ataque3walter':
            vidaEnemigo -= (vidaEnemigo * 0.18);
        break;
        case 'ataque4walter':
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

    // Calcular el porcentaje de vida para el jugador y el enemigo
    const porcentajeVidaJugador = (vidaJugador / personajes[localStorage.getItem('personajeSeleccionado')].vida) * 100;
    const porcentajeVidaEnemigo = (vidaEnemigo / personajes[enemigoAleatorio].vida) * 100;

    // Actualizar la barra de vida del jugador
    barraVidaJugador.style.width = porcentajeVidaJugador + '%';
    barraVidaJugador.textContent = Math.round(vidaJugador);

    // Actualizar la barra de vida del enemigo
    barraVidaEnemigo.style.width = porcentajeVidaEnemigo + '%';
    barraVidaEnemigo.textContent = Math.round(vidaEnemigo);
}

function comprobarVida(){
     // Verificar si alguien ha ganado o perdido
     if (vidaJugador <= 0) {
        alert("¡Has perdido! El jugador ha muerto.");
        reiniciarJuego(); // Opcional: reinicia el juego
    } else if (vidaEnemigo <= 0) {
        alert("¡Has ganado! El enemigo ha muerto.");
        reiniciarJuego(); // Opcional: reinicia el juego
    }
}

function reiniciarJuego() {
    window.location.href = '../paginas/juego.html';
}
