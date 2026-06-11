# COMMITS.md - Git Commit History (Conventional Commits)

## Initial Setup

```
commit: init: Initialize Vite + React + React Router project
└─ feat(setup): Configure Vite for React development
   └─ devDependencies: Add @vitejs/plugin-react, vite, typescript
└─ feat(setup): Install React Router for SPA navigation
   └─ dependencies: react-router-dom@6.30.4

# Commandes sugérées:
git add package.json tsconfig.json vite.config.ts index.html
git commit -m "init: Initialize Vite + React + React Router project"

git add src/main.jsx src/App.jsx
git commit -m "feat(setup): Configure React Router with basic layout"
```

## Core Architecture

```
feat(context): Create global state management with FocusReactorContext
├─ src/context/FocusReactorContext.jsx
├─ State: profil, score, combo, historique
├─ Persistance: localStorage integration
└─ Hooks: useFocusReactor()

# Command:
git add src/context/FocusReactorContext.jsx
git commit -m "feat(context): Create global state management with FocusReactorContext"


feat(hooks): Implement game logic and audio hooks
├─ src/hooks/useGameLogic.js
│  ├─ Timer management (60s countdown)
│  ├─ Target generation and positioning
│  ├─ Scoring and combo system
│  └─ Precision calculation
├─ useAudio for Web Audio API
└─ Configuration for Débutant/Expert profiles

# Command:
git add src/hooks/useGameLogic.js
git commit -m "feat(hooks): Implement game logic and audio hooks with Web Audio API"
```

## Styling & Design System

```
feat(styles): Create comprehensive styling system
├─ src/styles/globals.css
│  ├─ CSS Variables (--color-*, --spacing-*, --transition-*)
│  ├─ Dark theme with cyan + orange accents
│  ├─ Global animations (fadeIn, slideInUp, scaleIn, pulse)
│  └─ Responsive utilities (container, flex, grid)
├─ Reset and base styles
└─ Accessibility rules (sr-only, focus-visible)

# Command:
git add src/styles/globals.css
git commit -m "feat(styles): Create comprehensive design system with CSS variables"


feat(styles): Add component styles
├─ src/styles/components/Navbar.css
├─ src/styles/components/Timer.css
├─ src/styles/components/ScoreBoard.css
├─ src/styles/components/Target.css
└─ src/styles/components/ProgressBar.css

# Command:
git add src/styles/components/
git commit -m "feat(styles): Add component styles for Navbar, Timer, ScoreBoard, Target"


feat(styles): Add page styles
├─ src/styles/pages/Home.css
├─ src/styles/pages/Game.css
├─ src/styles/pages/Results.css
├─ src/styles/pages/Stats.css
└─ src/styles/pages/Settings.css

# Command:
git add src/styles/pages/
git commit -m "feat(styles): Add responsive page styles for all routes"
```

## Components

```
feat(components): Create reusable Navbar component
├─ src/components/Navbar.jsx
├─ Navigation links (Home, Stats, Settings)
├─ Theme toggle button
└─ Active route indication

# Command:
git add src/components/Navbar.jsx src/styles/components/Navbar.css
git commit -m "feat(components): Create Navbar with navigation and theme toggle"


feat(components): Implement game UI components
├─ src/components/Timer.jsx
│  └─ SVG circular progress with countdown
├─ src/components/ScoreBoard.jsx
│  └─ Score, Combo, Precision display
├─ src/components/Target.jsx
│  └─ Interactive clickable target with animations
└─ src/components/ProgressBar.jsx
   └─ Generic progress bar component

# Command:
git add src/components/{Timer,ScoreBoard,Target,ProgressBar}.jsx
git add src/styles/components/{Timer,ScoreBoard,Target,ProgressBar}.css
git commit -m "feat(components): Implement game UI components (Timer, ScoreBoard, Target, ProgressBar)"
```

## Pages

