const timeButtons = document.querySelectorAll('.time-select button');
const playButton = document.querySelector('.play');
const beachAudio = document.querySelector('.beach-audio');
const rainAudio = document.querySelector('.rain-audio');
const soundPicker = document.querySelectorAll('.sound-picker button');
const timeDisplay = document.querySelector('.time-display');

let selectedTime = 600; // 10 mins default
let remainingTime = selectedTime;
let timer = null;
let isPlaying = false;
let currentSound = 'beach';
let currentAudio = beachAudio;

// Update display
function updateTimeDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Timer update
function updateTimer() {
  if (remainingTime <= 0) {
    pauseMeditation();
    remainingTime = selectedTime;
    updateTimeDisplay();
    return;
  }
  remainingTime--;
  updateTimeDisplay();
}

// Check if audio is playing (for Cypress)
window.isAudioPlaying = function () {
  return !currentAudio.paused && currentAudio.currentTime > 0;
};

// Start session
function startMeditation() {
  isPlaying = true;
  playButton.textContent = '⏸️';
  currentAudio.currentTime = 0;

  currentAudio.play().then(() => {
    updateTimer(); // Immediate update for Cypress
    timer = setInterval(updateTimer, 1000);
  }).catch(err => {
    console.error("Audio play error:", err);
  });
}

// Pause session
function pauseMeditation() {
  isPlaying = false;
  playButton.textContent = '▶️';
  clearInterval(timer);
  currentAudio.pause();
}

// Click handlers
playButton.addEventListener('click', () => {
  if (isPlaying) {
    pauseMeditation();
  } else {
    startMeditation();
  }
});

timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedTime = parseInt(button.dataset.time);
    remainingTime = selectedTime;
    updateTimeDisplay();
    if (isPlaying) pauseMeditation();
  });
});

soundPicker.forEach(button => {
  button.addEventListener('click', () => {
    const sound = button.dataset.sound;
    currentAudio.pause();
    currentAudio = sound === 'rain' ? rainAudio : beachAudio;
    currentSound = sound;

    if (isPlaying) {
      pauseMeditation();
      startMeditation();
    }
  });
});

// Init display
updateTimeDisplay();
