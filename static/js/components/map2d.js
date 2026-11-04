/**
 * MÉMOIRE DU BURKINA — MOTEUR CARTOGRAPHIQUE 2D HAUTE FIDÉLITÉ
 * Calé exactement sur les contours réels du relief 3D (1024x1024).
 * Découpage vectoriel des 17 régions, micro-interactions, volet d'exploration contextuel.
 */

const BURKINA_REAL_3D_CONTOUR = "M 939,457 L 946,465 L 953,473 L 958,478 L 965,486 L 972,495 L 977,504 L 976,512 L 971,520 L 970,528 L 962,535 L 954,542 L 947,549 L 942,556 L 916,558 L 902,562 L 895,564 L 871,561 L 869,567 L 866,573 L 863,579 L 857,581 L 778,559 L 844,587 L 844,593 L 838,598 L 839,605 L 827,607 L 822,612 L 815,615 L 804,616 L 797,616 L 788,618 L 779,622 L 772,625 L 738,613 L 732,612 L 721,610 L 710,608 L 701,607 L 691,605 L 683,604 L 677,604 L 675,611 L 665,613 L 659,615 L 657,621 L 651,624 L 644,628 L 641,634 L 633,632 L 626,627 L 619,627 L 613,627 L 608,632 L 603,628 L 597,627 L 591,627 L 585,627 L 579,629 L 573,629 L 567,631 L 560,630 L 553,630 L 546,628 L 539,627 L 533,628 L 527,628 L 523,633 L 517,634 L 511,632 L 505,632 L 499,633 L 492,633 L 486,633 L 480,634 L 474,634 L 468,634 L 461,634 L 455,634 L 398,820 L 393,826 L 387,822 L 382,818 L 377,811 L 371,808 L 367,800 L 363,793 L 358,789 L 353,785 L 349,778 L 343,777 L 338,772 L 330,774 L 324,773 L 319,769 L 313,767 L 306,766 L 298,766 L 291,766 L 283,765 L 274,766 L 262,771 L 251,774 L 241,781 L 235,783 L 206,806 L 200,807 L 192,810 L 186,804 L 178,801 L 174,793 L 330,629 L 261,687 L 254,689 L 238,700 L 228,705 L 214,709 L 208,706 L 203,701 L 201,694 L 174,706 L 171,700 L 130,725 L 129,716 L 125,710 L 113,708 L 66,733 L 60,731 L 53,725 L 49,717 L 49,707 L 52,700 L 51,691 L 52,685 L 53,675 L 57,668 L 56,659 L 51,652 L 49,644 L 66,628 L 69,622 L 75,616 L 75,607 L 80,597 L 81,589 L 79,582 L 71,580 L 71,572 L 72,564 L 66,557 L 60,555 L 82,542 L 88,537 L 139,521 L 149,516 L 154,509 L 154,503 L 159,499 L 164,493 L 171,486 L 171,480 L 172,472 L 175,466 L 174,460 L 167,455 L 166,449 L 167,443 L 176,441 L 195,439 L 197,431 L 196,423 L 195,417 L 189,411 L 184,405 L 183,399 L 183,393 L 188,389 L 193,384 L 197,379 L 204,376 L 208,371 L 210,364 L 218,361 L 224,355 L 289,375 L 296,374 L 303,373 L 310,372 L 310,365 L 309,359 L 307,351 L 307,345 L 308,338 L 306,330 L 312,327 L 318,329 L 325,329 L 331,329 L 338,332 L 347,332 L 349,325 L 347,316 L 348,310 L 350,304 L 353,298 L 353,290 L 355,283 L 362,279 L 368,277 L 374,273 L 380,268 L 386,262 L 393,258 L 400,255 L 407,257 L 414,259 L 421,261 L 428,264 L 435,267 L 442,267 L 449,264 L 451,257 L 452,246 L 452,239 L 453,232 L 459,230 L 466,229 L 472,228 L 479,228 L 485,227 L 492,223 L 499,219 L 505,215 L 512,210 L 518,206 L 526,202 L 533,200 L 540,198 L 547,196 L 553,192 L 559,187 L 565,181 L 572,174 L 579,169 L 586,163 L 592,161 L 598,161 L 604,161 L 610,160 L 616,160 L 622,166 L 628,166 L 636,162 L 644,160 L 650,161 L 658,164 L 664,166 L 672,169 L 678,170 L 685,170 L 693,169 L 698,173 L 697,179 L 695,187 L 697,194 L 698,202 L 697,208 L 694,216 L 695,224 L 700,230 L 707,234 L 714,238 L 719,244 L 722,253 L 721,261 L 722,267 L 725,274 L 731,279 L 734,286 L 739,292 L 745,297 L 750,301 L 752,308 L 759,313 L 765,313 L 772,312 L 777,316 L 787,320 L 794,323 L 801,326 L 804,334 L 809,338 L 818,341 L 829,344 L 833,349 L 804,361 L 805,367 L 806,375 L 806,381 L 814,388 L 822,389 L 829,393 L 836,398 L 842,403 L 850,408 L 857,413 L 935,412 L 940,419 L 946,422 L 951,430 L 955,438 L 957,445 L 938,450 Z";