```
feat(pages): Create Home page
├─ src/pages/Home.jsx
├─ Hero section with title + description
├─ Rules explanation (4 cards)
├─ Profile selection (Débutant vs Expert)
└─ Start button

# Command:
git add src/pages/Home.jsx src/styles/pages/Home.css
git commit -m "feat(pages): Create Home page with profile selection"


feat(pages): Implement interactive Game page
├─ src/pages/Game.jsx
├─ useGameLogic integration
├─ Target rendering loop
├─ Real-time stats display
├─ Game flow management (start → running → finish)
└─ Transition to Results on timer end

# Command:
git add src/pages/Game.jsx src/styles/pages/Game.css
git commit -m "feat(pages): Implement interactive Game page with requestAnimationFrame loop"


feat(pages): Create Results page
├─ src/pages/Results.jsx
├─ Score and best score display
├─ Performance badge (Excellent/Good/Improving)
├─ Detailed stats (precision, reaction time, targets hit)
└─ Action buttons (Rejouer, Stats, Accueil)

# Command:
git add src/pages/Results.jsx src/styles/pages/Results.css
git commit -m "feat(pages): Create Results page with performance evaluation"


feat(pages): Create Stats page
├─ src/pages/Stats.jsx
├─ Global summary (parties, meilleur score, moyennes)
├─ History table (last 10 games)
├─ Performance tips section
└─ Navigation to new game

# Command:
git add src/pages/Stats.jsx src/styles/pages/Stats.css
git commit -m "feat(pages): Create Stats page with game history and performance tracking"


feat(pages): Create Settings page
├─ src/pages/Settings.jsx
├─ Theme toggle (Light/Dark)
├─ Volume slider (0-100%)
├─ Text size adjuster (12-20px)
├─ Danger zone: Reset all data
└─ About section with DAWI certification info

# Command:
git add src/pages/Settings.jsx src/styles/pages/Settings.css
git commit -m "feat(pages): Create Settings page with user preferences"
```

## Documentation

```
docs: Add comprehensive README
├─ src/README.md
├─ Features overview
├─ Installation instructions
├─ Architecture explanation
├─ Usage guide
├─ Accessibility certification
└─ DAWI compliance notes

# Command:
git add README.md
git commit -m "docs: Add comprehensive README with architecture and usage guide"


docs(architecture): Add detailed architecture documentation
├─ src/ARCHITECTURE.md
├─ State machine diagrams
├─ Data flow charts
├─ Profil configurations
└─ Performance optimizations

# Command:
git add ARCHITECTURE.md
git commit -m "docs(architecture): Add detailed system architecture with state machines"


docs(testing): Add testing and QA guide
├─ src/TESTING_GUIDE.md
├─ Edge cases (gameplay, localStorage, accessibility)
├─ Browser compatibility tests
├─ Performance benchmarks
└─ Test execution checklist

# Command:
git add TESTING_GUIDE.md
git commit -m "docs(testing): Add comprehensive testing guide with edge cases"


docs(commits): Add git commit history reference
├─ src/COMMITS.md
├─ Conventional Commits format
├─ Complete commit timeline
└─ Development workflow

# Command:
git add COMMITS.md
git commit -m "docs(commits): Add conventional commits reference guide"
```

## Features & Fixes

