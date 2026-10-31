/**
 * FASO AUDIO ENGINE - MOTEUR AUDIO TRADITIONNEL & SYNTHÉTISEUR D'AMBIANCE
 * Synthèse Web Audio API des instruments africains (Kora, Balafon, Djembé, Grillons du Sahel)
 * et gestionnaire de narration vocale bilingue synchrone.
 */

class FasoAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingAmbience = false;
    this.currentPreset = "veillee";
    this.ambienceVolume = 0.35;
    this.masterGain = null;
    this.schedulerTimer = null;
    this.nextNoteTime = 0;
    this.currentNoteIndex = 0;

    // Gamme pentatonique sahélienne traditionnelle (Mandingue / Mossi)
    this.pentatonicScale = [
      146.83, // D3 (fondamentale grave)
      164.81, // E3
      196.00, // G3
      220.00, // A3
      246.94, // B3
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      493.88, // B4
      587.33  // D5 (aigu cristallin de la Kora)
    ];

    // Narration Speech Engine
    this.synth = window.speechSynthesis || null;
    this.availableVoices = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.speechQueue = [];
    this.onSectionChange = null;
    this.onTimeUpdate = null;
    this.onNarrationEnd = null;

    if (this.synth) {
      this.loadVoices();
      if (typeof this.synth.onvoiceschanged !== "undefined") {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.availableVoices = this.synth.getVoices() || [];
  }

  playAudioTest() {
    this.initAudioContext();
    if (!this.ctx) return;
    // Joue un accord carillonnant de Kora + note de Balafon + basse de djembé
    const t = this.ctx.currentTime;
    this.playDjembe(true, t);
    this.playKoraNote(220.0, t + 0.05, 1.5);
    this.playKoraNote(293.66, t + 0.15, 1.5);
    this.playBalafonNote(392.0, t + 0.25, 1.0);
    this.playKoraNote(440.0, t + 0.35, 1.8);
    this.playKoraNote(587.33, t + 0.45, 2.0);
  }

  initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.ambienceVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // --- SYNTHÈSE D'INSTRUMENTS TRADITIONNELS AFRICAINS ---

  /**
   * Synthèse Kora (Harpe-luth africaine à cordes pincées)
   */
  playKoraNote(freq, time = 0, duration = 1.8) {
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);

    oscHarmonic.type = "sine";
    oscHarmonic.frequency.setValueAtTime(freq * 2, t);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, t);
    filter.frequency.exponentialRampToValueAtTime(350, t + duration);

    // Enveloppe d'attaque pincée de corde de calebasse
    gainNode.gain.setValueAtTime(0.001, t);
    gainNode.gain.linearRampToValueAtTime(0.4, t + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(t);
    oscHarmonic.start(t);
    osc.stop(t + duration);
    oscHarmonic.stop(t + duration);
  }

  /**
   * Synthèse Balafon (Lames de bois et résonance de calebasse)
   */
  playBalafonNote(freq, time = 0, duration = 0.9) {
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const clickOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    // Le "clic" sec de la mailloche en bois frappant la lame
    clickOsc.type = "square";
    clickOsc.frequency.setValueAtTime(freq * 3.8, t);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq * 1.5, t);
    filter.Q.setValueAtTime(4.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(filter);
    clickOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    clickOsc.start(t);
    osc.stop(t + duration);
    clickOsc.stop(t + 0.04);
  }

  /**
   * Synthèse Djembé / Dunun (Percussion membrane basse africaine)
   */
  playDjembe(isBass = true, time = 0) {
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    if (isBass) {
      osc.frequency.setValueAtTime(115, t);
      osc.frequency.exponentialRampToValueAtTime(48, t + 0.28);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    } else {
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(95, t + 0.14);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.36);
  }

  /**
   * Synthèse Ambiance Nuit Sahélienne (Chant doux des grillons et brise)
   */
  playCricketChirp(time = 0) {
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const pulseTime = t + i * 0.04;

      osc.type = "sine";
      osc.frequency.setValueAtTime(4500 + Math.random() * 400, pulseTime);

      gain.gain.setValueAtTime(0.0001, pulseTime);
      gain.gain.linearRampToValueAtTime(0.02, pulseTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, pulseTime + 0.035);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(pulseTime);
      osc.stop(pulseTime + 0.04);
    }
  }

  // --- MOTEUR DE BOUCLE MUSICALE INTERACTIVE ---

  startAmbience(preset = "veillee") {
    this.initAudioContext();
    this.currentPreset = preset;
    this.isPlayingAmbience = true;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.currentNoteIndex = 0;
    this.scheduleNotes();
  }

  stopAmbience() {
    this.isPlayingAmbience = false;
    if (this.schedulerTimer) {
      clearTimeout(this.schedulerTimer);
      this.schedulerTimer = null;
    }
  }

  toggleAmbience(preset = "veillee") {
    if (this.isPlayingAmbience) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience(preset);
      return true;
    }
  }

  setVolume(vol) {
    this.ambienceVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.ambienceVolume, this.ctx.currentTime);
    }
  }

  scheduleNotes() {
    if (!this.isPlayingAmbience || !this.ctx) return;

    const lookahead = 0.1;
    const scheduleAheadTime = 0.25;

    while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
      const step = this.currentNoteIndex % 16;

      // Rythmique et arpèges selon le preset
      if (this.currentPreset === "veillee") {
        // Veillée au village : Kora contemplative + djembé doux + grillons
        if (step % 2 === 0) {
          const noteFreq = this.pentatonicScale[Math.floor(Math.random() * this.pentatonicScale.length)];
          this.playKoraNote(noteFreq, this.nextNoteTime, 1.4);
        }
        if (step === 0 || step === 8) {
          this.playDjembe(true, this.nextNoteTime);
        } else if (step === 4 || step === 12) {
          this.playDjembe(false, this.nextNoteTime);
        }
        if (step % 4 === 0 && Math.random() > 0.4) {
          this.playCricketChirp(this.nextNoteTime + 0.1);
        }
      } else if (this.currentPreset === "dafra") {
        // Eaux Sacrées de Dafra : Balafon fluide et Kora aérienne
        if (step % 2 === 0) {
          const balafonNotes = [this.pentatonicScale[2], this.pentatonicScale[4], this.pentatonicScale[5], this.pentatonicScale[7]];
          const f = balafonNotes[step / 2 % balafonNotes.length];
          this.playBalafonNote(f, this.nextNoteTime, 0.7);
        }
        if (step === 7 || step === 15) {
          this.playKoraNote(this.pentatonicScale[8], this.nextNoteTime, 1.6);
        }
      } else if (this.currentPreset === "yennenga") {
        // Chevauchée de Yennenga : Rythme de galop dynamique
        if (step % 3 === 0) {
          this.playDjembe(true, this.nextNoteTime);
        } else {
          this.playDjembe(false, this.nextNoteTime);
        }
        if (step % 4 === 0) {
          this.playKoraNote(this.pentatonicScale[6], this.nextNoteTime, 0.8);
        }
      }

      // Tempo : 100 BPM (environ 0.15s par double-croche)
      const stepTime = 0.15;
      this.nextNoteTime += stepTime;
      this.currentNoteIndex++;
    }

    this.schedulerTimer = setTimeout(() => this.scheduleNotes(), lookahead * 1000);
  }

  // --- NARRATION VOCALE MULTILINGUE ROBUSTE (Web Speech API avec file d'attente) ---

  speakStorySection(text, lang = "fr-FR", onBoundary = null, onEnd = null) {
    if (!this.synth) {
      console.warn("Web Speech API non disponible sur ce navigateur. Lecture d'ambiance musicale.");
      this.playAudioTest();
      if (onEnd) onEnd();
      return;
    }

    this.stopNarration();
    this.synth.resume(); // Débloque le mutex éventuel des navigateurs Chromium/Linux
    this.isSpeaking = true;

    // Découpage en phrases pour contourner la limite de 15 secondes / 200 caractères de Chrome
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sentences.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    this.speechQueue = [...sentences];
    this.playNextSentence(lang, onBoundary, onEnd);
  }

  playNextSentence(lang, onBoundary, onEnd) {
    if (!this.isSpeaking || this.speechQueue.length === 0) {
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    const sentence = this.speechQueue.shift();
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = lang;
    utterance.rate = 0.95; // Rythme naturel de conteur
    utterance.pitch = 1.0;

    // Sélection de la meilleure voix disponible
    if (this.availableVoices.length === 0) {
      this.loadVoices();
    }

    const voices = this.availableVoices;
    const frVoice = voices.find(v => v.lang.startsWith("fr") || v.lang.startsWith("fr_"));
    const anyVoice = frVoice || voices[0];
    if (anyVoice) {
      utterance.voice = anyVoice;
    }

    utterance.onboundary = (e) => {
      if (onBoundary) onBoundary(e);
    };

    utterance.onend = () => {
      if (this.speechQueue.length > 0 && this.isSpeaking) {
        this.playNextSentence(lang, onBoundary, onEnd);
      } else {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      }
    };

    utterance.onerror = (e) => {
      console.warn("Erreur ou interruption de parole :", e);
      if (this.speechQueue.length > 0 && this.isSpeaking) {
        this.playNextSentence(lang, onBoundary, onEnd);
      } else {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      }
    };

    this.currentUtterance = utterance;
    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn("Échec speak(), repli musical:", err);
      this.playAudioTest();
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  stopNarration() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  pauseNarration() {
    if (this.synth && this.isSpeaking) {
      this.synth.pause();
    }
  }

  resumeNarration() {
    if (this.synth) {
      this.synth.resume();
    }
  }
}

// Instance globale du moteur audio
window.fasoAudio = new FasoAudioEngine();
