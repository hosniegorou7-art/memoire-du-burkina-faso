/**
 * MÉMOIRE DU BURKINA — EXPÉRIENCE IMMERSIVE « ÉCOUTER AUTOUR DU FEU »
 * Veillée traditionnelle au clair de lune, lueur de braises animée,
 * nappe sonore de grillons, crépitement du feu et synchronisation bilingue.
 */

class FasoCampfireExperience {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentStory = null;
    this.activeLineIdx = 0;
    this.isFireSoundActive = false;
    this.fireTimer = null;
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
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  render() {
    const s = this.currentStory;
    if (!s) return;

    this.container.innerHTML = `
      <div class="campfire-container relative w-full flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
        
        <!-- Particules de braises et halo de feu -->
        <div class="campfire-glow"></div>
        <div id="embers-field" class="absolute inset-0 pointer-events-none overflow-hidden"></div>

        <!-- Barre supérieure de la veillée -->
        <div class="relative z-20 flex items-center justify-between max-w-5xl mx-auto w-full pt-2">
          <button id="btn-exit-campfire" class="px-3.5 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 text-xs font-semibold flex items-center gap-2 transition-all">
            <span>➔</span> <span>Quitter la veillée</span>
          </button>

          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <span>🔥</span> <span>Veillée Traditionnelle sous le Baobab</span>
            </span>
          </div>

          <!-- Bascule Mode Enfant -->
          <button id="btn-toggle-kid" class="px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all">
            <span>👶</span> <span id="label-kid-mode">Mode Enfant : Off</span>
          </button>
        </div>

        <!-- Cœur de la Veillée : Illustration Vivante & Récit Bilingue Synchronisé -->
        <div class="relative z-20 max-w-4xl mx-auto w-full my-6 flex-1 flex flex-col items-center justify-center space-y-6 text-center">
          
          <!-- Image du Héros avec lueur de feu de bois -->
          <div class="relative w-full max-w-2xl h-56 sm:h-72 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group">
            <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
            
            <div class="absolute bottom-4 left-4 right-4 text-left">
              <span class="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-1 block">
                📍 ${s.regionName} • ${s.ethnic}
              </span>
              <h2 class="text-xl sm:text-2xl font-black text-amber-100 font-heading leading-tight drop-shadow-md">
                ${s.title}
              </h2>
            </div>
          </div>

          <!-- Texte Narratif Bilingue Synchronisé (Karaoké Culturel) -->
          <div class="w-full max-w-3xl space-y-4 max-h-[35vh] overflow-y-auto px-4 text-left" id="campfire-transcripts">
            ${s.sections.map((sec, idx) => `
              <div class="transcript-line ${idx === 0 ? 'active' : ''} space-y-1.5" data-sec-idx="${idx}">
                <div class="text-xs font-bold text-amber-400/90 font-mono flex items-center justify-between">
                  <span>${sec.title}</span>
                  <span class="opacity-75">🗣️ ${s.languages.join(" • ")}</span>
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
        <div class="relative z-20 max-w-xl mx-auto w-full p-4 rounded-2xl bg-stone-900/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <button id="btn-campfire-play" class="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:scale-105 active:scale-95 text-stone-950 flex items-center justify-center font-bold text-xl shadow-lg transition-all">
              <span id="campfire-icon-play">▶</span>
            </button>
            <div>
              <div class="text-xs font-bold text-amber-200">Parole du Griot</div>
              <div class="text-[11px] text-stone-400" id="campfire-narration-status">Prêt pour la veillée</div>
            </div>
          </div>

          <!-- Bouton Son du Feu & Kora -->
          <button id="btn-fire-ambience" class="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/20 text-amber-200 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/30 transition-all">
            <span>🎶</span> <span>Kora & Grillons : Actif</span>
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
    const transcripts = this.container.querySelector("#campfire-transcripts");

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
        kidLabel.textContent = isKid ? "Mode Enfant : Actif 👶" : "Mode Enfant : Off";
        this.container.classList.toggle("kid-mode-active", isKid);
      });
    }

    if (playBtn) {
      let isPlaying = false;
      playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        playIcon.textContent = isPlaying ? "⏸" : "▶";
        narrationStatus.textContent = isPlaying ? "Le conteur transmet la sagesse..." : "Veillée en pause";

        if (isPlaying && window.fasoAudio) {
          const lines = this.container.querySelectorAll(".transcript-line");
          let currentSec = 0;

          const readNextSec = () => {
            if (currentSec >= this.currentStory.sections.length) {
              isPlaying = false;
              playIcon.textContent = "▶";
              narrationStatus.textContent = "La veillée touche à sa fin";
              return;
            }

            lines.forEach((l, idx) => l.classList.toggle("active", idx === currentSec));
            const sec = this.currentStory.sections[currentSec];

            window.fasoAudio.speakStorySection(sec.textFr, "fr-FR", null, () => {
              currentSec++;
              readNextSec();
            });
          };

          readNextSec();
        } else if (window.fasoAudio) {
          window.fasoAudio.stopNarration();
        }
      });
    }

    if (fireBtn) {
      fireBtn.addEventListener("click", () => {
        if (window.fasoAudio) {
          const active = window.fasoAudio.toggleAmbience("veillee");
          fireBtn.classList.toggle("bg-amber-500/20", active);
          fireBtn.innerHTML = active ? `<span>🎶</span> <span>Kora & Grillons : Actif</span>` : `<span>🎵</span> <span>Ambiance : Off</span>`;
        }
      });
    }
  }

  initEmberParticles() {
    const field = this.container.querySelector("#embers-field");
    if (!field) return;

    for (let i = 0; i < 24; i++) {
      const ember = document.createElement("div");
      ember.className = "ember-particle";
      ember.style.left = `${30 + Math.random() * 40}%`;
      ember.style.animationDelay = `${Math.random() * 5}s`;
      ember.style.animationDuration = `${3.5 + Math.random() * 3}s`;
      ember.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
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
      window.fasoAudio.stopNarration();
    }
  }
}

window.FasoCampfireExperience = FasoCampfireExperience;
