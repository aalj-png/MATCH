# Quick Start Guide - Application de Gestion des Matchs

## 🚀 Démarrage Rapide (5 minutes)

### 1. Terminal 1 - Lancer le Backend

```bash
cd backend

# Installer les dépendances
pip install -r requirements.txt

# Créer le fichier .env (optionnel)
# Les valeurs par défaut fonctionnent déjà

# Lancer le serveur
uvicorn main:app --reload --port 8000
```

✅ Le serveur démarre sur `http://localhost:8000`
📚 Documentation API: `http://localhost:8000/docs`

### 2. Terminal 2 - Lancer le Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

✅ L'application ouvre sur `http://localhost:5173`

## 📝 Utilisation de l'Application

### 1️⃣ S'inscrire
- Cliquer sur "Register"
- Remplir le formulaire (email, username, nom complet, mot de passe)
- Cliquer sur "Register"

### 2️⃣ Se connecter
- Cliquer sur "Login"
- Entrer l'email et le mot de passe
- Cliquer sur "Login"

### 3️⃣ Créer un Match
- Cliquer sur "+ Create Match"
- Remplir les détails (titre, équipes, date, lieu)
- Cliquer sur "Create Match"

### 4️⃣ Voir les Détails
- Cliquer sur un match pour voir les détails complets
- Voir la description et les informations du créateur

### 5️⃣ Modifier/Supprimer
- Si vous êtes le créateur, cliquer sur les boutons Edit/Delete
- Modifier les détails et sauvegarder

### 6️⃣ Filtrer
- Utiliser les boutons "All", "Scheduled", "Ongoing", "Completed"
- Pour filtrer par statut

## 🔐 Test avec des Données Exemple

Créer rapidement un compte de test:
- **Email**: test@example.com
- **Username**: testuser
- **Nom complet**: Test User
- **Mot de passe**: password123

## 📱 Comptes de Test Existants

Après la première inscription, vous pouvez créer plusieurs comptes pour tester les fonctionnalités de plusieurs utilisateurs.

## 🆘 Problèmes Courants

### Le backend ne démarre pas
```bash
# Vérifier le Python
python --version

# Vérifier pip
pip list | grep fastapi

# Réinstaller
pip install -r requirements.txt --force-reinstall
```

### Erreur "Module not found"
```bash
# Ajouter le chemin
export PYTHONPATH=.
uvicorn main:app --reload
```

### Port 8000 déjà utilisé
```bash
# Utiliser un autre port
uvicorn main:app --reload --port 8001
# Et changer l'URL dans frontend/src/api.js
```

### Port 5173 déjà utilisé
```bash
# Vite utilise automatiquement le prochain port disponible
# Ou spécifier manuellement dans vite.config.js
```

### Erreur CORS
- Vérifier que le backend tourne sur `http://localhost:8000`
- Vérifier les `origins` dans `main.py`

### Reset la base de données
```bash
# Supprimer le fichier
rm backend/match_management.db

# Relancer le backend pour regénérer la BD
```

## 📚 Documentation Complète

Voir [README.md](./README.md) pour la documentation complète.

## 🎯 Prochaines Étapes

Après le démarrage initial:
1. Explorez l'API sur `http://localhost:8000/docs`
2. Testez tous les endpoints
3. Lisez la documentation du backend et frontend dans leurs dossiers respectifs
4. Personnalisez et extendez l'application selon vos besoins

## 💡 Tips

- Les modifications du code React sont reflétées automatiquement (Hot Module Replacement)
- Les modifications du code FastAPI redémarrent automatiquement le serveur avec `--reload`
- Consultez la console du navigateur pour les erreurs frontend
- Consultez les logs du terminal pour les erreurs backend

---

**Applications prêtes!** 🎉 Profitez! 

Si vous avez des questions, consultez les fichiers README dans chaque dossier.
