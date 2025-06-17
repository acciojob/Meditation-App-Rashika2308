// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const soundButtons = document.querySelectorAll('.sound-btn');
    const timeButtons = document.querySelectorAll('.time-btn');
    const timeDisplay = document.querySelector('.time-display');
    const playButton = document.querySelector('.play-btn');
    const videoElement = document.getElementById('background-video');
    const playIcon = playButton.querySelector('.play-icon');
    
    // Audio elements
    const beachAudio = document.getElementById('beach-audio');
    const rainAudio = document.getElementById('rain-audio');
    
    // Set audio sources
    beachAudio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-ambient-1208.mp3';
    rainAudio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-rain-ambience-1243.mp3';
    
    // Set initial video
    videoElement.src = 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4';
    
    // Current state
    let currentSound = 'beach';
    let selectedTime = 10 * 60; // 10 minutes in seconds
    let timer = null;
    let isPlaying = false;
    let remainingTime = selectedTime;
    
    // Sound selection
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update UI
            soundButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Change sound
            currentSound = this.dataset.sound;
            
            // Change video
            if (currentSound === 'beach') {
                videoElement.src = 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4';
            } else {
                videoElement.src = 'https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-a-window-4394-large.mp4';
            }
            
            // Update audio if playing
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
    
    // Time selection
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update UI
            timeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get time in minutes
            let minutes;
            if (this.id === 'smaller-mins') {
                minutes = 2;
            } else if (this.id === 'medium-mins') {
                minutes = 5;
            } else {
                minutes = 10;
            }
            
            selectedTime = minutes * 60;
            remainingTime = selectedTime;
            
            // Update display
            updateTimeDisplay();
        });
    });
    
    // Play/Pause button
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            // Pause meditation
            pauseMeditation();
        } else {
            // Start meditation
            startMeditation();
        }
    });
    
    // Start meditation
    function startMeditation() {
        isPlaying = true;
        playIcon.textContent = '⏸️';
        
        // Play sound
        if (currentSound === 'beach') {
            beachAudio.play();
        } else {
            rainAudio.play();
        }
        
        // Start timer
        timer = setInterval(() => {
            remainingTime--;
            updateTimeDisplay();
            
            // Check if time is up
            if (remainingTime <= 0) {
                clearInterval(timer);
                isPlaying = false;
                playIcon.textContent = '▶️';
                beachAudio.pause();
                rainAudio.pause();
                remainingTime = selectedTime;
                updateTimeDisplay();
                alert('Meditation session completed!');
            }
        }, 1000);
    }
    
    // Pause meditation
    function pauseMeditation() {
        isPlaying = false;
        playIcon.textContent = '▶️';
        
        // Pause sound
        beachAudio.pause();
        rainAudio.pause();
        
        // Pause timer
        clearInterval(timer);
    }
    
    // Update time display
    function updateTimeDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        // Display seconds without leading zero as required by tests
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }
});