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
        vida: 90,
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
        vida: 130,
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
        vida: 110,
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
        vida: 75,
        habilidades: [
            { img: '../fotos/espada_daño.png', alt: 'Ataque Cristal', accion: 'ataque1walter'},
            { img: '../fotos/corazon_vida.png', alt: 'Ataque Gorro', accion: 'ataque2walter'},
            { img: '../fotos/espada_daño.png', alt: 'Mirada Penetrante', accion: 'ataque3walter'},
            { img: '../fotos/corazon_vida.png', alt: 'Descanso en la Caravana', accion: 'ataque4walter'}
        ]
    }
};
  window.addEventListener('load', function() {
    const personaje = localStorage.getItem('personajeSeleccionado');
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
    const personajesArray = Object.keys(personajes);
    let enemigoAleatorio = personajesArray[Math.floor(Math.random() * personajesArray.length)];

    while (enemigoAleatorio === personaje) {
        enemigoAleatorio = personajesArray[Math.floor(Math.random() * personajesArray.length)];
    }

    const imgEnemigo = document.querySelector('.fotoEnemigo');
    const h2Enemigo = document.querySelector('.nombreEnemigo');
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
        ejecutarAccion(habilidadSeleccionada.accion); 
    } else {
        alert("Por favor, selecciona un ataque primero.");
    }
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
    switch(accion){
        //OZUNA ATAQUES
        case 'ataque1ozuna':
            vidaEnemigo -= 10;
            
            break;
        case 'ataque2ozuna':
        alert("ataque 2 ozuna");
        break;

        case 'ataque3ozuna':
        alert("ataque 3 ozuna");
        break;

        case 'ataque4ozuna':
        alert("ataque 4 ozuna");
        break;

        //SHREK ATAQUES
        case 'ataque1shrek':
            alert("ataque 1 shrek");
            break;
        case 'ataque2shrek':
        alert("ataque 2 shrek");
        break;

        case 'ataque3shrek':
        alert("ataque 3 shrek");
        break;

        case 'ataque4shrek':
        alert("ataque 4 shrek");
        break;

        //PABLO ATAQUES
        case 'ataque1pablo':
            alert("ataque 1 pablo");
            break;
        case 'ataque2pablo':
        alert("ataque 2 pablo");
        break;

        case 'ataque3pablo':
        alert("ataque 3 pablo");
        break;

        case 'ataque4pablo':
        alert("ataque 4 pablo");
        break;

        //WALTER ATAQUES
        case 'ataque1walter':
            alert("ataque 1 walter");
            break;
        case 'ataque2walter':
        alert("ataque 2 walter");
        break;

        case 'ataque3walter':
        alert("ataque 3 walter");
        break;

        case 'ataque4walter':
        alert("ataque 4 walter");
        break;
    }
    actualizarBarrasDeVida();
  }

function actualizarBarrasDeVida() {
    const barraVidaJugador = document.querySelector('#nivel-vida-personaje'); // Barra del jugador
    const barraVidaEnemigo = document.querySelector('#nivel-vida-enemigo');   // Barra del enemigo

    // Actualizar la barra del jugador
    barraVidaJugador.style.width = Math.max(0, vidaJugador) + '%';
    barraVidaJugador.textContent = Math.max(0, vidaJugador);

    // Actualizar la barra del enemigo
    barraVidaEnemigo.style.width = Math.max(0, vidaEnemigo) + '%';
    barraVidaEnemigo.textContent = Math.max(0, vidaEnemigo);

    // Verificar condiciones de victoria/derrota
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

