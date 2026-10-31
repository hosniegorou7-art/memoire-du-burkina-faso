/**
 * MÉMOIRE DU BURKINA — LECTEUR AUDIO PROFESSIONNEL & MULTILINGUE
 * Streaming HTML5 Audio direct des pistes MP3 de chaque conte (/static/audio/),
 * intégration MediaSession API, gestion du volume, saut temporel,
 * et double moteur (Piste audio du terroir + Synthèse vocale de lecture).
 */

class FasoAudioPlayer {
  constructor(containerId = "global-audio-player-container") {
    this.container = document.getElementById(containerId);
    this.audioElement = new Audio();
    this.currentStory = null;
    this.isPlaying = false;
    this.onTimeUpdateCallback = null;
    this.enableVoiceNarration = false; // Bascule voix parlée + musique

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

    this.audioElement.addEventListener("error", (e) => {
      console.warn("Piste audio MP3 non trouvée, bascule vers le synthétiseur audio Web Audio...");
      // Si le fichier audio échoue, Web Audio API prend le relais
      if (window.fasoAudio) {
        window.fasoAudio.startAmbience("veillee");
      }
    });
  }

  loadStory(story, autoPlay = true) {
    this.currentStory = story;
    if (window.fasoStore) {
      window.fasoStore.updateAudio({ currentStory: story });
      window.fasoStore.logListening(story.id, 0);
    }

    // Assigne le fichier audio réel présent dans /static/audio/
    const audioUrl = `/static/audio/${story.id}.mp3`;
    this.audioElement.src = audioUrl;
    this.audioElement.load();

    this.render();

    if (autoPlay) {
      this.play();
    }
  }

