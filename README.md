# Match Management Application

Une application web complète pour gérer les matchs sportifs avec authentification JWT.

## Stack Technologique

- **Frontend**: React + Vite
- **Backend**: FastAPI + SQLAlchemy
- **Base de données**: SQLite
- **Authentification**: JWT (JSON Web Tokens)

## Fonctionnalités

✅ **Authentification**
- Inscription et connexion d'utilisateurs
- Gestion JWT et tokens
- Sécurisation des routes protégées

✅ **Gestion des Matchs**
- Créer, lire, mettre à jour et supprimer des matchs
- Voir tous les matchs disponibles
- Filtrer par statut (scheduled, ongoing, completed)
- Voir les détails complets d'un match

✅ **Interface Utilisateur**
- Design moderne et responsive
- Thème gradient élégant
- Barre de navigation intuitive
- Pages dédiées pour chaque fonctionnalité

## Installation

### Prérequis

- Python 3.8+
- Node.js 16+
- pip et npm

### Backend

```bash
cd backend
pip install -r requirements.txt
```

**Configurer l'environnement** (`backend/.env`)
```
SECRET_KEY=votre-clé-secrète-ici
DATABASE_URL=sqlite:///./match_management.db
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Lancer le serveur**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

Le backend sera disponible à `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
```

**Lancer le serveur de développement**
```bash
cd frontend
npm run dev
```

Le frontend sera disponible à `http://localhost:5173`

## Structure du Projet

```
game/
├── backend/
│   ├── app/
│   │   ├── models.py          # Modèles SQLAlchemy
│   │   ├── schemas.py         # Schémas Pydantic
│   │   ├── security.py        # Authentification JWT
│   │   ├── database.py        # Configuration de la BD
│   │   └── routers/
│   │       ├── auth.py        # Routes d'authentification
│   │       └── matches.py     # Routes des matchs
│   ├── main.py                # Application FastAPI
│   ├── requirements.txt        # Dépendances Python
│   └── .env                   # Variables d'environnement
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Pages React
│   │   ├── components/        # Composants réutilisables
│   │   ├── context/           # Context API (Auth)
│   │   ├── styles/            # Fichiers CSS
│   │   ├── api.js             # Services API
│   │   ├── App.jsx            # Composant principal
│   │   └── main.jsx           # Point d'entrée
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md
```

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "full_name": "User Name",
    "password": "password"
  }
  ```

- `POST /api/auth/login` - Connexion
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```

- `GET /api/auth/me` - Obtenir les infos de l'utilisateur (Nécessite Auth)

### Matchs

- `GET /api/matches` - Obtenir tous les matchs
  - Paramètres: `skip`, `limit`, `status`

- `GET /api/matches/{id}` - Obtenir un match spécifique

- `POST /api/matches` - Créer un nouveau match (Auth requise)
  ```json
  {
    "title": "Match Title",
    "team_a": "Team A",
    "team_b": "Team B",
    "date": "2024-03-15T18:00:00",
    "location": "Stadium",
    "description": "Optional description"
  }
  ```

- `PUT /api/matches/{id}` - Mettre à jour un match (Auth requise)

- `DELETE /api/matches/{id}` - Supprimer un match (Auth requise)

- `GET /api/matches/user/{user_id}` - Obtenir les matchs d'un utilisateur

## Pages

- `/` - Accueil avec liste des matchs
- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/matches/new` - Créer un nouveau match (auth requise)
- `/matches/:id` - Détails d'un match

## Utilisation

1. **S'inscrire** - Créer un compte utilisateur
2. **Se connecter** - Entrer avec votre email et mot de passe
3. **Créer un match** - Cliquer sur "Create Match" et remplir le formulaire
4. **Voir les détails** - Cliquer sur un match pour voir les détails complets
5. **Modifier/Supprimer** - Les créateurs peuvent éditer ou supprimer leurs matchs
6. **Filtrer** - Filtrer les matchs par statut (Scheduled, Ongoing, Completed)

## Développement

### Ajouter une nouvelle page

1. Créer un nouveau fichier dans `frontend/src/pages/`
2. Créer un composant React
3. Ajouter la route dans `App.jsx`
4. Créer le fichier CSS correspondant dans `frontend/src/styles/`

### Ajouter une nouvelle API

1. Créer des modèles/schémas dans `backend/app/models.py` et `schemas.py`
2. Créer les routes dans un nouveau fichier `backend/app/routers/`
3. Importer les routes dans `main.py`

## Notes de Sécurité

⚠️ **Important pour la production:**
- Changer `SECRET_KEY` dans le `.env`
- Configurer les origines CORS appropriérment
- Utiliser des variables d'environnement sécurisées
- Activer HTTPS
- Valider tous les inputs utilisateur
- Utiliser des mots de passe forts

## Troubleshooting

### Le backend ne démarre pas
```bash
cd backend
pip install -r requirements.txt
export PYTHONPATH=.
uvicorn main:app --reload
```

### Le frontend a des erreurs de connexion
- Vérifier que le backend tourne sur `http://localhost:8000`
- Vérifier les paramètres CORS dans `main.py`

### Erreurs de base de données
- Supprimer `match_management.db` et relancer le backend

## Licence

MIT

## Support

Pour toute question ou problème, consultez la documentation ou créez une issue.
