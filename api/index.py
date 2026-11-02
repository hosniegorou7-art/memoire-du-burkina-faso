"""
Point d'entrée Vercel — importe l'app FastAPI depuis app.py racine.
"""
import sys
import os

# Ajouter la racine du projet au path pour accéder à app.py
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import app
