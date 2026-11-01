/**
 * FASO CONTES & LÉGENDES - BASE DE DONNÉES CULTURELLE ET HISTORIQUE
 * Patrimoine oral du Burkina Faso (Mooré, Dioula, Fulfulde, Français)
 */

const FASO_REGIONS = [
  {
    id: "centre",
    name: "Centre",
    chefLieu: "Ouagadougou",
    peoples: ["Mossi"],
    languages: ["Mooré", "Français"],
    emblem: "L'Étalon de Yennenga & Palais du Mogho Naba",
    description: "Cœur historique du royaume Mossi, carrefour politique et culturel d'Afrique de l'Ouest.",
    coords: [12.37, -1.52],
    color: "#D97706"
  },
  {
    id: "hauts-bassins",
    name: "Hauts-Bassins",
    chefLieu: "Bobo-Dioulasso",
    peoples: ["Bobo", "Dioula", "Tiéfo", "Bwaba"],
    languages: ["Dioula", "Bobo", "Français"],
    emblem: "Les Silures Sacrés de Dafra & la Mosquée de Dioulassoba",
    description: "Capitale économique et culturelle, terre de musique, de kora, de balafon et de tolérance religieuse.",
    coords: [11.18, -4.29],
    color: "#2563EB"
  },
  {
    id: "sahel",
    name: "Sahel",
    chefLieu: "Dori",
    peoples: ["Peul", "Touareg", "Songhaï", "Bella"],
    languages: ["Fulfulde", "Tamasheq", "Songhaï", "Français"],
    emblem: "Les Dunes d'Oursi & les troupeaux Zébus sous le Pulaaku",
    description: "Vaste étendue sahélienne, berceau des poésies pastorales et de l'honneur de la parole donnée.",
    coords: [14.03, -0.03],
    color: "#EA580C"
  },
  {
    id: "cascades",
    name: "Cascades",
    chefLieu: "Banfora",
    peoples: ["Sénoufo", "Gouin", "Karaboro", "Turka"],
    languages: ["Dioula", "Sénoufo", "Gouin", "Français"],
    emblem: "Cascades de Karfiguéla & Dômes de Fabedougou",
    description: "Écrin de verdure et de falaises majestueuses, terre des forgerons sacrés et des danses de masques.",
    coords: [10.63, -4.76],
    color: "#059669"
  },
  {
    id: "sud-ouest",
    name: "Sud-Ouest",
    chefLieu: "Gaoua",
    peoples: ["Lobi", "Birifor", "Dagara"],
    languages: ["Dagara", "Lobi", "Français"],
    emblem: "Ruines de Loropéni (UNESCO) & Statuettes Bateba",
    description: "Royaume des bâtisseurs de pierre millénaires et de la spiritualité intime avec les esprits de la terre.",
    coords: [10.30, -3.53],
    color: "#9333EA"
  },
  {
    id: "centre-sud",
    name: "Centre-Sud",
    chefLieu: "Manga",
    peoples: ["Gourounsi", "Kasséna", "Nankana", "Mossi"],
    languages: ["Kassena", "Mooré", "Français"],
    emblem: "Cour Royale de Tiébélé & Peintures murales Kasséna",
    description: "Joyau d'architecture vernaculaire en terre crue peinte par les femmes selon des fresques géométriques séculaires.",
    coords: [11.09, -0.96],
    color: "#DC2626"
  },
  {
    id: "centre-ouest",
    name: "Centre-Ouest",
    chefLieu: "Koudougou",
    peoples: ["Gourounsi", "Mossi", "Nuni"],
    languages: ["Mooré", "Nuni", "Lyélé", "Français"],
    emblem: "Les Crocodiles Sacrés de Sabou & Théâtre du Faso",
    description: "Terre de sagesse et de pactes ancestraux de respect absolu entre hommes et animaux totemiques.",
    coords: [12.06, -2.23],
    color: "#0891B2"
  },
  {
    id: "boucle-mouhoun",
    name: "Boucle du Mouhoun",
    chefLieu: "Dédougou",
    peoples: ["Bwaba", "Samo", "Marka", "Ko"],
    languages: ["Bwamu", "San", "Dioula", "Français"],
    emblem: "Le fleuve Mouhoun & les Masques en feuilles de Dédougou",
    description: "Grenier du Burkina traversé par le grand fleuve Mouhoun, foyer du festival international des masques (FESTIMA).",
    coords: [12.46, -3.46],
    color: "#16A34A"
  },
  {
    id: "nord",
    name: "Nord",
    chefLieu: "Ouahigouya",
    peoples: ["Mossi", "Peul"],
    languages: ["Mooré", "Fulfulde", "Français"],
    emblem: "Royaume du Yatenga & la tombe de Naba Kango",
    description: "Ancien empire militaire du Yatenga, célèbre pour la technique agro-écologique ancestrale du Zaï.",
    coords: [13.58, -2.42],
    color: "#B45309"
  },
  {
    id: "plateau-central",
    name: "Plateau-Central",
    chefLieu: "Ziniaré",
    peoples: ["Mossi"],
    languages: ["Mooré", "Français"],
    emblem: "Sculptures sur granit de Laongo & Musée de Manéga",
    description: "Terre des sculpteurs sur pierre et sanctuaire de conservation des masques et fétiches sacrés du Faso.",
    coords: [12.58, -1.30],
    color: "#F59E0B"
  },
  {
    id: "centre-est",
    name: "Centre-Est",
    chefLieu: "Tenkodogo",
    peoples: ["Bissa", "Mossi", "Kousassé"],
    languages: ["Bissa", "Mooré", "Français"],
    emblem: "Royaume ancestral de Tenkodogo (Premier trône Mossi)",
    description: "Le berceau historique où s'unirent Rialé et la Princesse Yennenga pour donner naissance à la dynastie.",
    coords: [11.78, -0.37],
    color: "#C026D3"
  },
  {
    id: "centre-nord",
    name: "Centre-Nord",
    chefLieu: "Kaya",
    peoples: ["Mossi", "Peul"],
    languages: ["Mooré", "Fulfulde", "Français"],
    emblem: "Artisanat du Cuir de Kaya & Lac Dem",
    description: "Renommée nationale pour le travail d'orfèvre du cuir traditionnel et le tissage du Faso Dan Fani.",
    coords: [13.09, -1.08],
    color: "#4F46E5"
  },
  {
    id: "est",
    name: "Est",
    chefLieu: "Fada N'Gourma",
    peoples: ["Gourmantché"],
    languages: ["Gulmancema", "Français"],
    emblem: "Royaume du Gulmu & Falaises de Gobnangou",
    description: "Vaste contrée des chasseurs émérites et des guérisseurs traditionnels dépositaires du secret des arbres.",
    coords: [12.06, 0.36],
    color: "#0D9488"
  }
];