class Faso17Map2D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.regions = window.FASO_17_REGIONS || [];
    this.contourPath = BURKINA_REAL_3D_CONTOUR;
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
                Contours officiels haute fidélité calés sur le relief réel • Survolez ou cliquez sur une région
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

        <!-- Zone SVG Vectorielle Responsive (ViewBox 0 0 1024 1024) -->
        <div class="relative w-full flex-1 flex items-center justify-center min-h-[460px] max-h-[720px]">
          <svg id="svg-map-17" viewBox="0 0 1024 1024" class="w-full h-full max-w-5xl drop-shadow-2xl transition-all duration-300">
            <defs>
              <filter id="shadow-burkina-3d" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.9"/>
              </filter>
              <!-- Masque de découpe selon le contour réel de la carte 3D -->
              <clipPath id="burkina-real-clip">
                <path d="${this.contourPath}" />
              </clipPath>
              <!-- Motif textile Faso Dan Fani en filigrane -->
              <pattern id="fani-mesh" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 0,12 L 12,0 L 24,12 L 12,24 Z" fill="none" stroke="#f59e0b" stroke-width="0.35" stroke-opacity="0.14" />
              </pattern>
            </defs>

            <!-- Arrière-plan cartographique sombre noble -->
            <rect x="0" y="0" width="1024" height="1024" fill="#0c0a09" />

            <!-- Pays limitrophes (toponymie discrète et authentique) -->
            <g class="neighbour-countries font-heading text-[13px] font-extrabold fill-stone-500/60 select-none pointer-events-none tracking-widest">
              <text x="240" y="150" opacity="0.55">MALI</text>
              <text x="860" y="160" opacity="0.55">NIGER</text>
              <text x="940" y="580" opacity="0.55">BÉNIN</text>
              <text x="760" y="870" opacity="0.55">TOGO</text>
              <text x="490" y="890" opacity="0.55">GHANA</text>
              <text x="110" y="880" opacity="0.55">CÔTE D'IVOIRE</text>
            </g>

            <!-- Silhouette de base avec ombre portée 3D -->
            <path d="${this.contourPath}" fill="#1c1917" filter="url(#shadow-burkina-3d)" />

            <!-- Groupe découpé exactement selon le contour réel -->
            <g clip-path="url(#burkina-real-clip)" id="regions-clipped-layer">
              <!-- Fond topographique authentique issu de la carte 3D -->
              <image href="/static/assets/burkina-3d-clean.jpg" x="0" y="0" width="1024" height="1024" preserveAspectRatio="none" />
              
              <!-- Voile assombrissant léger pour sublimer la lisibilité vectorielle -->
              <rect width="1024" height="1024" fill="#0c0a09" fill-opacity="0.18" />

              <!-- Les 17 Régions découpées sous forme vectorielle -->
              <g id="regions-polygons">
                ${this.regions.map(reg => `
                  <g class="region-item cursor-pointer group" data-region-id="${reg.id}">
                    <path
                      d="${reg.svgPath}"
                      class="region-poly transition-all duration-300 stroke-amber-400/35 stroke-[1.8] group-hover:stroke-amber-300 group-hover:stroke-[3.5] group-hover:fill-amber-500/35"
                      fill="${reg.color}"
                      fill-opacity="0.22"
                    />
                    <path
                      d="${reg.svgPath}"
                      fill="url(#fani-mesh)"
                      class="pointer-events-none opacity-40"
                    />
                  </g>
                `).join("")}
              </g>
            </g>

            <!-- Bordure souveraine dorée haute précision suivant les vraies frontières -->
            <path d="${this.contourPath}"
              fill="none" stroke="#f59e0b" stroke-width="3" stroke-linejoin="round"
              class="pointer-events-none drop-shadow-[0_0_12px_rgba(245,158,11,0.65)]" />
            <path d="${this.contourPath}"
              fill="none" stroke="#fef3c7" stroke-width="1" stroke-dasharray="10 5" stroke-linejoin="round"
              class="pointer-events-none opacity-60" />

            <!-- Nom du pays en filigrane supérieur -->
            <text x="512" y="85" text-anchor="middle"
              font-size="22" font-weight="900" letter-spacing="10"
              fill="#fbbf24" fill-opacity="0.5"
              class="pointer-events-none font-heading">BURKINA FASO</text>

            <!-- Étiquettes toponymiques des 17 régions -->
            <g id="regions-labels" class="pointer-events-none select-none">
              ${this.regions.map(reg => `
                <g transform="translate(${reg.svgCenter[0]}, ${reg.svgCenter[1]})">
                  <!-- Pastille d'arrière-plan pour contraste optimal -->
                  <rect x="-46" y="-13" width="92" height="26" rx="13" fill="#0c0a09" fill-opacity="0.82" stroke="#d97706" stroke-width="0.9" />
                  <text
                    x="0"
                    y="0"
                    text-anchor="middle"
                    class="text-[11px] font-extrabold fill-amber-100 font-heading"
                    dy="1"
                  >
                    ${reg.name}
                  </text>
                  <text
                    x="0"
                    y="11"
                    text-anchor="middle"
                    class="text-[8px] font-semibold fill-amber-400/90"
                  >
                    (${reg.capital})
                  </text>
                </g>
              `).join("")}
            </g>

            <!-- Balises lumineuses et hotspots de récits -->
            <g id="story-beacons-layer">
              ${this.regions.map(reg => `
                <g class="beacon-marker cursor-pointer group" data-region-id="${reg.id}" transform="translate(${reg.svgCenter[0]}, ${reg.svgCenter[1] - 20})">
                  <!-- Pulsation radar -->
                  <circle r="16" class="fill-amber-400/25 animate-ping opacity-70 pointer-events-none" />
                  <circle r="10" class="fill-amber-500 stroke-2 stroke-stone-950 drop-shadow-lg group-hover:scale-125 transition-all" />
                  <text text-anchor="middle" dy="3.5" class="text-[9.5px] fill-stone-950 font-black pointer-events-none">
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

    // Interaction sur les régions (clic et survol)
    const regionItems = this.container.querySelectorAll(".region-item, .beacon-marker");
    regionItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const regId = item.getAttribute("data-region-id");
        const reg = this.regions.find(r => r.id === regId);
        if (reg) {
          this.selectedRegionId = regId;
          this.showDrawer(reg, drawer, drawerContent);
          if (this.onSelectRegion) this.onSelectRegion(reg);
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

      poly.style.opacity = matches ? "1" : "0.15";
      poly.style.stroke = matches ? "#f59e0b" : "rgba(245, 158, 11, 0.2)";
    });
  }
}

window.Faso17Map2D = Faso17Map2D;
