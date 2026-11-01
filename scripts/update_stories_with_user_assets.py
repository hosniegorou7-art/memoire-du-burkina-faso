import json, os

new_stories = [
    {
        "id": "conte-senoufo",
        "title": "La Sagesse du Caméléon et du Lièvre",
        "nativeTitle": "Sénoufo N'Golo : Caméléon ni Sonsan",
        "regionId": "djoro",
        "regionName": "Djôrô (Cascades / Banfora)",
        "place": "Falaises et bois sacrés de Banfora",
        "category": "Conte Initiatique & Sagesse",
        "ethnic": "Sénoufo",
        "languages": ["Sénoufo", "Français"],
        "duration": "1 min 24",
        "year": "Tradition orale ancestrale",
        "heroImage": "etnies/ethnie-senoufo.jpg",
        "audioUrl": "/static/audio/conte-senoufo.mp3",
        "audioCredit": "© Enregistrement authentique en langue Sénoufo, terroirs du Sud-Ouest",
        "synopsis": "Dans les clairières du pays Sénoufo, le lièvre se vante de sa vitesse face au lent caméléon. La patience, l'humilité et la parfaite harmonie avec la nature se révèlent plus sages que la précipitation.",
        "moral": "La hâte engendre l'erreur ; la patience, le calme et la constance mènent à la vérité.",
        "tags": ["Sénoufo", "Cascades", "Patience", "Animaux"],
        "chapters": [
            {"title": "1. Le défi de la clairière", "textNative": "Kɔrɔlen dɔ la, sénoufo kamba maara.", "textFr": "Le lièvre provoqua tous les animaux de la brousse à la grande course d'endurance."},
            {"title": "2. La ruse du caméléon", "textNative": "N'golo ye sabali fɔli kɛ.", "textFr": "Le caméléon, par son calme légendaire et sa discrétion, s'accrocha à la queue du lièvre sans bruit."},
            {"title": "3. La ligne d'arrivée", "textNative": "Sabali de ye kɛrɛnkɛrɛn ye.", "textFr": "Arrivé essoufflé au terme du parcours, le lièvre découvrit que le caméléon l'attendait déjà assis paisiblement."}
        ],
        "sections": [
            {"title": "1. Le défi de la clairière", "textNative": "Kɔrɔlen dɔ la, sénoufo kamba maara.", "textFr": "Le lièvre provoqua tous les animaux de la brousse à la grande course d'endurance."},
            {"title": "2. La ruse du caméléon", "textNative": "N'golo ye sabali fɔli kɛ.", "textFr": "Le caméléon, par son calme légendaire et sa discrétion, s'accrocha à la queue du lièvre sans bruit."},
            {"title": "3. La ligne d'arrivée", "textNative": "Sabali de ye kɛrɛnkɛrɛn ye.", "textFr": "Arrivé essoufflé au terme du parcours, le lièvre découvrit que le caméléon l'attendait déjà assis paisiblement."}
        ]
    },
    {
        "id": "conte-samo-arbre",
        "title": "Le Pacte de l'Arbre à Palabres",
        "nativeTitle": "San Ka Soro : L'Alliance des Anciens",
        "regionId": "sourou",
        "regionName": "Sourou (Tougan / Nayala)",
        "place": "Sous le grand baobab de Toma",
        "category": "Conte Moral & Parenté à Plaisanterie",
        "ethnic": "San (Samo)",
        "languages": ["San (Samo)", "Français"],
        "duration": "2 min 51",
        "year": "Tradition orale San",
        "heroImage": "etnies/ethnie-samo.jpg",
        "audioUrl": "/static/audio/conte-samo.mp3",
        "audioCredit": "© Récit authentique en langue San (Samo), vallée du Sourou",
        "synopsis": "Récit des anciens San sur le pouvoir de l'amitié, la parenté à plaisanterie (Rakiré) et la résolution pacifique des querelles de village.",
        "moral": "Le rire désamorce la rancœur et le respect des alliances ancestrales protège la communauté.",
        "tags": ["Samo", "San", "Sourou", "Rakiré", "Paix"],
        "chapters": [
            {"title": "1. L'assemblée sous le baobab", "textNative": "San wulu ye koro kɛ yiri kɔrɔ.", "textFr": "Les notables du village se réunissent sous l'arbre sacré pour apaiser les discordes naissantes."},
            {"title": "2. La force de la plaisanterie", "textNative": "Rakiré kuma ye lafiya sabati.", "textFr": "Par les joutes oratoires fraternelles et l'humour traditionnel, les tensions s'évanouissent dans l'amitié."}
        ],
        "sections": [
            {"title": "1. L'assemblée sous le baobab", "textNative": "San wulu ye koro kɛ yiri kɔrɔ.", "textFr": "Les notables du village se réunissent sous l'arbre sacré pour apaiser les discordes naissantes."},
            {"title": "2. La force de la plaisanterie", "textNative": "Rakiré kuma ye lafiya sabati.", "textFr": "Par les joutes oratoires fraternelles et l'humour traditionnel, les tensions s'évanouissent dans l'amitié."}
        ]
    },
    {
        "id": "conte-samo-fleuve",
        "title": "Les Deux Frères et le Génie du Mouhoun",
        "nativeTitle": "San Dôgô : Génie du Fleuve et Partage",
        "regionId": "sourou",
        "regionName": "Sourou / Bankui",
        "place": "Méandres du fleuve Mouhoun",
        "category": "Mythe & Conte Initiatique",
        "ethnic": "San (Samo)",
        "languages": ["San (Samo)", "Français"],
        "duration": "5 min 58",
        "year": "Mémoire séculaire du Sourou",
        "heroImage": "etnies/scarification-tradition.jpg",
        "audioUrl": "/static/audio/conte-samo-2.mp3",
        "audioCredit": "© Enregistrement de veillée en langue San (Samo), 5 min 58",
        "synopsis": "Deux frères pêcheurs rencontrent le gardien des eaux profondes du Mouhoun. L'aîné, généreux et pieux, reçoit la bénédiction aquatique, tandis que le second apprend la leçon de l'humilité.",
        "moral": "Ce que l'on donne au fleuve revient en vie ; la rapacité assèche le cœur de l'homme.",
        "tags": ["Samo", "Mouhoun", "Génie de l'eau", "Fraternité"],
        "chapters": [
            {"title": "1. La descente vers les berges", "textNative": "Mouhoun ji kɔrɔ dɔgɔkun na.", "textFr": "Les deux frères partent à l'aube aux confins du fleuve interdit sous les conseils de leur grand-mère."},
            {"title": "2. L'épreuve du passeur sacré", "textNative": "Ji mɔgɔ kɔrɔba ye kuma bila.", "textFr": "L'esprit de l'eau demande le partage de la première prise pour nourrir les poissons ancêtres."},
            {"title": "3. L'abondance des justes", "textNative": "Barika nana dugu kɔnɔ.", "textFr": "Le filet se remplit d'une abondance miraculeuse qui nourrit les familles de tout le village."}
        ],
        "sections": [
            {"title": "1. La descente vers les berges", "textNative": "Mouhoun ji kɔrɔ dɔgɔkun na.", "textFr": "Les deux frères partent à l'aube aux confins du fleuve interdit sous les conseils de leur grand-mère."},
            {"title": "2. L'épreuve du passeur sacré", "textNative": "Ji mɔgɔ kɔrɔba ye kuma bila.", "textFr": "L'esprit de l'eau demande le partage de la première prise pour nourrir les poissons ancêtres."},
            {"title": "3. L'abondance des justes", "textNative": "Barika nana dugu kɔnɔ.", "textFr": "Le filet se remplit d'une abondance miraculeuse qui nourrit les familles de tout le village."}
        ]
    },
    {
        "id": "conte-gourmantcheba-dozo",
        "title": "Le Chasseur Dozo et le Lion du Gobnangou",
        "nativeTitle": "Gulmancéba Kpankpando : Dozo ya Yabli",
        "regionId": "tapoa",
        "regionName": "Tapoa / Goulmou",
        "place": "Falaises de Gobnangou (Diapaga)",
        "category": "Épopée de Chasseurs Dozo",
        "ethnic": "Gourmantché (Gulmanceba)",
        "languages": ["Gulmancéma", "Français"],
        "duration": "1 min 54",
        "year": "Tradition Dozo du Gulmu",
        "heroImage": "etnies/ethnie-gourmantche.jpg",
        "audioUrl": "/static/audio/conte-gourmantcheba-1.mp3",
        "audioCredit": "© Confrérie des chasseurs traditionnels du pays Gourmantché",
        "synopsis": "Un jeune chasseur Dozo apprend le langage secret des vents et le pacte sacré unissant les hommes et les fauves des escarpements du Gobnangou.",
        "moral": "Le véritable courage réside dans la connaissance des limites et le respect absolu de la nature.",
        "tags": ["Gourmantché", "Gobnangou", "Dozo", "Tapoa", "Courage"],
        "chapters": [
            {"title": "1. L'initiation sur les falaises", "textNative": "Gulmancé dozo tanli po.", "textFr": "Le maître Dozo transmet le mot de passe silencieux qui écarte les périls de la falaise."},
            {"title": "2. Le face-à-face respectueux", "textNative": "Yabli ya ninsalo gbangbandi.", "textFr": "L'homme et le lion se contemplent et scellent une trêve d'honneur sous la voûte du ciel."}
        ],
        "sections": [
            {"title": "1. L'initiation sur les falaises", "textNative": "Gulmancé dozo tanli po.", "textFr": "Le maître Dozo transmet le mot de passe silencieux qui écarte les périls de la falaise."},
            {"title": "2. Le face-à-face respectueux", "textNative": "Yabli ya ninsalo gbangbandi.", "textFr": "L'homme et le lion se contemplent et scellent une trêve d'honneur sous la voûte du ciel."}
        ]
    },
    {
        "id": "conte-gourmantcheba-tresor",
        "title": "Le Secret des Trois Calebasses du Roi Yendabri",
        "nativeTitle": "Yendabri Pungani : Les Calebasses de Sagesse",
        "regionId": "goulmou",
        "regionName": "Goulmou (Fada N'Gourma)",
        "place": "Palais royal de Fada N'Gourma",
        "category": "Légende Royale & Mystère",
        "ethnic": "Gourmantché",
        "languages": ["Gulmancéma", "Français"],
        "duration": "2 min 51",
        "year": "Mémoire royale du Gulmu",
        "heroImage": "etnies/masque-faso.jpg",
        "audioUrl": "/static/audio/conte-gourmanctheba-2.mp3",
        "audioCredit": "© Veillée de cour traditionnelle en langue Gulmancéma",
        "synopsis": "Le sage roi Yendabri demande à ses trois fils de choisir entre trois calebasses royales : l'une d'or, l'autre d'armes et la troisième de grains de mil.",
        "moral": "La véritable richesse pérenne d'un royaume réside dans la terre nourricière et le travail assidu.",
        "tags": ["Gourmantché", "Yendabri", "Fada", "Sagesse", "Royauté"],
        "chapters": [
            {"title": "1. Le test royal", "textNative": "O bado Yendabri yendi po.", "textFr": "Le grand souverain convoque les princes pour mesurer leur discernement politique."},
            {"title": "2. Le triomphe du mil", "textNative": "Kua ya faabu kuli po.", "textFr": "Le fils cadet choisit les semences et sauve le peuple lors de la grande sécheresse."}
        ],
        "sections": [
            {"title": "1. Le test royal", "textNative": "O bado Yendabri yendi po.", "textFr": "Le grand souverain convoque les princes pour mesurer leur discernement politique."},
            {"title": "2. Le triomphe du mil", "textNative": "Kua ya faabu kuli po.", "textFr": "Le fils cadet choisit les semences et sauve le peuple lors de la grande sécheresse."}
        ]
    },
    {
        "id": "conte-gourmantcheba-flute",
        "title": "La Flûte Sacrée et le Vent d'Harmattan",
        "nativeTitle": "Gulmancé Bieba : Harmattan la Kunkuma",
        "regionId": "sirba",
        "regionName": "Sirba / Goulmou",
        "place": "Berges rocheuses de la rivière Sirba",
        "category": "Poésie Orale & Conte Musical",
        "ethnic": "Gourmantché",
        "languages": ["Gulmancéma", "Français"],
        "duration": "3 min 28",
        "year": "Tradition musicale du Gulmu",
        "heroImage": "etnies/instrument-balafon.jpg",
        "audioUrl": "/static/audio/conte-gourmantheba-3.mp3",
        "audioCredit": "© Enregistrement de flûte et conte en langue Gulmancéma",
        "synopsis": "Un jeune berger berce la savane avec sa flûte taillée dans le roseau de la Sirba. Sa mélodie appelle la clémence des ancêtres et ranime les sources souterraines.",
        "moral": "La musique pure apaise les esprits et relie le cœur des hommes à la beauté du monde.",
        "tags": ["Gourmantché", "Musique", "Sirba", "Harmattan"],
        "chapters": [
            {"title": "1. Le chant du roseau", "textNative": "Harmattan fiibo ya kunkuma.", "textFr": "Le berger fait résonner sa mélodie sur les plateaux de latérite dorée."},
            {"title": "2. La clarté de la source", "textNative": "Nmiamu n pendi boncianla.", "textFr": "L'eau claire jaillit à nouveau entre les failles et le troupeau danse de joie."}
        ],
        "sections": [
            {"title": "1. Le chant du roseau", "textNative": "Harmattan fiibo ya kunkuma.", "textFr": "Le berger fait résonner sa mélodie sur les plateaux de latérite dorée."},
            {"title": "2. La clarté de la source", "textNative": "Nmiamu n pendi boncianla.", "textFr": "L'eau claire jaillit à nouveau entre les failles et le troupeau danse de joie."}
        ]
    },
    {
        "id": "conte-moore-puits",
        "title": "La Ruse du Lièvre au Puits du Chef",
        "nativeTitle": "Mooré Nambara : Soaamba la Kolga",
        "regionId": "kadiogo",
        "regionName": "Kadiogo / Oubri",
        "place": "Plateau central Mossi",
        "category": "Conte Populaire Moral",
        "ethnic": "Mossi",
        "languages": ["Mooré", "Français"],
        "duration": "2 min 43",
        "year": "Tradition orale Moaga",
        "heroImage": "etnies/pilon-mossi.jpg",
        "audioUrl": "/static/audio/conte-en-moore.mp3",
        "audioCredit": "© Récit authentique en langue Mooré, Ouagadougou",
        "synopsis": "En pleine saison sèche, tous les animaux unissent leurs efforts pour creuser un puits sauf Soaamba le lièvre paresseux. Pris au piège de sa propre ruse, il apprend la valeur du labeur partagé.",
        "moral": "Nul ne doit jouir de la peine d'autrui sans contribuer à l'effort de tous.",
        "tags": ["Mooré", "Mossi", "Soaamba", "Puits", "Labeur"],
        "chapters": [
            {"title": "1. L'appel du Mogho Naba", "textNative": "Soaamba kamba bãngr-goama.", "textFr": "L'assemblée des animaux décide de creuser un puits d'eau douce pour tout le pays."},
            {"title": "2. La statue de glu", "textNative": "B kẽe Soaamba t'a pa tõog n zoe ye.", "textFr": "Une sentinelle couverte de glu piège le voleur nocturne au grand soulagement de la communauté."}
        ],
        "sections": [
            {"title": "1. L'appel du Mogho Naba", "textNative": "Soaamba kamba bãngr-goama.", "textFr": "L'assemblée des animaux décide de creuser un puits d'eau douce pour tout le pays."},
            {"title": "2. La statue de glu", "textNative": "B kẽe Soaamba t'a pa tõog n zoe ye.", "textFr": "Une sentinelle couverte de glu piège le voleur nocturne au grand soulagement de la communauté."}
        ]
    },
    {
        "id": "conte-moore-baobab",
        "title": "L'Orpheline et le Baobab Généreux",
        "nativeTitle": "Mooré Kpêla : Pug-sad-bil la Tõèga",
        "regionId": "yaadga",
        "regionName": "Yaadga (Yatenga / Ouahigouya)",
        "place": "Terroirs arides du Yatenga",
        "category": "Conte d'Espérance & Sagesse",
        "ethnic": "Mossi",
        "languages": ["Mooré", "Français"],
        "duration": "2 min 51",
        "year": "Mémoire du Yaadga",
        "heroImage": "etnies/herminette-mossi.jpg",
        "audioUrl": "/static/audio/conte-moore-2.mp3",
        "audioCredit": "© Veillée traditionnelle en langue Mooré, Ouahigouya",
        "synopsis": "Une orpheline maltraitée par sa marâtre trouve réconfort auprès d'un baobab millénaire qui s'ouvre pour lui offrir nourriture et parures de prince.",
        "moral": "La pureté du cœur triomphe de la méchanceté et la terre des aïeux protège les affligés.",
        "tags": ["Mooré", "Mossi", "Yaadga", "Baobab", "Générosité"],
        "chapters": [
            {"title": "1. La prière sous l'arbre", "textNative": "Tõèg kãsenga la pug-sad-bil sõama.", "textFr": "L'enfant pleure au pied de l'arbre et chante la chanson de sa mère disparue."},
            {"title": "2. Le cadeau des ancêtres", "textNative": "Wẽnd sõngr pa kõm ye.", "textFr": "Le baobab s'ouvre et lui confie les parures éclatantes des princesses d'autrefois."}
        ],
        "sections": [
            {"title": "1. La prière sous l'arbre", "textNative": "Tõèg kãsenga la pug-sad-bil sõama.", "textFr": "L'enfant pleure au pied de l'arbre et chante la chanson de sa mère disparue."},
            {"title": "2. Le cadeau des ancêtres", "textNative": "Wẽnd sõngr pa kõm ye.", "textFr": "Le baobab s'ouvre et lui confie les parures éclatantes des princesses d'autrefois."}
        ]
    },
    {
        "id": "conte-dioula-tisserand",
        "title": "La Parole d'Honneur du Vieux Tisserand de Sya",
        "nativeTitle": "Dioula Nziirin : Gēkɛ kɔrɔba ka kuma",
        "regionId": "guiriko",
        "regionName": "Guiriko (Bobo-Dioulasso)",
        "place": "Vieux quartier Dioulassoba",
        "category": "Conte Urbain & Artisanat Textile",
        "ethnic": "Dioula",
        "languages": ["Dioula", "Français"],
        "duration": "2 min 51",
        "year": "Tradition textile de Bobo-Dioulasso",
        "heroImage": "etnies/art-bobo-fer.jpg",
        "audioUrl": "/static/audio/conte-en-dioula.mp3",
        "audioCredit": "© Récit authentique en langue Dioula, Bobo-Dioulasso",
        "synopsis": "Dans la vieille ville de Bobo, un vénérable tisserand enseigne à son apprenti que chaque fil de coton est tissé avec la sincérité et le respect de la parole donnée.",
        "moral": "La parole d'un homme est son pagne d'honneur : une fois ternie, nulle teinture ne peut lui redonner son éclat.",
        "tags": ["Dioula", "Bobo-Dioulasso", "Tissage", "Honneur", "Parole"],
        "chapters": [
            {"title": "1. La mélodie du métier à tisser", "textNative": "Gēkɛ mɔgɔw ka sen dioula dugu ra.", "textFr": "Le maître aligne les navettes de coton en contant les légendes de Sya."},
            {"title": "2. L'épreuve du marché de Sya", "textNative": "Tiɲɛ kɛra nɔrɔ ye.", "textFr": "Le pagne d'honneur traverse les générations sans jamais perdre un seul fil."}
        ],
        "sections": [
            {"title": "1. La mélodie du métier à tisser", "textNative": "Gēkɛ mɔgɔw ka sen dioula dugu ra.", "textFr": "Le maître aligne les navettes de coton en contant les légendes de Sya."},
            {"title": "2. L'épreuve du marché de Sya", "textNative": "Tiɲɛ kɛra nɔrɔ ye.", "textFr": "Le pagne d'honneur traverse les générations sans jamais perdre un seul fil."}
        ]
    },
    {
        "id": "souraba-le-singe",
        "title": "Souraba le Singe et la Tortue Rusée",
        "nativeTitle": "Souraba Wulu ni Kɔrɔkɔrɔba (Conte d'Afrique)",
        "regionId": "bankui",
        "regionName": "Bankui (Boucle du Mouhoun / Dédougou)",
        "place": "Vergers de manguiers sur les berges du Mouhoun",
        "category": "Conte Humoristique & Moral",
        "ethnic": "Bwaba / Dioula",
        "languages": ["Dioula", "Français"],
        "duration": "2 min 51",
        "year": "Tradition populaire africaine",
        "heroImage": "etnies/culture-faso.jpg",
        "audioUrl": "/static/audio/souraba-le-singe.mp3",
        "audioCredit": "© Conte traditionnel africain, archives orales du Faso",
        "synopsis": "Souraba le singe dévore seul les mangues mûres en riant de la tortue clouée au sol. Lors de la grande fête des masques, la tortue lui apprend le sens du partage et de l'humilité.",
        "moral": "L'égoïsme isole l'homme sur sa branche ; la solidarité lui assure un abri sur la terre ferme.",
        "tags": ["Bankui", "Animaux", "Partage", "Singe", "Tortue"],
        "chapters": [
            {"title": "1. La gourmandise de Souraba", "textNative": "Souraba be yiridenw dun a kelen na.", "textFr": "Souraba fait la sourde oreille aux demandes polies de son amie la tortue."},
            {"title": "2. Le festin de la fête des masques", "textNative": "Kɔrɔkɔrɔba ye nali bila a ma.", "textFr": "La tortue organise un grand banquet où l'on ne mange qu'avec des mains impeccables."}
        ],
        "sections": [
            {"title": "1. La gourmandise de Souraba", "textNative": "Souraba be yiridenw dun a kelen na.", "textFr": "Souraba fait la sourde oreille aux demandes polies de son amie la tortue."},
            {"title": "2. Le festin de la fête des masques", "textNative": "Kɔrɔkɔrɔba ye nali bila a ma.", "textFr": "La tortue organise un grand banquet où l'on ne mange qu'avec des mains impeccables."}
        ]
    }
]