const FASO_STORIES = [
{
    "id": "suruku-ni-sonsannin",
    "title": "Suruku ni sonsannin (Le Lièvre et l'Hyène)",
    "nativeTitle": "Suruku ni sonsannin (15 Nziirin nziirin)",
    "regionId": "guiriko",
    "regionName": "Guiriko (Hauts-Bassins / Bobo-Dioulasso)",
    "place": "Bords du marigot de Sya",
    "category": "Conte Initiatique & Animalier",
    "ethnic": "Dioula / Bobo",
    "languages": [
      "Dioula",
      "Français"
    ],
    "duration": "4 min 30",
    "year": "Tradition orale séculaire",
    "heroImage": "etnies/ethnie-bwa-bougouli.jpg",
    "audioUrl": "/static/audio/suruku-ni-sonsannin.mp3",
    "textCredit": "© Texte dioula par Alou Keïta, Ouagadougou, Burkina Faso, 2021",
    "audioCredit": "© Audio lu par Afsatou Bokoum, Bobo-Dioulasso, Burkina Faso",
    "synopsis": "Suruku (l'hyène) et Sonsannin (le lièvre) partent pêcher au marigot. Le partage quotidien des prises met à l'épreuve leur confiance et leur solidarité jusqu'à ce que la cupidité de l'hyène se retourne contre elle.",
    "moral": "Un franc acquis honnêtement aujourd'hui vaut mieux que cinq francs promis demain. La ruse bienveillante punit toujours la cupidité.",
    "tags": [
      "Dioula",
      "Animaux",
      "Sagesse",
      "Bobo-Dioulasso"
    ],
    "chapters": [
      {
        "title": "1. Le partage des poissons",
        "textNative": "Lon dɔ suruku ni sonsannin bɛnna ka taga jigɛ minɛ. O lon fɔlɔ o ye jigɛ kelen le sɔrɔ. Sonsannin ko n teri jigɛ kelen ni mɔgɔ fila tilan ka gɛlɛn, jigɛ kelen di n ma sini ni an nana jigɛ fila sɔrɔ, e bina to ni jigɛ fila nin ye. Suruku ko basi te yen.",
        "textFr": "Un jour, l'hyène et le lièvre convinrent d'aller pêcher. Ce premier jour, ils n'attrapèrent qu'un seul poisson. Le lièvre dit : 'Mon ami, un seul poisson à partager entre deux personnes est difficile. Donnez-le moi, et si demain nous en prenons deux, vous aurez les deux'. L'hyène répondit qu'il n'y avait aucun problème."
      },
      {
        "title": "2. Une excuse pour s'éloigner",
        "textNative": "O dugusagɛ, o tagara jigɛminayɔrɔ ra, o ye naani sɔrɔ. Sonsannin ko a bi kuma, suruku ko a ma : kana kunko ɲini a te yɔrɔ min na. Sonsannin ko a ka yafa a ma, nga ale ka lumɔgɔw bi sara, a bina boli ka taga a ɲaɲini. Sonsannin bolila ka taga la suruku ka sira kan.",
        "textFr": "Le lendemain matin, ils retournèrent au lieu de pêche et attrapèrent quatre poissons. Le lièvre chercha un prétexte : 'Mes proches m'appellent de toute urgence, je dois courir les voir !' Le lièvre prit la fuite en emportant discrètement sa part sur le sentier."
      },
      {
        "title": "3. Suruku se rend compte",
        "textNative": "Suruku nana a ye ko sonsannin tun ye min fɔ o ye tiɲɛ le ye ka tɛmɛ ni a yɛrɛ ye. Sonsannin wulila ka taga la suruku ɲa fɛ tugunin. Suruku lɔra ka miiri ni a tun ye sonsannin fila nunu cɛ, a tun bi kɛ supu ɲanaman ye.",
        "textFr": "L'hyène resta seule à réfléchir. Si elle avait préparé les poissons pour faire une bonne soupe au lieu d'écouter les ruses du lièvre, elle ne serait pas là le ventre vide."
      },
      {
        "title": "4. La leçon des aïeux",
        "textNative": "A ye jigɛ bila, ko a be taga sonsannin kelen dɔ nin ta a nana a sɔrɔ ko Sonsannin wulila ka boli ni a ka jigɛ ye. A ma Sonsannin sɔrɔ, a ma a ka jigɛ fana sɔrɔ. O le ra, o ko bi ka dɔrɔmɛ kelen ka fisa ni sini duuru ye.",
        "textFr": "L'hyène abandonna ses poissons pour courir après le lièvre, mais à son retour, les poissons avaient disparu et le lièvre était loin ! C'est pourquoi les anciens disent : un franc aujourd'hui vaut mieux que cinq francs demain."
      }
    ],
    "sections": [
      {
        "title": "1. Le partage des poissons",
        "textNative": "Lon dɔ suruku ni sonsannin bɛnna ka taga jigɛ minɛ. O lon fɔlɔ o ye jigɛ kelen le sɔrɔ. Sonsannin ko n teri jigɛ kelen ni mɔgɔ fila tilan ka gɛlɛn, jigɛ kelen di n ma sini ni an nana jigɛ fila sɔrɔ, e bina to ni jigɛ fila nin ye. Suruku ko basi te yen.",
        "textFr": "Un jour, l'hyène et le lièvre convinrent d'aller pêcher. Ce premier jour, ils n'attrapèrent qu'un seul poisson. Le lièvre dit : 'Mon ami, un seul poisson à partager entre deux personnes est difficile. Donnez-le moi, et si demain nous en prenons deux, vous aurez les deux'. L'hyène répondit qu'il n'y avait aucun problème."
      },
      {
        "title": "2. Une excuse pour s'éloigner",
        "textNative": "O dugusagɛ, o tagara jigɛminayɔrɔ ra, o ye naani sɔrɔ. Sonsannin ko a bi kuma, suruku ko a ma : kana kunko ɲini a te yɔrɔ min na. Sonsannin ko a ka yafa a ma, nga ale ka lumɔgɔw bi sara, a bina boli ka taga a ɲaɲini. Sonsannin bolila ka taga la suruku ka sira kan.",
        "textFr": "Le lendemain matin, ils retournèrent au lieu de pêche et attrapèrent quatre poissons. Le lièvre chercha un prétexte : 'Mes proches m'appellent de toute urgence, je dois courir les voir !' Le lièvre prit la fuite en emportant discrètement sa part sur le sentier."
      },
      {
        "title": "3. Suruku se rend compte",
        "textNative": "Suruku nana a ye ko sonsannin tun ye min fɔ o ye tiɲɛ le ye ka tɛmɛ ni a yɛrɛ ye. Sonsannin wulila ka taga la suruku ɲa fɛ tugunin. Suruku lɔra ka miiri ni a tun ye sonsannin fila nunu cɛ, a tun bi kɛ supu ɲanaman ye.",
        "textFr": "L'hyène resta seule à réfléchir. Si elle avait préparé les poissons pour faire une bonne soupe au lieu d'écouter les ruses du lièvre, elle ne serait pas là le ventre vide."
      },
      {
        "title": "4. La leçon des aïeux",
        "textNative": "A ye jigɛ bila, ko a be taga sonsannin kelen dɔ nin ta a nana a sɔrɔ ko Sonsannin wulila ka boli ni a ka jigɛ ye. A ma Sonsannin sɔrɔ, a ma a ka jigɛ fana sɔrɔ. O le ra, o ko bi ka dɔrɔmɛ kelen ka fisa ni sini duuru ye.",
        "textFr": "L'hyène abandonna ses poissons pour courir après le lièvre, mais à son retour, les poissons avaient disparu et le lièvre était loin ! C'est pourquoi les anciens disent : un franc aujourd'hui vaut mieux que cinq francs demain."
      }
    ]
  },
  {
    "id": "soni-alla-waray",
    "title": "Soni so Alla waray, kaananke warataa!",
    "nativeTitle": "Soni so Alla waray, kaananke warataa! (Fulfulde)",
    "regionId": "soum",
    "regionName": "Sahel / Soum / Liptako",
    "place": "Oasis et pâturages du Sahel",
    "category": "Conte Pastoral & Sagesse",
    "ethnic": "Peul (Fulɓe)",
    "languages": [
      "Fulfulde",
      "Français"
    ],
    "duration": "5 min",
    "year": "Tradition pastorale",
    "heroImage": "etnies/ethnie-peul.jpg",
    "audioUrl": "/static/audio/soni-alla-waray.mp3",
    "audioCredit": "© Récit authentique transmis par Tijjaani Ba, Sahel burkinabè",
    "synopsis": "Si Dieu ne décrète pas la mort d'un être, nulle puissance terrestre ni souverain ne peut lui ôter la vie. La sagesse fulfulde de Tijjaani Ba sur la foi et le destin.",
    "moral": "La foi inébranlable et l'intégrité triomphent de l'orgueil des rois. Nul homme ne peut sceller le destin d'un autre sans la volonté céleste.",
    "tags": [
      "Fulfulde",
      "Sahel",
      "Destin",
      "Peul"
    ],
    "chapters": [
      {
        "title": "1. L'avertissement du sage",
        "textNative": "Soni so Alla waray, kaananke warataa! Goɗɗo wonnoo de, wawtu fu o wi'ataanaa soni Alla waray, ni kaananke warataa. Jakka na ɗum metti kaanankee hunnde.",
        "textFr": "Un homme sage répétait sans cesse : 'Si Dieu ne tue pas, le roi ne peut tuer !' Cela blessa profondément l'orgueil du roi qui décida de le mettre à mort par la ruse."
      },
      {
        "title": "2. Le pêcheur et la bague royale",
        "textNative": "Heddii kaananke itti fiyaare muuɗum, o addi fiyaare ndeen, o reeni o. Kaananke acci faa o dilli de wi'i goɗɗo soosoo addowa fiyaare nde, faɗɗa e maayo. Heɓa wara ƴamta o.",
        "textFr": "Le roi lui confia sa précieuse bague royale, puis ordonna secrètement qu'on la lui dérobe pour la jeter au fond du grand fleuve, afin de pouvoir accuser le sage de trahison."
      },
      {
        "title": "3. Le poisson providentiel",
        "textNative": "Suka gorko du wallaa nyaamdu so wanaa liƴƴi. Nde o faɗɗunoo nde fu liinga moɗi nde. Awottooɗo awooken heɓii linga ngaan fantii sottirii o. O huttunoo nga ni o tawi fiyaare nder reedu liinnga.",
        "textFr": "Un grand poisson avala l'anneau au fond de l'eau. Un humble jeune pêcheur captura ce poisson et, en le vidant, découvrit avec stupeur la bague royale dans ses entrailles."
      },
      {
        "title": "4. La sentence déjouée",
        "textNative": "Nyannde gom ni kaananke nilani suka gorko. O yottinoo ni o wi'aa o wadda fiyaare. Suka gorko wi'i gasii. Min kaa faa hannde, hannde e jaango fu, kaan keddii-mi nam jeerfoo. Soni so Alla waray fu, kaananke warataa!",
        "textFr": "Le roi convoqua le sage pour exiger la bague sous peine de décapitation immédiate. Le sage sortit l'anneau intact ! Le roi s'inclina devant la vérité éternelle : 'Si Dieu ne te condamne pas, le roi ne peut rien contre toi !'"
      }
    ],
    "sections": [
      {
        "title": "1. L'avertissement du sage",
        "textNative": "Soni so Alla waray, kaananke warataa! Goɗɗo wonnoo de, wawtu fu o wi'ataanaa soni Alla waray, ni kaananke warataa. Jakka na ɗum metti kaanankee hunnde.",
        "textFr": "Un homme sage répétait sans cesse : 'Si Dieu ne tue pas, le roi ne peut tuer !' Cela blessa profondément l'orgueil du roi qui décida de le mettre à mort par la ruse."
      },
      {
        "title": "2. Le pêcheur et la bague royale",
        "textNative": "Heddii kaananke itti fiyaare muuɗum, o addi fiyaare ndeen, o reeni o. Kaananke acci faa o dilli de wi'i goɗɗo soosoo addowa fiyaare nde, faɗɗa e maayo. Heɓa wara ƴamta o.",
        "textFr": "Le roi lui confia sa précieuse bague royale, puis ordonna secrètement qu'on la lui dérobe pour la jeter au fond du grand fleuve, afin de pouvoir accuser le sage de trahison."
      },
      {
        "title": "3. Le poisson providentiel",
        "textNative": "Suka gorko du wallaa nyaamdu so wanaa liƴƴi. Nde o faɗɗunoo nde fu liinga moɗi nde. Awottooɗo awooken heɓii linga ngaan fantii sottirii o. O huttunoo nga ni o tawi fiyaare nder reedu liinnga.",
        "textFr": "Un grand poisson avala l'anneau au fond de l'eau. Un humble jeune pêcheur captura ce poisson et, en le vidant, découvrit avec stupeur la bague royale dans ses entrailles."
      },
      {
        "title": "4. La sentence déjouée",
        "textNative": "Nyannde gom ni kaananke nilani suka gorko. O yottinoo ni o wi'aa o wadda fiyaare. Suka gorko wi'i gasii. Min kaa faa hannde, hannde e jaango fu, kaan keddii-mi nam jeerfoo. Soni so Alla waray fu, kaananke warataa!",
        "textFr": "Le roi convoqua le sage pour exiger la bague sous peine de décapitation immédiate. Le sage sortit l'anneau intact ! Le roi s'inclina devant la vérité éternelle : 'Si Dieu ne te condamne pas, le roi ne peut rien contre toi !'"
      }
    ]
  },
  {
    "id": "nin-keem",
    "title": "Nin-kẽem a yembr kibare (L'Enfant et le Lion)",
    "nativeTitle": "Nin-kẽem a yembr kibare (Mooré)",
    "regionId": "kadiogo",
    "regionName": "Kadiogo / Oubri (Centre)",
    "place": "Plateau mossi et collines rocheuses",
    "category": "Conte Moral & Initiatique",
    "ethnic": "Mossi",
    "languages": [
      "Mooré",
      "Français"
    ],
    "duration": "5 min 30",
    "year": "Tradition ancestrale",
    "heroImage": "etnies/ethnie-mossi.jpg",
    "audioUrl": "/static/audio/nin-keem.mp3",
    "audioCredit": "© Récit authentique transmis en langue Mooré",
    "synopsis": "Un enfant déjoue la ruse redoutable du lion Weoognaab et sauve son vieux père grâce à son écoute attentive, son chant rusé et sa présence d'esprit.",
    "moral": "Bɩ d ra kɩɩs d kambã noor wakat ning ye, d mi n kelgd-ba. N'ignorons jamais la clairvoyance des enfants, sachons les écouter avec sagesse.",
    "tags": [
      "Mooré",
      "Courage",
      "Lion",
      "Enfance"
    ],
    "chapters": [
      {
        "title": "1. Le départ en brousse",
        "textNative": "Nin-kẽem a yembr n wa n yik a zak pʋgẽ, n na n tɩ gõ weoogẽ. La, a bi-bilf a yembr yikame, t'a na n tũ-a lame. La, a ba wã tõdgame, t'a kõn tũ ye.",
        "textFr": "Un vieil homme quitta sa concession pour marcher en brousse. Son jeune fils insista pour l'accompagner, mais le père refusa car le chemin était semé de dangers."
      },
      {
        "title": "2. L'orage et la caverne du lion",
        "textNative": "B sẽn wa n ta we-raoogã pʋga, saag n kʋɩ, tɩ sebgã sɩng yikri. B zoe n tɩ kẽe tãng bokẽ, n na n sool saagã. Mik bokã yaa m ba Weoognaab roogo. M ba Weoognaab yɩɩll n yetẽ : 'Roog vũuda, roog vũud tɩ m meng be yɩng n daeeda'.",
        "textFr": "L'orage éclata avec fureur. Ils coururent s'abriter au creux d'une caverne qui était en réalité l'antre du lion Weoognaab. Le lion approcha en chantant avec fierté pour effrayer ses proies."
      },
      {
        "title": "3. La réponse rusée de l'enfant",
        "textNative": "Tɩ biigã leok-a : 'M pa sablem naaba, m pa zẽenem naaba, sã n pa beoogo, tõnd pa kuus ye.' M ba Weoognaab sẽn wʋm dẽ, a kɩdmame, n zoe n maan wa kɩlomɛtr a yiibu.",
        "textFr": "L'enfant prit la parole d'une voix grave et mystérieuse : 'Je ne crains ni le maître noir, ni le maître rouge !' En entendant cette voix surnaturelle, le lion terrifié prit la fuite à plus de deux kilomètres !"
      },
      {
        "title": "4. Le retour et la reconnaissance",
        "textNative": "Tɩ biigã tũnug m ba Weoognaab loogrã, n yi n dɩk sor n zoe n kuili. Wakat-kãng tɩ b taa yiri. Yaa woto, la biigã maan n fãag a ba wã, la a menga.",
        "textFr": "Profitant de la fuite du lion, l'enfant guida son père hors de la grotte et ils regagnèrent sains et saufs leur concession. C'est ainsi que l'enfant sauva la vie de son père."
      }
    ],
    "sections": [
      {
        "title": "1. Le départ en brousse",
        "textNative": "Nin-kẽem a yembr n wa n yik a zak pʋgẽ, n na n tɩ gõ weoogẽ. La, a bi-bilf a yembr yikame, t'a na n tũ-a lame. La, a ba wã tõdgame, t'a kõn tũ ye.",
        "textFr": "Un vieil homme quitta sa concession pour marcher en brousse. Son jeune fils insista pour l'accompagner, mais le père refusa car le chemin était semé de dangers."
      },
      {
        "title": "2. L'orage et la caverne du lion",
        "textNative": "B sẽn wa n ta we-raoogã pʋga, saag n kʋɩ, tɩ sebgã sɩng yikri. B zoe n tɩ kẽe tãng bokẽ, n na n sool saagã. Mik bokã yaa m ba Weoognaab roogo. M ba Weoognaab yɩɩll n yetẽ : 'Roog vũuda, roog vũud tɩ m meng be yɩng n daeeda'.",
        "textFr": "L'orage éclata avec fureur. Ils coururent s'abriter au creux d'une caverne qui était en réalité l'antre du lion Weoognaab. Le lion approcha en chantant avec fierté pour effrayer ses proies."
      },
      {
        "title": "3. La réponse rusée de l'enfant",
        "textNative": "Tɩ biigã leok-a : 'M pa sablem naaba, m pa zẽenem naaba, sã n pa beoogo, tõnd pa kuus ye.' M ba Weoognaab sẽn wʋm dẽ, a kɩdmame, n zoe n maan wa kɩlomɛtr a yiibu.",
        "textFr": "L'enfant prit la parole d'une voix grave et mystérieuse : 'Je ne crains ni le maître noir, ni le maître rouge !' En entendant cette voix surnaturelle, le lion terrifié prit la fuite à plus de deux kilomètres !"
      },
      {
        "title": "4. Le retour et la reconnaissance",
        "textNative": "Tɩ biigã tũnug m ba Weoognaab loogrã, n yi n dɩk sor n zoe n kuili. Wakat-kãng tɩ b taa yiri. Yaa woto, la biigã maan n fãag a ba wã, la a menga.",
        "textFr": "Profitant de la fuite du lion, l'enfant guida son père hors de la grotte et ils regagnèrent sains et saufs leur concession. C'est ainsi que l'enfant sauva la vie de son père."
      }
    ]
  },
  {
    "id": "conte-bissa",
    "title": "Conte traditionnel en langue Bissa",
    "nativeTitle": "Bissa gʋ-kibare",
    "regionId": "nakambe",
    "regionName": "Nakambé / Centre-Est (Garango)",
    "place": "Terroirs de Garango et rives du Nakambé",
    "category": "Conte & Récit Patrimonial",
    "ethnic": "Bissa",
    "languages": [
      "Bissa",
      "Français"
    ],
    "duration": "6 min",
    "year": "Tradition ancestrale",
    "heroImage": "etnies/femme-faso.jpg",
    "audioUrl": "/static/audio/conte-bissa.mp3",
    "audioCredit": "© Enregistrement patrimonial sonore direct en langue Bissa",
    "synopsis": "Enregistrement sonore patrimonial en langue Bissa transmis par les aînés de Garango. Ce récit célèbre la musicalité, la poésie et la mémoire de la communauté Bissa.",
    "moral": "La voix de la langue maternelle est le pont indestructible qui relie les générations à travers les siècles.",
    "tags": [
      "Bissa",
      "Garango",
      "Oralité",
      "Centre-Est"
    ],
    "chapters": [
      {
        "title": "1. Écouter le récit en langue Bissa",
        "textNative": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale.",
        "textFr": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale. Écoutez la diction authentique, le rythme et les inflexions poétiques de la langue Bissa enregistrée par les dépositaires de la tradition."
      }
    ],
    "sections": [
      {
        "title": "1. Écouter le récit en langue Bissa",
        "textNative": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale.",
        "textFr": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale. Écoutez la diction authentique, le rythme et les inflexions poétiques de la langue Bissa enregistrée par les dépositaires de la tradition."
      }
    ]
  },

  {
    id: "yennenga",
    title: "L'Épopée de la Princesse Yennenga et l'Étalon Blanc",
    nativeTitle: "Yennenga la wē-bīis naba (Mooré)",
    regionId: "centre",
    regionName: "Centre / Plateau-Central",
    place: "Royaume de Dagomba & Forêts du Sud (Tenkodogo)",
    category: "Légende Fondatrice",
    ethnic: "Mossi / Dagomba / Bissa",
    languages: ["Français", "Mooré"],
    duration: "6 min",
    year: "XIIe - XIIIe siècle",
    heroImage: "etnies/ethnie-mossi.jpg",
    synopsis: "Fille intrépide du roi Nedega, cavalière hors pair refusant d'être mariée de force, Yennenga s'élance sur son étalon fougueux pour conquérir sa liberté. Sa rencontre avec le chasseur Rialé donnera naissance à Ouedraogo, ancêtre du peuple Mossi.",
    audioGreeting: {
      moore: "Ne y kiba ! Yennenga yaa bãmb tẽng nengẽ pagbã tigsga.",
      french: "Salutations fraternelles ! Yennenga est la fierté et le courage des femmes du Faso."
    },
    sections: [
      {
        title: "1. La Vierge Guerrière de Gambaga",
        timeOffset: 0,
        textFr: "Au temps jadis, dans le royaume septentrional de Gambaga, vivait le roi Naba Nedega. Sa fille Yennenga n'avait pas son pareil au tir à l'arc, au maniement de la sagaie et à la monte des chevaux fougueux. Belle comme l'aube sur la savane, redoutable au combat, elle menait les troupes de son père à la victoire contre les envahisseurs. Le peuple l'adorait, mais son père refusait jalousement de la marier, ne pouvant supporter l'idée de perdre son meilleur bras armé.",
        textNative: "Kudum wakat, Gambaga tẽnga pʋgẽ, Naba Nedega n da be. A bi-pugl Yennenga zoeema ne we-rũng la tãosgo. A yɩɩ kãsenga n tɩ yɩɩda rao fãa. Ned fãa n da nong-a, la a ba wã da ka rat t'a kẽ kãadem ye, bala a da tara pãng n zabd a zaba.",
        annotation: "Naba : Titre royal chez les Mossi, désignant le chef ou le souverain détenteur du Naam (pouvoir légitime)."
      },
      {
        title: "2. La Graine de Gombo et la Révolte",
        timeOffset: 45,
        textFr: "Pour faire entendre raison à son père, Yennenga sema un champ de gombo. Lorsque les tiges mûrirent, elle laissa les gousses pourrir sur pied sans les cueillir. Intrigué et furieux de ce gâchis, le roi lui demanda des explications. Yennenga répondit avec dignité : 'Père, vous me laissez dépérir comme ce gombo qui a dépassé sa saison sans porter de semence fertile'. Hors de lui, le monarque l'enferma dans une case surveillée.",
        textNative: "Yennenga n tɩ bʋ koodo tɩ bii, la a bas tɩ b sãam tɩ ka koo ye. Naba wã n sok-a bʋʋdo. Yennenga leoke t'a lebgra wa kood ninga m bi n ka koo tɩ sãamã. Naba wã sũur pʋga, n kẽes-a roogo.",
        annotation: "Métaphore du gombo : Un grand classique de la rhétorique orale sahélienne où la femme affirme son droit à la maternité et à son propre destin."
      },
      {
        title: "3. La Chevauchée Nocturne sur l'Étalon Blanc",
        timeOffset: 95,
        textFr: "Une nuit sans lune, aidée par un garde fidèle, Yennenga vêtit ses habits d'homme, ceignit son carquois et s'enfuit au galop sur son étalon blanc pur. L'animal, habité d'une fougue surnaturelle, fendit les ténèbres, traversa des rivières en crue et s'enfonça au cœur d'une forêt sauvage du Sud, loin du royaume de son père. Épuisée mais libre, Yennenga mit pied à terre près d'une clairière luxuriante.",
        textNative: "Yung a ye, a yik n dɩk a we-rũng pɛɛlga n zoe. We-rũngã tʋka pãng n yiis-a tẽnga. A tɩ ta weoog tẽngẽ n bas a meng ne bãngr la vʋʋsem.",
        annotation: "L'étalon blanc : Symbole de pureté, de noblesse et de vitesse, devenu le symbole emblématique de la nation burkinabè ('Les Étalons')."
      },
      {
        title: "4. La Rencontre avec Rialé et la Naissance du Peuple",
        timeOffset: 150,
        textFr: "C'est dans cette forêt qu'elle fut découverte par Rialé, un prince solitaire et habile chasseur d'éléphants du peuple Bissa. Ébloui par la grâce et la noblesse de la cavalière, Rialé l'accueillit avec respect. De leur amour naquit un fils vigoureux. Yennenga le nomma 'Ouedraogo', ce qui signifie 'Cheval Mâle' ou 'Étalon', en hommage fidèle à la monture qui l'avait guidée vers sa liberté et son amour. Ouedraogo allait fonder le puissant royaume de Tenkodogo, premier pilier de l'Empire Mossi.",
        textNative: "Bissa tẽngẽ chasseur n boond Rialé n yã-a. B nonga taaba n dog bi-raoogo. Yennenga pʋd-a tɩ 'Wedraogo' (we-raoogo), n dɩk pãng n kogl a we-rũngã. Wedraogo n lebg naba kãsenga n lugl Mossi tẽnga.",
        annotation: "Ouedraogo : Patronyme aujourd'hui très répandu au Burkina Faso, reliant directement les porteurs de ce nom à la lignée de Yennenga."
      }
    ],
    moral: "Le destin d'un peuple naît du courage individuel de briser les chaînes et de la rencontre féconde entre cultures différentes.",
    tags: ["Émancipation", "Héroïsme", "Origines", "Royauté"]
  },
  {
    id: "dafra",
    title: "Les Silures Sacrés de Dafra",
    nativeTitle: "Dafra jɛgɛ senumanw kò (Dioula)",
    regionId: "hauts-bassins",
    regionName: "Hauts-Bassins",
    place: "Falaise de Dafra, Bobo-Dioulasso",
    category: "Mythe & Esprit de la Nature",
    ethnic: "Bobo / Dioula",
    languages: ["Français", "Dioula"],
    duration: "5 min",
    year: "Temps immémorial",
    heroImage: "dafra-hero.svg",
    synopsis: "Au fond d'une gorge spectaculaire sculptée dans la roche près de Bobo-Dioulasso nagent de gigantesques silures noirs. Considérés comme l'incarnation des ancêtres et des génies protecteurs de la cité, ces poissons sacrés reçoivent les vœux des pèlerins dans le respect d'un pacte inviolable.",
    audioGreeting: {
      dioula: "Aw ni ce ! Dafra jɛgɛw ye an bɛɛ fasa lajɛlen kɔnɔbara ye.",
      french: "Bienvenue à tous ! Les silures de Dafra veillent sur la paix et la fécondité de nos familles."
    },
    sections: [
      {
        title: "1. La Falaise Sacrée au Sud de Sya",
        timeOffset: 0,
        textFr: "À quelques kilomètres de l'ancienne cité de Sya (Bobo-Dioulasso), la terre s'ouvre sur un canyon vertigineux où coule une source pure et fraîche. Là, dans des vasques d'eau sombre sous la roche millénaire, vivent les silures sacrés de Dafra. Mesurant parfois plus d'un mètre, au cuir noir luisant et aux longues barbillons vénérables, ces créatures ne sont pas de simples poissons : elles sont le souffle vivant des génies tutélaires du pays Bobo.",
        textNative: "Sya dugu kɛrɛfɛ, kulu dɔ bɛ yen ka kɔrɔ kosɛbɛ. Dafra kɔ la, jɛgɛ finba caman bɛ yen. U tɛ jɛgɛ gansan ye, kɔbato ni binkannikɛlaw ka kɔlɔsiba de don.",
        annotation: "Sya : Nom d'origine de Bobo-Dioulasso, fondé par les Bobo au XIe siècle avant l'arrivée des marchands Dioula."
      },
      {
        title: "2. Le Pacte d'Alliance et les Vœux Ancestraux",
        timeOffset: 50,
        textFr: "Depuis des générations, hommes et femmes descendent le sentier escarpé pieds nus, le cœur purifié de toute rancœur. On apporte en offrande du dolo frais (bière de sorgho) et de la volaille préparée sans sel. Le devin gardien du marigot invoque les esprits par des incantations secrètes. Les silures émergent alors doucement des profondeurs à la surface, frôlant les mains des pèlerins sans aucune crainte, acceptant le tribut sacré.",
        textNative: "Mɔgɔw bɛ jiidijiidi ka taga Dafra ne cikanw ye : dɔlɔ, sisi sisan. Jɛgɛw bɛ yɛlɛ ji kɔnɔ ka na dumuni kɛ mɔgɔw tɛmɛ na. Ni vœu dɔ kɛra, a bɛ dafa n'i ye hakili saniya to.",
        annotation: "Dolo : Boisson traditionnelle fermentée à base de mil ou de sorgho rouge, élément central des libations et rituels au Burkina Faso."
      },
      {
        title: "3. Le Tabou Suprême et la Malédiction de la Pêche",
        timeOffset: 105,
        textFr: "Nul n'a le droit de pêcher, de blesser ou de consommer un silure de Dafra sous peine d'une mort foudroyante ou d'un malheur qui frapperait sa descendance sur sept générations. Une légende raconte qu'un voyageur imprudent tenta jadis d'en faire cuire un dans sa marmite : l'eau refusa de bouillir durant trois jours entiers, et le poisson sauta hors du feu intact pour replonger dans la falaise, laissant l'homme pétrifié de stupeur.",
        textNative: "Mɔgɔ si tɛ se ka Dafra jɛgɛ mina ka dun ! O ye haramu ye. Jɛgɛ min bɛ yen, an bɛɛ ka yafa n'an ka fanga de b'a kɔnɔ.",
        annotation: "Totémisme : Au Burkina Faso, le respect des espèces animales sacrées constitue un système ancestral d'écologie et de préservation de la biodiversité."
      }
    ],
    moral: "L'harmonie entre la nature, l'eau et les hommes repose sur le respect inconditionnel des pactes sacrés et la modération des désirs.",
    tags: ["Sacré", "Nature", "Totem", "Spiritualité"]
  },
  {
    id: "guimbi-ouattara",
    title: "Guimbi Ouattara, la Diplomate et Guerrière de Sya",
    nativeTitle: "Guimbi Ouattara, Sya cɛfarin muso (Dioula)",
    regionId: "hauts-bassins",
    regionName: "Hauts-Bassins",
    place: "Bobo-Dioulasso",
    category: "Récit Historique",
    ethnic: "Dioula / Mandingue",
    languages: ["Français", "Dioula"],
    duration: "5 min 30",
    year: "XIXe siècle (1836 - 1919)",
    heroImage: "etnies/masque-bobo.jpg",
    synopsis: "Grande dame d'État et stratège militaire respectée dans toute la sous-région, la princesse Guimbi Ouattara utilisa son intelligence politique, sa diplomatie et ses alliances pour préserver Bobo-Dioulasso des destructions guerrières qui ravageaient l'Afrique de l'Ouest au XIXe siècle.",
    audioGreeting: {
      dioula: "I ni ce ! Guimbi Ouattara kɛra hakilitigi muso ye min ye Bobo mara k'a lakana.",
      french: "Honneur à vous ! Guimbi Ouattara est l'icône de la diplomatie et du leadership féminin au Faso."
    },
    sections: [
      {
        title: "1. Une Fille de Prince élevée pour Régner",
        timeOffset: 0,
        textFr: "Née vers 1836 à Bobo-Dioulasso, Guimbi était la fille aînée de Diori Ouattara, chef de la dynastie royale de Kong installée dans le royaume de Sya. Dès son plus jeune âge, elle ne s'enferma pas dans les appartements privés : elle chevauchait aux côtés des guerriers, apprenait les traités commerciaux et maîtrisait l'art subtil de la négociation entre les multiples ethnies de la région.",
        textNative: "Guimbi Ouattara bangera k'a to Diori Ouattara bolo. A y'a kɛ muso kunsigi ye min tɛ siran foyi ɲɛ, a ye kɛlɛ kɛcogo ni dunan ladon cogo bɛɛ kalan.",
        annotation: "Kong : Ancien empire marchand florissant dont une branche fonda le royaume de Sya au Burkina Faso occidental."
      },
      {
        title: "2. Le Siège de Bobo et la Négociation Éclairée",
        timeOffset: 60,
        textFr: "Lorsque les grands conquérants et chefs de guerre traversèrent la région à la tête de milliers de cavaliers, la panique s'empara des cités voisines. Mais Guimbi Ouattara refusa la destruction inutile de son peuple. Elle accueillit les émissaires avec faste, offrant vivres, étoffes précieuses et garanties de paix, tout en disposant ses propres troupes en position de force dissuasive. Admiratifs devant son autorité sereine, les souverains renoncèrent au pillage de Sya.",
        textNative: "Kɛlɛtigiw nana waati min na, Guimbi m'a to dugu tiɲɛna. A ye hakiliɲuman kɛ, k'u bila kɛrɛ fɛ, ka dugu bɛɛ kisi maanaba la.",
        annotation: "Diplomatie préventive : Exemple historique rare au XIXe siècle où une femme exerçait un pouvoir de médiation souverain face aux armées impériales."
      },
      {
        title: "3. La Mémoire Vivante d'une Reine du Progrès",
        timeOffset: 120,
        textFr: "Jusqu'à sa mort en 1919, Guimbi Ouattara demeura la conseillère suprême écoutée de tous, finançant les écoles coraniques, protégeant les artisans forgerons et les marchands. Son mausolée, préservé avec respect au cœur de Bobo-Dioulasso, témoigne qu'une femme au Burkina Faso a su conjuguer bravoure martiale et pacification durable.",
        textNative: "Fɔ ka se a ka saya ma san 1919, mɔgɔ bɛɛ tun b'a kanto lamɛn. Guimbi ye bɔnya ni kuma tigi de ye dugu kɔnɔ.",
        annotation: "Mausolée Guimbi Ouattara : Site historique et touristique majeur situé dans le quartier Dioulassoba à Bobo-Dioulasso."
      }
    ],
    moral: "La force brute détruit les cités ; la sagesse diplomatique et l'intelligence protègent les peuples et bâtissent l'avenir.",
    tags: ["Leadership", "Diplomatie", "Histoire", "Paix"]
  },
  {
    id: "sabou",
    title: "Les Crocodiles Sacrés de Sabou",
    nativeTitle: "Sabou ebmẽ wã la bãmb zoodo (Mooré)",
    regionId: "centre-ouest",
    regionName: "Centre-Ouest",
    place: "Mare de Sabou, Boulkiemdé",
    category: "Alliance Totémique",
    ethnic: "Gourounsi / Mossi",
    languages: ["Français", "Mooré"],
    duration: "4 min 45",
    year: "XIVe siècle",
    heroImage: "etnies/fetiche-bateba.jpg",
    synopsis: "Égaré dans une savane impitoyable et assoiffé au point de voir la mort approcher, un valeureux chasseur fut secouru par un crocodile qui le guida vers une mare cachée. En signe de reconnaissance éternelle, le village conclut un pacte fraternel avec ces sauriens devenus intouchables.",
    audioGreeting: {
      moore: "Ne y kiba ! Sabou ebmẽ wã tara barka wusgo tẽnga nin-buiidã sʋka.",
      french: "Salutations de paix ! Les crocodiles de Sabou incarnent la gratitude et la bienveillance ancestrale."
    },
    sections: [
      {
        title: "1. La Soif Mortelle dans la Brousse Brûlante",
        timeOffset: 0,
        textFr: "Il y a des siècles de cela, un chasseur nommé Badaye parcourait la brousse aride pendant la saison sèche. Égaré loin de sa communauté, sa gourde vidée goutte à goutte par la chaleur accablante de l'Harmattan, il s'effondra au pied d'un baobab, la gorge en feu, attendant la fin inéluctable.",
        textNative: "Kudum wakat, we-rũng toagd a ye n da boond Badaye. A zoe n bãng t'a sãamda ne ko-kũum pãng Harmattan wakat pʋgẽ. A lʋɩ tiig tẽngr n tags tɩ kuum taame.",
        annotation: "Harmattan : Vent chaud et sec venu du Sahara qui souffle sur le Burkina Faso entre novembre et mars, asséchant la terre."
      },
      {
        title: "2. Le Sauveur à la Cuirasse d'Écailles",
        timeOffset: 45,
        textFr: "Soudain, le bruissement d'herbes sèches attira son regard éteint. Un immense crocodile sortait paisiblement d'un fourré. Loin d'attaquer l'homme affaibli, l'animal s'arrêta, tourna la tête à plusieurs reprises comme pour l'inviter à le suivre, puis glissa lentement vers un creux de rocher ombragé où miroitait une mare d'eau pure et bienfaisante. Badaye put boire, se baigner et reprendre vie.",
        textNative: "A yãa ebre kãsenga n yit bĩngẽ. Ebre wã ka nams-a ye, la a wilg-a sore n tɩ ta koom zĩiga t'a yũ n paam vum le paas.",
        annotation: "Crocodile du Nil (Crocodylus niloticus) : Révéré dans plusieurs mares sacrées d'Afrique de l'Ouest comme symbole de fertilité et maître de l'eau."
      },
      {
        title: "3. Le Pacte Sacré de Sabou",
        timeOffset: 95,
        textFr: "Rempli d'une profonde reconnaissance, Badaye fonda son village près de la mare et prononça un serment inviolable : 'Désormais, aucun enfant de ma lignée ne lèvera la main sur un crocodile, et nul crocodile ne blessera un être humain en ces lieux'. Depuis ce jour, à Sabou, les villageois nagent aux côtés des bêtes, les nourrissent de poulets et les enfants s'assoient même sur leur dos sans la moindre crainte.",
        textNative: "Badaye kãate ne Wẽnd tɩ ned ba a ye ka segd n kʋ ebre ye, la ebre fãa me ka segd n reeg nẽd zĩim ye. Hal n tãag rũndã, Sabou nebã la ebmẽ wã yaa zo-rãmba.",
        annotation: "Mares de Sabou et Bazoulé : Attractions mondialement connues démontrant la cohabitation pacifique millénaire entre humains et prédateurs sauvages."
      }
    ],
    moral: "La gratitude n'est pas une simple parole, mais une alliance durable qui transforme un ennemi redoutable en un frère protecteur.",
    tags: ["Totem", "Amitié", "Gratitude", "Animaux"]
  },
  {
    id: "lievre-hyene",
    title: "Le Lièvre, l'Hyène et le Puits de la Sécheresse",
    nativeTitle: "Soaamba la Wamdé ko-bʋgã zaba (Mooré / Dioula)",
    regionId: "boucle-mouhoun",
    regionName: "Boucle du Mouhoun",
    place: "Bords du fleuve Mouhoun (Black Volta)",
    category: "Conte Moral & Initiatique",
    ethnic: "Universel (Mossi, Dioula, Bwaba)",
    languages: ["Français", "Mooré", "Dioula"],
    duration: "6 min 15",
    year: "Tradition Orale Millénaire",
    heroImage: "lievre-hero.svg",
    synopsis: "Face à une terrible famine causée par le tarissement des eaux, tous les animaux de la savane décident de creuser un puits commun. L'hyène paresseuse et moqueuse refuse de se salir les pattes, préférant voler l'eau des autres. C'est le lièvre rusé qui lui donnera une leçon inoubliable.",
    audioGreeting: {
      moore: "Ne y kiba kamba la kãsemb ! Soaamba yaa yam la bãngr yel-bũndu.",
      dioula: "Aw bissimila ! Nsonsan ni Suruku ka maana bɛ an kalan hakilitigiya la.",
      french: "Bonjour petits et grands ! Le lièvre Soaamba nous enseigne que la ruse vaut mieux que la force brute !"
    },
    sections: [
      {
        title: "1. La Grande Soif des Animaux de la Savane",
        timeOffset: 0,
        textFr: "Le soleil dardait ses rayons impitoyables sur la savane. Les marigots étaient à sec, le sol craquelait comme une poterie brisée. Le Roi Lion convoqua tous les animaux sous le grand baobab : 'Mes frères, si nous ne nous unissons pas pour creuser un puits profond jusqu'au ventre de la terre, nous périrons tous !'. Tous applaudirent et prirent pioches et calebasses. Seule l'hyène ricana, prétextant un mal de reins pour aller dormir à l'ombre.",
        textNative: "Wĩntooga tula wusgo, koom ka be ye. Gampɛlga n bool rũmsã fãa tɩ b tʋg ko-bʋga. Fãa tʋma tʋʋmdã, la Wamdé (Suruku) yeta t'a pʋg n wãeda n zãgs tʋʋmdã.",
        annotation: "Soaamba (Lièvre) & Wamdé (Hyène) : Le duo inséparable des fables ouest-africaines, incarnant l'intelligence populaire face à la force cupide."
      },
      {
        title: "2. Le Vol Nocturne et la Garde Déjouée",
        timeOffset: 55,
        textFr: "Après trois jours d'efforts acharnés, une eau fraîche et limpide jaillit enfin du puits ! Les animaux fêtèrent leur labeur et décrétèrent que quiconque n'avait pas creusé n'aurait pas une goutte. Mais chaque nuit, l'hyène venait en douce dévaliser la réserve, souillant même l'eau restante. Les gardes successifs, l'éléphant puis le buffle, furent bernés par les flagorneries et les tours de l'effrontée.",
        textNative: "Koomã yii sũ-noogo pʋgẽ ! La Wamdé yuka yung fãa n zu koomã ka tʋm ye. Yʋm tʋʋmd gũusdba fãa n lʋɩ a ziri la a yel-wẽna pʋgẽ.",
        annotation: "Valeur du travail communautaire (Koom/Sossoat) : Le travail collectif est le socle de la survie dans les sociétés agraires soudano-sahéliennes."
      },
      {
        title: "3. Le Piège du Lièvre et la Statue de Glu",
        timeOffset: 110,
        textFr: "Le lièvre Soaamba sourit sous ses moustaches et dit : 'Laissez-moi la garde cette nuit'. Il sculpta une silhouette en bois, la recouvrit entièrement de glu noire collante issue de la sève du karité et plaça sur sa tête une calebasse remplie d'eau. Quand l'hyène arriva dans l'obscurité, elle prit la statue pour un insolent qui refusait de la saluer. Furieuse, elle lui asséna une gifle : sa patte droite resta collée ! Elle frappa de la gauche : collée ! Elle donna des coups de pied, puis un coup de tête : la voilà entièrement prisonnière de la glu jusqu'au lever du soleil sous les rires de toute la forêt.",
        textNative: "Soaamba dɩk tiig n tɩ bʋ bũmb n paas taor kooma. Wamdé nana yung n tɩ zab ne bũmb ning b tʋgã, n tɩ kẽes a nug la a noor fãa n bas a meng toogo. Beoog kãnga rũmsã fãa laoe-a-la wusgo !",
        annotation: "Le motif du mannequin de glu : Thème universel présent de l'Afrique de l'Ouest aux contes afro-américains (Br'er Rabbit et le Tar Baby)."
      }
    ],
    moral: "Celui qui refuse de participer au labeur commun n'a aucun droit d'en récolter les fruits ; la ruse bienveillante triomphe toujours de la malhonnêteté.",
    tags: ["Ruse", "Humour", "Solidarité", "Enfance"]
  },
  {
    id: "loropeni",
    title: "Le Mystère des Bâtisseurs des Ruines de Loropéni",
    nativeTitle: "Loropéni kulu dãgara bãngr (Dagara / Français)",
    regionId: "sud-ouest",
    regionName: "Sud-Ouest",
    place: "Loropéni, Province du Poni",
    category: "Récit Historique & Patrimoine",
    ethnic: "Lobi / Dagara / Kaan",
    languages: ["Français", "Dagara"],
    duration: "5 min 45",
    year: "XIe - XVIIe siècle (UNESCO)",
    heroImage: "etnies/loropeni-ruines.jpg",
    synopsis: "Érigées au cœur de la forêt du Sud-Ouest, d'immenses murailles de latérite taillée atteignant jusqu'à six mètres de haut cachent les secrets des rois de l'or. Témoins uniques des routes transsahariennes, les ruines de Loropéni racontent la grandeur oubliée des anciens empires miniers.",
    audioGreeting: {
      dagara: "Fo yir be ! Loropéni tẽng kparaga yaa te saamba yel-kãsenga.",
      french: "Soyez les bienvenus ! Les pierres de Loropéni murmurent la mémoire d'un millénaire de sagesse et de puissance."
    },
    sections: [
      {
        title: "1. La Forteresse de Pierre Oubliée dans la Jungle",
        timeOffset: 0,
        textFr: "Classées au Patrimoine Mondial de l'UNESCO en 2009, les ruines de Loropéni constituent le complexe fortifié en pierre le mieux préservé de toute l'Afrique de l'Ouest. Ses murs massifs en blocs de latérite taillée sans mortier ont bravé les siècles, les assauts guerriers et la végétation tropicale dévorante depuis plus d'un millénaire.",
        textNative: "Loropéni kparaga tãmsã wosa hal n yɩɩd yʋm tuhuri. A yaa bũmb kãsenga d saamba n da tʋme n sɩng lobi tẽnga.",
        annotation: "UNESCO : Premier site culturel du Burkina Faso inscrit sur la Liste du patrimoine mondial de l'humanité, marquant l'apogée des peuples Kaan et Kulango."
      },
      {
        title: "2. Les Seigneurs de l'Or et les Caravanes Sahariennes",
        timeOffset: 50,
        textFr: "La légende raconte que ces murailles protégeaient les trésors des souverains Kaan, gardiens des gisements aurifères qui alimentaient les caravanes vers Tombouctou, Djenné et les cours royales du Maroc et d'Europe. Des alchimistes réputés y fondaient l'or pur et invoquaient les génies de la roche pour que nul traître ne puisse cartographier les filons secrets.",
        textNative: "Wakat kãngã, sãnem n da yit tẽnga pʋgẽ n tɩ kẽed Timbuktu la sahel duguw bɛɛ kɔnɔ. Rãmb kãense kogl-a ne tãmsã pãng la yel-wẽna.",
        annotation: "L'or du Faso : Le Burkina Faso (anciennement Haute-Volta) a une tradition d'orpaillage artisanale remontant bien avant l'ère coloniale."
      },
      {
        title: "3. La Garde des Ancêtres et le Respect du Sanctuaire",
        timeOffset: 105,
        textFr: "Aujourd'hui encore, les anciens du pays Lobi recommandent de pénétrer dans l'enceinte sacrée avec déférence. Les oiseaux s'y taisent à la tombée de la nuit, et certains disent entendre les marteaux invisibles des forgerons d'antan continuer leur œuvre éternelle sous la clarté des étoiles.",
        textNative: "Zaabre fãa, yel-kãsenga bɛ yen. An segd n zãag d meng ne tãmsã n waoog saamba.",
        annotation: "Esprits Bateba : Figures sculptées lobi servant d'intercesseurs avec le monde spirituel (Thil) pour la protection du foyer et de la communauté."
      }
    ],
    moral: "Les empires matériels finissent par s'effacer, mais les pierres façonnées avec honneur continuent d'instruire les générations futures.",
    tags: ["UNESCO", "Histoire", "Architecture", "Mystère"]
  },
  {
    id: "berger-sahel",
    title: "Le Berger Peul et le Génie du Sahel",
    nativeTitle: "Gaynaako e Jinnaaru Sahel (Fulfulde / Français)",
    regionId: "sahel",
    regionName: "Sahel",
    place: "Dunes d'Oursi, Dori & Gorom-Gorom",
    category: "Légende Pastorale",
    ethnic: "Peul (Fulani)",
    languages: ["Français", "Fulfulde"],
    duration: "5 min",
    year: "XVe siècle",
    heroImage: "etnies/ethnie-peul.jpg",
    synopsis: "Au cœur du désert sahélien, un jeune berger nommé Amadou se voit proposer par un génie des mares une source d'eau inépuisable s'il accepte de trahir sa parole d'honneur. Fidèle au code sacré du Pulaaku, Amadou prouve que la dignité morale vaut plus que tous les trésors du monde.",
    audioGreeting: {
      fulfulde: "Jam na ! On jaraama ! Pulaaku woni teddungal e enɗam leñol Fulɓe.",
      french: "La paix soit avec vous ! Le Pulaaku est l'honneur, la retenue et la noblesse d'âme des enfants du Sahel."
    },
    sections: [
      {
        title: "1. La Transhumance sous le Ciel d'Ocre",
        timeOffset: 0,
        textFr: "Entre les collines de Dori et les grandes dunes d'Oursi, le jeune berger Amadou guidait le troupeau de zébus bossus de son clan. Sa flûte de roseau modulait des mélodies douces qui apaisaient les bêtes assoiffées. C'était la saison du 'Ceedo' (la grande saison sèche), et l'herbe se faisait rare comme la rosée du matin.",
        textNative: "Amadou gaynaako suka gorko ina ɗowoo jawdi mum hakkunde Dori e Oursi. Liital makko ina wulla seese, jawdi ina hettindoo e nder Ceedo ɓooyɗo.",
        annotation: "Ceedo : Terme fulfulde désignant la période la plus torride de l'année au Sahel avant les premières pluies salvatrices."
      },
      {
        title: "2. L'Apparition au Bord de la Mare Asséchée",
        timeOffset: 50,
        textFr: "Tandis que le crépuscule rougissait l'horizon, une forme vaporeuse et resplendissante émergea du lit asséché du marigot. C'était le génie gardien des eaux souterraines. Il s'adressa à Amadou : 'Jeune homme, je peux faire jaillir pour ton troupeau une source d'eau d'une pureté cristalline qui ne s'arrêtera jamais. En échange, tu dois me livrer le bélier blanc destiné au banquet de réconciliation de ton village'.",
        textNative: "Jinnaaru ndiyam yalti e woyndu nde heewaani, wiyi Amadou : 'Mi rokkete ndiyam keewɗam ngam jawdi maa, kono rokkam mbaalu ndaneewu ngu kawtidin-ɗaa e yimɓe wuro maa'.",
        annotation: "Nagge & Jawdi : La vache et le bétail chez les Peuls ne sont pas une simple monnaie marchande, mais un compagnon mystique de l'homme."
      },
      {
        title: "3. Le Triomphe du Pulaaku",
        timeOffset: 100,
        textFr: "Amadou redressa fièrement son chapeau conique en paille et cuir et répondit sans trembler : 'Jamais ! Ce bélier scelle la paix entre deux familles rivales. Un Peul préfère voir ses yeux s'éteindre de soif plutôt que de brûler sa parole d'honneur et trahir le Pulaaku !'. Ému par tant de grandeur d'âme, le génie s'inclina : 'Tu es un véritable noble de cœur'. D'un coup de sceptre, il fit jaillir trois puits d'eau douce sans exiger aucune contrepartie, sauvant à la fois les troupeaux et la concorde humaine.",
        textNative: "Amadou wiyi : 'A'a ! Pullo soodaata pulaaku mum ngam ndiyam. Teddungal ɓuri nguurndam !' Jinnaaru wiyi : 'A heɓi barke'. Ndiyam ɗon yalti ngam yimɓe fof.",
        annotation: "Pulaaku : Système éthique et philosophique des Peuls, basé sur le Semteende (retenue et pudeur), le Munyal (patience) et le Ngorgu (courage)."
      }
    ],
    moral: "La dignité et le respect de la parole donnée éclairent l'obscurité et ouvrent les sources les plus profondes du monde.",
    tags: ["Honneur", "Sahel", "Éthique", "Pulaaku"]
  },
  {
    id: "tiebele",
    title: "Les Murs Peints de Tiébélé et la Sagesse Kasséna",
    nativeTitle: "Tiébélé kora na luri zõnga (Kassena / Mooré)",
    regionId: "centre-sud",
    regionName: "Centre-Sud",
    place: "Cour Royale de Tiébélé, Province du Nahouri",
    category: "Art & Sagesse Ancestrale",
    ethnic: "Gourounsi / Kasséna",
    languages: ["Français", "Mooré", "Kassena"],
    duration: "5 min 15",
    year: "XVIe siècle à nos jours",
    heroImage: "etnies/tiebele-case.jpg",
    synopsis: "À Tiébélé, les femmes kasséna peignent à la main des chefs-d'œuvre de fresques géométriques à base de craie blanche, de graphite noir et de latérite rouge sur les maisons de terre fortifiées. Chaque symbole raconte une philosophie de vie, un pacte de paix et la mémoire du peuple.",
    audioGreeting: {
      kassena: "N'golo ! Tiébélé ye chichirigu na womo dedoa kora.",
      french: "Salutations de paix ! Bienvenue dans la majestueuse cour royale de Tiébélé, sanctuaire d'art et d'histoire."
    },
    sections: [
      {
        title: "1. La Forteresse de Terre Vernie aux Mille Motifs",
        timeOffset: 0,
        textFr: "Au pied des collines de granite du Nahouri se dresse la Cour Royale de Tiébélé. Construites en banco selon des formes circulaires ou en huit pour dérouter les flèches des assaillants, ces habitations royales sont dépourvues de fenêtres et possèdent de petites portes basses obligeant quiconque à se courber avec humilité pour franchir le seuil.",
        textNative: "Tiébélé tẽnga yaa tẽng kãsenga Nahouri tẽngrẽ. Roog kãense meebã tara bãngr la yel-wẽn koglgo tɩ bɩɩd ba a ye ka sebr n kẽ fãngẽ ye.",
        annotation: "Architecture défensive soukholo : Conçue pour que l'agresseur soit obligé d'entrer accroupi, le rendant instantanément vulnérable au défenseur."
      },
      {
        title: "2. Les Mains des Femmes qui Écrivent le Monde",
        timeOffset: 50,
        textFr: "Après les récoltes, ce sont exclusivement les femmes du village qui prennent en main la restauration des façades. Utilisant de l'argile noire, du kaolin blanc et de la pierre volcanique rouge broyée, polie avec des galets de fleuve et vernie à la décoction de gousses de néré, elles tracent des motifs symboliques : le losange pour la fertilité, les chevrons pour les côtes du serpent sacré, et la calebasse pour l'abondance.",
        textNative: "Koodo poore, pagbã n dɩkd b nugu n peind rooto ne tãng-pɛɛlga la sablga. B gʋlsda bũmb fãa ne bãngr la vʋʋsem.",
        annotation: "Néré (Parkia biglobosa) : Arbre d'or d'Afrique dont les graines fermentées produisent le Soumbala et dont les cosses servent de vernis étanche naturel."
      },
      {
        title: "3. La Mémoire qui ne s'Efface Pas",
        timeOffset: 105,
        textFr: "Chaque maison est une bibliothèque vivante à ciel ouvert. Les jeunes filles s'assoient aux côtés de leurs grands-mères pour apprendre la signification des lignes brisées et des spirales d'éternité. À travers ces peintures, le peuple Kasséna transmet que la beauté n'est jamais vaine : elle est un rempart contre l'oubli et une célébration sacrée de la communauté.",
        textNative: "Bɩ-pugli fãa zãmsda a yaaba nengẽ tɩ bãngrã ka kong beoog ye. Tiébélé tẽnga pʋgẽ, lalgã yaa zãmsgo la sũ-noogo.",
        annotation: "Candidature UNESCO : Tiébélé a été officiellement inscrit au patrimoine mondial de l'humanité pour la valeur universelle exceptionnelle de ses savoir-faire."
      }
    ],
    moral: "L'art n'est pas un ornement superflu, mais le bouclier protecteur de la mémoire et le lien sacré qui unit les générations.",
    tags: ["Art", "Architecture", "Femmes", "Transmission"]
  }
];

