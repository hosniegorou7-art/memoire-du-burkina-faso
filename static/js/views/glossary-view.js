/**
 * MÉMOIRE DU BURKINA — VUE GLOSSAIRE & PROVERBES
 * Dictionnaire culturel des termes traditionnels burkinabè et recueil de proverbes
 * issus des différentes communautés linguistiques du pays.
 */

class FasoGlossaryView {
  constructor(hostId) {
    this.hostId = hostId;
    this.host = document.getElementById(hostId);
    this.searchQuery = "";
  }

  render() {
    this.host = document.getElementById(this.hostId);
    if (!this.host) return;

    this.host.innerHTML = `
      <div class="min-h-screen bg-gradient-to-b from-stone-950 via-amber-950/10 to-stone-950">

        <!-- En-tête de section -->
        <div class="relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950/30 to-stone-950 border-b border-amber-900/40 py-16 px-4">
          <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(45deg, #E5A93C 0, #E5A93C 1px, transparent 0, transparent 50%); background-size: 20px 20px;"></div>
          <div class="relative max-w-5xl mx-auto text-center space-y-4">
            <div class="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase">
              📚 Patrimoine Linguistique & Sagesse
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-50 font-heading leading-tight">
              Glossaire Culturel<br>
              <span class="text-amber-400">&amp; Sagesse des Proverbes</span>
            </h1>
            <p class="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Termes traditionnels, concepts spirituels, savoir-faire et proverbes issus des 
              communautés linguistiques du Burkina Faso — Mooré, Dioula, Fulfulde, Gulmancéma, Kasséna, Dagara et plus encore.
            </p>

            <!-- Barre de recherche -->
            <div class="max-w-md mx-auto relative mt-6">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-lg">🔍</span>
              <input
                id="glossary-search-input"
                type="text"
                placeholder="Chercher un terme (Pulaaku, Balafon, Dolo, Zaï…)"
                class="w-full pl-11 pr-4 py-3 bg-stone-900 border border-amber-500/30 rounded-2xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              />
            </div>
          </div>
        </div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          <!-- Section Glossaire -->
          <section>
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl">📖</div>
              <div>
                <h2 class="text-2xl font-black text-amber-100 font-heading">Dictionnaire des Termes Culturels</h2>
                <p class="text-stone-400 text-xs">Concepts, pratiques et expressions emblématiques du patrimoine immatériel burkinabè</p>
              </div>
            </div>
            <div id="glossary-terms-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              ${this._renderGlossaryTerms("")}
            </div>
          </section>

          <!-- Séparateur décoratif -->
          <div class="flex items-center gap-4">
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent"></div>
            <span class="text-amber-500 text-2xl">◆</span>
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent"></div>
          </div>

          <!-- Section Proverbes -->
          <section>
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl">🪔</div>
              <div>
                <h2 class="text-2xl font-black text-amber-100 font-heading">Proverbes &amp; Sagesses Orales</h2>
                <p class="text-stone-400 text-xs">Paroles des aïeux transmises de génération en génération lors des veillées</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${this._renderProverbs()}
            </div>
          </section>

          <!-- Appel à contribution -->
          <section class="bg-gradient-to-br from-amber-950/30 to-stone-900 border border-amber-500/20 rounded-3xl p-8 text-center space-y-4">
            <div class="text-4xl">🌍</div>
            <h3 class="text-xl font-black text-amber-100 font-heading">Enrichissez ce Glossaire Collectif</h3>
            <p class="text-stone-300 text-sm max-w-lg mx-auto leading-relaxed">
              Vous connaissez un terme traditionnel, un proverbe ou une expression culturelle 
              d'une des 17 régions non répertorié ici ? Contribuez à cette mémoire vivante.
            </p>
            <a href="#contribute" class="inline-block mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-sm shadow-lg hover:scale-105 transition-all">
              ✍️ Proposer un Terme ou un Proverbe
            </a>
          </section>

        </div>
      </div>
    `;

    this._bindSearch();
  }

