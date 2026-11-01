/**
 * MÉMOIRE DU BURKINA — VUE D'ACCUEIL MODERNE & AÉRÉE
 * - Grand message de bienvenue défilant dans les langues nationales du Burkina Faso
 * - Esthétique contemporaine épurée inspirée du Faso Dan Fani et de la terre cuite
 * - Mosaïque des traditions et ethnies illustrées avec les photographies réelles
 * - Accès direct aux 32 contes, à la carte 3D du relief et à l'expérience autour du feu
 */

class FasoHomeView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.welcomeInterval = null;
    this.currentWelcomeIndex = 0;

    // Messages de bienvenue dans les principales langues nationales du Burkina Faso
    this.welcomeMessages = [
      {
        lang: "Mooré",
        greeting: "Ne y beogo !",
        phonetic: "Nyaam ! Bienvenue en terre Mossi",
        region: "Kadiogo, Yaadga, Oubri",
        meaning: "Que la paix et la fraîcheur du matin soient sur vous"
      },
      {
        lang: "Dioula",
        greeting: "Aw bissimilah !",
        phonetic: "I ni ce ! Bienvenue au carrefour de Sya",
        region: "Guiriko, Hauts-Bassins",
        meaning: "Soyez les très bienvenus dans nos demeures"
      },
      {
        lang: "Fulfulde",
        greeting: "On jaraama !",
        phonetic: "Jam tan ! Bienvenue en terre Peule",
        region: "Sahel, Soum, Liptako",
        meaning: "Bénédiction et quiétude pour votre voyage"
      },
      {
        lang: "Gulmancéma",
        greeting: "Yendie !",
        phonetic: "Fo boncianla ! Bienvenue au Gulmu",
        region: "Goulmou, Tapoa, Sirba",
        meaning: "Que la journée vous apporte la joie et l'abondance"
      },
      {
        lang: "San (Samo)",
        greeting: "Oun yé !",
        phonetic: "Bienvenue dans la vallée du Sourou",
        region: "Sourou, Nayala",
        meaning: "Fraternité et alliance sacrée sous l'arbre à palabres"
      },
      {
        lang: "Sénoufo",
        greeting: "Tchegana !",
        phonetic: "Bienvenue au pays des Cascades",
        region: "Djôrô, Banfora",
        meaning: "La terre hospitalière des collines vous accueille"
      },
      {
        lang: "Bissa",
        greeting: "Burum !",
        phonetic: "An baara ! Bienvenue en terre Bissa",
        region: "Nakambé, Tenkodogo",
        meaning: "Honneur et prospérité à nos hôtes"
      },
      {
        lang: "Dagara",
        greeting: "Bé song !",
        phonetic: "Bienvenue en pays Dagara",
        region: "Tannounyan, Sud-Ouest",
        meaning: "Que les ancêtres guident vos pas en paix"
      },
      {
        lang: "Bwaba",
        greeting: "Vaama !",
        phonetic: "Bienvenue en pays Bwa",
        region: "Bankui, Boucle du Mouhoun",
        meaning: "Salutations fraternelles sous la garde des masques"
      },
      {
        lang: "Français",
        greeting: "Bienvenue au Faso",
        phonetic: "La patrie des Hommes Intègres",
        region: "17 Régions unies",
        meaning: "32 contes oraux, 17 terroirs et une mémoire vivante"
      }
    ];
  }

  render() {
    if (!this.container) return;
    const stories = window.FASO_STORIES_DB || [];
    const featuredStories = stories.slice(0, 6);

    this.container.innerHTML = `
      <div class="space-y-28 pb-24 animate-fade-in text-stone-100">

        <!-- ==================== HERO SECTION : BIENVENUE DÉFILANTE ==================== -->
        <section class="relative pt-6 sm:pt-10 overflow-hidden">
          
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">

            <!-- Pastille Souveraine -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-md">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Patrimoine Oral • 17 Régions • 32 Contes &amp; Récits</span>
            </div>

            <!-- GRAND MESSAGE DE BIENVENUE DÉFILANT -->
            <div class="relative py-8 sm:py-12 px-6 sm:px-12 rounded-3xl bg-gradient-to-b from-stone-900/90 via-stone-950/80 to-stone-950 border border-amber-900/40 shadow-2xl overflow-hidden group">
              
              <!-- Effet de halo chaud en arrière-plan -->
              <div class="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

              <div class="relative z-10 space-y-4">
                
                <!-- Badge de Langue active -->
                <div class="flex items-center justify-center gap-2">
                  <span id="welcome-lang-badge" class="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-widest transition-all duration-300 font-mono">
                    Mooré
                  </span>
                  <span id="welcome-region-badge" class="text-xs text-stone-400 transition-all duration-300">
                    Kadiogo, Yaadga, Oubri
                  </span>
                </div>

                <!-- GRAND TITRE DU MESSAGE DÉFILANT -->
                <h1 id="welcome-greeting-text" class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-amber-50 tracking-tight font-heading leading-tight transition-all duration-500 drop-shadow-xl min-h-[1.2em] flex items-center justify-center">
                  Ne y beogo !
                </h1>

                <!-- Traduction / Signification -->
                <p id="welcome-meaning-text" class="text-sm sm:text-lg md:text-xl text-amber-200/90 font-serif italic max-w-2xl mx-auto transition-all duration-300">
                  « Que la paix et la fraîcheur du matin soient sur vous »
                </p>

                <!-- Boutons Précédent / Pause / Suivant & Indicateurs -->
                <div class="flex items-center justify-center gap-3 pt-4">
                  <button id="btn-welcome-prev" class="w-9 h-9 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 flex items-center justify-center transition-all" title="Langue précédente">
                    ‹
                  </button>
                  
                  <!-- Puces d'indicateur de défilement -->
                  <div id="welcome-dots-host" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/60 border border-stone-800">
                    ${this.welcomeMessages.map((_, i) => `
                      <span class="welcome-dot w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-amber-400 w-5' : 'bg-stone-700'}" data-index="${i}"></span>
                    `).join('')}
                  </div>

                  <button id="btn-welcome-next" class="w-9 h-9 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 flex items-center justify-center transition-all" title="Langue suivante">
                    ›
                  </button>
                </div>

              </div>

            </div>

            <!-- Sous-titre aéré & Boutons d'appel à l'action -->
            <div class="space-y-6 pt-2 max-w-3xl mx-auto">
              <p class="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
                Explorez la mémoire vivante du Burkina Faso à travers ses contes authentiques, 
                ses sagesses ancestrales racontées par les dépositaires de nos traditions orales.
              </p>

              <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a href="#map" class="btn-primary text-xs sm:text-sm px-6 py-3.5 shadow-xl flex items-center gap-2">
                  ${window.fasoIcon('layers', 'w-4 h-4')}
                  <span>Voir la Carte 3D du Relief</span>
                </a>
                <a href="#histoires" class="btn-secondary text-xs sm:text-sm px-6 py-3.5 flex items-center gap-2">
                  ${window.fasoIcon('book', 'w-4 h-4')}
                  <span>Écouter les Contes (${stories.length})</span>
                </a>
                <a href="#campfire/yennenga" class="px-5 py-3.5 rounded-xl bg-amber-950/70 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm">
                  ${window.fasoIcon('flame', 'w-4 h-4 text-orange-400')}
                  <span>Au Coin du Feu</span>
                </a>
              </div>
            </div>

          </div>

        </section>

        <!-- ==================== SECTION 2 : APERÇU DE LA MAQUETTE 3D ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-6 sm:p-10 rounded-3xl bg-gradient-to-tr from-stone-950 via-stone-900 to-stone-950 border border-amber-900/40 shadow-2xl space-y-8">
            
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div class="space-y-2">
                <span class="badge-culture">Topographie &amp; Géographie</span>
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-50 font-heading">
                  Le Relief Sculpté du Burkina Faso
                </h2>
                <p class="text-xs sm:text-sm text-stone-300 max-w-xl">
                  Une cartographie 3D fidèle aux 17 régions, aux biomes sahéliens, aux falaises gréseuses et aux fleuves historiques Mouhoun et Nakambé.
                </p>
              </div>
              <a href="#map" class="btn-primary text-xs px-5 py-2.5 self-start md:self-auto flex items-center gap-2">
                <span>Ouvrir la Carte 3D Plein Écran</span>
                <span>→</span>
              </a>
            </div>

            <!-- Carte 3D Hébergée directement sur l'accueil -->
            <div id="home-map3d-slot" class="w-full"></div>

          </div>
        </section>

        <!-- ==================== SECTION 3 : LES CONTES DU PATRIMOINE (AVEC PHOTOS AUTHENTIQUES) ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span class="badge-culture mb-2">Traditions Orales &amp; Voix des Terroirs</span>
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-50 font-heading">
                Récits &amp; Légendes des 17 Régions
              </h2>
              <p class="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                Écoutez les contes originaux en langues nationales : Mooré, Dioula, Fulfulde, Gulmancéma, San, Sénoufo et Bissa.
              </p>
            </div>
            <a href="#histoires" class="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 self-start sm:self-auto">
              <span>Voir toute la collection (${stories.length} récits)</span>
              <span>→</span>
            </a>
          </div>

          <!-- Grille des Contes avec vraies photographies culturelles -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            ${featuredStories.map(story => `
              <div class="group relative rounded-3xl overflow-hidden bg-stone-900/80 border border-stone-800/80 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex flex-col">
                
                <!-- Image d'en-tête culturelle authentique -->
                <div class="relative w-full h-48 overflow-hidden bg-stone-950">
                  <img
                    src="${story.heroImage ? (story.heroImage.startsWith('/') ? story.heroImage : '/static/assets/illustrations/' + story.heroImage) : '/static/assets/illustrations/etnies/culture-faso.jpg'}"
                    alt="${story.title}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
                  
                  <!-- Badge Langue & Région -->
                  <div class="absolute top-3 left-3 flex items-center gap-1.5">
                    <span class="px-2.5 py-0.5 rounded-lg bg-stone-950/85 border border-amber-500/40 text-amber-300 text-[10px] font-bold backdrop-blur-md">
                      ${story.languages ? story.languages[0] : 'Tradition'}
                    </span>
                  </div>

                  <div class="absolute bottom-3 right-3 text-[10px] text-stone-300 bg-stone-950/80 px-2 py-0.5 rounded-md font-mono">
                    ${story.duration || 'Conte oral'}
                  </div>
                </div>

                <!-- Contenu & Synopsis -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div class="space-y-1.5">
                    <div class="text-[11px] text-amber-400/90 font-medium">
                      ${story.regionName || story.place || 'Burkina Faso'}
                    </div>
                    <h3 class="text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors font-heading leading-snug line-clamp-2">
                      ${story.title}
                    </h3>
                    <p class="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      ${story.synopsis}
                    </p>
                  </div>

                  <!-- Lecteur audio intégré rapide -->
                  <div class="pt-2 border-t border-stone-800/80 space-y-2">
                    ${story.audioUrl ? `
                      <audio controls class="w-full h-8 rounded-lg accent-amber-500" preload="none">
                        <source src="${story.audioUrl}" type="audio/mpeg">
                      </audio>
                    ` : ''}

                    <div class="flex items-center justify-between text-xs pt-1">
                      <a href="#story/${story.id}" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                        <span>Lire le texte</span>
                        <span>→</span>
                      </a>
                      <a href="#campfire/${story.id}" class="text-stone-400 hover:text-amber-200 flex items-center gap-1 text-[11px]">
                        ${window.fasoIcon('flame', 'w-3 h-3 text-orange-400')}
                        <span>Veillée</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            `).join('')}
          </div>

        </section>

        <!-- ==================== SECTION 4 : LES HAUTS LIEUX DU FASO ==================== -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <span class="badge-culture">Patrimoine Mondial &amp; Mémoire</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-50 font-heading">
              Les Sanctuaires &amp; Trésors du Burkina Faso
            </h2>
            <p class="text-xs sm:text-sm text-stone-400">
              Des murailles de Loropéni aux fresques de Tiébélé, en passant par les cascades de Banfora et la cour du Mogho Naba.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div class="group relative rounded-2xl overflow-hidden h-44 sm:h-52 bg-stone-900 border border-stone-800">
              <img src="/static/assets/illustrations/etnies/loropeni-ruines.jpg" alt="Ruines de Loropéni UNESCO" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-3">
                <span class="text-[10px] text-amber-400 font-bold">UNESCO • Tannounyan</span>
                <span class="text-xs font-bold text-white font-heading">Ruines de Loropéni</span>
              </div>
            </div>

            <div class="group relative rounded-2xl overflow-hidden h-44 sm:h-52 bg-stone-900 border border-stone-800">
              <img src="/static/assets/illustrations/etnies/tiebele-case.jpg" alt="Cour Royale Peinte de Tiébélé UNESCO" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-3">
                <span class="text-[10px] text-amber-400 font-bold">UNESCO • Nazinon</span>
                <span class="text-xs font-bold text-white font-heading">Cour de Tiébélé</span>
              </div>
            </div>

            <div class="group relative rounded-2xl overflow-hidden h-44 sm:h-52 bg-stone-900 border border-stone-800">
              <img src="/static/assets/illustrations/etnies/ethnie-senoufo.jpg" alt="Cascades de Banfora & Dômes de Fabedougou" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-3">
                <span class="text-[10px] text-amber-400 font-bold">Nature • Djôrô</span>
                <span class="text-xs font-bold text-white font-heading">Cascades de Banfora</span>
              </div>
            </div>

            <div class="group relative rounded-2xl overflow-hidden h-44 sm:h-52 bg-stone-900 border border-stone-800">
              <img src="/static/assets/illustrations/etnies/ethnie-mossi.jpg" alt="Monument de Yennenga & Mogho Naba" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-3">
                <span class="text-[10px] text-amber-400 font-bold">Histoire • Kadiogo</span>
                <span class="text-xs font-bold text-white font-heading">Princesse Yennenga</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    `;

    this.initWelcomeRotator();
    this.mountHomeMap3D();
  }

  initWelcomeRotator() {
    const greetingEl = this.container.querySelector("#welcome-greeting-text");
    const meaningEl = this.container.querySelector("#welcome-meaning-text");
    const langBadge = this.container.querySelector("#welcome-lang-badge");
    const regionBadge = this.container.querySelector("#welcome-region-badge");
    const dots = this.container.querySelectorAll(".welcome-dot");

    const updateWelcome = (idx) => {
      this.currentWelcomeIndex = (idx + this.welcomeMessages.length) % this.welcomeMessages.length;
      const msg = this.welcomeMessages[this.currentWelcomeIndex];

      if (greetingEl) {
        greetingEl.style.opacity = "0";
        greetingEl.style.transform = "translateY(8px)";
        setTimeout(() => {
          greetingEl.textContent = msg.greeting;
          greetingEl.style.opacity = "1";
          greetingEl.style.transform = "translateY(0)";
        }, 200);
      }

      if (meaningEl) meaningEl.textContent = `« ${msg.meaning} »`;
      if (langBadge) langBadge.textContent = msg.lang;
      if (regionBadge) regionBadge.textContent = msg.region;

      dots.forEach((dot, i) => {
        if (i === this.currentWelcomeIndex) {
          dot.className = "welcome-dot w-5 h-2 rounded-full bg-amber-400 transition-all duration-300";
        } else {
          dot.className = "welcome-dot w-2 h-2 rounded-full bg-stone-700 transition-all duration-300";
        }
      });
    };

    // Défilement automatique toutes les 3,8 secondes
    if (this.welcomeInterval) clearInterval(this.welcomeInterval);
    this.welcomeInterval = setInterval(() => {
      updateWelcome(this.currentWelcomeIndex + 1);
    }, 3800);

    // Boutons Suivant / Précédent
    const btnNext = this.container.querySelector("#btn-welcome-next");
    const btnPrev = this.container.querySelector("#btn-welcome-prev");

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        clearInterval(this.welcomeInterval);
        updateWelcome(this.currentWelcomeIndex + 1);
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        clearInterval(this.welcomeInterval);
        updateWelcome(this.currentWelcomeIndex - 1);
      });
    }

    // Puces cliquables
    dots.forEach(d => {
      d.addEventListener("click", () => {
        clearInterval(this.welcomeInterval);
        const idx = parseInt(d.getAttribute("data-index"), 10);
        updateWelcome(idx);
      });
    });
  }

  mountHomeMap3D() {
    const slot = this.container.querySelector("#home-map3d-slot");
    if (!slot || !window.Faso17Map3D) return;
    new window.Faso17Map3D("home-map3d-slot");
  }

  unmount() {
    if (this.welcomeInterval) {
      clearInterval(this.welcomeInterval);
      this.welcomeInterval = null;
    }
  }
}

window.FasoHomeView = FasoHomeView;