const FASO_GLOSSARY = [
  { term: "Naba", def: "Chef traditionnel ou souverain dans la société Mossi, garant des coutumes et investi du pouvoir sacré (Naam)." },
  { term: "Mogho Naba", def: "Le roi du monde ou souverain suprême des Mossi, résidant à Ouagadougou où se déroule chaque vendredi le rituel de son faux départ." },
  { term: "Faso Dan Fani", def: "Tissu traditionnel tissé à la main au Burkina Faso en fils de coton pur, symbole d'identité culturelle et de patriotisme prôné par Thomas Sankara." },
  { term: "Dolo", def: "Bière artisanale traditionnelle d'Afrique de l'Ouest fermentée à base de sorgho rouge ou de mil, indispensable aux cérémonies et libations." },
  { term: "Pulaaku", def: "Code moral et éthique ancestral du peuple Peul, articulé autour de la dignité, la réserve, le courage et la fidélité absolue à la parole." },
  { term: "Kora", def: "Harpe-luth traditionnelle ouest-africaine à 21 cordes en calebasse et peau de vache, instrument roi des récits épiques des griots." },
  { term: "Balafon", def: "Xylophone traditionnel à lames de bois et résonateurs en calebasses, né dans l'empire mandingue et emblématique du pays Bobo et Sénoufo." },
  { term: "Wack", def: "Terme populaire désignant les pratiques mystiques, amulettes ou protections magiques dans les croyances traditionnelles burkinabè." },
  { term: "Soumbala", def: "Condiment traditionnel très nutritif obtenu par fermentation naturelle des graines de néré, pilier de la gastronomie burkinabè." },
  { term: "Zaï", def: "Méthode agroécologique ancestrale réhabilitée au Yatenga par Yacouba Sawadogo, consistant à creuser des poquets retenant l'eau et le compost." }
];

