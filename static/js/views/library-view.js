/**
 * MÉMOIRE DU BURKINA — VUE BIBLIOTHÈQUE CENTRALE DES CONTES ET LÉGENDES
 * Recherche facettée avancée, filtrage multicritères (17 régions, langues, catégories)
 * et affichage réactif des fiches patrimoniales.
 */

class FasoLibraryView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeCategory = "all";
    this.activeLanguage = "all";
    this.activeRegion = "all";
    this.searchQuery = "";
  }

  render() {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || [];
    const regions = window.FASO_17_REGIONS || [];
    const languages = window.FASO_LANGUAGES || [];

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-8">
        
        <!-- En-tête -->
        <div class="space-y-3">
          <span class="badge-culture">Bibliothèque du Patrimoine Oral</span>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-amber-100 font-heading">
            Tous les Récits, Mythes et Légendes
          </h1>
          <p class="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Parcourez les trésors de la tradition orale collectés et vérifiés selon les terroirs du Burkina Faso.
          </p>
        </div>

        <!-- Barre de filtres facettés -->
        <div class="p-6 rounded-3xl bg-stone-900/90 border border-amber-900/40 shadow-xl space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <!-- Recherche plein texte -->
            <div class="relative">
              <input type="text" id="lib-search-input" placeholder="Recherche par titre, mot-clé, héros..." class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2 pl-9 text-xs text-stone-100 focus:outline-none">
              <span class="absolute left-3 top-2.5 text-stone-500 text-xs">
                ${window.fasoIcon ? window.fasoIcon('search', 'w-3.5 h-3.5 text-stone-500') : ''}
              </span>
            </div>

            <!-- Filtre Catégorie -->
            <select id="lib-filter-cat" class="bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none">
              <option value="all">Toutes les Catégories</option>
              <option value="Fondatrice">Légendes Fondatrices</option>
              <option value="Nature">Mythes & Esprits de la Nature</option>
              <option value="Historique">Récits Historiques & Résistance</option>
              <option value="Initiatique">Contes Moraux & Animaliers</option>
              <option value="Totémique">Alliances Totémiques</option>
              <option value="Art">Art & Sagesse Ancestrale</option>
            </select>

            <!-- Filtre Langue -->
            <select id="lib-filter-lang" class="bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none">
              <option value="all">Toutes les Langues</option>
              ${languages.map(l => `<option value="${l.nameFr}">${l.nameFr} (${l.nativeName})</option>`).join("")}
              <option value="Français">Français</option>
            </select>

            <!-- Filtre Région (17 Régions) -->
            <select id="lib-filter-region" class="bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none">
              <option value="all">Toutes les 17 Régions</option>
              ${regions.map(r => `<option value="${r.id}">${r.name} (${r.capital})</option>`).join("")}
            </select>

          </div>

          <!-- Filtres rapides par badges -->
          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800 text-xs text-stone-400">
            <span id="lib-count-label" class="font-mono text-amber-400 font-bold">
              Affichage de ${stories.length} récit(s)
            </span>
            <button id="btn-lib-reset" class="text-amber-500 hover:underline text-[11px]">
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        <!-- Grille des Contes Résultante -->
        <div id="lib-stories-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Injecté dynamiquement par applyFilters() -->
        </div>

      </div>
    `;

    this.bindEvents();
    this.applyFilters();
  }

  applyFilters() {
    const stories = window.FASO_STORIES_DB || [];
    const grid = this.container.querySelector("#lib-stories-grid");
    const countLabel = this.container.querySelector("#lib-count-label");
    if (!grid) return;

    const filtered = stories.filter(s => {
      const matchCat = this.activeCategory === "all" || s.category.toLowerCase().includes(this.activeCategory.toLowerCase());
      const matchLang = this.activeLanguage === "all" || s.languages.some(l => l.toLowerCase() === this.activeLanguage.toLowerCase());
      const matchReg = this.activeRegion === "all" || s.regionId === this.activeRegion;
      const matchSearch = this.searchQuery === "" || 
        s.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.synopsis.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.regionName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.ethnic.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchCat && matchLang && matchReg && matchSearch;
    });

    if (countLabel) countLabel.textContent = `Affichage de ${filtered.length} récit(s) disponible(s)`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-stone-400 space-y-3">
          <div class="w-12 h-12 mx-auto text-stone-600">${window.fasoIcon ? window.fasoIcon('search', 'w-10 h-10') : ''}</div>
          <h4 class="text-base font-bold text-amber-200">Aucun récit ne correspond à vos critères</h4>
          <p class="text-xs">Essayez d'élargir votre recherche ou de sélectionner une autre région.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(s => `
      <div class="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer" onclick="window.fasoRouter.navigateTo('story', '${s.id}')">
        <div>
          <div class="relative w-full h-44 overflow-hidden bg-stone-950">
            <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold rounded-lg bg-stone-950/80 text-amber-300 border border-amber-500/30">
              ${s.category}
            </span>
            <span class="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-mono rounded bg-amber-500/20 text-amber-200">
              ${s.duration}
            </span>
          </div>

          <div class="p-4 space-y-1.5">
            <div class="text-[10px] font-semibold text-amber-400 flex items-center gap-1.5">
              ${window.fasoIcon ? window.fasoIcon('pin', 'w-3 h-3 text-amber-400') : ''}
              <span>${s.regionName}</span> • <span>${s.ethnic}</span>
            </div>
            <h4 class="text-sm font-bold text-stone-100 group-hover:text-amber-200 transition-colors leading-snug line-clamp-1">
              ${s.title}
            </h4>
            <p class="text-xs text-stone-400 line-clamp-3 leading-relaxed">
              ${s.synopsis}
            </p>
          </div>
        </div>

        <div class="p-4 pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span class="font-mono text-[11px]">${s.languages.join(", ")}</span>
          <div class="flex items-center gap-2">
            <!-- Bouton écoute rapide (lance la narration sans quitter la bibliothèque) -->
            <button class="btn-quick-listen px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 transition-all"
              data-story-id="${s.id}" onclick="event.stopPropagation(); (function(id){ const allStories = window.FASO_STORIES||[]; const st=allStories.find(x=>x.id===id)||{id:id,title:'${s.title.replace(/'/g,"\\'")}',synopsis:'${s.synopsis.replace(/'/g,"\\'")}',regionName:'${s.regionName}',ethnic:'${s.ethnic}',languages:${JSON.stringify(s.languages)}}; if(!window.fasoAudioPlayer)window.fasoAudioPlayer=new FasoAudioPlayer('global-audio-player-container'); window.fasoAudioPlayer.loadStory(st,true); })('${s.id}')">
              ${window.fasoIcon ? window.fasoIcon('speaker', 'w-3 h-3') : '♪'}
              <span>Écouter</span>
            </button>
            <span class="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Lire</span>
              ${window.fasoIcon ? window.fasoIcon('play', 'w-2.5 h-2.5 fill-amber-400') : ''}
            </span>
          </div>
        </div>
      </div>
    `).join("");
  }

  bindEvents() {
    const searchInput = this.container.querySelector("#lib-search-input");
    const catSelect = this.container.querySelector("#lib-filter-cat");
    const langSelect = this.container.querySelector("#lib-filter-lang");
    const regSelect = this.container.querySelector("#lib-filter-region");
    const resetBtn = this.container.querySelector("#btn-lib-reset");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        this.activeCategory = e.target.value;
        this.applyFilters();
      });
    }

    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        this.activeLanguage = e.target.value;
        this.applyFilters();
      });
    }

    if (regSelect) {
      regSelect.addEventListener("change", (e) => {
        this.activeRegion = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.activeCategory = "all";
        this.activeLanguage = "all";
        this.activeRegion = "all";
        this.searchQuery = "";
        if (searchInput) searchInput.value = "";
        if (catSelect) catSelect.value = "all";
        if (langSelect) langSelect.value = "all";
        if (regSelect) regSelect.value = "all";
        this.applyFilters();
      });
    }
  }
}

window.FasoLibraryView = FasoLibraryView;
