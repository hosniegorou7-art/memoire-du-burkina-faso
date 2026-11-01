/**
 * MÉMOIRE DU BURKINA — VEILLÉE IMMERSIVE AUTOUR DU FEU
 * =====================================================
 * Narration vocale synchronisée phrase par phrase (Web Speech API),
 * Ambiance musicale Kora (Web Audio API),
 * Affichage bilingue en temps réel (karaoké culturel),
 * Braises animées et halo rougeoyant.
 */

class FasoCampfireExperience {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentStory = null;
    this.isPlaying = false;
    this.sentences = [];         // phrases françaises
    this.currentSentenceIdx = 0;
    this.currentSectionIdx = 0;
    this.mp3Bg = new Audio();
    this.mp3Bg.loop = true;
    this.mp3Bg.volume = 0.08;    // musique très douce — la voix prime
  }

  mount(storyId) {
    if (!this.container) return;

    // Cherche d'abord dans les données enrichies (data.js), puis dans les données de base
    const rich = window.FASO_STORIES || [];
    const base = window.FASO_STORIES_DB || [];
    this.currentStory = rich.find(s => s.id === storyId)
      || base.find(s => s.id === storyId)
      || rich[0];

    this.render();
    this.initEmberParticles();
    this._startAmbianceMusic();
  }

  unmount() {
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
      window.fasoAudio.stopAmbience();
    }
    this.mp3Bg.pause();
    this.isPlaying = false;
    if (this.container) this.container.innerHTML = '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EXTRACTION DES PHRASES À NARRER
  // ─────────────────────────────────────────────────────────────────────────

  _buildSentences(lang = 'fr') {
    const s = this.currentStory;
    if (!s) return [];
    const texts = [];

    if (s.sections && s.sections.length > 0) {
      for (const sec of s.sections) {
        const text = lang === 'fr' ? sec.textFr : (sec.textNative || sec.textFr);
        if (text) texts.push(text);
      }
    } else {
      if (s.synopsis) texts.push(s.synopsis);
      if (s.moral) texts.push('La sagesse de ce conte : ' + s.moral);
    }

    return FasoAudioEngine.splitIntoSentences(texts.join(' '));
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDU
  // ─────────────────────────────────────────────────────────────────────────

  render() {
    const s = this.currentStory;
    if (!s) return;

    const hasSections = s.sections && s.sections.length > 0;
    const nativeLang = s.languages && s.languages.length > 1 ? s.languages[1] : null;

    const transcriptHTML = hasSections
      ? s.sections.map((sec, idx) => `
          <div class="transcript-block ${idx === 0 ? 'active-block' : ''} p-4 rounded-2xl transition-all duration-700 mb-3" data-idx="${idx}">
            <div class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              ${sec.title || 'Passage ' + (idx + 1)}
            </div>
            <p class="text-sm sm:text-base text-stone-100 font-serif leading-relaxed mb-2 fr-text" data-fr="${sec.textFr}">
              ${sec.textFr}
            </p>
            ${sec.textNative ? `
            <p class="text-xs sm:text-sm text-amber-200/75 font-serif italic border-l-2 border-amber-500/40 pl-3 leading-relaxed">
              ${sec.textNative}
            </p>` : ''}
          </div>`)
        .join('')
      : `<div class="p-4 rounded-2xl bg-stone-900/60">
           <p class="text-sm font-serif text-stone-100 leading-relaxed">${s.synopsis}</p>
           ${s.moral ? `<p class="text-xs text-amber-300 italic mt-3 border-l-2 border-amber-500/40 pl-3">Sagesse : ${s.moral}</p>` : ''}
         </div>`;

    this.container.innerHTML = `
      <div class="campfire-container relative w-full flex flex-col min-h-screen p-5 sm:p-10 animate-fade-in text-stone-100">

        <!-- Halo de feu et braises -->
        <div class="campfire-glow"></div>
        <div id="embers-field" class="absolute inset-0 pointer-events-none overflow-hidden"></div>

        <!-- Barre supérieure -->
        <div class="relative z-20 flex items-center justify-between max-w-5xl mx-auto w-full mb-6">
          <button id="btn-exit-campfire" class="px-4 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md">
            ${window.fasoIcon('arrowLeft', 'w-3.5 h-3.5')}
            <span>Quitter la veillée</span>
          </button>

          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold tracking-wider uppercase">
            ${window.fasoIcon('flame', 'w-3.5 h-3.5 text-orange-400')}
            <span>Veillée sous le Baobab</span>
          </span>

          <button id="btn-toggle-kid" class="px-3.5 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all">
            Mode Enfant : <span id="label-kid">Off</span>
          </button>
        </div>

        <!-- Corps -->
        <div class="relative z-20 max-w-4xl mx-auto w-full flex flex-col gap-6 flex-1">

          <!-- Illustration du conte -->
          <div class="relative w-full h-52 sm:h-72 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-stone-950">
            <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover" onerror="this.style.display='none'">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
            <div class="absolute bottom-4 left-5 right-5">
              <div class="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 mb-1">${s.regionName} • ${s.ethnic}</div>
              <h2 class="text-xl sm:text-3xl font-black text-amber-50 font-heading leading-tight">${s.title}</h2>
            </div>
          </div>

          <!-- Phrase en cours (karaoké) -->
          <div id="karaoké-display" class="w-full rounded-2xl bg-stone-900/80 border border-amber-500/20 px-6 py-4 min-h-[4.5rem] backdrop-blur-sm">
            <div class="text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Parole du griot
            </div>
            <p id="karaoké-text" class="text-sm sm:text-base font-serif text-stone-100 leading-relaxed italic">
              Cliquez sur le bouton d'écoute pour entendre le conte...
            </p>
          </div>

          <!-- Transcription bilingue complète -->
          <div class="w-full max-h-[38vh] overflow-y-auto pr-2 space-y-1" id="campfire-transcripts">
            ${transcriptHTML}
          </div>

        </div>

        <!-- Panneau de contrôle bas -->
        <div class="relative z-20 max-w-3xl mx-auto w-full mt-6">
          <div class="rounded-2xl bg-stone-900/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl p-4 sm:p-5">
            <div class="flex items-center justify-between gap-4 flex-wrap">

              <!-- Bouton principal Écouter -->
              <button id="btn-campfire-play" class="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/30 active:scale-95">
                <span id="campfire-icon-play">${window.fasoIcon('play', 'w-5 h-5 fill-stone-950')}</span>
                <span id="campfire-play-label">Écouter en Français</span>
              </button>

              <!-- Sélecteur de langue -->
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] text-stone-500 font-semibold">Langue :</span>
                <button data-speak-lang="fr" class="speak-lang-btn px-3 py-1.5 rounded-lg text-[11px] font-bold border bg-amber-500 text-stone-950 border-amber-500 transition-all">Français</button>
                ${nativeLang ? `<button data-speak-lang="native" class="speak-lang-btn px-3 py-1.5 rounded-lg text-[11px] font-bold border bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500/60 transition-all">${nativeLang}</button>` : ''}
              </div>

              <!-- Statut -->
              <div class="text-right">
                <div id="campfire-status" class="text-[10px] text-stone-400">Prêt</div>
                <div id="campfire-progress-info" class="text-[10px] text-amber-500 font-semibold"></div>
              </div>

            </div>

            <!-- Barre de progression de narration -->
            <div class="mt-3">
              <div class="h-1 bg-stone-800 rounded-full overflow-hidden">
                <div id="campfire-progress-bar" class="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full transition-all duration-500" style="width:0%"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this._bindEvents();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ÉVÉNEMENTS
  // ─────────────────────────────────────────────────────────────────────────

  _bindEvents() {
    const exitBtn     = this.container.querySelector('#btn-exit-campfire');
    const playBtn     = this.container.querySelector('#btn-campfire-play');
    const kidBtn      = this.container.querySelector('#btn-toggle-kid');
    const langBtns    = this.container.querySelectorAll('.speak-lang-btn');

    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.unmount();
        if (window.fasoRouter) window.fasoRouter.navigateTo('library');
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => this._toggleNarration());
    }

    if (kidBtn) {
      kidBtn.addEventListener('click', () => {
        if (window.fasoStore) window.fasoStore.toggleKidMode();
        const isKid = window.fasoStore.state.isKidMode;
        const lbl = this.container.querySelector('#label-kid');
        if (lbl) lbl.textContent = isKid ? 'Actif' : 'Off';
      });
    }

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.speakLang;
        // Met à jour l'UI des boutons
        langBtns.forEach(b => {
          b.className = b.className
            .replace('bg-amber-500 text-stone-950 border-amber-500', '')
            .replace('bg-stone-800 text-stone-300 border-stone-700', '')
            .trim();
          b.classList.add('bg-stone-800', 'text-stone-300', 'border-stone-700');
        });
        btn.classList.remove('bg-stone-800', 'text-stone-300', 'border-stone-700');
        btn.classList.add('bg-amber-500', 'text-stone-950', 'border-amber-500');

        const lblEl = this.container.querySelector('#campfire-play-label');
        if (lblEl) lblEl.textContent = lang === 'fr' ? 'Écouter en Français' : `Écouter en ${btn.textContent.trim()}`;

        // Redémarre en nouvelle langue si en cours
        if (this.isPlaying) {
          this._stopNarration();
          setTimeout(() => this._startNarration(lang), 300);
        }
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // NARRATION VOCALE
  // ─────────────────────────────────────────────────────────────────────────

  _toggleNarration() {
    if (this.isPlaying) {
      this._stopNarration();
    } else {
      const activeLangBtn = this.container.querySelector('.speak-lang-btn.bg-amber-500');
      const lang = activeLangBtn ? activeLangBtn.dataset.speakLang : 'fr';
      this._startNarration(lang);
    }
  }

  _startNarration(lang = 'fr') {
    if (!window.fasoAudio) return;

    this.isPlaying = true;
    this.sentences = this._buildSentences(lang);
    const speechLang = lang === 'fr' ? 'fr-FR' : 'fr-FR'; // fr-FR dans les deux cas car tts

    // Met à jour le bouton
    const icon = this.container.querySelector('#campfire-icon-play');
    const label = this.container.querySelector('#campfire-play-label');
    if (icon) icon.innerHTML = window.fasoIcon('pause', 'w-5 h-5 fill-stone-950');
    if (label) label.textContent = 'Pause';

    // Lance l'ambiance musicale
    window.fasoAudio.initAudioContext();
    if (!window.fasoAudio.isAmbiancePlaying) {
      window.fasoAudio.startAmbience('campfire');
    }

    // Lance le MP3 de fond en très bas volume
    try {
      this.mp3Bg.src = `/static/audio/${this.currentStory.id}.mp3`;
      this.mp3Bg.volume = 0.08;
      this.mp3Bg.play().catch(() => {});
    } catch (e) {}

    // Narration vocale phrase par phrase
    window.fasoAudio.speakStory(
      this.sentences,
      speechLang,
      (idx, total) => {
        this._onSentenceStart(idx, total);
      },
      () => {
        this._onNarrationEnd();
      }
    );

    const statusEl = this.container.querySelector('#campfire-status');
    if (statusEl) statusEl.textContent = 'Narration en cours...';
  }

  _stopNarration() {
    this.isPlaying = false;
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
      window.fasoAudio.stopAmbience();
    }
    this.mp3Bg.pause();

    const icon = this.container.querySelector('#campfire-icon-play');
    const label = this.container.querySelector('#campfire-play-label');
    if (icon) icon.innerHTML = window.fasoIcon('play', 'w-5 h-5 fill-stone-950');
    if (label) label.textContent = 'Reprendre';

    const statusEl = this.container.querySelector('#campfire-status');
    if (statusEl) statusEl.textContent = 'En pause';
  }

  _onSentenceStart(idx, total) {
    // Mise à jour de la phrase affichée (karaoké)
    const karaoke = this.container.querySelector('#karaoké-text');
    if (karaoke && this.sentences[idx]) {
      karaoke.textContent = '« ' + this.sentences[idx] + ' »';
    }

    // Barre de progression
    const bar = this.container.querySelector('#campfire-progress-bar');
    const info = this.container.querySelector('#campfire-progress-info');
    const pct = total > 0 ? Math.round(((idx + 1) / total) * 100) : 0;
    if (bar) bar.style.width = pct + '%';
    if (info) info.textContent = `Phrase ${idx + 1} / ${total}`;

    // Synchronise la section affichée dans la transcription
    if (this.currentStory.sections && this.currentStory.sections.length > 0) {
      const sectionsCount = this.currentStory.sections.length;
      const sectionIdx = Math.min(sectionsCount - 1, Math.floor((idx / total) * sectionsCount));
      const blocks = this.container.querySelectorAll('.transcript-block');
      blocks.forEach((block, i) => {
        block.classList.toggle('active-block', i === sectionIdx);
        if (i === sectionIdx) {
          block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  }

  _onNarrationEnd() {
    this.isPlaying = false;
    this.mp3Bg.pause();

    const icon = this.container.querySelector('#campfire-icon-play');
    const label = this.container.querySelector('#campfire-play-label');
    if (icon) icon.innerHTML = window.fasoIcon('play', 'w-5 h-5 fill-stone-950');
    if (label) label.textContent = 'Réécouter';

    const statusEl = this.container.querySelector('#campfire-status');
    if (statusEl) statusEl.textContent = 'Conte terminé';

    const bar = this.container.querySelector('#campfire-progress-bar');
    if (bar) bar.style.width = '100%';

    const karaoke = this.container.querySelector('#karaoké-text');
    if (karaoke && this.currentStory.moral) {
      karaoke.textContent = '« ' + this.currentStory.moral + ' »';
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // AMBIANCE ET BRAISES
  // ─────────────────────────────────────────────────────────────────────────

  _startAmbianceMusic() {
    if (window.fasoAudio) {
      window.fasoAudio.initAudioContext();
      window.fasoAudio.startAmbience('campfire');
    }
  }

  initEmberParticles() {
    const field = this.container.querySelector('#embers-field');
    if (!field) return;
    for (let i = 0; i < 28; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember-particle';
      ember.style.left = `${25 + Math.random() * 50}%`;
      ember.style.animationDelay = `${Math.random() * 5}s`;
      ember.style.animationDuration = `${3.5 + Math.random() * 3.5}s`;
      ember.style.setProperty('--drift', `${(Math.random() - 0.5) * 140}px`);
      field.appendChild(ember);
    }
  }
}

window.FasoCampfireExperience = FasoCampfireExperience;
