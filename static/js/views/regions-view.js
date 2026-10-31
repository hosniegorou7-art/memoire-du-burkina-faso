/**
 * MÉMOIRE DU BURKINA — VUE DES 17 RÉGIONS ET FICHES MONOGRAPHIQUES DÉTAILLÉES
 * Liste exhaustive des 17 régions officielles et fiche culturelle complète par région.
 */

class FasoRegionsView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(regionId = null) {
    if (!this.container) return;
    const regions = window.FASO_17_REGIONS || [];
    const stories = window.FASO_STORIES_DB || [];

    if (regionId) {
      const reg = regions.find(r => r.id === regionId);
      if (reg) {
        this.renderSingleRegion(reg, stories);
        return;
      }
    }

    this.renderAllRegionsList(regions, stories);
  }

  renderAllRegionsList(regions, stories) {
    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-8">
        
        <!-- En-tête -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-amber-900/30">
          <div>
            <span class="badge-culture mb-2">Répertoire Territorial</span>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-amber-100 font-heading">
              Les 17 Régions du Burkina Faso
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 mt-1">
              Explorez les terroirs, peuples, instruments traditionnels et récits de chaque région.
            </p>
          </div>

          <!-- Filtre de recherche -->
          <div class="relative w-full sm:w-72">
            <input type="text" id="region-search-input" placeholder="Rechercher une région, chef-lieu..." class="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2 pl-9 text-xs text-stone-100 focus:outline-none">
            <span class="absolute left-3 top-2.5 text-stone-500 text-xs">
              ${window.fasoIcon ? window.fasoIcon('search', 'w-3.5 h-3.5 text-stone-500') : ''}
            </span>
          </div>
        </div>

        <!-- Grille des 17 Régions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="regions-grid-container">
          ${regions.map(r => `
            <div class="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer space-y-4" onclick="window.fasoRouter.navigateTo('regions', '${r.id}')">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-black text-amber-100 group-hover:text-amber-300 transition-colors font-heading">${r.name}</h3>
                  <span class="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    ${r.capital}
                  </span>
                </div>
                <p class="text-xs text-stone-300 line-clamp-3 leading-relaxed">${r.description}</p>
              </div>

              <div class="space-y-2 pt-3 border-t border-stone-800 text-xs">
                <div><strong class="text-amber-300">Peuples :</strong> ${r.demographics.join(", ")}</div>
                <div><strong class="text-amber-300">Langues :</strong> ${r.languages.join(", ")}</div>
              </div>

              <div class="pt-2 flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>${window.fasoIcon ? window.fasoIcon('book', 'w-3 h-3 text-amber-400 inline mr-1') : ''}${r.storiesCount || 1} conte(s)</span>
                <span class="group-hover:translate-x-1 transition-transform">Explorer ➔</span>
              </div>
            </div>
          `).join("")}
        </div>

      </div>
    `;

    // Recherche instantanée sur les régions
    const input = this.container.querySelector("#region-search-input");
    if (input) {
      input.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase().trim();
        const cards = this.container.querySelectorAll("#regions-grid-container > div");
        regions.forEach((r, idx) => {
          const match = r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q) || r.demographics.some(d => d.toLowerCase().includes(q));
          if (cards[idx]) cards[idx].style.display = match ? "flex" : "none";
        });
      });
    }
  }

  renderSingleRegion(reg, allStories) {
    const regionStories = allStories.filter(s => s.regionId === reg.id || (reg.storiesIds && reg.storiesIds.includes(s.id)));

    this.container.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-8">
        
        <!-- Bouton retour -->
        <div>
          <button id="btn-back-regions" class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
            <span>➔</span> <span>Retour à la liste des 17 régions</span>
          </button>
        </div>

        <!-- Grande Bannière Monographique Régionale -->
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/40 shadow-2xl space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ${reg.officialName}
            </span>
            <span class="text-xs font-mono font-bold text-stone-400">
              Chef-lieu officiel : <strong class="text-amber-200">${reg.capital}</strong>
            </span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black text-amber-50 font-heading">
            ${reg.name}
          </h1>

          <p class="text-sm sm:text-base text-stone-200 leading-relaxed max-w-3xl font-sans">
            ${reg.description}
          </p>

          <!-- 3 Blocs Détaillés : Peuples, Musique, Paysages -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div class="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <div class="w-6 h-6 text-amber-400 mb-1">${window.fasoIcon ? window.fasoIcon('user', 'w-4 h-4 text-amber-400') : ''}</div>
              <h4 class="font-bold text-amber-300 text-xs uppercase tracking-wider">Communautés &amp; Langues</h4>
              <p class="text-xs text-stone-300">${reg.demographics.join(", ")}</p>
              <p class="text-[11px] text-amber-400/90 font-mono">Parler : ${reg.languages.join(", ")}</p>
            </div>

            <div class="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <div class="w-6 h-6 text-amber-400 mb-1">${window.fasoIcon ? window.fasoIcon('audio', 'w-4 h-4 text-amber-400') : ''}</div>
              <h4 class="font-bold text-amber-300 text-xs uppercase tracking-wider">Instruments &amp; Musique</h4>
              <p class="text-xs text-stone-300">${reg.musicalTraditions}</p>
            </div>

            <div class="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <div class="w-6 h-6 text-amber-400 mb-1">${window.fasoIcon ? window.fasoIcon('map', 'w-4 h-4 text-amber-400') : ''}</div>
              <h4 class="font-bold text-amber-300 text-xs uppercase tracking-wider">Paysages &amp; Lieux Clés</h4>
              <p class="text-xs text-stone-300">${reg.landscapes}</p>
              <p class="text-[11px] text-stone-400">Sites : ${reg.historicalSites.join(", ")}</p>
            </div>
          </div>
        </div>

        <!-- Section des Contes et Légendes de cette Région -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl sm:text-2xl font-extrabold text-amber-100 font-heading">
              Récits &amp; Légendes du Terroir de ${reg.name}
            </h3>
            <span class="text-xs text-amber-400 font-bold">${regionStories.length} récit(s) disponible(s)</span>
          </div>

          ${regionStories.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${regionStories.map(s => `
                <div class="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex items-start gap-4 cursor-pointer group" onclick="window.fasoRouter.navigateTo('story', '${s.id}')">
                  <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-24 h-24 rounded-xl object-cover border border-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
                  <div class="flex-1 min-w-0 space-y-1">
                    <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider">${s.category}</span>
                    <h4 class="text-base font-bold text-stone-100 group-hover:text-amber-200 transition-colors leading-snug line-clamp-1">${s.title}</h4>
                    <p class="text-xs text-stone-400 line-clamp-2 leading-relaxed">${s.synopsis}</p>
                    <div class="pt-2 flex items-center justify-between text-xs text-amber-400 font-bold">
                      <span>${s.languages.join(", ")}</span>
                      <span class="flex items-center gap-1">
                        <span>Écouter</span>
                        ${window.fasoIcon ? window.fasoIcon('play', 'w-2.5 h-2.5 fill-amber-400') : ''}
                      </span>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          ` : `
            <div class="p-10 rounded-2xl bg-stone-900/50 border border-dashed border-stone-800 text-center space-y-3">
              <div class="w-12 h-12 mx-auto text-stone-600">${window.fasoIcon ? window.fasoIcon('quill', 'w-10 h-10') : ''}</div>
              <h4 class="text-base font-bold text-amber-200">Collecte en cours pour cette région</h4>
              <p class="text-xs text-stone-400 max-w-md mx-auto">
                Les traditions orales de ${reg.name} font l'objet d'une campagne de documentation active. Vous pouvez contribuer en proposant un récit authentique.
              </p>
              <a href="#contribute" class="btn-secondary text-xs inline-block">
                <span>Proposer un conte pour ${reg.name}</span>
              </a>
            </div>
          `}
        </div>

      </div>
    `;

    const backBtn = this.container.querySelector("#btn-back-regions");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.fasoRouter) window.fasoRouter.navigateTo("regions");
      });
    }
  }
}

window.FasoRegionsView = FasoRegionsView;
