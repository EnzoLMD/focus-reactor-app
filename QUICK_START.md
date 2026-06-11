# 🚀 Démarrage Rapide - Focus Reactor

## En 30 secondes

```bash
# 1. Installer les dépendances
pnpm install

# 2. Démarrer le dev server
pnpm dev

# 3. Ouvrir http://localhost:5173
```

**C'est tout!** L'app est prête à jouer.

## Points d'entrée

| URL | Page |
|-----|------|
| `/` | Accueil - Sélection du profil |
| `/game` | Jeu - Gameplay principal |
| `/results` | Résultats - Score final |
| `/stats` | Statistiques - Historique |
| `/settings` | Paramètres - Configuration |

## Commandes Principales

```bash
pnpm dev       # 🔄 Développement (hot reload)
pnpm build     # 📦 Build production
pnpm preview   # 👀 Aperçu du build
```

## Structure Clé

```
src/
├── pages/              # 5 pages (Home, Game, Results, Stats, Settings)
├── components/         # 5 composants réutilisables
├── context/           # État global (Context API)
├── hooks/             # useGameLogic - logique du jeu
└── styles/            # CSS modulaire + animations
```

## Technologies

- **React 18** - Bibliothèque UI
- **React Router 6** - Routage SPA
- **Vite** - Bundler ultra-rapide
- **CSS3** - Animations fluides, variables CSS

## Fonctionnalités

✅ Gameplay 60 secondes avec cibles animées  
✅ 2 profils (Débutant/Expert)  
✅ Système de combo multiplicateur  
✅ Suivi statistiques avec historique  
✅ Thème clair/sombre persistant  
✅ WCAG 2.1 AA accessible  
✅ Responsive (375px → 1440px)  
✅ Sans dépendances inutiles  

## Documentation

- 📖 **README.md** - Guide complet
- 🏗️ **ARCHITECTURE.md** - Diagramme d'états
- 📋 **STRUCTURE.md** - Arborescence détaillée
- ✅ **TESTING_GUIDE.md** - Cas de test
- 🚀 **DEPLOYMENT.md** - Guide déploiement
- 🤖 **AI_JOURNAL_DAWI.md** - Transparence IA

## Besoin d'Aide?

### Erreurs Courantes

**"Port 5173 is in use"**
```bash
# Changer le port
pnpm dev -- --port 3001
```

**"localStorage not persisting"**
→ Vérifier que les cookies ne sont pas bloqués  
→ Les données se sauvegardent automatiquement

**"Thème clair ne change pas"**
→ Rafraîchir la page (F5)  
→ Vérifier localStorage dans DevTools

### Conseils Dev

- Utiliser **React DevTools** pour inspecter l'état
- Utiliser **Network tab** pour voir les performances
- Les animations sont en `requestAnimationFrame`
- Les sons sont en base64 (pas de fichiers externes)

## Prochaines Étapes

1. **Tester le gameplay** - Essayer les 2 profils
2. **Vérifier les statistiques** - Jouer quelques parties
3. **Tester responsive** - Devtools F12, redimensionner
4. **Lire la documentation** - ARCHITECTURE.md pour l'état
5. **Approfondir le code** - Regarder useGameLogic.js

## Environnement de Dev

```bash
# Lancer avec debug
DEBUG=* pnpm dev

# Watch CSS
pnpm dev -- --watch

# Performance Audit
pnpm build && pnpm preview
# Puis ouvrir Lighthouse (DevTools F12)
```

## État de Livraison

✅ **Production Ready**  
✅ **WCAG 2.1 AA Compliant**  
✅ **Responsive Design**  
✅ **Documentation Complète**  
✅ **Prêt pour DAWI**  

---

**Happy Gaming! 🎮**

Pour plus de détails, consulter les fichiers de documentation: `README.md`, `ARCHITECTURE.md`, `STRUCTURE.md`
