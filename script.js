const playBtn = document.getElementById('play-icon');
const beachAudio = document.getElementById('beach');
const rainAudio = document.getElementById('rain');
const video = document.getElementById('bg-video');
const timeDisplay = document.querySelector('.time-display');

const timeButtons = {
  'smaller-mins': 2,
  'medium-mins': 5,
  'long-mins': 10,
};

let currentAudio = beachAudio;
let duration = 600;
let countdown;
let isPlaying = false;

// Time select logic
for (let id in timeButtons) {
  document.getElementById(id).addEventListener('click', () => {
    duration = timeButtons[id] * 60;
    timeDisplay.textContent = `${timeButtons[id]}:0`;
    stopAll();
  });
}

// Play/Pause logic
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    playMeditation();
  } else {
    pauseMeditation();
  }
});

function playMeditation() {
  isPlaying = true;
  currentAudio.play();
  playBtn.src = 'https://img.icons8.com/ios-filled/50/pause--v1.png';

  let time = duration;
  countdown = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timeDisplay.textContent = `${min}:${sec}`;
    time--;

    if (time < 0) {
      clearInterval(countdown);
      stopAll();
    }
  }, 1000);
}

function pauseMeditation() {
  isPlaying = false;
  currentAudio.pause();
  playBtn.src = 'https://img.icons8.com/ios-filled/50/play--v1.png';
  clearInterval(countdown);
}

function stopAll() {
  pauseMeditation();
  beachAudio.pause();
  beachAudio.currentTime = 0;
  rainAudio.pause();
  rainAudio.currentTime = 0;
}

// Sound picker logic
document.getElementById('beach-sound').addEventListener('click', () => {
  currentAudio.pause();
  currentAudio = beachAudio;
  video.src = 'Sounds/beach.mp4';
  if (isPlaying) currentAudio.play();
});

document.getElementById('rain-sound').addEventListener('click', () => {
  currentAudio.pause();
  currentAudio = rainAudio;
  video.src = 'Sounds/rain.mp4';
  if (isPlaying) currentAudio.play();
});