const FASO_PROVERBS = [
  {
    proverb: "Si la termitière vit, elle ajoute de la terre à la terre.",
    native: "Ku-kʋk n vɩɩndame n paasd tẽnga pãng.",
    lang: "Mooré",
    meaning: "Chacun doit apporter chaque jour sa pierre pour faire grandir et prospérer la communauté."
  },
  {
    proverb: "L'eau qui a servi à laver la kora n'étanche pas la soif, mais réjouit le cœur.",
    native: "Kora koom bɛ dusu diyara.",
    lang: "Dioula",
    meaning: "La parole des poètes et la musique sont indispensables pour nourrir l'esprit au-delà du seul pain matériel."
  },
  {
    proverb: "Même si la nuit s'éternise, le soleil finira toujours par se lever.",
    native: "Hay so jemma ɓooyii, jaango ina warata.",
    lang: "Fulfulde",
    meaning: "L'épreuve est passagère ; la patience et l'espérance finissent toujours par triompher de l'obscurité."
  },
  {
    proverb: "On ne montre pas la route du village à un étranger avec l'index de la main gauche.",
    native: "Ned ka wilgd sore ne gaoob nug ye.",
    lang: "Mooré",
    meaning: "L'hospitalité requiert respect absolu, chaleur et politesse envers quiconque arrive chez soi."
  }
];

