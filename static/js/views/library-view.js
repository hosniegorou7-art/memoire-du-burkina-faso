/**
 * MÉMOIRE DU BURKINA — LA COLLECTION DU PATRIMOINE ORAL (#histoires)
 * ====================================================================
 * Inspirée de l'expérience interactive de christianilboudo.tech/#histoires :
 *  - 03 — La collection : « Des histoires à habiter »
 *  - Cartes interactives avec effet d'élévation 3D au survol
 *  - Lecteur audio HTML5 natif intégré directement sur chaque carte
 *  - Filtre par langue (Mooré, Dioula, Fulfulde, Bissa, Français), région et recherche en direct
 *  - Voix réelles de conteurs du terroir burkinabè (Afsatou Bokoum, Tijjaani Ba, dépositaires)
 *  - Accès au lecteur immersif par étapes
 */

class FasoLibraryView {
  constructor(containerId = "main-view-host") {
    this.container = document.getElementById(containerId);
    this.activeCategory = "all";
    this.activeLanguage = "all";
    this.activeRegion = "all";
    this.searchQuery = "";
  }

  render() {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || window.FASO_STORIES || [];
    const regions = window.FASO_17_REGIONS || [];

    this.container.innerHTML = `
      <section class="stories-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100 space-y-10" id="histoires">
        
        <!-- En-tête Collection inspiré de christianilboudo.tech -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-900/30 pb-8">
          <div class="space-y-2 max-w-3xl">
            <p class="text-xs font-mono font-bold tracking-widest uppercase text-amber-500">
              03 — La Collection Patrimoniale
            </p>
            <h1 class="text-3xl sm:text-5xl font-black text-amber-50 font-heading tracking-tight">
              Des histoires à <em class="italic text-amber-400 not-italic font-serif">habiter.</em>
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
              Écoutez les voix réelles des conteurs et lisez les récits fondateurs du Burkina Faso dans leurs langues d'origine (Mooré, Dioula, Fulfulde, Bissa) et en traduction française.
            </p>
          </div>

          <!-- Compteur de récits -->
          <div class="flex items-center gap-2">
            <span id="collection-count-badge" class="px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-lg">
              ${stories.length} récits présentés
            </span>
          </div>
        </div>

        <!-- Barre de recherche et filtres de langues -->
        <div class="p-6 rounded-3xl bg-stone-900/95 border border-amber-900/40 shadow-2xl space-y-5">
          
          <!-- Ligne 1 : Recherche + Sélection rapide de Langue -->
          <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            <!-- Champ de recherche -->
            <div class="relative flex-1">
              <input type="search" id="search-recit-input" value="${this.searchQuery}"
                placeholder="Rechercher un récit, un héros, un village…"
                class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-2xl px-4 py-3 pl-11 text-xs text-stone-100 focus:outline-none transition-colors">
              <span class="absolute left-4 top-3.5 text-stone-500 pointer-events-none">
                ${window.fasoIcon ? window.fasoIcon('search', 'w-4 h-4 text-stone-500') : '🔍'}
              </span>
            </div>

            <!-- Filtre rapide par langues (Boutons Pilules) -->
            <div class="flex flex-wrap items-center gap-1.5" id="lang-pills-container">
              <button data-lang-filter="all" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'all' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Toutes
              </button>
              <button data-lang-filter="Mooré" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Mooré' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Mooré
              </button>
              <button data-lang-filter="Dioula" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Dioula' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Dioula
              </button>
              <button data-lang-filter="Fulfulde" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Fulfulde' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Fulfulde
              </button>
              <button data-lang-filter="Gulmancéma" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Gulmancéma' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Gulmancéma
              </button>
              <button data-lang-filter="San (Samo)" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'San (Samo)' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                San / Samo
              </button>
              <button data-lang-filter="Sénoufo" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Sénoufo' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Sénoufo
              </button>
              <button data-lang-filter="Bissa" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Bissa' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Bissa
              </button>
              <button data-lang-filter="Français" class="lang-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeLanguage === 'Français' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'}">
                Français
              </button>
            </div>
          </div>

          <!-- Ligne 2 : Filtres secondaires (Région, Catégorie, Réinitialisation) -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800 text-xs">
            <div class="flex flex-wrap items-center gap-3">
              <!-- Filtre Régions -->
              <select id="filter-region-select" class="bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-stone-300 focus:outline-none">
                <option value="all">Toutes les 17 Régions</option>
                ${regions.map(r => `<option value="${r.id}" ${this.activeRegion === r.id ? 'selected' : ''}>${r.name} (${r.capital})</option>`).join("")}
              </select>

              <!-- Filtre Catégorie -->
              <select id="filter-cat-select" class="bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-stone-300 focus:outline-none">
                <option value="all">Tous les Types de Récits</option>
                <option value="Conte">Contes Moraux & Animaliers</option>
                <option value="Légende">Légendes Fondatrices</option>
                <option value="Historique">Récits Historiques & Résistance</option>
                <option value="Esprit">Mythes & Esprits de la Nature</option>
                <option value="Sagesse">Art & Sagesse Ancestrale</option>
              </select>
            </div>

            <button id="btn-lib-reset" class="text-amber-400 hover:text-amber-300 hover:underline font-semibold flex items-center gap-1">
              ${window.fasoIcon ? window.fasoIcon('refresh', 'w-3 h-3') : '↺'}
              <span>Réinitialiser les filtres</span>
            </button>
          </div>

        </div>

        <!-- Grille des Contes avec cartes immersives 3D & Lecteur Audio -->
        <div id="story-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Rendu dynamique par applyFilters() -->
        </div>

      </section>
    `;

    this.bindEvents();
    this.applyFilters();
  }

