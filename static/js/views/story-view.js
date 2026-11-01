/**
 * MÉMOIRE DU BURKINA — VUE IMMERSIVE DU RÉCIT & LECTEUR PAR ÉTAPES
 * =================================================================
 * Inspirée de l'expérience de christianilboudo.tech :
 *  - Lecteur audio HTML5 officiel bien en évidence (voix du conteur)
 *  - Lecteur par étapes (Étape 1/4, 2/4...) avec contrôles Précédent / Suivant et points d'étapes
 *  - Texte en miroir bilingue (Langue nationale & Français)
 *  - Enseignement & Morale des Aïeux mis en valeur
 *  - Bascule vers la veillée au clair de lune (« Autour du feu »)
 */

class FasoStoryView {
  constructor(containerId = "main-view-host") {
    this.container = document.getElementById(containerId);
    this.currentStep = 0;
    this.story = null;
  }

  render(storyId) {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || window.FASO_STORIES || [];
    this.story = stories.find(item => item.id === storyId) || stories[0];
    const s = this.story;
    if (!s) return;

    this.currentStep = 0;

    // Normalisation des chapitres/étapes
    const chapters = this.getNormalizedChapters(s);
    const primaryLang = (s.languages && s.languages[0]) || s.language || "Français";
    const audioSrc = `/static/audio/${s.id}.mp3`;
    const heroImg = `/static/assets/illustrations/${s.heroImage || s.image || 'burkina-panoramic.svg'}`;

    this.container.innerHTML = `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-8">
        
        <!-- Fil d'Ariane & Retour -->
        <div class="flex items-center justify-between text-xs text-stone-400">
          <button id="btn-back-library" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors">
            ${window.fasoIcon ? window.fasoIcon('arrowLeft', 'w-3.5 h-3.5') : '←'}
            <span>Retour à la collection</span>
          </button>
          <span class="font-mono text-stone-500">
            ${s.regionName} • ${s.ethnic || 'Patrimoine oral'}
          </span>
        </div>

        <!-- Grande Scène Illustrée -->
        <div class="relative w-full h-80 sm:h-96 md:h-[400px] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 group">
          <img src="${heroImg}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
                ${s.category || s.type || 'Conte'}
              </span>
              <span class="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-stone-900/90 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-md">
                ${window.fasoIcon ? window.fasoIcon('pin', 'w-3 h-3 text-amber-400') : '📍'}
                <span>${s.regionName}</span>
              </span>
              <span class="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-stone-900/80 text-stone-300 border border-stone-800">
                ${s.duration || '5 min'}
              </span>
            </div>
            <h1 class="text-2xl sm:text-4xl md:text-5xl font-black text-amber-50 font-heading leading-tight drop-shadow-md">
              ${s.title}
            </h1>
            ${s.nativeTitle && s.nativeTitle !== s.title ? `
              <p class="text-sm sm:text-base text-amber-300 font-serif italic">
                « ${s.nativeTitle} »
              </p>
            ` : ''}
          </div>
        </div>

        <!-- BLOC AUDIO MAÎTRE (Style christianilboudo.tech) -->
        <div class="p-6 sm:p-7 rounded-3xl bg-stone-900/95 border border-amber-500/40 shadow-2xl space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Enregistrement Sonore Authentique
                </span>
              </div>
              <h3 class="text-lg font-bold text-amber-100 font-heading">
                Écouter le conte en ${primaryLang}
              </h3>
              <p class="text-xs text-stone-400">
                ${s.audioCredit || s.credit || s.narratorName || 'Récit transmis par les conteurs du terroir'}
              </p>
            </div>

            <div class="flex items-center gap-3">
              <button id="btn-goto-campfire" class="px-4 py-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-xs transition-all flex items-center gap-2 shadow-md">
                ${window.fasoIcon ? window.fasoIcon('flame', 'w-4 h-4 text-orange-400') : '🔥'}
                <span>Mode Autour du Feu</span>
              </button>
            </div>
          </div>

          <!-- Lecteur HTML5 Natif haute compatibilité -->
          <div class="pt-2">
            <audio id="story-master-audio" controls class="w-full h-11 rounded-xl shadow-inner" preload="metadata" src="${audioSrc}">
              Votre navigateur ne prend pas en charge la lecture audio HTML5.
            </audio>
          </div>
        </div>

        <!-- LECTEUR PAR ÉTAPES INTERACTIF (Style christianilboudo.tech #explorer) -->
        <div class="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-6" id="chapter-reader-box">
          
          <!-- En-tête de l'étape -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <span class="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                Étape <span id="chapter-current-num">1</span> / ${chapters.length}
              </span>
              <h3 id="chapter-title" class="text-lg sm:text-xl font-bold text-amber-200 font-heading">
                ${chapters[0].title}
              </h3>
            </div>

            <!-- Contrôles précédent / suivant et points indicateurs -->
            <div class="flex items-center gap-2">
              <button id="btn-prev-chapter" class="px-3.5 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 disabled:opacity-30 disabled:pointer-events-none border border-stone-800 text-xs font-bold transition-all flex items-center gap-1.5" disabled>
                ${window.fasoIcon ? window.fasoIcon('arrowLeft', 'w-3 h-3') : '←'}
                <span>Précédent</span>
              </button>

              <div id="chapter-dots" class="flex items-center gap-1 px-2">
                ${chapters.map((_, i) => `
                  <button class="chapter-dot w-2.5 h-2.5 rounded-full transition-all ${i === 0 ? 'bg-amber-400 w-6' : 'bg-stone-700'}" data-dot-idx="${i}" title="Étape ${i + 1}"></button>
                `).join("")}
              </div>

              <button id="btn-next-chapter" class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-all flex items-center gap-1.5 shadow-md">
                <span>Suivant</span>
                ${window.fasoIcon ? window.fasoIcon('arrowRight', 'w-3 h-3') : '→'}
              </button>
            </div>
          </div>

          <!-- Corps du chapitre : Bilingue -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <!-- Texte Français -->
            <div class="space-y-2">
              <div class="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                ${window.fasoIcon ? window.fasoIcon('document', 'w-3 h-3 text-amber-400') : '📄'}
                <span>Récit en Français</span>
              </div>
              <div id="chapter-text-fr" class="text-sm sm:text-base text-stone-100 leading-relaxed font-serif p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 min-h-[140px]">
                ${chapters[0].textFr}
              </div>
            </div>

            <!-- Texte en Langue Nationale -->
            <div class="space-y-2">
              <div class="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                ${window.fasoIcon ? window.fasoIcon('speaker', 'w-3 h-3 text-amber-400') : '🗣️'}
                <span>Parole en ${primaryLang}</span>
              </div>
              <div id="chapter-text-native" class="text-sm sm:text-base text-amber-200/90 leading-relaxed font-serif italic p-5 rounded-2xl bg-stone-950/90 border border-amber-900/30 min-h-[140px]">
                ${chapters[0].textNative || chapters[0].textFr}
              </div>
            </div>

          </div>

          <!-- Boîte Morale conditionnelle (apparaît à la dernière étape) -->
          <div id="chapter-moral-box" class="${chapters.length === 1 ? '' : 'hidden'} p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-950 to-amber-950/40 border border-amber-500/40 text-center space-y-2">
            <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              ✨ La Sagesse des Aïeux
            </span>
            <p class="text-sm sm:text-base font-serif italic text-amber-100 max-w-2xl mx-auto leading-relaxed">
              "${s.moral || 'La parole juste est un remède pour le cœur.'}"
            </p>
          </div>

        </div>

        <!-- Salutation traditionnelle d'ouverture si présente -->
        ${s.audioGreeting ? `
          <div class="p-5 rounded-2xl bg-stone-900/50 border-l-4 border-amber-500 flex items-start gap-3.5 text-xs">
            <div class="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              ${window.fasoIcon ? window.fasoIcon('speaker', 'w-4 h-4') : '🗣️'}
            </div>
            <div>
              <div class="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                Parole d'ouverture traditionnelle :
              </div>
              <div class="text-sm sm:text-base font-serif italic text-amber-100 font-bold mt-1">
                "${s.audioGreeting.native || s.audioGreeting.moore || s.audioGreeting.dioula}"
              </div>
              <div class="text-stone-400 text-xs mt-0.5">
                ${s.audioGreeting.french}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Tags et thématiques culturelles -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-stone-500">Mots-clés :</span>
            ${(s.tags || []).map(t => `<span class="px-3 py-1 rounded-full text-[11px] font-bold bg-stone-900 text-amber-400 border border-amber-500/20">#${t}</span>`).join("")}
          </div>
          <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="text-amber-400 hover:text-amber-300 font-semibold">
            Haut de page ↑
          </button>
        </div>

      </div>
    `;

    this.bindEvents(chapters);
  }

  getNormalizedChapters(s) {
    if (s.chapters && Array.isArray(s.chapters) && s.chapters.length > 0) {
      return s.chapters.map((ch, idx) => {
        if (Array.isArray(ch)) {
          return {
            title: ch[0] || `Étape ${idx + 1}`,
            textFr: ch[1] || "",
            textNative: ch[1] || ""
          };
        }
        return {
          title: ch.title || `Étape ${idx + 1}`,
          textFr: ch.textFr || ch.text || "",
          textNative: ch.textNative || ch.textFr || ""
        };
      });
    }

    if (s.sections && Array.isArray(s.sections) && s.sections.length > 0) {
      return s.sections.map((sec, idx) => ({
        title: sec.title || `Passage ${idx + 1}`,
        textFr: sec.textFr || "",
        textNative: sec.textNative || sec.textFr || ""
      }));
    }

    return [{
      title: "Récit Intégral",
      textFr: s.synopsis || s.excerpt || "",
      textNative: s.nativeTitle || s.synopsis || ""
    }];
  }

  bindEvents(chapters) {
    const backBtn = this.container.querySelector("#btn-back-library");
    const campfireBtn = this.container.querySelector("#btn-goto-campfire");
    const prevBtn = this.container.querySelector("#btn-prev-chapter");
    const nextBtn = this.container.querySelector("#btn-next-chapter");
    const dots = this.container.querySelectorAll(".chapter-dot");

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.fasoRouter) window.fasoRouter.navigateTo("library");
      });
    }

    if (campfireBtn) {
      campfireBtn.addEventListener("click", () => {
        if (window.fasoRouter && this.story) {
          window.fasoRouter.navigateTo("campfire", this.story.id);
        }
      });
    }

    const updateStep = (newStep) => {
      this.currentStep = Math.max(0, Math.min(chapters.length - 1, newStep));
      const ch = chapters[this.currentStep];

      // Mise à jour textes
      const titleEl = this.container.querySelector("#chapter-title");
      const numEl = this.container.querySelector("#chapter-current-num");
      const textFrEl = this.container.querySelector("#chapter-text-fr");
      const textNativeEl = this.container.querySelector("#chapter-text-native");
      const moralBox = this.container.querySelector("#chapter-moral-box");

      if (titleEl) titleEl.textContent = ch.title;
      if (numEl) numEl.textContent = this.currentStep + 1;
      if (textFrEl) textFrEl.textContent = ch.textFr;
      if (textNativeEl) textNativeEl.textContent = ch.textNative || ch.textFr;

      // Boutons précédent / suivant
      if (prevBtn) prevBtn.disabled = this.currentStep === 0;
      if (nextBtn) nextBtn.disabled = this.currentStep === chapters.length - 1;

      // Points d'étapes
      dots.forEach((d, i) => {
        if (i === this.currentStep) {
          d.className = "chapter-dot w-6 h-2.5 rounded-full bg-amber-400 transition-all";
        } else {
          d.className = "chapter-dot w-2.5 h-2.5 rounded-full bg-stone-700 transition-all";
        }
      });

      // Boîte morale visible à la dernière étape
      if (moralBox) {
        moralBox.classList.toggle("hidden", this.currentStep !== chapters.length - 1);
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => updateStep(this.currentStep - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => updateStep(this.currentStep + 1));
    }

    dots.forEach(d => {
      d.addEventListener("click", () => {
        const idx = parseInt(d.dataset.dotIdx, 10);
        updateStep(idx);
      });
    });
  }
}

window.FasoStoryView = FasoStoryView;
