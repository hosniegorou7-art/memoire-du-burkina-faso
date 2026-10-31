/**
 * MÉMOIRE DU BURKINA — MOTEUR CARTOGRAPHIQUE 2D DES 17 RÉGIONS
 * Rendu SVG vectoriel dynamique haute fidélité, micro-interactions,
 * gestion des 17 polygones territoriaux et pulsation des balises de récits.
 */

class Faso17Map2D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.regions = window.FASO_17_REGIONS || [];
    this.selectedRegionId = null;
    this.activeFilter = "all";
    this.onSelectRegion = options.onSelectRegion || null;
    this.onSelectStory = options.onSelectStory || null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="relative w-full h-full flex flex-col select-none overflow-hidden rounded-3xl bg-stone-950 border border-amber-900/40 shadow-2xl p-4 sm:p-6">
        
        <!-- Barre supérieure de contrôle cartographique -->
        <div class="w-full flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-lg">
              🗺️
            </span>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-amber-100 font-heading">
                Carte Souveraine des 17 Régions du Faso
              </h3>
              <p class="text-[11px] text-amber-400/70">
                Découpage territorial officiel • Survolez ou cliquez sur une région
              </p>
            </div>
          </div>

          <!-- Filtres rapides -->
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button class="map2d-filter active px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 font-medium transition-all" data-filter="all">
              Toutes (17)
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="ouest">
              Grand Ouest
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="centre">
              Plateau Central
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="sahel">
              Sahel & Nord
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="est">
              Est & Gulmu
            </button>
          </div>
        </div>

        <!-- Zone SVG Vectorielle Responsive (ViewBox 0 0 1000 700) -->
        <div class="relative w-full flex-1 flex items-center justify-center min-h-[400px] max-h-[660px]">
          <svg id="svg-map-17" viewBox="0 0 1000 700" class="w-full h-full max-w-5xl drop-shadow-2xl transition-all duration-300">
            <defs>
              <filter id="shadow-reg" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.7"/>
              </filter>
              <!-- Motif textile Faso Dan Fani en filigrane -->
              <pattern id="fani-mesh" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0,10 L 10,0 L 20,10 L 10,20 Z" fill="none" stroke="#f59e0b" stroke-width="0.3" stroke-opacity="0.12" />
              </pattern>
            </defs>

            <!-- Tracé des cours d'eau sacrés majeurs -->
            <g class="rivers-layer stroke-sky-400/35 fill-none stroke-[2.5] stroke-dasharray-[5,3] pointer-events-none">
              <!-- Fleuve Mouhoun (Black Volta) -->
              <path d="M 230 140 Q 180 250 200 370 Q 230 450 290 600" />
              <!-- Nakambé (White Volta) -->
              <path d="M 440 200 Q 460 300 480 440 Q 490 510 520 620" />
              <!-- Nazinon (Red Volta) -->
              <path d="M 380 320 Q 410 400 430 490" />
              <!-- Rivière Sirba à l'Est -->
              <path d="M 620 180 Q 670 260 760 320" />
            </g>

            <!-- Les 17 Régions Administratives -->
            <g id="regions-polygons">
              ${this.regions.map(reg => `
                <g class="region-item cursor-pointer group" data-region-id="${reg.id}">
                  <path
                    d="${reg.svgPath}"
                    class="region-poly transition-all duration-300 stroke-amber-900/60 stroke-[1.5] group-hover:stroke-amber-300 group-hover:stroke-[3] group-hover:brightness-125"
                    fill="${reg.color}"
                    fill-opacity="0.5"
                    filter="url(#shadow-reg)"
                  />
                  <path
                    d="${reg.svgPath}"
                    fill="url(#fani-mesh)"
                    class="pointer-events-none"
                  />
                  <!-- Label du Nom de Région -->
                  <text
                    x="${reg.svgCenter[0]}"
                    y="${reg.svgCenter[1]}"
                    text-anchor="middle"
                    class="text-[11px] font-extrabold fill-amber-100 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                  >
                    ${reg.name}
                  </text>
                  <!-- Chef-lieu en sous-titre -->
                  <text
                    x="${reg.svgCenter[0]}"
                    y="${reg.svgCenter[1] + 12}"
                    text-anchor="middle"
                    class="text-[8.5px] font-semibold fill-amber-400/80 pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    (${reg.capital})
                  </text>
                </g>
              `).join("")}
            </g>

            <!-- Balises lumineuses et hotspots de récits -->
            <g id="story-beacons-layer">
              ${this.regions.map(reg => `
                <g class="beacon-marker cursor-pointer group" data-region-id="${reg.id}" transform="translate(${reg.svgCenter[0]}, ${reg.svgCenter[1] - 16})">
                  <!-- Pulsation radar -->
                  <circle r="16" class="fill-amber-400/20 animate-ping opacity-60 pointer-events-none" />
                  <circle r="9" class="fill-amber-500 stroke-2 stroke-stone-900 drop-shadow-md group-hover:r-[12] transition-all" />
                  <text text-anchor="middle" dy="3.5" class="text-[9px] fill-stone-950 font-black pointer-events-none">
                    ${reg.storiesCount || 1}
                  </text>
                </g>
              `).join("")}
            </g>
          </svg>

          <!-- Volet latéral flottant (Panneau d'exploration contextuel) -->
          <div id="map-region-drawer" class="absolute top-4 right-4 w-80 max-w-[90%] bg-stone-900/95 border border-amber-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 translate-x-[110%] opacity-0 pointer-events-none z-30">
            <div id="drawer-content"></div>
          </div>
        </div>

        <!-- Légende en bas de carte -->
        <div class="w-full flex flex-wrap items-center justify-between text-xs text-amber-300/80 mt-3 pt-3 border-t border-amber-900/30">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Grand Ouest</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Plateau Central</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span> Sahel</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-yellow-600 inline-block"></span> Est (Gulmu)</span>
          </div>
          <div class="italic text-amber-400/70 text-[11px]">
            Cliquez sur une région pour ouvrir son dossier culturel complet
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const svg = this.container.querySelector("#svg-map-17");
    const drawer = this.container.querySelector("#map-region-drawer");
    const drawerContent = this.container.querySelector("#drawer-content");
    const filterBtns = this.container.querySelectorAll(".map2d-filter");

    // Filtrage territorial rapide
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("active", "bg-amber-500/20", "text-amber-200", "border-amber-500/40");
          b.classList.add("bg-stone-900/80", "text-stone-300", "border-stone-800");
        });
        btn.classList.add("active", "bg-amber-500/20", "text-amber-200", "border-amber-500/40");
        btn.classList.remove("bg-stone-900/80", "text-stone-300", "border-stone-800");

        const filter = btn.getAttribute("data-filter");
        this.highlightCluster(filter);
      });
    });

    // Événements sur les polygones des 17 régions
    const regionNodes = this.container.querySelectorAll(".region-item, .beacon-marker");
    regionNodes.forEach(node => {
      const regId = node.getAttribute("data-region-id");
      const reg = this.regions.find(r => r.id === regId);
      if (!reg) return;

      node.addEventListener("mouseenter", () => {
        this.showDrawer(reg, drawer, drawerContent);
      });

      node.addEventListener("click", () => {
        if (this.onSelectRegion) {
          this.onSelectRegion(reg);
        } else if (window.fasoRouter) {
          window.fasoRouter.navigateTo("regions", reg.id);
        }
      });
    });

    // Clic en dehors pour fermer le tiroir
    svg.addEventListener("click", (e) => {
      if (!e.target.closest(".region-item") && !e.target.closest(".beacon-marker")) {
        this.hideDrawer(drawer);
      }
    });
  }

  showDrawer(reg, drawer, drawerContent) {
    drawerContent.innerHTML = `
      <div class="space-y-3 text-stone-200">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Chef-lieu : ${reg.capital}
          </span>
          <button id="btn-close-drawer" class="text-stone-400 hover:text-white text-base">✕</button>
        </div>

        <div>
          <h4 class="text-xl font-black text-amber-100 font-heading leading-tight">${reg.name}</h4>
          <p class="text-xs text-amber-400 font-medium">${reg.officialName}</p>
        </div>

        <p class="text-xs text-stone-300 leading-relaxed line-clamp-3">
          ${reg.description}
        </p>

        <div class="pt-2 border-t border-stone-800 space-y-1.5 text-[11px]">
          <div><strong class="text-amber-300">Peuples :</strong> ${reg.demographics.join(", ")}</div>
          <div><strong class="text-amber-300">Langues :</strong> ${reg.languages.join(", ")}</div>
          <div><strong class="text-amber-300">Musique & Instruments :</strong> ${reg.musicalTraditions.slice(0, 75)}...</div>
        </div>

        <div class="pt-3">
          <button id="btn-explore-reg" class="w-full btn-primary text-xs justify-center py-2 shadow-md">
            <span>📖</span> <span>Explorer cette région & récits</span>
          </button>
        </div>
      </div>
    `;

    drawer.classList.remove("translate-x-[110%]", "opacity-0", "pointer-events-none");
    drawer.classList.add("translate-x-0", "opacity-100", "pointer-events-auto");

    const closeBtn = drawerContent.querySelector("#btn-close-drawer");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hideDrawer(drawer));
    }

    const exploreBtn = drawerContent.querySelector("#btn-explore-reg");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        if (window.fasoRouter) {
          window.fasoRouter.navigateTo("regions", reg.id);
        }
      });
    }
  }

  hideDrawer(drawer) {
    drawer.classList.add("translate-x-[110%]", "opacity-0", "pointer-events-none");
    drawer.classList.remove("translate-x-0", "opacity-100", "pointer-events-auto");
  }

  highlightCluster(filter) {
    const polys = this.container.querySelectorAll(".region-poly");
    polys.forEach(poly => {
      const parent = poly.closest(".region-item");
      const regId = parent.getAttribute("data-region-id");
      let matches = true;

      if (filter === "ouest") {
        matches = ["bankui", "djoro", "guiriko", "sourou", "tannounyan"].includes(regId);
      } else if (filter === "centre") {
        matches = ["kadiogo", "kuilse", "nando", "nazinon", "oubri"].includes(regId);
      } else if (filter === "sahel") {
        matches = ["liptako", "soum", "yaadga", "nakambe"].includes(regId);
      } else if (filter === "est") {
        matches = ["goulmou", "sirba", "tapoa"].includes(regId);
      }

      poly.style.opacity = matches ? "1" : "0.2";
      poly.style.stroke = matches ? "#f59e0b" : "#451a03";
    });
  }
}

window.Faso17Map2D = Faso17Map2D;
