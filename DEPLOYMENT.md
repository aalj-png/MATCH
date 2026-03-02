# GitHub & Vercel Deployment Guide

## 📤 1. Créer un Dépôt GitHub

### Étape 1: Créer un compte GitHub
Si vous n'avez pas de compte:
1. Allez sur https://github.com/signup
2. Créez votre compte
3. Configurez votre profil

### Étape 2: Créer un nouveau dépôt
1. Allez sur https://github.com/new
2. Remplissez les informations:
   - **Repository name**: `match-management` (ou votre nom)
   - **Description**: Game Management Application with React + FastAPI
   - **Public** ou **Private**: Selon votre préférence
3. **Cliquez "Create repository"**

### Étape 3: Pousser le code vers GitHub

Après avoir créé le dépôt, GitHub vous donnera des commandes. Utilisez cette commande:

```bash
cd game
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/match-management.git
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre nom GitHub!**

Si vous avez une erreur d'authentification:
- Utilisez un **Personal Access Token** au lieu du mot de passe
- Générez un token sur: https://github.com/settings/tokens
- Copier l'URL du token et l'utiliser lors du push

## 🚀 2. Déployer sur Vercel

### Option A: Déploiement Automatique (Recommandé)

#### Étape 1: Connecter GitHub à Vercel
1. Allez sur https://vercel.com/signup
2. Cliquez "Sign up with GitHub"
3. Autorisez Vercel à accéder à vos repos

#### Étape 2: Créer un nouveau projet
1. Cliquez "New Project" sur le dashboard Vercel
2. Sélectionnez votre repo `match-management`
3. Configurez le projet:

   **Framework Preset**: Vite
   
   **Root Directory**: `frontend`
   
   **Build Command**: `npm run build`
   
   **Output Directory**: `dist`

4. Cliquez "Deploy"

#### Étape 3: Variables d'environnement (si nécessaire)
Si vous avez des variables d'environnement dans `frontend/.env`:
1. Allez dans "Settings" → "Environment Variables"
2. Ajoutez vos variables

### Option B: Déploiement avec CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Depuis le dossier racine du projet
cd game

# Se connecter à Vercel
vercel login

# Déployer le frontend
cd frontend
vercel

# Suivre les prompts
```

## 📝 Configuration Vercel : Points Importants

**Build Settings:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Node Version: 18+

**Environment Variables (si needed):**
```
VITE_API_URL=https://votre-api-backend.com/api
```

Mais pour le développement, l'URL par défaut (localhost:8000) fonctionne.

## 🔗 Backend API: Où la Déployer?

**Options pour le backend FastAPI:**

### 1. Render.com (Gratuit, Simple)
- Allez sur https://render.com
- Créez un nouveau "Web Service"
- Connectez votre repo GitHub
- Configurez:
  - **Build Command**: `pip install -r requirements.txt`
  - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
  - **Root Directory**: `backend`

### 2. Railway.app (Simple)
- Allez sur https://railway.app
- Connectez GitHub
- Ajouter un service Python
- Configurez l'URL de démarrage

### 3. Heroku (Payant mais Populaire)
- Allez sur https://heroku.com
- Créez une nouvelle app
- Connectez votre repo GitHub
- Déployez

### 4. PythonAnywhere (Simple)
- Allez sur https://www.pythonanywhere.com/
- Créez un compte gratuit
- Upload votre code
- Configure les variables

## ✅ Checklist de Déploiement

- [ ] Créer un dépôt GitHub
- [ ] Pousser le code local vers GitHub
- [ ] Créer un compte Vercel
- [ ] Connecter GitHub à Vercel
- [ ] Déployer le frontend sur Vercel
- [ ] Configurer les variables d'environnement (frontend)
- [ ] Choisir un service pour le backend
- [ ] Déployer le backend
- [ ] Mettre à jour l'URL de l'API dans `frontend/src/api.js`
- [ ] Tester l'application déployée

## 🔐 Sécurité Avant Déploiement

⚠️ **Avant de pousser:**

1. **Vérifier que `.env` n'est pas commité**:
   ```bash
   git status | grep .env
   ```

2. **Vérifier secrets sensibles**:
   - `SECRET_KEY` en production
   - Database URLs
   - Tokens API

3. **Ajouter `.env` au `.gitignore`** (déjà fait ✅)

4. **Ne jamais commiter les secrets!**

## 📱 Tester Après Déploiement

Une fois déployé:

1. **Test du Frontend Vercel**:
   ```
   https://votre-projet.vercel.app
   ```

2. **Test du Backend** (URL fournie par le service)

3. **Mettre à jour l'API URL** dans frontend si nécessaire

## 🆘 Troubleshooting Déploiement

### Erreur: "Module not found"
```bash
# Dans backend
pip install -r requirements.txt
```

### Erreur: "CORS error"
- Vérifier les `origins` dans `main.py`
- Ajouter domaine Vercel à la liste CORS:
  ```python
  origins = [
      "https://votre-projet.vercel.app",
      "http://localhost:5173",
  ]
  ```

### Erreur: "Cannot find module"
- Assurez-vous que `root directory` est configuré correctement
- Pour frontend: `frontend/`
- Pour backend (Render): `backend/`

## 📊 Après Déploiement

1. **Monitorer** les déploiements sur Vercel Dashboard
2. **Voir les logs** en cas d'erreur
3. **Configurer les domaines custom** (optionnel)
4. **Setup CI/CD automatique** (déjà fait avec GitHub!)

---

## 🎯 Liens Utiles

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **Render**: https://render.com
- **Railway**: https://railway.app
- **Documentation Vite**: https://vitejs.dev
- **Documentation FastAPI**: https://fastapi.tiangolo.com

---

## Questions Fréquentes

**Q: Quelle est la meilleure option pour le backend?**
A: Render.com ou Railway.app sont simples et gratuits pour commencer.

**Q: Puis-je utiliser un domaine custom?**
A: Oui! Vercel et les services backend le support.

**Q: Comment les variables d'env restent sécurisées?**
A: Elles ne sont jamais dans le code, seulement dans les dashboard des services.

**Q: Puis-je reverter un déploiement?**
A: Oui! Chaque plateforme garde l'historique d'autres déploiements.
