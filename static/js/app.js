/**
 * MÉMOIRE DU BURKINA — CHEF D'ORCHESTRE APPLICATIF (APPLICATION CONTROLLER)
 * Initialisation modulaire, injection des dépendances, routage SPA réactif
 * et liaison de tous les modules (Carte, Audio, Récits, Régions, Admin, Mode Feu).
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialisation des Moteurs Centraux
  const store = window.fasoStore;
  const mainHost = document.getElementById("main-view-host");
  const audioHost = document.getElementById("global-audio-player-container");

  // Instances des Vues Modulaires
  const homeView = new FasoHomeView("main-view-host");
  const mapView = new FasoMapView("main-view-host");
  const regionsView = new FasoRegionsView("main-view-host");
  const libraryView = new FasoLibraryView("main-view-host");
  const storyView = new FasoStoryView("main-view-host");
  const campfireView = new FasoCampfireExperience("main-view-host");
  const contributeView = new FasoContributeView("main-view-host");
  const adminView = new FasoAdminView("main-view-host");

  // Lecteur Audio Global
  window.fasoAudioPlayer = new FasoAudioPlayer("global-audio-player-container");

  // 2. Configuration du Routeur SPA
  const router = new FasoRouter({
    home: () => homeView.render(),
    map: () => mapView.render(),
    regions: (id) => regionsView.render(id),
    library: () => libraryView.render(),
    story: (id) => storyView.render(id),
    campfire: (id) => campfireView.mount(id),
    quiz: () => {
      if (window.FasoQuizEngine) {
        const quizModal = document.getElementById("quiz-modal-container");
        if (quizModal) {
          const q = new window.FasoQuizEngine("quiz-modal-container", {
            onClose: () => router.navigateTo("home")
          });
          q.start();
        }
      }
    },
    contribute: () => contributeView.render(),
    admin: () => adminView.render(),
    "*": () => homeView.render()
  });

  window.fasoRouter = router;

  // 3. Barre de Navigation Globale (Liens et actions rapides)
  const navSoundscapeBtn = document.getElementById("btn-nav-ambience");
  if (navSoundscapeBtn && window.fasoAudio) {
    navSoundscapeBtn.addEventListener("click", () => {
      const active = window.fasoAudio.toggleAmbience("veillee");
      navSoundscapeBtn.classList.toggle("bg-amber-500/30", active);
      navSoundscapeBtn.classList.toggle("text-amber-200", active);
      navSoundscapeBtn.innerHTML = active ? `<span>🎶</span> <span class="hidden sm:inline">Kora Sahélienne : On</span>` : `<span>🎵</span> <span class="hidden sm:inline">Ambiance Kora : Off</span>`;
    });
  }

  // 4. Menu mobile burger toggle
  const mobileMenuBtn = document.getElementById("btn-mobile-menu");
  const mobileNav = document.getElementById("mobile-navigation");
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });

    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
      });
    });
  }

  // Synchronisation du compteur de favoris et des contributions
  if (store) {
    store.subscribe((state) => {
      const favBadge = document.getElementById("badge-fav-count");
      if (favBadge) {
        favBadge.textContent = state.favorites.length;
        favBadge.classList.toggle("hidden", state.favorites.length === 0);
      }
    });
  }
});
