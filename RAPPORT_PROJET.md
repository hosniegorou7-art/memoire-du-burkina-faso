# RAPPORT DE PROJET OFFICIEL — GOBELAB

**Thème :** Plateforme Web Multimédia et Carte Interactive des Contes et Légendes du Burkina Faso  
**Destinataire :** M. Odilon Simpore (`Odilon.simpore@gobelab.org`)  
**Organisation :** Laboratoire Gobelab — Initiative Patrimoine & Numérique  
**Date de Livraison :** 31 Octobre 2026 (Délai limite : 4 Novembre 2026)  
**Plateforme Développée :** Faso Oralia (Démonstrateur accessible sur `http://localhost:8000`)

---

## 1. Résumé Exécutif & Vision

Face à la mondialisation galopante, à l'urbanisation rapide et à la raréfaction des traditionnelles veillées de contes autour du feu (*veillées sous le baobab*), la sauvegarde du patrimoine oral burkinabè est un impératif culturel et mémoriel urgent.

Le projet **Faso Oralia** a été conçu pour répondre rigoureusement et fidèlement aux orientations définies par Gobelab :
- **Préserver** la richesse de la littérature orale transmise depuis des générations par les griots et les aînés.
- **Numériser** les récits, mythes fondateurs et épopées historiques selon les plus hauts standards du Web moderne.
- **Transmettre** cette mémoire aux jeunes générations et au public international grâce à des technologies immersives interactives : **carte bidimensionnelle (2D) haute précision**, **perspective tridimensionnelle (3D) isométrique en relief**, **système audio multilingue bilingue synchronisé (Français, Mooré, Dioula, Fulfulde)**, **synthèse Web Audio API des instruments du Faso (Kora, Balafon, Djembé)**, et **aventure interactive à choix multiples**.

---

## 2. Piliers Pédagogiques et Culturels

