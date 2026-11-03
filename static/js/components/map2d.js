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
            <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              ${window.fasoIcon ? window.fasoIcon('map', 'w-4 h-4 text-amber-400') : ''}
            </div>
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
        <div class="relative w-full flex-1 flex items-center justify-center min-h-[440px] max-h-[680px]">
          <svg id="svg-map-17" viewBox="0 0 1000 700" class="w-full h-full max-w-5xl drop-shadow-2xl transition-all duration-300">
            <defs>
              <filter id="shadow-burkina" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.85"/>
              </filter>
              <clipPath id="burkina-clip">
                <path d="M 650 48 L 680 50 L 715 68 L 735 105 L 755 140 L 740 180 L 770 220 L 790 250 L 820 290 L 870 310 L 920 325 L 945 345 L 935 375 L 895 400 L 860 420 L 810 440 L 770 475 L 740 500 L 705 510 L 670 515 L 630 510 L 595 520 L 560 535 L 515 530 L 460 520 L 420 525 L 385 555 L 370 590 L 355 630 L 340 660 L 325 670 L 305 650 L 290 610 L 260 580 L 220 565 L 180 570 L 145 595 L 120 600 L 95 570 L 90 520 L 110 470 L 140 440 L 160 410 L 185 380 L 220 340 L 245 300 L 270 270 L 290 230 L 330 200 L 375 175 L 420 160 L 470 140 L 520 115 L 570 85 L 610 60 Z" />
              </clipPath>
              <!-- Motif textile Faso Dan Fani en filigrane -->
              <pattern id="fani-mesh" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0,10 L 10,0 L 20,10 L 10,20 Z" fill="none" stroke="#f59e0b" stroke-width="0.3" stroke-opacity="0.12" />
              </pattern>
            </defs>

            <!-- Arrière-plan cartographique sombre avec texture -->
            <rect x="0" y="0" width="1000" height="700" fill="#0c0a09" />

            <!-- Pays limitrophes (toponymie discrète) -->
            <g class="neighbour-countries font-heading text-[12px] font-bold fill-stone-600/70 select-none pointer-events-none tracking-widest">
              <text x="230" y="130" opacity="0.6">MALI</text>
              <text x="830" y="160" opacity="0.6">NIGER</text>
              <text x="915" y="470" opacity="0.6">BÉNIN</text>
              <text x="735" y="585" opacity="0.6">TOGO</text>
              <text x="490" y="615" opacity="0.6">GHANA</text>
              <text x="140" y="650" opacity="0.6">CÔTE D'IVOIRE</text>
            </g>

            <!-- Silhouette générale avec ombre portée -->
            <path d="M 650 48 L 680 50 L 715 68 L 735 105 L 755 140 L 740 180 L 770 220 L 790 250 L 820 290 L 870 310 L 920 325 L 945 345 L 935 375 L 895 400 L 860 420 L 810 440 L 770 475 L 740 500 L 705 510 L 670 515 L 630 510 L 595 520 L 560 535 L 515 530 L 460 520 L 420 525 L 385 555 L 370 590 L 355 630 L 340 660 L 325 670 L 305 650 L 290 610 L 260 580 L 220 565 L 180 570 L 145 595 L 120 600 L 95 570 L 90 520 L 110 470 L 140 440 L 160 410 L 185 380 L 220 340 L 245 300 L 270 270 L 290 230 L 330 200 L 375 175 L 420 160 L 470 140 L 520 115 L 570 85 L 610 60 Z"
              fill="#1c1917" filter="url(#shadow-burkina)" />

            <!-- Les 17 Régions Administratives découpées sans chevauchement -->
            <g clip-path="url(#burkina-clip)" id="regions-polygons">
              ${this.regions.map(reg => `
                <g class="region-item cursor-pointer group" data-region-id="${reg.id}">
                  <path
                    d="${reg.svgPath}"
                    class="region-poly transition-all duration-300 stroke-stone-900/90 stroke-[1.5] group-hover:stroke-amber-300 group-hover:stroke-[3] group-hover:brightness-125"
                    fill="${reg.color}"
                    fill-opacity="0.45"
                  />
                  <path
                    d="${reg.svgPath}"
                    fill="url(#fani-mesh)"
                    class="pointer-events-none"
                  />
                </g>
              `).join("")}

              <!-- Cours d'eau sacrés majeurs à l'intérieur du territoire -->
              <g class="rivers-layer stroke-sky-400/50 fill-none stroke-[2.2] pointer-events-none">
                <!-- Fleuve Mouhoun (Black Volta) -->
                <path d="M 150 530 Q 180 460 210 410 T 290 330 T 340 260 T 280 230" stroke-linecap="round" />
                <!-- Nakambé (White Volta) -->
                <path d="M 550 250 Q 535 320 525 380 T 570 470 T 580 530" stroke-linecap="round" />
                <!-- Nazinon (Red Volta) -->
                <path d="M 430 350 Q 460 420 500 470 T 520 530" stroke-linecap="round" />
                <!-- Rivière Sirba à l'Est -->
                <path d="M 640 220 Q 690 270 760 320" stroke-linecap="round" />
              </g>
            </g>

            <!-- Frontière nationale dorée mise en valeur -->
            <path d="M 650 48 L 680 50 L 715 68 L 735 105 L 755 140 L 740 180 L 770 220 L 790 250 L 820 290 L 870 310 L 920 325 L 945 345 L 935 375 L 895 400 L 860 420 L 810 440 L 770 475 L 740 500 L 705 510 L 670 515 L 630 510 L 595 520 L 560 535 L 515 530 L 460 520 L 420 525 L 385 555 L 370 590 L 355 630 L 340 660 L 325 670 L 305 650 L 290 610 L 260 580 L 220 565 L 180 570 L 145 595 L 120 600 L 95 570 L 90 520 L 110 470 L 140 440 L 160 410 L 185 380 L 220 340 L 245 300 L 270 270 L 290 230 L 330 200 L 375 175 L 420 160 L 470 140 L 520 115 L 570 85 L 610 60 Z"
              fill="none" stroke="#d97706" stroke-width="2.5" stroke-linejoin="round"
              class="pointer-events-none drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <path d="M 650 48 L 680 50 L 715 68 L 735 105 L 755 140 L 740 180 L 770 220 L 790 250 L 820 290 L 870 310 L 920 325 L 945 345 L 935 375 L 895 400 L 860 420 L 810 440 L 770 475 L 740 500 L 705 510 L 670 515 L 630 510 L 595 520 L 560 535 L 515 530 L 460 520 L 420 525 L 385 555 L 370 590 L 355 630 L 340 660 L 325 670 L 305 650 L 290 610 L 260 580 L 220 565 L 180 570 L 145 595 L 120 600 L 95 570 L 90 520 L 110 470 L 140 440 L 160 410 L 185 380 L 220 340 L 245 300 L 270 270 L 290 230 L 330 200 L 375 175 L 420 160 L 470 140 L 520 115 L 570 85 L 610 60 Z"
              fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="8 4" stroke-linejoin="round"
              class="pointer-events-none opacity-50" />

            <!-- Nom du pays en filigrane noble -->
            <text x="500" y="80" text-anchor="middle"
              font-size="20" font-weight="900" letter-spacing="8"
              fill="#fbbf24" fill-opacity="0.45"
              class="pointer-events-none font-heading">BURKINA FASO</text>

            <!-- Étiquettes des 17 régions -->
            <g id="regions-labels" class="pointer-events-none select-none">
              ${this.regions.map(reg => `
                <g transform="translate(${reg.svgCenter[0]}, ${reg.svgCenter[1]})">
                  <!-- Pastille d'arrière-plan pour lisibilité -->
                  <rect x="-45" y="-12" width="90" height="24" rx="12" fill="#0c0a09" fill-opacity="0.75" stroke="#78350f" stroke-width="0.8" />
                  <text
                    x="0"
                    y="0"
                    text-anchor="middle"
                    class="text-[10.5px] font-extrabold fill-amber-100 font-heading"
                    dy="1"
                  >
                    ${reg.name}
                  </text>
                  <text
                    x="0"
                    y="10"
                    text-anchor="middle"
                    class="text-[7.5px] font-semibold fill-amber-400/80"
                  >
                    (${reg.capital})
                  </text>
                </g>
              `).join("")}
            </g>

            <!-- Balises lumineuses et hotspots de récits -->
            <g id="story-beacons-layer">
              ${this.regions.map(reg => `
                <g class="beacon-marker cursor-pointer group" data-region-id="${reg.id}" transform="translate(${reg.svgCenter[0]}, ${reg.svgCenter[1] - 18})">
                  <!-- Pulsation radar -->
                  <circle r="15" class="fill-amber-400/25 animate-ping opacity-60 pointer-events-none" />
                  <circle r="9" class="fill-amber-500 stroke-2 stroke-stone-950 drop-shadow-md group-hover:scale-125 transition-all" />
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
          <button id="btn-explore-reg" class="w-full btn-primary text-xs justify-center py-2 shadow-md flex items-center gap-2">
            ${window.fasoIcon ? window.fasoIcon('book', 'w-3.5 h-3.5 text-stone-950') : ''}
            <span>Explorer cette région &amp; récits</span>
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
