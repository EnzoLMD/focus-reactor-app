# Architecture Focus Reactor - Diagramme d'États Textuel

## 1. Flux de Navigation Global

```
┌─────────────────────────────────────────────────────────────┐
│                     FOCUS REACTOR                           │
│                   Application SPA Vite                      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
          ┌────────────────────────────────────┐
          │  FocusReactorProvider (Context)   │
          │                                    │
          │  • État global utilisateur         │
          │  • Préférences (thème, volume)     │
          │  • Historique des parties          │
          │  • LocalStorage persistence        │
          └────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┬──────────────┐
           ▼               ▼               ▼              ▼
        ┌─────┐        ┌─────┐        ┌─────┐        ┌─────┐
        │Home │───────▶│Game │───────▶│Results      │Stats│
        └─────┘        └─────┘        │           │ └─────┘
           ▲            │ │            │ └──────┬───────▼─────┐
           │            │ └────────────┘        │             │
           │            ▼                       │            │
           │         [Pause]                    │         ┌──────────┐
           │            │                       └────────▶│Settings  │
           └────────────┴───────────────────────────────▶└──────────┘
```

## 2. États du Jeu

```
┌──────────────────────────────────────────────────────────────┐
│                      ÉTATS DU JEU                            │
└──────────────────────────────────────────────────────────────┘

INITIAL
  ├─ tempsRestant: 60
  ├─ gameActive: false
  ├─ score: 0
  ├─ combo: 0
  ├─ cibleActuelles: []
  └─ precision: 0%

  │
  └──▶ [Clic Commencer] ──▶ RUNNING
         │
         ├─ tempsRestant: 59→0 (décrémente)
         ├─ gameActive: true
         ├─ score: 0→∞ (augmente)
         ├─ combo: 0→N (augmente au clic)
         ├─ cibleActuelles: [] → [target1, target2...]
         └─ precision: calculée en temps réel
         
         ├─ [Clic sur cible] ──▶ HIT
         │  ├─ score += 5 * (1 + combo * 0.1)
         │  ├─ combo += 1
         │  ├─ Affiche +points animation
         │  ├─ Son succès
         │  └─ [Retour RUNNING]
         │
         ├─ [Cible disparaît] ──▶ MISS
         │  ├─ score -= 2 (pénalité)
         │  ├─ combo = 0
         │  ├─ Son échec
         │  └─ [Retour RUNNING]
         │
         └─ [Timer = 0] ──▶ FINISHED
            ├─ gameActive: false
            ├─ Sauvegarde dans historique
            ├─ Son fin
            ├─ Navigation vers /results
            └─ État transitionné à RESULTS
```

## 3. Machine à États Complète (Mealy)

```
┌──────────────────────────────────────────────────────────────┐
│                   MACHINE À ÉTATS ÉTENDUE                    │
└──────────────────────────────────────────────────────────────┘

HOME STATE
  Input: [Sélection profil] + [Clic Commencer]
  Processing:
    - setProfil(selectedProfile)
    - demarrerJeu()
  Output:
    - Navigate('/game')
    → STATE: GAME_INITIAL

GAME_INITIAL STATE
  Input: useGameLogic init
  Processing:
    - setTempsRestant(60)
    - setGameActive(true)
    - genererCible() every 800-1200ms
    - Timer countdown
  Output:
    - Render Timer, ScoreBoard, Targets
    → STATE: GAME_RUNNING

GAME_RUNNING STATE
  Input:
    a) [userClicked]
    b) [Timer tick]
    c) [Cible timeout]
    d) [Timer = 0]
  
  ├─ a) User clicked on target
  │   Processing:
  │     - Identifier target by ID
  │     - Vérifier !target.clicked
  │     - recordTimestamp()
  │     - Calculate reaction time
  │     - score += gain
  │     - combo++
  │   Output:
  │     - playSound('success')
  │     - Animation score +points
  │     - Remove target
  │     → STATE: GAME_RUNNING (continue)
  │
  ├─ b) Timer tick (1000ms)
  │   Processing:
  │     - tempsRestant--
  │   Output:
  │     - Update Timer display
  │     → STATE: GAME_RUNNING (continue)
  │
  ├─ c) Cible timeout (800-2500ms)
  │   Processing:
  │     - Mark target as missed
  │     - score -= penalty
  │     - combo = 0
  │   Output:
  │     - playSound('fail')
  │     - Remove target
  │     → STATE: GAME_RUNNING (continue)
  │
  └─ d) Timer = 0
      Processing:
        - clearInterval(timerInterval)
        - enregistrerPartie({...})
        - Calculate final stats
      Output:
        - playSound('complete')
        → STATE: RESULTS

RESULTS STATE
  Input: [Location.state]
  Processing:
    - Afficher score final
    - Comparer avec meilleurScore
    - Générer message perso
  Output:
    - Render Results page
    - Options: [Rejouer] [Stats] [Accueil]
  
  ├─ [Rejouer] ──▶ HOME
  ├─ [Stats] ───▶ STATS
  └─ [Accueil] ─▶ HOME

STATS STATE
  Input: useContext(FocusReactor)
  Processing:
    - Fetch historique from localStorage
    - Afficher résumé global
  Output:
    - Render Stats page
    - Options: [Nouvelle partie] [Accueil]
  
  ├─ [Nouvelle] ─▶ HOME
  └─ [Accueil] ──▶ HOME

SETTINGS STATE
  Input: User actions
  Processing:
    - basculerTheme()
    - mettreAJourVolume()
    - mettreAJourTailleTexte()
    - reinitialiserDonnees()
  Output:
    - Update localStorage
    - Render Settings page
    → STATE: SETTINGS (continue)
```

