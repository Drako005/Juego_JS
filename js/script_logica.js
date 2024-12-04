// Pantalla de carga
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



