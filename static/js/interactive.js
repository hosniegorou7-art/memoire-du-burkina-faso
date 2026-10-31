/**
 * FASO INTERACTIVE STORY ENGINE - MODE "L'ARBRE À PALABRES"
 * Récit à choix multiples interactif inspiré des veillées traditionnelles.
 * L'utilisateur façonne le destin de l'héroïne et débloque des titres ancestraux.
 */

class FasoInteractiveEngine {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.currentNodeId = "depart";
    this.adventure = FASO_INTERACTIVE_ADVENTURE;
    this.history = [];
    this.onClose = options.onClose || null;
  }

  start() {
    this.currentNodeId = this.adventure.startNode;
    this.history = [this.currentNodeId];
    this.render();
  }

  close() {
    if (this.container) {
      this.container.classList.add("hidden");
    }
    if (this.onClose) this.onClose();
  }

  goToNode(nodeId) {
    this.currentNodeId = nodeId;
    this.history.push(nodeId);
    this.render();
  }

  render() {
    if (!this.container) return;
    const node = this.adventure.nodes[this.currentNodeId];
    if (!node) return;

    this.container.classList.remove("hidden");
    this.container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
        <div class="relative w-full max-w-3xl flex flex-col bg-stone-900 border border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden animate-fade-in text-stone-100">

          <!-- En-tête de l'aventure -->
          <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-amber-900/50">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">🌳</span>
              <div>
                <h3 class="text-sm font-bold text-amber-200">${this.adventure.title}</h3>
                <p class="text-[11px] text-amber-400/80">Sous l'Arbre à Palabres • Étape ${this.history.length}</p>
              </div>
            </div>
            <button id="btn-close-interactive" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-all text-base font-bold">
              ✕
            </button>
          </div>

          <!-- Corps du récit interactif -->
          <div class="p-6 md:p-8 space-y-6">

            <!-- Cadre de l'arbre à palabres avec illustration baobab stylisée -->
            <div class="relative p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 shadow-inner">
              <div class="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
                <span>🔥</span> <span>La Parole du Griot au Crépuscule</span>
              </div>
              <p class="text-base sm:text-lg font-serif text-stone-100 leading-relaxed">
                ${node.text}
              </p>
            </div>

            <!-- Si fin de parcours : Déblocage du titre et badge -->
            ${node.isEnding ? `
              <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400/60 text-center space-y-3 animate-pulse">
                <div class="text-3xl">🏆</div>
                <div class="text-xs uppercase tracking-widest text-amber-300 font-bold">Destinée Accomplie</div>
                <div class="text-xl font-extrabold text-amber-100">${node.badge}</div>
                <p class="text-xs text-stone-300 max-w-md mx-auto">
                  Par vos choix, vous avez perpétué la mémoire ancestrale du Faso.
                </p>
                <div class="pt-2">
                  <button id="btn-restart-adventure" class="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold text-xs shadow-lg hover:scale-105 transition-all">
                    🔄 Explorer un autre chemin
                  </button>
                </div>
              </div>
            ` : `
              <!-- Liste des Choix offerts au joueur -->
              <div class="space-y-3">
                <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">Que décidez-vous, noble princesse ?</div>
                ${node.choices.map((c, i) => `
                  <button class="choice-btn w-full text-left p-4 rounded-xl bg-stone-950/60 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/60 transition-all duration-200 flex items-start gap-3 group" data-target="${c.target}">
                    <span class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                      ${i + 1}
                    </span>
                    <span class="text-sm text-stone-200 group-hover:text-amber-100 font-medium leading-relaxed">
                      ${c.text}
                    </span>
                  </button>
                `).join("")}
              </div>
            `}

            <!-- Proverbe inspirant au bas du palabre -->
            <div class="text-center pt-2 text-xs italic text-amber-400/70">
              "L'oiseau qui vole haut sait que la terre sous lui a été façonnée par les pas des ancêtres."
            </div>

          </div>

          <!-- Pied de modal -->
          <div class="px-6 py-3 bg-stone-950 border-t border-amber-900/40 flex items-center justify-between text-xs text-stone-400">
            <div>Mode interactif • Faso Oralia</div>
            <button id="btn-interactive-close-bottom" class="hover:text-amber-300 transition-colors">Quitter le palabre</button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.container.querySelector("#btn-close-interactive");
    const bottomCloseBtn = this.container.querySelector("#btn-interactive-close-bottom");
    const restartBtn = this.container.querySelector("#btn-restart-adventure");
    const choiceBtns = this.container.querySelectorAll(".choice-btn");

    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (bottomCloseBtn) bottomCloseBtn.addEventListener("click", () => this.close());
    if (restartBtn) restartBtn.addEventListener("click", () => this.start());

    choiceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        this.goToNode(target);
      });
    });
  }
}

window.FasoInteractiveEngine = FasoInteractiveEngine;
