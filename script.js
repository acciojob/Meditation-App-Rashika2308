const timeButtons = document.querySelectorAll('.time-select button');
const playButton = document.querySelector('.play');
const beachAudio = document.querySelector('.beach-audio');
const rainAudio = document.querySelector('.rain-audio');
const soundPicker = document.querySelectorAll('.sound-picker button');
const timeDisplay = document.querySelector('.time-display');

let selectedTime = 600; // default 10 mins
let remainingTime = selectedTime;
let timer;
let isPlaying = false;
let currentSound = 'beach';

function updateTimeDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

function updateTimer() {
  if (remainingTime <= 0) {
    clearInterval(timer);
    isPlaying = false;
    playButton.textContent = '▶️';
    beachAudio.pause();
    rainAudio.pause();
    remainingTime = selectedTime;
    updateTimeDisplay();
    alert('Meditation session completed!');
    return;
  }

  remainingTime--;
  updateTimeDisplay();
}

function startMeditation() {
  isPlaying = true;
  playButton.textContent = '⏸️';

  const sound = currentSound === 'beach' ? beachAudio : rainAudio;
  sound.currentTime = 0;
  const playPromise = sound.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        timer = setInterval(updateTimer, 1000);
      })
      .catch((e) => {
        console.error("Audio playback failed:", e);
      });
  }

  updateTimeDisplay();
}

function pauseMeditation() {
  isPlaying = false;
  playButton.textContent = '▶️';
  clearInterval(timer);
  beachAudio.pause();
  rainAudio.pause();
}

playButton.addEventListener('click', () => {
  if (!isPlaying) {
    startMeditation();
  } else {
    pauseMeditation();
  }
});

timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedTime = parseInt(button.getAttribute('data-time'));
    remainingTime = selectedTime;
    updateTimeDisplay();

    if (isPlaying) {
      pauseMeditation();
    }
  });
});

soundPicker.forEach(button => {
  button.addEventListener('click', () => {
    currentSound = button.getAttribute('data-sound');
    if (isPlaying) {
      pauseMeditation();
      startMeditation();
    }
  });
});

// Initial display
updateTimeDisplay();
