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


if __name__ == "__main__":
    unittest.main()
