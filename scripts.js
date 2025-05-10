document.addEventListener('DOMContentLoaded', function() {
  // Control de la música de fondo
  const bgMusic = document.getElementById('bg-music');
  const playButton = document.getElementById('play-music');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  
  playButton.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
      playButton.setAttribute('aria-label', 'Pausar música');
    } else {
      bgMusic.pause();
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      playButton.setAttribute('aria-label', 'Reproducir música');
    }
  });

  // Cuenta regresiva
  const weddingDate = new Date('December 6, 2025 15:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Si la fecha ya pasó
    if (distance < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days < 10 ? '0' + days : days;
    document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
  }
  
  // Actualizar la cuenta regresiva cada segundo
  setInterval(updateCountdown, 1000);
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