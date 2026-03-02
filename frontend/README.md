# Match Management - Frontend

Interface React + Vite pour la gestion des matchs sportifs.

## Installation Rapide

```bash
npm install
npm run dev
```

L'application ouvre sur `http://localhost:5173`

## Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser le build de production

## Configuration API

L'URL de base de l'API est définie dans `src/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

Modifier si l'API est sur un autre serveur.

## Structure

```
src/
├── pages/              # Pages principales
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── HomePage.jsx
│   ├── MatchDetailPage.jsx
│   └── CreateMatchPage.jsx
├── components/         # Composants réutilisables
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/           # Context API
│   └── AuthContext.jsx
├── styles/            # Fichiers CSS
│   ├── index.css
│   ├── Navbar.css
│   ├── Auth.css
│   ├── Home.css
│   ├── MatchDetail.css
│   └── CreateMatch.css
├── api.js             # Appels API
├── App.jsx            # Composant racine
└── main.jsx           # Point d'entrée
```

## Authentification

Utilise JWT avec localStorage:
- Le token est sauvegardé après login
- Le token est envoyé dans l'en-tête `Authorization: Bearer <token>`
- Automatiquement supprimé au logout
