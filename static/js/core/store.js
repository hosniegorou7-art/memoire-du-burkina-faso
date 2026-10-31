/**
 * MÉMOIRE DU BURKINA — GESTIONNAIRE D'ÉTAT RÉACTIF CENTRAL (STORE)
 * Architecture flux réactive, persistance locale (favoris, historique d'écoute)
 * et synchronisation inter-composants (Audio, Carte, Navigation).
 */

class FasoStore {
  constructor() {
    this.state = {
      currentView: "home",
      viewParams: {},
      activeRegionId: null,
      activeStoryId: null,
      searchQuery: "",
      filters: {
        category: "all",
        language: "all",
        regionId: "all",
        sortBy: "featured" // "featured", "recent", "duration"
      },
      favorites: this.loadStorage("faso_favorites", []),
      listeningHistory: this.loadStorage("faso_history", []),
      contributions: this.loadStorage("faso_contributions", []),
      isKidMode: false,
      mapMode: "2d", // "2d" ou "3d"
      audio: {
        isPlaying: false,
        isSpeaking: false,
        currentStory: null,
        currentSectionIndex: 0,
        currentTime: 0,
        duration: 0,
        volume: 0.8,
        speed: 1.0,
        isAmbienceActive: false,
        ambiencePreset: "veillee" // "veillee", "dafra", "yennenga", "sahel"
      }
    };

    this.listeners = new Set();
  }

  loadStorage(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Erreur d'écriture localStorage :", e);
    }
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // Actions de Navigation
  navigate(view, params = {}) {
    this.state.currentView = view;
    this.state.viewParams = params;
    if (params.regionId) this.state.activeRegionId = params.regionId;
    if (params.storyId) this.state.activeStoryId = params.storyId;
    this.notify();
    window.location.hash = `#${view}${params.id ? `/${params.id}` : ''}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Actions Favoris
  toggleFavorite(storyId) {
    let favs = [...this.state.favorites];
    if (favs.includes(storyId)) {
      favs = favs.filter(id => id !== storyId);
    } else {
      favs.push(storyId);
    }
    this.state.favorites = favs;
    this.saveStorage("faso_favorites", favs);
    this.notify();
  }

  isFavorite(storyId) {
    return this.state.favorites.includes(storyId);
  }

  // Actions Historique d'écoute
  logListening(storyId, progressSeconds = 0) {
    let hist = [...this.state.listeningHistory].filter(h => h.storyId !== storyId);
    hist.unshift({
      storyId,
      timestamp: Date.now(),
      progressSeconds
    });
    // Limiter aux 30 derniers récits écoutés
    hist = hist.slice(0, 30);
    this.state.listeningHistory = hist;
    this.saveStorage("faso_history", hist);
    this.notify();
  }

  // Soumission de Contribution Citoyenne
  addContribution(data) {
    const contribution = {
      id: "contrib-" + Date.now(),
      submittedAt: new Date().toISOString(),
      status: "pending_review", // En attente de modération
      ...data
    };
    const contribs = [contribution, ...this.state.contributions];
    this.state.contributions = contribs;
    this.saveStorage("faso_contributions", contribs);
    this.notify();
    return contribution;
  }

  // Filtrage et Recherche
  setSearchQuery(q) {
    this.state.searchQuery = q;
    this.notify();
  }

  setFilter(key, val) {
    this.state.filters = { ...this.state.filters, [key]: val };
    this.notify();
  }

  resetFilters() {
    this.state.searchQuery = "";
    this.state.filters = {
      category: "all",
      language: "all",
      regionId: "all",
      sortBy: "featured"
    };
    this.notify();
  }

  toggleKidMode() {
    this.state.isKidMode = !this.state.isKidMode;
    this.notify();
  }

  setMapMode(mode) {
    this.state.mapMode = mode;
    this.notify();
  }

  // Contrôles Audio Globaux
  updateAudio(partial) {
    this.state.audio = { ...this.state.audio, ...partial };
    this.notify();
  }
}

window.fasoStore = new FasoStore();
