
const homepageImg = document.getElementById("homepage-img");
const hatImg = document.getElementById("hat-gif");

if (homepageImg) {
    const images = ["assets/homepage.png", "assets/homepage-2.png"];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        homepageImg.src = images[currentIndex];
    }, 500);
}

if (hatImg) {
    const images = ["assets/hat1.png", "assets/hat2.png"];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        hatImg.src = images[currentIndex];
    }, 500);
}

const giftBtn = document.getElementById("gift-btn");
const giftModal = document.getElementById("gift-modal");
const closeModal = document.getElementById("close-modal");
const giftVideo = document.querySelector(".gift-media");

if (giftBtn && giftModal && closeModal) {
    giftBtn.addEventListener("click", () => {
        giftModal.classList.remove("hidden");
        if (giftVideo) {
            giftVideo.currentTime = 0;
            giftVideo.play().catch(error => {
                console.log("Video playback was prevented:", error);
            });
        }
    });

    function closeGiftModal() {
        giftModal.classList.add("hidden");
        if (giftVideo) {
            giftVideo.pause();
            giftVideo.currentTime = 0;
        }
    }

    closeModal.addEventListener("click", closeGiftModal);

    window.addEventListener("click", (e) => {
        if (e.target === giftModal) {
            closeGiftModal();
        }
    });
}

// Celebration button (Confetti)
const button = document.getElementById("btn-clickme");

if (button) {
    const jsConfetti = new JSConfetti();
    button.addEventListener("click", () => {
        jsConfetti.addConfetti();
    });
}

// ---------------- MUSIC PLAYER ---------------- //

const musicNowPlaying = document.querySelector(".now-playing");
const musicTrackArt = document.querySelector(".track-art");
const musicTrackName = document.querySelector(".track-name");
const musicTrackArtist = document.querySelector(".track-artist");

const musicPlayPauseBtn = document.querySelector(".playpause-track");
const musicSeekSlider = document.querySelector(".seek_slider");
const musicVolumeSlider = document.querySelector(".volume_slider");

const musicCurrentTime = document.querySelector(".current-time");
const musicTotalDuration = document.querySelector(".total-duration");

let musicTrackIndex = 0;
let musicIsPlaying = false;
let musicUpdateTimer;

const musicAudio = new Audio();

const musicTrackList = [
    {
        name: "Savior",
        artist: "Kendrick Lamar",
        image: "assets/kendrick.png",
        path: "tracks/Savior.mp3"
    },
    {
        name: "Backseat Freestyle",
        artist: "Kendrick Lamar",
        image: "assets/good-kid.jpg",
        path: "tracks/Backseat_freestyle.mp3"
    },
    {
        name: "heart pt.6",
        artist: "Kendrick Lamar",
        image: "assets/gnx.jpg",
        path: "tracks/heart_pt_6.mp3"
    },
    {
        name: "You're down i'm down",
        artist: "WillYou Beats",
        image: "assets/yourdownimdown.png",
        path: "tracks/youredownimdown.mp3"
    },
    {
        name: "The Heart Part 5",
        artist: "Kendrick Lamar",
        image: "assets/theheartpart5.jpg",
        path: "tracks/theheartpart5.mp3"
    },
    {
        name: "Happy birthday",
        artist: "Lemon",
        image: "assets/lemonn.mp4",
        path: "tracks/lemonn.mp3"
    }
];

function isVideoFile(filePath) {
    return /\.(mp4|webm|ogg|mov)$/i.test(filePath);
}

