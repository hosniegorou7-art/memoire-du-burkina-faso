/**
 * MÉMOIRE DU BURKINA — MOTEUR AUDIO MULTILINGUE
 * ================================================
 * Architecture à double couche :
 *   Couche 1 : Narration vocale via Web Speech API (voix du navigateur, fr-FR + langues locales)
 *   Couche 2 : Ambiance musicale africaine via Web Audio API (Kora, Balafon, Djembé synthétiques)
 *
 * La narration vocale est le cœur du système : l'histoire est lue à voix haute,
 * phrase par phrase, avec synchronisation du texte affiché.
 */

class FasoAudioEngine {
  constructor() {
    this.ctx = null;                   // Web Audio API context
    this.masterGain = null;
    this.ambianceNode = null;
    this.isAmbiancePlaying = false;

    // Web Speech API — narration vocale
    this.synthesis = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.speechQueue = [];
    this.currentSentenceIndex = 0;
    this.onSentenceCallback = null;    // appelé à chaque nouvelle phrase
    this.onEndCallback = null;         // appelé quand tout est lu

    this.voicesFr = [];
    this.voicesLoaded = false;
    this._loadVoices();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GESTION DES VOIX
  // ─────────────────────────────────────────────────────────────────────────

  _loadVoices() {
    if (!this.synthesis) return;

    const populate = () => {
      const all = this.synthesis.getVoices();
      this.voicesFr = all.filter(v => v.lang.startsWith('fr'));
      this.voicesLoaded = true;
    };

    if (this.synthesis.getVoices().length > 0) {
      populate();
    } else {
      this.synthesis.addEventListener('voiceschanged', populate);
      // Fallback timeout — certains navigateurs ne déclenchent pas l'événement
      setTimeout(populate, 1200);
    }
  }

  getBestFrenchVoice() {
    if (!this.voicesLoaded) {
      this.voicesFr = this.synthesis ? this.synthesis.getVoices().filter(v => v.lang.startsWith('fr')) : [];
    }
    // Préférence : voix française locale (fr-FR) de haute qualité
    const prefs = ['fr-FR', 'fr_FR', 'fr'];
    for (const pref of prefs) {
      const v = this.voicesFr.find(v => v.lang === pref && !v.name.toLowerCase().includes('compact'));
      if (v) return v;
    }
    return this.voicesFr[0] || null;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // NARRATION VOCALE — API PRINCIPALE
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Lit une histoire complète à voix haute.
   * @param {Array} sentences - tableau de strings (phrases à lire)
   * @param {string} lang - code langue ('fr-FR', etc.)
   * @param {Function} onSentence - callback(index, total) à chaque phrase
   * @param {Function} onEnd - callback quand tout est lu
   */
  speakStory(sentences, lang = 'fr-FR', onSentence = null, onEnd = null) {
    if (!this.synthesis) {
      console.warn('Web Speech API non disponible dans ce navigateur.');
      if (onEnd) onEnd();
      return;
    }

    this.stopNarration();
    this.speechQueue = sentences.filter(s => s && s.trim().length > 0);
    this.currentSentenceIndex = 0;
    this.onSentenceCallback = onSentence;
    this.onEndCallback = onEnd;
    this.isSpeaking = true;

    this._speakNext(lang);
  }

  _speakNext(lang) {
    if (!this.isSpeaking || this.currentSentenceIndex >= this.speechQueue.length) {
      this.isSpeaking = false;
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    const text = this.speechQueue[this.currentSentenceIndex];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92;   // légèrement plus lent pour bien articuler
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = this.getBestFrenchVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      if (this.onSentenceCallback) {
        this.onSentenceCallback(this.currentSentenceIndex, this.speechQueue.length);
      }
    };

    utterance.onend = () => {
      this.currentSentenceIndex++;
      // Petit délai naturel entre les phrases
      setTimeout(() => this._speakNext(lang), 350);
    };

    utterance.onerror = (e) => {
      console.warn('Erreur utterance:', e.error, text.substring(0, 50));
      this.currentSentenceIndex++;
      setTimeout(() => this._speakNext(lang), 200);
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  stopNarration() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentSentenceIndex = 0;
    this.speechQueue = [];
    this.currentUtterance = null;
  }

  pauseNarration() {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.pause();
    }
  }

  resumeNarration() {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  /**
   * Convertit un texte long en tableau de phrases courtes (< 200 chars)
   * pour éviter le bug de coupure à 15 secondes de Chrome.
   */
  static splitIntoSentences(text) {
    if (!text) return [];
    // Découpe sur ponctuation forte
    const raw = text.split(/(?<=[.!?:;])\s+/);
    const result = [];
    for (const chunk of raw) {
      if (chunk.length <= 220) {
        if (chunk.trim()) result.push(chunk.trim());
      } else {
        // Découpe sur virgule pour les phrases très longues
        const sub = chunk.split(/,\s+/);
        let acc = '';
        for (const part of sub) {
          if ((acc + part).length > 200) {
            if (acc.trim()) result.push(acc.trim());
            acc = part;
          } else {
            acc = acc ? acc + ', ' + part : part;
          }
        }
        if (acc.trim()) result.push(acc.trim());
      }
    }
    return result.filter(s => s.length > 1);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // AMBIANCE MUSICALE — WEB AUDIO API
  // ─────────────────────────────────────────────────────────────────────────

  initAudioContext() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime); // ambiance subtile
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio API non disponible:', e);
    }
  }

  playKoraNote(freq, delay = 0, duration = 1.4) {
    if (!this.ctx) this.initAudioContext();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.998, t + duration);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.7, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.start(t);
      osc.stop(t + duration);
    } catch (e) {}
  }

  startAmbience(mode = 'campfire') {
    if (!this.ctx) this.initAudioContext();
    if (!this.ctx || this.isAmbiancePlaying) return;
    this.isAmbiancePlaying = true;

    const KORA_PENTATONIC = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.26, 784.00];
    const patterns = {
      campfire: [0, 2, 4, 2, 0, 4, 7, 5],
      veillee:  [0, 4, 2, 7, 5, 2, 0, 4],
      sahel:    [0, 2, 5, 7, 2, 0, 3, 5],
    };
    const pattern = patterns[mode] || patterns.campfire;

    const loop = (step = 0) => {
      if (!this.isAmbiancePlaying) return;
      const note = KORA_PENTATONIC[pattern[step % pattern.length]];
      this.playKoraNote(note, 0, 1.2);
      if (step % 3 === 0) this.playKoraNote(note * 1.498, 0.08, 0.9);
      setTimeout(() => loop(step + 1), 680);
    };
    loop();
  }

  stopAmbience() {
    this.isAmbiancePlaying = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        }
      }, 600);
    }
  }

  // Test rapide des haut-parleurs
  testSound() {
    this.initAudioContext();
    if (!this.ctx) return;
    const KORA = [261.63, 329.63, 392.00, 523.25, 659.26];
    KORA.forEach((f, i) => this.playKoraNote(f, i * 0.18, 1.0));
    // Aussi tester la synthèse vocale
    if (this.synthesis) {
      const u = new SpeechSynthesisUtterance('Test audio — Mémoire du Burkina');
      u.lang = 'fr-FR';
      u.volume = 1;
      u.rate = 1.0;
      const v = this.getBestFrenchVoice();
      if (v) u.voice = v;
      this.synthesis.cancel();
      this.synthesis.speak(u);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton global
// ─────────────────────────────────────────────────────────────────────────────
window.fasoAudio = new FasoAudioEngine();
