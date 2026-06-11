# Guide de Déploiement - Focus Reactor

## Déploiement Local

### Prérequis
- Node.js >= 18.0.0
- pnpm 8.0.0+ (ou npm/yarn)

### Installation
```bash
cd focus-reactor
pnpm install
```

### Développement
```bash
# Démarrer le serveur de dev
pnpm dev

# L'app s'ouvre sur http://localhost:5173
```

### Build Production
```bash
# Générer le build optimisé
pnpm build

# Le dossier dist/ contient les fichiers minifiés

# Tester le build localement
pnpm preview
```

## Déploiement Vercel (Recommandé)

### 1. Préparation
```bash
# S'assurer que tout est commité
git status
git add .
git commit -m "feat: Focus Reactor application ready for deployment"
```

### 2. Push vers GitHub
```bash
git push origin main
```

### 3. Connecter à Vercel
```bash
# Option A: Avec Vercel CLI
npm i -g vercel
vercel

# Sélectionner:
# - Framework: Vite
# - Root directory: ./
# - Build command: pnpm build
# - Output directory: dist
```

### 4. Variables d'Environnement
Aucune variable d'environnement requise pour cette app.

### 5. Domaine
- Vercel fournit un domaine par défaut: `focus-reactor-xxxxx.vercel.app`
- Ajouter un domaine personnalisé depuis le dashboard Vercel

## Déploiement Netlify

### 1. Préparation
```bash
# Créer netlify.toml
cat > netlify.toml << 'EOF'
[build]
  command = "pnpm build"
  publish = "dist"

[dev]
  command = "pnpm dev"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

git add netlify.toml
git commit -m "config: Add Netlify configuration"
git push
```

### 2. Déployer
- Aller sur https://netlify.com
- Cliquer "New site from Git"
- Sélectionner le repo GitHub
- Confirmer les paramètres
- Netlify déploie automatiquement

## Déploiement GitHub Pages

### 1. Configuration package.json
```json
{
  "homepage": "https://username.github.io/focus-reactor",
  "scripts": {
    "build": "vite build --base=/focus-reactor/",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 2. Installation gh-pages
```bash
pnpm add -D gh-pages
```

### 3. Déployer
```bash
pnpm run deploy
```

L'app sera à: `https://username.github.io/focus-reactor`

## Déploiement Docker

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install
COPY src ./src
COPY *.html vite.config.ts tsconfig.json ./
RUN pnpm build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm i -g pnpm
COPY --from=builder /app/dist ./dist
COPY package.json ./
RUN pnpm install --production

EXPOSE 5173
CMD ["pnpm", "preview"]
```

### Build et Run
```bash
docker build -t focus-reactor .
docker run -p 5173:5173 focus-reactor
```

## Configuration Production

### Optimisations Vite
```typescript
// vite.config.ts
export default {
  build: {
    minify: 'terser',        // Minification JS
    sourcemap: false,        // Pas de sourcemaps
    target: 'esnext',        // Syntaxe moderne
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom']
        }
      }
    }
  }
}
```

### Performance
- Build size: ~150KB (gzipped)
- No critical unused CSS
- Code splitting automatique
- Lazy loading des routes

### Sécurité
- CSP headers configurés
- CORS policy stricte
- Pas de données sensibles exposées
- localStorage utilisé uniquement pour user data

## Monitoring & Logging

### Sentry (Optionnel)
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-sentry-dsn@sentry.io/xxx",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Analytics (Optionnel)
```typescript
import gtag from 'ga-gtag';

gtag.pageview({
  page_path: window.location.pathname,
  page_title: document.title,
});
```

## Checklist Pré-Déploiement

- [ ] `pnpm build` réussit sans erreur
- [ ] `pnpm preview` s'affiche correctement
- [ ] Tests passent (`TESTING_GUIDE.md`)
- [ ] Responsive validé (375px, 768px, 1440px)
- [ ] Accessibilité validée (WCAG AA)
- [ ] Pas de console errors/warnings
- [ ] localStorage fonctionne
- [ ] Thème clair/sombre fonctionne
- [ ] Routes fonctionnent toutes
- [ ] Build size acceptable

## Post-Déploiement

### Vérification
```bash
# Tester l'app déployée
curl -I https://focus-reactor.app

# Vérifier Core Web Vitals
# → Utiliser Lighthouse DevTools
# → Target: LCP < 2.5s, INP < 200ms, CLS < 0.1
```

### Mise à Jour
```bash
# Pousser une mise à jour
git commit -m "fix: Correction d'un bug"
git push origin main

# Vercel/Netlify redéploient automatiquement
```

## Rollback
```bash
# Si un déploiement pose problème:
# Vercel: Cliquer "Rollback" dans le dashboard
# Netlify: Cliquer "Deploy" → "Deployments" → Sélectionner la version précédente
# GitHub Pages: git revert et repousser
```

## Environnements

### Développement
```
pnpm dev                    # localhost:5173
NODE_ENV=development
```

### Staging (optionnel)
```
Branche: staging
Domaine: staging-focus-reactor.vercel.app
```

### Production
```
Branche: main
Domaine: focus-reactor.app
```

## Backup & Restore

### Données Locales
- Les données de l'utilisateur sont dans `localStorage`
- Exporter: `JSON.stringify(localStorage)`
- Importer: Restaurer via DevTools

### Code Source
```bash
# GitHub backup
git push --mirror https://github.com/backup/focus-reactor.git

# Restaurer
git clone --mirror https://github.com/backup/focus-reactor.git
```

## Support

Pour des problèmes de déploiement:
1. Consulter les logs Vercel/Netlify
2. Vérifier les variables d'environnement
3. Valider le build local
4. Vérifier la branche déployée
5. Consulter les erreurs DevTools en production

---

**Dernière mise à jour**: 2026-06-11  
**Statut**: Production Ready  
**Recommandation**: Vercel pour la meilleure intégration avec Vite
