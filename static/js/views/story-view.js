/**
 * MÉMOIRE DU BURKINA — VUE ÉDITORIALE ET FUSION MULTIMÉDIA DU CONTE
 * Fiche détaillée du récit, lecteur audio intégré, miroir bilingue synchrone,
 * contexte de collecte et accès direct au mode « Écouter autour du feu ».
 */

class FasoStoryView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(storyId) {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || [];
    const s = stories.find(item => item.id === storyId) || stories[0];
    if (!s) return;

    this.container.innerHTML = `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-10">
        
        <!-- Navigation fil d'Ariane -->
        <div class="flex items-center justify-between text-xs text-stone-400">
          <button id="btn-back-library" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors">
            ${window.fasoIcon('arrowLeft', 'w-3.5 h-3.5')}
            <span>Retour à la bibliothèque</span>
          </button>
          <span class="font-mono text-stone-500">Réf. ${s.id} • ${s.year || "Tradition orale séculaire"}</span>
        </div>

        <!-- Grande Scène Illustrée Héroïque -->
        <div class="relative w-full h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 group">
          <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-12 space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
                ${s.category}
              </span>
              <span class="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-stone-900/90 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-md">
                ${window.fasoIcon('pin', 'w-3 h-3 text-amber-400')}
                <span>${s.regionName} (${s.locality || s.place || 'Terroir traditionnel'})</span>
              </span>
            </div>
            <h1 class="text-2xl sm:text-4xl md:text-5xl font-black text-amber-50 font-heading leading-tight drop-shadow-md">
              ${s.title}
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              ${s.synopsis}
            </p>
          </div>
        </div>

        <!-- Barre d'Action Multimédia & Audio Rapide -->
        <div class="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl flex flex-wrap items-center justify-between gap-5">
          <div class="flex flex-wrap items-center gap-3">
            <button id="btn-play-story" class="btn-primary text-xs py-3 px-6 shadow-lg flex items-center gap-2">
              ${window.fasoIcon('play', 'w-3.5 h-3.5 fill-stone-950')}
              <span>Écouter la Narration (${s.duration || "5 min"})</span>
            </button>
            <button id="btn-goto-campfire" class="px-4 py-3 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-xs transition-all flex items-center gap-2">
              ${window.fasoIcon('flame', 'w-3.5 h-3.5 text-orange-400')}
              <span>Mode Autour du Feu</span>
            </button>
          </div>

          <!-- Métadonnées Narrateur & Collecte -->
          <div class="text-right text-[11px] text-stone-400 space-y-0.5">
            <div><strong class="text-amber-300">Narrateur :</strong> ${s.narratorName || "Traditionniste dépositaire"}</div>
            <div><strong class="text-amber-300">Collecte :</strong> ${s.collector || "Mission scientifique patrimoniale"}</div>
          </div>
        </div>

        <!-- Salutation traditionnelle d'ouverture -->
        ${s.audioGreeting ? `
          <div class="p-5 rounded-2xl bg-stone-900/50 border-l-4 border-amber-500 flex items-start gap-3.5 text-xs">
            <div class="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              ${window.fasoIcon('speaker', 'w-4 h-4')}
            </div>
            <div>
              <div class="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                Parole sacrée d'ouverture (${s.audioGreeting.lang || s.languages[0] || 'Langue Nationale'}) :
              </div>
              <div class="text-sm sm:text-base font-serif italic text-amber-100 font-bold mt-1">
                "${s.audioGreeting.native}"
              </div>
              <div class="text-stone-400 text-xs mt-0.5">
                ${s.audioGreeting.french}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Miroir Bilingue : Sections du Conte -->
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 class="text-xl font-bold text-amber-200 font-heading">Récit Intégral Bilingue</h3>
            <span class="text-xs text-stone-400 font-mono">Français &amp; Langue Nationale en miroir</span>
          </div>

          <div class="space-y-6">
            ${s.sections.map((sec, idx) => `
              <div class="p-6 sm:p-7 rounded-3xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/30 transition-all space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="text-base font-bold text-amber-300 font-heading">${sec.title}</h4>
                  <button class="btn-read-section text-[11px] px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-200 border border-stone-700 transition-all flex items-center gap-1.5" data-idx="${idx}">
                    ${window.fasoIcon('speaker', 'w-3 h-3 text-amber-400')}
                    <span>Écouter cet extrait</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div class="text-sm sm:text-base text-stone-100 leading-relaxed font-serif">
                    ${sec.textFr}
                  </div>
                  <div class="text-sm sm:text-base text-amber-200/90 leading-relaxed font-serif italic bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
                    ${sec.textNative}
                  </div>
                </div>

                ${sec.annotation ? `
                  <div class="mt-2 pt-3 border-t border-stone-800/80 flex items-start gap-2 text-xs text-amber-400/90 bg-amber-950/15 p-3.5 rounded-xl">
                    <span class="font-bold text-amber-300 shrink-0">Note culturelle :</span>
                    <span>${sec.annotation}</span>
                  </div>
                ` : ''}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Enseignement Philosophique & Morale -->
        <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/20 via-stone-900 to-amber-950/20 border border-stone-800 text-center space-y-3">
          <span class="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Enseignement &amp; Morale des Aïeux</span>
          <p class="text-base sm:text-xl font-serif italic text-amber-100 max-w-2xl mx-auto leading-relaxed">
            "${s.moral}"
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
            ${s.tags.map(t => `<span class="px-3 py-1 rounded-full text-[11px] font-bold bg-stone-950 text-amber-400 border border-amber-500/20">#${t}</span>`).join("")}
          </div>
        </div>

      </div>
    `;

    this.bindEvents(s);
  }

  bindEvents(s) {
    const backBtn = this.container.querySelector("#btn-back-library");
    const playBtn = this.container.querySelector("#btn-play-story");
    const campfireBtn = this.container.querySelector("#btn-goto-campfire");
    const sectionAudioBtns = this.container.querySelectorAll(".btn-read-section");

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.fasoRouter) window.fasoRouter.navigateTo("library");
      });
    }

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        // Instancie le lecteur audio si pas encore créé
        if (!window.fasoAudioPlayer) {
          window.fasoAudioPlayer = new FasoAudioPlayer("global-audio-player-container");
        }
        // Lance la narration vocale complète de l'histoire
        window.fasoAudioPlayer.loadStory(s, true);
        // Scroll vers le bas pour voir le lecteur
        setTimeout(() => {
          const bar = document.getElementById('faso-audio-bar');
          if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 300);
      });
    }

    if (campfireBtn) {
      campfireBtn.addEventListener("click", () => {
        if (window.fasoRouter) window.fasoRouter.navigateTo("campfire", s.id);
      });
    }

    // Lecture phrase par phrase dans les sections
    sectionAudioBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        const sec = s.sections ? s.sections[idx] : null;
        if (sec && window.fasoAudio) {
          const sentences = FasoAudioEngine.splitIntoSentences(sec.textFr);
          window.fasoAudio.speakStory(sentences, 'fr-FR', null, null);
        }
      });
    });
  }
}

window.FasoStoryView = FasoStoryView;
