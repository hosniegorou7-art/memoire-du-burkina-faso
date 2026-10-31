/**
 * MÉMOIRE DU BURKINA — RÉPERTOIRE DES LANGUES NATIONALES DU BURKINA FASO
 * Données linguistiques, codes ISO 639-3, salutations traditionnelles et niveau de documentation.
 */

const FASO_LANGUAGES = [
  {
    code: "mos",
    nameFr: "Mooré",
    nativeName: "Mòoré",
    regions: ["Kadiogo", "Kuilsé", "Oubri", "Yaadga", "Nakambé", "Nando"],
    speakersCount: "Plus de 11 millions (majoritaire)",
    family: "Nigéro-congolaise • Gur (Voltaïque)",
    greeting: {
      native: "Ne y kiba !",
      phonetic: "Né i kiba",
      translation: "Bienvenue et que la paix soit sur vous !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 14
    }
  },
  {
    code: "dyu",
    nameFr: "Dioula",
    nativeName: "Julakan",
    regions: ["Guiriko", "Djôrô", "Bankui", "Sourou"],
    speakersCount: "Plus de 3 millions (Grande langue véhiculaire commerciale)",
    family: "Nigéro-congolaise • Mandé",
    greeting: {
      native: "Aw ni ce ! Aw bissimila !",
      phonetic: "Aou ni tché ! Aou bissimila !",
      translation: "Salutations fraternelles ! Soyez les très bienvenus !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 12
    }
  },
  {
    code: "ful",
    nameFr: "Fulfulde",
    nativeName: "Pulaar / Fulfulde",
    regions: ["Liptako", "Soum", "Yaadga", "Nakambé", "Sirba"],
    speakersCount: "Plus de 2 millions (Langue des éleveurs et poètes)",
    family: "Nigéro-congolaise • Atlantique",
    greeting: {
      native: "Jam na ! On jaraama !",
      phonetic: "Djam na ! On djaraama !",
      translation: "La paix soit avec vous ! Honneur et respect !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 9
    }
  },
  {
    code: "gux",
    nameFr: "Gulmancéma",
    nativeName: "Gùlmancéma",
    regions: ["Goulmou", "Tapoa", "Sirba"],
    speakersCount: "Environ 1.5 million",
    family: "Nigéro-congolaise • Gur",
    greeting: {
      native: "Yendie ! Finanli !",
      phonetic: "Yendié ! Finanli !",
      translation: "Paix sur vous et heureuse journée !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 6
    }
  },
  {
    code: "dgd",
    nameFr: "Dagara",
    nativeName: "Dagaare",
    regions: ["Tannounyan"],
    speakersCount: "Environ 600 000",
    family: "Nigéro-congolaise • Gur",
    greeting: {
      native: "Fo yir be !",
      phonetic: "Fo yir bé !",
      translation: "Soyez les bienvenus dans notre demeure !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 5
    }
  },
  {
    code: "bwm",
    nameFr: "Bwamu",
    nativeName: "Bwamu",
    regions: ["Bankui"],
    speakersCount: "Environ 400 000",
    family: "Nigéro-congolaise • Gur",
    greeting: {
      native: "Wa tian !",
      phonetic: "Oua tiane !",
      translation: "Salutations de paix sous l'arbre à palabres !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 4
    }
  },
  {
    code: "kss",
    nameFr: "Kassena",
    nativeName: "Kassem",
    regions: ["Nazinon"],
    speakersCount: "Environ 350 000",
    family: "Nigéro-congolaise • Grusi",
    greeting: {
      native: "N'golo !",
      phonetic: "N'golo !",
      translation: "Honneur et bénédiction des aînés !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 5
    }
  },
  {
    code: "lee",
    nameFr: "Lyélé",
    nativeName: "Lyele",
    regions: ["Nando"],
    speakersCount: "Environ 300 000",
    family: "Nigéro-congolaise • Grusi",
    greeting: {
      native: "Kourou !",
      phonetic: "Kourou !",
      translation: "Paix et bienvenue au village !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 4
    }
  },
  {
    code: "san",
    nameFr: "San",
    nativeName: "Sane / Samo",
    regions: ["Sourou", "Bankui"],
    speakersCount: "Environ 350 000",
    family: "Nigéro-congolaise • Mandé",
    greeting: {
      native: "Bisse ! Rakiré !",
      phonetic: "Bissé ! Rakiré !",
      translation: "Salutations fraternelles de parenté à plaisanterie !"
    },
    status: {
      audioDocumented: true,
      translationsAvailable: true,
      recordedVoicesCount: 4
    }
  }
];

window.FASO_LANGUAGES = FASO_LANGUAGES;
