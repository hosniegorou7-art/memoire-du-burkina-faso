/**
 * MÉMOIRE DU BURKINA — VUE AVENTURE INTERACTIVE (RÉCIT NARRATIF RAMIFIÉ)
 * Moteur de narration arborescente à choix multiples fondé sur l'épopée de la Princesse Yennenga.
 */

class FasoAdventureView {
  constructor(hostId) {
    this.hostId = hostId;
    this.host = document.getElementById(hostId);
    this.currentNodeId = null;
    this.storyData = null;
    this.pathHistory = [];
    this.badgesEarned = [];
  }

  render(storyId = "aventure-yennenga") {
    this.host = document.getElementById(this.hostId);
    if (!this.host) return;

    if (typeof FASO_INTERACTIVE_ADVENTURE !== "undefined") {
      this.storyData = FASO_INTERACTIVE_ADVENTURE;
    } else {
      this.host.innerHTML = `
        <div class="min-h-screen flex items-center justify-center text-stone-400">
          <div class="text-center space-y-4">
            <div class="text-6xl">📜</div>
            <p>Le récit interactif n'est pas disponible pour l'instant.</p>
            <a href="#home" class="text-amber-400 hover:underline text-sm">← Retour à l'accueil</a>
          </div>
        </div>
      `;
      return;
    }

    this.currentNodeId = this.storyData.startNode;
    this.pathHistory = [];
    this.badgesEarned = [];
    this._renderShell();
    this._renderNode(this.currentNodeId);
  }

  _renderShell() {
    this.host.innerHTML = `
      <div class="min-h-screen bg-gradient-to-b from-stone-950 via-amber-950/15 to-stone-950 pb-20">

        <!-- En-tête immersif -->
        <div class="relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950/40 to-stone-900 border-b border-amber-900/40 py-12 px-4">
          <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(60deg, #E5A93C 0, #E5A93C 1px, transparent 0, transparent 50%); background-size: 24px 24px;"></div>
          <div class="absolute inset-0 pointer-events-none overflow-hidden" id="adv-particles-host"></div>

          <div class="relative max-w-3xl mx-auto text-center space-y-4">
            <div class="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase">
              ${window.fasoIcon('compass', 'w-3.5 h-3.5 text-amber-400')}
              <span>Récit Interactif &amp; Choix du Destin</span>
            </div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-50 font-heading leading-tight">
              ${this.storyData.title}
            </h1>
            <p class="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
              ${this.storyData.description}
            </p>

            <!-- Badges acquis -->
            <div id="adv-badges-container" class="flex flex-wrap items-center justify-center gap-2 min-h-[32px]"></div>

            <!-- Fil d'Ariane -->
            <div id="adv-breadcrumb" class="text-[11px] text-amber-400/80 font-mono"></div>
          </div>
        </div>

        <!-- Zone de narration principale -->
        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div id="adv-node-container" class="space-y-6">
            <!-- Nœud narratif injecté dynamiquement -->
          </div>
        </div>

      </div>
    `;

    this._spawnParticles();
  }

