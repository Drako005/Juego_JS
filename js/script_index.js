// Obtener el div con el que deben chocar las bolas
const centroDiv = document.querySelector('.centro');
const container = document.querySelector('.general');

const bolaSize = 190; // Tamaño de las bolas
const numBolas = 4;  // Número de bolas

// Lista de imágenes para cada bola
const imagenes = [
    'url("fotos/walter.png")',  // Cambia por la URL de tu imagen
    'url("fotos/ozuna.png")',
    'url("fotos/pablo.png")',
    'url("fotos/shrek.png")'
];

const bolas = [];

// Función que inicializa las posiciones de las bolas después de cargar el DOM
function inicializarBolas() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Posiciones iniciales en las esquinas del contenedor
    const posicionesIniciales = [
        { x: 0, y: 0 }, // Esquina superior izquierda
        { x: containerWidth - bolaSize, y: 0 }, // Esquina superior derecha
        { x: 0, y: containerHeight - bolaSize }, // Esquina inferior izquierda
        { x: containerWidth - bolaSize, y: containerHeight - bolaSize } // Esquina inferior derecha
    ];

    for (let i = 0; i < numBolas; i++) {
        const bola = document.createElement('div');
        bola.classList.add('bola');
        bola.style.backgroundImage = imagenes[i]; // Asignar imagen de fondo a cada bola
        bola.style.backgroundSize = 'cover';      // Ajustar tamaño de la imagen
        bola.style.backgroundPosition = 'center'; // Centrar la imagen en la bola
        container.appendChild(bola);

        // Configurar posición inicial desde posicionesIniciales y velocidad inicial aleatoria
        bolas.push({
            elemento: bola,
            x: posicionesIniciales[i].x,
            y: posicionesIniciales[i].y,
            velocidadX: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2),
            velocidadY: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2)
        });
    }

    // Iniciar el movimiento después de inicializar
    moverBolas();
}

// Función para verificar si dos bolas están colisionando
function verificarColision(bola1, bola2) {
    const dx = bola1.x - bola2.x;
    const dy = bola1.y - bola2.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    return distancia < bolaSize;
}

// Función para manejar la colisión entre dos bolas
function manejarColision(bola1, bola2) {
    // Intercambiar las velocidades de las bolas en caso de colisión
    const tempVelocidadX = bola1.velocidadX;
    const tempVelocidadY = bola1.velocidadY;

    bola1.velocidadX = bola2.velocidadX;
    bola1.velocidadY = bola2.velocidadY;

    bola2.velocidadX = tempVelocidadX;
    bola2.velocidadY = tempVelocidadY;
}

// Función que mueve las bolas y las hace rebotar al chocar con los divs o entre sí
function moverBolas() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const centroPos = obtenerPosicionElemento(centroDiv);

    bolas.forEach((bola, i) => {
        // Mover la bola
        bola.x += bola.velocidadX;
        bola.y += bola.velocidadY;

        // Comprobar si la bola ha llegado a los bordes del contenedor
        if (bola.x + bolaSize > containerWidth || bola.x < 0) {
            bola.velocidadX = -bola.velocidadX;
        }
        if (bola.y + bolaSize > containerHeight || bola.y < 0) {
            bola.velocidadY = -bola.velocidadY;
        }

        // Comprobar si la bola ha chocado con el div centro
        if (
            bola.x + bolaSize > centroPos.left &&
            bola.x < centroPos.right &&
            bola.y + bolaSize > centroPos.top &&
            bola.y < centroPos.bottom
        ) {
            bola.velocidadX = -bola.velocidadX;
            bola.velocidadY = -bola.velocidadY;
        }

        // Comprobar colisiones entre bolas
        for (let j = i + 1; j < bolas.length; j++) {
            if (verificarColision(bola, bolas[j])) {
                manejarColision(bola, bolas[j]);
            }
        }

        // Aplicar las nuevas posiciones a la bola
        bola.elemento.style.left = `${bola.x}px`;
        bola.elemento.style.top = `${bola.y}px`;
    });

    // Llamar a la siguiente actualización
    requestAnimationFrame(moverBolas);
}

// Obtener la posición y dimensiones de un elemento
function obtenerPosicionElemento(elemento) {
    const rect = elemento.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
    };
}

// Inicializar las bolas cuando se cargue el DOM
window.addEventListener('load', inicializarBolas);





// Pantalla de carga
document.getElementById('boton').addEventListener('click', function(event) {
    event.preventDefault();  
  
    document.getElementById('loading-screen').style.display = 'flex';
  
    setTimeout(function() {
      window.location.href = 'paginas/personajes.html';
    }, 1000);
  });
  // Pantalla de carga FIN
  