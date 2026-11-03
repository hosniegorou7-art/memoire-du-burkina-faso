/**
 * MÉMOIRE DU BURKINA — ROUTEUR CLIENT MODULAIRE (SPA HASH ROUTER)
 * Routage propre, synchronisation URL et gestion de l'historique de navigation.
 */

class FasoRouter {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentPath = "";

    window.addEventListener("hashchange", () => this.handleRouting());
    window.addEventListener("load", () => this.handleRouting());
  }

  registerRoute(pattern, handler) {
    this.routes[pattern] = handler;
  }

  handleRouting() {
    const rawHash = window.location.hash.slice(1) || "home";
    const [pathPart, ...queryParts] = rawHash.split("?");
    const segments = pathPart.replace(/^\//, "").split("/");
    const primaryRoute = segments[0] || "home";
    const routeParam = segments[1] || null;

    this.currentPath = primaryRoute;

    // Arrêt systématique de tout flux audio lors d'un changement d'écran
    document.querySelectorAll("audio, video").forEach(el => {
      if (!el.paused) el.pause();
    });
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    // Mise à jour de l'état global
    if (window.fasoStore) {
      window.fasoStore.state.currentView = primaryRoute;
      window.fasoStore.state.viewParams = { id: routeParam };
      if (primaryRoute === "regions" && routeParam) {
        window.fasoStore.state.activeRegionId = routeParam;
      }
      if ((primaryRoute === "story" || primaryRoute === "campfire") && routeParam) {
        window.fasoStore.state.activeStoryId = routeParam;
      }
      window.fasoStore.notify();
    }

    // Exécution du contrôleur de vue associé
    const handler = this.routes[primaryRoute] || this.routes["*"] || this.routes["home"];
    if (handler) {
      handler(routeParam, this.parseQuery(queryParts.join("?")));
    }

    this.updateActiveNavLinks(primaryRoute);
  }

  parseQuery(queryString) {
    if (!queryString) return {};
    const params = {};
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [k, v] = pair.split("=");
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || "");
    }
    return params;
  }

  updateActiveNavLinks(activeRoute) {
    const navLinks = document.querySelectorAll("[data-nav-route]");
    navLinks.forEach(link => {
      const target = link.getAttribute("data-nav-route");
      const isCurrent = target === activeRoute;
      link.classList.toggle("text-amber-400", isCurrent);
      link.classList.toggle("font-bold", isCurrent);
      link.classList.toggle("text-stone-300", !isCurrent);
    });
  }

  navigateTo(route, param = null) {
    const targetHash = param ? `#${route}/${param}` : `#${route}`;
    window.location.hash = targetHash;
  }
}

window.FasoRouter = FasoRouter;