# 1. Mise à jour de static/js/data/stories.js
base_dir = '/home/masqueyyy/.gemini/antigravity/scratch/faso-contes-legendes'
stories_js_path = os.path.join(base_dir, 'static/js/data/stories.js')
with open(stories_js_path, 'r', encoding='utf-8') as f:
    js_text = f.read()

# Remplacements d'images
image_replacements = {
    'dioula.png': 'etnies/ethnie-bwa-bougouli.jpg',
    'mossi.png': 'etnies/ethnie-mossi.jpg',
    'fulfulde.png': 'etnies/ethnie-peul.jpg',
    'bissa.png': 'etnies/femme-faso.jpg',
    'yennenga-hero.svg': 'etnies/ethnie-mossi.jpg',
    'loropeni-hero.svg': 'etnies/loropeni-ruines.jpg',
    'tiebele-hero.svg': 'etnies/tiebele-case.jpg',
    'sahel-hero.svg': 'etnies/ethnie-peul.jpg',
    'sabou-hero.svg': 'etnies/fetiche-bateba.jpg',
    'guimbi-hero.svg': 'etnies/masque-bobo.jpg'
}
for old_img, new_img in image_replacements.items():
    js_text = js_text.replace(f'"{old_img}"', f'"{new_img}"')
    js_text = js_text.replace(f"'{old_img}'", f"'{new_img}'")

