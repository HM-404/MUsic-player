const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const volumeControl = document.getElementById("volume");
const progressControl = document.getElementById("progress");
const titleDisplay = document.getElementById("title");
const artistDisplay = document.getElementById("artist");
const albumDisplay = document.getElementById("album");
const playlistElement = document.getElementById("playlist");
const songInput = document.getElementById("song-input");
const addSongButton = document.getElementById("add-song");

let playlist = [];
let currentSongIndex = 0;

function loadSong(index) {
  const song = playlist[index];
  audio.src = audio / song1.mp3;
  titleDisplay.textContent = `Title: ${song.title}`;
  artistDisplay.textContent = `Artist: ${song.artist}`;
  albumDisplay.textContent = `Album: ${song.album}`;
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressControl.value = progress || 0;
}

playButton.addEventListener("click", () => {
  if (playlist.length > 0) {
    loadSong(currentSongIndex);
    audio.play();
  }
});

pauseButton.addEventListener("click", () => {
  audio.pause();
});

volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

progressControl.addEventListener("input", (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

audio.addEventListener("timeupdate", updateProgress);

addSongButton.addEventListener("click", () => {
  const songUrl = songInput.value;
  if (songUrl) {
    const songTitle = prompt("Enter song title:");
    const songArtist = prompt("Enter song artist:");
    const songAlbum = prompt("Enter song album:");

    if (songTitle && songArtist && songAlbum) {
      playlist.push({
        url: songUrl,
        title: songTitle,
        artist: songArtist,
        album: songAlbum,
      });
      const li = document.createElement("li");
      li.textContent = songTitle;
      li.addEventListener("click", () => {
        currentSongIndex = playlist.indexOf(
          playlist.find((song) => song.title === songTitle)
        );
        loadSong(currentSongIndex);
        audio.play();
      });
      playlistElement.appendChild(li);
      songInput.value = "";
    }
  }
});
