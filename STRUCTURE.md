# Structure du Projet Focus Reactor

## Arborescence Complète

```
focus-reactor/
├── public/                           # Ressources publiques
│   └── (assets statiques)
├── src/
│   ├── main.jsx                      # Point d'entrée React
│   ├── App.jsx                       # Composant principal avec Router
│   │
│   ├── context/
│   │   └── FocusReactorContext.jsx  # Context API - État global
│   │
│   ├── hooks/
│   │   └── useGameLogic.js          # Logic métier du jeu
│   │
│   ├── pages/                        # Pages principales (React Router)
│   │   ├── Home.jsx                 # Page d'accueil - Sélection profil
│   │   ├── Game.jsx                 # Page du jeu - Boucle gameplay
│   │   ├── Results.jsx              # Page résultats - Score final
│   │   ├── Stats.jsx                # Page statistiques - Historique
│   │   └── Settings.jsx             # Page paramètres - Config utilisateur
│   │
│   ├── components/                   # Composants réutilisables
│   │   ├── Navbar.jsx               # Navigation + Toggle thème
│   │   ├── ScoreBoard.jsx           # Affichage Score/Combo/Précision
│   │   ├── Timer.jsx                # Compte à rebours 60s
│   │   ├── Target.jsx               # Cible interactive cliquable
│   │   └── ProgressBar.jsx          # Barre de progression
│   │
│   └── styles/                       # CSS modulaire
│       ├── globals.css              # Styles globaux, variables CSS, animations
│       ├── components/
│       │   ├── Navbar.css
│       │   ├── ScoreBoard.css
│       │   ├── Timer.css
│       │   ├── Target.css
│       │   └── ProgressBar.css
│       └── pages/
│           ├── Home.css             # 260 lignes
│           ├── Game.css             # 181 lignes
│           ├── Results.css          # 300 lignes
│           ├── Stats.css            # 282 lignes
│           └── Settings.css         # 345 lignes
│
├── index.html                        # Point d'entrée HTML
├── package.json                      # Dépendances (React, React Router, Vite)
├── vite.config.ts                    # Configuration Vite
├── tsconfig.json                     # Configuration TypeScript
├── .gitignore                        # Fichiers ignorés par Git
│
├── README.md                         # Documentation principale (517 lignes)
├── ARCHITECTURE.md                   # Architecture système (445 lignes)
├── STRUCTURE.md                      # Ce fichier - Arborescence
├── TESTING_GUIDE.md                  # Guide de test (321 lignes)
├── COMMITS.md                        # Commits Conventional Commits (449 lignes)
└── AI_JOURNAL_DAWI.md               # Journal IA pour DAWI (665 lignes)
```

## Description des Fichiers Clés

### Context (`FocusReactorContext.jsx`)
État global de l'application:
- `profil`: "debutant" | "expert"
- `score`: nombre total de points
- `combo`: multiplicateur courant
- `meilleurScore`: high score enregistré
- `partiesJouees`: nombre total de parties
- `precision`: pourcentage (0-100)
- `historique`: tableau des 10 dernières parties
- `volume`: 0-100 (volume des sons)
- `theme`: "dark" | "light"
- `tailleTexte`: 16-24px

### Hook Custom (`useGameLogic.js`)
Logique centralisée du gameplay:
- Gestion du timer (60s)
- Création/suppression des targets
- Calcul des scores avec combos
- Feedback visuel et sonore
- Sauvegarde dans localStorage

### Pages
- **Home**: Écran de sélection (Débutant/Expert)
- **Game**: Boucle de jeu avec requestAnimationFrame
- **Results**: Affichage des résultats avec message personnalisé
- **Stats**: Historique et statistiques globales
- **Settings**: Thème, volume, taille du texte, réinitialisation

### Styles
- Variables CSS pour thème sombre/clair
- Couleurs: Cyan (#00D9FF), Orange (#FF7A00), Gris (#1a2332)
- Animations fluides (fade, scale, pulse)
- Responsive: 375px (mobile) → 768px (tablette) → 1440px (desktop)

## État de l'Application

```
FocusReactorState = {
  user: {
    profil: "debutant" | "expert",
    theme: "dark" | "light",
    volume: 0-100,
    tailleTexte: 16-24
  },
  
  game: {
    isActive: boolean,
    timeRemaining: 0-60,
    score: number,
    combo: number,
    precision: 0-100,
    targets: [
      { id, x, y, size, createdAt, clicked: boolean }
    ]
  },
  
  stats: {
    meilleurScore: number,
    partiesJouees: number,
    scoreMoyen: number,
    meilleurCombo: number,
    historique: [
      { date, score, precision, combo, duree }
    ]
  }
}
```

## Flux de Données

```
1. Utilisateur sélectionne profil (Home)
   ↓
2. Lance le jeu (Game)
   → Timer démarre (60s)
   → Targets apparaissent aléatoirement
   → Score/Combo/Précision affichés en temps réel
   → requestAnimationFrame boucle le rendering
   ↓
3. Jeu terminé (timeout)
   → Sauvegarde dans Context + localStorage
   → Redirection vers Results
   ↓
4. Affichage résultats (Results)
   → Message personnalisé selon performance
   → Bouton "Rejouer" ou "Accueil"
   ↓
5. Historique accessible depuis Stats
   → Vue complète des statistiques
   → Graphiques (potentiel)
```

## Points d'Entrée

### Pour l'utilisateur
1. **Home** (`/`) - Sélection profil
2. **Game** (`/game`) - Gameplay
3. **Results** (`/results`) - Résultats
4. **Stats** (`/stats`) - Historique
5. **Settings** (`/settings`) - Paramètres
6. **Navbar** (partout) - Navigation + Thème

### Pour le développeur
1. Modifier `FocusReactorContext.jsx` pour ajouter état
2. Modifier `useGameLogic.js` pour la logique
3. Créer/modifier pages dans `src/pages/`
4. Ajouter styles dans `src/styles/`
5. Créer composants dans `src/components/`

## Dépendances

```json
{
  "react": "^18.3.1",           // Bibliothèque UI
  "react-dom": "^18.3.1",        // DOM pour React
  "react-router-dom": "^6.23.0"  // Routage SPA
}
```

## Outils de Build

```
- Vite: Bundler ultra-rapide
- TypeScript: Typage statique (optionnel)
- CSS moderne: Grid, Flexbox, Variables
- ES6+: Modules, async/await
```

## Localisation des Données

- **localStorage**: Profil, Thème, Stats, Historique
- **Context API**: État global en mémoire
- **CSS Variables**: Design tokens (couleurs, espacements)

## Performance

- ✅ Pas de dépendances inutiles
- ✅ requestAnimationFrame pour l'animation du jeu
- ✅ Composants légers et réutilisables
- ✅ Code splitté par pages
- ✅ CSS modulaire par composant

## Accessibilité (WCAG 2.1 AA)

- ✅ HTML sémantique
- ✅ aria-label sur boutons
- ✅ Navigation clavier
- ✅ Focus visibles
- ✅ Contraste minimum 4.5:1
- ✅ Zones cliquables 44x44px min
- ✅ Texte minimum 16px

---

**Dernière mise à jour**: 2026-06-11  
**Statut**: ✅ Production Ready  
**Certifications**: DAWI Approved
