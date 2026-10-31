# RAPPORT DE PROJET OFFICIEL — GOBELAB

**Projet :** MÉMOIRE DU BURKINA  
**Sous-titre :** Plateforme Web Multimédia Immersive des Contes, Légendes et Récits des 17 Régions du Burkina Faso  
**Destinataire Institutionnel :** M. Odilon Simpore (`Odilon.simpore@gobelab.org`)  
**Organisation :** Laboratoire Gobelab — Innovation, SIG & Patrimoine Culturel  
**Date de Livraison :** 31 Octobre 2026 (Délai limite officiel : 4 Novembre 2026)  
**Accès au Démonstrateur :** `http://localhost:8000` (Rapport interactif sur `http://localhost:8000/report`)

---

## 1. Résumé Exécutif & Vision

Face à l'urbanisation rapide, à l'érosion mémorielle et à la raréfaction des traditionnelles veillées de contes sous l'arbre à palabres, la sauvegarde du patrimoine oral burkinabè constitue une urgence culturelle et patrimoniale majeure.

Le projet **MÉMOIRE DU BURKINA** a été conçu pour répondre rigoureusement et sans compromis au cahier des charges de Gobelab :
- **Préserver** la noblesse et l'authenticité de la littérature orale transmise depuis des siècles par les griots, forgerons, chasseurs et aînés dépositaires.
- **Numériser** les récits, mythes fondateurs et épopées historiques selon les plus hauts standards du Web moderne et de la convention UNESCO 2003.
- **Transmettre** cette mémoire vivante aux jeunes générations et au public international grâce à des technologies immersives interactives : **carte vectorielle 2D responsive**, **perspective 3D isométrique en relief**, **synthétiseur Web Audio API des instruments traditionnels (Kora, Balafon, Djembé)**, et le mode signature **« Écouter autour du feu »** avec braises montantes et karaoké bilingue.

---

## 2. Référentiel Géographique Strict : Les 17 Régions Officielles

Conformément aux instructions fermes du cahier des charges, la plateforme met en œuvre le **découpage administratif officiel actuel à 17 régions**, en rejetant sans ambiguïté l'ancien modèle obsolète à 13 régions :

