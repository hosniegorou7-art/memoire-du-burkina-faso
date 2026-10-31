/**
 * FASO 3D MAP ENGINE - VUE ISOMÉTRIQUE & RELIEF 3D IMMERSIF DU BURKINA FASO
 * Rendu Canvas 3D temps réel avec projection perspective, balises lumineuses verticales,
 * relief géographique sahélien, cycle d'éclairage atmosphérique et orbite interactive 360°.
 */

class Faso3DMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;

    // Angles de vue et caméra 3D
    this.yaw = 0.35; // Rotation horizontale
    this.pitch = 0.75; // Inclinaison verticale
    this.zoom = 1.0;
    this.autoRotate = true;
    this.isDragging = false;
    this.lastMousePos = { x: 0, y: 0 };
    this.lightMode = "sunset"; // "dawn", "day", "sunset", "night"
    this.time = 0;

    this.onSelectStory = options.onSelectStory || null;

    // Définition 3D du relief du Burkina Faso (Grille de sommets avec élévations réelles)
    this.terrainGrid = this.generateTerrainGrid();

    // Balises 3D des contes (coordonnées normalisées -1 à +1, et hauteur)
    this.beacons = [
      { id: "yennenga", x: 0.05, z: 0.05, height: 45, label: "Princesse Yennenga", icon: "👑", color: "#f59e0b" },
      { id: "dafra", x: -0.55, z: 0.35, height: 60, label: "Silures de Dafra", icon: "🐟", color: "#38bdf8" },
      { id: "guimbi-ouattara", x: -0.50, z: 0.40, height: 50, label: "Guimbi Ouattara", icon: "🛡️", color: "#fbbf24" },
      { id: "sabou", x: -0.15, z: 0.12, height: 40, label: "Crocodiles de Sabou", icon: "🐊", color: "#34d399" },
      { id: "lievre-hyene", x: -0.38, z: -0.08, height: 35, label: "Lièvre et Hyène", icon: "🐇", color: "#fb923c" },
      { id: "loropeni", x: -0.32, z: 0.65, height: 55, label: "Ruines de Loropéni", icon: "🏛️", color: "#c084fc" },
      { id: "berger-sahel", x: 0.55, z: -0.55, height: 30, label: "Berger Peul & Sahel", icon: "⭐", color: "#facc15" },
      { id: "tiebele", x: 0.15, z: 0.38, height: 48, label: "Murs de Tiébélé", icon: "🎨", color: "#f87171" }
    ];

    this.hoveredBeacon = null;

    this.init();
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
      <div class="relative w-full h-full flex flex-col items-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-stone-950 via-amber-950/20 to-stone-950 border border-amber-900/40 shadow-2xl p-4">
        <!-- Barre d'outils et commandes 3D -->
        <div class="w-full flex flex-wrap items-center justify-between gap-3 mb-2 z-10">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              🌍
            </span>
            <div>
              <h3 class="text-sm font-bold text-amber-200">Perspective 3D Immersive & Relief</h3>
              <p class="text-xs text-amber-400/70">Orbite 360° • Balises lumineuses • Atmosphère sahélienne</p>
            </div>
          </div>

          <!-- Contrôles d'éclairage et rotation -->
          <div class="flex items-center gap-2 text-xs">
            <button id="btn-toggle-rotate" class="px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 transition-all flex items-center gap-1">
              <span>🔄</span> <span id="rotate-label">Pause Auto</span>
            </button>

            <!-- Sélecteur d'ambiance lumineuse -->
            <div class="flex items-center bg-stone-900/80 rounded-lg p-0.5 border border-stone-700">
              <button class="light-btn px-2 py-1 rounded text-xs transition-all hover:text-amber-200" data-mode="dawn" title="Aube Sahélienne">🌅 Aube</button>
              <button class="light-btn px-2 py-1 rounded text-xs transition-all hover:text-amber-200" data-mode="day" title="Plein Jour">☀️ Jour</button>
              <button class="light-btn active px-2 py-1 rounded text-xs transition-all bg-amber-500/30 text-amber-200" data-mode="sunset" title="Coucher de Soleil Doré">🌇 Crépuscule</button>
              <button class="light-btn px-2 py-1 rounded text-xs transition-all hover:text-amber-200" data-mode="night" title="Nuit Étoilée au Baobab">🌌 Nuit</button>
            </div>
          </div>
        </div>

        <!-- Zone du Canvas 3D -->
        <div class="relative w-full flex-1 flex items-center justify-center min-h-[380px] max-h-[620px] cursor-grab active:cursor-grabbing">
          <canvas id="faso-3d-canvas" class="w-full h-full rounded-xl"></canvas>

          <!-- Infobulle dynamique sur la balise 3D survolée -->
          <div id="beacon-tooltip" class="absolute pointer-events-none opacity-0 transition-opacity duration-200 bg-stone-900/95 border border-amber-500/60 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs text-stone-200 z-30 max-w-xs">
          </div>
        </div>

        <!-- Aide de navigation en bas -->
        <div class="w-full flex items-center justify-between text-[11px] text-amber-400/80 mt-2 pt-2 border-t border-amber-900/30">
          <span>🖐️ Glissez avec la souris pour pivoter • Molette pour zoomer</span>
          <span class="italic text-amber-500">✨ Cliquez sur une balise pour ouvrir le récit</span>
        </div>
      </div>
    `;
  }

  initCanvas() {
    this.canvas = this.container.querySelector("#faso-3d-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  generateTerrainGrid() {
    // Génère un maillage 3D représentant la forme générale du Burkina Faso
    const cols = 22;
    const rows = 18;
    const grid = [];

    for (let r = 0; r <= rows; r++) {
      grid[r] = [];
      const zNorm = (r / rows - 0.5) * 2; // -1 à +1 (Nord au Sud)
      for (let c = 0; c <= cols; c++) {
        const xNorm = (c / cols - 0.5) * 2; // -1 à +1 (Ouest à Est)

        // Masque de forme pour le Burkina Faso (approximatif)
        const insideFaso = this.isInsideFasoContour(xNorm, zNorm);

        let elevation = 0;
        if (insideFaso) {
          // Relief des Cascades & Sud-Ouest (Sud-Ouest surélevé)
          const swElevation = Math.max(0, (-xNorm * 0.5 + zNorm * 0.7)) * 28;
          // Plateau central ondulé
          const plateauElevation = Math.sin(xNorm * 4) * Math.cos(zNorm * 3) * 6 + 12;
          // Collines et dunes du Sahel
          const sahelDunes = zNorm < -0.3 ? Math.sin(xNorm * 9) * 8 + 8 : 0;
          elevation = Math.max(4, swElevation + plateauElevation + sahelDunes);
        }

        grid[r][c] = {
          x: xNorm * 260,
          y: -elevation,
          z: zNorm * 210,
          inside: insideFaso,
          elevation: elevation
        };
      }
    }
    return grid;
  }

  isInsideFasoContour(x, z) {
    // Polygone approximatif du territoire burkinabè normalisé
    // x: Ouest (-1) à Est (+1) ; z: Nord (-1) à Sud (+1)
    if (z < -0.85 || z > 0.85) return false;
    if (x < -0.85 || x > 0.85) return false;
    // Forme en biseau au Nord-Est et Sud-Ouest
    if (x > 0.4 && z > 0.4) return false; // Bénin/Togo
    if (x < -0.6 && z < -0.3) return false; // Mali nord-ouest
    if (x > 0.7 && z < -0.4) return false; // Niger
    return true;
  }

  // Projection 3D vers 2D
  project(point) {
    // Rotation autour de l'axe Y (yaw)
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.x * sinY + point.z * cosY;

    // Rotation autour de l'axe X (pitch)
    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const y2 = point.y * cosP - z1 * sinP;
    const z2 = point.y * sinP + z1 * cosP;

    // Projection perspective
    const fov = 480 * this.zoom;
    const distance = 420;
    const scale = fov / (distance + z2);

    return {
      x: this.width / 2 + x1 * scale,
      y: this.height / 2 + y2 * scale + 25,
      scale: scale,
      depth: z2
    };
  }

  startLoop() {
    const loop = () => {
      this.time += 0.02;
      if (this.autoRotate && !this.isDragging) {
        this.yaw += 0.003;
      }
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  draw() {
    if (!this.ctx || !this.width) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Ciel et fond d'ambiance atmosphérique
    this.drawSkyAtmosphere();

    // 2. Grille de terrain 3D (Polygones de terre et dégradés sahéliens)
    this.drawTerrain();

    // 3. Balises 3D des récits (Piliers de lumière et orbes flottants)
    this.drawBeacons();
  }

  drawSkyAtmosphere() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    if (this.lightMode === "sunset") {
      grad.addColorStop(0, "#1c0a00");
      grad.addColorStop(0.4, "#451a03");
      grad.addColorStop(0.7, "#9a3412");
      grad.addColorStop(1, "#1c1917");
    } else if (this.lightMode === "night") {
      grad.addColorStop(0, "#050714");
      grad.addColorStop(0.5, "#0b1329");
      grad.addColorStop(1, "#17120e");

      // Étoiles scintillantes
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      for (let i = 0; i < 35; i++) {
        const sx = ((i * 89 + this.time * 2) % this.width);
        const sy = (i * 37) % (this.height * 0.5);
        const sr = (i % 3 === 0) ? 1.5 : 0.8;
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } else if (this.lightMode === "dawn") {
      grad.addColorStop(0, "#2e1065");
      grad.addColorStop(0.4, "#831843");
      grad.addColorStop(0.7, "#ea580c");
      grad.addColorStop(1, "#1c1917");
    } else {
      // Plein Jour
      grad.addColorStop(0, "#0284c7");
      grad.addColorStop(0.4, "#38bdf8");
      grad.addColorStop(0.8, "#fdba74");
      grad.addColorStop(1, "#292524");
    }

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawTerrain() {
    const rows = this.terrainGrid.length - 1;
    const cols = this.terrainGrid[0].length - 1;

    // Palette selon le mode de lumière
    let baseColor = "#78350f";
    let gridStroke = "rgba(245, 158, 11, 0.15)";
    if (this.lightMode === "night") {
      baseColor = "#261a12";
      gridStroke = "rgba(180, 83, 9, 0.12)";
    } else if (this.lightMode === "day") {
      baseColor = "#b45309";
      gridStroke = "rgba(254, 240, 138, 0.2)";
    }

    // Tri des cellules pour le tracé de l'arrière vers l'avant (Painter's algorithm)
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p0 = this.terrainGrid[r][c];
        const p1 = this.terrainGrid[r][c + 1];
        const p2 = this.terrainGrid[r + 1][c + 1];
        const p3 = this.terrainGrid[r + 1][c];

        if (p0.inside || p1.inside || p2.inside || p3.inside) {
          const avgZ = (p0.z + p1.z + p2.z + p3.z) / 4;
          const avgX = (p0.x + p1.x + p2.x + p3.x) / 4;
          // Profondeur après rotation
          const depth = avgX * Math.sin(this.yaw) + avgZ * Math.cos(this.yaw);
          cells.push({ p0, p1, p2, p3, depth, avgElevation: (p0.elevation + p1.elevation + p2.elevation + p3.elevation) / 4 });
        }
      }
    }

    cells.sort((a, b) => b.depth - a.depth);

    // Dessin des faces du relief
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

      // Nuance de couleur selon l'élévation et la lumière
      const elevRatio = Math.min(1, cell.avgElevation / 35);
      this.ctx.fillStyle = this.getTerrainColor(elevRatio);
      this.ctx.fill();

      this.ctx.strokeStyle = gridStroke;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();
    }
  }

  getTerrainColor(ratio) {
    if (this.lightMode === "night") {
      const r = Math.floor(30 + ratio * 35);
      const g = Math.floor(20 + ratio * 20);
      const b = Math.floor(18 + ratio * 15);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (this.lightMode === "sunset") {
      const r = Math.floor(120 + ratio * 85);
      const g = Math.floor(45 + ratio * 35);
      const b = Math.floor(15 + ratio * 20);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const r = Math.floor(160 + ratio * 60);
      const g = Math.floor(95 + ratio * 45);
      const b = Math.floor(35 + ratio * 25);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  drawBeacons() {
    // Calcul de la projection et tri des balises par profondeur
    const projectedBeacons = this.beacons.map(b => {
      const basePoint = {
        x: b.x * 240,
        y: -18,
        z: b.z * 190
      };
      const topPoint = {
        x: b.x * 240,
        y: -18 - b.height - Math.sin(this.time * 2 + b.x * 10) * 5,
        z: b.z * 190
      };

      const projBase = this.project(basePoint);
      const projTop = this.project(topPoint);

      return {
        beacon: b,
        base: projBase,
        top: projTop,
        depth: projTop.depth
      };
    });

    // Tri de l'arrière vers l'avant
    projectedBeacons.sort((a, b) => b.depth - a.depth);

    for (const item of projectedBeacons) {
      const b = item.beacon;
      const base = item.base;
      const top = item.top;

      // 1. Cercle d'onde au sol
      const ringRadius = (16 + Math.sin(this.time * 3 + b.z) * 5) * base.scale;
      this.ctx.beginPath();
      this.ctx.ellipse(base.x, base.y, ringRadius, ringRadius * 0.45, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = b.color + "99";
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // 2. Faisceau lumineux vertical
      const beamGrad = this.ctx.createLinearGradient(base.x, base.y, top.x, top.y);
      beamGrad.addColorStop(0, b.color + "11");
      beamGrad.addColorStop(0.6, b.color + "aa");
      beamGrad.addColorStop(1, "#ffffff");

      this.ctx.beginPath();
      this.ctx.moveTo(base.x - 3 * base.scale, base.y);
      this.ctx.lineTo(top.x - 1, top.y);
      this.ctx.lineTo(top.x + 1, top.y);
      this.ctx.lineTo(base.x + 3 * base.scale, base.y);
      this.ctx.fillStyle = beamGrad;
      this.ctx.fill();

      // 3. Orbe lumineux flottant au sommet
      const isHovered = this.hoveredBeacon === b.id;
      const orbRadius = (isHovered ? 13 : 9) * top.scale;

      // Halo externe
      const glowGrad = this.ctx.createRadialGradient(top.x, top.y, 1, top.x, top.y, orbRadius * 2.2);
      glowGrad.addColorStop(0, b.color + "ff");
      glowGrad.addColorStop(0.5, b.color + "66");
      glowGrad.addColorStop(1, b.color + "00");

      this.ctx.beginPath();
      this.ctx.arc(top.x, top.y, orbRadius * 2.2, 0, Math.PI * 2);
      this.ctx.fillStyle = glowGrad;
      this.ctx.fill();

      // Cœur de l'orbe
      this.ctx.beginPath();
      this.ctx.arc(top.x, top.y, orbRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered ? "#ffffff" : b.color;
      this.ctx.fill();
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Icône
      this.ctx.font = `${Math.floor(11 * top.scale)}px sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(b.icon, top.x, top.y);

      // Label au-dessus
      this.ctx.font = `bold ${Math.max(9, Math.floor(10 * top.scale))}px sans-serif`;
      this.ctx.fillStyle = "#fef3c7";
      this.ctx.shadowColor = "rgba(0,0,0,0.9)";
      this.ctx.shadowBlur = 4;
      this.ctx.fillText(b.label, top.x, top.y - orbRadius - 6);
      this.ctx.shadowBlur = 0;

      // Stocker les coordonnées d'écran pour la détection de clic
      b.screenX = top.x;
      b.screenY = top.y;
      b.screenRadius = orbRadius * 1.5;
    }
  }

  bindEvents() {
    const canvas = this.canvas;
    const tooltip = this.container.querySelector("#beacon-tooltip");
    const rotateBtn = this.container.querySelector("#btn-toggle-rotate");
    const rotateLabel = this.container.querySelector("#rotate-label");
    const lightBtns = this.container.querySelectorAll(".light-btn");

    // Bouton pause/reprise de la rotation
    rotateBtn.addEventListener("click", () => {
      this.autoRotate = !this.autoRotate;
      rotateLabel.textContent = this.autoRotate ? "Pause Auto" : "Reprendre";
      rotateBtn.classList.toggle("bg-amber-500/20", this.autoRotate);
    });

    // Boutons de changement d'atmosphère
    lightBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        lightBtns.forEach(b => {
          b.classList.remove("active", "bg-amber-500/30", "text-amber-200");
        });
        btn.classList.add("active", "bg-amber-500/30", "text-amber-200");
        this.lightMode = btn.getAttribute("data-mode");
      });
    });

    // Événements souris pour orbite 3D
    canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.lastMousePos.x;
        const dy = e.clientY - this.lastMousePos.y;
        this.yaw += dx * 0.008;
        this.pitch = Math.max(0.2, Math.min(1.3, this.pitch + dy * 0.008));
        this.lastMousePos = { x: e.clientX, y: e.clientY };
      } else {
        // Détection de survol d'une balise 3D
        let found = null;
        for (const b of this.beacons) {
          if (b.screenX !== undefined) {
            const dist = Math.hypot(mouseX - b.screenX, mouseY - b.screenY);
            if (dist < (b.screenRadius || 15)) {
              found = b;
              break;
            }
          }
        }

        if (found) {
          this.hoveredBeacon = found.id;
          const story = FASO_STORIES.find(s => s.id === found.id);
          if (story) {
            tooltip.innerHTML = `
              <div class="font-bold text-amber-400 text-sm mb-1">${story.title}</div>
              <div class="text-[10px] text-amber-300/80 mb-1">${story.regionName} • ${story.category}</div>
              <div class="text-stone-300 line-clamp-2 leading-relaxed mb-2">${story.synopsis}</div>
              <div class="text-[10px] text-amber-500 font-semibold pt-1 border-t border-amber-900/40">
                ▶ Cliquez pour ouvrir le conte immersif
              </div>
            `;
            tooltip.style.opacity = "1";
            tooltip.style.left = `${Math.min(mouseX + 15, rect.width - 240)}px`;
            tooltip.style.top = `${Math.max(10, Math.min(mouseY + 15, rect.height - 140))}px`;
          }
        } else {
          this.hoveredBeacon = null;
          tooltip.style.opacity = "0";
        }
      }
    });

    // Clic sur une balise 3D
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const b of this.beacons) {
        if (b.screenX !== undefined) {
          const dist = Math.hypot(mouseX - b.screenX, mouseY - b.screenY);
          if (dist < (b.screenRadius || 18)) {
            const story = FASO_STORIES.find(s => s.id === b.id);
            if (this.onSelectStory && story) {
              this.onSelectStory(story);
            }
            break;
          }
        }
      }
    });

    // Molette pour zoomer
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      this.zoom = Math.max(0.65, Math.min(1.8, this.zoom * zoomFactor));
    }, { passive: false });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

window.Faso3DMap = Faso3DMap;
