const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const title = document.getElementById("track-title");

const playlist = [
    { src: "song.mp3" },
    { src: "song2.mp3" },
  ];
  

let currentTrack = 0;

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
  
    // Automatically set title from file name (remove .mp3)
    const cleanTitle = track.src.replace(".mp3", "").replace(/[-_]/g, " ");
    title.textContent = cleanTitle;
  }
  

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

document.getElementById("prev").addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.textContent = "⏸";
});

document.getElementById("next").addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.textContent = "⏸";
});

const volumeSlider = document.getElementById("volume");

// Set initial volume
audio.volume = volumeSlider.value;

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});


// Load first track
loadTrack(currentTrack);