1. **Bankui** (Chef-lieu : Dédougou) : Berceau du fleuve sacré Mouhoun, festival FESTIMA et tradition sacrée des masques de feuilles des Bwaba et San.
2. **Djôrô** (Chef-lieu : Banfora) : Dômes de Fabedougou, cascades vives de Karfiguéla, balafons sénoufo et confréries initiatiques du Poro.
3. **Goulmou** (Chef-lieu : Fada N'Gourma) : Royaume séculaire du Gulmu, harpe-luth Kondé et récits épiques du roi Yendabri.
4. **Guiriko** (Chef-lieu : Bobo-Dioulasso) : Marigot sacré des silures de Dafra, quartier historique de Dioulassoba et mémoire de la princesse Guimbi Ouattara.
5. **Kadiogo** (Chef-lieu : Ouagadougou) : Cœur politique et métropolitain, étalon d'or de la princesse Yennenga et cour royale du Mogho Naba.
6. **Kuilsé** (Chef-lieu : Ziniaré) : Sculptures monumentales sur granite de Laongo, musée de la bendrologie de Manéga.
7. **Liptako** (Chef-lieu : Dori) : Dunes dorées d'Oursi, luth Hoddu des Peuls pasteurs et code d'honneur sacré du *Pulaaku*.
8. **Nakambé** (Chef-lieu : Kaya) : Maîtres artisans du cuir tanné, filature du coton Faso Dan Fani et légendes du lac Dem.
9. **Nando** (Chef-lieu : Koudougou) : Mare aux crocodiles sacrés de Sabou, festival NAK et contes initiatiques Lyélé.
10. **Nazinon** (Chef-lieu : Manga) : Chef-d'œuvre architectural en banco de la Cour Royale de Tiébélé et fresques géométriques peintes par les femmes Kasséna (UNESCO).
11. **Oubri** (Chef-lieu : Kombissiri) : Mémoire glorieuse de Naba Oubri, petit-fils de Yennenga et fondateur de Ouagadougou.
12. **Sirba** (Chef-lieu : Bogandé) : Récits des anciens chercheurs d'or de la vallée de la Sirba et génies des fleuves.
13. **Soum** (Chef-lieu : Djibo) : Grandes steppes pastorales, transhumance sahélienne et épopées de la survie nomade.
14. **Sourou** (Chef-lieu : Tougan) : Vallée fertile et institution pacifique séculaire du *Rakiré* (parenté à plaisanterie des peuples San et Mossi).
15. **Tapoa** (Chef-lieu : Diapaga) : Falaises monumentales de Gobnangou, Parc National du W et confréries traditionnelles de chasseurs Dozo.
16. **Tannounyan** (Chef-lieu : Gaoua) : Murailles forteresses millénaires de Loropéni (Patrimoine Mondial UNESCO) et statuettes tutélaires Bateba.
17. **Yaadga** (Chef-lieu : Ouahigouya) : Royaume militaire du Yatenga, épopée de Naba Kango et génie agroécologique ancestral du Zaï.

---

## 3. Réalisation Détaillée par Module (Les 7 Phases du Développement)

Le développement a été conduit rigoureusement selon les 7 modules prescrits :

### Phase 1 : Identité Visuelle et Interfaces
- **Palette chromatique culturelle :** Ocre de latérite (`#9C3D1B`), terre cuite (`#C85A32`), or solaire (`#E5A93C`), vert savane (`#1B4332`), brun banco (`#3D2314`) et noir charbon (`#12100E`).
- **Motifs traditionnels :** Textures graphiques Faso Dan Fani en arrière-plan subtil et frises géométriques inspirées de Tiébélé.
- **Typographie :** Double famille typographique (Cinzel pour la solennité des titres d'épopée, Plus Jakarta Sans pour le confort de lecture).
- **Navigation SPA fluide :** Routeur sans rechargement (`#home`, `#map`, `#regions`, `#library`, `#story/:id`, `#campfire/:id`, `#quiz`, `#contribute`, `#admin`).

### Phase 2 : Carte Interactive des 17 Régions
- **Carte 2D Vectorielle SVG :** Tracé dynamique des 17 régions avec mise en valeur polygonale, ondes de pulsation radar sur les hauts lieux et tiroir d'information latéral.
- **Carte 3D Isométrique en Relief :** Moteur Canvas HTML5 temps réel calculant la projection d'élévation topographique (dômes de Fabedougou, falaises de Gobnangou, plateau central, dunes du Sahel). Orbite interactive 360° et cycle d'éclairage à 4 ambiances (Aube, Plein jour, Crépuscule, Nuit étoilée).

### Phase 3 : Bibliothèque des Contes et Légendes
- **Base de récits structurée :** Récits documentés par région avec synopsis, citations orales, texte bilingue parallèle et morale universelle.
- **Moteur de recherche & filtres multi-critères :** Filtrage instantané par région, typologie, langue nationale et tranche d'âge.

### Phase 4 : Système Audio et Multilinguisme
- **Honnêteté technologique :** Refus de fausses voix de synthèse TTS dénaturant les langues voltaïques ; priorité absolue aux dépositaires humains.
- **Synthétiseur d'instruments traditionnels Web Audio API :** Modélisation acoustique en temps réel sans fichiers lourds de la Kora, du Balafon, du Djembé et des grillons du Sahel.
- **Karaoké synchronisé :** Suivi visuel mot à mot du récit en parallèle français / langue nationale.

### Phase 5 : Illustrations et Animations Immersives
- **Illustrations vectorielles SVG dédiées :** Tableaux graphiques originaux pour chaque grand mythe (Yennenga, Dafra, Guimbi Ouattara, Sabou, Loropéni, Tiébélé, etc.).
- **Mode « Écouter autour du feu » :** Ambiance nocturne tamisée, braises incandescentes animées en CSS Canvas et mode enfant grand format.

### Phase 6 : Administration et Contributions
- **Console de modération complète :** Suivi des indicateurs clés, ajout/édition des contes et gestion des fiches régionales.
- **Portail citoyen conforme UNESCO :** Formulaire de proposition de récits avec recueil obligatoire du consentement préalable, libre et éclairé du narrateur traditionnel.

### Phase 7 : Tests, Optimisation et Déploiement
- **Architecture unifiée bi-mode :** Le serveur `app.py` démarre avec FastAPI et Uvicorn s'ils sont installés, ou bascule automatiquement vers `http.server` de la bibliothèque standard Python 3 en cas d'absence, garantissant une exécution immédiate sans aucune erreur d'installation sur toute machine.
- **Suite de tests automatisés :** Validation complète de l'intégrité des données, des routes REST et du corpus des 17 régions via `python3 tests/test_suite.py`.

---

## 4. Instructions d'Exécution & Guide de Démonstration

```bash
# 1. Se positionner dans le répertoire du projet
cd /home/masqueyyy/.gemini/antigravity/scratch/faso-contes-legendes

# 2. Lancer le serveur universel
python3 app.py

# 3. Ouvrir dans le navigateur
# Plateforme interactive : http://localhost:8000
# Rapport officiel Gobelab : http://localhost:8000/report
# Documentation OpenAPI / Swagger : http://localhost:8000/docs (si FastAPI présent)

# 4. Lancer la suite de tests unitaires et d'intégration
python3 tests/test_suite.py
```

---

## 5. Conclusion & Perspectives pour le Laboratoire Gobelab

La plateforme **MÉMOIRE DU BURKINA** démontre avec éclat que la technologie web contemporaine peut devenir le plus puissant sanctuaire de la parole des aînés. Conçu dans les délais stricts fixés par Gobelab, le projet est prêt pour une phase d'expérimentation pilote dans les écoles, bibliothèques et centres culturels du pays.

*Rapport transmis pour validation officielle à M. Odilon Simpore (`Odilon.simpore@gobelab.org`).*
