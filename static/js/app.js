/**
 * FASO CONTES & LÉGENDES - APPLICATION CONTROLLER PRINCIPAL
 * Gestion de l'état global, navigation, bascule 2D/3D, recherche, filtres et interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Instances des moteurs
  let map2dInstance = null;
  let map3dInstance = null;
  const reader = new FasoStoryReader("reader-modal-container", {
    onStartInteractive: (storyId) => {
      interactiveEngine.start();
    }
  });
  const interactiveEngine = new FasoInteractiveEngine("interactive-modal-container");
  const quizEngine = new FasoQuizEngine("quiz-modal-container");

  // État local
  let currentMapMode = "2d"; // "2d" ou "3d"
  let activeCategory = "all";
  let activeLanguage = "all";
  let searchQuery = "";

  // 1. Initialisation de la carte 2D par défaut
  map2dInstance = new Faso2DMap("map-viewport-container", {
    onSelectStory: (story) => reader.openStory(story),
    onSelectRegion: (region) => filterByRegion(region.id)
  });

  // 2. Gestion de la bascule de vue Carte 2D / Perspective 3D
  const btnView2d = document.getElementById("btn-view-2d");
  const btnView3d = document.getElementById("btn-view-3d");

  function switchMapMode(mode) {
    currentMapMode = mode;
    const container = document.getElementById("map-viewport-container");
    container.innerHTML = "";

    if (mode === "2d") {
      btnView2d.classList.add("bg-amber-500", "text-stone-950");
      btnView2d.classList.remove("text-stone-300");
      btnView3d.classList.remove("bg-amber-500", "text-stone-950");
      btnView3d.classList.add("text-stone-300");

      if (map3dInstance) {
        map3dInstance.destroy();
        map3dInstance = null;
      }
      map2dInstance = new Faso2DMap("map-viewport-container", {
        onSelectStory: (story) => reader.openStory(story),
        onSelectRegion: (region) => filterByRegion(region.id)
      });
    } else {
      btnView3d.classList.add("bg-amber-500", "text-stone-950");
      btnView3d.classList.remove("text-stone-300");
      btnView2d.classList.remove("bg-amber-500", "text-stone-950");
      btnView2d.classList.add("text-stone-300");

      map2dInstance = null;
      map3dInstance = new Faso3DMap("map-viewport-container", {
        onSelectStory: (story) => reader.openStory(story)
      });
    }
  }

  if (btnView2d) btnView2d.addEventListener("click", () => switchMapMode("2d"));
  if (btnView3d) btnView3d.addEventListener("click", () => switchMapMode("3d"));

  // 3. Rendu de la grille des contes dans la bibliothèque
  function renderStoriesGrid() {
    const grid = document.getElementById("stories-grid");
    if (!grid) return;

    const filtered = FASO_STORIES.filter(s => {
      const matchCat = activeCategory === "all" || s.category.toLowerCase().includes(activeCategory.toLowerCase());
      const matchLang = activeLanguage === "all" || s.languages.some(l => l.toLowerCase() === activeLanguage.toLowerCase());
      const matchSearch = searchQuery === "" ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.regionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ethnic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchLang && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-stone-400 space-y-3">
          <div class="text-4xl">🌾</div>
          <div class="text-lg font-bold text-amber-300">Aucun conte ne correspond à cette recherche</div>
          <p class="text-xs">Essayez un autre terme ou réinitialisez les filtres.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(story => `
      <div class="story-card bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer" data-id="${story.id}">
        <!-- Image & Badge -->
        <div class="relative w-full h-48 overflow-hidden bg-stone-950">
          <img src="/static/assets/illustrations/${story.heroImage}" alt="${story.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
            ${story.category}
          </span>
          <span class="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30">
            ${story.duration}
          </span>
        </div>

        <!-- Contenu -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div class="text-[11px] font-medium text-amber-400 mb-1 flex items-center gap-1.5">
              <span>📍 ${story.regionName}</span> • <span>${story.ethnic}</span>
            </div>
            <h3 class="text-base font-bold text-stone-100 group-hover:text-amber-200 transition-colors leading-snug line-clamp-1">
              ${story.title}
            </h3>
            <p class="text-xs text-stone-400 mt-2 line-clamp-3 leading-relaxed">
              ${story.synopsis}
            </p>
          </div>

          <!-- Pied de carte -->
          <div class="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
            <span class="text-stone-400 font-mono text-[11px]">
              🗣️ ${story.languages.join(", ")}
            </span>
            <span class="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Écouter ➔
            </span>
          </div>
        </div>
      </div>
    `).join("");

    // Événement clic sur une carte
    grid.querySelectorAll(".story-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const story = FASO_STORIES.find(s => s.id === id);
        if (story) reader.openStory(story);
      });
    });
  }

  // 4. Barre de recherche et filtres de la bibliothèque
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderStoriesGrid();
    });
  }

  const categoryFilterBtns = document.querySelectorAll(".cat-filter-btn");
  categoryFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFilterBtns.forEach(b => {
        b.classList.remove("active", "bg-amber-500", "text-stone-950", "font-bold");
        b.classList.add("text-stone-300");
      });
      btn.classList.add("active", "bg-amber-500", "text-stone-950", "font-bold");
      btn.classList.remove("text-stone-300");
      activeCategory = btn.getAttribute("data-category");
      renderStoriesGrid();
    });
  });

  const langSelect = document.getElementById("lang-filter-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      activeLanguage = e.target.value;
      renderStoriesGrid();
    });
  }

  function filterByRegion(regionId) {
    const storiesSec = document.getElementById("section-library");
    if (storiesSec) {
      storiesSec.scrollIntoView({ behavior: "smooth" });
      const reg = FASO_REGIONS.find(r => r.id === regionId);
      if (reg && searchInput) {
        searchInput.value = reg.name;
        searchQuery = reg.name;
        renderStoriesGrid();
      }
    }
  }

  // 5. Rotation des proverbes ancestraux du Faso
  let currentProverbIdx = 0;
  function rotateProverb() {
    const provContainer = document.getElementById("proverb-display");
    if (!provContainer) return;
    const p = FASO_PROVERBS[currentProverbIdx % FASO_PROVERBS.length];
    provContainer.innerHTML = `
      <div class="animate-fade-in text-center space-y-1">
        <p class="font-serif italic text-sm sm:text-base text-amber-100">
          "${p.proverb}"
        </p>
        <p class="text-xs text-amber-400 font-semibold">
          — ${p.meaning} <span class="opacity-70">(${p.lang})</span>
        </p>
      </div>
    `;
    currentProverbIdx++;
  }
  rotateProverb();
  setInterval(rotateProverb, 9000);

  // 6. Déclencheurs de navigation et boutons CTA
  const btnHeroExplore = document.getElementById("btn-hero-explore");
  const btnHeroInteractive = document.getElementById("btn-hero-interactive");
  const btnHeroQuiz = document.getElementById("btn-hero-quiz");
  const navQuiz = document.getElementById("nav-quiz");
  const navInteractive = document.getElementById("nav-interactive");
  const navSoundscape = document.getElementById("btn-nav-soundscape");

  if (btnHeroExplore) {
    btnHeroExplore.addEventListener("click", () => {
      document.getElementById("section-map").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (btnHeroInteractive) {
    btnHeroInteractive.addEventListener("click", () => interactiveEngine.start());
  }

  if (btnHeroQuiz) {
    btnHeroQuiz.addEventListener("click", () => quizEngine.start());
  }

  if (navQuiz) {
    navQuiz.addEventListener("click", (e) => {
      e.preventDefault();
      quizEngine.start();
    });
  }

  if (navInteractive) {
    navInteractive.addEventListener("click", (e) => {
      e.preventDefault();
      interactiveEngine.start();
    });
  }

  // Bouton Musique d'ambiance globale dans la barre de navigation
  if (navSoundscape) {
    navSoundscape.addEventListener("click", () => {
      const isPlaying = window.fasoAudio.toggleAmbience("veillee");
      navSoundscape.classList.toggle("bg-amber-500/30", isPlaying);
      navSoundscape.classList.toggle("text-amber-200", isPlaying);
      navSoundscape.innerHTML = isPlaying ? `<span>🎶</span> <span>Ambiance Kora : On</span>` : `<span>🎵</span> <span>Ambiance Kora : Off</span>`;
    });
  }

  // Rendu initial de la bibliothèque
  renderStoriesGrid();
});