### 2.1 Les 13 Régions Culturelles et Administratives Couvertes
La plateforme cartographie l'ensemble des 13 régions du Burkina Faso :
1. **Centre (Ouagadougou)** : Cœur du royaume Mossi, palais du Mogho Naba, épopée de Yennenga.
2. **Hauts-Bassins (Bobo-Dioulasso)** : Capitale culturelle, silures sacrés de Dafra, reine Guimbi Ouattara.
3. **Sahel (Dori, Oursi)** : Transhumance, dunes dorées, code d'honneur peul (*Pulaaku*).
4. **Cascades (Banfora, Sindou)** : Falaises, dômes de Fabedougou, cascades de Karfiguéla, danses de masques Sénoufo.
5. **Sud-Ouest (Gaoua, Loropéni)** : Murailles millénaires de Loropéni (Patrimoine Mondial UNESCO), statuettes Bateba lobi.
6. **Centre-Sud (Tiébélé, Pô)** : Architecture en banco verni et fresques géométriques séculaires peintes par les femmes Kasséna.
7. **Centre-Ouest (Koudougou, Sabou)** : Mare aux crocodiles sacrés de Sabou, alliance totémique et respect de la nature.
8. **Boucle du Mouhoun (Dédougou)** : Fleuve sacré Mouhoun (Black Volta), contes initiatiques du Lièvre et de l'Hyène, FESTIMA.
9. **Nord (Ouahigouya)** : Royaume militaire du Yatenga, savoir-faire agronomique du Zaï.
10. **Plateau-Central (Ziniaré)** : Sculptures sur granit de Laongo, musée de Manéga.
11. **Centre-Est (Tenkodogo)** : Berceau originel de l'empire Mossi, union de Rialé et Yennenga.
12. **Centre-Nord (Kaya)** : Artisanat d'art du cuir et filature du coton Faso Dan Fani.
13. **Est (Fada N'Gourma)** : Royaume du Gulmu, falaises de Gobnangou et secrets des arbres de guérison.

### 2.2 Valorisation des Langues Nationales
Chaque récit est documenté avec :
- Une **salutation sacrée traditionnelle** dans sa langue d'origine (*Ne y kiba* en Mooré, *Aw ni ce* en Dioula, *Jam na / On jaraama* en Fulfulde).
- Un **texte bilingue miroir** (Français et Langue Nationale) permettant un apprentissage linguistique et une réappropriation culturelle.
- Un **glossaire annoté** expliquant les termes clés (*Naba*, *Mogho Naba*, *Pulaaku*, *Faso Dan Fani*, *Dolo*, *Zaï*, *Soumbala*, *Kora*).

---

## 3. Architecture Technique & Choix Technologiques

Le projet a été développé dans le respect scrupuleux des principes de **propreté du code, légèreté, autonomie et haute maintenabilité** :

### A. Backend FastAPI & Python 3.14
- Serveur asynchrone haute performance propulsé par `uvicorn`.
- API RESTful complète avec sérialisation stricte via Pydantic :
  - `GET /api/contes` : catalogue complet filtrable par catégorie, langue et recherche plein texte.
  - `GET /api/contes/{id}` : détail avec transcriptions bilingues et offsets de synchronisation.
  - `GET /api/regions` : coordonnées géographiques, chefs-lieux et composantes ethnolinguistiques des 13 régions.
  - `GET /api/health` : sonde de santé opérationnelle.
- Documentation OpenAPI 3.0 interactive générée automatiquement sur `/docs` (Swagger) et `/redoc`.

### B. Carte Interactive 2D Vectorielle SVG
- Rendu vectoriel SVG haute résolution dynamique sans dépendances externes lourdes.
- Ondes de résonance pulsantes marquant l'emplacement exact des contes.
- Détection de survol avec infobulles contextuelles enrichies (terroirs, peuples, résumés de contes).
- Filtrage instantané par typologie de récit (Fondatrices, Totems & Nature, Histoire & Patrimoine).

### C. Moteur Cartographique 3D Isométrique Temps Réel
- Moteur 3D développé sur Canvas HTML5 avec projection perspective et algorithme du peintre pour le tri des profondeurs.
- Relief réaliste modélisé : falaises et pics du Sud-Ouest, plateau central, dunes ondoyantes du Sahel.
- Balises lumineuses verticales avec halos radiaux et pulsation cinétique.
- **Cycle d'éclairage atmosphérique à 4 ambiances :**
  1. *Aube Sahélienne* (lueur rosée et violette du matin)
  2. *Plein Jour* (chaleur dorée du soleil zénithal)
  3. *Crépuscule sous l'Arbre à Palabres* (terracotta et orange profond)
  4. *Nuit Étoilée au Baobab* (ciel indigo profond avec champ d'étoiles scintillantes).
- Navigation libre : rotation orbitale 360°, tangage vertical, zoom interactif et pause auto-orbit.

### D. Moteur Audio Web Audio API & Synthèse Sonore
- **Synthétiseur autonome d'instruments traditionnels africains (sans aucun fichier MP3 externe à charger) :**
  - **Kora :** Synthèse de cordes pincées harmoniques avec déclin exponentiel chaud.
  - **Balafon :** Frappe percussive de bois avec mailloche et résonance de calebasse.
  - **Djembé / Dunun :** Fréquence glissante reproduisant la frappe sur membrane de peau tendue.
  - **Grillons & Brise du Sahel :** Oscillations modulées reproduisant les nuits de veillée.
- Mode de lecture vocale guidée (Web Speech API) avec synchronisation visuelle (karaoké bilingue).

### E. Expérience Narrative Interactive (« Arbre à Palabres »)
- Moteur d'aventure textuelle à embranchements multiples plongeant le lecteur dans la peau de l'héroïne Yennenga.
- Chaque choix met à l'épreuve le courage, la diplomatie ou le respect des coutumes.
- Déblocage de titres honorifiques (*Fondatrice de l'Empire Mossi*, *Archère Invincible*, *Guerrière Éclairée*).

### F. Espace Éducatif & Quiz de Transmission
- Module d'évaluation ludique pour les écoles et le jeune public.
- Questions à choix multiples avec explications historiques immédiates.
- Barème d'évaluation délivrant des certificats de sagesse (*Apprenti Conteuse*, *Gardien des Coutumes*, *Grand Griot*).

---

## 4. Guide de Démarrage Rapide

### Prérequis
- Python 3.10+ (ou Python 3.14 déjà configuré).
- Les bibliothèques standard `fastapi` et `uvicorn` (déjà installées dans l'environnement).

### Lancement Local
Dans le répertoire du projet `/home/masqueyyy/.gemini/antigravity/scratch/faso-contes-legendes/` :

```bash
# Lancer le serveur d'application
python3 app.py
```

L'application est immédiatement disponible sur :
- **Application Web Immersive :** [http://localhost:8000](http://localhost:8000)
- **Rapport Officiel Imprimable :** [http://localhost:8000/report](http://localhost:8000/report)
- **Documentation API Interactive (Swagger) :** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 5. Perspectives de Déploiement & Évolutions Futures

Pour la suite du déploiement avec le laboratoire Gobelab :
1. **Mode Hors-Ligne Intégral (PWA) :** Enregistrement d'un Service Worker permettant aux écoles des zones rurales dépourvues d'accès Internet de faire fonctionner la totalité de la plateforme en cache local.
2. **Collecte Participative Modérée :** Espace de contribution permettant aux associations culturelles et aux conteurs des villages de proposer des variantes locales de contes, soumises à la validation d'un comité d'anciens et d'historiens.
3. **Réalité Augmentée sur Site (WebXR) :** Découverte des récits géolocalisés lorsque le visiteur se trouve physiquement sur les sites de Tiébélé, Loropéni ou Dafra.

---

## 6. Validation & Transmission

Ce livrable est officiellement transmis à l'attention de **M. Odilon Simpore** (`Odilon.simpore@gobelab.org`), en conformité avec l'échéance du **4 Novembre 2026**.

*« Si la termitière vit, elle ajoute de la terre à la terre. »*  
— Proverbe traditionnel burkinabè.
