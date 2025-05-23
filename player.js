// Audio player functionality
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.querySelector('.progress');
const currentTimeSpan = document.querySelector('.current-time');
const totalTimeSpan = document.querySelector('.total-time');
const volumeSlider = document.getElementById('volumeSlider');
const songTitle = document.querySelector('.song-title');
const artistName = document.querySelector('.artist');

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update progress bar and time
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
});

// Update total time when metadata is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeSpan.textContent = formatTime(audioPlayer.duration);
});

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶';
    }
});

// Volume slider control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioPlayer.volume = volume;
});

// Progress bar click to seek
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = pos * audioPlayer.duration;
});

// Create vertices
const vertices = [];
const vertexGeometry = new THREE.SphereGeometry(0.1, 8, 8);
const vertexMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.2  // Match the edge opacity
}); 