  _renderGlossaryTerms(query = "") {
    if (typeof FASO_GLOSSARY === "undefined") {
      return `<p class="text-stone-500 col-span-3">Données du glossaire non disponibles.</p>`;
    }

    const filtered = FASO_GLOSSARY.filter(item => {
      if (!query) return true;
      const q = query.toLowerCase();
      return item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      return `<div class="col-span-3 text-center py-10 text-stone-500">
        <div class="text-4xl mb-3">🔎</div>
        <p class="text-sm">Aucun terme ne correspond à "<strong class="text-amber-400">${query}</strong>".</p>
      </div>`;
    }

    const termIcons = {
      "Naba": "👑", "Mogho Naba": "🏛️", "Faso Dan Fani": "🧵",
      "Dolo": "🍺", "Pulaaku": "🌟", "Kora": "🎵",
      "Balafon": "🪘", "Wack": "🔮", "Soumbala": "🌿", "Zaï": "🌾"
    };

    return filtered.map(item => `
      <article class="group relative bg-stone-900/60 hover:bg-amber-950/30 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-5 transition-all duration-300 cursor-default">
        <div class="flex items-start gap-3 mb-3">
          <span class="text-2xl mt-0.5">${termIcons[item.term] || "📌"}</span>
          <div>
            <h3 class="text-lg font-black text-amber-300 font-heading group-hover:text-amber-200 transition-colors">${item.term}</h3>
            <div class="text-[10px] uppercase tracking-widest text-amber-600/70 font-bold">Terme du Patrimoine</div>
          </div>
        </div>
        <p class="text-stone-300 text-sm leading-relaxed">${item.def}</p>
        <div class="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-amber-400 text-xs">→</span>
        </div>
      </article>
    `).join("");
  }

  _renderProverbs() {
    if (typeof FASO_PROVERBS === "undefined") {
      return `<p class="text-stone-500">Données des proverbes non disponibles.</p>`;
    }

    const proverbIcons = ["🌍", "🎶", "🌅", "🤝"];

    return FASO_PROVERBS.map((item, i) => `
      <article class="bg-gradient-to-br from-stone-900 to-amber-950/20 border border-amber-500/20 rounded-2xl p-6 space-y-4 hover:border-amber-400/40 transition-all shadow-md">
        <div class="flex items-center gap-3">
          <span class="text-3xl">${proverbIcons[i % proverbIcons.length]}</span>
          <span class="text-xs uppercase tracking-widest text-amber-500/80 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">${item.lang}</span>
        </div>

        <blockquote class="border-l-4 border-amber-500 pl-4">
          <p class="text-amber-100 font-semibold text-base italic leading-relaxed">"${item.proverb}"</p>
        </blockquote>

        <div class="bg-stone-950/60 rounded-xl px-4 py-3 border border-stone-800">
          <div class="text-[10px] uppercase tracking-widest text-amber-600/60 font-bold mb-1">Version originale — ${item.lang}</div>
          <p class="text-amber-300/80 text-sm font-mono italic">${item.native}</p>
        </div>

        <div class="flex items-start gap-2 text-stone-300 text-xs leading-relaxed">
          <span class="text-amber-500 text-sm mt-0.5">💡</span>
          <p><strong class="text-amber-400">Enseignement :</strong> ${item.meaning}</p>
        </div>
      </article>
    `).join("");
  }

  _bindSearch() {
    const input = document.getElementById("glossary-search-input");
    if (!input) return;

    input.addEventListener("input", () => {
      this.searchQuery = input.value.trim();
      const grid = document.getElementById("glossary-terms-grid");
      if (grid) {
        grid.innerHTML = this._renderGlossaryTerms(this.searchQuery);
      }
    });
  }
}

window.FasoGlossaryView = FasoGlossaryView;
