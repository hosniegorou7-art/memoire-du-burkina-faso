/**
 * MÉMOIRE DU BURKINA — MOTEUR CARTOGRAPHIQUE 3D TOPOGRAPHIQUE & IMMERSIF
 * Fidèle à la maquette sculptée 3D du Burkina Faso (Relief & Végétation, 17 Régions,
 * biomes sahéliens et savanes, balises interactives et écoute des contes des terroirs).
 */

class Faso17Map3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.currentViewMode = "relief"; // "relief" (maquette sculptée 3D) ou "orbital" (maillage 360°)
    
    // Paramètres d'inclinaison 3D gyroscopique
    this.tiltX = 8;
    this.tiltY = -4;
    this.targetTiltX = 8;
    this.targetTiltY = -4;
    this.zoomLevel = 1.0;
    this.isHovering = false;
    this.selectedRegion = null;
    this.activeFilter = "all"; // "all", "sahel", "savanna", "forest"

    // Paramètres moteur orbital canvas
    this.yaw = 0.52;
    this.pitch = 0.76;
    this.autoRotate = true;
    this.animationId = null;

    // Définition géoréférencée des 17 régions sur la maquette 3D (coordonnées en %)
    this.regionsData = [
      { id: "kadiogo", name: "Kadiogo", capital: "Ouagadougou", x: 48, y: 50, biome: "savanna", ethnic: "Mossi", storiesCount: 4, audioSample: "/static/audio/conte-en-moore.mp3", sampleTitle: "La Ruse du Lièvre au Puits" },
      { id: "oubri", name: "Oubri", capital: "Ziniaré", x: 53, y: 46, biome: "savanna", ethnic: "Mossi", storiesCount: 2, audioSample: "/static/audio/naba-oubri.mp3", sampleTitle: "Naba Oubri Fondateur" },
      { id: "kuilse", name: "Kuilsé", capital: "Kaya", x: 58, y: 39, biome: "savanna", ethnic: "Mossi", storiesCount: 2, audioSample: "/static/audio/laongo-kuilse.mp3", sampleTitle: "Granite de Laongo" },
      { id: "yaadga", name: "Yaadga", capital: "Ouahigouya", x: 40, y: 32, biome: "sahel", ethnic: "Mossi / Yaadga", storiesCount: 2, audioSample: "/static/audio/conte-moore-2.mp3", sampleTitle: "L'Orpheline et le Baobab" },
      { id: "soum", name: "Soum", capital: "Djibo", x: 48, y: 27, biome: "sahel", ethnic: "Peul / Bella", storiesCount: 2, audioSample: "/static/audio/soni-alla-waray.mp3", sampleTitle: "Soni So Alla Waray" },
      { id: "liptako", name: "Liptako", capital: "Dori", x: 65, y: 22, biome: "sahel", ethnic: "Peul / Songhaï", storiesCount: 2, audioSample: "/static/audio/berger-sahel.mp3", sampleTitle: "Berger Peul & Sahel" },
      { id: "sourou", name: "Sourou", capital: "Tougan", x: 33, y: 44, biome: "savanna", ethnic: "San (Samo)", storiesCount: 3, audioSample: "/static/audio/conte-samo.mp3", sampleTitle: "L'Arbre à Palabres San" },
      { id: "bankui", name: "Bankui", capital: "Dédougou", x: 28, y: 52, biome: "savanna", ethnic: "Bwaba / San", storiesCount: 2, audioSample: "/static/audio/souraba-le-singe.mp3", sampleTitle: "Souraba le Singe et la Tortue" },
      { id: "guiriko", name: "Guiriko", capital: "Bobo-Dioulasso", x: 22, y: 64, biome: "forest", ethnic: "Dioula / Bobo", storiesCount: 4, audioSample: "/static/audio/conte-en-dioula.mp3", sampleTitle: "Le Tisserand de Sya" },
      { id: "tannounyan", name: "Tannounyan", capital: "Banfora", x: 10, y: 70, biome: "forest", ethnic: "Sénoufo / Gouin", storiesCount: 3, audioSample: "/static/audio/conte-senoufo.mp3", sampleTitle: "La Sagesse du Caméléon" },
      { id: "djoro", name: "Djôrô", capital: "Gaoua", x: 27, y: 74, biome: "forest", ethnic: "Lobi / Dagara", storiesCount: 2, audioSample: "/static/audio/loropeni.mp3", sampleTitle: "Ruines de Loropéni" },
      { id: "nando", name: "Nando", capital: "Koudougou", x: 40, y: 55, biome: "savanna", ethnic: "Gourounsi / Lyélé", storiesCount: 2, audioSample: "/static/audio/sabou.mp3", sampleTitle: "Crocodiles de Sabou" },
      { id: "nazinon", name: "Nazinon", capital: "Manga", x: 54, y: 59, biome: "savanna", ethnic: "Kasena / Bissa", storiesCount: 2, audioSample: "/static/audio/tiebele.mp3", sampleTitle: "Cour Royale de Tiébélé" },
      { id: "nakambe", name: "Nakambé", capital: "Tenkodogo", x: 62, y: 58, biome: "savanna", ethnic: "Bissa / Mossi", storiesCount: 2, audioSample: "/static/audio/conte-bissa.mp3", sampleTitle: "Conte Authentique Bissa" },
      { id: "goulmou", name: "Goulmou", capital: "Fada N'Gourma", x: 72, y: 50, biome: "savanna", ethnic: "Gourmantché", storiesCount: 3, audioSample: "/static/audio/conte-gourmanctheba-2.mp3", sampleTitle: "Les Calebasses de Yendabri" },
      { id: "sirba", name: "Sirba", capital: "Bogandé", x: 70, y: 38, biome: "savanna", ethnic: "Gourmantché", storiesCount: 2, audioSample: "/static/audio/conte-gourmantheba-3.mp3", sampleTitle: "La Flûte et l'Harmattan" },
      { id: "tapoa", name: "Tapoa", capital: "Diapaga", x: 84, y: 53, biome: "savanna", ethnic: "Gourmantché", storiesCount: 2, audioSample: "/static/audio/conte-gourmantcheba-1.mp3", sampleTitle: "Le Dozo et le Lion du Gobnangou" }
    ];

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderDOM();
    this.bindInteractions();
  }

  renderDOM() {
    this.container.innerHTML = `
      <div class="relative w-full rounded-3xl bg-stone-950 border border-amber-900/40 shadow-2xl overflow-hidden select-none">
        
        <!-- ==================== BARRE DE CONTRÔLE SUPÉRIEURE ==================== -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md z-20 relative">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              ${window.fasoIcon('layers', 'w-5 h-5 text-stone-950')}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base sm:text-lg font-black text-amber-100 font-heading tracking-wide">
                  BURKINA FASO — RELIEF &amp; 17 RÉGIONS
                </h3>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest hidden sm:inline-block">
                  Modèle 3D Topographique
                </span>
              </div>
              <p class="text-xs text-stone-400">
                Survolez et cliquez sur les balises dorées pour écouter les contes des terroirs.
              </p>
            </div>
          </div>

          <!-- Filtres de Biomes & Commandes -->
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <div class="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800">
              <button class="filter-biome-btn px-2.5 py-1 rounded-lg font-bold text-amber-300 bg-amber-500/20 transition-all text-[11px]" data-biome="all">
                Toutes (17)
              </button>
              <button class="filter-biome-btn px-2.5 py-1 rounded-lg font-medium text-stone-300 hover:text-white transition-all text-[11px]" data-biome="sahel">
                Sahel
              </button>
              <button class="filter-biome-btn px-2.5 py-1 rounded-lg font-medium text-stone-300 hover:text-white transition-all text-[11px]" data-biome="savanna">
                Savane
              </button>
              <button class="filter-biome-btn px-2.5 py-1 rounded-lg font-medium text-stone-300 hover:text-white transition-all text-[11px]" data-biome="forest">
                Forêt/Cascades
              </button>
            </div>

            <button id="btn-reset-3d" class="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-800 transition-all text-xs font-bold flex items-center gap-1.5" title="Recentrer la carte 3D">
              ${window.fasoIcon('refresh', 'w-3.5 h-3.5')}
              <span>Recentrer</span>
            </button>
          </div>
        </div>

        <!-- ==================== SCÈNE 3D INTERACTIVE ==================== -->
        <div id="scene-3d-viewport" class="relative w-full h-[520px] sm:h-[620px] md:h-[680px] overflow-hidden flex items-center justify-center bg-stone-950 perspective-1200 cursor-grab active:cursor-grabbing">
          
          <!-- Voile atmosphérique lumineux -->
          <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.08),transparent_70%)] z-10"></div>

          <!-- Maquette 3D Pivotante -->
          <div id="maquette-3d-slab" class="relative w-full max-w-[850px] aspect-square transition-transform duration-150 ease-out transform-style-3d shadow-2xl">
            
            <!-- Rendu 3D haute fidélité sans filigrane -->
            <img
              src="/static/assets/burkina-3d-clean.jpg"
              alt="Maquette topographique 3D du Burkina Faso — Relief et végétation"
              class="w-full h-full object-contain rounded-2xl filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] pointer-events-none select-none"
            />

            <!-- ==================== BALISES 3D DES 17 RÉGIONS ==================== -->
            <div id="beacons-layer" class="absolute inset-0">
              ${this.regionsData.map(reg => `
                <div 
                  class="region-beacon-3d absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300"
                  style="left: ${reg.x}%; top: ${reg.y}%;"
                  data-region-id="${reg.id}"
                  data-biome="${reg.biome}"
                >
                  <!-- Pulsion lumineuse concentrique -->
                  <div class="relative flex items-center justify-center">
                    <span class="absolute w-8 h-8 rounded-full bg-amber-400/30 animate-ping"></span>
                    <span class="absolute w-6 h-6 rounded-full bg-amber-500/40"></span>
                    
                    <!-- Balise centrale dorée surélevée -->
                    <div class="relative w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-stone-950 shadow-lg shadow-amber-500/50 flex items-center justify-center group-hover:scale-135 transition-transform duration-200">
                      <span class="w-1.5 h-1.5 rounded-full bg-stone-950"></span>
                    </div>

                    <!-- Étiquette flottante en perspective 3D -->
                    <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all pointer-events-none whitespace-nowrap z-20">
                      <div class="bg-stone-950/90 text-amber-200 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-500/40 shadow-xl backdrop-blur-sm flex items-center gap-1 font-heading">
                        <span>${reg.name}</span>
                        <span class="text-[9px] text-amber-400/80 font-mono font-normal">(${reg.capital})</span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>

          <!-- ==================== LÉGENDE DU RELIEF INTÉGRÉE ==================== -->
          <div class="absolute bottom-4 left-4 z-20 bg-stone-950/90 backdrop-blur-md border border-amber-900/40 rounded-2xl p-3 sm:p-4 text-xs text-stone-300 max-w-xs shadow-2xl hidden sm:block">
            <div class="font-bold text-amber-100 font-heading uppercase tracking-wider text-[11px] mb-2 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Légende Topographique</span>
            </div>
            <div class="space-y-1.5 text-[11px]">
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-2.5 rounded bg-[#dfcb87] border border-amber-900/40"></span>
                <span>Sahelian Scrub (Dunes du Nord)</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-2.5 rounded bg-[#b8b355] border border-amber-900/40"></span>
                <span>Shrub Savanna (Savane arbustive)</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-2.5 rounded bg-[#698a39] border border-amber-900/40"></span>
                <span>Wooded Savanna (Savane boisée)</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-2.5 rounded bg-[#1e4d1f] border border-amber-900/40"></span>
                <span>Forest / Gallery Forest (Sud-Ouest)</span>
              </div>
            </div>
          </div>

          <!-- ==================== FICHE VOLET RÉGIONAL LATÉRAL ==================== -->
          <div id="region-flyout-card" class="hidden absolute top-4 right-4 z-30 w-80 sm:w-88 bg-stone-950/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-5 shadow-2xl text-left animate-slide-left space-y-4">
            <div class="flex items-start justify-between">
              <div>
                <span id="flyout-biome-badge" class="badge-culture text-[10px] mb-1"></span>
                <h4 id="flyout-title" class="text-xl font-black text-amber-100 font-heading"></h4>
                <div id="flyout-capital" class="text-xs text-amber-400 font-medium"></div>
              </div>
              <button id="btn-close-flyout" class="w-7 h-7 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors">
                ✕
              </button>
            </div>

            <div class="p-3.5 rounded-2xl bg-stone-900/70 border border-stone-800/80 space-y-2 text-xs">
              <div class="flex items-center justify-between text-stone-400">
                <span>Communautés :</span>
                <span id="flyout-ethnic" class="font-bold text-stone-200"></span>
              </div>
              <div class="flex items-center justify-between text-stone-400">
                <span>Récits recensés :</span>
                <span id="flyout-count" class="font-bold text-amber-400"></span>
              </div>
            </div>

            <!-- Lecteur Audio du Conte de la Région -->
            <div class="space-y-2">
              <div class="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                ${window.fasoIcon('play', 'w-3 h-3 text-amber-400')}
                <span>Écouter le conte régional</span>
              </div>
              <div class="p-3 rounded-2xl bg-amber-950/40 border border-amber-600/30 space-y-2">
                <div id="flyout-sample-title" class="text-xs font-bold text-amber-100 line-clamp-1"></div>
                <audio id="flyout-audio-player" controls class="w-full h-8 rounded-lg accent-amber-500"></audio>
              </div>
            </div>

            <!-- Boutons d'Action -->
            <div class="flex items-center gap-2 pt-1">
              <button id="btn-flyout-explore" class="flex-1 btn-primary text-xs py-2.5 justify-center flex items-center gap-1.5">
                ${window.fasoIcon('book', 'w-3.5 h-3.5')}
                <span>Fiche &amp; Récits</span>
              </button>
              <button id="btn-flyout-campfire" class="px-3 py-2.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-500/40 text-xs font-bold flex items-center gap-1" title="Écouter au coin du feu">
                ${window.fasoIcon('flame', 'w-3.5 h-3.5 text-orange-400')}
              </button>
            </div>
          </div>

          <!-- Indication interactive -->
          <div class="absolute bottom-3 right-4 z-20 text-[11px] text-stone-400 hidden md:flex items-center gap-2 bg-stone-950/70 px-3 py-1.5 rounded-xl border border-stone-800 backdrop-blur-sm">
            <span>Bougez la souris pour incliner la maquette 3D</span>
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          </div>

        </div>

      </div>
    `;
  }

  bindInteractions() {
    const viewport = this.container.querySelector("#scene-3d-viewport");
    const slab = this.container.querySelector("#maquette-3d-slab");
    if (!viewport || !slab) return;

    // Effet parallaxe 3D gyroscopique à la souris
    viewport.addEventListener("mousemove", (e) => {
      const rect = viewport.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 à +0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

      this.targetTiltY = xNorm * 18; // Rotation horizontale +/- 18 deg
      this.targetTiltX = 8 - yNorm * 16; // Inclinaison verticale
      this.applyTilt(slab);
    });

    viewport.addEventListener("mouseleave", () => {
      this.targetTiltX = 8;
      this.targetTiltY = -4;
      this.applyTilt(slab);
    });

    // Clic sur les balises de région
    const beacons = this.container.querySelectorAll(".region-beacon-3d");
    beacons.forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const regId = b.getAttribute("data-region-id");
        this.openRegionFlyout(regId);
      });
    });

    // Fermeture du volet
    const btnClose = this.container.querySelector("#btn-close-flyout");
    if (btnClose) {
      btnClose.addEventListener("click", () => this.closeFlyout());
    }

    // Réinitialisation de la vue
    const btnReset = this.container.querySelector("#btn-reset-3d");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        this.targetTiltX = 8;
        this.targetTiltY = -4;
        this.applyTilt(slab);
        this.closeFlyout();
      });
    }

    // Filtres par Biome
    const filterBtns = this.container.querySelectorAll(".filter-biome-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("bg-amber-500/20", "text-amber-300");
          b.classList.add("text-stone-300");
        });
        btn.classList.add("bg-amber-500/20", "text-amber-300");
        btn.classList.remove("text-stone-300");

        const biome = btn.getAttribute("data-biome");
        this.filterByBiome(biome);
      });
    });
  }

  applyTilt(element) {
    if (!element) return;
    element.style.transform = `perspective(1200px) rotateX(${this.targetTiltX}deg) rotateY(${this.targetTiltY}deg) scale(${this.zoomLevel})`;
  }

  openRegionFlyout(regId) {
    const reg = this.regionsData.find(r => r.id === regId);
    if (!reg) return;

    const flyout = this.container.querySelector("#region-flyout-card");
    if (!flyout) return;

    this.container.querySelector("#flyout-title").textContent = reg.name;
    this.container.querySelector("#flyout-capital").textContent = `Chef-lieu : ${reg.capital}`;
    this.container.querySelector("#flyout-ethnic").textContent = reg.ethnic;
    this.container.querySelector("#flyout-count").textContent = `${reg.storiesCount} récits oraux`;
    this.container.querySelector("#flyout-sample-title").textContent = reg.sampleTitle;
    
    const biomeBadge = this.container.querySelector("#flyout-biome-badge");
    const biomeNames = {
      sahel: "Biome Sahélien",
      savanna: "Savane Arbustive & Latérite",
      forest: "Forêts Galeries & Cascades"
    };
    biomeBadge.textContent = biomeNames[reg.biome] || "Terroir Culturel";

    const audio = this.container.querySelector("#flyout-audio-player");
    if (audio) {
      audio.src = reg.audioSample;
    }

    const btnExplore = this.container.querySelector("#btn-flyout-explore");
    if (btnExplore) {
      btnExplore.onclick = () => {
        if (window.fasoRouter) {
          window.fasoRouter.navigateTo("regions", reg.id);
        }
      };
    }

    const btnCampfire = this.container.querySelector("#btn-flyout-campfire");
    if (btnCampfire) {
      btnCampfire.onclick = () => {
        if (window.fasoRouter) {
          window.fasoRouter.navigateTo("campfire", "yennenga");
        }
      };
    }

    flyout.classList.remove("hidden");
  }

  closeFlyout() {
    const flyout = this.container.querySelector("#region-flyout-card");
    if (flyout) {
      flyout.classList.add("hidden");
      const audio = this.container.querySelector("#flyout-audio-player");
      if (audio) audio.pause();
    }
  }

  filterByBiome(biome) {
    const beacons = this.container.querySelectorAll(".region-beacon-3d");
    beacons.forEach(b => {
      const bBiome = b.getAttribute("data-biome");
      if (biome === "all" || bBiome === biome) {
        b.style.display = "block";
        b.style.opacity = "1";
      } else {
        b.style.opacity = "0.2";
      }
    });
  }

  destroy() {
    this.closeFlyout();
  }
}

window.Faso17Map3D = Faso17Map3D;
