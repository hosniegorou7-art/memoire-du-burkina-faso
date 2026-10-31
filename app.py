"""
FASO ORALIA - SERVEUR BACKEND FASTAPI
Plateforme Web Multimédia et Carte Interactive des Contes et Légendes du Burkina Faso
"""

import os
from pathlib import Path
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="Faso Oralia API",
    description="API de valorisation, numérisation et transmission des contes et légendes du Burkina Faso.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montage des fichiers statiques
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


# --- MODÈLES DE DONNÉES PYDANTIC ---

class StorySection(BaseModel):
    title: str
    timeOffset: int
    textFr: str
    textNative: str
    annotation: Optional[str] = None

class Story(BaseModel):
    id: str
    title: str
    nativeTitle: Optional[str] = None
    regionId: str
    regionName: str
    place: str
    category: str
    ethnic: str
    languages: List[str]
    duration: str
    year: str
    heroImage: str
    synopsis: str
    sections: List[StorySection]
    moral: str
    tags: List[str]

class Region(BaseModel):
    id: str
    name: str
    chefLieu: str
    peoples: List[str]
    languages: List[str]
    emblem: str
    description: str
    coords: List[float]
    color: str


# --- BASE DE DONNÉES CULTURELLE (Synchronisée avec le front-end) ---

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


# --- ROUTES PRINCIPALES (PAGES HTML) ---

@app.get("/", response_class=HTMLResponse)
async def serve_home():
    """Page d'accueil principale avec Carte Interactive 2D/3D et Bibliothèque"""
    index_file = STATIC_DIR / "index.html"
    if not index_file.exists():
        raise HTTPException(status_code=404, detail="Index file not found")
    return FileResponse(index_file)

@app.get("/report", response_class=HTMLResponse)
async def serve_report():
    """Rapport officiel pour Gobelab (destiné à Odilon.simpore@gobelab.org)"""
    report_file = STATIC_DIR / "report" / "index.html"
    if not report_file.exists():
        raise HTTPException(status_code=404, detail="Report file not found")
    return FileResponse(report_file)


# --- ROUTES REST API ---

@app.get("/api/health")
async def health_check():
    """Contrôle d'état du serveur"""
    return {
        "status": "online",
        "platform": "Faso Oralia - Plateforme Web Multimédia des Contes et Légendes du Burkina Faso",
        "version": "1.0.0",
        "stories_count": len(STORIES_DATA),
        "regions_count": len(REGIONS_DATA)
    }

@app.get("/api/regions")
async def get_regions():
    """Retourne la liste des 13 régions culturelles du Burkina Faso"""
    return REGIONS_DATA

@app.get("/api/contes")
async def get_stories(
    category: Optional[str] = Query(None, description="Filtrer par catégorie"),
    language: Optional[str] = Query(None, description="Filtrer par langue (Mooré, Dioula, Fulfulde...)"),
    search: Optional[str] = Query(None, description="Recherche textuelle")
):
    """Retourne la liste des contes et légendes filtrés"""
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
    """Retourne le détail complet d'un conte avec ses sections et transcriptions bilingues"""
    story = next((s for s in STORIES_DATA if s["id"] == story_id), None)
    if not story:
        raise HTTPException(status_code=404, detail=f"Récit avec l'identifiant '{story_id}' introuvable.")
    return story


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