  applyFilters() {
    const stories = window.FASO_STORIES_DB || window.FASO_STORIES || [];
    const grid = this.container.querySelector("#story-grid");
    const countBadge = this.container.querySelector("#collection-count-badge");
    if (!grid) return;

    const filtered = stories.filter(s => {
      // 1. Recherche plein texte
      const q = this.searchQuery.toLowerCase();
      const matchQ = !q ||
        (s.title && s.title.toLowerCase().includes(q)) ||
        (s.nativeTitle && s.nativeTitle.toLowerCase().includes(q)) ||
        (s.synopsis && s.synopsis.toLowerCase().includes(q)) ||
        (s.regionName && s.regionName.toLowerCase().includes(q)) ||
        (s.ethnic && s.ethnic.toLowerCase().includes(q)) ||
        (s.tags && s.tags.some(t => t.toLowerCase().includes(q)));

      // 2. Filtre Langue
      let matchLang = true;
      if (this.activeLanguage !== "all") {
        matchLang = (s.languages && s.languages.some(l => l.toLowerCase().includes(this.activeLanguage.toLowerCase()))) ||
                    (s.language && s.language.toLowerCase().includes(this.activeLanguage.toLowerCase()));
      }

      // 3. Filtre Région
      let matchReg = true;
      if (this.activeRegion !== "all") {
        matchReg = s.regionId === this.activeRegion;
      }

      // 4. Filtre Catégorie
      let matchCat = true;
      if (this.activeCategory !== "all") {
        matchCat = (s.category && s.category.toLowerCase().includes(this.activeCategory.toLowerCase())) ||
                   (s.type && s.type.toLowerCase().includes(this.activeCategory.toLowerCase()));
      }

      return matchQ && matchLang && matchReg && matchCat;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} récit${filtered.length > 1 ? 's' : ''} présenté${filtered.length > 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-4 rounded-3xl bg-stone-900/40 border border-stone-800">
          <div class="w-12 h-12 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
            ${window.fasoIcon ? window.fasoIcon('search', 'w-6 h-6') : '🔍'}
          </div>
          <h3 class="text-base font-bold text-stone-200">Aucun récit ne correspond à vos critères</h3>
          <p class="text-xs text-stone-400 max-w-md mx-auto">
            Essayez de modifier votre recherche ou de réinitialiser les filtres pour découvrir l'ensemble des contes du Faso.
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(s => {
      const primaryLang = (s.languages && s.languages[0]) || s.language || "Mooré";
      const secondaryLang = s.languages && s.languages[1] ? s.languages[1] : null;
      const audioFile = s.audioUrl || `/static/audio/${s.id}.mp3`;
      const imgPath = s.heroImage ? (s.heroImage.startsWith('/') ? s.heroImage : '/static/assets/illustrations/' + s.heroImage) : '/static/assets/illustrations/etnies/culture-faso.jpg';

      return `
        <article class="story-card group relative bg-stone-900/90 rounded-3xl border border-stone-800/90 hover:border-amber-500/50 shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
                 style="transform-style: preserve-3d; transition: transform 0.25s ease-out, border-color 0.3s ease;">
          
          <div>
            <!-- Illustration de couverture avec effet de lumière -->
            <div class="relative w-full h-48 overflow-hidden bg-stone-950">
              <img src="${imgPath}" alt="${s.title}" loading="lazy"
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent"></div>
              
              <!-- Badges supérieurs -->
              <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span class="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase bg-stone-950/85 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  ${primaryLang}${secondaryLang ? ` • ${secondaryLang}` : ''}
                </span>
                <span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-500 text-stone-950 shadow-md">
                  ${s.category || s.type || 'Conte'}
                </span>
              </div>

              <!-- Lieu / Région en bas d'image -->
              <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300">
                <span class="flex items-center gap-1 font-semibold text-amber-200">
                  ${window.fasoIcon ? window.fasoIcon('pin', 'w-3 h-3 text-amber-400') : '📍'}
                  <span class="truncate max-w-[200px]">${s.regionName}</span>
                </span>
                <span class="text-stone-400 font-mono text-[10px]">${s.duration || '5 min'}</span>
              </div>
            </div>

            <!-- Corps du récit -->
            <div class="p-5 space-y-3">
              <h3 class="text-base font-bold text-amber-50 group-hover:text-amber-400 transition-colors font-heading leading-snug line-clamp-2">
                ${s.title}
              </h3>
              
              ${s.nativeTitle && s.nativeTitle !== s.title ? `
                <div class="text-xs text-amber-300/80 font-serif italic truncate">
                  « ${s.nativeTitle} »
                </div>
              ` : ''}

              <p class="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                ${s.synopsis || s.excerpt || ''}
              </p>
            </div>
          </div>

          <!-- Section Audio direct & Navigation (Style christianilboudo.tech) -->
          <div class="p-5 pt-0 space-y-3">
            
            <!-- Lecteur Audio HTML5 natif intégré -->
            <div class="p-3.5 rounded-2xl bg-stone-950/80 border border-amber-900/30 space-y-2">
              <div class="flex items-center justify-between text-[11px]">
                <div class="flex items-center gap-1.5 font-bold text-amber-300">
                  ${window.fasoIcon ? window.fasoIcon('audio', 'w-3.5 h-3.5 text-amber-400') : '🔊'}
                  <span>Écouter en ${primaryLang}</span>
                </div>
                <span class="text-[10px] text-stone-500 font-mono">Audio officiel</span>
              </div>
              
              <audio controls preload="none" class="w-full h-8 rounded-lg"
                     src="${audioFile}"
                     aria-label="Audio de ${s.title}">
                Votre navigateur ne prend pas en charge la lecture audio directe.
              </audio>

              <div class="text-[10px] text-stone-400 truncate flex items-center justify-between pt-0.5">
                <span class="truncate">${s.audioCredit || s.credit || s.narratorName || 'Tradition orale burkinabè'}</span>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="flex items-center gap-2 pt-1">
              <button class="flex-1 py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/30 font-bold text-xs transition-all flex items-center justify-center gap-2"
                      onclick="window.fasoRouter.navigateTo('story', '${s.id}')">
                <span>Lire le récit &amp; étapes</span>
                ${window.fasoIcon ? window.fasoIcon('arrowRight', 'w-3.5 h-3.5') : '→'}
              </button>

              <button class="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
                      title="Veillée au clair de lune"
                      onclick="window.fasoRouter.navigateTo('campfire', '${s.id}')">
                ${window.fasoIcon ? window.fasoIcon('flame', 'w-4 h-4 text-orange-400') : '🔥'}
              </button>
            </div>

          </div>

        </article>
      `;
    }).join("");

    this.bindCardTiltEffects();
  }

  bindEvents() {
    const searchInput = this.container.querySelector("#search-recit-input");
    const regionSelect = this.container.querySelector("#filter-region-select");
    const catSelect = this.container.querySelector("#filter-cat-select");
    const resetBtn = this.container.querySelector("#btn-lib-reset");
    const langPills = this.container.querySelectorAll(".lang-pill");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (regionSelect) {
      regionSelect.addEventListener("change", (e) => {
        this.activeRegion = e.target.value;
        this.applyFilters();
      });
    }

    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        this.activeCategory = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.searchQuery = "";
        this.activeLanguage = "all";
        this.activeRegion = "all";
        this.activeCategory = "all";
        if (searchInput) searchInput.value = "";
        if (regionSelect) regionSelect.value = "all";
        if (catSelect) catSelect.value = "all";
        this.updatePillsUI();
        this.applyFilters();
      });
    }

    langPills.forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeLanguage = btn.dataset.langFilter;
        this.updatePillsUI();
        this.applyFilters();
      });
    });
  }

  updatePillsUI() {
    const langPills = this.container.querySelectorAll(".lang-pill");
    langPills.forEach(p => {
      const isSelected = p.dataset.langFilter === this.activeLanguage;
      p.className = `lang-pill px-3 py-2 rounded-xl text-xs font-bold transition-all ${
        isSelected
          ? 'bg-amber-500 text-stone-950 shadow-md'
          : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
      }`;
    });
  }

  // Effet d'élévation 3D subtil au mouvement de souris inspiré de christianilboudo.tech
  bindCardTiltEffects() {
    const cards = this.container.querySelectorAll(".story-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 8;
        const rotateY = (x - 0.5) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }
}

window.FasoLibraryView = FasoLibraryView;