const FASO_QUIZ = [
  {
    question: "Qui était la mère du prince Ouedraogo, ancêtre fondateur des royaumes Mossi ?",
    options: ["La reine Guimbi Ouattara", "La Princesse Yennenga", "Aoua Keïta", "Sarraounia Mangou"],
    correct: 1,
    explanation: "La Princesse Yennenga, fille du roi Naba Nedega de Gambaga, mit au monde Ouedraogo ('étalon') après sa rencontre avec le chasseur Rialé."
  },
  {
    question: "Dans quelle ville peut-on admirer les célèbres Silures Sacrés dans la falaise de Dafra ?",
    options: ["Ouagadougou", "Koudougou", "Bobo-Dioulasso", "Dori"],
    correct: 2,
    explanation: "La falaise sacrée de Dafra se trouve aux portes de Bobo-Dioulasso dans les Hauts-Bassins."
  },
  {
    question: "Quelle est la particularité des animaux de la mare sacrée de Sabou ?",
    options: ["Ce sont des crocodiles inoffensifs protégés par un pacte sacré", "Ce sont des poissons géants multicolores", "Ce sont des tortues centenaires messagères", "Ce sont des oiseaux migrateurs dorés"],
    correct: 0,
    explanation: "À Sabou, un pacte séculaire lie les habitants aux crocodiles sacrés, qui cohabitent pacifiquement avec les humains."
  },
  {
    question: "Quel site culturel burkinabè est inscrit au Patrimoine Mondial de l'UNESCO pour ses imposantes murailles de pierre vieilles de 1000 ans ?",
    options: ["Les sculptures de Laongo", "Les Ruines de Loropéni", "Le dôme de Fabedougou", "La cour de Tiébélé"],
    correct: 1,
    explanation: "Les Ruines de Loropéni dans le Sud-Ouest ont été le premier site burkinabè inscrit au Patrimoine Mondial de l'UNESCO en 2009."
  },
  {
    question: "Quel est le nom du code moral, éthique et d'honneur chez le peuple Peul du Sahel ?",
    options: ["Le Zaï", "Le Pulaaku", "Le Naaba", "Le Dolo"],
    correct: 1,
    explanation: "Le Pulaaku est le code d'honneur peul caractérisé par la retenue, la patience, la dignité et la fidélité indéfectible à la parole donnée."
  },
  {
    question: "Quel condiment traditionnel indispensable est fabriqué à partir des graines fermentées de l'arbre néré ?",
    options: ["Le Soumbala", "Le Gombo", "Le Bissap", "Le Dégué"],
    correct: 0,
    explanation: "Le Soumbala est obtenu par cuisson et fermentation naturelle des graines de néré, parfumé et riche en protéines."
  },
  {
    question: "Que signifie le nom du fils de Yennenga, 'Ouedraogo' ?",
    options: ["L'Aigle royal", "Cheval mâle ou Étalon", "Le Lion vainqueur", "L'Arbre sacré"],
    correct: 1,
    explanation: "Ouedraogo signifie 'cheval mâle' ou 'étalon' en Mooré, donné en hommage à la monture qui guida la princesse vers la liberté."
  },
  {
    question: "Dans la fable traditionnelle du Faso, quel personnage incarne la ruse et l'intelligence face à la force brute ?",
    options: ["Le Lièvre (Soaamba)", "L'Hyène (Wamdé)", "L'Éléphant", "Le Léopard"],
    correct: 0,
    explanation: "Le lièvre Soaamba est l'éternel héros rusé des contes ouest-africains qui triomphe par l'esprit et l'ingéniosité."
  },
  {
    question: "Quelle est la capitale administrative de la région de Kadiogo dans le nouveau découpage administratif officiel du Burkina Faso en 17 régions ?",
    options: ["Koudougou", "Ouagadougou", "Manga", "Ziniaré"],
    correct: 1,
    explanation: "Ouagadougou, capitale nationale du Burkina Faso, est le chef-lieu de la région de Kadiogo dans l'organisation administrative officielle en 17 régions."
  },
  {
    question: "La région de Liptako, dans le découpage en 17 régions, est historiquement réputée pour :",
    options: ["La culture exclusive du coton humide", "Ses traditions pastorales peules, ses zébus et les poésies du Sahel", "Les cascades et falaises de Karfiguéla", "Les ruines de pierre fortifiée de Loropéni"],
    correct: 1,
    explanation: "La région de Liptako (chef-lieu Dori) est au cœur de la zone sahélienne pastorale, terre d'éleveurs peuls, de zébus et de respect scrupuleux du Pulaaku."
  },
  {
    question: "Parmi les 17 régions du Burkina Faso, laquelle tire son nom du fleuve mythique autrefois appelé Volta Blanche ?",
    options: ["Nakambé", "Guiriko", "Sirba", "Goulmou"],
    correct: 0,
    explanation: "La région de Nakambé tire son nom du fleuve Nakambé (anciennement Volta Blanche), qui traverse le plateau central burkinabè."
  },
  {
    question: "Quel nom porte la région qui abrite les Cascades de Karfiguéla, les Dômes de Fabedougou et les Pics de Sindou ?",
    options: ["Guiriko", "Tannounyan", "Sourou", "Nando"],
    correct: 1,
    explanation: "La région de Tannounyan (chef-lieu Banfora) englobe les spectaculaires formations géologiques des Cascades, des Dômes de Fabedougou et des Pics de Sindou."
  },
  {
    question: "Le célèbre tissu artisanal burkinabè tissé à la main en coton pur, promu par Thomas Sankara comme étendard de souveraineté, est :",
    options: ["Le Kente", "Le Boubou en bazin", "Le Faso Dan Fani", "Le Korhogo"],
    correct: 2,
    explanation: "Le Faso Dan Fani ('tissu tissé de la patrie') est le symbole patrimonial de la créativité et de l'émancipation économique burkinabè."
  },
  {
    question: "Combien de régions administratives officielles structurent désormais l'intégralité du territoire du Burkina Faso ?",
    options: ["10 régions", "13 régions (ancien découpage caduc)", "17 régions", "21 régions"],
    correct: 2,
    explanation: "Le Burkina Faso est officiellement structuré en 17 régions administratives (Bankui, Djôrô, Goulmou, Guiriko, Kadiogo, Kuilsé, Liptako, Nakambé, Nando, Nazinon, Oubri, Sirba, Soum, Sourou, Tapoa, Tannounyan, Yaadga)."
  }
];

