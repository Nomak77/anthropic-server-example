# Serveur Anthropic

Ce serveur permet d'interagir facilement avec l'API d'Anthropic (Claude AI) en fournissant une interface REST sécurisée.

## Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd anthropic-server
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
- Copier `.env.example` vers `.env`
- Remplir les variables dans `.env`

4. Lancer le serveur :
```bash
npm run dev  # Pour le développement
# ou
npm run build && npm start  # Pour la production
```

## Utilisation

### Générer une réponse

```bash
curl -X POST http://localhost:3000/api/anthropic/generate \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Dis bonjour!" }
    ],
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024
  }'
```

### Streaming de réponse

```bash
curl -X POST http://localhost:3000/api/anthropic/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Raconte moi une histoire!" }
    ],
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024
  }'
```

## Fonctionnalités

- ✅ Intégration complète avec l'API Anthropic
- ✅ Support du streaming de réponses
- ✅ Gestion des erreurs robuste
- ✅ Rate limiting pour protéger l'API
- ✅ Logging complet
- ✅ Sécurité renforcée avec Helmet
- ✅ Support CORS
- ✅ TypeScript pour la sûreté du typage

## Configuration

Variables d'environnement disponibles :

- `ANTHROPIC_API_KEY` : Votre clé API Anthropic (requis)
- `PORT` : Port du serveur (défaut: 3000)
- `NODE_ENV` : Environnement (development/production)

## Sécurité

- Rate limiting : 100 requêtes par IP toutes les 15 minutes
- Headers sécurisés via Helmet
- Validation des entrées
- Gestion sécurisée des erreurs

## Développement

```bash
# Lancer en mode développement
npm run dev

# Construire le projet
npm run build

# Lancer les tests
npm test
```