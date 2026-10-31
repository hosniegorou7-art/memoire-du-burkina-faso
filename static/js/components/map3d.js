/**
 * MÉMOIRE DU BURKINA — MOTEUR 3D ISOMÉTRIQUE TEMPS RÉEL (17 RÉGIONS)
 * Relief topographique immersif, balises lumineuses géolocalisées,
 * cycle d'éclairage atmosphérique à 4 ambiances et navigation orbitale 360°.
 */

class Faso17Map3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;

    this.yaw = 0.45;
    this.pitch = 0.72;
    this.zoom = 1.0;
    this.autoRotate = true;
    this.isDragging = false;
    this.lastMousePos = { x: 0, y: 0 };
    this.lightMode = "sunset"; // "dawn", "day", "sunset", "night"
    this.time = 0;

    this.regions = window.FASO_17_REGIONS || [];
    this.beacons = this.generate17Beacons();
    this.terrainGrid = this.generateReliefGrid();
    this.hoveredBeacon = null;

    this.init();
  }

  generate17Beacons() {
    return this.regions.map(r => {
      // Coordonnées normalisées (-1 à +1)
      const xNorm = (r.svgCenter[0] / 500) - 1;
      const zNorm = (r.svgCenter[1] / 350) - 1;
      
      // Élévation topographique selon le relief réel
      let h = 35;
      if (["djoro", "tannounyan"].includes(r.id)) h = 60; // Falaises Banfora et monts Lobi
      else if (["liptako", "soum"].includes(r.id)) h = 28; // Plaines sahéliennes
      else if (["bankui", "sourou"].includes(r.id)) h = 32; // Bassin alluvionnaire

      return {
        id: r.id,
        name: r.name,
        capital: r.capital,
        x: xNorm,
        z: zNorm,
        height: h,
        color: r.color || "#f59e0b",
        storiesCount: r.storiesCount || 1
      };
    });
  }

  generateReliefGrid() {
    const cols = 24;
    const rows = 20;
    const grid = [];

    for (let r = 0; r <= rows; r++) {
      grid[r] = [];
      const zNorm = (r / rows - 0.5) * 2;
      for (let c = 0; c <= cols; c++) {
        const xNorm = (c / cols - 0.5) * 2;
        const inside = this.isInsideFasoBoundary(xNorm, zNorm);

        let elevation = 0;
        if (inside) {
          // Surélévation du Sud-Ouest (Djôrô, Tannounyan)
          const swRelief = Math.max(0, (-xNorm * 0.6 + zNorm * 0.8)) * 32;
          // Ondulations du plateau Mossi central (Kadiogo, Kuilsé, Oubri)
          const centralPlateau = Math.sin(xNorm * 3.5) * Math.cos(zNorm * 3) * 7 + 10;
          // Ondulations douces des dunes du Sahel (Soum, Liptako)
          const sahelDunes = zNorm < -0.35 ? Math.sin(xNorm * 8) * 8 + 6 : 0;
          elevation = Math.max(5, swRelief + centralPlateau + sahelDunes);
        }

        grid[r][c] = {
          x: xNorm * 270,
          y: -elevation,
          z: zNorm * 220,
          inside: inside,
          elevation: elevation
        };
      }
    }
    return grid;
  }

  isInsideFasoBoundary(x, z) {
    if (z < -0.9 || z > 0.9) return false;
    if (x < -0.9 || x > 0.9) return false;
    if (x > 0.45 && z > 0.45) return false;
    if (x < -0.65 && z < -0.3) return false;
    if (x > 0.75 && z < -0.4) return false;
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
        
        <div class="w-full flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-lg">
              🌍
            </span>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-amber-100 font-heading">
                Relief Topographique 3D des 17 Régions
              </h3>
              <p class="text-[11px] text-amber-400/70">
                Projection isométrique temps réel • Balises de récits lumineuses
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <button id="btn-3d-rotate" class="px-3 py-1 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 transition-all flex items-center gap-1.5 font-medium">
              <span>🔄</span> <span id="label-3d-rotate">Pause Auto</span>
            </button>

            <div class="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800 text-xs">
              <button class="light-mode-btn px-2 py-1 rounded hover:text-amber-300 transition-all" data-light="dawn">🌅 Aube</button>
              <button class="light-mode-btn px-2 py-1 rounded hover:text-amber-300 transition-all" data-light="day">☀️ Zénith</button>
              <button class="light-mode-btn active px-2 py-1 rounded bg-amber-500/30 text-amber-200" data-light="sunset">🌇 Crépuscule</button>
              <button class="light-mode-btn px-2 py-1 rounded hover:text-amber-300 transition-all" data-light="night">🌌 Nuit</button>
            </div>
          </div>
        </div>

        <div class="relative w-full flex-1 flex items-center justify-center min-h-[400px] max-h-[660px] cursor-grab active:cursor-grabbing">
          <canvas id="canvas-faso-17-3d" class="w-full h-full rounded-2xl"></canvas>
          <div id="tooltip-3d-beacon" class="absolute pointer-events-none opacity-0 transition-opacity duration-200 bg-stone-900/95 border border-amber-500/60 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs text-stone-200 z-30 max-w-xs"></div>
        </div>

        <div class="w-full flex items-center justify-between text-xs text-amber-400/80 mt-3 pt-3 border-t border-amber-900/30">
          <span>🖐️ Glissez la souris pour orbiter 360° • Molette pour zoomer</span>
          <span class="italic text-amber-500">✨ Cliquez sur une balise pour ouvrir la région</span>
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

    const fov = 480 * this.zoom;
    const dist = 430;
    const scale = fov / (dist + z2);

    return {
      x: this.width / 2 + x1 * scale,
      y: this.height / 2 + y2 * scale + 20,
      scale: scale,
      depth: z2
    };
  }

  startLoop() {
    const loop = () => {
      this.time += 0.02;
      if (this.autoRotate && !this.isDragging) {
        this.yaw += 0.0025;
      }
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  draw() {
    if (!this.ctx || !this.width) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Ciel & Étoiles
    this.drawSky();

    // Relief
    this.drawTerrain();

    // Balises des 17 régions
    this.draw17Beacons();
  }

  drawSky() {
    const g = this.ctx.createLinearGradient(0, 0, 0, this.height);
    if (this.lightMode === "sunset") {
      g.addColorStop(0, "#1c0a00");
      g.addColorStop(0.4, "#451a03");
      g.addColorStop(0.7, "#9a3412");
      g.addColorStop(1, "#1c1917");
    } else if (this.lightMode === "night") {
      g.addColorStop(0, "#050714");
      g.addColorStop(0.6, "#0b1329");
      g.addColorStop(1, "#17120e");

      this.ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 83 + this.time * 2) % this.width);
        const sy = (i * 41) % (this.height * 0.5);
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, i % 3 === 0 ? 1.5 : 0.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } else if (this.lightMode === "dawn") {
      g.addColorStop(0, "#2e1065");
      g.addColorStop(0.4, "#831843");
      g.addColorStop(0.7, "#ea580c");
      g.addColorStop(1, "#1c1917");
    } else {
      g.addColorStop(0, "#0284c7");
      g.addColorStop(0.4, "#38bdf8");
      g.addColorStop(0.8, "#fdba74");
      g.addColorStop(1, "#292524");
    }

    this.ctx.fillStyle = g;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawTerrain() {
    const rows = this.terrainGrid.length - 1;
    const cols = this.terrainGrid[0].length - 1;
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
          const depth = avgX * Math.sin(this.yaw) + avgZ * Math.cos(this.yaw);
          cells.push({ p0, p1, p2, p3, depth, avgElev: (p0.elevation + p1.elevation + p2.elevation + p3.elevation) / 4 });
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

      const ratio = Math.min(1, cell.avgElev / 36);
      if (this.lightMode === "night") {
        this.ctx.fillStyle = `rgb(${30 + ratio * 35}, ${20 + ratio * 20}, ${18 + ratio * 15})`;
      } else if (this.lightMode === "sunset") {
        this.ctx.fillStyle = `rgb(${120 + ratio * 85}, ${45 + ratio * 35}, ${15 + ratio * 20})`;
      } else {
        this.ctx.fillStyle = `rgb(${160 + ratio * 60}, ${95 + ratio * 45}, ${35 + ratio * 25})`;
      }
      this.ctx.fill();

      this.ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();
    }
  }

  draw17Beacons() {
    const list = this.beacons.map(b => {
      const base = { x: b.x * 250, y: -18, z: b.z * 200 };
      const top = { x: b.x * 250, y: -18 - b.height - Math.sin(this.time * 2.5 + b.x * 10) * 4, z: b.z * 200 };
      const pBase = this.project(base);
      const pTop = this.project(top);
      return { beacon: b, pBase, pTop, depth: pTop.depth };
    });

    list.sort((a, b) => b.depth - a.depth);

    for (const item of list) {
      const b = item.beacon;
      const base = item.pBase;
      const top = item.pTop;

      // Onde au sol
      const rRing = (14 + Math.sin(this.time * 3 + b.x) * 4) * base.scale;
      this.ctx.beginPath();
      this.ctx.ellipse(base.x, base.y, rRing, rRing * 0.45, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = b.color + "88";
      this.ctx.lineWidth = 1.4;
      this.ctx.stroke();

      // Faisceau lumineux
      const grad = this.ctx.createLinearGradient(base.x, base.y, top.x, top.y);
      grad.addColorStop(0, b.color + "11");
      grad.addColorStop(0.7, b.color + "99");
      grad.addColorStop(1, "#ffffff");

      this.ctx.beginPath();
      this.ctx.moveTo(base.x - 2.5 * base.scale, base.y);
      this.ctx.lineTo(top.x - 1, top.y);
      this.ctx.lineTo(top.x + 1, top.y);
      this.ctx.lineTo(base.x + 2.5 * base.scale, base.y);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Orbe
      const isHovered = this.hoveredBeacon === b.id;
      const orbR = (isHovered ? 12 : 8.5) * top.scale;

      this.ctx.beginPath();
      this.ctx.arc(top.x, top.y, orbR, 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered ? "#ffffff" : b.color;
      this.ctx.fill();
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 1.2;
      this.ctx.stroke();

      // Label au-dessus
      this.ctx.font = `bold ${Math.max(9, Math.floor(9.5 * top.scale))}px sans-serif`;
      this.ctx.fillStyle = "#fef3c7";
      this.ctx.shadowColor = "rgba(0,0,0,0.95)";
      this.ctx.shadowBlur = 4;
      this.ctx.textAlign = "center";
      this.ctx.fillText(b.name, top.x, top.y - orbR - 5);
      this.ctx.shadowBlur = 0;

      b.screenX = top.x;
      b.screenY = top.y;
      b.screenR = orbR * 1.5;
    }
  }

  bindEvents() {
    const canvas = this.canvas;
    const tooltip = this.container.querySelector("#tooltip-3d-beacon");
    const rotateBtn = this.container.querySelector("#btn-3d-rotate");
    const labelRotate = this.container.querySelector("#label-3d-rotate");
    const lightBtns = this.container.querySelectorAll(".light-mode-btn");

    rotateBtn.addEventListener("click", () => {
      this.autoRotate = !this.autoRotate;
      labelRotate.textContent = this.autoRotate ? "Pause Auto" : "Reprendre";
      rotateBtn.classList.toggle("bg-amber-500/20", this.autoRotate);
    });

    lightBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        lightBtns.forEach(b => b.classList.remove("active", "bg-amber-500/30", "text-amber-200"));
        btn.classList.add("active", "bg-amber-500/30", "text-amber-200");
        this.lightMode = btn.getAttribute("data-light");
      });
    });

    canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.lastMousePos.x;
        const dy = e.clientY - this.lastMousePos.y;
        this.yaw += dx * 0.007;
        this.pitch = Math.max(0.2, Math.min(1.3, this.pitch + dy * 0.007));
        this.lastMousePos = { x: e.clientX, y: e.clientY };
      } else {
        let found = null;
        for (const b of this.beacons) {
          if (b.screenX !== undefined) {
            const d = Math.hypot(mx - b.screenX, my - b.screenY);
            if (d < (b.screenR || 15)) {
              found = b;
              break;
            }
          }
        }

        if (found) {
          this.hoveredBeacon = found.id;
          tooltip.innerHTML = `
            <div class="font-bold text-amber-400 text-sm mb-1">Région : ${found.name}</div>
            <div class="text-[10px] text-amber-300/80 mb-1">Chef-lieu : ${found.capital}</div>
            <div class="text-[10px] text-amber-500 font-semibold pt-1 border-t border-amber-900/40">
              ▶ Cliquez pour explorer la fiche régionale
            </div>
          `;
          tooltip.style.opacity = "1";
          tooltip.style.left = `${Math.min(mx + 15, rect.width - 240)}px`;
          tooltip.style.top = `${Math.max(10, Math.min(my + 15, rect.height - 120))}px`;
        } else {
          this.hoveredBeacon = null;
          tooltip.style.opacity = "0";
        }
      }
    });

    canvas.addEventListener("click", () => {
      if (this.hoveredBeacon && window.fasoRouter) {
        window.fasoRouter.navigateTo("regions", this.hoveredBeacon);
      }
    });

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const f = e.deltaY < 0 ? 1.08 : 0.92;
      this.zoom = Math.max(0.65, Math.min(1.8, this.zoom * f));
    }, { passive: false });
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}

window.Faso17Map3D = Faso17Map3D;
