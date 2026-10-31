/**
 * MÉMOIRE DU BURKINA — TABLEAU DE BORD ADMINISTRATEUR SÉCURISÉ
 * Gestion complète des 17 régions, des récits, des narrateurs certifiés,
 * modération des contributions citoyennes et métriques de sauvegarde patrimoniale.
 */

class FasoAdminView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTab = "overview"; // "overview", "stories", "regions", "narrators", "moderation"
  }

  render() {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || [];
    const regions = window.FASO_17_REGIONS || [];
    const languages = window.FASO_LANGUAGES || [];
    const contributions = window.fasoStore ? window.fasoStore.state.contributions : [];

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-stone-100">
        
        <!-- En-tête du Tableau de Bord Administrateur -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              ${window.fasoIcon ? window.fasoIcon('shield', 'w-3.5 h-3.5 text-amber-400') : ''}
              <span>Espace d'Administration &amp; Sauvegarde</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-amber-100 font-heading">
              Console de Gestion du Patrimoine
            </h1>
          </div>

          <!-- Onglets de gestion -->
          <div class="flex flex-wrap items-center gap-1.5 bg-stone-900 p-1 rounded-2xl border border-stone-800 text-xs">
            <button class="admin-tab-btn active px-3.5 py-1.5 rounded-xl font-bold bg-amber-500 text-stone-950 transition-all flex items-center gap-1.5" data-tab="overview">
              ${window.fasoIcon ? window.fasoIcon('sparkles', 'w-3 h-3') : ''}
              <span>Vue Globale</span>
            </button>
            <button class="admin-tab-btn px-3.5 py-1.5 rounded-xl font-medium text-stone-300 hover:text-white transition-all flex items-center gap-1.5" data-tab="stories">
              ${window.fasoIcon ? window.fasoIcon('book', 'w-3 h-3 text-amber-400') : ''}
              <span>Récits (${stories.length})</span>
            </button>
            <button class="admin-tab-btn px-3.5 py-1.5 rounded-xl font-medium text-stone-300 hover:text-white transition-all flex items-center gap-1.5" data-tab="regions">
              ${window.fasoIcon ? window.fasoIcon('map', 'w-3 h-3 text-amber-400') : ''}
              <span>17 Régions (${regions.length})</span>
            </button>
            <button class="admin-tab-btn px-3.5 py-1.5 rounded-xl font-medium text-stone-300 hover:text-white transition-all flex items-center gap-1.5" data-tab="moderation">
              ${window.fasoIcon ? window.fasoIcon('quill', 'w-3 h-3 text-amber-400') : ''}
              <span>Modération (${contributions.length})</span>
            </button>
          </div>
        </div>

        <!-- Conteneur d'affichage de l'onglet actif -->
        <div id="admin-tab-content" class="pt-6">
          ${this.renderOverviewTab(stories, regions, languages, contributions)}
        </div>

      </div>
    `;

    this.bindTabEvents();
  }

  renderOverviewTab(stories, regions, languages, contributions) {
    return `
      <div class="space-y-8">
        <!-- 4 Cartes Métriques Clés -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg">
            <div class="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span>Récits Documentés</span>
              <span class="text-amber-400">${window.fasoIcon ? window.fasoIcon('book', 'w-4 h-4 text-amber-400') : ''}</span>
            </div>
            <div class="text-3xl font-black text-amber-200 font-mono">${stories.length}</div>
            <div class="text-[11px] text-emerald-400 mt-1">100% vérifiés et référencés</div>
          </div>

          <div class="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg">
            <div class="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span>Régions Officielles</span>
              <span class="text-amber-400">${window.fasoIcon ? window.fasoIcon('map', 'w-4 h-4 text-amber-400') : ''}</span>
            </div>
            <div class="text-3xl font-black text-amber-200 font-mono">${regions.length} / 17</div>
            <div class="text-[11px] text-emerald-400 mt-1">Découpage intégral intégré</div>
          </div>

          <div class="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg">
            <div class="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span>Langues Nationales</span>
              <span class="text-amber-400">${window.fasoIcon ? window.fasoIcon('speaker', 'w-4 h-4 text-amber-400') : ''}</span>
            </div>
            <div class="text-3xl font-black text-amber-200 font-mono">${languages.length}</div>
            <div class="text-[11px] text-amber-400 mt-1">Mooré, Dioula, Fulfulde...</div>
          </div>

          <div class="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg">
            <div class="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span>Contributions Citoyennes</span>
              <span class="text-amber-400">${window.fasoIcon ? window.fasoIcon('quill', 'w-4 h-4 text-amber-400') : ''}</span>
            </div>
            <div class="text-3xl font-black text-amber-200 font-mono">${contributions.length}</div>
            <div class="text-[11px] text-stone-400 mt-1">En attente de comité éthique</div>
          </div>
        </div>

        <!-- Tableau synthétique des récits récemment audités -->
        <div class="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-amber-100 font-heading">
              Derniers Récits Validés par le Conseil Scientifique
            </h3>
            <span class="text-xs text-amber-500 font-medium">Standard UNESCO PCI</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-stone-800 text-stone-400 uppercase font-mono text-[10px]">
                  <th class="py-3 px-3">Titre du Conte</th>
                  <th class="py-3 px-3">Région (17)</th>
                  <th class="py-3 px-3">Langues</th>
                  <th class="py-3 px-3">Informateur / Narrateur</th>
                  <th class="py-3 px-3">Statut Patrimonial</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-800/60 text-stone-300">
                ${stories.slice(0, 5).map(s => `
                  <tr class="hover:bg-amber-950/20 transition-colors">
                    <td class="py-3 px-3 font-bold text-amber-200">${s.title}</td>
                    <td class="py-3 px-3 text-stone-400">${s.regionName}</td>
                    <td class="py-3 px-3 font-mono text-amber-400/90">${s.languages.join(", ")}</td>
                    <td class="py-3 px-3">${s.narratorName || s.collector || "Tradition orale"}</td>
                    <td class="py-3 px-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Vérifié & Numérisé
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  renderStoriesTab(stories) {
    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-amber-100 font-heading">Inventaire Intégral des Récits (${stories.length})</h3>
          <button class="btn-primary text-xs py-1.5 px-3">
            <span>➕</span> <span>Ajouter un nouveau conte</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${stories.map(s => `
            <div class="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-start gap-3">
              <img src="/static/assets/illustrations/${s.heroImage}" alt="${s.title}" class="w-16 h-16 rounded-xl object-cover border border-amber-500/20 shrink-0">
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider">${s.category}</span>
                  <span class="text-[10px] text-stone-400 font-mono">${s.duration}</span>
                </div>
                <h4 class="text-sm font-bold text-stone-100 truncate">${s.title}</h4>
                <p class="text-xs text-stone-400 truncate mt-0.5">${s.regionName} • ${s.ethnic}</p>
                <div class="flex items-center gap-2 mt-2 pt-2 border-t border-stone-800 text-[11px]">
                  <button class="text-amber-400 hover:underline">Modifier</button>
                  <span class="text-stone-600">•</span>
                  <button class="text-stone-400 hover:text-white">Audios bilingues</button>
                  <span class="text-stone-600">•</span>
                  <button class="text-rose-400 hover:underline">Archiver</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  renderRegionsTab(regions) {
    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-amber-100 font-heading">Les 17 Régions Souveraines du Burkina Faso</h3>
          <span class="text-xs text-stone-400 font-mono">17 entités administratives configurées</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${regions.map(r => `
            <div class="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-amber-200 text-sm">${r.name}</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-400">
                  ${r.capital}
                </span>
              </div>
              <p class="text-xs text-stone-400 line-clamp-2">${r.description}</p>
              <div class="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                <span>${window.fasoIcon ? window.fasoIcon('book', 'w-3 h-3 text-amber-400 inline mr-1') : ''}${r.storiesCount || 1} conte(s)</span>
                <span class="text-amber-400 font-medium">${r.languages.slice(0, 2).join(", ")}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  renderModerationTab(contributions) {
    if (contributions.length === 0) {
      return `
        <div class="py-16 text-center text-stone-400 space-y-3">
          <div class="w-12 h-12 mx-auto text-stone-600">${window.fasoIcon ? window.fasoIcon('document', 'w-10 h-10') : ''}</div>
          <div class="text-base font-bold text-amber-200">Aucune contribution citoyenne en attente</div>
          <p class="text-xs max-w-md mx-auto">
            Les propositions soumises via le formulaire public de collecte apparaîtront ici pour examen scientifique et validation du consentement.
          </p>
        </div>
      `;
    }

    return `
      <div class="space-y-4">
        <h3 class="text-base font-bold text-amber-100 font-heading">
          Contributions Citoyennes en Attente de Revue (${contributions.length})
        </h3>
        <div class="space-y-3">
          ${contributions.map(c => `
            <div class="p-5 rounded-2xl bg-stone-900 border border-amber-900/40 space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-bold text-amber-200">${c.title}</h4>
                  <p class="text-xs text-stone-400">Région : ${c.region} • Proposé par : ${c.contributorName} (${c.contributorEmail})</p>
                </div>
                <span class="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  En attente
                </span>
              </div>
              <p class="text-xs text-stone-300 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                ${c.synopsis || c.textFr || "Texte soumis..."}
              </p>
              <div class="flex items-center gap-3 pt-1 text-xs">
                <button class="btn-primary text-xs py-1.5 px-3">
                  ✓ Valider & Publier
                </button>
                <button class="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs transition-all">
                  Demander des compléments
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  bindTabEvents() {
    const tabBtns = this.container.querySelectorAll(".admin-tab-btn");
    const tabContent = this.container.querySelector("#admin-tab-content");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => {
          b.classList.remove("active", "bg-amber-500", "text-stone-950", "font-bold");
          b.classList.add("text-stone-300");
        });
        btn.classList.add("active", "bg-amber-500", "text-stone-950", "font-bold");
        btn.classList.remove("text-stone-300");

        const tab = btn.getAttribute("data-tab");
        const stories = window.FASO_STORIES_DB || [];
        const regions = window.FASO_17_REGIONS || [];
        const languages = window.FASO_LANGUAGES || [];
        const contributions = window.fasoStore ? window.fasoStore.state.contributions : [];

        if (tab === "overview") tabContent.innerHTML = this.renderOverviewTab(stories, regions, languages, contributions);
        else if (tab === "stories") tabContent.innerHTML = this.renderStoriesTab(stories);
        else if (tab === "regions") tabContent.innerHTML = this.renderRegionsTab(regions);
        else if (tab === "moderation") tabContent.innerHTML = this.renderModerationTab(contributions);
      });
    });
  }
}

window.FasoAdminView = FasoAdminView;
