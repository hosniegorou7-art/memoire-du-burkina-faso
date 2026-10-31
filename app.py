"""
FASO ORALIA - SERVEUR UNIFIÉ BI-MODE (FASTAPI + REPLI STANDARD ZÉRO DÉPENDANCE)
Plateforme Web Multimédia et Carte Interactive des Contes et Légendes du Burkina Faso
Fonctionne dans TOUT environnement Python (avec ou sans environnement virtuel, zéro dépendance requise).
"""

import os
import sys
import json
import mimetypes
import urllib.parse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

# --- BASE DE DONNÉES CULTURELLE DU BURKINA FASO ---

REGIONS_DATA = [
    {
        "id": "centre",
        "name": "Centre",
        "chefLieu": "Ouagadougou",
        "peoples": ["Mossi"],
        "languages": ["Mooré", "Français"],
        "emblem": "L'Étalon de Yennenga & Palais du Mogho Naba",
        "description": "Cœur historique du royaume Mossi, carrefour politique et culturel d'Afrique de l'Ouest.",
        "coords": [12.37, -1.52],
        "color": "#D97706"
    },
    {
        "id": "hauts-bassins",
        "name": "Hauts-Bassins",
        "chefLieu": "Bobo-Dioulasso",
        "peoples": ["Bobo", "Dioula", "Tiéfo", "Bwaba"],
        "languages": ["Dioula", "Bobo", "Français"],
        "emblem": "Les Silures Sacrés de Dafra & la Mosquée de Dioulassoba",
        "description": "Capitale économique et culturelle, terre de musique, kora, balafon et tolérance.",
        "coords": [11.18, -4.29],
        "color": "#2563EB"
    },
    {
        "id": "sahel",
        "name": "Sahel",
        "chefLieu": "Dori",
        "peoples": ["Peul", "Touareg", "Songhaï", "Bella"],
        "languages": ["Fulfulde", "Tamasheq", "Songhaï", "Français"],
        "emblem": "Les Dunes d'Oursi & les troupeaux Zébus sous le Pulaaku",
        "description": "Vaste étendue sahélienne, berceau des poésies pastorales et de l'honneur de la parole donnée.",
        "coords": [14.03, -0.03],
        "color": "#EA580C"
    },
    {
        "id": "cascades",
        "name": "Cascades",
        "chefLieu": "Banfora",
        "peoples": ["Sénoufo", "Gouin", "Karaboro", "Turka"],
        "languages": ["Dioula", "Sénoufo", "Gouin", "Français"],
        "emblem": "Cascades de Karfiguéla & Dômes de Fabedougou",
        "description": "Écrin de verdure et de falaises majestueuses, terre des forgerons sacrés et des danses de masques.",
        "coords": [10.63, -4.76],
        "color": "#059669"
    },
    {
        "id": "sud-ouest",
        "name": "Sud-Ouest",
        "chefLieu": "Gaoua",
        "peoples": ["Lobi", "Birifor", "Dagara"],
        "languages": ["Dagara", "Lobi", "Français"],
        "emblem": "Ruines de Loropéni (UNESCO) & Statuettes Bateba",
        "description": "Royaume des bâtisseurs de pierre millénaires et de la spiritualité intime avec les esprits.",
        "coords": [10.30, -3.53],
        "color": "#9333EA"
    },
    {
        "id": "centre-sud",
        "name": "Centre-Sud",
        "chefLieu": "Manga",
        "peoples": ["Gourounsi", "Kasséna", "Nankana", "Mossi"],
        "languages": ["Kassena", "Mooré", "Français"],
        "emblem": "Cour Royale de Tiébélé & Peintures murales Kasséna",
        "description": "Joyau d'architecture vernaculaire en terre crue peinte par les femmes.",
        "coords": [11.09, -0.96],
        "color": "#DC2626"
    },
    {
        "id": "centre-ouest",
        "name": "Centre-Ouest",
        "chefLieu": "Koudougou",
        "peoples": ["Gourounsi", "Mossi", "Nuni"],
        "languages": ["Mooré", "Nuni", "Lyélé", "Français"],
        "emblem": "Les Crocodiles Sacrés de Sabou & Théâtre du Faso",
        "description": "Terre de sagesse et de pactes ancestraux de respect absolu entre hommes et animaux.",
        "coords": [12.06, -2.23],
        "color": "#0891B2"
    },
    {
        "id": "boucle-mouhoun",
        "name": "Boucle du Mouhoun",
        "chefLieu": "Dédougou",
        "peoples": ["Bwaba", "Samo", "Marka", "Ko"],
        "languages": ["Bwamu", "San", "Dioula", "Français"],
        "emblem": "Le fleuve Mouhoun & les Masques en feuilles de Dédougou",
        "description": "Grenier du Faso traversé par le grand fleuve Mouhoun, foyer du FESTIMA.",
        "coords": [12.46, -3.46],
        "color": "#16A34A"
    }
]