  play() {
    if (!this.currentStory) return;

    // Démarre l'AudioContext si Web Audio est sollicité
    if (window.fasoAudio && window.fasoAudio.ctx && window.fasoAudio.ctx.state === "suspended") {
      window.fasoAudio.ctx.resume();
    }

    // Démarre la lecture native HTML5
    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updatePlayBtnUI();
      }).catch(err => {
        console.warn("Lecture bloquée par la politique d'autoplay du navigateur:", err);
        this.isPlaying = false;
        this.updatePlayBtnUI();
      });
    }

    // Si la synthèse vocale est activée par l'utilisateur
    if (this.enableVoiceNarration && window.fasoAudio) {
      const textToSpeak = this.currentStory.sections
        ? this.currentStory.sections.map(sec => sec.textFr).join(". ")
        : this.currentStory.synopsis;
      window.fasoAudio.speakStorySection(textToSpeak, "fr-FR");
    }
  }

  pause() {
    this.audioElement.pause();
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
    }
    this.isPlaying = false;
    this.updatePlayBtnUI();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  skip(seconds) {
    if (this.audioElement && this.audioElement.duration) {
      this.audioElement.currentTime = Math.max(0, Math.min(this.audioElement.duration, this.audioElement.currentTime + seconds));
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
      <div class="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 border-t border-amber-500/30 shadow-2xl backdrop-blur-xl px-4 py-3 animate-fade-in text-stone-100">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <!-- Infos du récit en cours -->
          <div class="flex items-center gap-3 min-w-[220px] max-w-sm">
            <div class="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shrink-0 bg-stone-900">
              <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover">
            </div>
            <div class="overflow-hidden">
              <h5 class="text-xs sm:text-sm font-bold text-amber-100 truncate">${s.title}</h5>
              <div class="flex items-center gap-1.5 text-[11px] text-amber-400/80 truncate">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Piste Audio Active • ${s.regionName}</span>
              </div>
            </div>
          </div>

          <!-- Commandes centrales de lecture -->
          <div class="flex flex-col items-center gap-1.5 flex-1 max-w-md">
            <div class="flex items-center gap-4">
              <button id="btn-skip-back" class="text-stone-400 hover:text-amber-300 transition-colors text-xs font-mono font-bold px-2 py-1" title="Reculer de 10 secondes">
                -10s
              </button>
              <button id="btn-audio-toggle" class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:scale-105 active:scale-95 text-stone-950 flex items-center justify-center font-bold text-base shadow-lg transition-all" title="Lecture / Pause">
                <span id="audio-play-icon" class="w-4 h-4 flex items-center justify-center">
                  ${this.isPlaying ? window.fasoIcon('pause', 'w-4 h-4 fill-stone-950') : window.fasoIcon('play', 'w-4 h-4 fill-stone-950')}
                </span>
              </button>
              <button id="btn-skip-fwd" class="text-stone-400 hover:text-amber-300 transition-colors text-xs font-mono font-bold px-2 py-1" title="Avancer de 10 secondes">
                +10s
              </button>
            </div>

            <!-- Barre de progression continue -->
            <div class="w-full flex items-center gap-2 text-[10px] text-stone-400 font-mono">
              <span id="audio-time-current">0:00</span>
              <div class="flex-1 bg-stone-800 h-1.5 rounded-full overflow-hidden cursor-pointer" id="progress-bar-container">
                <div id="audio-progress-bar" class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-0 transition-all"></div>
              </div>
              <span id="audio-time-total">${s.duration || "0:30"}</span>
            </div>
          </div>

          <!-- Contrôles secondaires (Vitesse, Test Son, Mode Feu, Fermer) -->
          <div class="flex items-center gap-2">
            <!-- Test Son / Enceintes -->
            <button id="btn-audio-test" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-all flex items-center gap-1" title="Tester la sortie audio">
              ${window.fasoIcon('speaker', 'w-3 h-3 text-amber-400')}
              <span class="hidden md:inline">Test Son</span>
            </button>

            <!-- Vitesse -->
            <select id="select-audio-speed" class="bg-stone-800 border border-stone-700 text-stone-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none">
              <option value="0.8">0.8x</option>
              <option value="1.0" selected>1.0x</option>
              <option value="1.2">1.2x</option>
            </select>

            <!-- Accès Mode Feu -->
            <button id="btn-open-campfire" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-200 border border-amber-500/40 transition-all flex items-center gap-1.5">
              ${window.fasoIcon('flame', 'w-3 h-3 text-orange-400')}
              <span class="hidden sm:inline">Autour du feu</span>
            </button>

            <!-- Fermer le lecteur -->
            <button id="btn-close-player" class="text-stone-400 hover:text-white p-1 text-sm font-bold ml-1" title="Fermer le lecteur">
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
    const testBtn = this.container.querySelector("#btn-audio-test");
    const closeBtn = this.container.querySelector("#btn-close-player");
    const pContainer = this.container.querySelector("#progress-bar-container");

    if (playBtn) playBtn.addEventListener("click", () => this.togglePlay());
    if (skipBackBtn) skipBackBtn.addEventListener("click", () => this.skip(-10));
    if (skipFwdBtn) skipFwdBtn.addEventListener("click", () => this.skip(10));
    if (speedSelect) speedSelect.addEventListener("change", (e) => this.setSpeed(parseFloat(e.target.value)));
    
    if (testBtn) {
      testBtn.addEventListener("click", () => {
        if (window.fasoAudio) {
          window.fasoAudio.initAudioContext();
          window.fasoAudio.playKoraNote(293.66, 0, 1.2);
          setTimeout(() => window.fasoAudio.playKoraNote(440.00, 0, 1.2), 200);
          testBtn.classList.add("bg-emerald-950", "text-emerald-300");
          setTimeout(() => testBtn.classList.remove("bg-emerald-950", "text-emerald-300"), 800);
        }
      });
    }

    if (pContainer) {
      pContainer.addEventListener("click", (e) => {
        const rect = pContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        if (this.audioElement.duration) {
          this.audioElement.currentTime = ratio * this.audioElement.duration;
        }
      });
    }

    if (campfireBtn) {
      campfireBtn.addEventListener("click", () => {
        if (window.fasoRouter && this.currentStory) {
          window.fasoRouter.navigateTo("campfire", this.currentStory.id);
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.pause();
        this.container.innerHTML = "";
      });
    }
  }

  updatePlayBtnUI() {
    const iconSpan = this.container.querySelector("#audio-play-icon");
    if (iconSpan) {
      iconSpan.innerHTML = this.isPlaying
        ? window.fasoIcon('pause', 'w-4 h-4 fill-stone-950')
        : window.fasoIcon('play', 'w-4 h-4 fill-stone-950');
    }
  }

  updateUIProgress() {
    const pBar = this.container.querySelector("#audio-progress-bar");
    const timeCurr = this.container.querySelector("#audio-time-current");
    const timeTotal = this.container.querySelector("#audio-time-total");
    if (!this.audioElement || isNaN(this.audioElement.duration)) return;

    const cur = this.audioElement.currentTime || 0;
    const dur = this.audioElement.duration || 1;
    const pct = Math.min(100, (cur / dur) * 100);

    if (pBar) pBar.style.width = `${pct}%`;
    if (timeCurr) {
      const mins = Math.floor(cur / 60);
      const secs = Math.floor(cur % 60).toString().padStart(2, "0");
      timeCurr.textContent = `${mins}:${secs}`;
    }
    if (timeTotal && dur > 1) {
      const mins = Math.floor(dur / 60);
      const secs = Math.floor(dur % 60).toString().padStart(2, "0");
      timeTotal.textContent = `${mins}:${secs}`;
    }
  }
}

window.FasoAudioPlayer = FasoAudioPlayer;
