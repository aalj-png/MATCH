# Match Management Application - Copilot Instructions

Ce fichier contient les instructions pour développer et maintenir l'application Match Management.

## Vue d'ensemble du projet

Application web complète pour gérer les matchs sportifs avec authentification JWT.

### Stack technologique
- **Frontend**: React 18 + Vite
- **Backend**: FastAPI + SQLAlchemy
- **Base de données**: SQLite
- **Authentification**: JWT (JSON Web Tokens)

## Structure du projet

```
game/
├── backend/                  # Application FastAPI
│   ├── app/
│   │   ├── models.py        # Modèles de base de données (User, Match)
│   │   ├── schemas.py       # Schémas Pydantic pour validation
│   │   ├── security.py      # Authentification JWT et hachage
│   │   ├── database.py      # Configuration SQLite
│   │   └── routers/
│   │       ├── auth.py      # Endpoints /api/auth
│   │       └── matches.py   # Endpoints /api/matches
│   ├── main.py              # Application principale FastAPI
│   ├── requirements.txt      # Dépendances Python
│   ├── .env                 # Variables d'environnement
│   └── README.md
│
├── frontend/                 # Application React + Vite
│   ├── src/
│   │   ├── pages/           # Pages (Login, Register, Home, etc.)
│   │   ├── components/      # Composants réutilisables
│   │   ├── context/         # Context API pour l'authentification
│   │   ├── styles/          # CSS des pages et composants
│   │   ├── api.js           # Services API (appels HTTP)
│   │   ├── App.jsx          # Composant racine avec routes
│   │   └── main.jsx         # Point d'entrée
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── README.md                # Documentation principale
├── QUICK_START.md          # Guide de démarrage rapide
├── start.bat               # Script de démarrage (Windows)
├── start.sh                # Script de démarrage (Linux/Mac)
└── .gitignore
```

## Principes de développement

### Backend (FastAPI)
1. **Modèles** (`models.py`): Définir les tables avec SQLAlchemy ORM
2. **Schémas** (`schemas.py`): Valider les inputs avec Pydantic
3. **Routers** (`routers/`): Organiser les endpoints par domaine
4. **Security** (`security.py`): JWT, hachage de mots de passe

### Frontend (React)
1. **Pages**: Composants principaux des routes
2. **Components**: Composants réutilisables (Navbar, ProtectedRoute)
3. **Context**: Gestion globale (AuthContext pour l'authentification)
4. **API**: Service centralisé pour tous les appels HTTP
5. **Styles**: CSS modulaire par page/composant

## Tâches courantes

### Ajouter une nouvelle entité

1. **Backend**:
   ```python
   # 1. models.py - Ajouter la classe
   class NewEntity(Base):
       __tablename__ = "new_entities"
       # ...

   # 2. schemas.py - Ajouter les schémas Pydantic
   class NewEntityCreate(BaseModel):
       # ...

   # 3. routers/new_entity.py - Créer les endpoints
   @router.post("/new-entities")
   def create_new_entity(...):
       # ...

   # 4. main.py - Importer le router
   from app.routers import new_entity
   app.include_router(new_entity.router)
   ```

2. **Frontend**:
   ```javascript
   // 1. src/api.js - Ajouter les fonctions API
   export const newEntityAPI = {
       getAll: () => apiCall('GET', '/new-entities'),
       create: (data, token) => apiCall('POST', '/new-entities', data, token),
   };

   // 2. Créer src/pages/NewEntityPage.jsx
   // 3. Ajouter la route dans App.jsx
   // 4. Créer src/styles/NewEntity.css
   ```

### Modifier une page existante

1. Éditer le fichier dans `frontend/src/pages/`
2. Les changements se reflètent automatiquement (HMR)
3. Mettre à jour les tests si nécessaire

### Ajouter un nouvel endpoint API

1. Créer la route dans `backend/app/routers/`
2. Ajouter les schémas dans `backend/app/schemas.py`
3. Inclure le router dans `backend/main.py`
4. Tester dans Swagger UI: `http://localhost:8000/docs`
5. Ajouter la fonction d'appel dans `frontend/src/api.js`

## Variables d'environnement

Backend (`.env`):
```
SECRET_KEY=your-secret-key-change-in-production
DATABASE_URL=sqlite:///./match_management.db
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - S'inscrire
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Obtenir l'utilisateur courant (auth)

### Matchs
- `GET /api/matches` - Lister tous les matchs
- `GET /api/matches/{id}` - Obtenir un match
- `POST /api/matches` - Créer un match (auth)
- `PUT /api/matches/{id}` - Modifier un match (auth)
- `DELETE /api/matches/{id}` - Supprimer un match (auth)
- `GET /api/matches/user/{user_id}` - Matchs d'un utilisateur

## Guides d'installation et démarrage

### Démarrage rapide
```bash
# Windows
start.bat

# Linux/Mac
bash start.sh

# Ou manuellement:
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
cd frontend && npm install && npm run dev
```

### Installation des dépendances
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

## Conventions de code

### Python (FastAPI)
- Utiliser les types hints
- Suivre PEP 8
- Utiliser des route descriptives: `GET /api/matches/{id}`
- Retourner des réponses JSON structurées
- Valider avec Pydantic

### JavaScript (React)
- Utiliser des composants fonctionnels
- Utiliser les hooks (useState, useEffect)
- Nommer les fichiers en PascalCase pour les composants
- Utiliser des classes CSS BEM pour le styling
- Importer les styles dans les composants

## Tests et débogage

### Backend
```bash
# Accéder à Swagger UI
http://localhost:8000/docs

# Vérifier les logs
# Les logs apparaissent dans le terminal où uvicorn est lancé
```

### Frontend
```bash
# Console du navigateur
F12 ou Ctrl+Shift+I

# Vite DevTools
# Affiche automatiquement les erreurs de build
```

## Notes de sécurité

- ⚠️ **Jamais** committer le fichier `.env` avec les vraies secrets
- Changer `SECRET_KEY` en production
- Valider tous les inputs utilisateur
- Utiliser HTTPS en production
- Configurer CORS correctement

## Ressources

- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- SQLAlchemy: https://www.sqlalchemy.org/
- JWT: https://jwt.io/

## Support et questions

Consultez les fichiers README dans chaque dossier pour plus de détails.