STORIES_DATA = [
    {
        "id": "yennenga",
        "title": "L'Épopée de la Princesse Yennenga et l'Étalon Blanc",
        "nativeTitle": "Yennenga la wē-bīis naba (Mooré)",
        "regionId": "centre",
        "regionName": "Centre / Plateau-Central",
        "place": "Gambaga & Tenkodogo",
        "category": "Légende Fondatrice",
        "ethnic": "Mossi / Dagomba / Bissa",
        "languages": ["Français", "Mooré"],
        "duration": "6 min",
        "year": "XIIe - XIIIe siècle",
        "heroImage": "yennenga-hero.svg",
        "synopsis": "Fille intrépide du roi Nedega, cavalière hors pair refusant d'être mariée de force, Yennenga s'élance sur son étalon blanc pour conquérir sa liberté.",
        "moral": "Le destin d'un peuple naît du courage individuel de briser les chaînes et de la rencontre féconde entre cultures.",
        "tags": ["Émancipation", "Héroïsme", "Origines", "Royauté"],
        "sections": [
            {
                "title": "1. La Vierge Guerrière de Gambaga",
                "timeOffset": 0,
                "textFr": "Au temps jadis, dans le royaume de Gambaga, vivait le roi Naba Nedega. Sa fille Yennenga était la plus formidable guerrière et cavalière du royaume...",
                "textNative": "Kudum wakat, Gambaga tẽnga pʋgẽ, Naba Nedega n da be. A bi-pugl Yennenga zoeema ne we-rũng la tãosgo...",
                "annotation": "Naba : Chef traditionnel chez les Mossi détenant le pouvoir légitime (Naam)."
            }
        ]
    },
    {
        "id": "dafra",
        "title": "Les Silures Sacrés de Dafra",
        "nativeTitle": "Dafra jɛgɛ senumanw kò (Dioula)",
        "regionId": "hauts-bassins",
        "regionName": "Hauts-Bassins",
        "place": "Falaise de Dafra, Bobo-Dioulasso",
        "category": "Mythe & Esprit de la Nature",
        "ethnic": "Bobo / Dioula",
        "languages": ["Français", "Dioula"],
        "duration": "5 min",
        "year": "Temps immémorial",
        "heroImage": "dafra-hero.svg",
        "synopsis": "Dans une gorge spectaculaire près de Bobo-Dioulasso nagent de gigantesques silures noirs vénérés comme les protecteurs spirituels de la cité.",
        "moral": "L'harmonie entre la nature, l'eau et les hommes repose sur le respect inconditionnel des pactes sacrés.",
        "tags": ["Sacré", "Nature", "Totem", "Spiritualité"],
        "sections": [
            {
                "title": "1. La Falaise Sacrée au Sud de Sya",
                "timeOffset": 0,
                "textFr": "À quelques kilomètres de Sya, la terre s'ouvre sur un canyon vertigineux où résident les silures sacrés...",
                "textNative": "Sya dugu kɛrɛfɛ, kulu dɔ bɛ yen ka kɔrɔ kosɛbɛ. Dafra kɔ la, jɛgɛ finba caman bɛ yen...",
                "annotation": "Sya : Nom d'origine de Bobo-Dioulasso."
            }
        ]
    },
    {
        "id": "guimbi-ouattara",
        "title": "Guimbi Ouattara, la Diplomate et Guerrière de Sya",
        "nativeTitle": "Guimbi Ouattara, Sya cɛfarin muso (Dioula)",
        "regionId": "hauts-bassins",
        "regionName": "Hauts-Bassins",
        "place": "Bobo-Dioulasso",
        "category": "Récit Historique",
        "ethnic": "Dioula / Mandingue",
        "languages": ["Français", "Dioula"],
        "duration": "5 min 30",
        "year": "XIXe siècle (1836 - 1919)",
        "heroImage": "guimbi-hero.svg",
        "synopsis": "Grande dame d'État et stratège militaire écoutée dans toute la sous-région, elle utilisa son intelligence diplomatique pour préserver Sya.",
        "moral": "La force brute détruit ; la sagesse diplomatique et l'intelligence protègent les peuples.",
        "tags": ["Leadership", "Diplomatie", "Histoire", "Paix"],
        "sections": [
            {
                "title": "1. Une Fille de Prince élevée pour Régner",
                "timeOffset": 0,
                "textFr": "Née vers 1836 à Bobo-Dioulasso, Guimbi était la fille aînée de Diori Ouattara...",
                "textNative": "Guimbi Ouattara bangera k'a to Diori Ouattara bolo. A y'a kɛ muso kunsigi ye...",
                "annotation": "Dynastie de Kong : Souverains du royaume de Sya."
            }
        ]
    },
    {
        "id": "sabou",
        "title": "Les Crocodiles Sacrés de Sabou",
        "nativeTitle": "Sabou ebmẽ wã la bãmb zoodo (Mooré)",
        "regionId": "centre-ouest",
        "regionName": "Centre-Ouest",
        "place": "Mare de Sabou, Boulkiemdé",
        "category": "Alliance Totémique",
        "ethnic": "Gourounsi / Mossi",
        "languages": ["Français", "Mooré"],
        "duration": "4 min 45",
        "year": "XIVe siècle",
        "heroImage": "sabou-hero.svg",
        "synopsis": "Égaré et mourant de soif dans la savane, un chasseur fut guidé par un crocodile vers une mare cachée. Un pacte fraternel éternel fut scellé.",
        "moral": "La gratitude sincère transforme un ennemi redoutable en un frère protecteur.",
        "tags": ["Totem", "Amitié", "Gratitude", "Animaux"],
        "sections": [
            {
                "title": "1. La Soif Mortelle dans la Brousse Brûlante",
                "timeOffset": 0,
                "textFr": "Il y a des siècles, le chasseur Badaye s'effondra au pied d'un baobab, terrassé par l'Harmattan...",
                "textNative": "Kudum wakat, we-rũng toagd a ye n da boond Badaye...",
                "annotation": "Harmattan : Vent chaud et sec du désert."
            }
        ]
    },
    {
        "id": "lievre-hyene",
        "title": "Le Lièvre, l'Hyène et le Puits de la Sécheresse",
        "nativeTitle": "Soaamba la Wamdé ko-bʋgã zaba (Mooré / Dioula)",
        "regionId": "boucle-mouhoun",
        "regionName": "Boucle du Mouhoun",
        "place": "Bords du fleuve Mouhoun",
        "category": "Conte Moral & Initiatique",
        "ethnic": "Universel",
        "languages": ["Français", "Mooré", "Dioula"],
        "duration": "6 min 15",
        "year": "Tradition Millénaire",
        "heroImage": "lievre-hero.svg",
        "synopsis": "L'hyène refuse de participer à l'effort collectif pour creuser le puits du village et vole l'eau la nuit. Le lièvre lui tend un piège magistral.",
        "moral": "La ruse bienveillante et le travail collectif triomphent toujours de l'égoïsme et de la cupidité.",
        "tags": ["Ruse", "Humour", "Solidarité", "Enfance"],
        "sections": [
            {
                "title": "1. La Grande Soif des Animaux de la Savane",
                "timeOffset": 0,
                "textFr": "Le sol craquelait comme une calebasse brisée. Le Roi Lion ordonna de creuser un puits d'eau...",
                "textNative": "Wĩntooga tula wusgo, koom ka be ye. Gampɛlga n bool rũmsã...",
                "annotation": "Soaamba & Wamdé : Les deux figures légendaires de l'initiation orale."
            }
        ]
    },
    {
        "id": "loropeni",
        "title": "Le Mystère des Bâtisseurs des Ruines de Loropéni",
        "nativeTitle": "Loropéni kulu dãgara bãngr (Dagara / Français)",
        "regionId": "sud-ouest",
        "regionName": "Sud-Ouest",
        "place": "Loropéni, Poni",
        "category": "Récit Historique & Patrimoine",
        "ethnic": "Lobi / Dagara / Kaan",
        "languages": ["Français", "Dagara"],
        "duration": "5 min 45",
        "year": "XIe - XVIIe siècle",
        "heroImage": "loropeni-hero.svg",
        "synopsis": "Inscrites à l'UNESCO, les imposantes murailles de latérite taillée protégeaient les souverains et les trésors d'or du commerce transsaharien.",
        "moral": "Les pierres façonnées avec honneur instruisent les générations à travers les millénaires.",
        "tags": ["UNESCO", "Histoire", "Architecture", "Mystère"],
        "sections": [
            {
                "title": "1. La Forteresse de Pierre Oubliée dans la Jungle",
                "timeOffset": 0,
                "textFr": "Classées à l'UNESCO, les ruines de Loropéni comptent parmi les trésors architecturaux les plus précieux...",
                "textNative": "Loropéni kparaga tãmsã wosa hal n yɩɩd yʋm tuhuri...",
                "annotation": "UNESCO : Site inscrit en 2009 au patrimoine mondial."
            }
        ]
    },
    {
        "id": "berger-sahel",
        "title": "Le Berger Peul et le Génie du Sahel",
        "nativeTitle": "Gaynaako e Jinnaaru Sahel (Fulfulde / Français)",
        "regionId": "sahel",
        "regionName": "Sahel",
        "place": "Dunes d'Oursi, Dori",
        "category": "Légende Pastorale",
        "ethnic": "Peul (Fulani)",
        "languages": ["Français", "Fulfulde"],
        "duration": "5 min",
        "year": "XVe siècle",
        "heroImage": "sahel-hero.svg",
        "synopsis": "Un génie propose à un jeune berger une source d'eau inépuisable contre sa parole d'honneur. Fidèle au code du Pulaaku, Amadou refuse de trahir.",
        "moral": "La dignité et le respect de la parole donnée valent plus que toutes les richesses du monde.",
        "tags": ["Honneur", "Sahel", "Éthique", "Pulaaku"],
        "sections": [
            {
                "title": "1. La Transhumance sous le Ciel d'Ocre",
                "timeOffset": 0,
                "textFr": "Le berger Amadou guidait ses zébus à travers les dunes d'Oursi...",
                "textNative": "Amadou gaynaako suka gorko ina ɗowoo jawdi mum hakkunde Dori e Oursi...",
                "annotation": "Pulaaku : Code d'honneur et de retenue des Peuls."
            }
        ]
    },
    {
        "id": "tiebele",
        "title": "Les Murs Peints de Tiébélé et la Sagesse Kasséna",
        "nativeTitle": "Tiébélé kora na luri zõnga (Kassena / Mooré)",
        "regionId": "centre-sud",
        "regionName": "Centre-Sud",
        "place": "Cour Royale de Tiébélé, Nahouri",
        "category": "Art & Sagesse Ancestrale",
        "ethnic": "Gourounsi / Kasséna",
        "languages": ["Français", "Mooré", "Kassena"],
        "duration": "5 min 15",
        "year": "XVIe siècle à nos jours",
        "heroImage": "tiebele-hero.svg",
        "synopsis": "Les femmes kasséna peignent à la main des chefs-d'œuvre de fresques géométriques en latérite et kaolin sur les maisons en banco de Tiébélé.",
        "moral": "L'art est un bouclier protecteur de la mémoire collective et le fil sacré reliant les générations.",
        "tags": ["Art", "Architecture", "Femmes", "Transmission"],
        "sections": [
            {
                "title": "1. La Forteresse de Terre Vernie",
                "timeOffset": 0,
                "textFr": "Au pied des collines de granite du Nahouri se dresse la Cour Royale de Tiébélé...",
                "textNative": "Tiébélé tẽnga yaa tẽng kãsenga Nahouri tẽngrẽ...",
                "annotation": "UNESCO : Savoir-faire d'architecture vernaculaire remarquable."
            }
        ]
    }
]

