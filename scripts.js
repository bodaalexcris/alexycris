document.addEventListener('DOMContentLoaded', function() {
  // Control de la música de fondo
  const bgMusic = document.getElementById('bg-music');
  const playButton = document.getElementById('play-music');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  
  let hasUserScrolled = false;
  let audioTriggered = false;
  
  // Función para reproducir la música
  function playMusic() {
    if (audioTriggered) return; // Evitar múltiples intentos
    
    audioTriggered = true;
    
    bgMusic.play()
      .then(() => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        playButton.setAttribute('aria-label', 'Pausar música');
        localStorage.setItem('musicPreference', 'enabled');
      })
      .catch(error => {
        console.error("Error al reproducir música:", error);
        // Si aún falla, mostramos el botón de reproducción tradicional
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        audioTriggered = false; // Permitir reintentos
      });
  }
  
  // Detectar cuando el usuario comienza a desplazarse
  window.addEventListener('scroll', function() {
    if (!hasUserScrolled) {
      hasUserScrolled = true;
      playMusic();
    }
  });
  
  // Detectar también clics por si el usuario interactúa sin hacer scroll
  document.addEventListener('click', function() {
    if (!hasUserScrolled) {
      hasUserScrolled = true;
      playMusic();
    }
  });
  
  // Verificar si el usuario ya ha interactuado en sesiones anteriores
  const hasInteractedBefore = localStorage.getItem('musicPreference') === 'enabled';
  
  if (hasInteractedBefore) {
    // Si hay interacción previa guardada, intentamos reproducir directamente
    playMusic();
  }
  
  // Controlador de eventos para el botón de reproducción/pausa
  playButton.addEventListener('click', function() {
    if (bgMusic.paused) {
      playMusic();
    } else {
      bgMusic.pause();
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      playButton.setAttribute('aria-label', 'Reproducir música');
    }
  });

  // Cuenta regresiva simplificada (solo meses y días)
  const weddingDate = new Date('December 6, 2025 00:00:00');
  
  function updateCountdown() {
    const now = new Date();
    
    // Si la fecha ya pasó
    if (now >= weddingDate) {
      document.getElementById('months').textContent = '00';
      document.getElementById('days').textContent = '00';
      return;
    }

    // Calcular diferencia de meses
    let months = (weddingDate.getFullYear() - now.getFullYear()) * 12;
    months += weddingDate.getMonth() - now.getMonth();
    
    // Calcular los días restantes después de contar los meses completos
    const currentDate = new Date(now.getTime());
    // Simulamos avanzar los meses completos
    currentDate.setMonth(currentDate.getMonth() + months);
    
    // Si el día objetivo es menor que el día actual después de avanzar los meses,
    // entonces necesitamos restar un mes y calcular los días restantes
    let days = 0;
    if (weddingDate.getDate() < currentDate.getDate()) {
      months--;
      // Obtenemos el último día del mes anterior a la fecha de la boda
      const lastDayOfPrevMonth = new Date(
        weddingDate.getFullYear(),
        weddingDate.getMonth(),
        0
      ).getDate();
      days = lastDayOfPrevMonth - currentDate.getDate() + weddingDate.getDate();
    } else {
      days = weddingDate.getDate() - currentDate.getDate();
    }
    
    // Actualizar los elementos en el DOM
    document.getElementById('months').textContent = months < 10 ? '' + months : months;
    document.getElementById('days').textContent = days < 10 ? '0' + days : days;
  }
  
  // Actualizar la cuenta regresiva cada día
  setInterval(updateCountdown, 3600000); // Cada hora
  
  // Llamamos inicialmente al cargar la página
  updateCountdown();

  // Animación de elementos al hacer scroll
  const fadeElements = document.querySelectorAll('.fade-in-scroll');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Punto en que el elemento se vuelve visible
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkFade);
  checkFade(); // Verificar elementos visibles al cargar la página
});