/**
 * MÉMOIRE DU BURKINA — ESPACE DE CONTRIBUTION CITOYENNE AU PATRIMOINE
 * Formulaire de collecte participative, traçabilité éthique et consentement éclairé UNESCO.
 */

class FasoContributeView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    const regions = window.FASO_17_REGIONS || [];
    const languages = window.FASO_LANGUAGES || [];

    this.container.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-stone-100">
        
        <!-- En-tête -->
        <div class="text-center space-y-3 mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>🤝</span> <span>Collecte & Préservation Participative</span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-amber-100 font-heading">
            Transmettez la Mémoire de Vos Aînés
          </h1>
          <p class="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Vous détenez un conte, une légende familiale ou un récit historique d'une région du Burkina Faso ? 
            Participez à la constitution de la grande bibliothèque vivante du patrimoine oral burkinabè.
          </p>
        </div>

        <!-- Formulaire de Contribution Sécurisé -->
        <div class="p-6 sm:p-10 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl space-y-6">
          <form id="form-contribute" class="space-y-6">
            
            <!-- Bloc 1 : Identification du Récit -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono border-b border-stone-800 pb-2">
                1. Identification du Récit
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Titre du Conte en Français *</label>
                  <input type="text" name="title" required placeholder="Ex: La Légende de la Source Sacrée" class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none transition-all">
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Titre en Langue Nationale (si connu)</label>
                  <input type="text" name="nativeTitle" placeholder="Ex: Ko-kãsenga yela" class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none transition-all">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Région d'Origine (17 Régions) *</label>
                  <select name="region" required class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none transition-all">
                    <option value="">Sélectionnez la région</option>
                    ${regions.map(r => `<option value="${r.name}">${r.name} (${r.capital})</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Langue Principale du Conte *</label>
                  <select name="language" required class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none transition-all">
                    <option value="">Sélectionnez la langue</option>
                    ${languages.map(l => `<option value="${l.nameFr}">${l.nameFr} (${l.nativeName})</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Catégorie *</label>
                  <select name="category" required class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none transition-all">
                    <option value="Contes traditionnels">Conte traditionnel</option>
                    <option value="Légendes">Légende héroïque</option>
                    <option value="Mythes et récits fondateurs">Mythe fondateur</option>
                    <option value="Récits historiques">Récit historique</option>
                    <option value="Histoires de sagesse">Histoire de sagesse / Morale</option>
                    <option value="Contes animaliers">Fable animalière</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Bloc 2 : Corps du Conte & Morale -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono border-b border-stone-800 pb-2">
                2. Récit & Morale Ancestrale
              </h3>

              <div>
                <label class="block text-xs font-bold text-stone-300 mb-1">Résumé en quelques lignes *</label>
                <textarea name="synopsis" rows="2" required placeholder="Présentez brièvement les personnages et l'intrigue..." class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl p-3 text-xs text-stone-100 focus:outline-none transition-all"></textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-300 mb-1">Texte Intégral du Récit (Traduction Française) *</label>
                <textarea name="textFr" rows="5" required placeholder="Racontez l'histoire telle qu'elle a été transmise..." class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl p-3 text-xs text-stone-100 font-serif focus:outline-none transition-all"></textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-300 mb-1">Enseignement, Proverbe ou Morale du conte</label>
                <input type="text" name="moral" placeholder="Ex: L'union et la patience triomphent de la violence..." class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none transition-all">
              </div>
            </div>

            <!-- Bloc 3 : Traçabilité du Narrateur & Consentement UNESCO -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono border-b border-stone-800 pb-2">
                3. Éthique, Narrateur & Consentement Éclairé (UNESCO)
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Votre Nom & Prénom *</label>
                  <input type="text" name="contributorName" required placeholder="Ex: Salamata Ouedraogo" class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none transition-all">
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-300 mb-1">Adresse E-mail pour suivi *</label>
                  <input type="email" name="contributorEmail" required placeholder="salamata@domaine.bf" class="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none transition-all">
                </div>
              </div>

              <!-- Case à cocher de consentement légal et coutumier -->
              <div class="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs">
                <input type="checkbox" id="consent-check" name="consent" required class="mt-1 rounded accent-amber-500">
                <label for="consent-check" class="text-stone-300 leading-relaxed cursor-pointer">
                  <strong class="text-amber-300">Consentement préalable libre et éclairé (Convention UNESCO 2003) :</strong> 
                  J'atteste sur l'honneur que ce récit appartient au patrimoine culturel immatériel et que sa diffusion à vocation éducative et non-commerciale a été accordée par les détenteurs de la tradition ou leurs ayants droit.
                </label>
              </div>
            </div>

            <!-- Bouton de soumission -->
            <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span class="text-[11px] text-stone-400">
                ℹ️ Toute contribution est vérifiée par notre comité d'historiens et linguistes avant publication.
              </span>
              <button type="submit" class="btn-primary text-xs w-full sm:w-auto px-6 py-3 shadow-lg">
                <span>🚀</span> <span>Soumettre la Contribution</span>
              </button>
            </div>

          </form>

          <!-- Notification de confirmation -->
          <div id="contribute-success" class="hidden p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-center space-y-2 animate-fade-in">
            <div class="text-3xl">✨</div>
            <h4 class="font-bold text-base">Contribution Enregistrée avec Succès !</h4>
            <p class="text-xs text-stone-300 max-w-md mx-auto">
              Bark wusgo ! Votre récit a été transmis à la cellule scientifique pour modération et intégration dans la bibliothèque du patrimoine.
            </p>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector("#form-contribute");
    const successBox = this.container.querySelector("#contribute-success");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (window.fasoStore) {
          window.fasoStore.addContribution(data);
        }

        form.classList.add("hidden");
        successBox.classList.remove("hidden");
      });
    }
  }
}

window.FasoContributeView = FasoContributeView;
