/**
 * MÉMOIRE DU BURKINA — LECTEUR AUDIO COMPLET AVEC NARRATION VOCALE
 * =================================================================
 * Double mode de lecture :
 *   1. NARRATION VOCALE (primaire) — Web Speech API lit l'histoire à voix haute en français
 *      et dans la langue nationale, phrase par phrase, avec texte synchronisé
 *   2. AMBIANCE MUSICALE (secondaire) — boucle Kora/Balafon en fond pendant la narration
 *   3. PISTE MP3 (instrumentale) — la musique du terroir seule si la voix n'est pas demandée
 */

class FasoAudioPlayer {
  constructor(containerId = 'global-audio-player-container') {
    this.container = document.getElementById(containerId);
    this.mp3Element = new Audio();       // piste instrumentale de fond
    this.currentStory = null;
    this.isPlaying = false;
    this.isSpeaking = false;
    this.currentLang = 'fr-FR';         // langue de narration active
    this.sentences = [];                 // phrases découpées prêtes à lire
    this.currentSentenceIdx = 0;
    this.totalSentences = 0;

    this._initMp3Listeners();
  }

  _initMp3Listeners() {
    this.mp3Element.addEventListener('error', () => {
      // Si le MP3 est manquant, continuer avec la narration vocale uniquement
      console.warn('MP3 de fond non chargé, narration vocale seule.');
    });
    this.mp3Element.volume = 0.12; // très subtil, la voix doit dominer
    this.mp3Element.loop = true;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EXTRACTION DU TEXTE DE NARRATION
  // ─────────────────────────────────────────────────────────────────────────

  _extractSentences(story, lang = 'fr-FR') {
    const allText = [];

    // Si l'histoire a des sections détaillées (data.js)
    if (story.sections && story.sections.length > 0) {
      for (const sec of story.sections) {
        const text = lang === 'fr-FR' ? sec.textFr : (sec.textNative || sec.textFr);
        if (text) allText.push(text);
      }
    } else {
      // Fallback : synopsis + moral
      if (story.synopsis) allText.push(story.synopsis);
      if (story.moral) allText.push('La sagesse de cette histoire : ' + story.moral);
    }

    // Découpe en phrases courtes (évite le bug Chrome 15s)
    const raw = allText.join(' ');
    return FasoAudioEngine.splitIntoSentences(raw);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CHARGEMENT D'UNE HISTOIRE
  // ─────────────────────────────────────────────────────────────────────────

  loadStory(story, autoPlay = true) {
    this.currentStory = story;
    this.currentSentenceIdx = 0;
    this.sentences = this._extractSentences(story, this.currentLang);
    this.totalSentences = this.sentences.length;

    // Charge le MP3 de fond en silence
    this.mp3Element.src = `/static/audio/${story.id}.mp3`;
    this.mp3Element.load();

    if (window.fasoStore) {
      window.fasoStore.updateAudio({ currentStory: story });
      window.fasoStore.logListening(story.id, 0);
    }

    this.render();
    if (autoPlay) this.startNarration();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CONTRÔLE DE LA NARRATION
  // ─────────────────────────────────────────────────────────────────────────

  startNarration() {
    if (!this.currentStory) return;

    // Démarrage de l'ambiance musicale (Kora en arrière-plan)
    if (window.fasoAudio) {
      window.fasoAudio.initAudioContext();
      if (window.fasoAudio.ctx && window.fasoAudio.ctx.state === 'suspended') {
        window.fasoAudio.ctx.resume();
      }
      if (!window.fasoAudio.isAmbiancePlaying) {
        window.fasoAudio.startAmbience('veillee');
      }
    }

    // Démarrage du MP3 de fond instrumental (volume très bas)
    try {
      this.mp3Element.volume = 0.10;
      this.mp3Element.play().catch(() => {});
    } catch (e) {}

    // Narration vocale principale
    this.isSpeaking = true;
    this.isPlaying = true;
    this.updatePlayBtnUI();

    if (window.fasoAudio && this.sentences.length > 0) {
      window.fasoAudio.speakStory(
        this.sentences,
        this.currentLang,
        (idx, total) => {
          this.currentSentenceIdx = idx;
          this.totalSentences = total;
          this._updateSentenceProgress(idx, total);
        },
        () => {
          this.isPlaying = false;
          this.isSpeaking = false;
          this.updatePlayBtnUI();
          if (window.fasoAudio) window.fasoAudio.stopAmbience();
          this.mp3Element.pause();
        }
      );
    } else {
      // Fallback : lecture MP3 seule (si pas de texte disponible)
      this.mp3Element.volume = 0.9;
      this.mp3Element.play().catch(() => {});
    }
  }

  stopNarration() {
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
      window.fasoAudio.stopAmbience();
    }
    this.mp3Element.pause();
    this.mp3Element.currentTime = 0;
    this.isPlaying = false;
    this.isSpeaking = false;
    this.updatePlayBtnUI();
  }

  togglePlay() {
    if (this.isPlaying || this.isSpeaking) {
      this.stopNarration();
    } else {
      // Re-lit depuis le début
      this.sentences = this._extractSentences(this.currentStory, this.currentLang);
      this.startNarration();
    }
  }

  switchLanguage(lang) {
    this.currentLang = lang;
    this.sentences = this._extractSentences(this.currentStory, lang);
    this.totalSentences = this.sentences.length;
    if (this.isPlaying || this.isSpeaking) {
      this.stopNarration();
      setTimeout(() => this.startNarration(), 300);
    }
    this._updateLangButtons(lang);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDU HTML
  // ─────────────────────────────────────────────────────────────────────────

  render() {
    if (!this.container || !this.currentStory) return;
    const s = this.currentStory;
    const hasNativeLang = s.languages && s.languages.length > 1;
    const nativeLang = hasNativeLang ? s.languages[1] : null;

    const langOptions = [
      `<button data-lang="fr-FR" class="lang-btn px-2.5 py-1 text-[11px] rounded-lg font-bold border transition-all ${this.currentLang === 'fr-FR' ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500/60'}">
        ${window.fasoIcon ? window.fasoIcon('globe', 'w-3 h-3 inline mr-1') : ''}Français
      </button>`
    ];
    if (nativeLang) {
      langOptions.push(`<button data-lang="native" class="lang-btn px-2.5 py-1 text-[11px] rounded-lg font-bold border transition-all ${this.currentLang === 'native' ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500/60'}">
        ${window.fasoIcon ? window.fasoIcon('speaker', 'w-3 h-3 inline mr-1') : ''}${nativeLang}
      </button>`);
    }

    this.container.innerHTML = `
      <div id="faso-audio-bar" class="fixed bottom-0 left-0 right-0 z-50 bg-stone-950/97 backdrop-blur-xl border-t border-amber-900/50 shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 py-3">

          <!-- Info histoire -->
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shrink-0">
                ${window.fasoIcon ? window.fasoIcon('speaker', 'w-4 h-4 text-stone-950') : '♪'}
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-amber-100 truncate max-w-[280px]">${s.title}</div>
                <div class="text-[10px] text-stone-400">${s.regionName} • ${s.ethnic}</div>
              </div>
            </div>

            <!-- Boutons de langue -->
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">Langue :</span>
              ${langOptions.join('')}
            </div>

            <!-- Contrôles -->
            <div class="flex items-center gap-2">
              <!-- Play/Stop -->
              <button id="btn-audio-toggle" class="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-all shadow-lg shadow-amber-500/30">
                <span id="audio-play-icon">
                  ${window.fasoIcon ? window.fasoIcon('pause', 'w-4 h-4 fill-stone-950') : '⏸'}
                </span>
              </button>

              <!-- Test son -->
              <button id="btn-audio-test" class="px-2.5 py-1.5 text-[11px] rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-all flex items-center gap-1" title="Tester le son et la voix">
                ${window.fasoIcon ? window.fasoIcon('speaker', 'w-3 h-3 text-amber-400') : '🔊'}
                <span class="hidden md:inline">Test voix</span>
              </button>

              <!-- Veillée au feu -->
              <button id="btn-open-campfire" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-200 border border-amber-500/40 transition-all flex items-center gap-1.5">
                ${window.fasoIcon ? window.fasoIcon('flame', 'w-3 h-3 text-orange-400') : '🔥'}
                <span class="hidden sm:inline">Autour du feu</span>
              </button>

              <!-- Fermer -->
              <button id="btn-close-player" class="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-white rounded-full hover:bg-stone-800 transition-all text-sm font-bold" title="Fermer">✕</button>
            </div>
          </div>

          <!-- Barre de progression des phrases -->
          <div class="mt-2.5">
            <div class="flex items-center justify-between mb-1">
              <div id="narration-status" class="text-[10px] text-amber-400 font-semibold flex items-center gap-1.5">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Narration vocale en cours...
              </div>
              <div id="sentence-counter" class="text-[10px] text-stone-500">
                Phrase <span id="sent-cur">1</span> / <span id="sent-tot">${this.totalSentences}</span>
              </div>
            </div>
            <div class="h-1 bg-stone-800 rounded-full overflow-hidden">
              <div id="narration-progress-bar" class="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full transition-all duration-500" style="width:0%"></div>
            </div>
            <div id="current-sentence-text" class="mt-1.5 text-[11px] text-stone-300 italic leading-relaxed min-h-[2em] line-clamp-2">
              <!-- Phrase en cours de lecture -->
            </div>
          </div>

        </div>
      </div>
    `;

    this._bindEvents();
  }

  _bindEvents() {
    const playBtn = this.container.querySelector('#btn-audio-toggle');
    const testBtn = this.container.querySelector('#btn-audio-test');
    const campfireBtn = this.container.querySelector('#btn-open-campfire');
    const closeBtn = this.container.querySelector('#btn-close-player');
    const langBtns = this.container.querySelectorAll('.lang-btn');

    if (playBtn) playBtn.addEventListener('click', () => this.togglePlay());

    if (testBtn) {
      testBtn.addEventListener('click', () => {
        if (window.fasoAudio) window.fasoAudio.testSound();
        testBtn.textContent = '✓ Test en cours...';
        setTimeout(() => {
          testBtn.innerHTML = `${window.fasoIcon ? window.fasoIcon('speaker', 'w-3 h-3 text-amber-400') : ''}<span class="hidden md:inline ml-1">Test voix</span>`;
        }, 3000);
      });
    }

    if (campfireBtn) {
      campfireBtn.addEventListener('click', () => {
        if (window.fasoRouter && this.currentStory) {
          window.fasoRouter.navigateTo('campfire', this.currentStory.id);
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.stopNarration();
        this.container.innerHTML = '';
      });
    }

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MISE À JOUR DE L'UI
  // ─────────────────────────────────────────────────────────────────────────

  updatePlayBtnUI() {
    const iconSpan = this.container ? this.container.querySelector('#audio-play-icon') : null;
    if (iconSpan) {
      iconSpan.innerHTML = (this.isPlaying || this.isSpeaking)
        ? (window.fasoIcon ? window.fasoIcon('pause', 'w-4 h-4 fill-stone-950') : '⏸')
        : (window.fasoIcon ? window.fasoIcon('play', 'w-4 h-4 fill-stone-950') : '▶');
    }

    const status = this.container ? this.container.querySelector('#narration-status') : null;
    if (status) {
      if (this.isPlaying || this.isSpeaking) {
        status.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Narration vocale en cours...`;
      } else {
        status.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-stone-500"></span> En pause — cliquez ▶ pour reprendre`;
      }
    }
  }

  _updateSentenceProgress(idx, total) {
    const bar = this.container ? this.container.querySelector('#narration-progress-bar') : null;
    const cur = this.container ? this.container.querySelector('#sent-cur') : null;
    const tot = this.container ? this.container.querySelector('#sent-tot') : null;
    const textEl = this.container ? this.container.querySelector('#current-sentence-text') : null;

    const pct = total > 0 ? Math.round(((idx + 1) / total) * 100) : 0;
    if (bar) bar.style.width = pct + '%';
    if (cur) cur.textContent = idx + 1;
    if (tot) tot.textContent = total;
    if (textEl && this.sentences[idx]) {
      textEl.textContent = '« ' + this.sentences[idx].substring(0, 160) + (this.sentences[idx].length > 160 ? '…' : '') + ' »';
    }
  }

  _updateLangButtons(activeLang) {
    const btns = this.container ? this.container.querySelectorAll('.lang-btn') : [];
    btns.forEach(btn => {
      const isActive = btn.dataset.lang === activeLang;
      btn.className = btn.className
        .replace(/bg-amber-500 text-stone-950 border-amber-500/g, '')
        .replace(/bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500\/60/g, '')
        .trim();
      if (isActive) {
        btn.classList.add('bg-amber-500', 'text-stone-950', 'border-amber-500');
      } else {
        btn.classList.add('bg-stone-800', 'text-stone-300', 'border-stone-700', 'hover:border-amber-500/60');
      }
    });
  }
}

window.FasoAudioPlayer = FasoAudioPlayer;
