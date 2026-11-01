# Faso Oralia — Plateforme Web Multimédia et Carte Interactive des Contes et Légendes du Burkina Faso

[![Statut](https://img.shields.io/badge/Statut-Pr%C3%AAt%20pour%20Livraison-success)](https://github.com)
[![Langues](https://img.shields.io/badge/Langues-Moor%C3%A9%20%7C%20Dioula%20%7C%20Fulfulde%20%7C%20Fran%C3%A7ais-amber)](https://github.com)
[![Technologies](https://img.shields.io/badge/Stack-FastAPI%20%2B%20Web%20Audio%20%2B%20Canvas%203D-blue)](https://github.com)
[![Livrable Gobelab](https://img.shields.io/badge/Destinataire-Odilon.simpore%40gobelab.org-orange)](mailto:Odilon.simpore@gobelab.org)

> **Application web immersive visant à préserver, numériser et transmettre le patrimoine oral burkinabè.**  
> Parcourez le Burkina Faso à travers une **carte interactive 3D/2D**, découvrez des contes, légendes et récits historiques locaux enrichis par des **illustrations animées**, des **bandes sonores audio en langues nationales** (Mooré, Dioula, Fulfulde, etc.), et une **expérience narrative interactive**.

---

## Fonctionnalités Principales

### 1. Carte Interactive 2D & 3D du Burkina Faso
- **Carte 2D Vectorielle SVG :** Cartographie précise des 13 régions administratives et culturelles avec ondes de pulsation géolocalisées, tracés des fleuves sacrés (Mouhoun, Nakambé) et infobulles dynamiques.
- **Perspective 3D Isométrique & Relief :** Rendu Canvas HTML5 temps réel (60 FPS) avec élévation géographique réelle (falaises de Banfora, plateau central, dunes du Sahel), piliers lumineux verticaux, orbite 360° et **cycle atmosphérique à 4 ambiances lumineuses** (*Aube Sahélienne*, *Plein Jour*, *Crépuscule sous l'Arbre à Palabres*, *Nuit Étoilée au Baobab*).

### 2. Bibliothèque Orale Multimédia & Bilinguisme
- 8 récits majeurs fidèlement documentés :
  - **L'Épopée de la Princesse Yennenga et l'Étalon Blanc** (Centre / Mossi - Mooré)
  - **Les Silures Sacrés de Dafra** (Hauts-Bassins / Bobo - Dioula)
  - **Guimbi Ouattara, la Diplomate et Guerrière de Sya** (Hauts-Bassins / Mandingue - Dioula)
  - **Les Crocodiles Sacrés de Sabou** (Centre-Ouest / Gourounsi - Mooré)
  - **Le Lièvre, l'Hyène et le Puits de la Sécheresse** (Boucle du Mouhoun / Fable initiatique)
  - **Le Mystère des Ruines de Loropéni** (Sud-Ouest / Lobi - Dagara, Patrimoine Mondial UNESCO)
  - **Le Berger Peul et le Génie du Sahel** (Sahel / Peul - Fulfulde)
  - **Les Murs Peints de Tiébélé et la Sagesse Kasséna** (Centre-Sud / Kasséna)
- Textes bilingues avec affichage miroir (Français et Langue Nationale).
- Salutations sacrées traditionnelles (*Ne y kiba*, *Aw ni ce*, *Jam na*, *On jaraama*).
- Glossaire interactif annoté (*Naba*, *Pulaaku*, *Faso Dan Fani*, *Dolo*, *Zaï*, *Kora*).

### 3. Synthétiseur d'Instruments Traditionnels (Web Audio API)
- Synthèse sonore 100% autonome sans fichiers externes :
  - **Kora :** harpe-luth à cordes pincées harmoniques.
  - **Balafon :** frappe boisée sur lames avec résonance de calebasse.
  - **Djembé / Dunun :** percussion grave sur peau tendue.
  - **Grillons & Brise du Sahel :** ambiance nocturne des veillées traditionnelles.
- Narration vocale guidée par le Griot avec synchronisation bilingue au texte.

### 4.  Mode Arbre à Palabres (Récit Interactif « Dont vous êtes le héros »)
- Système narratif à choix multiples permettant de vivre l'épreuve de liberté de la princesse Yennenga.
- Déblocage de titres honorifiques (*Fondatrice de l'Empire Mossi*, *Archère Invincible*, etc.).

### 5.  Espace Éducatif & Quiz de Transmission
- QCM interactif évaluant la compréhension historique, géographique et morale.
- Attribution de grades culturels (*Initié des Veillées*, *Gardien des Coutumes*, *Grand Griot & Maître de la Parole*).

### 6.  Rapport Officiel Imprimable
- Rapport de projet universitaire et technique complet disponible sur `/report` (avec fonction d'exportation/impression PDF optimisée).
- Formellement adressé à **M. Odilon Simpore** (`Odilon.simpore@gobelab.org`) pour la date limite du **4 Novembre 2026**.

---

##  Démarrage Rapide

### Prérequis
- Python 3.10 ou supérieur avec les paquets `fastapi` et `uvicorn`.

### Lancement
```bash
# 1. Se positionner dans le dossier du projet
cd /home/masqueyyy/.gemini/antigravity/scratch/faso-contes-legendes

# 2. Démarrer le serveur FastAPI
python3 app.py
```

### Accès aux interfaces
-  **Application Web Immersive :** [http://localhost:8000](http://localhost:8000)
-  **Rapport de Projet Imprimable :** [http://localhost:8000/report](http://localhost:8000/report)
-  **Documentation API Interactive (Swagger) :** [http://localhost:8000/docs](http://localhost:8000/docs)

---

##  Tests Automatisés

Le projet comprend une suite complète de tests unitaires et d'intégration validant le routage, le filtrage linguistique, la recherche et l'intégrité des fichiers :

```bash
python3 tests/test_app.py
```

---

##  Structure du Répertoire

```
faso-contes-legendes/
├── app.py                     # Serveur FastAPI & API RESTful
├── requirements.txt           # Dépendances Python
├── README.md                  # Documentation du projet
├── RAPPORT_PROJET.md          # Rapport officiel pour Gobelab (Markdown)
├── static/
│   ├── index.html             # Application Single Page principale
│   ├── css/
│   │   └── style.css          # Thème et design system sahélien
│   ├── js/
│   │   ├── app.js             # Contrôleur d'interface et état
│   │   ├── data.js            # Corpus des contes, 13 régions et glossaire
│   │   ├── map2d.js           # Carte 2D vectorielle SVG
│   │   ├── map3d.js           # Moteur 3D isométrique Canvas
│   │   ├── audio.js           # Synthétiseur Web Audio & Narration
│   │   ├── reader.js          # Lecteur multimédia bilingue
│   │   ├── interactive.js     # Moteur Arbre à Palabres
│   │   └── quiz.js            # Quiz éducatif
│   ├── assets/
│   │   └── illustrations/     # 8 illustrations SVG originales
│   └── report/
│       └── index.html         # Page de rapport imprimable / PDF
└── tests/
    └── test_app.py            # Suite de tests automatisés (11 tests réussis)
```

---

##  Livrable & Contact

- **Projet :** Plateforme Web Multimédia et Carte Interactive des Contes et Légendes du Burkina Faso
- **Destinataire :** Odilon Simpore (`Odilon.simpore@gobelab.org`)
- **Délai :** 4 Novembre 2026
- **Auteur :** Antigravity & User Pair Programming