## 4. Flux des Données (Data Flow)

```
┌──────────────────────────────────────────────────────────────┐
│              FLUX DES DONNÉES - UNIDIRECTIONNEL              │
└──────────────────────────────────────────────────────────────┘

FocusReactorContext
    │
    ├─ État Global:
    │   ├─ profil, score, combo, precision
    │   ├─ meilleurScore, historique
    │   ├─ theme, volume, tailleTexte
    │
    └─ Fournit via useFocusReactor()
         │
         ├─▶ Home
         │   ├─ Lit: profil
         │   └─ Écrit: setProfil()
         │
         ├─▶ Game
         │   ├─ Lit: profil, volume
         │   ├─ useGameLogic(profil)
         │   │   ├─ États locaux: tempsRestant, score, combo
         │   │   ├─ Génère: cibleActuelles[]
         │   │   └─ Retourne: demarrerJeu(), surClicCible()
         │   │
         │   └─ Écrit: enregistrerPartie() [fin]
         │
         ├─▶ Results
         │   └─ Lit: meilleurScore, historique
         │
         ├─▶ Stats
         │   ├─ Lit: partiesJouees, scoresMoyens
         │   ├─ Lit: tempsReactionMoyen, historique
         │   └─ Lit: meilleurScore, meilleurCombo
         │
         └─▶ Settings
             ├─ Lit: theme, volume, tailleTexte
             ├─ Écrit: basculerTheme()
             ├─ Écrit: mettreAJourVolume()
             ├─ Écrit: mettreAJourTailleTexte()
             └─ Écrit: reinitialiserDonnees()

localStorage
    ├─ focusReactorData
    │   ├─ meilleurScore
    │   ├─ meilleurCombo
    │   ├─ partiesJouees
    │   ├─ scoresMoyens
    │   ├─ tempsReactionMoyen
    │   └─ historique: [{ id, date, score, combo, precision, profil, tempsReaction }]
    │
    ├─ theme
    ├─ volume
    └─ tailleTexte

DOM
    ├─ Navbar (currentRoute, theme)
    ├─ Timer (tempsRestant)
    ├─ ScoreBoard (score, combo, precision)
    ├─ Target[] (cibleActuelles[])
    ├─ ProgressBar (progression)
    └─ ResultsCard (score, messages)
```

## 5. Profils et Configurations

```
┌──────────────────────────────────────────────────────────────┐
│                  PROFILS DE DIFFICULTÉ                       │
└──────────────────────────────────────────────────────────────┘

DÉBUTANT
├─ targetSize: 50px
├─ targetDuration: 2500ms
├─ spawnInterval: 1200ms
├─ hitScore: 5 points
├─ missedPenalty: -2 points
└─ Public cible: Score moyen ~50-100

EXPERT
├─ targetSize: 30px
├─ targetDuration: 1500ms
├─ spawnInterval: 800ms
├─ hitScore: 10 points
├─ missedPenalty: -5 points
└─ Public cible: Score moyen ~150-300

COMBO MULTIPLIER (both profils)
├─ Formule: score += hitScore * (1 + combo * 0.1)
├─ Exemple Débutant:
│   ├─ Cible 1: 5 * (1 + 0*0.1) = 5 pts
│   ├─ Cible 2: 5 * (1 + 1*0.1) = 5.5 pts
│   ├─ Cible 3: 5 * (1 + 2*0.1) = 6 pts
│   └─ Cible 10: 5 * (1 + 9*0.1) = 9.5 pts
│
└─ Réinitialisation: combo = 0 si cible manquée
```

## 6. Interactions Utilisateur

