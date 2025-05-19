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
    document.getElementById('months').textContent = months < 10 ? '0' + months : months;
    document.getElementById('days').textContent = days < 10 ? '0' + days : days;
  }
  
  // Actualizar la cuenta regresiva cada día
  setInterval(updateCountdown, 3600000); // Cada hora
  
  // Llamamos inicialmente al cargar la página
  updateCountdown();

  // Animación mejorada de elementos al hacer scroll
  const fadeElements = document.querySelectorAll('.fade-in-scroll');
  const giftSection = document.querySelector('.textGifts');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Punto en que el elemento se vuelve visible
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
        // Añadir clase "transition-smooth" para dispositivos móviles
        if (window.innerWidth <= 768) {
          element.classList.add('transition-smooth');
        }
      }
    });
    
    // Revelación de la sección de regalo
    if (giftSection) {
      const giftSectionTop = giftSection.getBoundingClientRect().top;
      if (giftSectionTop < window.innerHeight - 100) {
        giftSection.classList.add('active');
      }
    }
  }
  
  // Activar animación de transición suave entre secciones
  function addTransitionToSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 50) {
        section.style.opacity = "1";
      } else {
        section.style.opacity = "0.8";
      }
    });
  }
  
  window.addEventListener('scroll', function() {
    checkFade();
    addTransitionToSections();
  });
  
  // Agregar efecto inicial a las secciones
  document.querySelectorAll('section').forEach(section => {
    section.style.transition = "opacity 0.8s ease";
  });
  
  checkFade(); // Verificar elementos visibles al cargar la página
  
  // Agregar animación al hacer hover en el itinerario
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const content = this.querySelector('.timeline-content');
      content.style.transform = 'translateY(-5px)';
      content.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      const content = this.querySelector('.timeline-content');
      content.style.transform = 'translateY(0)';
    });
  });
  
  // Animación especial para enlaces a hoteles
  const hotelLinks = document.querySelectorAll('.hotel-links a');
  
  hotelLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1) rotate(5deg)';
        img.style.transition = 'transform 0.3s ease';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
});