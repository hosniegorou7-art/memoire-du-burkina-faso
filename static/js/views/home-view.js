/**
 * MÉMOIRE DU BURKINA — VUE D'ACCUEIL CINÉMATOGRAPHIQUE & ÉPURÉE
 * 7 grandes sections du cahier des charges, illustrées et aérées :
 * - Section 1 : Hero immersif avec grande fresque panoramique du Faso
 * - Section 2 : Carte interactive des 17 régions
 * - Section 3 : Récits et épopées phares illustrés
 * - Section 4 : Voix des terroirs et langues nationales
 * - Section 5 : Mosaïque des 17 régions et hauts lieux patrimoniaux
 * - Section 6 : Expérience signature « Écouter autour du feu »
 * - Section 7 : Sauvegarde collective & contribution UNESCO
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

    // Illustrations emblématiques pour les cartes de régions
    const regionIllustrations = {
      guiriko: "mosquee-bobo.svg",
      djoro: "cascades-banfora.svg",
      nazinon: "cour-tiebele.svg",
      tannounyan: "loropeni-hero.svg",
      nando: "sabou-hero.svg",
      kadiogo: "yennenga-hero.svg",
      liptako: "sahel-hero.svg",
      bankui: "lievre-hero.svg"
    };

    this.container.innerHTML = `
      <div class="space-y-24 pb-20 animate-fade-in text-stone-100">

        <!-- ==================== SECTION 1 : HERO IMMERSIF PANORAMIQUE ==================== -->
        <section class="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
          
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

            <!-- Bannière Panoramique Artistique du Burkina Faso -->
            <div class="relative w-full h-72 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-amber-900/30 shadow-2xl bg-stone-950 group">
              <img
                src="/static/assets/illustrations/burkina-panoramic.svg"
                alt="Panorama du Burkina Faso — Mosquée de Bobo, Baobab millénaire et Yennenga"
                class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-12 space-y-4">
                
                <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider self-start shadow-md backdrop-blur-md">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>Patrimoine Oral des 17 Régions</span>
                </div>

                <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-amber-50 tracking-tight leading-tight max-w-4xl font-heading drop-shadow-lg">
                  Chaque région a une histoire.<br>
                  Chaque voix garde <span class="text-gradient-gold">une mémoire.</span>
                </h1>

                <p class="text-sm sm:text-base md:text-lg text-stone-200 max-w-2xl leading-relaxed font-sans drop-shadow-md">
                  Explorez le Burkina Faso à travers ses contes fondateurs, ses légendes héroïques 
                  et ses sagesses transmises en langues nationales.
                </p>

                <div class="flex flex-wrap items-center gap-3.5 pt-2">
                  <a href="#map" class="btn-primary text-xs sm:text-sm px-6 py-3 shadow-xl flex items-center gap-2">
                    ${window.fasoIcon('map', 'w-4 h-4')}
                    <span>Explorer la Carte des 17 Régions</span>
                  </a>
                  <a href="#library" class="btn-secondary text-xs sm:text-sm px-6 py-3 flex items-center gap-2">
                    ${window.fasoIcon('book', 'w-4 h-4')}
                    <span>Bibliothèque des Récits</span>
                  </a>
                  <a href="#campfire/yennenga" class="px-5 py-3 rounded-xl bg-amber-950/70 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm">
                    ${window.fasoIcon('flame', 'w-4 h-4 text-orange-400')}
                    <span>Autour du Feu</span>
                  </a>
                </div>

              </div>
            </div>

            <!-- 4 Indicateurs Clés Aérés -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div class="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 text-center space-y-1">
                <div class="text-3xl font-black text-amber-300 font-mono">17</div>
                <div class="text-[11px] text-stone-400 font-bold uppercase tracking-wider">Régions Souveraines</div>
              </div>
              <div class="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 text-center space-y-1">
                <div class="text-3xl font-black text-amber-300 font-mono">10+</div>
                <div class="text-[11px] text-stone-400 font-bold uppercase tracking-wider">Langues Documentées</div>
              </div>
              <div class="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 text-center space-y-1">
                <div class="text-3xl font-black text-amber-300 font-mono">20</div>
                <div class="text-[11px] text-stone-400 font-bold uppercase tracking-wider">Pistes Audio &amp; Contes</div>
              </div>
              <div class="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 text-center space-y-1">
                <div class="text-3xl font-black text-amber-300 font-mono">UNESCO</div>
                <div class="text-[11px] text-stone-400 font-bold uppercase tracking-wider">Sauvegarde &amp; Éthique</div>
              </div>
            </div>

          </div>
        </section>

        <!-- ==================== SECTION 2 : EXPLORER PAR LA CARTE ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="badge-culture mb-2">Cartographie Immersive</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Le Territoire à Travers ses Récits
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                Sélectionnez une des 17 régions officielles pour accéder instantanément à ses traditions orales et son patrimoine.
              </p>
            </div>
            <a href="#map" class="btn-secondary text-xs self-start md:self-auto flex items-center gap-1.5">
              <span>Vue Cartographique Complète (2D / 3D)</span>
              ${window.fasoIcon('arrowRight', 'w-3.5 h-3.5')}
            </a>
          </div>

          <div id="home-map-preview-container" class="w-full min-h-[460px] rounded-3xl overflow-hidden border border-stone-800"></div>
        </section>

        <!-- ==================== SECTION 3 : RÉCITS À DÉCOUVRIR ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="badge-culture mb-2">Sélection Patrimoniale</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Contes &amp; Épopées Emblématiques
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1">
                Des figures héroïques fondatrices aux mythes totémiques de la nature.
              </p>
            </div>
            <a href="#library" class="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
              <span>Voir les ${stories.length} récits disponibles</span>
              ${window.fasoIcon('arrowRight', 'w-3.5 h-3.5')}
            </a>
          </div>

          <!-- Grille des Contes -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${stories.slice(0, 4).map(s => `
              <article class="bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group cursor-pointer" onclick="window.fasoRouter.navigateTo('story', '${s.id}')">
                <div class="relative w-full h-48 overflow-hidden bg-stone-950">
                  <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                  <div class="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent"></div>
                  <span class="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold rounded-lg bg-stone-950/80 text-amber-300 border border-amber-500/30">
                    ${s.category}
                  </span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span class="text-[10px] uppercase tracking-wider text-amber-500 font-semibold block mb-1">${s.regionName}</span>
                    <h4 class="text-sm font-bold text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1 font-heading">${s.title}</h4>
                    <p class="text-xs text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">${s.synopsis}</p>
                  </div>
                  <div class="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span class="font-mono text-stone-400">${s.languages[0] || 'Français'}</span>
                    <span class="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Écouter</span>
                      ${window.fasoIcon('play', 'w-2.5 h-2.5 fill-amber-400')}
                    </span>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        <!-- ==================== SECTION 4 : LES VOIX DU BURKINA ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-950/20 via-stone-900/80 to-stone-950 border border-stone-800 space-y-8">
            <div class="max-w-2xl space-y-2">
              <span class="badge-culture">Diversité Linguistique</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Écouter la Parole dans les Langues du Terroir
              </h2>
              <p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Le patrimoine oral prend tout son relief dans les sonorités et les proverbes des communautés linguistiques burkinabè.
              </p>
            </div>

            <!-- Grille des Langues -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              ${languages.slice(0, 6).map(l => `
                <div class="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/30 transition-all space-y-2.5">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-bold text-amber-200 font-heading">${l.nameFr} (${l.nativeName})</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">ISO: ${l.code}</span>
                  </div>
                  <div class="text-xs italic text-amber-100 font-serif">"${l.greeting.native}"</div>
                  <p class="text-[11px] text-stone-400 leading-relaxed">${l.greeting.translation}</p>
                  <div class="pt-2 border-t border-stone-800/80 text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Traditions documentées</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </section>

        <!-- ==================== SECTION 5 : VOYAGER DANS LES RÉGIONS AVEC ILLUSTRATIONS ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="badge-culture mb-2">Hauts Lieux Patrimoniaux</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
                Voyager à Travers les 17 Régions
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1">
                Monuments sacrés, paysages emblématiques et cours royales du Burkina Faso.
              </p>
            </div>
            <a href="#regions" class="btn-secondary text-xs flex items-center gap-1.5">
              <span>Voir les 17 Fiches Régionales</span>
              ${window.fasoIcon('arrowRight', 'w-3.5 h-3.5')}
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${regions.slice(0, 6).map(r => {
              const illu = regionIllustrations[r.id] || "burkina-panoramic.svg";
              return `
                <div class="rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-md" onclick="window.fasoRouter.navigateTo('regions', '${r.id}')">
                  <div class="h-36 overflow-hidden bg-stone-950 relative">
                    <img src="/static/assets/illustrations/${illu}" alt="${r.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                    <span class="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950/80 text-amber-300 border border-amber-500/30">
                      ${r.capital}
                    </span>
                  </div>
                  <div class="p-5 space-y-2">
                    <h4 class="text-base font-black text-amber-100 group-hover:text-amber-300 transition-colors font-heading">${r.name}</h4>
                    <p class="text-xs text-stone-300 line-clamp-2 leading-relaxed">${r.description}</p>
                    <div class="pt-3 border-t border-stone-800 text-[11px] flex items-center justify-between text-stone-400">
                      <span class="truncate">${r.languages.slice(0, 2).join(", ")}</span>
                      <span class="text-amber-400 font-bold group-hover:translate-x-1 transition-transform shrink-0 ml-2">Explorer ➔</span>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </section>

        <!-- ==================== SECTION 6 : EXPÉRIENCE SIGNATURE AUTOUR DU FEU ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-amber-950/30 via-stone-900 to-stone-950 border border-amber-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
            <div class="space-y-4 max-w-xl">
              <div class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                ${window.fasoIcon('flame', 'w-3.5 h-3.5 text-orange-400')}
                <span>Veillée Traditionnelle</span>
              </div>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-amber-50 font-heading leading-tight">
                Mode « Écouter autour du feu »
              </h2>
              <p class="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Retrouvez l'intimité des veillées sous le grand baobab. 
                Lueur des braises montantes, nappe sonore d'instruments traditionnels 
                et karaoké bilingue pour écouter le conteur vous transmettre la mémoire.
              </p>
              <div class="pt-2">
                <a href="#campfire/yennenga" class="btn-primary text-xs sm:text-sm py-3.5 px-6 shadow-xl flex items-center gap-2">
                  ${window.fasoIcon('play', 'w-3.5 h-3.5 fill-stone-950')}
                  <span>Rejoindre la Veillée Immersive</span>
                </a>
              </div>
            </div>

            <div class="w-full md:w-88 h-60 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl relative shrink-0 bg-stone-950 group cursor-pointer" onclick="window.fasoRouter.navigateTo('campfire', 'yennenga')">
              <img src="/static/assets/illustrations/yennenga-hero.svg" alt="Veillée au coin du feu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-stone-950 flex items-center justify-center text-lg font-bold shadow-xl group-hover:scale-110 transition-transform">
                  ${window.fasoIcon('play', 'w-5 h-5 fill-stone-950')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==================== SECTION 7 : SAUVEGARDE & CONTRIBUTION ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div class="max-w-2xl mx-auto space-y-4">
            <span class="badge-culture">Préservation Participative</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
              Une Mémoire Vivante Transmise par Tous
            </h2>
            <p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Dépositaires de traditions, chercheurs, enseignants et aînés : contribuez à ce sanctuaire 
              du patrimoine oral en soumettant un récit ou un enregistrement de voix humaine.
            </p>
            <div class="pt-2">
              <a href="#contribute" class="btn-secondary text-xs sm:text-sm py-3 px-6 flex items-center gap-2 mx-auto inline-flex">
                ${window.fasoIcon('quill', 'w-3.5 h-3.5 text-amber-400')}
                <span>Contribuer au Patrimoine du Faso</span>
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