```
┌──────────────────────────────────────────────────────────────┐
│              DIAGRAMME D'INTERACTIONS                         │
└──────────────────────────────────────────────────────────────┘

USER ACTION                  COMPONENT              RESULT
─────────────────────────────────────────────────────────────

[Souris/Tactile]
  │
  ├─ Click Commencer ───────▶ Home ──────────────▶ Navigate /game
  ├─ Click Target ───────────▶ Target ──────────▶ +Score, +Combo
  ├─ Click Rejouer ──────────▶ Results ────────▶ Navigate /game
  ├─ Click Stats ────────────▶ Results ────────▶ Navigate /stats
  ├─ Slider Volume ──────────▶ Settings ──────▶ updateVolume()
  ├─ Toggle Thème ───────────▶ Settings ──────▶ basculerTheme()
  └─ Click Reset ────────────▶ Settings ──────▶ reinitialiserDonnees()

[Clavier]
  │
  ├─ Tab ────────────────────▶ Navbar/Form ────▶ Focus change
  ├─ Enter sur bouton ───────▶ Button ────────▶ Click handler
  └─ Esc (potentiel) ────────▶ Modal ────────▶ Fermer modal

[Temps réel]
  │
  ├─ 1000ms ─────────────────▶ Timer ────────▶ tempsRestant--
  ├─ 800-2500ms ─────────────▶ Game ────────▶ Cible disappear
  ├─ requestAnimationFrame ──▶ Game ────────▶ Target render
  └─ setInterval ────────────▶ Game ────────▶ Génère cibles
```

## 7. Persistance des Données

```
┌──────────────────────────────────────────────────────────────┐
│            CYCLE DE VIE PERSISTANCE LOCALSTORAGE             │
└──────────────────────────────────────────────────────────────┘

MONTAGE (App.jsx)
  │
  ├─ FocusReactorProvider useEffect
  │   └─ chargerDonneesLocales()
  │       ├─ localStorage.getItem('focusReactorData')
  │       ├─ Parse JSON
  │       └─ Populate State
  │
  ├─ Récupération thème
  │   └─ localStorage.getItem('theme') → setTheme()
  │
  └─ Récupération préférences
      ├─ localStorage.getItem('volume')
      └─ localStorage.getItem('tailleTexte')

PENDANT LE JEU
  │
  └─ État stocké EN MÉMOIRE uniquement
      (pas de sauvegarde pendant la partie)

FIN DE PARTIE (Game.jsx)
  │
  └─ useEffect [tempsRestant === 0]
      │
      ├─ enregistrerPartie({scorePartie, comboPartie, ...})
      │   │
      │   ├─ Calculate: nouveauScoreMoyen, nouveauTempsReactionMoyen
      │   ├─ Create: nouvellePartie { id, date, score, ... }
      │   ├─ Update: nouvelHistorique (max 10)
      │   │
      │   └─ localStorage.setItem('focusReactorData', JSON.stringify({
      │       meilleurScore,
      │       meilleurCombo,
      │       partiesJouees,
      │       scoresMoyens,
      │       tempsReactionMoyen,
      │       historique
      │   }))
      │
      └─ Navigate('/results')

ACTION SETTINGS
  │
  ├─ mettreAJourVolume(val)
  │   └─ localStorage.setItem('volume', val)
  │
  ├─ mettreAJourTailleTexte(val)
  │   └─ localStorage.setItem('tailleTexte', val)
  │
  ├─ basculerTheme()
  │   └─ localStorage.setItem('theme', newTheme)
  │
  └─ reinitialiserDonnees()
      └─ localStorage.removeItem('focusReactorData')

CHARGEMENT PAGE (Toute page)
  │
  └─ localStorage persiste automatiquement
      └─ Les données restent après refresh/fermeture
```

## 8. Performance et Optimisations

```
┌──────────────────────────────────────────────────────────────┐
│              STRATÉGIES DE PERFORMANCE                        │
└──────────────────────────────────────────────────────────────┘

COMPOSANTS
├─ Target: React.memo() → évite re-renders inutiles
├─ Lazy props: cibleActuelles[] seulement si changé
└─ No prop drilling: Context API pour l'état global

ANIMATIONS
├─ Transform + Opacity: GPU accelerated
├─ requestAnimationFrame: 60fps smooth
├─ Box-shadow: 0 0 Xpx rgba() → perf light
└─ Évité: width/height animations

AUDIO
├─ Web Audio API: Pas de fichiers externes
├─ Oscillator synth: Généré en temps réel
├─ Gain envelope: Fade in/out pour fluidité
└─ Context reuse: Un seul contexte audio

BUNDLE SIZE
├─ React: 50KB (gzip)
├─ React Router: 15KB (gzip)
├─ CSS: Inline ~30KB (gzip)
├─ Total: ~95KB (gzip)
└─ Pas d'autres dépendances

RENDERING
├─ SPA: Single Page Application = navigation rapide
├─ CSS-in-JS: Aucun (Vanilla CSS natif)
├─ Image: Aucune (Emojis que du texte)
└─ Font: Système fonts uniquement
```

---

## Notes

Cette architecture a été conçue pour:

1. **Clarté**: États distincts, flux de données unidirectionnel
2. **Maintenabilité**: Composants découplés, responsabilités claires
3. **Extensibilité**: Hooks réutilisables, Context scalable
4. **Performance**: Optimisations GPU, pas de dépendances externes
5. **Accessibilité**: Sémantique HTML, ARIA labels, navigation clavier

