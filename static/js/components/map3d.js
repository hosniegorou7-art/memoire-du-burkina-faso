/**
 * MÉMOIRE DU BURKINA — MOTEUR CARTOGRAPHIQUE 3D EXPRESSIF & TOPOGRAPHIQUE
 * Rendu Canvas 3D isométrique riche et représentatif de la géographie du Burkina Faso :
 * - Reliefs marqués (Falaises de Banfora, Dômes de Fabedougou, Plateau Mossi, Dunes sahéliennes)
 * - Biomes colorés réalistes (Sable ocre du Sahel au nord, savane rouge centrale, vallées vertes au sud-ouest)
 * - Cours d'eau scintillants (Mouhoun / Volta Noire, Nakambé / Volta Blanche, Nazinon / Volta Rouge)
 * - Monuments et repères emblématiques 3D (Tiébélé, Loropéni, Dafra, Yennenga, Sabou, Oursi)
 * - Balises 3D interactives des 17 régions avec navigation orbitale fluide et 4 ambiances lumineuses.
 */

class Faso17Map3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;

    // Paramètres caméra orbitale
    this.yaw = 0.52;
    this.pitch = 0.76;
    this.zoom = 1.05;
    this.autoRotate = true;
    this.isDragging = false;
    this.lastMousePos = { x: 0, y: 0 };
    this.lightMode = "sunset"; // "dawn", "day", "sunset", "night"
    this.time = 0;
    this.hoveredLandmark = null;
    this.selectedRegionId = null;

    this.regions = window.FASO_17_REGIONS || [];
    this.landmarks = this.initCulturalLandmarks();
    this.reliefMesh = this.buildFasoTopography();
    this.rivers = this.buildRiversGeometry();

    this.init();
  }

  initCulturalLandmarks() {
    return [
      {
        id: "djoro-cascades",
        regionId: "djoro",
        name: "Cascades & Dômes de Fabedougou",
        region: "Djôrô",
        capital: "Banfora",
        coords: [-0.62, 0.65],
        height: 65,
        type: "nature",
        desc: "Falaises gréseuses et chutes d'eau vives"
      },
      {
        id: "guiriko-dafra",
        regionId: "guiriko",
        name: "Silures de Dafra & Grande Mosquée",
        region: "Guiriko",
        capital: "Bobo-Dioulasso",
        coords: [-0.48, 0.42],
        height: 48,
        type: "monument",
        desc: "Sanctuaire aquatique sacré et chef-d'œuvre de banco"
      },
      {
        id: "kadiogo-yennenga",
        regionId: "kadiogo",
        name: "Monument Yennenga & Palais Mogho Naba",
        region: "Kadiogo",
        capital: "Ouagadougou",
        coords: [0.0, 0.05],
        height: 42,
        type: "capital",
        desc: "Cœur historique et politique du Faso"
      },
      {
        id: "nazinon-tiebele",
        regionId: "nazinon",
        name: "Cour Royale Peinte de Tiébélé",
        region: "Nazinon",
        capital: "Manga",
        coords: [0.18, 0.55],
        height: 52,
        type: "unesco",
        desc: "Fresques géométriques séculaires en latérite"
      },
      {
        id: "tannounyan-loropeni",
        regionId: "tannounyan",
        name: "Ruines UNESCO de Loropéni",
        region: "Tannounyan",
        capital: "Gaoua",
        coords: [-0.28, 0.72],
        height: 56,
        type: "unesco",
        desc: "Murailles millénaires en pierre taillée des rois de l'or"
      },
      {
        id: "nando-sabou",
        regionId: "nando",
        name: "Crocodiles Sacrés de Sabou",
        region: "Nando",
        capital: "Koudougou",
        coords: [-0.22, 0.12],
        height: 38,
        type: "totem",
        desc: "Pacte fraternel ancestral entre humains et sauriens"
      },
      {
        id: "liptako-oursi",
        regionId: "liptako",
        name: "Grandes Dunes d'Oursi & Pulaaku",
        region: "Liptako",
        capital: "Dori",
        coords: [0.38, -0.68],
        height: 44,
        type: "sahel",
        desc: "Sables dorés et poésies pastorales peules"
      },
      {
        id: "tapoa-gobnangou",
        regionId: "tapoa",
        name: "Falaises de Gobnangou & Parc W",
        region: "Tapoa",
        capital: "Diapaga",
        coords: [0.72, 0.28],
        height: 54,
        type: "nature",
        desc: "Refuge historique des chasseurs Dozo et faune sauvage"
      },
      {
        id: "yaadga-zai",
        regionId: "yaadga",
        name: "Bocage du Zaï ancestral",
        region: "Yaadga",
        capital: "Ouahigouya",
        coords: [-0.15, -0.38],
        height: 35,
        type: "culture",
        desc: "Génie agroécologique de reverdissement du Sahel"
      },
      {
        id: "bankui-mouhoun",
        regionId: "bankui",
        name: "Masques sacrés de feuilles & FESTIMA",
        region: "Bankui",
        capital: "Dédougou",
        coords: [-0.42, -0.08],
        height: 36,
        type: "culture",
        desc: "Tradition initiatique des peuples Bwaba et San"
      }
    ];
  }

  buildFasoTopography() {
    const cols = 32;
    const rows = 26;
    const grid = [];

    for (let r = 0; r <= rows; r++) {
      grid[r] = [];
      const zNorm = (r / rows - 0.5) * 2; // -1 (Nord Sahel) à +1 (Sud Cascades/Tiébélé)

      for (let c = 0; c <= cols; c++) {
        const xNorm = (c / cols - 0.5) * 2; // -1 (Ouest) à +1 (Est)

        const inside = this.isInsideBurkinaOutline(xNorm, zNorm);
        let elev = 0;
        let biome = "savanna"; // "sahel", "savanna", "cascades", "valley"

        if (inside) {
          // 1. Zone Sud-Ouest : Falaises abruptes de Banfora / Dômes / Pics
          const isSouthWest = (xNorm < -0.15 && zNorm > 0.25);
          const swLift = isSouthWest ? Math.pow(Math.max(0, -xNorm * 0.7 + zNorm * 0.9), 1.6) * 55 : 0;

          // 2. Zone Nord : Ondulations régulières des dunes du Sahel
          const isNorthSahel = (zNorm < -0.28);
          const duneWave = isNorthSahel ? (Math.sin(xNorm * 9.0) * 10 + Math.cos(zNorm * 8.0) * 8 + 14) : 0;

          // 3. Zone Centrale : Plateau Mossi latéritique
          const plateauMossi = Math.sin(xNorm * 3.5) * Math.cos(zNorm * 3.0) * 6 + 12;

          // 4. Zone Est : Chaîne de Gobnangou
          const isEastCliff = (xNorm > 0.45 && zNorm > 0.1);
          const eastCliff = isEastCliff ? Math.sin((xNorm + zNorm) * 6) * 14 + 18 : 0;

          elev = Math.max(4, swLift + duneWave + plateauMossi + eastCliff);

          if (zNorm < -0.28) {
            biome = "sahel";
          } else if (isSouthWest) {
            biome = "cascades";
          } else if (Math.abs(xNorm + 0.3) < 0.15 && zNorm > -0.2 && zNorm < 0.5) {
            biome = "valley";
          } else {
            biome = "savanna";
          }
        }

        grid[r][c] = {
          x: xNorm * 300,
          y: -elev,
          z: zNorm * 240,
          elev: elev,
          biome: biome,
          inside: inside
        };
      }
    }
    return grid;
  }

  buildRiversGeometry() {
    return [
      // Mouhoun (Volta Noire) : Grande boucle dans l'Ouest
      [
        { x: -140, y: -8, z: 120 },
        { x: -155, y: -10, z: 80 },
        { x: -130, y: -12, z: 20 },
        { x: -125, y: -12, z: -30 },
        { x: -80, y: -10, z: -40 },
        { x: -30, y: -8, z: 40 },
        { x: 10, y: -8, z: 130 }
      ],
      // Nakambé (Volta Blanche) : Traversée du Nord au Sud
      [
        { x: -40, y: -14, z: -110 },
        { x: -15, y: -12, z: -50 },
        { x: 10, y: -10, z: 20 },
        { x: 45, y: -8, z: 90 },
        { x: 60, y: -6, z: 150 }
      ],
      // Nazinon (Volta Rouge) : Sud Central vers Tiébélé
      [
        { x: -15, y: -10, z: 30 },
        { x: 0, y: -9, z: 80 },
        { x: 25, y: -8, z: 140 }
      ]
    ];
  }

  isInsideBurkinaOutline(x, z) {
    // Profil géométrique fidèle des frontières du Faso
    if (z < -0.92 || z > 0.95) return false;
    if (x < -0.92 || x > 0.95) return false;

    // Découpes frontalières caractéristiques :
    // Sud-est (angle Bénin/Togo)
    if (x > 0.55 && z > 0.45) return false;
    // Nord-ouest (boucle du Niger malienne)
    if (x < -0.68 && z < -0.25) return false;
    // Nord-est (pointe désertique Mali/Niger)
    if (x > 0.72 && z < -0.42) return false;
    // Sud-ouest extrême
    if (x < -0.80 && z > 0.85) return false;

    return true;
  }

  init() {
    if (!this.container) return;
    this.renderDOM();
    this.initCanvas();
    this.bindEvents();
    this.startLoop();
  }

  renderDOM() {
    this.container.innerHTML = `
      <div class="relative w-full h-full flex flex-col select-none overflow-hidden rounded-3xl bg-stone-950 border border-amber-900/40 shadow-2xl p-4 sm:p-6">
        
        <!-- En-tête de la carte 3D -->
        <div class="w-full flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              ${window.fasoIcon('layers', 'w-5 h-5 text-amber-400')}
            </div>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-amber-100 font-heading">
                Relief Topographique 3D du Burkina Faso
              </h3>
              <p class="text-[11px] text-amber-400/80">
                17 Régions • Falaises de Banfora • Dunes du Sahel • Fleuves Mouhoun &amp; Nakambé
              </p>
            </div>
          </div>

          <!-- Sélecteur d'ambiances solaires & Commandes -->
          <div class="flex items-center gap-2">
            <div class="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
              <button class="btn-light-3d px-2.5 py-1 rounded-lg text-[11px] font-bold text-stone-300 hover:text-white transition-all flex items-center gap-1" data-mode="dawn">
                ${window.fasoIcon('sun', 'w-3 h-3 text-pink-400')}
                <span class="hidden md:inline">Aube</span>
              </button>
              <button class="btn-light-3d px-2.5 py-1 rounded-lg text-[11px] font-bold text-stone-300 hover:text-white transition-all flex items-center gap-1" data-mode="day">
                ${window.fasoIcon('sun', 'w-3 h-3 text-yellow-400')}
                <span class="hidden md:inline">Midi</span>
              </button>
              <button class="btn-light-3d active bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1" data-mode="sunset">
                ${window.fasoIcon('sun', 'w-3 h-3 text-orange-400')}
                <span class="hidden md:inline">Crépuscule</span>
              </button>
              <button class="btn-light-3d px-2.5 py-1 rounded-lg text-[11px] font-bold text-stone-300 hover:text-white transition-all flex items-center gap-1" data-mode="night">
                ${window.fasoIcon('moon', 'w-3 h-3 text-indigo-400')}
                <span class="hidden md:inline">Nuit</span>
              </button>
            </div>

            <button id="btn-3d-autorotate" class="px-2.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1" title="Bascule rotation automatique">
              ${window.fasoIcon('refresh', 'w-3.5 h-3.5')}
              <span class="hidden sm:inline">Rotation</span>
            </button>
          </div>
        </div>

        <!-- Zone de Rendu Canvas 3D -->
        <div class="relative flex-1 w-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-stone-800/80 bg-stone-950">
          <canvas id="canvas-faso-17-3d" class="w-full h-full block"></canvas>

          <!-- Légende topographique des biomes -->
          <div class="absolute bottom-3 left-3 z-10 bg-stone-950/85 backdrop-blur-md border border-amber-900/30 rounded-xl px-3 py-2 text-[10px] text-stone-300 space-y-1">
            <div class="font-bold text-amber-400 uppercase tracking-widest text-[9px] mb-1">Topographie &amp; Biomes</div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-2 rounded bg-amber-400"></span>
              <span>Dunes sahéliennes (Nord)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-2 rounded bg-amber-700"></span>
              <span>Plateau Mossi latéritique (Centre)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-2 rounded bg-emerald-600"></span>
              <span>Falaises &amp; Cascades (Sud-Ouest)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-1 rounded bg-sky-400"></span>
              <span>Fleuves Mouhoun &amp; Nakambé</span>
            </div>
          </div>

          <!-- Infobulle interactive sur survol de monument -->
          <div id="tooltip-3d-landmark" class="hidden absolute pointer-events-none z-20 bg-stone-900/95 border border-amber-500/50 rounded-xl p-3 shadow-2xl max-w-xs text-left backdrop-blur-md">
            <div id="tooltip-3d-title" class="font-bold text-amber-200 text-xs font-heading"></div>
            <div id="tooltip-3d-region" class="text-[10px] text-amber-400 font-mono mt-0.5"></div>
            <p id="tooltip-3d-desc" class="text-stone-300 text-[11px] mt-1 leading-snug"></p>
          </div>
        </div>

        <!-- Guide d'interaction sous la carte -->
        <div class="w-full flex items-center justify-between text-[11px] text-stone-400 pt-2 px-1">
          <div>Glisser pour faire tourner à 360° • Molette pour zoomer • Survoler les repères pour découvrir les hauts lieux</div>
          <div class="text-amber-400 font-bold font-mono">17 Régions Officiellement Intégrées</div>
        </div>

      </div>
    `;
  }

  initCanvas() {
    this.canvas = this.container.querySelector("#canvas-faso-17-3d");
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  project(p) {
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;

    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const y2 = p.y * cosP - z1 * sinP;
    const z2 = p.y * sinP + z1 * cosP;

    const fov = 520 * this.zoom;
    const dist = 460;
    const scale = fov / (dist + z2);

    return {
      x: this.width / 2 + x1 * scale,
      y: this.height / 2 + y2 * scale + 15,
      scale: scale,
      depth: z2
    };
  }

  startLoop() {
    const loop = () => {
      this.time += 0.02;
      if (this.autoRotate && !this.isDragging) {
        this.yaw += 0.002;
      }
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  draw() {
    if (!this.ctx || !this.width) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawSkyAtmosphere();
    this.drawTopographicTerrain();
    this.drawRivers();
    this.drawCulturalLandmarks();
  }

  drawSkyAtmosphere() {
    const g = this.ctx.createLinearGradient(0, 0, 0, this.height);
    if (this.lightMode === "sunset") {
      g.addColorStop(0, "#190802");
      g.addColorStop(0.35, "#3b1304");
      g.addColorStop(0.65, "#832407");
      g.addColorStop(0.9, "#d97706");
      g.addColorStop(1, "#1c1917");
    } else if (this.lightMode === "night") {
      g.addColorStop(0, "#030617");
      g.addColorStop(0.5, "#0b1329");
      g.addColorStop(0.85, "#181410");
      g.addColorStop(1, "#12100e");

      // Étoiles de la nuit sahélienne
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (let i = 0; i < 45; i++) {
        const sx = ((i * 79 + this.time * 1.5) % this.width);
        const sy = (i * 37) % (this.height * 0.45);
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, i % 3 === 0 ? 1.5 : 0.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } else if (this.lightMode === "dawn") {
      g.addColorStop(0, "#2a0845");
      g.addColorStop(0.4, "#641349");
      g.addColorStop(0.75, "#c2410c");
      g.addColorStop(1, "#1c1917");
    } else {
      g.addColorStop(0, "#0369a1");
      g.addColorStop(0.4, "#38bdf8");
      g.addColorStop(0.8, "#fed7aa");
      g.addColorStop(1, "#292524");
    }

    this.ctx.fillStyle = g;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawTopographicTerrain() {
    const rows = this.reliefMesh.length - 1;
    const cols = this.reliefMesh[0].length - 1;
    const cells = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p0 = this.reliefMesh[r][c];
        const p1 = this.reliefMesh[r][c + 1];
        const p2 = this.reliefMesh[r + 1][c + 1];
        const p3 = this.reliefMesh[r + 1][c];

        if (p0.inside || p1.inside || p2.inside || p3.inside) {
          const avgZ = (p0.z + p1.z + p2.z + p3.z) / 4;
          const avgX = (p0.x + p1.x + p2.x + p3.x) / 4;
          const depth = avgX * Math.sin(this.yaw) + avgZ * Math.cos(this.yaw);
          cells.push({
            p0, p1, p2, p3, depth,
            avgElev: (p0.elev + p1.elev + p2.elev + p3.elev) / 4,
            biome: p0.biome
          });
        }
      }
    }

    cells.sort((a, b) => b.depth - a.depth);

    for (const cell of cells) {
      const proj0 = this.project(cell.p0);
      const proj1 = this.project(cell.p1);
      const proj2 = this.project(cell.p2);
      const proj3 = this.project(cell.p3);

      this.ctx.beginPath();
      this.ctx.moveTo(proj0.x, proj0.y);
      this.ctx.lineTo(proj1.x, proj1.y);
      this.ctx.lineTo(proj2.x, proj2.y);
      this.ctx.lineTo(proj3.x, proj3.y);
      this.ctx.closePath();

      // Teinte selon le biome réel du Burkina Faso
      const elevNorm = Math.min(1, cell.avgElev / 45);

      if (cell.biome === "sahel") {
        // Sables dorés d'Oursi / Liptako
        if (this.lightMode === "night") {
          this.ctx.fillStyle = `rgb(${45 + elevNorm * 20}, ${35 + elevNorm * 15}, ${20})`;
        } else if (this.lightMode === "sunset") {
          this.ctx.fillStyle = `rgb(${215 + elevNorm * 35}, ${145 + elevNorm * 40}, ${30 + elevNorm * 20})`;
        } else {
          this.ctx.fillStyle = `rgb(${230 + elevNorm * 25}, ${180 + elevNorm * 35}, ${60 + elevNorm * 20})`;
        }
      } else if (cell.biome === "cascades") {
        // Falaises verdoyantes et dômes de Banfora / Comoé
        if (this.lightMode === "night") {
          this.ctx.fillStyle = `rgb(18, ${32 + elevNorm * 25}, 22)`;
        } else if (this.lightMode === "sunset") {
          this.ctx.fillStyle = `rgb(${100 + elevNorm * 50}, ${80 + elevNorm * 40}, 25)`;
        } else {
          this.ctx.fillStyle = `rgb(${34 + elevNorm * 40}, ${110 + elevNorm * 55}, ${50 + elevNorm * 25})`;
        }
      } else {
        // Plateau Mossi latéritique rougeoyant (Ocre / Terre Cuite)
        if (this.lightMode === "night") {
          this.ctx.fillStyle = `rgb(${38 + elevNorm * 25}, ${22 + elevNorm * 12}, 16)`;
        } else if (this.lightMode === "sunset") {
          this.ctx.fillStyle = `rgb(${160 + elevNorm * 65}, ${55 + elevNorm * 35}, ${20 + elevNorm * 15})`;
        } else {
          this.ctx.fillStyle = `rgb(${185 + elevNorm * 45}, ${85 + elevNorm * 30}, ${38 + elevNorm * 20})`;
        }
      }

      this.ctx.fill();

      // Arêtes du maillage subtiles
      this.ctx.strokeStyle = this.lightMode === "night" ? "rgba(255, 200, 100, 0.05)" : "rgba(0, 0, 0, 0.15)";
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
    }
  }

  drawRivers() {
    this.ctx.lineWidth = 2.5;
    this.ctx.strokeStyle = this.lightMode === "night" ? "rgba(56, 189, 248, 0.85)" : "rgba(14, 165, 233, 0.9)";

    for (const river of this.rivers) {
      this.ctx.beginPath();
      for (let i = 0; i < river.length; i++) {
        const proj = this.project(river[i]);
        if (i === 0) this.ctx.moveTo(proj.x, proj.y);
        else this.ctx.lineTo(proj.x, proj.y);
      }
      this.ctx.stroke();
    }
  }

  drawCulturalLandmarks() {
    for (const lm of this.landmarks) {
      const pBase = { x: lm.coords[0] * 270, y: -lm.height, z: lm.coords[1] * 215 };
      const pTop = { x: lm.coords[0] * 270, y: -(lm.height + 35), z: lm.coords[1] * 215 };

      const projBase = this.project(pBase);
      const projTop = this.project(pTop);

      // Pilier lumineux vertical
      this.ctx.beginPath();
      this.ctx.moveTo(projBase.x, projBase.y);
      this.ctx.lineTo(projTop.x, projTop.y);
      this.ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();

      // Anneau au sol
      this.ctx.beginPath();
      this.ctx.ellipse(projBase.x, projBase.y, 8 * projBase.scale, 4 * projBase.scale, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
      this.ctx.stroke();

      // Insigne flottant du haut lieu
      const radius = 9 * projTop.scale;
      this.ctx.beginPath();
      this.ctx.arc(projTop.x, projTop.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = lm.type === "unesco" ? "#10b981" : (lm.type === "capital" ? "#e11d48" : "#f59e0b");
      this.ctx.fill();
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Étiquette du nom
      this.ctx.font = `bold ${Math.max(10, Math.round(11 * projTop.scale))}px Plus Jakarta Sans, sans-serif`;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.textAlign = "center";
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      this.ctx.shadowBlur = 4;
      this.ctx.fillText(lm.name.split(" ")[0], projTop.x, projTop.y - radius - 3);
      this.ctx.shadowBlur = 0;
    }
  }

  bindEvents() {
    const canvas = this.canvas;
    if (!canvas) return;

    // Déplacement orbital à la souris
    canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMousePos.x;
        const dy = e.clientY - this.lastMousePos.y;
        this.yaw += dx * 0.008;
        this.pitch = Math.max(0.3, Math.min(1.3, this.pitch + dy * 0.008));
        this.lastMousePos = { x: e.clientX, y: e.clientY };
      }

      this.checkLandmarkHover(e);
    });

    // Zoom molette
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.zoom = Math.max(0.7, Math.min(1.8, this.zoom - e.deltaY * 0.0012));
    }, { passive: false });

    // Bascule des ambiances lumineuses
    const lightBtns = this.container.querySelectorAll(".btn-light-3d");
    lightBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        lightBtns.forEach(b => {
          b.classList.remove("active", "bg-amber-500/20", "text-amber-300");
          b.classList.add("text-stone-300");
        });
        btn.classList.add("active", "bg-amber-500/20", "text-amber-300");
        btn.classList.remove("text-stone-300");
        this.lightMode = btn.getAttribute("data-mode");
      });
    });

    // Bascule rotation automatique
    const rotBtn = this.container.querySelector("#btn-3d-autorotate");
    if (rotBtn) {
      rotBtn.addEventListener("click", () => {
        this.autoRotate = !this.autoRotate;
        rotBtn.classList.toggle("bg-amber-500/20", this.autoRotate);
        rotBtn.classList.toggle("text-amber-300", this.autoRotate);
      });
    }

    // Clic pour ouvrir la région associée
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const lm of this.landmarks) {
        const pTop = { x: lm.coords[0] * 270, y: -(lm.height + 35), z: lm.coords[1] * 215 };
        const proj = this.project(pTop);
        const dist = Math.hypot(mx - proj.x, my - proj.y);
        if (dist < 18) {
          if (window.fasoRouter) {
            window.fasoRouter.navigateTo("regions", lm.regionId);
          }
          break;
        }
      }
    });
  }

  checkLandmarkHover(e) {
    const canvas = this.canvas;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const tooltip = this.container.querySelector("#tooltip-3d-landmark");

    let found = null;
    for (const lm of this.landmarks) {
      const pTop = { x: lm.coords[0] * 270, y: -(lm.height + 35), z: lm.coords[1] * 215 };
      const proj = this.project(pTop);
      const dist = Math.hypot(mx - proj.x, my - proj.y);
      if (dist < 18) {
        found = { lm, x: proj.x, y: proj.y };
        break;
      }
    }

    if (found && tooltip) {
      const { lm, x, y } = found;
      this.container.querySelector("#tooltip-3d-title").textContent = lm.name;
      this.container.querySelector("#tooltip-3d-region").textContent = `Région : ${lm.region} • Chef-lieu : ${lm.capital}`;
      this.container.querySelector("#tooltip-3d-desc").textContent = lm.desc;

      tooltip.style.left = `${Math.min(this.width - 240, x + 15)}px`;
      tooltip.style.top = `${Math.max(15, y - 40)}px`;
      tooltip.classList.remove("hidden");
      canvas.style.cursor = "pointer";
    } else if (tooltip) {
      tooltip.classList.add("hidden");
      canvas.style.cursor = this.isDragging ? "grabbing" : "grab";
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

window.Faso17Map3D = Faso17Map3D;