  _renderNode(nodeId) {
    const node = this.storyData.nodes[nodeId];
    if (!node) return;

    this.currentNodeId = nodeId;
    this.pathHistory.push(nodeId);

    const container = document.getElementById("adv-node-container");
    if (!container) return;

    if (node.isEnding && node.badge && !this.badgesEarned.includes(node.badge)) {
      this.badgesEarned.push(node.badge);
      this._updateBadges();
    }

    const breadcrumb = document.getElementById("adv-breadcrumb");
    if (breadcrumb) {
      breadcrumb.textContent = `Étape ${this.pathHistory.length} sur votre chemin initiatique`;
    }

    container.classList.add("opacity-0", "translate-y-2");
    container.style.transition = "opacity 0.25s, transform 0.25s";

    setTimeout(() => {
      const isEnding = node.isEnding;

      container.innerHTML = `
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xs font-black text-amber-400">
            ${this.pathHistory.length}
          </div>
          <div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent"></div>
          ${isEnding ? '<span class="text-amber-400 text-sm font-bold">✨ Dénouement Atteint</span>' : ""}
        </div>

        <div class="bg-gradient-to-br from-stone-900 to-amber-950/20 border ${isEnding ? "border-amber-500/60 shadow-xl shadow-amber-500/10" : "border-stone-800"} rounded-2xl p-6 sm:p-8 space-y-4">
          <div class="text-xs text-amber-500/80 uppercase tracking-widest font-bold mb-2">${isEnding ? "🏆 Fin de votre épopée" : "📜 Le récit se déroule..."}</div>
          <p class="text-stone-100 text-base sm:text-lg leading-relaxed font-medium">
            ${node.text}
          </p>

          ${isEnding ? `
            <div class="pt-4 flex items-center gap-3 bg-amber-950/20 -mx-2 sm:-mx-4 px-4 sm:px-6 py-4 rounded-xl border-t border-amber-500/20 mt-4">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0">
                ${window.fasoIcon('award', 'w-5 h-5 text-amber-400')}
              </div>
              <div>
                <div class="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold">Titre Honorifique Acquis</div>
                <div class="text-base sm:text-lg font-black text-amber-200 font-heading">${node.badge || "Héroïne du Faso"}</div>
              </div>
            </div>
          ` : ""}
        </div>

        ${!isEnding && node.choices ? `
          <div class="space-y-3">
            <div class="text-xs uppercase tracking-widest text-amber-500/70 font-bold pl-1">Quel choix ferez-vous ?</div>
            ${node.choices.map((choice, idx) => `
              <button
                class="adv-choice-btn w-full text-left p-5 rounded-2xl bg-stone-900/70 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/60 transition-all duration-200 flex items-start gap-4 group"
                data-target="${choice.target}"
              >
                <span class="w-8 h-8 rounded-xl bg-stone-800 group-hover:bg-amber-500 border border-stone-700 group-hover:border-amber-400 flex items-center justify-center text-amber-300 group-hover:text-stone-950 font-black text-sm shrink-0 mt-0.5 transition-all">
                  ${String.fromCharCode(65 + idx)}
                </span>
                <span class="text-stone-200 group-hover:text-amber-100 text-sm leading-relaxed transition-colors font-medium">${choice.text}</span>
              </button>
            `).join("")}
          </div>
        ` : ""}

        ${isEnding ? `
          <div class="flex flex-wrap items-center justify-center gap-3 pt-6">
            <button id="adv-btn-restart" class="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2">
              ${window.fasoIcon('refresh', 'w-4 h-4 fill-stone-950')}
              <span>Explorer une Autre Voie</span>
            </button>
            <a href="#library" class="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-sm transition-all flex items-center gap-2">
              ${window.fasoIcon('book', 'w-4 h-4 text-amber-400')}
              <span>Retour à la Bibliothèque</span>
            </a>
            <a href="#campfire/yennenga" class="px-6 py-3 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 text-amber-200 border border-amber-500/30 font-bold text-sm transition-all flex items-center gap-2">
              ${window.fasoIcon('flame', 'w-4 h-4 text-orange-400')}
              <span>Veillée de Yennenga au Coin du Feu</span>
            </a>
          </div>
        ` : `
          ${this.pathHistory.length > 1 ? `
            <div class="text-center pt-2">
              <button id="adv-btn-back" class="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                ← Revenir au choix précédent
              </button>
            </div>
          ` : ""}
        `}
      `;

      container.classList.remove("opacity-0", "translate-y-2");

      container.querySelectorAll(".adv-choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-target");
          if (target) this._renderNode(target);
        });
      });

      const restartBtn = document.getElementById("adv-btn-restart");
      if (restartBtn) {
        restartBtn.addEventListener("click", () => {
          this.pathHistory = [];
          this.badgesEarned = [];
          this._updateBadges();
          this._renderNode(this.storyData.startNode);
        });
      }

      const backBtn = document.getElementById("adv-btn-back");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          if (this.pathHistory.length > 1) {
            this.pathHistory.pop();
            const prev = this.pathHistory.pop();
            this._renderNode(prev);
          }
        });
      }

      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  _updateBadges() {
    const container = document.getElementById("adv-badges-container");
    if (!container) return;
    container.innerHTML = this.badgesEarned.map(badge => `
      <span class="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 px-3 py-1 rounded-full text-amber-300 text-xs font-bold">
        🏅 ${badge}
      </span>
    `).join("");
  }

  _spawnParticles() {
    const host = document.getElementById("adv-particles-host");
    if (!host) return;
    host.innerHTML = "";
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: rgba(229, 169, 60, ${0.3 + Math.random() * 0.5});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 3}s infinite alternate;
      `;
      host.appendChild(p);
    }
  }
}

window.FasoAdventureView = FasoAdventureView;
