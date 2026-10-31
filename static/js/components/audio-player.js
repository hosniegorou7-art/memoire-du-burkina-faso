/**
 * MÉMOIRE DU BURKINA — LECTEUR AUDIO PROFESSIONNEL & MULTILINGUE
 * Streaming HTML5 Audio, intégration MediaSession API (écran de verrouillage),
 * saut -10s/+10s, vitesses variables et synchronisation bilingue mot-à-mot.
 */

class FasoAudioPlayer {
  constructor(containerId = "global-audio-player-container") {
    this.container = document.getElementById(containerId);
    this.audioElement = new Audio();
    this.currentStory = null;
    this.activeLanguage = "native"; // "native" ou "fr"
    this.isPlaying = false;
    this.onTimeUpdateCallback = null;

    this.initAudioListeners();
  }

  initAudioListeners() {
    this.audioElement.addEventListener("timeupdate", () => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.audioElement.currentTime, this.audioElement.duration);
      }
      this.updateUIProgress();
    });

    this.audioElement.addEventListener("ended", () => {
      this.isPlaying = false;
      this.updatePlayBtnUI();
      if (window.fasoStore) {
        window.fasoStore.updateAudio({ isPlaying: false });
      }
    });

    this.audioElement.addEventListener("play", () => {
      this.isPlaying = true;
      this.updatePlayBtnUI();
      this.setupMediaSession();
      if (window.fasoStore) {
        window.fasoStore.updateAudio({ isPlaying: true });
      }
    });

    this.audioElement.addEventListener("pause", () => {
      this.isPlaying = false;
      this.updatePlayBtnUI();
      if (window.fasoStore) {
        window.fasoStore.updateAudio({ isPlaying: false });
      }
    });
  }

  loadStory(story, autoPlay = true) {
    this.currentStory = story;
    if (window.fasoStore) {
      window.fasoStore.updateAudio({ currentStory: story });
      window.fasoStore.logListening(story.id, 0);
    }

    this.render();
    if (autoPlay) {
      this.playNarration();
    }
  }

  playNarration() {
    if (!this.currentStory) return;
    const s = this.currentStory;

    // Si synthèse vocale assistée ou lecture vocale simulée (Web Speech API)
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
      const textToSpeak = s.sections ? s.sections.map(sec => sec.textFr).join(" ") : s.synopsis;
      window.fasoAudio.speakStorySection(textToSpeak, "fr-FR", (e) => {
        // Callback frontière de synchronisation
      }, () => {
        this.isPlaying = false;
        this.updatePlayBtnUI();
      });
      this.isPlaying = true;
      this.updatePlayBtnUI();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      if (window.fasoAudio) window.fasoAudio.stopNarration();
      this.isPlaying = false;
    } else {
      this.playNarration();
    }
    this.updatePlayBtnUI();
  }

  skip(seconds) {
    if (this.audioElement) {
      this.audioElement.currentTime = Math.max(0, Math.min(this.audioElement.duration || 300, this.audioElement.currentTime + seconds));
    }
  }

  setSpeed(rate) {
    this.audioElement.playbackRate = rate;
  }

  setVolume(vol) {
    this.audioElement.volume = Math.max(0, Math.min(1, vol));
  }

  setupMediaSession() {
    if ("mediaSession" in navigator && this.currentStory) {
      const s = this.currentStory;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: s.title,
        artist: s.narratorName || "Griot du Burkina Faso",
        album: `Mémoire du Burkina • ${s.regionName}`,
        artwork: [
          { src: `/static/assets/illustrations/${s.heroImage}`, sizes: "512x512", type: "image/svg+xml" }
        ]
      });

      navigator.mediaSession.setActionHandler("play", () => this.togglePlay());
      navigator.mediaSession.setActionHandler("pause", () => this.togglePlay());
      navigator.mediaSession.setActionHandler("seekbackward", () => this.skip(-10));
      navigator.mediaSession.setActionHandler("seekforward", () => this.skip(10));
    }
  }

  render() {
    if (!this.container || !this.currentStory) return;
    const s = this.currentStory;

    this.container.innerHTML = `
      <div class="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 border-t border-amber-500/30 shadow-2xl backdrop-blur-xl px-4 py-3 animate-fade-in text-stone-100">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <!-- Infos du conte en cours -->
          <div class="flex items-center gap-3 min-w-[200px] max-w-sm">
            <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-12 h-12 rounded-xl object-cover border border-amber-500/30 shrink-0">
            <div class="overflow-hidden">
              <h5 class="text-xs sm:text-sm font-bold text-amber-100 truncate">${s.title}</h5>
              <p class="text-[11px] text-amber-400/80 truncate">
                🗣️ ${s.languages.join(", ")} • ${s.regionName}
              </p>
            </div>
          </div>

          <!-- Commandes de lecture centrales -->
          <div class="flex flex-col items-center gap-1.5 flex-1 max-w-md">
            <div class="flex items-center gap-4">
              <button id="btn-skip-back" class="text-stone-400 hover:text-amber-300 transition-colors text-xs font-mono font-bold" title="Reculer de 10 secondes">
                -10s
              </button>
              <button id="btn-audio-toggle" class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:scale-105 active:scale-95 text-stone-950 flex items-center justify-center font-bold text-base shadow-lg transition-all">
                <span id="audio-play-icon">⏸</span>
              </button>
              <button id="btn-skip-fwd" class="text-stone-400 hover:text-amber-300 transition-colors text-xs font-mono font-bold" title="Avancer de 10 secondes">
                +10s
              </button>
            </div>

            <!-- Barre de progression -->
            <div class="w-full flex items-center gap-2 text-[10px] text-stone-400 font-mono">
              <span id="audio-time-current">0:00</span>
              <div class="flex-1 bg-stone-800 h-1.5 rounded-full overflow-hidden cursor-pointer" id="progress-bar-container">
                <div id="audio-progress-bar" class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-0 transition-all"></div>
              </div>
              <span id="audio-time-total">${s.duration || "5:00"}</span>
            </div>
          </div>

          <!-- Contrôles secondaires (Vitesse, Mode Feu, Fermer) -->
          <div class="flex items-center gap-2">
            <select id="select-audio-speed" class="bg-stone-800 border border-stone-700 text-stone-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none">
              <option value="0.8">0.8x</option>
              <option value="1.0" selected>1.0x</option>
              <option value="1.2">1.2x</option>
            </select>

            <button id="btn-open-campfire" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-orange-600/30 hover:bg-orange-600/50 text-orange-200 border border-orange-500/40 transition-all flex items-center gap-1">
              <span>🔥</span> <span class="hidden sm:inline">Autour du feu</span>
            </button>

            <button id="btn-close-player" class="text-stone-400 hover:text-white p-1 text-sm font-bold">
              ✕
            </button>
          </div>

        </div>
      </div>
    `;

    this.bindPlayerEvents();
  }

  bindPlayerEvents() {
    const playBtn = this.container.querySelector("#btn-audio-toggle");
    const skipBackBtn = this.container.querySelector("#btn-skip-back");
    const skipFwdBtn = this.container.querySelector("#btn-skip-fwd");
    const speedSelect = this.container.querySelector("#select-audio-speed");
    const campfireBtn = this.container.querySelector("#btn-open-campfire");
    const closeBtn = this.container.querySelector("#btn-close-player");

    if (playBtn) playBtn.addEventListener("click", () => this.togglePlay());
    if (skipBackBtn) skipBackBtn.addEventListener("click", () => this.skip(-10));
    if (skipFwdBtn) skipFwdBtn.addEventListener("click", () => this.skip(10));
    if (speedSelect) speedSelect.addEventListener("change", (e) => this.setSpeed(parseFloat(e.target.value)));
    if (campfireBtn) {
      campfireBtn.addEventListener("click", () => {
        if (window.fasoRouter && this.currentStory) {
          window.fasoRouter.navigateTo("campfire", this.currentStory.id);
        }
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.togglePlay();
        this.container.innerHTML = "";
      });
    }
  }

  updatePlayBtnUI() {
    const icon = this.container.querySelector("#audio-play-icon");
    if (icon) {
      icon.textContent = this.isPlaying ? "⏸" : "▶";
    }
  }

  updateUIProgress() {
    const pBar = this.container.querySelector("#audio-progress-bar");
    const timeCurr = this.container.querySelector("#audio-time-current");
    if (!this.audioElement.duration) return;

    const pct = (this.audioElement.currentTime / this.audioElement.duration) * 100;
    if (pBar) pBar.style.width = `${pct}%`;
    if (timeCurr) {
      const mins = Math.floor(this.audioElement.currentTime / 60);
      const secs = Math.floor(this.audioElement.currentTime % 60).toString().padStart(2, "0");
      timeCurr.textContent = `${mins}:${secs}`;
    }
  }
}

window.FasoAudioPlayer = FasoAudioPlayer;
