"""
TESTS AUTOMATISÉS - FASO ORALIA
Vérification de l'intégrité de l'API FastAPI, des fichiers statiques et des données culturelles.
"""

import unittest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

# Ajouter le répertoire racine au path Python
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from app import app, STORIES_DATA, REGIONS_DATA

client = TestClient(app)

class TestFasoOraliaAPI(unittest.TestCase):

    def test_health_check(self):
        """Vérifie l'état de l'API et les compteurs de données"""
        response = client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "online")
        self.assertGreater(data["stories_count"], 0)
        self.assertGreater(data["regions_count"], 0)

    def test_home_page(self):
        """Vérifie le service de la page d'accueil HTML"""
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("FASO ORALIA", response.text)
        self.assertIn("Contes & Légendes du Burkina Faso", response.text)

    def test_report_page(self):
        """Vérifie le service de la page de rapport officiel Gobelab"""
        response = client.get("/report")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Odilon.simpore@gobelab.org", response.text)
        self.assertIn("Gobelab", response.text)

    def test_get_all_regions(self):
        """Vérifie le retour des régions administratives et culturelles"""
        response = client.get("/api/regions")
        self.assertEqual(response.status_code, 200)
        regions = response.json()
        self.assertIsInstance(regions, list)
        self.assertGreaterEqual(len(regions), 8)

        # Vérifie la présence des régions majeures
        region_ids = [r["id"] for r in regions]
        self.assertIn("centre", region_ids)
        self.assertIn("hauts-bassins", region_ids)
        self.assertIn("sahel", region_ids)
        self.assertIn("cascades", region_ids)

    def test_get_all_stories(self):
        """Vérifie le retour de tous les récits répertoriés"""
        response = client.get("/api/contes")
        self.assertEqual(response.status_code, 200)
        stories = response.json()
        self.assertIsInstance(stories, list)
        self.assertGreaterEqual(len(stories), 6)

    def test_filter_stories_by_language(self):
        """Vérifie le filtrage des récits par langue nationale"""
        # Filtrer par Mooré
        resp_moore = client.get("/api/contes?language=Mooré")
        self.assertEqual(resp_moore.status_code, 200)
        stories_moore = resp_moore.json()
        self.assertTrue(all("Mooré" in s["languages"] for s in stories_moore))

        # Filtrer par Dioula
        resp_dioula = client.get("/api/contes?language=Dioula")
        self.assertEqual(resp_dioula.status_code, 200)
        stories_dioula = resp_dioula.json()
        self.assertTrue(all("Dioula" in s["languages"] for s in stories_dioula))

    def test_filter_stories_by_category(self):
        """Vérifie le filtrage par typologie de récit"""
        response = client.get("/api/contes?category=Fondatrice")
        self.assertEqual(response.status_code, 200)
        stories = response.json()
        self.assertTrue(all("Fondatrice" in s["category"] for s in stories))

    def test_search_stories(self):
        """Vérifie la recherche textuelle plein texte"""
        response = client.get("/api/contes?search=Yennenga")
        self.assertEqual(response.status_code, 200)
        stories = response.json()
        self.assertGreaterEqual(len(stories), 1)
        self.assertEqual(stories[0]["id"], "yennenga")

    def test_get_single_story_detail(self):
        """Vérifie la récupération détaillée d'un conte spécifique"""
        response = client.get("/api/contes/yennenga")
        self.assertEqual(response.status_code, 200)
        story = response.json()
        self.assertEqual(story["id"], "yennenga")
        self.assertIn("sections", story)
        self.assertGreater(len(story["sections"]), 0)

    def test_get_nonexistent_story(self):
        """Vérifie l'erreur 404 pour un identifiant inconnu"""
        response = client.get("/api/contes/conte-inexistant-12345")
        self.assertEqual(response.status_code, 404)

    def test_static_files_integrity(self):
        """Vérifie la présence physique des fichiers clés (CSS, JS, SVG)"""
        static_path = BASE_DIR / "static"
        self.assertTrue((static_path / "index.html").exists())
        self.assertTrue((static_path / "css" / "style.css").exists())
        self.assertTrue((static_path / "js" / "data.js").exists())
        self.assertTrue((static_path / "js" / "map2d.js").exists())
        self.assertTrue((static_path / "js" / "map3d.js").exists())
        self.assertTrue((static_path / "js" / "audio.js").exists())
        self.assertTrue((static_path / "js" / "reader.js").exists())
        self.assertTrue((static_path / "js" / "interactive.js").exists())
        self.assertTrue((static_path / "js" / "quiz.js").exists())
        self.assertTrue((static_path / "js" / "app.js").exists())
        self.assertTrue((static_path / "report" / "index.html").exists())

        # Vérification des illustrations SVG
        illus_path = static_path / "assets" / "illustrations"
        self.assertTrue((illus_path / "yennenga-hero.svg").exists())
        self.assertTrue((illus_path / "dafra-hero.svg").exists())
        self.assertTrue((illus_path / "guimbi-hero.svg").exists())
        self.assertTrue((illus_path / "sabou-hero.svg").exists())
        self.assertTrue((illus_path / "lievre-hero.svg").exists())
        self.assertTrue((illus_path / "sahel-hero.svg").exists())
        self.assertTrue((illus_path / "tiebele-hero.svg").exists())
        self.assertTrue((illus_path / "loropeni-hero.svg").exists())


if __name__ == "__main__":
    unittest.main()
