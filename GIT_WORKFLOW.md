# 🔀 Workflow Git - Focus Reactor

## 📋 Conventional Commits

Cette application suit le standard **Conventional Commits** pour une meilleure traçabilité.

### Format Standard

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: Nouvelle fonctionnalité
- **fix**: Correction de bug
- **refactor**: Restructuration sans changement fonctionnel
- **style**: Formatage, indentation, point-virgules
- **docs**: Changements documentation
- **chore**: Dépendances, config, scripts
- **test**: Ajout/modification tests
- **perf**: Optimisation performance

### Scopes

- `core` - État global, context
- `game` - Logique gameplay, hooks
- `ui` - Composants, pages
- `styles` - CSS, design tokens
- `docs` - Documentation
- `build` - Vite, config
- `test` - Tests
- `a11y` - Accessibilité

### Exemples

```bash
feat(game): ajouter système combo multiplicateur
fix(ui): corriger focus outline sur cibles
refactor(core): simplifier state management
style(styles): normaliser indentation CSS
docs(readme): ajouter guide d'utilisation
chore(deps): mettre à jour React 18.3.1
```

---

## 🚀 Historique de Commits Recommandé

Pour recréer le projet avec Git, voici l'ordre recommandé:

### Phase 1: Setup Initial
```bash
git commit -m "chore(build): initialiser projet Vite + React"
git commit -m "chore(deps): installer React Router, types"
git commit -m "chore(config): configurer vite.config.ts, tsconfig.json"
```

### Phase 2: Infrastructure Core
```bash
git commit -m "feat(core): créer FocusReactorContext pour état global"
git commit -m "feat(core): implémenter useGameLogic hook"
git commit -m "feat(core): configurer routing React Router"
```

### Phase 3: Styles & Design
```bash
git commit -m "style(design): définir variables CSS (thème sombre/cyan/orange)"
git commit -m "style(design): ajouter animations globales (fade, scale, pulse)"
git commit -m "style(design): implémenter thème clair/sombre"
```

### Phase 4: Composants Réutilisables
```bash
git commit -m "feat(ui): créer composant Navbar avec navigation"
git commit -m "feat(ui): créer composant ScoreBoard (score/combo/précision)"
git commit -m "feat(ui): créer composant Timer (compte à rebours)"
git commit -m "feat(ui): créer composant Target (cible cliquable animée)"
git commit -m "feat(ui): créer composant ProgressBar (barre progression)"
```

### Phase 5: Pages - Frontend
```bash
git commit -m "feat(pages): créer page Home avec sélection profil"
git commit -m "feat(pages): créer page Game avec gameplay 60s"
git commit -m "feat(pages): créer page Results avec résultats"
git commit -m "feat(pages): créer page Stats avec historique"
git commit -m "feat(pages): créer page Settings avec paramètres"
```

### Phase 6: Intégration & Polish
```bash
git commit -m "feat(game): intégrer targets dans zone jeu"
git commit -m "feat(game): implémenter scoring avec combos"
git commit -m "feat(game): ajouter feedback visuel (points, animations)"
git commit -m "feat(game): implémenter sauvegarde localStorage"
```

### Phase 7: Accessibilité
```bash
git commit -m "a11y(ui): ajouter aria-label sur tous boutons"
git commit -m "a11y(ui): implémenter navigation clavier complète"
git commit -m "a11y(ui): ajouter focus visibles partout"
git commit -m "a11y(styles): vérifier contraste WCAG 2.1 AA"
```

### Phase 8: Responsive Design
```bash
git commit -m "style(responsive): adapter layout mobile 375px"
git commit -m "style(responsive): adapter layout tablette 768px"
git commit -m "style(responsive): adapter layout desktop 1440px"
```

### Phase 9: Documentation
```bash
git commit -m "docs: créer README complet"
git commit -m "docs: créer architecture.md avec diagramme d'états"
git commit -m "docs: créer structure.md avec arborescence"
git commit -m "docs: créer testing_guide.md avec cas de test"
git commit -m "docs: créer deployment.md avec guide déploiement"
git commit -m "docs: créer ai_journal_dawi.md pour transparence"
```

### Phase 10: Finalisations
```bash
git commit -m "test: valider tous les cas de test"
git commit -m "perf: optimiser bundle size (150KB gzipped)"
git commit -m "fix: corriger edge cases identifiés"
git commit -m "chore: nettoyer console.logs et commentaires debug"
git commit -m "chore: bump version to 1.0.0"
```

---

## 📊 Commit Statistics

```
Total commits: 25+
Breakdown:
- feat (features): 12
- fix (bugs): 2
- docs (documentation): 8
- style (styling): 2
- chore (maintenance): 2
- a11y (accessibility): 1
- perf (performance): 1
- test (testing): 1
```

---

## 🔧 Commandes Git Utiles

### Vérifier les commits
```bash
git log --oneline
git log --oneline --graph --all
git log -p src/pages/Game.jsx        # Historique d'un fichier
```

### Avant un commit
```bash
git status                           # Fichiers modifiés
git diff src/main.jsx               # Voir les changements
git add .                            # Stage tous les fichiers
git add src/pages/                   # Stage un dossier
```

### Créer un commit
```bash
git commit -m "feat(game): description courte"           # Simple
git commit -m "feat(game): description

- Point 1
- Point 2

Fixes #123"                                               # Complet
```

### Vérifier avant de pusher
```bash
git log --oneline origin/main..HEAD  # Commits non pushés
git diff origin/main..HEAD           # Changements non pushés
```

### Pusher
```bash
git push origin main
git push --all                       # Toutes les branches
git push --tags                      # Tous les tags
```

---

## 📝 Template de Commit Complet

```
feat(game): ajouter système de combo multiplicateur

Implémentation d'un système de bonus pour les clics consécutifs:
- Chaque cible cliquée augmente le multiplicateur
- Multiplicateur réinitié si une cible est manquée
- Affichage du combo en orange (#FF7A00)
- Animation de pop-up lors d'augmentation

Bonus: Améliore l'engagement du joueur de 30%

Fixes #42
BREAKING CHANGE: none
```

---

## 🎯 Bonnes Pratiques

### ✅ À FAIRE
- Commits atomiques (une fonctionnalité par commit)
- Messages clairs et en français
- Référencer les issues (#123)
- Grouper par scope (core, ui, styles, docs)
- Rebase avant merge si nécessaire

### ❌ À ÉVITER
- Commits massifs (50+ fichiers)
- Messages vagues ("fix" ou "update")
- Mix de feat et fix dans un commit
- Commits sans corps explicatif
- Oublier de tester avant commit

---

## 🔄 Workflow Recommandé

### Pour une nouvelle feature

```bash
# 1. Créer une branche
git checkout -b feat/new-feature

# 2. Faire des commits atomiques
git add src/components/NewComponent.jsx
git commit -m "feat(ui): créer composant NewComponent"

git add src/styles/NewComponent.css
git commit -m "style(components): styler NewComponent"

# 3. Pousser la branche
git push origin feat/new-feature

# 4. Créer une Pull Request sur GitHub
# → Review et merge

# 5. Mettre à jour main localement
git checkout main
git pull origin main
```

---

## 📚 Ressources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Guide](https://git-scm.com/book)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**Focus Reactor Git Workflow v1.0**  
*2026-06-11*  
*Production Ready*
