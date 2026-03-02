# 🚀 Push vers GitHub & Vercel - Guide Rapide

## ✅ C'est Fait Localement

Votre code est déjà dans un dépôt Git local avec 2 commits:
1. Initial commit avec tous les fichiers
2. Configuration Vercel et déploiement

## 📋 Étapes à Suivre (5-10 minutes)

### ÉTAPE 1: Créer un Dépôt GitHub (2 min)

1. Allez sur https://github.com/new
2. Connectez-vous (ou créez un compte)
3. Remplissez:
   - **Repository name**: `match-management`
   - **Description**: Match Management with React + FastAPI
   - Laissez les autres options par défaut
4. Cliquez **"Create repository"**

### ÉTAPE 2: Pousser le Code vers GitHub (1 min)

Copiez et exécutez cette commande (remplacez `VOTRE_USERNAME`):

```powershell
cd c:\Users\HP\Desktop\game
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/match-management.git
git push -u origin main
```

**Exemple:**
```powershell
git remote add origin https://github.com/john-doe/match-management.git
git push -u origin main
```

Si demandé pour le mot de passe:
- **Ne pas utiliser votre mot de passe GitHub**
- Utiliser un **Personal Access Token** à la place
- Générer sur: https://github.com/settings/tokens/new

### ÉTAPE 3: Déployer le Frontend sur Vercel (3 min)

**Méthode 1: Via le site Vercel (Recommandé)**

1. Allez sur https://vercel.com
2. Cliquez "Sign up with GitHub"
3. Autorisez Vercel
4. Sur le dashboard, cliquez "New Project"
5. Sélectionnez votre repo `match-management`
6. Configurez:
   - **Framework**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. Cliquez "Deploy"
8. ✅ Votre app est en ligne!

**Votre URL Vercel será**: `https://match-management-xxx.vercel.app`

### ÉTAPE 4: Déployer le Backend (Optionnel mais Recommandé)

Pour que l'app soit complètement fonctionnelle, le backend aussi doit être en ligne.

**Render.com** (Super simple, gratuit):

1. Allez sur https://render.com/register
2. Inscrivez-vous avec GitHub
3. Cliquez "+ New" → "Web Service"
4. Sélectionnez votre repo
5. Configurez:
   - **Name**: `match-management-api`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn main:app` ou `uvicorn main:app --host 0.0.0.0 --port 8000`
6. Cliquez "Create Web Service"
7. ✅ Votre backend est en ligne!

**Votre URL Render será**: `https://match-management-api-xxx.onrender.com`

### ÉTAPE 5: Connecter Frontend + Backend

Mettez à jour l'URL de l'API dans le frontend:

[frontend/src/api.js](./frontend/src/api.js#L1)

Remplacez:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

Par:
```javascript
const API_BASE_URL = 'https://match-management-api-xxx.onrender.com/api';
```

Puis poussez le changement:
```powershell
cd c:\Users\HP\Desktop\game
git add frontend/src/api.js
git commit -m "Update API URL for deployed backend"
git push
```

Vercel redéploiera automatiquement! ✅

## ✨ Résultat Final

Vous aurez:
- ✅ **Frontend**: https://match-management-xxx.vercel.app (en ligne)
- ✅ **Backend**: https://match-management-api-xxx.onrender.com (en ligne)
- ✅ **Code**: https://github.com/YOUR_USERNAME/match-management (sauvegardé)

## 🔄 Workflow Après Déploiement

À chaque modification:
1. Faites vos changements localement
2. Commit: `git add . && git commit -m "Description"`
3. Push: `git push origin main`
4. **Vercel redéploie automatiquement** le frontend
5. Si changement backend: redéployez manuellement sur Render

## 🎯 Commandes Rapides

```powershell
# Vérifier le status
git status

# Voir les commits
git log

# Voir les remotes
git remote -v

# Voir la branche actuelle
git branch
```

## 🆘 Problèmes Courants

**"fatal: 'origin' does not appear to be a git repository"**
- Assurez-vous d'être dans `c:\Users\HP\Desktop\game`
- Tapez: `cd c:\Users\HP\Desktop\game`

**"Permission denied (publickey)"**
- Utilisez un Personal Access Token au lieu du mot de passe GitHub
- Voir: https://github.com/settings/tokens

**Frontend déploye mais ne communique pas avec backend**
- Vérifier l'URL de l'API dans `frontend/src/api.js`
- S'assurer que le backend est en ligne
- Vérifier CORS dans `backend/main.py`

**Backend Error: "ModuleNotFoundError"**
- S'assurer que `requirements.txt` est à jour
- Vérifier les dépendances: `pip install -r backend/requirements.txt`

## 📚 Documentation Complète

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails.

## 🎉 C'est Tout!

Votre application est maintenant:
- 🔄 **Versionée** (Git)
- 📤 **Sauvegardée** (GitHub)
- 🌐 **En ligne** (Vercel + Render)
- 🚀 **Prête pour le monde!**

Bon courage! 💪
