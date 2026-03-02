# Match Management - Backend

API FastAPI pour la gestion des matchs sportifs.

## Installation Rapide

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Le serveur démarre sur `http://localhost:8000`

### Accès à la documentation API

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Configuration

Créer un fichier `.env`:
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./match_management.db
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Structure

```
app/
├── models.py     # Modèles ORM (User, Match)
├── schemas.py    # Schémas Pydantic
├── database.py   # Config base de données
├── security.py   # Authentification JWT
└── routers/
    ├── auth.py   # Routes /api/auth
    └── matches.py # Routes /api/matches
```

## Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `SECRET_KEY` | Clé secrète JWT | 'your-secret-key-here' |
| `DATABASE_URL` | URL de la BD | 'sqlite:///./match_management.db' |
| `ALGORITHM` | Algorithme JWT | 'HS256' |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Durée du token | 30 |
