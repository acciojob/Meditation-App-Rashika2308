window.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.querySelector('.play');
  const timeDisplay = document.querySelector('.time-display');
  const soundButtons = document.querySelectorAll('.sound-btn');
  const video = document.getElementById('background-video');
  const beachAudio = document.getElementById('beach-audio');
  const rainAudio = document.getElementById('rain-audio');

  const timeButtons = {
    'smaller-mins': 2 * 60,
    'medium-mins': 5 * 60,
    'long-mins': 10 * 60,
  };

  let currentSound = 'beach';
  let duration = 600;
  let currentTime = duration;
  let timer;
  let isPlaying = false;

  updateDisplay(currentTime);

  // Time selection
  Object.keys(timeButtons).forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
      duration = timeButtons[id];
      currentTime = duration;
      updateDisplay(currentTime);
    });
  });

  // Sound selection
  soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      soundButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSound = btn.id;
      switchVideoAndAudio();
    });
  });

  function switchVideoAndAudio() {
    if (currentSound === 'beach') {
      video.src = 'Sounds/beach.mp4';
      beachAudio.play();
      rainAudio.pause();
    } else {
      video.src = 'Sounds/rain.mp4';
      rainAudio.play();
      beachAudio.pause();
    }
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseMeditation();
    } else {
      startMeditation();
    }
  });

  function startMeditation() {
    isPlaying = true;
    playBtn.textContent = '⏸️';
    switchVideoAndAudio();
    timer = setInterval(() => {
      currentTime--;
      updateDisplay(currentTime);

      if (currentTime <= 0) {
        pauseMeditation();
        currentTime = duration;
        updateDisplay(currentTime);
      }
    }, 1000);
  }

  function pauseMeditation() {
    isPlaying = false;
    playBtn.textContent = '▶️';
    clearInterval(timer);
    beachAudio.pause();
    rainAudio.pause();
  }

  function updateDisplay(time) {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    timeDisplay.textContent = `${mins}:${secs}`;
  }
});
