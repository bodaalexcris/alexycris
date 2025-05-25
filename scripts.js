document.addEventListener('DOMContentLoaded', function() {
  // Control de la música de fondo
  const bgMusic = document.getElementById('bg-music');
  const playButton = document.getElementById('play-music');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const timeline = document.getElementById('timeline');
  const timelineContainer = document.getElementById('timeline-container');
  const duration = document.getElementById('duration');
  
  let hasUserScrolled = false;
  let audioTriggered = false;
  
  // Función para reproducir la música
  function playMusic() {
    if (audioTriggered || !bgMusic) return; // Evitar múltiples intentos
    
    audioTriggered = true;
    
    bgMusic.play()
      .then(() => {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'inline';
        if (playButton) playButton.setAttribute('aria-label', 'Pausar música');
        localStorage.setItem('musicPreference', 'enabled');
      })
      .catch(error => {
        console.error("Error al reproducir música:", error);
        if (playIcon) playIcon.style.display = 'inline';
        if (pauseIcon) pauseIcon.style.display = 'none';
        audioTriggered = false; // Permitir reintentos
      });
  }
  
  // Actualizar la barra de progreso - Solo si los elementos existen
  if (bgMusic && timeline) {
    bgMusic.addEventListener('timeupdate', function() {
      const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
      timeline.style.width = percent + '%';
    });
  }
  
  // Cuando el audio está listo, establecer la duración
  if (bgMusic && duration) {
    bgMusic.addEventListener('loadedmetadata', function() {
      const mins = Math.floor(bgMusic.duration / 60);
      const secs = Math.floor(bgMusic.duration % 60);
      duration.textContent = 
        (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    });
  }
  
  // Permitir clic en la línea de tiempo para cambiar la posición
  if (timelineContainer && bgMusic) {
    timelineContainer.addEventListener('click', function(e) {
      const rect = timelineContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      bgMusic.currentTime = pos * bgMusic.duration;
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
  if (playButton && bgMusic) {
    playButton.addEventListener('click', function() {
      if (bgMusic.paused) {
        playMusic();
      } else {
        bgMusic.pause();
        if (playIcon) playIcon.style.display = 'inline';
        if (pauseIcon) pauseIcon.style.display = 'none';
        playButton.setAttribute('aria-label', 'Reproducir música');
      }
    });
  }

  // Cuenta regresiva
  const weddingDate = new Date('December 6, 2025 00:00:00');
  const startDate = new Date('May 21, 2024 00:00:00');

  function updateCountdown() {
    const now = new Date();
    
    // Elementos del DOM necesarios
    const monthsElem = document.getElementById('months');
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const progressDot = document.getElementById('progress-dot');
    
    // Verificar que todos los elementos existen
    if (!monthsElem || !daysElem || !hoursElem || !minutesElem) {
      console.warn("Algunos elementos de la cuenta regresiva no encontrados");
      return;
    }
    
    // Si la fecha ya pasó
    if (now >= weddingDate) {
      monthsElem.textContent = '00';
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      if (progressDot) progressDot.style.left = '100%';
      return;
    }

    // Calcular diferencia de tiempo
    const diff = weddingDate.getTime() - now.getTime();
    
    // Cálculo de meses (aproximado)
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.436));
    
    // Cálculo de días restantes después de restar los meses
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.436)) / (1000 * 60 * 60 * 24));
    
    // Calcular horas y minutos
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    // Actualizar los elementos en el DOM
    monthsElem.textContent = months < 10 ? '0' + months : months;
    daysElem.textContent = days < 10 ? '0' + days : days;
    hoursElem.textContent = hours < 10 ? '0' + hours : hours;
    minutesElem.textContent = minutes < 10 ? '0' + minutes : minutes;
    
    // Actualizar la posición del punto en la línea de progreso
    if (progressDot) {
      const totalDuration = weddingDate.getTime() - startDate.getTime();
      const elapsedTime = now.getTime() - startDate.getTime();
      const progressPercentage = Math.min(100, (elapsedTime / totalDuration) * 100);
      progressDot.style.left = progressPercentage + '%';
    }
  }
  

  // Iniciar el contador si los elementos existen
  if (document.getElementById('countdown')) {
    // Actualizar la cuenta regresiva cada segundo para que sea más precisa
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }
  
  // Animación de elementos al hacer scroll
  const fadeElements = document.querySelectorAll('.fade-in-scroll');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 250; // Punto en que el elemento se vuelve visible
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkFade);
  checkFade(); // Verificar elementos visibles al cargar la página
});