const FASO_INTERACTIVE_ADVENTURE = {
  id: "aventure-yennenga",
  title: "L'Épreuve de Yennenga : Le Choix de la Liberté",
  description: "Entrez dans la peau de la princesse guerrière. À chaque tournant de votre destinée, prenez la décision qui forgera le futur du peuple.",
  startNode: "depart",
  nodes: {
    depart: {
      text: "Le soleil darde ses derniers rayons pourpres sur le palais de Gambaga. Votre père, le roi Naba Nedega, vient de rejeter avec colère votre demande de fonder un foyer et vous ordonne de préparer vos troupes pour une nouvelle campagne de guerre. Vous êtes seule dans votre case d'armes.",
      choices: [
        {
          text: "Obéir à votre père et mener une nouvelle fois la bataille pour prouver votre loyauté.",
          target: "bataille"
        },
        {
          text: "Planter un champ de gombo et le laisser pourrir pour lui faire comprendre sa folie par la sagesse de la terre.",
          target: "gombo"
        },
        {
          text: "Enfourcher immédiatement votre étalon blanc en pleine nuit et fuir vers le Sud inconnu.",
          target: "fuite_directe"
        }
      ]
    },
    bataille: {
      text: "Vous remportez une victoire éclatante contre les assaillants. Votre père célèbre votre gloire par de grands banquets de dolo, mais son étau se resserre encore davantage : il refuse toujours votre liberté. Les saisons passent et votre cœur s'assombrit.",
      choices: [
        {
          text: "Cette fois, trop c'est trop. Préparer secrètement votre fuite avec l'aide d'un garde fidèle.",
          target: "fuite_nocturne"
        },
        {
          text: "Tenter une confrontation verbale sous l'arbre à palabres devant les notables du conseil des anciens.",
          target: "palabres"
        }
      ]
    },
    gombo: {
      text: "Votre champ de gombo pourri suscite l'émoi dans le royaume. Le roi vient en personne vous interroger. Votre métaphore sur la saison de la femme qui passe sans semence frappe son cœur de souverain, mais blesse son orgueil de patriarche. Il vous assigne à résidence sous haute surveillance.",
      choices: [
        {
          text: "Profiter du sommeil du garde pour vous glisser dans l'écurie et harnacher votre étalon blanc.",
          target: "fuite_nocturne"
        },
        {
          text: "Attendre le jour du grand sacrifice des ancêtres pour implorer la bénédiction des esprits.",
          target: "sacrifice"
        }
      ]
    },
    fuite_directe: {
      text: "Prise d'un élan spontané, vous partez au grand galop. Les sentinelles lancent l'alerte ! Une escouade de cavaliers d'élite se lance à vos trousses à travers la savane épineuse.",
      choices: [
        {
          text: "Faire faire volte-face à votre étalon pour affronter les cavaliers avec votre arc d'ébène.",
          target: "combat_garde"
        },
        {
          text: "Faire confiance à l'instinct de votre étalon et vous enfoncer dans les gorges marécageuses du Sud.",
          target: "foret_sauvage"
        }
      ]
    },
    fuite_nocturne: {
      text: "Vêtue de tuniques d'homme en Faso Dan Fani, arc au dos et flèches empoisonnées à la ceinture, vous sautez sur le dos de votre noble étalon blanc. Dans le silence absolu de la nuit sahélienne, vous quittez la cité endormie sans éveiller le moindre soupçon.",
      choices: [
        {
          text: "Prendre la piste des caravanes de sel vers l'Est.",
          target: "caravane"
        },
        {
          text: "Suivre le cours de la rivière Nakambé vers les épaisses forêts giboyeuses du Sud.",
          target: "foret_sauvage"
        }
      ]
    },
    foret_sauvage: {
      text: "Après des jours d'une chevauchée exténuante, votre monture vous mène au cœur d'une clairière luxuriante près de Tenkodogo. Soudain, un imposant chasseur solitaire armé d'un épieu à éléphant émerge des taillis. Ses yeux brillent d'un profond respect devant votre prestance.",
      choices: [
        {
          text: "Bander votre arc et exiger qu'il décline immédiatement son identité et son clan.",
          target: "dialogue_chasseur"
        },
        {
          text: "Mettre pied à terre en signe d'hospitalité et lui tendre une gourde d'eau en disant 'Ne y kiba'.",
          target: "rencontre_riale"
        }
      ]
    },
    rencontre_riale: {
      isEnding: true,
      text: "L'homme baisse son arme et s'incline : 'Je suis Rialé, chasseur d'éléphants du peuple Bissa'. Entre vous naît une estime instantanée qui fleurit en un amour légendaire. De votre union naîtra Ouedraogo, le vaillant étalon qui fondera l'empire Mossi ! Votre nom résonnera pour l'éternité comme la mère fondatrice de la nation burkinabè.",
      badge: "Fondatrice de l'Empire Mossi"
    },
    dialogue_chasseur: {
      isEnding: true,
      text: "Impressionné par votre intrépidité, l'homme sourit et dépose son épieu au sol : 'Nul homme ne m'a jamais regardé avec un tel feu dans le regard'. C'est le prince chasseur Rialé. Votre alliance scelle l'union historique des Dagomba et des Bissa, donnant naissance au peuple Mossi. Victoire de la sagesse et du courage !",
      badge: "Guerrière Éclairée du Faso"
    },
    combat_garde: {
      isEnding: true,
      text: "Votre adresse légendaire au tir à l'arc désarçonne le capitaine de garde sans le blesser mortellement. Troublé par votre détermination inébranlable, il ordonne à ses hommes de rebrousser chemin : 'Une flamme telle que la sienne ne s'enferme pas'. Vous gagnez votre liberté et rejoignez les terres de Tenkodogo.",
      badge: "Archère Invincible"
    },
    palabres: {
      isEnding: true,
      text: "Votre éloquence sous l'arbre à palabres émeut les vieux sages du conseil. Ils rappellent au Naba que la coutume interdit d'étouffer la destinée d'une héroïne. Le roi cède avec honneur et vous offre son plus bel étalon blanc pour aller fonder votre propre dynastie dans le Sud.",
      badge: "Maîtresse de la Parole"
    },
    sacrifice: {
      isEnding: true,
      text: "Les anciens interprètent la fumée sacrée : les ancêtres ordonnent que la princesse suive la course du soleil vers le Sud. Le roi n'a d'autre choix que d'obéir aux puissances spirituelles. Vous partez escortée avec tous les honneurs pour rencontrer Rialé !",
      badge: "Bénie des Ancêtres"
    },
    caravane: {
      isEnding: true,
      text: "Vous croisez une caravane marchande qui vous conduit en toute sécurité vers le grand marché de Salaga, où votre réputation de guerrière attire le respect des grands rois. Vous fondez une alliance durable protégeant les routes d'or et d'étoffes.",
      badge: "Protectrice des Échanges"
    }
  }
};


// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS GLOBAUX — accessible depuis tous les modules JS du site
// ─────────────────────────────────────────────────────────────────────────────
window.FASO_REGIONS = FASO_REGIONS;
window.FASO_STORIES = FASO_STORIES;          // données enrichies avec sections & textFr
window.FASO_STORIES_DB = FASO_STORIES;       // alias utilisé dans campfire & story-view
window.FASO_GLOSSARY = FASO_GLOSSARY;
window.FASO_PROVERBS = FASO_PROVERBS;
window.FASO_QUIZ = FASO_QUIZ;
window.FASO_INTERACTIVE_ADVENTURE = FASO_INTERACTIVE_ADVENTURE;
