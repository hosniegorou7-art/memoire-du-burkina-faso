"""
MÉMOIRE DU BURKINA — SERVEUR BACKEND UNIFIÉ (FASTAPI + REPLI STANDARD ZÉRO DÉPENDANCE)
Plateforme Web Multimédia Immersive des Contes, Légendes et 17 Régions du Burkina Faso
Conforme au référentiel des 17 régions et aux directives de préservation patrimoniale.
"""

import os
import sys
import json
import mimetypes
import urllib.parse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

# --- BASE DE DONNÉES OFFICIELLE DES 17 RÉGIONS DU BURKINA FASO ---

REGIONS_DATA = [
    {
        "id": "bankui",
        "name": "Bankui",
        "officialName": "Région de Bankui",
        "capital": "Dédougou",
        "coords": [12.46, -3.46],
        "demographics": ["Bwaba", "Samo (San)", "Marka (Dafing)", "Ko"],
        "languages": ["Bwamu", "San", "Dioula", "Français"],
        "emblem": "Le fleuve sacré Mouhoun & le Festival International des Masques (FESTIMA)",
        "description": "Grenier nourricier traversé par le grand fleuve Mouhoun, foyer de la tradition des masques de feuilles."
    },
    {
        "id": "djoro",
        "name": "Djôrô",
        "officialName": "Région de Djôrô",
        "capital": "Banfora",
        "coords": [10.63, -4.76],
        "demographics": ["Sénoufo", "Gouin", "Karaboro", "Turka"],
        "languages": ["Sénoufo", "Gouin", "Dioula", "Français"],
        "emblem": "Les Cascades de Karfiguéla & les Dômes de Fabedougou",
        "description": "Joyau géologique et végétal du Sud-Ouest, terre des grands sculpteurs et des confréries initiatiques."
    },
    {
        "id": "goulmou",
        "name": "Goulmou",
        "officialName": "Région du Goulmou",
        "capital": "Fada N'Gourma",
        "coords": [12.06, 0.36],
        "demographics": ["Gourmantché", "Peul"],
        "languages": ["Gulmancema", "Fulfulde", "Français"],
        "emblem": "Royaume historique du Gulmu & la Harpe sacrée Kondé",
        "description": "Terre de souveraineté séculaire et de traditions cynégétiques nobles, berceau des récits de chasseurs."
    },
    {
        "id": "guiriko",
        "name": "Guiriko",
        "officialName": "Région de Guiriko",
        "capital": "Bobo-Dioulasso",
        "coords": [11.18, -4.29],
        "demographics": ["Bobo", "Dioula", "Tiéfo", "Bwaba"],
        "languages": ["Dioula", "Bobo Mandingue", "Français"],
        "emblem": "Les Silures Sacrés de Dafra & la Grande Mosquée de Dioulassoba",
        "description": "Carrefour artistique et musical d'Afrique de l'Ouest, berceau de la princesse Guimbi Ouattara."
    },
    {
        "id": "kadiogo",
        "name": "Kadiogo",
        "officialName": "Région du Kadiogo",
        "capital": "Ouagadougou",
        "coords": [12.37, -1.52],
        "demographics": ["Mossi", "communautés plurielles"],
        "languages": ["Mooré", "Français", "Dioula"],
        "emblem": "L'Étalon de Yennenga & le Palais du Mogho Naba",
        "description": "Cœur politique et métropolitain du pays, sanctuaire de l'épopée de la princesse Yennenga."
    },
    {
        "id": "kuilse",
        "name": "Kuilsé",
        "officialName": "Région de Kuilsé",
        "capital": "Ziniaré",
        "coords": [12.58, -1.30],
        "demographics": ["Mossi"],
        "languages": ["Mooré", "Français"],
        "emblem": "Sculptures sacrées sur granit de Laongo & Musée de Manéga",
        "description": "Sanctuaire artistique réputé pour ses sculpteurs sur pierre et la conservation des masques sacrés."
    },
    {
        "id": "liptako",
        "name": "Liptako",
        "officialName": "Région du Liptako",
        "capital": "Dori",
        "coords": [14.03, -0.03],
        "demographics": ["Peul (Fulɓe)", "Touareg", "Songhaï", "Bella"],
        "languages": ["Fulfulde", "Tamasheq", "Songhaï", "Français"],
        "emblem": "Dunes dorées d'Oursi, Zébus aux cornes en lyre & code du Pulaaku",
        "description": "Contrée sahélienne de poésie pastorale où l'honneur et la fidélité à la parole donnée sont sacrés."
    },
    {
        "id": "nakambe",
        "name": "Nakambé",
        "officialName": "Région du Nakambé",
        "capital": "Kaya",
        "coords": [13.09, -1.08],
        "demographics": ["Mossi", "Peul"],
        "languages": ["Mooré", "Fulfulde", "Français"],
        "emblem": "Artisanat d'art du cuir de Kaya & Lac Dem",
        "description": "Haut lieu de l'artisanat d'art du cuir tanné et du tissage des fils de coton Faso Dan Fani."
    },
    {
        "id": "nando",
        "name": "Nando",
        "officialName": "Région de Nando",
        "capital": "Koudougou",
        "coords": [12.25, -2.36],
        "demographics": ["Gourounsi (Lyélé)", "Mossi"],
        "languages": ["Lyélé", "Mooré", "Français"],
        "emblem": "Les Crocodiles Sacrés de Sabou & Théâtre populaire",
        "description": "Terre de sagesse et d'alliances millénaires de respect absolu entre hommes et animaux totémiques."
    },
    {
        "id": "nazinon",
        "name": "Nazinon",
        "officialName": "Région du Nazinon",
        "capital": "Manga",
        "coords": [11.09, -0.96],
        "demographics": ["Gourounsi", "Kasséna", "Nankana", "Mossi"],
        "languages": ["Kassena", "Mooré", "Français"],
        "emblem": "La Cour Royale de Tiébélé & fresques géométriques peintes",
        "description": "Joyau d'architecture vernaculaire en terre crue peinte par les mains virtuoses des femmes Kasséna."
    },
    {
        "id": "oubri",
        "name": "Oubri",
        "officialName": "Région de l'Oubri",
        "capital": "Kombissiri",
        "coords": [12.07, -1.33],
        "demographics": ["Mossi"],
        "languages": ["Mooré", "Français"],
        "emblem": "La mémoire de Naba Oubri, fondateur victorieux",
        "description": "Région portant le nom vénéré du premier souverain de Ouagadougou, petit-fils de Yennenga."
    },
    {
        "id": "sirba",
        "name": "Sirba",
        "officialName": "Région de la Sirba",
        "capital": "Bogandé",
        "coords": [12.97, -0.14],
        "demographics": ["Gourmantché", "Peul"],
        "languages": ["Gulmancema", "Fulfulde", "Français"],
        "emblem": "La rivière légendaire Sirba & la mémoire des anciens orpailleurs",
        "description": "Bassin historique d'échanges séculaires, riche des récits des anciens chercheurs d'or."
    },
    {
        "id": "soum",
        "name": "Soum",
        "officialName": "Région du Soum",
        "capital": "Djibo",
        "coords": [14.10, -1.63],
        "demographics": ["Peul", "Bella", "Mossi"],
        "languages": ["Fulfulde", "Mooré", "Français"],
        "emblem": "La grande transhumance du Soum & la poésie pastorale de Djibo",
        "description": "Terre pastorale héroïque où se transmettent depuis des siècles les épopées de la vie nomade."
    },
    {
        "id": "sourou",
        "name": "Sourou",
        "officialName": "Région du Sourou",
        "capital": "Tougan",
        "coords": [13.07, -3.07],
        "demographics": ["Samo (San)", "Marka (Dafing)"],
        "languages": ["San", "Marka", "Français"],
        "emblem": "La Vallée du Sourou & le Rakiré (Parenté à Plaisanterie)",
        "description": "Foyer emblématique du Rakiré, mécanisme traditionnel séculaire de désamorçage pacifique des conflits."
    },
    {
        "id": "tapoa",
        "name": "Tapoa",
        "officialName": "Région de la Tapoa",
        "capital": "Diapaga",
        "coords": [12.07, 1.78],
        "demographics": ["Gourmantché"],
        "languages": ["Gulmancema", "Français"],
        "emblem": "La Falaise de Gobnangou & le Parc National du W",
        "description": "Forteresse naturelle majestueuse abritant les falaises de Gobnangou et les confréries de chasseurs Dozo."
    },
    {
        "id": "tannounyan",
        "name": "Tannounyan",
        "officialName": "Région du Tannounyan",
        "capital": "Gaoua",
        "coords": [10.30, -3.53],
        "demographics": ["Lobi", "Birifor", "Dagara"],
        "languages": ["Dagara", "Lobi", "Français"],
        "emblem": "Ruines de Loropéni (Patrimoine Mondial UNESCO) & Statuettes Bateba",
        "description": "Murailles millénaires de latérite taillée de six mètres de haut dédiées au commerce transsaharien de l'or."
    },
    {
        "id": "yaadga",
        "name": "Yaadga",
        "officialName": "Région du Yaadga",
        "capital": "Ouahigouya",
        "coords": [13.58, -2.42],
        "demographics": ["Mossi", "Peul"],
        "languages": ["Mooré", "Fulfulde", "Français"],
        "emblem": "Royaume historique du Yatenga & la sagesse écologique du Zaï",
        "description": "Ancien empire militaire du Yatenga ayant légué à l'humanité la technique agroécologique du Zaï."
    }
]

