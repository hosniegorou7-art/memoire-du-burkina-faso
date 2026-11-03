/**
 * MÉMOIRE DU BURKINA — CHEF D'ORCHESTRE APPLICATIF (APPLICATION CONTROLLER)
 * Initialisation modulaire, injection des dépendances, routage SPA réactif
 * et liaison de tous les modules (Carte, Audio, Récits, Régions, Admin, Mode Feu).
 */

document.addEventListener("DOMContentLoaded", () => {
  // GESTIONNAIRE D'EXCLUSIVITÉ AUDIO UNIVERSEL
  // Intercepte tout événement 'play' au niveau le plus haut (capture phase).
  // Garantit à 100% qu'UN SEUL flux audio ne peut jouer en même temps sur tout le site.
  document.addEventListener("play", (event) => {
    const current = event.target;
    // 1. Coupe tous les autres éléments <audio> et <video> du DOM
    document.querySelectorAll("audio, video").forEach(media => {
      if (media !== current && !media.paused) {
        media.pause();
      }
    });
    // 2. Coupe la synthèse vocale en cours
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    // 3. Stoppe les instances de lecteurs tiers s'ils ne sont pas la cible
    if (window.fasoAudio && window.fasoAudio.mp3Element && window.fasoAudio.mp3Element !== current) {
      if (!window.fasoAudio.mp3Element.paused) window.fasoAudio.mp3Element.pause();
    }
  }, true);

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
  const glossaryView = new FasoGlossaryView("main-view-host");
  const adventureView = new FasoAdventureView("main-view-host");
  const legendsView = new FasoLegendsView("main-view-host");

  // Lecteur Audio Global (instancié ici, disponible partout via window.fasoAudioPlayer)
  window.fasoAudioPlayer = new FasoAudioPlayer("global-audio-player-container");

  // Initialise le moteur audio (sans démarrer l'ambiance automatiquement —
  // les navigateurs bloquent l'AudioContext avant un geste utilisateur)
  // La voix et la musique démarrent seulement quand l'utilisateur clique.

  // 2. Configuration du Routeur SPA
  const router = new FasoRouter({
    home: () => homeView.render(),
    map: () => mapView.render(),
    regions: (id) => regionsView.render(id),
    library: () => libraryView.render(),
    histoires: () => libraryView.render(),
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
    glossary: () => glossaryView.render(),
    adventure: () => adventureView.render(),
    legends: () => legendsView.render(),
    "*": () => homeView.render()
  });

  window.fasoRouter = router;

  // 3. Barre de Navigation Globale (Liens et actions rapides)
  const navSoundscapeBtn = document.getElementById("btn-nav-ambience");
  if (navSoundscapeBtn && window.fasoAudio) {
    navSoundscapeBtn.addEventListener("click", () => {
      window.fasoAudio.initAudioContext();
      const active = window.fasoAudio.isAmbiancePlaying;
      if (active) {
        window.fasoAudio.stopAmbience();
      } else {
        window.fasoAudio.startAmbience("veillee");
      }
      navSoundscapeBtn.classList.toggle("bg-amber-500/30", !active);
      navSoundscapeBtn.classList.toggle("text-amber-200", !active);
      const icon = window.fasoIcon ? window.fasoIcon('audio', 'w-3.5 h-3.5') : '♪';
      navSoundscapeBtn.innerHTML = !active
        ? `${icon} <span class="hidden sm:inline">Kora : Active</span>`
        : `${icon} <span class="hidden sm:inline">Ambiance Kora</span>`;
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
