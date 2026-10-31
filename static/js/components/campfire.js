/**
 * MÉMOIRE DU BURKINA — EXPÉRIENCE IMMERSIVE « ÉCOUTER AUTOUR DU FEU »
 * Veillée traditionnelle au clair de lune, lueur de braises animée,
 * nappe sonore de kora et grillons, et synchronisation bilingue du conte.
 */

class FasoCampfireExperience {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentStory = null;
    this.activeLineIdx = 0;
    this.audioElement = new Audio();
    this.isPlaying = false;
  }

  mount(storyId) {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || [];
    this.currentStory = stories.find(s => s.id === storyId) || stories[0];

    this.render();
    this.initEmberParticles();
    this.startCampfireSound();
  }

  unmount() {
    this.stopCampfireSound();
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
    }
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  render() {
    const s = this.currentStory;
    if (!s) return;

    this.container.innerHTML = `
      <div class="campfire-container relative w-full flex flex-col justify-between p-6 sm:p-10 animate-fade-in text-stone-100 min-h-[90vh]">
        
        <!-- Particules de braises et halo rougeoyant de feu de bois -->
        <div class="campfire-glow"></div>
        <div id="embers-field" class="absolute inset-0 pointer-events-none overflow-hidden"></div>

        <!-- Barre supérieure de la veillée -->
        <div class="relative z-20 flex items-center justify-between max-w-5xl mx-auto w-full pt-2">
          <button id="btn-exit-campfire" class="px-4 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 text-xs font-semibold flex items-center gap-2 transition-all shadow-md backdrop-blur-md">
            ${window.fasoIcon('arrowLeft', 'w-3.5 h-3.5')}
            <span>Quitter la veillée</span>
          </button>

          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold tracking-wider uppercase">
              ${window.fasoIcon('flame', 'w-3.5 h-3.5 text-orange-400')}
              <span>Veillée Traditionnelle sous le Baobab</span>
            </span>
          </div>

          <!-- Bascule Mode Enfant -->
          <button id="btn-toggle-kid" class="px-3.5 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all">
            ${window.fasoIcon('user', 'w-3.5 h-3.5 text-amber-400')}
            <span id="label-kid-mode">Mode Enfant : Off</span>
          </button>
        </div>

        <!-- Cœur de la Veillée : Illustration & Récit Bilingue Synchronisé -->
        <div class="relative z-20 max-w-4xl mx-auto w-full my-8 flex-1 flex flex-col items-center justify-center space-y-6 text-center">
          
          <!-- Image du Héros avec lueur de feu de bois -->
          <div class="relative w-full max-w-2xl h-60 sm:h-80 rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl group bg-stone-950">
            <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
            
            <div class="absolute bottom-5 left-6 right-6 text-left">
              <span class="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-1 block">
                ${s.regionName} • ${s.ethnic}
              </span>
              <h2 class="text-xl sm:text-3xl font-black text-amber-100 font-heading leading-tight drop-shadow-md">
                ${s.title}
              </h2>
            </div>
          </div>

          <!-- Texte Narratif Bilingue Synchronisé (Karaoké Culturel) -->
          <div class="w-full max-w-3xl space-y-4 max-h-[35vh] overflow-y-auto px-4 text-left" id="campfire-transcripts">
            ${s.sections.map((sec, idx) => `
              <div class="transcript-line ${idx === 0 ? 'active' : ''} space-y-2 p-3 rounded-2xl transition-all" data-sec-idx="${idx}">
                <div class="text-xs font-bold text-amber-400/90 font-mono flex items-center justify-between">
                  <span>${sec.title}</span>
                  <span class="opacity-75 font-sans">${s.languages.join(" • ")}</span>
                </div>
                <!-- Texte Français -->
                <p class="text-sm sm:text-base text-stone-100 font-serif leading-relaxed">
                  ${sec.textFr}
                </p>
                <!-- Texte Langue Nationale en miroir -->
                <p class="text-xs sm:text-sm text-amber-200/80 font-serif italic border-l-2 border-amber-500/40 pl-3">
                  ${sec.textNative}
                </p>
              </div>
            `).join("")}
          </div>

        </div>

        <!-- Commandes de Veillée en bas -->
        <div class="relative z-20 max-w-xl mx-auto w-full p-4 sm:p-5 rounded-2xl bg-stone-900/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <button id="btn-campfire-play" class="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:scale-105 active:scale-95 text-stone-950 flex items-center justify-center font-bold text-xl shadow-lg transition-all" title="Écouter le conte">
              <span id="campfire-icon-play" class="w-4 h-4 flex items-center justify-center">
                ${window.fasoIcon('play', 'w-4 h-4 fill-stone-950')}
              </span>
            </button>
            <div>
              <div class="text-xs font-bold text-amber-200 font-heading">Parole du Griot</div>
              <div class="text-[11px] text-stone-400" id="campfire-narration-status">Piste audio prête • Cliquez pour écouter</div>
            </div>
          </div>

          <!-- Bouton Son du Feu & Kora -->
          <button id="btn-fire-ambience" class="px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-200 text-xs font-bold flex items-center gap-2 hover:bg-amber-500/25 transition-all">
            ${window.fasoIcon('audio', 'w-3.5 h-3.5 text-amber-400')}
            <span>Ambiance Kora : Active</span>
          </button>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const exitBtn = this.container.querySelector("#btn-exit-campfire");
    const playBtn = this.container.querySelector("#btn-campfire-play");
    const playIcon = this.container.querySelector("#campfire-icon-play");
    const narrationStatus = this.container.querySelector("#campfire-narration-status");
    const kidBtn = this.container.querySelector("#btn-toggle-kid");
    const kidLabel = this.container.querySelector("#label-kid-mode");
    const fireBtn = this.container.querySelector("#btn-fire-ambience");

    if (exitBtn) {
      exitBtn.addEventListener("click", () => {
        this.unmount();
        if (window.fasoRouter) window.fasoRouter.navigateTo("library");
      });
    }

    if (kidBtn) {
      kidBtn.addEventListener("click", () => {
        if (window.fasoStore) window.fasoStore.toggleKidMode();
        const isKid = window.fasoStore.state.isKidMode;
        kidLabel.textContent = isKid ? "Mode Enfant : Actif" : "Mode Enfant : Off";
        this.container.classList.toggle("kid-mode-active", isKid);
      });
    }

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        this.isPlaying = !this.isPlaying;
        playIcon.innerHTML = this.isPlaying
          ? window.fasoIcon('pause', 'w-4 h-4 fill-stone-950')
          : window.fasoIcon('play', 'w-4 h-4 fill-stone-950');

        narrationStatus.textContent = this.isPlaying
          ? "Le conteur transmet la sagesse..."
          : "Veillée en pause";

        if (this.isPlaying) {
          // Joue la piste audio MP3 du conte
          this.audioElement.src = `/static/audio/${this.currentStory.id}.mp3`;
          this.audioElement.play().catch(e => console.warn("Audio play:", e));

          // Fait défiler le texte synchronisé
          const lines = this.container.querySelectorAll(".transcript-line");
          let currentSec = 0;
          this.audioElement.ontimeupdate = () => {
            const dur = this.audioElement.duration || 30;
            const cur = this.audioElement.currentTime || 0;
            const secIdx = Math.min(lines.length - 1, Math.floor((cur / dur) * lines.length));
            lines.forEach((l, idx) => {
              l.classList.toggle("active", idx === secIdx);
              if (idx === secIdx) {
                l.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }
            });
          };

          this.audioElement.onended = () => {
            this.isPlaying = false;
            playIcon.innerHTML = window.fasoIcon('play', 'w-4 h-4 fill-stone-950');
            narrationStatus.textContent = "La veillée touche à sa fin";
          };
        } else {
          this.audioElement.pause();
        }
      });
    }

    if (fireBtn) {
      fireBtn.addEventListener("click", () => {
        if (window.fasoAudio) {
          const active = window.fasoAudio.toggleAmbience("veillee");
          fireBtn.classList.toggle("bg-amber-500/15", active);
          fireBtn.innerHTML = active
            ? `${window.fasoIcon('audio', 'w-3.5 h-3.5 text-amber-400')} <span>Kora &amp; Grillons : Actif</span>`
            : `${window.fasoIcon('audio', 'w-3.5 h-3.5 text-stone-400')} <span>Ambiance : Off</span>`;
        }
      });
    }
  }

  initEmberParticles() {
    const field = this.container.querySelector("#embers-field");
    if (!field) return;

    for (let i = 0; i < 26; i++) {
      const ember = document.createElement("div");
      ember.className = "ember-particle";
      ember.style.left = `${25 + Math.random() * 50}%`;
      ember.style.animationDelay = `${Math.random() * 5}s`;
      ember.style.animationDuration = `${3.5 + Math.random() * 3.5}s`;
      ember.style.setProperty("--drift", `${(Math.random() - 0.5) * 140}px`);
      field.appendChild(ember);
    }
  }

  startCampfireSound() {
    if (window.fasoAudio) {
      window.fasoAudio.startAmbience("veillee");
    }
  }

  stopCampfireSound() {
    if (window.fasoAudio) {
      window.fasoAudio.stopAmbience();
    }
  }
}

window.FasoCampfireExperience = FasoCampfireExperience;