STORIES_DATA = [
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
    "heroImage": "dioula.png",
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
    "heroImage": "fulfulde.png",
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
    "heroImage": "mossi.png",
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
    "heroImage": "bissa.png",
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
        "id": "yennenga",
        "title": "L'Épopée de la Princesse Yennenga et l'Étalon Blanc",
        "nativeTitle": "Yennenga la wē-bīis naba (Mooré)",
        "regionId": "kadiogo",
        "regionName": "Kadiogo / Oubri",
        "category": "Légende Fondatrice",
        "ethnic": "Mossi / Dagomba / Bissa",
        "languages": ["Français", "Mooré"],
        "duration": "6 min",
        "year": "XIIe - XIIIe siècle",
        "heroImage": "yennenga-hero.svg",
        "synopsis": "Fille intrépide du roi Nedega, cavalière hors pair refusant d'être mariée de force, Yennenga s'élance sur son étalon fougueux pour conquérir sa liberté.",
        "moral": "Le destin d'un peuple naît du courage individuel de briser les chaînes et de la rencontre féconde entre cultures.",
        "tags": ["Émancipation", "Héroïsme", "Origines", "Royauté"]
    },
    {
        "id": "dafra",
        "title": "Les Silures Sacrés de Dafra",
        "nativeTitle": "Dafra jɛgɛ senumanw kò (Dioula)",
        "regionId": "guiriko",
        "regionName": "Guiriko",
        "category": "Mythe & Esprit de la Nature",
        "ethnic": "Bobo / Dioula",
        "languages": ["Français", "Dioula"],
        "duration": "5 min",
        "year": "Temps immémorial",
        "heroImage": "dafra-hero.svg",
        "synopsis": "Dans une gorge spectaculaire près de Bobo-Dioulasso nagent de gigantesques silures noirs vénérés comme les protecteurs spirituels de la cité.",
        "moral": "L'harmonie entre la nature, l'eau et les hommes repose sur le respect inconditionnel des pactes sacrés.",
        "tags": ["Sacré", "Nature", "Totem", "Spiritualité"]
    },
    {
        "id": "guimbi-ouattara",
        "title": "Guimbi Ouattara, la Diplomate et Guerrière de Sya",
        "nativeTitle": "Guimbi Ouattara, Sya cɛfarin muso (Dioula)",
        "regionId": "guiriko",
        "regionName": "Guiriko",
        "category": "Récit Historique",
        "ethnic": "Dioula / Mandingue",
        "languages": ["Français", "Dioula"],
        "duration": "5 min 30",
        "year": "XIXe siècle (1836 - 1919)",
        "heroImage": "guimbi-hero.svg",
        "synopsis": "Grande dame d'État et stratège militaire écoutée dans toute la sous-région, elle utilisa son intelligence diplomatique pour préserver Sya.",
        "moral": "La force brute détruit ; la sagesse diplomatique et l'intelligence protègent les peuples.",
        "tags": ["Leadership", "Diplomatie", "Histoire", "Paix"]
    },
    {
        "id": "sabou",
        "title": "Les Crocodiles Sacrés de Sabou",
        "nativeTitle": "Sabou ebmẽ wã la bãmb zoodo (Mooré)",
        "regionId": "nando",
        "regionName": "Nando",
        "category": "Alliance Totémique",
        "ethnic": "Gourounsi / Mossi",
        "languages": ["Français", "Mooré"],
        "duration": "4 min 45",
        "year": "XIVe siècle",
        "heroImage": "sabou-hero.svg",
        "synopsis": "Égaré et mourant de soif dans la savane, un chasseur fut guidé par un crocodile vers une mare cachée. Un pacte fraternel éternel fut scellé.",
        "moral": "La gratitude sincère transforme un ennemi redoutable en un frère protecteur.",
        "tags": ["Totem", "Amitié", "Gratitude", "Animaux"]
    },
    {
        "id": "lievre-hyene",
        "title": "Le Lièvre, l'Hyène et le Puits de la Sécheresse",
        "nativeTitle": "Soaamba la Wamdé ko-bʋgã zaba (Mooré / Dioula)",
        "regionId": "bankui",
        "regionName": "Bankui / Sourou",
        "category": "Conte Moral & Initiatique",
        "ethnic": "Bwaba / Dioula / Mossi",
        "languages": ["Français", "Mooré", "Dioula"],
        "duration": "6 min 15",
        "year": "Tradition Millénaire",
        "heroImage": "lievre-hero.svg",
        "synopsis": "L'hyène refuse de participer à l'effort collectif pour creuser le puits du village et vole l'eau la nuit. Le lièvre lui tend un piège magistral.",
        "moral": "La ruse bienveillante et le travail collectif triomphent toujours de l'égoïsme et de la cupidité.",
        "tags": ["Ruse", "Humour", "Solidarité", "Enfance"]
    },
    {
        "id": "loropeni",
        "title": "Le Mystère des Bâtisseurs des Ruines de Loropéni",
        "nativeTitle": "Loropéni kulu dãgara bãngr (Dagara / Français)",
        "regionId": "tannounyan",
        "regionName": "Tannounyan",
        "category": "Récit Historique & Patrimoine",
        "ethnic": "Lobi / Dagara / Kaan",
        "languages": ["Français", "Dagara"],
        "duration": "5 min 45",
        "year": "XIe - XVIIe siècle",
        "heroImage": "loropeni-hero.svg",
        "synopsis": "Inscrites à l'UNESCO, les imposantes murailles de latérite taillée protégeaient les souverains et les trésors d'or du commerce transsaharien.",
        "moral": "Les pierres façonnées avec honneur instruisent les générations à travers les millénaires.",
        "tags": ["UNESCO", "Histoire", "Architecture", "Mystère"]
    },
    {
        "id": "berger-sahel",
        "title": "Le Berger Peul et le Génie du Sahel",
        "nativeTitle": "Gaynaako e Jinnaaru Sahel (Fulfulde / Français)",
        "regionId": "liptako",
        "regionName": "Liptako / Soum",
        "category": "Légende Pastorale",
        "ethnic": "Peul (Fulɓe)",
        "languages": ["Français", "Fulfulde"],
        "duration": "5 min",
        "year": "XVe siècle",
        "heroImage": "sahel-hero.svg",
        "synopsis": "Un génie propose à un jeune berger une source d'eau inépuisable contre sa parole d'honneur. Fidèle au code du Pulaaku, Amadou refuse de trahir.",
        "moral": "La dignité et le respect de la parole donnée valent plus que toutes les richesses du monde.",
        "tags": ["Honneur", "Sahel", "Éthique", "Pulaaku"]
    },
    {
        "id": "tiebele",
        "title": "Les Murs Peints de Tiébélé et la Sagesse Kasséna",
        "nativeTitle": "Tiébélé kora na luri zõnga (Kassena / Mooré)",
        "regionId": "nazinon",
        "regionName": "Nazinon",
        "category": "Art & Sagesse Ancestrale",
        "ethnic": "Gourounsi / Kasséna",
        "languages": ["Français", "Kassena", "Mooré"],
        "duration": "5 min 15",
        "year": "XVIe siècle à nos jours",
        "heroImage": "tiebele-hero.svg",
        "synopsis": "Les femmes kasséna peignent à la main des chefs-d'œuvre de fresques géométriques en latérite et kaolin sur les maisons en banco de Tiébélé.",
        "moral": "L'art est un bouclier protecteur de la mémoire collective et le fil sacré reliant les générations.",
        "tags": ["Art", "Architecture", "Femmes", "Transmission"]
    },
    {
        "id": "domes-fabedougou",
        "title": "Le Secret des Dômes de Fabedougou et les Chutes Vives",
        "nativeTitle": "Fabedougou kuru kò (Sénoufo / Dioula)",
        "regionId": "djoro",
        "regionName": "Djôrô",
        "category": "Mythe & Esprit de la Nature",
        "ethnic": "Sénoufo / Gouin",
        "languages": ["Français", "Dioula", "Sénoufo"],
        "duration": "5 min",
        "year": "Temps immémorial",
        "heroImage": "dafra-hero.svg",
        "synopsis": "Sculptés par les vents et les pluies depuis des millions d'années, les dômes de Fabedougou ressemblent à des châteaux de géants veillant sur les eaux de Banfora.",
        "moral": "La patience du vent et de l'eau façonne ce que nulle force humaine ne peut abattre.",
        "tags": ["Nature", "Géologie", "Eau", "Sénoufo"]
    },
    {
        "id": "yendabri-gulmu",
        "title": "L'Épopée du Roi Yendabri et la Harpe Kondé",
        "nativeTitle": "O Naba Yendabri kpatuagndi (Gulmancéma)",
        "regionId": "goulmou",
        "regionName": "Goulmou",
        "category": "Récit Historique",
        "ethnic": "Gourmantché",
        "languages": ["Français", "Gulmancema"],
        "duration": "6 min",
        "year": "XVIIIe siècle",
        "heroImage": "yennenga-hero.svg",
        "synopsis": "Grand souverain du Gulmu, Yendabri unifia les chefferies de l'Est et scella un pacte sacré avec les chasseurs au son de la harpe Kondé.",
        "moral": "Un chef ne règne pas par la terreur mais par la parole donnée et l'écoute des anciens.",
        "tags": ["Royauté", "Histoire", "Paix", "Gulmancéma"]
    },
    {
        "id": "sculpteurs-laongo",
        "title": "Le Souffle des Pierres de Laongo",
        "nativeTitle": "Laongo kug-rãmb goama (Mooré)",
        "regionId": "kuilse",
        "regionName": "Kuilsé",
        "category": "Art & Sagesse Ancestrale",
        "ethnic": "Mossi",
        "languages": ["Français", "Mooré"],
        "duration": "4 min 30",
        "year": "Tradition séculaire",
        "heroImage": "sabou-hero.svg",
        "synopsis": "Sur les étendues de granit brut de Laongo, chaque roche sculptée raconte une fable sur le respect des êtres vivants et l'humilité face à la terre mère.",
        "moral": "L'œuvre de l'artiste survit aux siècles lorsqu'elle célèbre la beauté et la fraternité.",
        "tags": ["Sculpture", "Art", "Granite", "Kuilsé"]
    },
    {
        "id": "maitre-tanneur-kaya",
        "title": "Le Maître Tanneur de Kaya et le Coton Céleste",
        "nativeTitle": "Kaya gãng-tʋʋmd naba (Mooré)",
        "regionId": "nakambe",
        "regionName": "Nakambé",
        "category": "Légende Agraire & Artisanat",
        "ethnic": "Mossi / Peul",
        "languages": ["Français", "Mooré"],
        "duration": "5 min",
        "year": "XVIIe siècle",
        "heroImage": "tiebele-hero.svg",
        "synopsis": "À Kaya, l'alliance séculaire entre les maîtres tanneurs et les fileuses de coton donna naissance aux étoffes royales protégées par le lac Dem.",
        "moral": "Le labeur honnête et la recherche de l'excellence élèvent l'artisan au rang des maîtres.",
        "tags": ["Artisanat", "Cuir", "Faso Dan Fani", "Nakambé"]
    },
    {
        "id": "conquete-naba-oubri",
        "title": "Naba Oubri et le Serment de la Forêt Sacrée",
        "nativeTitle": "Naba Oubri sōorã (Mooré)",
        "regionId": "oubri",
        "regionName": "Oubri",
        "category": "Légende Fondatrice",
        "ethnic": "Mossi",
        "languages": ["Français", "Mooré"],
        "duration": "5 min 30",
        "year": "XIIIe siècle",
        "heroImage": "yennenga-hero.svg",
        "synopsis": "Petit-fils de Yennenga, Naba Oubri fonda Ouagadougou en partageant le pouvoir avec les Tengsoba gardiens spirituels de la terre.",
        "moral": "La paix véritable exige le respect mutuel entre force politique et autorité spirituelle de la terre.",
        "tags": ["Fondation", "Histoire", "Royauté", "Oubri"]
    },
    {
        "id": "tresor-riviere-sirba",
        "title": "Le Génie de l'Or et les Piroguiers de la Sirba",
        "nativeTitle": "Sirba baa daana (Gulmancéma / Fulfulde)",
        "regionId": "sirba",
        "regionName": "Sirba",
        "category": "Conte Initiatique",
        "ethnic": "Gourmantché / Peul",
        "languages": ["Français", "Gulmancema", "Fulfulde"],
        "duration": "4 min 45",
        "year": "XVIIIe siècle",
        "heroImage": "dafra-hero.svg",
        "synopsis": "La rivière Sirba ne livre son or qu'aux cœurs purs qui refusent l'avidité et partagent leur premier grain avec les plus fragiles du village.",
        "moral": "L'or de la terre enrichit les mains, mais l'or du partage enrichit l'âme pour l'éternité.",
        "tags": ["Générosité", "Rivière", "Sirba", "Sagesse"]
    },
    {
        "id": "epreuve-berger-soum",
        "title": "La Traversée de la Mare aux Étoiles de Djibo",
        "nativeTitle": "Djibo weendu koodde (Fulfulde)",
        "regionId": "soum",
        "regionName": "Soum",
        "category": "Conte Pastoral & Sagesse",
        "ethnic": "Peul / Bella",
        "languages": ["Français", "Fulfulde"],
        "duration": "5 min",
        "year": "XIXe siècle",
        "heroImage": "sahel-hero.svg",
        "synopsis": "Pendant la sécheresse, un jeune berger guidé par la seule étoile polaire découvrit la mare secrète des génies et sauva les troupeaux de la soif.",
        "moral": "Celui qui sait écouter les étoiles et le vent ne perd jamais son chemin dans la tourmente.",
        "tags": ["Pastorale", "Courage", "Étoiles", "Soum"]
    },
    {
        "id": "rakire-paix-sourou",
        "title": "Le Pacte Sacré du Rakiré et le Rire qui Éteignit la Guerre",
        "nativeTitle": "Rakiré zãmsg la laafya (San / Mooré)",
        "regionId": "sourou",
        "regionName": "Sourou",
        "category": "Tradition & Résolution Pacifique",
        "ethnic": "Samo (San) / Marka / Mossi",
        "languages": ["Français", "San", "Mooré"],
        "duration": "5 min 30",
        "year": "Temps immémorial",
        "heroImage": "lievre-hero.svg",
        "synopsis": "Deux armées allaient s'affronter quand la parenté à plaisanterie (Rakiré) fut invoquée. Les rires désarmèrent les soldats et scellèrent une paix éternelle.",
        "moral": "L'humour codifié désarme l'orgueil et préserve la vie là où les armes sèment le deuil.",
        "tags": ["Paix", "Cohésion", "Rakiré", "Sourou"]
    },
    {
        "id": "falaises-gobnangou-tapoa",
        "title": "Le Gardien Dozo des Falaises de Gobnangou",
        "nativeTitle": "Gobnangou gbandi dozo (Gulmancéma)",
        "regionId": "tapoa",
        "regionName": "Tapoa",
        "category": "Mythe & Confrérie Dozo",
        "ethnic": "Gourmantché",
        "languages": ["Français", "Gulmancema"],
        "duration": "6 min",
        "year": "XVIe siècle",
        "heroImage": "loropeni-hero.svg",
        "synopsis": "Au sommet des falaises de Gobnangou, un chasseur Dozo reçut des génies la plante maîtresse guérissant les morsures et le devoir sacré de protéger la faune.",
        "moral": "La nature livre ses remèdes à ceux qui la respectent comme une mère.",
        "tags": ["Chasseurs", "Dozo", "Nature", "Tapoa"]
    },
    {
        "id": "genie-zai-yaadga",
        "title": "La Légende du Zaï et le Maître de la Terre de Ouahigouya",
        "nativeTitle": "Zaï bãngr nengẽ Yatenga (Mooré)",
        "regionId": "yaadga",
        "regionName": "Yaadga",
        "category": "Sagesse Écologique & Savoir Ancestral",
        "ethnic": "Mossi / Peul",
        "languages": ["Français", "Mooré"],
        "duration": "5 min 15",
        "year": "XXe siècle",
        "heroImage": "yennenga-hero.svg",
        "synopsis": "Face à la désertification, un cultivateur de Ouahigouya réinventa le Zaï ancestral : poquets de compost pour piéger l'eau et faire reverdir le Sahel.",
        "moral": "L'intelligence respectueuse de la terre féconde le sol le plus stérile.",
        "tags": ["Écologie", "Zaï", "Yatenga", "Yaadga"]
    }
]

