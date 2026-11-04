/**
 * MÉMOIRE DU BURKINA — MOTEUR CARTOGRAPHIQUE 2D HAUTE FIDÉLITÉ
 * Calé exactement sur les contours réels du relief 3D (1024x1024).
 * Découpage vectoriel des 17 régions, micro-interactions, volet d'exploration contextuel.
 */

const BURKINA_REAL_3D_CONTOUR = "M 607.5,160 L 615,159.5 L 622,162.5 L 629,162.5 L 636,161.5 L 643,159.5 L 650,160.5 L 657,162.5 L 664,165.5 L 671,167.5 L 678,169.5 L 685,169.5 L 692,168.5 L 698,172.5 L 697.5,180 L 697.5,187 L 698.5,194 L 698.5,201 L 697.5,208 L 696.5,215 L 696.5,222 L 700,228.5 L 705.5,233 L 712,236.5 L 717.5,241 L 722,246.5 L 722.5,254 L 722.5,261 L 723.5,268 L 727,274.5 L 732,279.5 L 734.5,287 L 739.5,292 L 745,296.5 L 751,300.5 L 752.5,308 L 759,311.5 L 766,311.5 L 773,311.5 L 778.5,316 L 785,319.5 L 792,320.5 L 798.5,324 L 804.5,328 L 804.5,335 L 811,338.5 L 818,340.5 L 825,342.5 L 832,344.5 L 832,351.5 L 825,351.5 L 818,352.5 L 811,352.5 L 805.5,357 L 805.5,364 L 805.5,371 L 806.5,378 L 807.5,385 L 815,387.5 L 822,387.5 L 827.5,392 L 833.5,396 L 839,400.5 L 845,404.5 L 851,408.5 L 857,412.5 L 863,416.5 L 869,420.5 L 875,424.5 L 882,425.5 L 889,425.5 L 896,425.5 L 903,425.5 L 909,421.5 L 913.5,416 L 919.5,412 L 927,411.5 L 934,411.5 L 939.5,416 L 944.5,421 L 950.5,425 L 951.5,432 L 955.5,438 L 957.5,445 L 950,447.5 L 944.5,452 L 944.5,459 L 947.5,466 L 952,471.5 L 957,476.5 L 961.5,482 L 966.5,487 L 971,492.5 L 975.5,498 L 977.5,505 L 976.5,512 L 973,518.5 L 970.5,526 L 967.5,533 L 961,536.5 L 956,541.5 L 950.5,546 L 947,552.5 L 943,558.5 L 936,559.5 L 929,559.5 L 922,559.5 L 915,559.5 L 909,563.5 L 902,563.5 L 895,564.5 L 888,562.5 L 881,562.5 L 874,562.5 L 869.5,568 L 866.5,575 L 861,579.5 L 856,584.5 L 849,584.5 L 844.5,590 L 840,595.5 L 839.5,603 L 839.5,610 L 833,613.5 L 826,613.5 L 820,617.5 L 813,616.5 L 806,616.5 L 799.5,620 L 792,621.5 L 785,622.5 L 778,624.5 L 771,626.5 L 767,620.5 L 760,620.5 L 753,618.5 L 746,616.5 L 739,616.5 L 732,615.5 L 725,614.5 L 718,612.5 L 712,608.5 L 705,608.5 L 698,607.5 L 691,605.5 L 684,605.5 L 677,608.5 L 671.5,613 L 664,615.5 L 658.5,620 L 653,624.5 L 647.5,629 L 642.5,634 L 637,638.5 L 633,632.5 L 628,627.5 L 621,627.5 L 614,629.5 L 608,633.5 L 601,631.5 L 595,627.5 L 588,627.5 L 581.5,631 L 574,633.5 L 567,633.5 L 560,633.5 L 553,632.5 L 546.5,629 L 539,628.5 L 532,628.5 L 525.5,632 L 520,636.5 L 513,636.5 L 506,636.5 L 499,636.5 L 492,636.5 L 485,637.5 L 478,637.5 L 471,637.5 L 464,637.5 L 457,638.5 L 450,638.5 L 443,638.5 L 436,638.5 L 429,639.5 L 422,636.5 L 415,636.5 L 408,636.5 L 401,636.5 L 394,636.5 L 387,636.5 L 380,636.5 L 377.5,644 L 377.5,651 L 373,656.5 L 370.5,664 L 369.5,671 L 369.5,678 L 369.5,685 L 372.5,692 L 376.5,698 L 383,701.5 L 387.5,707 L 387.5,714 L 387.5,721 L 390.5,728 L 388.5,735 L 388.5,742 L 388.5,749 L 391.5,756 L 393.5,763 L 394.5,770 L 392.5,777 L 391.5,784 L 391.5,791 L 395.5,797 L 395.5,804 L 400.5,809 L 401.5,816 L 397,821.5 L 393,827.5 L 387.5,823 L 382,818.5 L 377,813.5 L 372,808.5 L 367.5,803 L 365.5,796 L 361,790.5 L 354,788.5 L 350.5,782 L 345,777.5 L 338,775.5 L 331,775.5 L 324,775.5 L 318,771.5 L 312,767.5 L 305,766.5 L 298,766.5 L 291,767.5 L 284,766.5 L 277,766.5 L 270,766.5 L 265.5,772 L 258,774.5 L 251,774.5 L 245.5,779 L 239,782.5 L 232,784.5 L 225,785.5 L 218,788.5 L 212,792.5 L 208.5,799 L 206.5,806 L 199,807.5 L 193,811.5 L 188.5,806 L 181,805.5 L 176,800.5 L 169,800.5 L 162,800.5 L 157,805.5 L 150.5,802 L 146,796.5 L 139.5,793 L 138.5,786 L 131,783.5 L 124,783.5 L 119.5,778 L 117.5,771 L 116.5,764 L 113,757.5 L 106,755.5 L 102.5,749 L 99,742.5 L 98.5,735 L 91.5,734 L 84,732.5 L 77,732.5 L 70,734.5 L 63,734.5 L 57,730.5 L 52.5,725 L 49.5,718 L 48.5,711 L 49.5,704 L 50.5,697 L 50.5,690 L 52.5,683 L 52.5,676 L 54.5,669 L 54.5,662 L 51.5,655 L 48.5,648 L 47.5,641 L 52,635.5 L 59,633.5 L 64.5,629 L 68.5,623 L 73,617.5 L 74.5,610 L 74.5,603 L 78.5,597 L 78.5,590 L 78.5,583 L 71,580.5 L 69.5,573 L 69.5,566 L 66,559.5 L 59.5,556 L 57.5,549 L 65,547.5 L 72,545.5 L 79,544.5 L 84,539.5 L 88.5,534 L 96,531.5 L 103,529.5 L 110,529.5 L 117,526.5 L 124,524.5 L 131,524.5 L 138,522.5 L 144,518.5 L 149,513.5 L 153.5,508 L 155.5,501 L 161.5,497 L 164.5,490 L 170.5,486 L 170.5,479 L 171.5,472 L 171.5,465 L 171.5,458 L 166,453.5 L 165.5,446 L 171,441.5 L 178,439.5 L 185,438.5 L 192,438.5 L 195.5,432 L 195.5,425 L 195.5,418 L 190.5,413 L 186,407.5 L 183.5,400 L 182.5,393 L 187,387.5 L 192.5,383 L 198,378.5 L 204,374.5 L 208.5,369 L 211.5,362 L 219,359.5 L 223.5,354 L 230.5,354 L 233.5,361 L 239,365.5 L 246,366.5 L 253,368.5 L 258,373.5 L 264,377.5 L 270.5,381 L 278,382.5 L 285,382.5 L 288.5,376 L 296,373.5 L 303,372.5 L 307.5,367 L 307.5,360 L 307.5,353 L 305.5,346 L 305.5,339 L 305.5,332 L 310,326.5 L 317,327.5 L 324,327.5 L 331,328.5 L 338,330.5 L 345,330.5 L 346.5,323 L 346.5,316 L 347.5,309 L 350.5,302 L 352.5,295 L 352.5,288 L 356,281.5 L 363,278.5 L 370,275.5 L 376,271.5 L 381,266.5 L 386,261.5 L 392,257.5 L 399,254.5 L 406,256.5 L 413,257.5 L 420,259.5 L 427,262.5 L 434,265.5 L 441,265.5 L 448,264.5 L 450.5,257 L 451.5,250 L 451.5,243 L 452.5,236 L 456,229.5 L 463,228.5 L 470,227.5 L 477,227.5 L 484,226.5 L 491,223.5 L 497,219.5 L 503.5,216 L 509,211.5 L 515,207.5 L 521,203.5 L 528,200.5 L 535,198.5 L 542,196.5 L 549,194.5 L 555,190.5 L 560,185.5 L 565,180.5 L 570,175.5 L 575.5,171 L 581,166.5 L 586.5,162 L 594,160.5 L 601,160.5 Z";

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
                Contours réels du relief 3D • Survolez ou cliquez sur une région pour afficher son dossier
              </p>
            </div>
          </div>

          <!-- Filtres géoculturels fidèles -->
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button class="map2d-filter active px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 font-medium transition-all" data-filter="all">
              Toutes (17)
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="ouest">
              Grand Ouest (5)
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="centre">
              Plateau Central &amp; Centre (6)
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="sahel">
              Sahel &amp; Nord (3)
            </button>
            <button class="map2d-filter px-3 py-1 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-filter="est">
              Est &amp; Gulmu (3)
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
              <!-- Masque de découpe selon le contour réel continu de la carte 3D -->
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

            <!-- Groupe découpé exactement selon le contour réel sans aucune encoche -->
            <g clip-path="url(#burkina-real-clip)" id="regions-clipped-layer">
              <!-- Fond topographique authentique issu de la carte 3D -->
              <image href="/static/assets/burkina-3d-clean.jpg" x="0" y="0" width="1024" height="1024" preserveAspectRatio="none" />
              
              <!-- Voile assombrissant léger pour sublimer la lisibilité vectorielle -->
              <rect width="1024" height="1024" fill="#0c0a09" fill-opacity="0.16" />

              <!-- Les 17 Régions découpées sous forme vectorielle avec jointures arrondies -->
              <g id="regions-polygons">
                ${this.regions.map(reg => `
                  <g class="region-item cursor-pointer group" data-region-id="${reg.id}">
                    <path
                      d="${reg.svgPath}"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      class="region-poly transition-all duration-300 stroke-amber-400/30 stroke-[1.6] group-hover:stroke-amber-300 group-hover:stroke-[3] group-hover:fill-amber-500/35"
                      fill="${reg.color}"
                      fill-opacity="0.22"
                    />
                    <path
                      d="${reg.svgPath}"
                      fill="url(#fani-mesh)"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      class="pointer-events-none opacity-40"
                    />
                  </g>
                `).join("")}
              </g>
            </g>

            <!-- Bordure souveraine dorée haute précision suivant les vraies frontières du relief -->
            <path d="${this.contourPath}"
              fill="none" stroke="#f59e0b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"
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
                  <rect x="-46" y="-13" width="92" height="26" rx="13" fill="#0c0a09" fill-opacity="0.85" stroke="#d97706" stroke-width="0.9" />
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

          <!-- Volet d'exploration contextuel (S'ouvre au survol et au clic) -->
          <div id="map-region-drawer" class="absolute top-4 right-4 w-80 max-w-[90%] bg-stone-900/95 border border-amber-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 translate-x-[110%] opacity-0 pointer-events-none z-30">
            <div id="drawer-content"></div>
          </div>
        </div>

        <!-- Légende en bas de carte -->
        <div class="w-full flex flex-wrap items-center justify-between text-xs text-amber-300/80 mt-3 pt-3 border-t border-amber-900/30">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Grand Ouest</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Plateau Central &amp; Centre</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span> Sahel &amp; Nord</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-yellow-600 inline-block"></span> Est (Gulmu)</span>
          </div>
          <div class="italic text-amber-400/70 text-[11px]">
            Survolez ou cliquez sur une région pour ouvrir son dossier culturel complet
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

    // Filtrage territorial rapide et fidèle
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

    // Interaction sur les régions (SURVOL + CLIC)
    const regionItems = this.container.querySelectorAll(".region-item, .beacon-marker");
    regionItems.forEach(item => {
      const activateRegion = () => {
        const regId = item.getAttribute("data-region-id");
        const reg = this.regions.find(r => r.id === regId);
        if (reg) {
          this.selectedRegionId = regId;
          this.showDrawer(reg, drawer, drawerContent);
        }
      };

      // Au survol (demande explicite de l'utilisateur)
      item.addEventListener("mouseenter", activateRegion);

      // Au clic
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        activateRegion();
        const regId = item.getAttribute("data-region-id");
        const reg = this.regions.find(r => r.id === regId);
        if (reg && this.onSelectRegion) this.onSelectRegion(reg);
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
          <div><strong class="text-amber-300">Musique &amp; Instruments :</strong> ${reg.musicalTraditions.slice(0, 75)}...</div>
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

      // Classification officielle et fidèle des 17 régions :
      if (filter === "ouest") {
        matches = ["bankui", "djoro", "guiriko", "sourou", "tannounyan"].includes(regId);
      } else if (filter === "centre") {
        // Plateau Central, Centre et Centre-Est/Sud/Ouest
        matches = ["kadiogo", "oubri", "kuilse", "nando", "nazinon", "nakambe"].includes(regId);
      } else if (filter === "sahel") {
        // Sahel et grand Nord authentique
        matches = ["liptako", "soum", "yaadga"].includes(regId);
      } else if (filter === "est") {
        // Est & Gulmu
        matches = ["goulmou", "sirba", "tapoa"].includes(regId);
      }

      poly.style.opacity = matches ? "1" : "0.15";
      poly.style.fillOpacity = matches ? "0.35" : "0.08";
      poly.style.stroke = matches ? "#f59e0b" : "rgba(245, 158, 11, 0.2)";
      poly.style.strokeWidth = matches ? "2.5" : "1.2";
    });
  }
}

window.Faso17Map2D = Faso17Map2D;
