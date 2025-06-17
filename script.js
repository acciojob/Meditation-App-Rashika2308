document.addEventListener('DOMContentLoaded', function () {
  const soundButtons = document.querySelectorAll('.sound-btn');
  const timeButtons = document.querySelectorAll('.time-btn');
  const timeDisplay = document.querySelector('.time-display');
  const playButton = document.querySelector('.play-btn');
  const videoElement = document.getElementById('background-video');

  const beachAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-ambient-1208.mp3');
  const rainAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-rain-ambience-1243.mp3');

  beachAudio.loop = true;
  rainAudio.loop = true;

  let currentSound = 'beach';
  let selectedTime = 10 * 60;
  let timer = null;
  let isPlaying = false;
  let remainingTime = selectedTime;

  videoElement.src = 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4';

  soundButtons.forEach(button => {
    button.addEventListener('click', function () {
      soundButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentSound = this.dataset.sound;

      if (currentSound === 'beach') {
        videoElement.src = 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4';
        beachAudio.play();
        rainAudio.pause();
      } else {
        videoElement.src = 'https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-a-window-4394-large.mp4';
        rainAudio.play();
        beachAudio.pause();
      }

      if (isPlaying) {
        if (currentSound === 'beach') {
          beachAudio.play();
          rainAudio.pause();
        } else {
          rainAudio.play();
          beachAudio.pause();
        }
      }
    });
  });

  timeButtons.forEach(button => {
    button.addEventListener('click', function () {
      timeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      let minutes = this.id === 'smaller-mins' ? 2 : this.id === 'medium-mins' ? 5 : 10;
      selectedTime = minutes * 60;
      remainingTime = selectedTime;
      updateTimeDisplay();
    });
  });

  playButton.addEventListener('click', function () {
    if (isPlaying) {
      pauseMeditation();
    } else {
      startMeditation();
    }
  });

  function startMeditation() {
    isPlaying = true;
    playButton.innerHTML = '<i class="fas fa-pause"></i>';

    currentSound === 'beach' ? beachAudio.play() : rainAudio.play();

    timer = setInterval(() => {
      remainingTime--;
      updateTimeDisplay();

      if (remainingTime <= 0) {
        clearInterval(timer);
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        beachAudio.pause();
        rainAudio.pause();
        remainingTime = selectedTime;
        updateTimeDisplay();
        alert('Meditation session completed!');
      }
    }, 1000);
  }

  function pauseMeditation() {
    isPlaying = false;
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    beachAudio.pause();
    rainAudio.pause();
    clearInterval(timer);
  }

  function updateTimeDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  updateTimeDisplay();
});