new_stories_json = json.dumps(new_stories, indent=2, ensure_ascii=False)
inner_stories = new_stories_json.strip()[1:-1].strip() + ",\n"

marker = "const FASO_STORIES_DB = ["
if marker in js_text:
    idx = js_text.find(marker) + len(marker)
    js_text = js_text[:idx] + "\n" + inner_stories + js_text[idx:]
    with open(stories_js_path, 'w', encoding='utf-8') as f:
        f.write(js_text)
    print("Updated static/js/data/stories.js!")

# 2. Mise à jour de app.py
app_py_path = os.path.join(base_dir, 'app.py')
with open(app_py_path, 'r', encoding='utf-8') as f:
    app_text = f.read()

for old_img, new_img in image_replacements.items():
    app_text = app_text.replace(f'"{old_img}"', f'"{new_img}"')
    app_text = app_text.replace(f"'{old_img}'", f"'{new_img}'")

marker_app = "STORIES_DATA = ["
if marker_app in app_text:
    idx = app_text.find(marker_app) + len(marker_app)
    app_text = app_text[:idx] + "\n" + inner_stories + app_text[idx:]
    with open(app_py_path, 'w', encoding='utf-8') as f:
        f.write(app_text)
    print("Updated app.py!")

# 3. Mise à jour de static/js/data.js si présent
data_js_path = os.path.join(base_dir, 'static/js/data.js')
if os.path.exists(data_js_path):
    with open(data_js_path, 'r', encoding='utf-8') as f:
        data_text = f.read()
    for old_img, new_img in image_replacements.items():
        data_text = data_text.replace(f'"{old_img}"', f'"{new_img}"')
        data_text = data_text.replace(f"'{old_img}'", f"'{new_img}'")
    with open(data_js_path, 'w', encoding='utf-8') as f:
        f.write(data_text)
    print("Updated static/js/data.js!")
