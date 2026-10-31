/**
 * FASO MULTIMEDIA STORYBOOK READER - LECTEUR MULTIMÉDIA IMMERSIF
 * Vue narrative avec illustration haute définition, audio bilingue synchronisé (Karaoké),
 * lecteur audio intégré, annotations culturelles interactives et musique d'ambiance.
 */

class FasoStoryReader {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.currentStory = null;
    this.currentSectionIndex = 0;
    this.isPlayingAudio = false;
    this.selectedLanguage = "fr"; // "fr" ou "native"
    this.onClose = options.onClose || null;
    this.onStartInteractive = options.onStartInteractive || null;
  }

  openStory(story) {
    this.currentStory = story;
    this.currentSectionIndex = 0;
    this.isPlayingAudio = false;
    this.render();
  }

  close() {
    if (window.fasoAudio) {
      window.fasoAudio.stopNarration();
      window.fasoAudio.stopAmbience();
    }
    if (this.container) {
      this.container.classList.add("hidden");
    }
    if (this.onClose) this.onClose();
  }

  render() {
    if (!this.container || !this.currentStory) return;
    const s = this.currentStory;

    this.container.classList.remove("hidden");
    this.container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
        <div class="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden animate-fade-in text-stone-100">

          <!-- Barre d'en-tête du lecteur -->
          <div class="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border-b border-amber-900/40">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ${s.category}
              </span>
              <span class="text-xs text-amber-400/80 font-medium hidden sm:inline">
                📍 ${s.regionName} • ${s.ethnic}
              </span>
            </div>

            <!-- Boutons de fermeture et actions -->
            <div class="flex items-center gap-2">
              <button id="btn-reader-interactive" class="px-3 py-1 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md transition-all flex items-center gap-1.5">
                <span>🌳</span> <span>Mode Arbre à Palabres</span>
              </button>
              <button id="btn-reader-close" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-all text-lg font-bold">
                ✕
              </button>
            </div>
          </div>

          <!-- Contenu scindé : En haut illustration et lecteur audio, en bas texte bilingue -->
          <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">

            <!-- Bloc Image Héros et Titre -->
            <div class="relative w-full rounded-2xl overflow-hidden border border-amber-900/40 shadow-xl group">
              <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-56 sm:h-72 md:h-80 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-5 md:p-7">
                <span class="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">${s.nativeTitle || s.place}</span>
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-100 drop-shadow-md leading-tight">
                  ${s.title}
                </h2>
                <p class="text-stone-300 text-xs sm:text-sm max-w-3xl mt-2 line-clamp-2 leading-relaxed">
                  ${s.synopsis}
                </p>
              </div>
            </div>

            <!-- Barre de Contrôle Multimédia (Audio & Salutation) -->
            <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-900/40 shadow-inner">
              <!-- Lecteur de Narration Vocale -->
              <div class="flex items-center gap-3">
                <button id="btn-play-narration" class="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-stone-950 flex items-center justify-center font-bold text-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                  <span id="play-icon">▶</span>
                </button>
                <div>
                  <div class="text-xs font-bold text-amber-200">Narration Vocale du Griot</div>
                  <div class="text-[11px] text-stone-400" id="narration-status">Prêt à conter • ${s.duration}</div>
                </div>
              </div>

              <!-- Ambiance sonore africaine (Kora, Balafon, Djembé) -->
              <div class="flex items-center gap-2">
                <button id="btn-toggle-soundscape" class="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all">
                  <span id="soundscape-icon">🎵</span>
                  <span id="soundscape-label">Ambiance Kora / Sahel : Off</span>
                </button>
              </div>

              <!-- Bascule Français / Langue Nationale -->
              <div class="flex items-center bg-stone-950 rounded-xl p-1 border border-amber-900/60 text-xs">
                <button id="btn-lang-fr" class="px-3 py-1 rounded-lg font-bold transition-all bg-amber-500 text-stone-950">
                  Français
                </button>
                <button id="btn-lang-native" class="px-3 py-1 rounded-lg font-bold transition-all text-amber-300 hover:text-white">
                  ${s.languages[1] || "Langue Nationale"}
                </button>
              </div>
            </div>

            <!-- Message d'accueil traditionnel et salutation -->
            ${s.audioGreeting ? `
              <div class="p-3.5 rounded-xl bg-amber-950/30 border-l-4 border-amber-500 flex items-start gap-3 text-xs">
                <span class="text-xl">🎙️</span>
                <div>
                  <div class="font-bold text-amber-300 mb-0.5">Parole sacrée d'ouverture :</div>
                  <div class="italic text-amber-100 font-serif text-sm">
                    "${s.audioGreeting.moore || s.audioGreeting.dioula || s.audioGreeting.fulfulde || s.audioGreeting.dagara || s.audioGreeting.kassena || ''}"
                  </div>
                  <div class="text-stone-400 text-[11px] mt-0.5">${s.audioGreeting.french}</div>
                </div>
              </div>
            ` : ''}

            <!-- Texte complet du conte avec chapitres synchronisés -->
            <div class="space-y-6 pt-2" id="story-sections-container">
              ${s.sections.map((sec, idx) => `
                <div class="story-section-card p-4 sm:p-5 rounded-2xl bg-stone-950/40 border border-stone-800 hover:border-amber-500/30 transition-all duration-300" data-section-idx="${idx}">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-base sm:text-lg font-bold text-amber-300">
                      ${sec.title}
                    </h3>
                    <button class="btn-read-single-section px-2.5 py-1 text-[11px] rounded-lg bg-stone-800 hover:bg-amber-500/20 text-stone-300 hover:text-amber-200 border border-stone-700 transition-all" data-sec-idx="${idx}">
                      🔊 Écouter cette partie
                    </button>
                  </div>

                  <!-- Texte Français et Texte en Langue Nationale en miroir -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Colonne Française -->
                    <div class="section-text-fr text-sm sm:text-base text-stone-200 leading-relaxed font-serif">
                      ${this.highlightKeywords(sec.textFr)}
                    </div>
                    <!-- Colonne Langue Nationale -->
                    <div class="section-text-native text-sm sm:text-base text-amber-200/90 leading-relaxed font-serif bg-stone-900/60 p-3 rounded-xl border border-amber-900/20 italic">
                      ${sec.textNative}
                    </div>
                  </div>

                  <!-- Annotation culturelle / Note du griot -->
                  ${sec.annotation ? `
                    <div class="mt-3 pt-3 border-t border-stone-800/80 flex items-start gap-2 text-xs text-amber-400/90 bg-amber-950/20 p-2.5 rounded-lg">
                      <span class="text-amber-400 font-bold">💡 Note :</span>
                      <span>${sec.annotation}</span>
                    </div>
                  ` : ''}
                </div>
              `).join("")}
            </div>

            <!-- Morale ancestrale du conte -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-900/30 via-stone-900 to-amber-900/20 border border-amber-500/30 text-center space-y-2">
              <span class="text-xs uppercase tracking-widest text-amber-400 font-bold">Enseignement & Morale des Anciens</span>
              <p class="text-base sm:text-lg font-serif italic text-amber-100 max-w-2xl mx-auto">
                "${s.moral}"
              </p>
              <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
                ${s.tags.map(t => `<span class="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-stone-800 text-amber-300 border border-amber-500/20">#${t}</span>`).join("")}
              </div>
            </div>

          </div>

          <!-- Pied de page du lecteur -->
          <div class="px-5 py-3 bg-stone-950 border-t border-amber-900/40 flex items-center justify-between text-xs text-stone-400">
            <div>Faso Contes & Légendes • Préservation du Patrimoine Oral</div>
            <button id="btn-reader-bottom-close" class="hover:text-amber-300 transition-colors">Fermer la lecture</button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  highlightKeywords(text) {
    // Rend les termes clés comme Naba, Pulaaku, Dolo cliquables avec infobulle
    let result = text;
    FASO_GLOSSARY.forEach(item => {
      const regex = new RegExp(`\\b(${item.term})\\b`, "gi");
      result = result.replace(regex, `<span class="glossary-term underline decoration-amber-500/60 decoration-dotted cursor-help text-amber-300 font-medium" title="${item.def}">$1</span>`);
    });
    return result;
  }

  bindEvents() {
    const s = this.currentStory;
    const closeBtn = this.container.querySelector("#btn-reader-close");
    const bottomCloseBtn = this.container.querySelector("#btn-reader-bottom-close");
    const interactiveBtn = this.container.querySelector("#btn-reader-interactive");
    const playNarrationBtn = this.container.querySelector("#btn-play-narration");
    const playIcon = this.container.querySelector("#play-icon");
    const narrationStatus = this.container.querySelector("#narration-status");
    const soundscapeBtn = this.container.querySelector("#btn-toggle-soundscape");
    const soundscapeLabel = this.container.querySelector("#soundscape-label");

    const btnLangFr = this.container.querySelector("#btn-lang-fr");
    const btnLangNative = this.container.querySelector("#btn-lang-native");
    const nativeTexts = this.container.querySelectorAll(".section-text-native");
    const frTexts = this.container.querySelectorAll(".section-text-fr");

    // Fermeture
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (bottomCloseBtn) bottomCloseBtn.addEventListener("click", () => this.close());

    // Arbre à palabres interactif
    if (interactiveBtn) {
      interactiveBtn.addEventListener("click", () => {
        this.close();
        if (this.onStartInteractive) {
          this.onStartInteractive(s.id);
        }
      });
    }

    // Bascule de langue (Affichage prioritaire)
    btnLangFr.addEventListener("click", () => {
      btnLangFr.classList.add("bg-amber-500", "text-stone-950");
      btnLangFr.classList.remove("text-amber-300");
      btnLangNative.classList.remove("bg-amber-500", "text-stone-950");
      btnLangNative.classList.add("text-amber-300");
      frTexts.forEach(el => el.classList.remove("hidden"));
    });

    btnLangNative.addEventListener("click", () => {
      btnLangNative.classList.add("bg-amber-500", "text-stone-950");
      btnLangNative.classList.remove("text-amber-300");
      btnLangFr.classList.remove("bg-amber-500", "text-stone-950");
      btnLangFr.classList.add("text-amber-300");
    });

    // Lecture / Pause Narration
    playNarrationBtn.addEventListener("click", () => {
      if (this.isPlayingAudio) {
        window.fasoAudio.stopNarration();
        this.isPlayingAudio = false;
        playIcon.textContent = "▶";
        narrationStatus.textContent = "Narration en pause";
      } else {
        this.playCurrentSection(this.currentSectionIndex);
      }
    });

    // Ambiance sonore africaine
    soundscapeBtn.addEventListener("click", () => {
      const preset = s.id === "dafra" ? "dafra" : (s.id === "yennenga" ? "yennenga" : "veillee");
      const isNowPlaying = window.fasoAudio.toggleAmbience(preset);
      soundscapeLabel.textContent = isNowPlaying ? "Ambiance Kora / Sahel : Actif 🎶" : "Ambiance Kora / Sahel : Off";
      soundscapeBtn.classList.toggle("bg-amber-500/30", isNowPlaying);
      soundscapeBtn.classList.toggle("text-amber-200", isNowPlaying);
    });

    // Écouter une section spécifique
    const singleSectionBtns = this.container.querySelectorAll(".btn-read-single-section");
    singleSectionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-sec-idx"), 10);
        this.playCurrentSection(idx);
      });
    });
  }

  playCurrentSection(index) {
    if (!this.currentStory || !window.fasoAudio) return;
    const s = this.currentStory;
    if (index >= s.sections.length) {
      this.isPlayingAudio = false;
      const playIcon = this.container.querySelector("#play-icon");
      const narrationStatus = this.container.querySelector("#narration-status");
      if (playIcon) playIcon.textContent = "▶";
      if (narrationStatus) narrationStatus.textContent = "Conte terminé avec sagesse";
      return;
    }

    this.currentSectionIndex = index;
    const sec = s.sections[index];
    const playIcon = this.container.querySelector("#play-icon");
    const narrationStatus = this.container.querySelector("#narration-status");
    const sectionCards = this.container.querySelectorAll(".story-section-card");

    // Surlignage de la carte active
    sectionCards.forEach((c, idx) => {
      c.classList.toggle("ring-2", idx === index);
      c.classList.toggle("ring-amber-500", idx === index);
      c.classList.toggle("bg-amber-950/20", idx === index);
    });

    this.isPlayingAudio = true;
    if (playIcon) playIcon.textContent = "⏸";
    if (narrationStatus) narrationStatus.textContent = `Lecture : ${sec.title}`;

    window.fasoAudio.speakStorySection(
      sec.textFr,
      "fr-FR",
      (e) => {
        // Callback frontière mot / synchronisation
      },
      () => {
        // Fin de la section -> passage à la suivante si lecture globale
        this.playCurrentSection(index + 1);
      }
    );
  }
}

window.FasoStoryReader = FasoStoryReader;
