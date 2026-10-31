"""
MÉMOIRE DU BURKINA — SUITE COMPLÈTE DE TESTS D'INTÉGRATION ET DE QUALITÉ
Vérification des 17 régions, du routage SPA, des API REST, des fichiers modulaires et du rapport.
"""

import unittest
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

import app

# Les 17 régions officielles
EXPECTED_17_REGIONS = [
    "bankui", "djoro", "goulmou", "guiriko", "kadiogo", "kuilse",
    "liptako", "nakambe", "nando", "nazinon", "oubri", "sirba",
    "soum", "sourou", "tapoa", "tannounyan", "yaadga"
]

class TestFasoMemoireFullStack(unittest.TestCase):

    def test_database_has_17_regions(self):
        """Vérifie que la base de données contient exactement les 17 régions officielles"""
        self.assertEqual(len(app.REGIONS_DATA), 17)
        actual_ids = [r["id"] for r in app.REGIONS_DATA]
        for reg_id in EXPECTED_17_REGIONS:
            self.assertIn(reg_id, actual_ids, f"La région {reg_id} est manquante dans REGIONS_DATA !")

    def test_region_data_structure_integrity(self):
        """Vérifie l'exhaustivité des métadonnées de chaque région"""
        for r in app.REGIONS_DATA:
            self.assertIn("capital", r)
            self.assertIn("demographics", r)
            self.assertIn("languages", r)
            self.assertIn("emblem", r)
            self.assertIn("description", r)
            self.assertIsInstance(r["coords"], list)
            self.assertEqual(len(r["coords"]), 2)

    def test_stories_data_integrity(self):
        """Vérifie le catalogue des récits et leurs liaisons régionales"""
        self.assertGreaterEqual(len(app.STORIES_DATA), 17)
        covered_regions = {s["regionId"] for s in app.STORIES_DATA}
        for reg_id in EXPECTED_17_REGIONS:
            self.assertIn(reg_id, covered_regions, f"La région {reg_id} n'a aucun récit associé dans STORIES_DATA !")
        for s in app.STORIES_DATA:
            self.assertIn("title", s)
            self.assertIn("regionId", s)
            self.assertIn("languages", s)
            self.assertIn("moral", s)

    def test_static_modular_files_exist(self):
        """Vérifie la présence physique des modules CSS, JS, vues et composants"""
        static_dir = BASE_DIR / "static"
        
        # Styles
        self.assertTrue((static_dir / "css" / "design-system.css").exists())
        self.assertTrue((static_dir / "css" / "campfire.css").exists())
        self.assertTrue((static_dir / "css" / "style.css").exists())

        # Données
        self.assertTrue((static_dir / "js" / "data" / "regions17.js").exists())
        self.assertTrue((static_dir / "js" / "data" / "languages.js").exists())
        self.assertTrue((static_dir / "js" / "data" / "stories.js").exists())

        # Core
        self.assertTrue((static_dir / "js" / "core" / "store.js").exists())
        self.assertTrue((static_dir / "js" / "core" / "router.js").exists())

        # Composants
        self.assertTrue((static_dir / "js" / "components" / "map2d.js").exists())
        self.assertTrue((static_dir / "js" / "components" / "map3d.js").exists())
        self.assertTrue((static_dir / "js" / "components" / "audio-player.js").exists())
        self.assertTrue((static_dir / "js" / "components" / "campfire.js").exists())

        # Vues
        self.assertTrue((static_dir / "js" / "views" / "home-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "map-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "regions-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "library-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "story-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "admin-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "contribute-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "glossary-view.js").exists())
        self.assertTrue((static_dir / "js" / "views" / "adventure-view.js").exists())

    def test_html_entry_point(self):
        """Vérifie que index.html charge les 17 régions et la nouvelle architecture"""
        index_file = BASE_DIR / "static" / "index.html"
        content = index_file.read_text(encoding="utf-8")
        self.assertIn("MÉMOIRE DU BURKINA", content)
        self.assertIn("regions17.js", content)
        self.assertIn("campfire.js", content)
        self.assertIn("admin-view.js", content)

    def test_report_for_gobelab(self):
        """Vérifie que le rapport officiel est adressé à Odilon Simpore et cite les 17 régions"""
        report_file = BASE_DIR / "static" / "report" / "index.html"
        content = report_file.read_text(encoding="utf-8")
        self.assertIn("Odilon.simpore@gobelab.org", content)
        self.assertIn("17", content)

    def test_quiz_and_cultural_enhancements(self):
        """Vérifie l'enrichissement du quiz avec les 17 régions et l'absence de l'ancien '13 régions' dans quiz.js"""
        quiz_file = BASE_DIR / "static" / "js" / "quiz.js"
        quiz_content = quiz_file.read_text(encoding="utf-8")
        self.assertNotIn("13 régions", quiz_content)
        self.assertIn("17 régions", quiz_content)

        data_file = BASE_DIR / "static" / "js" / "data.js"
        data_content = data_file.read_text(encoding="utf-8")
        # Compte les questions dans FASO_QUIZ
        quiz_section = data_content.split("const FASO_QUIZ =")[1].split("const FASO_INTERACTIVE_ADVENTURE")[0]
        question_count = quiz_section.count('question:')
        self.assertGreaterEqual(question_count, 14, f"FASO_QUIZ doit contenir au moins 14 questions, trouvé {question_count}")

    def test_audio_tracks_presence(self):
        """Vérifie la génération et présence effective des 20 fichiers audio MP3 haute fidélité"""
        audio_dir = BASE_DIR / "static" / "audio"
        self.assertTrue(audio_dir.exists(), "Le dossier static/audio doit exister")
        mp3_files = list(audio_dir.glob("*.mp3"))
        self.assertGreaterEqual(len(mp3_files), 20, f"Au moins 20 fichiers audio MP3 doivent être présents, trouvé {len(mp3_files)}")
        # Vérification des fichiers clés
        key_stories = ["yennenga.mp3", "dafra.mp3", "guimbi-ouattara.mp3", "festima-bankui.mp3", "cascades-djoro.mp3"]
        for k in key_stories:
            self.assertTrue((audio_dir / k).exists(), f"Fichier audio clé {k} manquant dans static/audio !")

    def test_icons_and_illustrations(self):
        """Vérifie la présence des icônes vectorielles SVG et des illustrations burkinabè"""
        icons_file = BASE_DIR / "static" / "js" / "core" / "icons.js"
        self.assertTrue(icons_file.exists(), "Le système d'icônes icons.js doit exister")
        
        illus_dir = BASE_DIR / "static" / "assets" / "illustrations"
        self.assertTrue(illus_dir.exists(), "Le dossier des illustrations doit exister")
        required_illus = ["burkina-panoramic.svg", "mosquee-bobo.svg", "cascades-banfora.svg", "cour-tiebele.svg"]
        for img in required_illus:
            self.assertTrue((illus_dir / img).exists(), f"Illustration {img} manquante !")

    def test_no_informal_emojis_in_core_navigation(self):
        """Vérifie que la navigation principale utilise des icônes SVG professionnelles sans emojis informels"""
        index_file = BASE_DIR / "static" / "index.html"
        content = index_file.read_text(encoding="utf-8")
        # Les emojis de navigation autrefois présents ne doivent plus s'y trouver
        forbidden_emojis = ["🗺️", "📚", "🏛️", "🔥", "✨", "📖", "🧭", "🛡️", "👑"]
        for em in forbidden_emojis:
            self.assertNotIn(em, content, f"Emoji informel {em} trouvé dans static/index.html")
        self.assertIn("icons.js", content)


if __name__ == "__main__":
    unittest.main()
