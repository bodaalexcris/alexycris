// Reproducción de música manual
const playButton = document.getElementById('play-music');
const bgMusic = document.getElementById('bg-music');

playButton.addEventListener('click', () => {
  bgMusic.play();
  playButton.style.display = 'none';
});

// Countdown hasta la boda
const countdown = document.getElementById('countdown');
const weddingDate = new Date('2025-12-06T15:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdown.innerText = '¡Ya llegó el gran día!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerText = `${days} días, ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