function loadMusicTrack(index) {
    clearInterval(musicUpdateTimer);

    musicTrackIndex = index;
    musicAudio.pause();
    musicAudio.src = musicTrackList[musicTrackIndex].path;
    musicAudio.load();

    const mediaSource = musicTrackList[musicTrackIndex].image;

    if (musicTrackArt) {
        musicTrackArt.innerHTML = "";

        if (isVideoFile(mediaSource)) {
            musicTrackArt.style.backgroundImage = "none";
            const coverVideo = document.createElement("video");
            coverVideo.src = mediaSource;
            coverVideo.autoplay = false;
            coverVideo.loop = true;
            coverVideo.muted = true;
            coverVideo.playsInline = true;
            coverVideo.className = "track-art-video";
            coverVideo.style.width = "100%";
            coverVideo.style.height = "100%";
            coverVideo.style.objectFit = "cover";
            coverVideo.style.borderRadius = "inherit";
            musicTrackArt.appendChild(coverVideo);
        } else {
            musicTrackArt.style.backgroundImage = `url("${mediaSource}")`;
        }
    }

    if (musicTrackName) {
        musicTrackName.textContent = musicTrackList[musicTrackIndex].name;
    }
    if (musicTrackArtist) {
        musicTrackArtist.textContent = musicTrackList[musicTrackIndex].artist;
    }
    if (musicNowPlaying) {
        musicNowPlaying.textContent = `PLAYING ${musicTrackIndex + 1} OF ${musicTrackList.length}`;
    }

    if (musicCurrentTime) musicCurrentTime.textContent = "00:00";
    if (musicTotalDuration) musicTotalDuration.textContent = "00:00";
    if (musicSeekSlider) musicSeekSlider.value = 0;

    musicUpdateTimer = setInterval(updateMusicProgress, 1000);
}

function formatMusicTime(seconds) {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return String(minutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
}

function playpauseTrack() {
    if (musicIsPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack() {
    musicAudio.play().catch(error => {
        console.error("Music playback error:", error);
    });

    const coverVideo = musicTrackArt ? musicTrackArt.querySelector("video") : null;
    if (coverVideo) {
        coverVideo.play().catch(error => {
            console.error("Video playback error:", error);
        });
    }
}

function pauseTrack() {
    musicAudio.pause();

    const coverVideo = musicTrackArt ? musicTrackArt.querySelector("video") : null;
    if (coverVideo) {
        coverVideo.pause();
    }
}

function prevTrack() {
    if (musicTrackIndex > 0) {
        musicTrackIndex--;
    } else {
        musicTrackIndex = musicTrackList.length - 1;
    }
    loadMusicTrack(musicTrackIndex);
    playTrack();
}

function nextTrack() {
    if (musicTrackIndex < musicTrackList.length - 1) {
        musicTrackIndex++;
    } else {
        musicTrackIndex = 0;
    }
    loadMusicTrack(musicTrackIndex);
    playTrack();
}

musicAudio.addEventListener("play", () => {
    musicIsPlaying = true;
    if (musicPlayPauseBtn) {
        musicPlayPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
});

musicAudio.addEventListener("pause", () => {
    musicIsPlaying = false;
    if (musicPlayPauseBtn) {
        musicPlayPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
});

musicAudio.addEventListener("ended", () => {
    nextTrack();
});

function seekTo() {
    if (!Number.isFinite(musicAudio.duration) || !musicSeekSlider) return;
    const targetTime = musicAudio.duration * (musicSeekSlider.value / 100);
    musicAudio.currentTime = targetTime;

    const coverVideo = musicTrackArt ? musicTrackArt.querySelector("video") : null;
    if (coverVideo && Number.isFinite(coverVideo.duration)) {
        coverVideo.currentTime = targetTime % coverVideo.duration;
    }
}

function setVolume() {
    if (!musicVolumeSlider) return;
    musicAudio.volume = musicVolumeSlider.value / 100;
}

function updateMusicProgress() {
    if (!Number.isFinite(musicAudio.duration)) return;

    const progress = (musicAudio.currentTime / musicAudio.duration) * 100;
    if (musicSeekSlider) musicSeekSlider.value = progress || 0;
    if (musicCurrentTime) musicCurrentTime.textContent = formatMusicTime(musicAudio.currentTime);
    if (musicTotalDuration) musicTotalDuration.textContent = formatMusicTime(musicAudio.duration);
}

musicAudio.addEventListener("loadedmetadata", () => {
    if (musicTotalDuration) {
        musicTotalDuration.textContent = formatMusicTime(musicAudio.duration);
    }
});

// Initialize volume and load default track
musicAudio.volume = 1;
if (musicVolumeSlider) musicVolumeSlider.value = 100;

loadMusicTrack(musicTrackIndex);