/**
 * MÉMOIRE DU BURKINA — VUE D'ACCUEIL CINÉMATOGRAPHIQUE (8 SECTIONS DU CAHIER DES CHARGES)
 * Section 1: Hero immersif | Section 2: Carte 17 Régions | Section 3: Récits phares |
 * Section 4: Voix du Faso | Section 5: Voyager dans les Régions | Section 6: Autour du feu |
 * Section 7: Sauvegarde | Section 8: Pied de page.
 */

class FasoHomeView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || [];
    const regions = window.FASO_17_REGIONS || [];
    const languages = window.FASO_LANGUAGES || [];

    this.container.innerHTML = `
      <div class="space-y-20 pb-16 animate-fade-in text-stone-100">

        <!-- ==================== SECTION 1 : HERO IMMERSIF ==================== -->
        <section class="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-amber-950/30 via-stone-950 to-stone-950">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              <span>🇧🇫</span> <span>Patrimoine Oral Vivant des 17 Régions</span>
            </div>

            <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-amber-50 tracking-tight leading-tight max-w-4xl mx-auto font-heading">
              Chaque région a une histoire. <br>
              Chaque voix garde <span class="text-gradient-gold">une mémoire.</span>
            </h1>

            <p class="text-sm sm:text-base md:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
              Explorez le Burkina Faso à travers ses contes, ses légendes et ses récits fondateurs.
              Écoutez la parole des anciens en langues nationales (*Mooré, Dioula, Fulfulde...*)
              portée par des ambiances musicales authentiques.
            </p>

            <div class="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <a href="#map" class="btn-primary text-sm px-6 py-3.5 shadow-xl shadow-amber-500/20">
                <span>🗺️</span> <span>Découvrir la Carte des 17 Régions</span>
              </a>
              <a href="#library" class="btn-secondary text-sm px-6 py-3.5">
                <span>📚</span> <span>Explorer la Bibliothèque des Récits</span>
              </a>
              <a href="#campfire/yennenga" class="px-5 py-3.5 rounded-xl bg-orange-950/40 hover:bg-orange-900/50 text-orange-200 border border-orange-500/40 font-bold text-sm transition-all flex items-center gap-2">
                <span>🔥</span> <span>Écouter autour du feu</span>
              </a>
            </div>

            <!-- 4 Chiffres Clés du Patrimoine -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
              <div class="p-4 rounded-2xl bg-stone-900/60 border border-amber-900/30">
                <div class="text-3xl font-black text-amber-300 font-mono">17</div>
                <div class="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">Régions Souveraines</div>
              </div>
              <div class="p-4 rounded-2xl bg-stone-900/60 border border-amber-900/30">
                <div class="text-3xl font-black text-amber-300 font-mono">10+</div>
                <div class="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">Langues Documentées</div>
              </div>
              <div class="p-4 rounded-2xl bg-stone-900/60 border border-amber-900/30">
                <div class="text-3xl font-black text-amber-300 font-mono">100%</div>
                <div class="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">Voix & Audios Authentiques</div>
              </div>
              <div class="p-4 rounded-2xl bg-stone-900/60 border border-amber-900/30">
                <div class="text-3xl font-black text-amber-300 font-mono">UNESCO</div>
                <div class="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5">Éthique & Consentement</div>
              </div>
            </div>

          </div>
        </section>

        <!-- ==================== SECTION 2 : EXPLORER PAR LA CARTE ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span class="badge-culture mb-2">Cartographie Immersive</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Le Territoire à Travers ses Récits
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1">
                Visualisez les 17 régions actuelles du pays et naviguez vers leurs traditions orales.
              </p>
            </div>
            <a href="#map" class="btn-secondary text-xs self-start md:self-auto">
              <span>Plein Écran Cartographique ➔</span>
            </a>
          </div>

          <!-- Conteneur de l'aperçu 2D des 17 régions -->
          <div id="home-map-preview-container" class="w-full min-h-[460px]"></div>
        </section>

        <!-- ==================== SECTION 3 : RÉCITS À DÉCOUVRIR ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span class="badge-culture mb-2">Sélection Patrimoniale</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Contes & Épopées Incontournables
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1">
                Des héros fondateurs aux fables de sagesse animale.
              </p>
            </div>
            <a href="#library" class="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
              <span>Voir les ${stories.length} récits ➔</span>
            </a>
          </div>

          <!-- Grille de Contes -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${stories.slice(0, 4).map(s => `
              <div class="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group cursor-pointer" onclick="window.fasoRouter.navigateTo('story', '${s.id}')">
                <div class="relative w-full h-44 overflow-hidden bg-stone-950">
                  <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                  <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                  <span class="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold rounded-lg bg-stone-950/80 text-amber-300 border border-amber-500/30">
                    ${s.category}
                  </span>
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span class="text-[10px] text-amber-400 font-semibold block mb-0.5">${s.regionName}</span>
                    <h4 class="text-sm font-bold text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">${s.title}</h4>
                    <p class="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">${s.synopsis}</p>
                  </div>
                  <div class="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span>🗣️ ${s.languages.join(", ")}</span>
                    <span class="text-amber-400 font-bold">Écouter ➔</span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- ==================== SECTION 4 : LES VOIX DU BURKINA ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 space-y-6">
            <div class="max-w-2xl">
              <span class="badge-culture mb-2">Multilinguisme Réel</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Écoutez la Parole dans les Langues du Pays
              </h2>
              <p class="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                Le patrimoine oral prend toute sa saveur dans les sonorités, proverbes et intonations de nos terroirs.
              </p>
            </div>

            <!-- Grille des Langues Nationales -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${languages.slice(0, 6).map(l => `
                <div class="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-amber-500/40 transition-all space-y-2">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-bold text-amber-200">${l.nameFr} (${l.nativeName})</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">ISO: ${l.code}</span>
                  </div>
                  <div class="text-xs italic text-amber-100 font-serif">"${l.greeting.native}"</div>
                  <p class="text-[11px] text-stone-400">${l.greeting.translation}</p>
                  <div class="pt-2 border-t border-stone-800/80 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span>✓</span> <span>${l.status.recordedVoicesCount} narrations enregistrées</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </section>

        <!-- ==================== SECTION 5 : VOYAGER DANS LES RÉGIONS ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span class="badge-culture mb-2">Mosaïque Territoriale</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Voyager dans les 17 Régions
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1">
                De Bankui au Sourou, du Liptako au Tannounyan, découvrez l'âme de chaque terroir.
              </p>
            </div>
            <a href="#regions" class="btn-secondary text-xs">
              <span>Voir les 17 Fiches Régionales ➔</span>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${regions.slice(0, 6).map(r => `
              <div class="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group cursor-pointer space-y-3" onclick="window.fasoRouter.navigateTo('regions', '${r.id}')">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <h4 class="text-base font-black text-amber-100 group-hover:text-amber-300 transition-colors font-heading">${r.name}</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-400">${r.capital}</span>
                  </div>
                  <p class="text-xs text-stone-300 line-clamp-2 leading-relaxed">${r.description}</p>
                </div>
                <div class="pt-2 border-t border-stone-800 text-[11px] flex items-center justify-between text-stone-400">
                  <span>🗣️ ${r.languages.slice(0, 2).join(", ")}</span>
                  <span class="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">Explorer ➔</span>
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- ==================== SECTION 6 : L'EXPÉRIENCE DU CONTEUR (AUTOUR DU FEU) ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-8 sm:p-12 rounded-3xl bg-radial from-stone-900 via-amber-950/30 to-stone-950 border border-amber-500/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div class="space-y-4 max-w-xl">
              <span class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
                <span>🔥</span> <span>Expérience Signature</span>
              </span>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-amber-50 font-heading leading-tight">
                Mode « Écouter autour du feu »
              </h2>
              <p class="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Retrouvez l'intimité sacrée des veillées villageoises sous les étoiles.
                Lumière de braises dansantes, nappe sonore de kora et crépitement du bois,
                pour laisser la voix du conteur vous transporter.
              </p>
              <div class="pt-2">
                <a href="#campfire/yennenga" class="btn-primary text-xs py-3 px-6 shadow-xl shadow-orange-500/20">
                  <span>🔥</span> <span>Démarrer une Veillée Immersive</span>
                </a>
              </div>
            </div>

            <div class="w-full md:w-80 h-56 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl relative shrink-0">
              <img src="/static/assets/illustrations/yennenga-hero.svg" alt="Veillée au feu" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex items-center justify-center">
                <span class="w-14 h-14 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center text-2xl font-bold shadow-xl animate-pulse">
                  ▶
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- ==================== SECTION 7 : PRÉSERVER NOTRE MÉMOIRE ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div class="max-w-2xl mx-auto space-y-3">
            <span class="badge-culture">Engagement Patrimonial</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
              Une Bibliothèque Vivante Bâtie Ensemble
            </h2>
            <p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
              La mémoire d'un peuple est un arbre dont les racines plongent dans les cœurs des aînés.
              Contribuez à enrichir ce sanctuaire numérique en soumettant un récit ou une variante locale.
            </p>
            <div class="pt-2">
              <a href="#contribute" class="btn-secondary text-xs py-2.5 px-6">
                <span>✍️</span> <span>Contribuer au Patrimoine</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    `;

    // Montage de l'aperçu cartographique interactif en Section 2
    const mapPreviewEl = this.container.querySelector("#home-map-preview-container");
    if (mapPreviewEl && window.Faso17Map2D) {
      new window.Faso17Map2D("home-map-preview-container");
    }
  }
}

window.FasoHomeView = FasoHomeView;