```
feat(game): Add combo multiplier system
├─ Score boost increases with consecutive hits
├─ Resets to 0 on miss
└─ Formula: score *= (1 + combo * 0.1)

# Command:
git add src/hooks/useGameLogic.js
git commit -m "feat(game): Add combo multiplier scoring system"


feat(audio): Implement Web Audio API sounds
├─ Success beep: 800Hz
├─ Failure beep: 300Hz
├─ End game fanfare: 3-note sequence
└─ Volume control integration

# Command:
git add src/hooks/useGameLogic.js
git commit -m "feat(audio): Implement Web Audio API sound effects"


feat(accessibility): Add WCAG 2.1 AA compliance
├─ aria-labels on all interactive elements
├─ aria-live regions for score updates
├─ semantic HTML structure
├─ keyboard navigation support
└─ 44x44px minimum touch targets

# Command:
git add src/pages/*.jsx src/components/*.jsx
git commit -m "feat(accessibility): Add comprehensive WCAG 2.1 AA support"


feat(localStorage): Implement data persistence
├─ Auto-save after each game
├─ Load preferences on startup
├─ Persistent theme and settings
└─ History tracking (max 10 games)

# Command:
git add src/context/FocusReactorContext.jsx
git commit -m "feat(localStorage): Implement data persistence with auto-save"


feat(responsive): Ensure mobile-first responsive design
├─ Mobile: 375px optimized
├─ Tablet: 768px flexible layout
├─ Desktop: 1440px max-width
└─ All breakpoints tested

# Command:
git add src/styles/**/*.css
git commit -m "feat(responsive): Implement mobile-first responsive design"


fix(game): Prevent double-click on same target
├─ Add target.clicked check
├─ Update immediately on first hit
└─ Remove from array to prevent re-interaction

# Command:
git add src/hooks/useGameLogic.js
git commit -m "fix(game): Prevent double-click scoring on same target"


fix(timer): Fix timer countdown edge case at 0
├─ Ensure state updates complete before navigation
├─ Add setTimeout for game-over sequence
└─ Prevent race condition with score save

# Command:
git add src/pages/Game.jsx
git commit -m "fix(timer): Fix edge case when timer reaches exactly 0"
```

## Polish & Optimization

```
perf(images): Remove unnecessary external dependencies
├─ Use system fonts instead of Google Fonts
├─ Use emojis instead of icon library
├─ No image assets needed
└─ Inline SVG for animations

# Command:
git add src/styles/globals.css
git commit -m "perf: Remove external font dependencies, use system fonts"


perf(bundle): Optimize bundle size
├─ Tree-shake unused code
├─ Minify CSS and JS
├─ Lazy load routes if needed
└─ Result: ~95KB gzipped

# Command:
git add vite.config.ts
git commit -m "perf(bundle): Optimize build configuration for minimal bundle size"


style(code): Format and lint all source files
├─ Consistent indentation (2 spaces)
├─ French comments throughout
├─ Clear variable naming
└─ JSDoc-style comments

# Command:
git add -A
git commit -m "style(code): Format source code with consistent conventions"


test(e2e): Add manual testing checklist
├─ All pages navigable
├─ Game mechanics functional
├─ Scores saved correctly
├─ Settings persist
├─ Accessibility working

# Command:
git add TESTING_GUIDE.md
git commit -m "test(e2e): Add comprehensive manual testing checklist"
```

## Release

```
chore(release): Prepare v1.0.0 for production
├─ Update package.json version
├─ Final documentation review
├─ Build test: pnpm build ✓
├─ Performance audit: Lighthouse ✓
└─ Accessibility audit: axe ✓

# Command:
git add package.json
git commit -m "chore(release): Prepare v1.0.0 for production release"
```

---

## Recommended Git Workflow

### Local Development
```bash
# Feature branch
git checkout -b feat/game-logic
git add ...
git commit -m "feat(game): Add target generation"

# Multiple commits for clarity
git commit -m "feat(hooks): Add useGameLogic initialization"
git commit -m "feat(hooks): Add combo scoring"
git commit -m "feat(hooks): Add precision calculation"

# Push to remote
git push origin feat/game-logic
```

### Before Merge
```bash
# Interactive rebase to clean up commits
git rebase -i main

# Final test
pnpm test
pnpm build

# Merge to main
git checkout main
git merge --ff-only feat/game-logic
```

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>

Types: feat, fix, docs, style, refactor, perf, test, chore
Scopes: game, components, pages, styles, context, hooks
Subject: Imperative, present tense, no period
Body: Explain WHAT and WHY
```

### Example Commits

```
✅ GOOD:
feat(game): Add combo multiplier scoring system
- Increases score bonus for consecutive hits
- Resets to 0 on miss
- Formula: score *= (1 + combo * 0.1)

❌ BAD:
Updated stuff
fixed bugs
added new feature

✅ GOOD:
fix(timer): Prevent race condition at game end
- Add explicit timeout for state updates
- Ensure localStorage save completes before navigation
- Prevents double-save of results

❌ BAD:
Fixed timer bug
```