# --- CHARGEMENT FASTAPI / DÉTECTION ---

try:
    from fastapi import FastAPI, HTTPException, Query
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import FileResponse, HTMLResponse
    from fastapi.staticfiles import StaticFiles

    app = FastAPI(
        title="Mémoire du Burkina API",
        description="API officielle de préservation et transmission des contes et des 17 régions du Burkina Faso.",
        version="2.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    @app.get("/", response_class=HTMLResponse)
    async def serve_home():
        index_file = STATIC_DIR / "index.html"
        return FileResponse(index_file)

    @app.get("/report", response_class=HTMLResponse)
    async def serve_report():
        report_file = STATIC_DIR / "report" / "index.html"
        return FileResponse(report_file)

    @app.get("/api/health")
    async def health_check():
        return {
            "status": "online",
            "platform": "Mémoire du Burkina — Plateforme Multimédia des 17 Régions",
            "version": "2.0.0",
            "regions_count": len(REGIONS_DATA),
            "stories_count": len(STORIES_DATA)
        }

    @app.get("/api/regions")
    async def get_regions():
        return REGIONS_DATA

    @app.get("/api/regions/{region_id}")
    async def get_region_by_id(region_id: str):
        reg = next((r for r in REGIONS_DATA if r["id"] == region_id), None)
        if not reg:
            raise HTTPException(status_code=404, detail=f"Région '{region_id}' non trouvée.")
        return reg

    @app.get("/api/contes")
    async def get_stories(category: str = None, language: str = None, region_id: str = None, search: str = None):
        res = STORIES_DATA
        if category and category.lower() != "all":
            res = [s for s in res if category.lower() in s["category"].lower()]
        if language and language.lower() != "all":
            res = [s for s in res if any(language.lower() == l.lower() for l in s["languages"])]
        if region_id and region_id.lower() != "all":
            res = [s for s in res if s["regionId"] == region_id]
        if search:
            q = search.lower()
            res = [s for s in res if q in s["title"].lower() or q in s["synopsis"].lower() or q in s["regionName"].lower()]
        return res

    @app.get("/api/contes/{story_id}")
    async def get_story_by_id(story_id: str):
        story = next((s for s in STORIES_DATA if s["id"] == story_id), None)
        if not story:
            raise HTTPException(status_code=404, detail=f"Récit '{story_id}' introuvable.")
        return story

    HAS_FASTAPI = True

except ImportError:
    HAS_FASTAPI = False
    app = None


# --- SERVEUR DE REPLI STANDARD ZÉRO DÉPENDANCE ---

if not HAS_FASTAPI:
    import http.server
    import socketserver

    class FasoHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
        def end_headers(self):
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "*")
            super().end_headers()

        def do_OPTIONS(self):
            self.send_response(200)
            self.end_headers()

        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            path = parsed.path
            params = urllib.parse.parse_qs(parsed.query)

            if path in ("/", "/index.html"):
                self.serve_file(STATIC_DIR / "index.html", "text/html; charset=utf-8")
                return

            if path in ("/report", "/report/"):
                self.serve_file(STATIC_DIR / "report" / "index.html", "text/html; charset=utf-8")
                return

            if path == "/api/health":
                self.send_json({
                    "status": "online",
                    "platform": "Mémoire du Burkina — Plateforme Multimédia des 17 Régions",
                    "version": "2.0.0",
                    "engine": "Python Standard HTTP (Zéro Dépendance)",
                    "regions_count": len(REGIONS_DATA),
                    "stories_count": len(STORIES_DATA)
                })
                return

            if path == "/api/regions":
                self.send_json(REGIONS_DATA)
                return

            if path.startswith("/api/regions/"):
                reg_id = path.replace("/api/regions/", "").strip("/")
                reg = next((r for r in REGIONS_DATA if r["id"] == reg_id), None)
                if reg:
                    self.send_json(reg)
                else:
                    self.send_error(404, f"Région '{reg_id}' non trouvée.")
                return

            if path == "/api/contes":
                category = params.get("category", [None])[0]
                language = params.get("language", [None])[0]
                search = params.get("search", [None])[0]
                region_id = params.get("region_id", [None])[0]

                res = STORIES_DATA
                if category and category.lower() != "all":
                    res = [s for s in res if category.lower() in s["category"].lower()]
                if language and language.lower() != "all":
                    res = [s for s in res if any(language.lower() == l.lower() for l in s["languages"])]
                if region_id and region_id.lower() != "all":
                    res = [s for s in res if s["regionId"] == region_id]
                if search:
                    q = search.lower()
                    res = [s for s in res if q in s["title"].lower() or q in s["synopsis"].lower() or q in s["regionName"].lower()]
                self.send_json(res)
                return

            if path.startswith("/api/contes/"):
                story_id = path.replace("/api/contes/", "").strip("/")
                story = next((s for s in STORIES_DATA if s["id"] == story_id), None)
                if story:
                    self.send_json(story)
                else:
                    self.send_error(404, f"Récit '{story_id}' introuvable.")
                return

            if path.startswith("/static/"):
                rel_path = path[len("/static/"):]
                file_path = (STATIC_DIR / rel_path).resolve()
                if file_path.exists() and file_path.is_file() and str(file_path).startswith(str(STATIC_DIR)):
                    mime, _ = mimetypes.guess_type(str(file_path))
                    self.serve_file(file_path, mime or "application/octet-stream")
                    return

            self.send_error(404, "Page ou ressource introuvable")

        def serve_file(self, file_path, content_type):
            try:
                with open(file_path, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", content_type)
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
            except Exception as e:
                self.send_error(500, f"Erreur de lecture : {e}")

        def send_json(self, data):
            body = json.dumps(data, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)


def run_standalone_server(host="0.0.0.0", port=8000):
    import socketserver
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer((host, port), FasoHTTPRequestHandler) as httpd:
        print(f"\n==================================================================")
        print(f"🇧🇫 MÉMOIRE DU BURKINA — SERVEUR ACTIF (17 Régions)")
        print(f"==================================================================")
        print(f"🌐 Plateforme Web   : http://localhost:{port}")
        print(f"📋 Rapport Officiel : http://localhost:{port}/report")
        print(f"==================================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nArrêt propre du serveur.")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    if HAS_FASTAPI:
        try:
            import uvicorn
            print(f"\n🚀 Démarrage FastAPI + Uvicorn sur http://0.0.0.0:{port}...")
            uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
        except Exception:
            run_standalone_server(port=port)
    else:
        run_standalone_server(port=port)
