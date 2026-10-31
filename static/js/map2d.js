/**
 * FASO 2D MAP ENGINE - CARTE INTERACTIVE 2D VECTORIELLE DU BURKINA FASO
 * Rendu SVG haute précision des 13 régions administratives et culturelles,
 * marqueurs géolocalisés avec pulsation d'onde, infobulles et filtrage interactif.
 */

class Faso2DMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.selectedRegion = null;
    this.currentFilter = "all";
    this.svg = null;
    this.tooltip = null;
    this.onSelectStory = options.onSelectStory || null;
    this.onSelectRegion = options.onSelectRegion || null;

    // Définition géométrique stylisée et proportionnelle des 13 régions du Burkina Faso (ViewBox 0 0 1000 680)
    this.regionPaths = {
      "sahel": {
        name: "Sahel",
        path: "M 480 30 L 610 20 L 750 70 L 780 150 L 710 190 L 590 180 L 500 130 Z",
        center: [630, 105],
        id: "sahel"
      },
      "nord": {
        name: "Nord",
        path: "M 320 140 L 480 120 L 500 130 L 460 230 L 360 250 L 290 200 Z",
        center: [390, 190],
        id: "nord"
      },
      "centre-nord": {
        name: "Centre-Nord",
        path: "M 480 120 L 590 180 L 580 280 L 490 290 L 460 230 Z",
        center: [530, 220],
        id: "centre-nord"
      },
      "boucle-mouhoun": {
        name: "Boucle du Mouhoun",
        path: "M 230 180 L 320 140 L 360 250 L 350 340 L 280 400 L 180 360 L 170 260 Z",
        center: [260, 280],
        id: "boucle-mouhoun"
      },
      "plateau-central": {
        name: "Plateau-Central",
        path: "M 460 230 L 490 290 L 540 310 L 520 350 L 450 330 L 430 270 Z",
        center: [480, 295],
        id: "plateau-central"
      },
      "centre": {
        name: "Centre (Ouagadougou)",
        path: "M 430 270 L 450 330 L 420 360 L 390 320 Z",
        center: [425, 320],
        id: "centre"
      },
      "centre-ouest": {
        name: "Centre-Ouest",
        path: "M 350 250 L 430 270 L 390 320 L 420 360 L 380 430 L 290 390 L 350 340 Z",
        center: [360, 350],
        id: "centre-ouest"
      },
      "centre-sud": {
        name: "Centre-Sud",
        path: "M 420 360 L 490 350 L 510 460 L 410 470 L 380 430 Z",
        center: [455, 420],
        id: "centre-sud"
      },
      "centre-est": {
        name: "Centre-Est",
        path: "M 540 310 L 630 300 L 660 410 L 570 470 L 510 460 L 520 350 Z",
        center: [590, 390],
        id: "centre-est"
      },
      "est": {
        name: "Est",
        path: "M 590 180 L 710 190 L 860 250 L 930 360 L 840 450 L 720 460 L 660 410 L 630 300 L 580 280 Z",
        center: [750, 330],
        id: "est"
      },
      "hauts-bassins": {
        name: "Hauts-Bassins",
        path: "M 180 360 L 280 400 L 270 480 L 200 520 L 110 470 L 130 390 Z",
        center: [195, 450],
        id: "hauts-bassins"
      },
      "cascades": {
        name: "Cascades",
        path: "M 110 470 L 200 520 L 180 620 L 90 590 L 80 500 Z",
        center: [140, 545],
        id: "cascades"
      },
      "sud-ouest": {
        name: "Sud-Ouest",
        path: "M 270 480 L 380 430 L 370 540 L 320 630 L 230 630 L 200 520 Z",
        center: [285, 540],
        id: "sud-ouest"
      }
    };

    // Coordonnées projetées sur le viewBox (1000x680) pour les contes
    this.storyMarkers = [
      { id: "yennenga", x: 425, y: 320, title: "Princesse Yennenga", category: "Légende Fondatrice", icon: "👑" },
      { id: "dafra", x: 195, y: 445, title: "Silures Sacrés de Dafra", category: "Mythe & Esprit de la Nature", icon: "🐟" },
      { id: "guimbi-ouattara", x: 215, y: 465, title: "Guimbi Ouattara", category: "Récit Historique", icon: "🛡️" },
      { id: "sabou", x: 350, y: 345, title: "Crocodiles de Sabou", category: "Alliance Totémique", icon: "🐊" },
      { id: "lievre-hyene", x: 255, y: 280, title: "Le Lièvre et l'Hyène", category: "Conte Moral & Initiatique", icon: "🐇" },
      { id: "loropeni", x: 280, y: 550, title: "Ruines de Loropéni", category: "Récit Historique & Patrimoine", icon: "🏛️" },
      { id: "berger-sahel", x: 630, y: 105, title: "Le Berger Peul et le Génie", category: "Légende Pastorale", icon: "⭐" },
      { id: "tiebele", x: 460, y: 440, title: "Murs Peints de Tiébélé", category: "Art & Sagesse Ancestrale", icon: "🎨" }
    ];

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="relative w-full h-full flex flex-col items-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-amber-950/20 via-stone-900/60 to-stone-950 border border-amber-900/30 shadow-2xl p-4">
        <!-- Barre de filtres et d'outils -->
        <div class="w-full flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              🗺️
            </span>
            <div>
              <h3 class="text-sm font-bold text-amber-200">Carte Culturelle 2D du Burkina Faso</h3>
              <p class="text-xs text-amber-400/70">13 Régions • Sites sacrés & légendes vivantes</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button class="filter-btn active px-2.5 py-1 rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 transition-all font-medium" data-cat="all">
              Tous (${this.storyMarkers.length})
            </button>
            <button class="filter-btn px-2.5 py-1 rounded-full border border-stone-700 bg-stone-900/60 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-cat="fondatrice">
              Fondatrices
            </button>
            <button class="filter-btn px-2.5 py-1 rounded-full border border-stone-700 bg-stone-900/60 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-cat="sacree">
              Totems & Nature
            </button>
            <button class="filter-btn px-2.5 py-1 rounded-full border border-stone-700 bg-stone-900/60 text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-all" data-cat="histoire">
              Histoire & Patrimoine
            </button>
          </div>
        </div>

        <!-- Zone d'affichage SVG responsive -->
        <div class="relative w-full flex-1 flex items-center justify-center min-h-[380px] max-h-[620px]">
          <svg id="burkina-svg" viewBox="0 0 1020 700" class="w-full h-full max-w-4xl drop-shadow-2xl transition-transform duration-300">
            <defs>
              <!-- Filtre d'ombre portée pour les polygones régionaux -->
              <filter id="region-shadow" x="-5%" y="-5%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
              </filter>
              <!-- Filtre de halo doré pour les marqueurs -->
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <!-- Motif géométrique inspiré du Faso Dan Fani -->
              <pattern id="fani-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 0,8 L 8,0 L 16,8 L 8,16 Z" fill="none" stroke="#f59e0b" stroke-width="0.3" stroke-opacity="0.15" />
              </pattern>
            </defs>

            <!-- Tracé des cours d'eau sacrés (Mouhoun / Nakambé / Nazinon) -->
            <g class="rivers stroke-sky-500/30 fill-none stroke-[2.5] stroke-dasharray-[4,2] pointer-events-none">
              <!-- Fleuve Mouhoun (Black Volta) -->
              <path d="M 230 140 Q 180 250 200 370 Q 230 450 290 600" />
              <!-- Nakambé (White Volta) -->
              <path d="M 440 220 Q 450 310 470 440 Q 480 500 520 620" />
            </g>

            <!-- Groupe des 13 Régions Administratives -->
            <g id="regions-group">
              ${Object.keys(this.regionPaths).map(regId => {
                const reg = this.regionPaths[regId];
                const data = FASO_REGIONS.find(r => r.id === regId) || {};
                return `
                  <g class="region-node cursor-pointer group" data-region-id="${regId}">
                    <path
                      d="${reg.path}"
                      class="region-path transition-all duration-300 stroke-amber-900/60 stroke-[1.5] group-hover:stroke-amber-400 group-hover:stroke-[2.5]"
                      fill="${data.color || '#78350f'}"
                      fill-opacity="0.45"
                      filter="url(#region-shadow)"
                    />
                    <!-- Trame de texture culturelle en surimpression -->
                    <path
                      d="${reg.path}"
                      fill="url(#fani-pattern)"
                      class="pointer-events-none"
                    />
                    <!-- Label du Chef-lieu / Nom de région -->
                    <text
                      x="${reg.center[0]}"
                      y="${reg.center[1]}"
                      text-anchor="middle"
                      class="region-label text-[11px] font-bold fill-amber-100/80 pointer-events-none tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      ${reg.name}
                    </text>
                  </g>
                `;
              }).join("")}
            </g>

            <!-- Groupe des Points d'intérêt des Contes & Légendes -->
            <g id="story-markers-group">
              ${this.storyMarkers.map(marker => {
                return `
                  <g class="story-marker cursor-pointer group" data-story-id="${marker.id}" data-category="${marker.category}" transform="translate(${marker.x}, ${marker.y})">
                    <!-- Ondes de résonance pulsante -->
                    <circle r="22" class="fill-amber-400/20 animate-ping opacity-75" />
                    <circle r="14" class="fill-amber-500/40 animate-pulse" />
                    <!-- Disque principal doré -->
                    <circle r="11" class="fill-gradient-to-r from-amber-500 to-yellow-400 stroke-2 stroke-amber-100 drop-shadow-md group-hover:r-[14] transition-all" fill="#f59e0b" />
                    <!-- Icône du Conte -->
                    <text text-anchor="middle" dy="4" class="text-[11px] select-none pointer-events-none">${marker.icon}</text>
                  </g>
                `;
              }).join("")}
            </g>
          </svg>

          <!-- Infobulle interactive dynamique (Tooltip flottant) -->
          <div id="map2d-tooltip" class="absolute pointer-events-none opacity-0 transition-opacity duration-200 z-30 bg-stone-900/95 border border-amber-500/50 rounded-xl p-3 shadow-2xl backdrop-blur-md max-w-xs text-xs text-stone-200">
            <div id="tooltip-content"></div>
          </div>
        </div>

        <!-- Légende de la carte en bas -->
        <div class="w-full flex flex-wrap items-center justify-between text-[11px] text-amber-300/80 mt-2 pt-2 border-t border-amber-900/30">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Légende Fondatrice</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span> Esprit & Totem</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"></span> Patrimoine UNESCO</span>
          </div>
          <div class="italic text-amber-500/70">
            Cliquez sur un marqueur ou une région pour ouvrir le conte
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const svg = this.container.querySelector("#burkina-svg");
    const tooltip = this.container.querySelector("#map2d-tooltip");
    const filterBtns = this.container.querySelectorAll(".filter-btn");

    // Filtrage des marqueurs
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("active", "bg-amber-500/20", "text-amber-200", "border-amber-500/40");
          b.classList.add("bg-stone-900/60", "text-stone-300", "border-stone-700");
        });
        btn.classList.add("active", "bg-amber-500/20", "text-amber-200", "border-amber-500/40");
        btn.classList.remove("bg-stone-900/60", "text-stone-300", "border-stone-700");

        const cat = btn.getAttribute("data-cat");
        this.filterMarkers(cat);
      });
    });

    // Événements sur les Marqueurs de Contes
    const markers = this.container.querySelectorAll(".story-marker");
    markers.forEach(marker => {
      const storyId = marker.getAttribute("data-story-id");
      const story = FASO_STORIES.find(s => s.id === storyId);

      marker.addEventListener("mouseenter", (e) => {
        if (!story) return;
        tooltip.innerHTML = `
          <div class="font-bold text-amber-400 text-sm mb-1">${story.title}</div>
          <div class="text-[10px] text-amber-300/80 mb-1.5">${story.regionName} • ${story.category}</div>
          <div class="text-stone-300 line-clamp-2 leading-relaxed mb-2">${story.synopsis}</div>
          <div class="flex items-center justify-between text-[10px] text-amber-500 font-semibold pt-1 border-t border-amber-900/40">
            <span>🗣️ ${story.languages.join(", ")}</span>
            <span>▶ Cliquez pour écouter</span>
          </div>
        `;
        tooltip.style.opacity = "1";
        this.positionTooltip(e, tooltip);
      });

      marker.addEventListener("mousemove", (e) => {
        this.positionTooltip(e, tooltip);
      });

      marker.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
      });

      marker.addEventListener("click", () => {
        if (this.onSelectStory && story) {
          this.onSelectStory(story);
        }
      });
    });

    // Événements sur les Régions
    const regionNodes = this.container.querySelectorAll(".region-node");
    regionNodes.forEach(node => {
      const regionId = node.getAttribute("data-region-id");
      const regData = FASO_REGIONS.find(r => r.id === regionId);

      node.addEventListener("mouseenter", (e) => {
        if (!regData) return;
        const regionStories = FASO_STORIES.filter(s => s.regionId === regionId);
        tooltip.innerHTML = `
          <div class="font-bold text-amber-400 text-sm mb-1">Région : ${regData.name}</div>
          <div class="text-[10px] text-amber-300/80 mb-1">Chef-lieu : ${regData.chefLieu}</div>
          <div class="text-stone-300 mb-1.5">${regData.description}</div>
          <div class="text-[10px] text-stone-400 mb-1">
            <strong>Peuples & Langues :</strong> ${regData.peoples.join(", ")} (${regData.languages.join(", ")})
          </div>
          <div class="text-[10px] text-amber-400 font-semibold pt-1 border-t border-amber-900/40">
            ${regionStories.length > 0 ? `📚 ${regionStories.length} récit(s) répertorié(s)` : '🌾 Terroir de contes oraux'}
          </div>
        `;
        tooltip.style.opacity = "1";
        this.positionTooltip(e, tooltip);
      });

      node.addEventListener("mousemove", (e) => {
        this.positionTooltip(e, tooltip);
      });

      node.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
      });

      node.addEventListener("click", () => {
        if (this.onSelectRegion && regData) {
          this.onSelectRegion(regData);
        }
      });
    });
  }

  positionTooltip(event, tooltip) {
    const rect = this.container.getBoundingClientRect();
    const x = event.clientX - rect.left + 15;
    const y = event.clientY - rect.top + 15;

    // Éviter le débordement hors du conteneur
    const maxX = rect.width - 240;
    const tooltipX = Math.min(x, maxX);
    const tooltipY = Math.max(10, Math.min(y, rect.height - 150));

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
  }

  filterMarkers(category) {
    const markers = this.container.querySelectorAll(".story-marker");
    markers.forEach(marker => {
      const cat = marker.getAttribute("data-category");
      let visible = true;

      if (category === "fondatrice") {
        visible = cat.includes("Fondatrice");
      } else if (category === "sacree") {
        visible = cat.includes("Nature") || cat.includes("Totémique") || cat.includes("Pastorale");
      } else if (category === "histoire") {
        visible = cat.includes("Historique") || cat.includes("Patrimoine") || cat.includes("Art");
      }

      marker.style.display = visible ? "block" : "none";
    });
  }
}

window.Faso2DMap = Faso2DMap;