# --- DÉTECTION ET CONFIGURATION FASTAPI ---

try:
    from fastapi import FastAPI, HTTPException, Query
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import FileResponse, HTMLResponse
    from fastapi.staticfiles import StaticFiles

    app = FastAPI(
        title="Faso Oralia API",
        description="API de valorisation, numérisation et transmission des contes et légendes du Burkina Faso.",
        version="1.0.0",
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
        if not index_file.exists():
            raise HTTPException(status_code=404, detail="Index file not found")
        return FileResponse(index_file)

    @app.get("/report", response_class=HTMLResponse)
    async def serve_report():
        report_file = STATIC_DIR / "report" / "index.html"
        if not report_file.exists():
            raise HTTPException(status_code=404, detail="Report file not found")
        return FileResponse(report_file)

    @app.get("/api/health")
    async def health_check():
        return {
            "status": "online",
            "platform": "Faso Oralia - Plateforme Web Multimédia des Contes et Légendes du Burkina Faso",
            "version": "1.0.0",
            "engine": "FastAPI + Uvicorn",
            "stories_count": len(STORIES_DATA),
            "regions_count": len(REGIONS_DATA)
        }

    @app.get("/api/regions")
    async def get_regions():
        return REGIONS_DATA

    @app.get("/api/contes")
    async def get_stories(category: str = None, language: str = None, search: str = None):
        results = STORIES_DATA
        if category and category.lower() != "all":
            results = [s for s in results if category.lower() in s["category"].lower()]
        if language and language.lower() != "all":
            results = [s for s in results if any(language.lower() == l.lower() for l in s["languages"])]
        if search:
            q = search.lower()
            results = [
                s for s in results
                if q in s["title"].lower() or q in s["synopsis"].lower() or q in s["regionName"].lower() or q in s["ethnic"].lower()
            ]
        return results

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


# --- SERVEUR DE REPLI STANDARD PYTHON (ZÉRO DÉPENDANCE REQUISE) ---

if not HAS_FASTAPI:
    import http.server
    import socketserver

    class FasoHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
        def end_headers(self):
            # Autorise les requêtes CORS dans tous les navigateurs
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "*")
            super().end_headers()

        def do_OPTIONS(self):
            self.send_response(200)
            self.end_headers()

        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            path = parsed.path
            params = urllib.parse.parse_qs(parsed.query)

            # Route Racine : Index HTML
            if path in ("/", "/index.html"):
                self.serve_file(STATIC_DIR / "index.html", "text/html; charset=utf-8")
                return

            # Route Rapport Officiel Gobelab
            if path in ("/report", "/report/"):
                self.serve_file(STATIC_DIR / "report" / "index.html", "text/html; charset=utf-8")
                return

            # API Health Check
            if path == "/api/health":
                self.send_json({
                    "status": "online",
                    "platform": "Faso Oralia - Plateforme Web Multimédia des Contes et Légendes du Burkina Faso",
                    "version": "1.0.0",
                    "engine": "Python Standard HTTP (Zéro Dépendance)",
                    "stories_count": len(STORIES_DATA),
                    "regions_count": len(REGIONS_DATA)
                })
                return

            # API Régions
            if path == "/api/regions":
                self.send_json(REGIONS_DATA)
                return

            # API Contes avec filtres
            if path == "/api/contes":
                category = params.get("category", [None])[0]
                language = params.get("language", [None])[0]
                search = params.get("search", [None])[0]

                results = STORIES_DATA
                if category and category.lower() != "all":
                    results = [s for s in results if category.lower() in s["category"].lower()]
                if language and language.lower() != "all":
                    results = [s for s in results if any(language.lower() == l.lower() for l in s["languages"])]
                if search:
                    q = search.lower()
                    results = [
                        s for s in results
                        if q in s["title"].lower() or q in s["synopsis"].lower() or q in s["regionName"].lower() or q in s["ethnic"].lower()
                    ]
                self.send_json(results)
                return

            # API Détail d'un conte : /api/contes/{id}
            if path.startswith("/api/contes/"):
                story_id = path.replace("/api/contes/", "").strip("/")
                story = next((s for s in STORIES_DATA if s["id"] == story_id), None)
                if story:
                    self.send_json(story)
                else:
                    self.send_error(404, f"Récit '{story_id}' introuvable.")
                return

            # Fichiers statiques (/static/...)
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
    """Lance le serveur HTTP standard (aucune dépendance requise)"""
    import http.server
    import socketserver

    handler = FasoHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer((host, port), handler) as httpd:
        print(f"\n==================================================================")
        print(f"🇧🇫 FASO ORALIA - SERVEUR ACTIF (Mode Standard Zéro Dépendance)")
        print(f"==================================================================")
        print(f"🌐 Application Web   : http://localhost:{port}")
        print(f"📋 Rapport Officiel : http://localhost:{port}/report")
        print(f"💡 Info : Tourne sans FastAPI/uvicorn sur la bibliothèque standard !")
        print(f"==================================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nArrêt propre du serveur.")


# --- POINT D'ENTRÉE PRINCIPAL ---

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
        print("ℹ️ Module 'fastapi' non détecté dans cet environnement Python.")
        print("⚡ Activation automatique du serveur Web standard intégré (100% autonome).")
        run_standalone_server(port=port)
