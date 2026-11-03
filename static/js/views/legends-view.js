/**
 * MÉMOIRE DU BURKINA — PAGE LÉGENDES & MYTHES (#legends)
 * ========================================================
 * Affiche les récits de type légende, mythe ou fondateur du corpus existant.
 * Style visuel distinct : tons violets/indigo pour différencier des contes (tons ambre).
 */

class FasoLegendsView {
  constructor(containerId = "main-view-host") {
    this.container = document.getElementById(containerId);
  }

  /**
   * Filtre les stories dont category/type correspond à une légende ou un mythe.
   * Si aucune ne correspond, retourne toutes les stories.
   */
  _getLegendsStories() {
    const stories = window.FASO_STORIES_DB || window.FASO_STORIES || [];
    const legendKeywords = ["légende", "legend", "mythe", "mythe", "legende", "fondateur"];

    const filtered = stories.filter(s => {
      const cat = (s.category || "").toLowerCase();
      const typ = (s.type || "").toLowerCase();
      return legendKeywords.some(k => cat.includes(k) || typ.includes(k));
    });

    return filtered.length > 0 ? filtered : stories;
  }

  render() {
    if (!this.container) return;
    const stories = this._getLegendsStories();

    this.container.innerHTML = `
      <section class="legends-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-10" id="legends">

        <!-- En-tête -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-indigo-900/40 pb-8">
          <div class="space-y-2 max-w-3xl">
            <p class="text-xs font-mono font-bold tracking-widest uppercase text-indigo-400">
              04 — Légendes & Mythes Fondateurs
            </p>
            <h1 class="text-3xl sm:text-5xl font-black text-indigo-50 font-heading tracking-tight">
              Les récits qui <em class="italic text-indigo-400 not-italic font-serif">fondent le monde.</em>
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
              Les grandes légendes, mythes et épopées fondateurs du Burkina Faso : récits des origines des peuples, des royaumes et des forces invisibles qui façonnent la vie.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-4 py-2 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold shadow-lg">
              ${stories.length} légende${stories.length > 1 ? 's' : ''} & mythe${stories.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <!-- Grille des Légendes -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${stories.map(s => {
            const primaryLang = (s.languages && s.languages[0]) || s.language || "Mooré";
            const audioFile = s.audioUrl || `/static/audio/${s.id}.mp3`;
            const imgPath = s.heroImage
              ? (s.heroImage.startsWith('/') ? s.heroImage : '/static/assets/illustrations/' + s.heroImage)
              : '/static/assets/illustrations/etnies/culture-faso.jpg';

            return `
              <article class="legend-card group relative bg-stone-900/90 rounded-3xl border border-indigo-900/60 hover:border-indigo-500/60 shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
                       style="transform-style: preserve-3d; transition: transform 0.25s ease-out, border-color 0.3s ease;">

                <div>
                  <!-- Illustration -->
                  <div class="relative w-full h-48 overflow-hidden bg-stone-950">
                    <img src="${imgPath}" alt="${s.title}" loading="lazy"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent"></div>

                    <!-- Badges -->
                    <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span class="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase bg-stone-950/85 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                        ${primaryLang}
                      </span>
                      <span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-indigo-600 text-white shadow-md">
                        ${s.category || s.type || 'Légende'}
                      </span>
                    </div>

                    <!-- Région -->
                    <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300">
                      <span class="flex items-center gap-1 font-semibold text-indigo-200">
                        📍 <span class="truncate max-w-[200px]">${s.regionName || ''}</span>
                      </span>
                      <span class="text-stone-400 font-mono text-[10px]">${s.duration || '7 min'}</span>
                    </div>
                  </div>

                  <!-- Corps -->
                  <div class="p-5 space-y-3">
                    <h3 class="text-base font-bold text-indigo-50 group-hover:text-indigo-400 transition-colors font-heading leading-snug line-clamp-2">
                      ${s.title}
                    </h3>
                    ${s.nativeTitle && s.nativeTitle !== s.title ? `
                      <div class="text-xs text-indigo-300/80 font-serif italic truncate">
                        « ${s.nativeTitle} »
                      </div>
                    ` : ''}
                    <p class="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                      ${s.synopsis || s.excerpt || ''}
                    </p>
                  </div>
                </div>

                <!-- Section Audio + Boutons -->
                <div class="p-5 pt-0 space-y-3">
                  <div class="p-3.5 rounded-2xl bg-stone-950/80 border border-indigo-900/40 space-y-2">
                    <div class="flex items-center justify-between text-[11px]">
                      <div class="flex items-center gap-1.5 font-bold text-indigo-300">
                        🔊 <span>Écouter en ${primaryLang}</span>
                      </div>
                      <span class="text-[10px] text-stone-500 font-mono">Audio officiel</span>
                    </div>
                    <audio controls preload="none" class="w-full h-8 rounded-lg"
                           src="${audioFile}"
                           aria-label="Audio de ${s.title}">
                      Votre navigateur ne prend pas en charge la lecture audio.
                    </audio>
                    <div class="text-[10px] text-stone-400 truncate pt-0.5">
                      ${s.audioCredit || s.credit || s.narratorName || 'Tradition orale burkinabè'}
                    </div>
                  </div>

                  <!-- Bouton Lire -->
                  <div class="flex items-center gap-2 pt-1">
                    <button class="flex-1 py-2.5 px-4 rounded-xl bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-bold text-xs transition-all flex items-center justify-center gap-2"
                            onclick="window.fasoRouter && window.fasoRouter.navigateTo('story', '${s.id}')">
                      <span>Lire la légende</span>
                      →
                    </button>
                    <button class="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
                            title="Veillée au clair de lune"
                            onclick="window.fasoRouter && window.fasoRouter.navigateTo('campfire', '${s.id}')">
                      🔥
                    </button>
                  </div>
                </div>

              </article>
            `;
          }).join("")}
        </div>

      </section>
    `;

    this._bindCardTiltEffects();
  }

  _bindCardTiltEffects() {
    const cards = this.container.querySelectorAll(".legend-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 7;
        const rotateY = (x - 0.5) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }
}

window.FasoLegendsView = FasoLegendsView;
