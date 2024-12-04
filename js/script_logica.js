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
        }, 1000);
    });
});

  // Pantalla de carga FIN
  // LOGICA DEL JUEGO
  window.addEventListener('load', function() {
    const personaje = localStorage.getItem('personajeSeleccionado');
    const imgElemento = document.querySelector('.fotoPersonaje');
    const h2Elemento = this.document.querySelector('.nombrePersonaje');
    const titulo = this.document.querySelector('.personajesBatalla');
  
    const personajes = {
        ozuna: {
            imagen: '../fotos/ozuna_elegir.png',
            nombre: "Ozuna"
        },
        shrek: {
            imagen: '../fotos/shrek_elegir.png',
            nombre: "Shrek"
        },
        pablo: {
            imagen: '../fotos/pablo_elegir.png',
            nombre: "Pablo Motos"
        },
        walter: {
            imagen: '../fotos/walter_elegir.png',
            nombre: "Walter"
        }
    };
    
    if (personaje && personajes[personaje]) {
        imgElemento.src = personajes[personaje].imagen;
        imgElemento.alt = personaje;
        h2Elemento.innerHTML = personajes[personaje].nombre;
        
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

    // Mostrar el enemigo aleatorio
    imgEnemigo.src = personajes[enemigoAleatorio].imagen;
    imgEnemigo.alt = enemigoAleatorio;
    h2Enemigo.innerHTML = personajes[enemigoAleatorio].nombre;

    titulo.innerHTML = personajes[personaje].nombre + " VS " + personajes[enemigoAleatorio].nombre;
});

//BOTON DE ATAQUE, cambio de TEXTO
const btnAtacar = document.getElementById('botonAtacar');

btnAtacar.addEventListener('mouseover', () => {
    botonAtacar.textContent = '¡MEME!'; 
});

btnAtacar.addEventListener('mouseout', () => {
    botonAtacar.textContent = 'Atacar'; 
});



