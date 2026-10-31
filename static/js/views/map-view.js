/**
 * MÉMOIRE DU BURKINA — VUE CARTOGRAPHIQUE PRINCIPALE 2D / 3D
 * Exploration territoriale des 17 régions, bascule 2D vectorielle et 3D isométrique,
 * volet coulissant « Voyager à travers les récits » et filtres géoculturels.
 */

class FasoMapView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentMode = "2d"; // "2d" ou "3d"
    this.map2d = null;
    this.map3d = null;
  }

  render() {
    if (!this.container) return;
    const regions = window.FASO_17_REGIONS || [];

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-stone-100 space-y-6">
        
        <!-- En-tête avec bascule 2D / 3D -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/30">
          <div>
            <span class="badge-culture mb-1">Système d'Information Géographique</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
              Carte Interactive des 17 Régions
            </h1>
          </div>

          <!-- Bascule 2D Vectorielle / 3D Isométrique -->
          <div class="flex items-center bg-stone-900 rounded-2xl p-1 border border-amber-900/40 text-xs">
            <button id="btn-toggle-2d" class="px-4 py-2 rounded-xl font-bold transition-all ${this.currentMode === '2d' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'} flex items-center gap-1.5">
              <span>🗺️</span> <span>Carte 2D Vectorielle</span>
            </button>
            <button id="btn-toggle-3d" class="px-4 py-2 rounded-xl font-bold transition-all ${this.currentMode === '3d' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'} flex items-center gap-1.5">
              <span>🌍</span> <span>Relief 3D Isométrique</span>
            </button>
          </div>
        </div>

        <!-- Conteneur d'affichage de la carte active -->
        <div id="active-map-host" class="w-full min-h-[500px] md:min-h-[640px]"></div>

      </div>
    `;

    this.bindEvents();
    this.mountCurrentMap();
  }

  mountCurrentMap() {
    const host = this.container.querySelector("#active-map-host");
    if (!host) return;
    host.innerHTML = "";

    if (this.currentMode === "2d" && window.Faso17Map2D) {
      if (this.map3d) {
        this.map3d.destroy();
        this.map3d = null;
      }
      this.map2d = new window.Faso17Map2D("active-map-host", {
        onSelectRegion: (reg) => {
          if (window.fasoRouter) window.fasoRouter.navigateTo("regions", reg.id);
        }
      });
    } else if (this.currentMode === "3d" && window.Faso17Map3D) {
      this.map2d = null;
      this.map3d = new window.Faso17Map3D("active-map-host");
    }
  }

  bindEvents() {
    const btn2d = this.container.querySelector("#btn-toggle-2d");
    const btn3d = this.container.querySelector("#btn-toggle-3d");

    if (btn2d) {
      btn2d.addEventListener("click", () => {
        if (this.currentMode !== "2d") {
          this.currentMode = "2d";
          this.render();
        }
      });
    }

    if (btn3d) {
      btn3d.addEventListener("click", () => {
        if (this.currentMode !== "3d") {
          this.currentMode = "3d";
          this.render();
        }
      });
    }
  }

  unmount() {
    if (this.map3d) {
      this.map3d.destroy();
      this.map3d = null;
    }
    this.map2d = null;
  }
}

window.FasoMapView = FasoMapView;
