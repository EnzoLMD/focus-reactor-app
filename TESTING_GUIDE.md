# TESTING_GUIDE.md - Cas Limites et Scénarios de Test

## 📋 Cas Limites à Tester Absolument

### Gameplay - Jeu

```
[ ] TC001: Cliquer rapidement sur la même cible
    • Action: Cliquer 2x avant disparition
    • Résultat attendu: +Score 1x seulement
    • Vérifier: cible.clicked prevent double hit

[ ] TC002: Cliquer hors zone de jeu
    • Action: Cliquer sur les bords du GameArea
    • Résultat attendu: Pas de score
    • Vérifier: position check

[ ] TC003: Zone de jeu avec cibles chevauchantes
    • Scenario: 2 cibles > 80% de chevauchement
    • Résultat attendu: Clics indépendants, pas de confusion

[ ] TC004: Timer atteint 0 en plein clic
    • Action: Cliquer 100ms avant tempsRestant === 0
    • Résultat attendu: Click enregistré, puis transition Results

[ ] TC005: Plus de 50 cibles simultanées
    • Action: SpawnInterval très court (100ms)
    • Résultat attendu: Performance pas drastiquement réduite
    • Vérifier: FPS reste > 30

[ ] TC006: Combo reset sur manquée
    • Scenario: combo=15, cible manquée
    • Résultat attendu: combo=0, pas pénalité supplémentaire

[ ] TC007: Précision = 0% si aucune cible cliquée
    • Scenario: Ne rien faire pendant 60s
    • Résultat attendu: precision=0%, historique enregistré

[ ] TC008: Commencer/Arrêter/Reprendre
    • Action: Pause game → autres page → back → Reprendre
    • Résultat attendu: Timer reprend correctement
```

### LocalStorage et Persistance

```
[ ] TC101: Première ouverture (localStorage vide)
    • Action: Ouvrir app première fois
    • Résultat attendu: Valeurs par défaut, pas d'erreur

[ ] TC102: Corruption du JSON dans localStorage
    • Action: DevTools → localStorage.focusReactorData = "corrupt{{"
    • Résultat attendu: try/catch gère l'erreur, pas de crash

[ ] TC103: Historique > 10 entrées
    • Scenario: 15 parties jouées
    • Résultat attendu: historique.length === 10 (les plus récentes)

[ ] TC104: LocalStorage plein (5MB+)
    • Action: Ajouter 100+ parties
    • Résultat attendu: Slicing continues, max 10 entrées

[ ] TC105: Suppression manuelle via DevTools
    • Action: localStorage.removeItem('focusReactorData')
    • Résultat attendu: App recharge avec données par défaut

[ ] TC106: Réinitialisation via Settings
    • Action: Clic sur "Réinitialiser"
    • Résultat attendu: Confirmé, localStorage.focusReactorData supprimé
    • Vérifier: Stats affichent 0 partiesJouees

[ ] TC107: Rafraîchir après partie
    • Scenario: Partie terminée → F5 refresh
    • Résultat attendu: Résultats toujours visibles, données dans localStorage

[ ] TC108: Multiple tabs sync
    • Action: 2 onglets, jouer dans l'un
    • Résultat attendu: localStorage update, mais pas de sync live (normal)
```

### Accessibilité

```
[ ] TAcc001: Navigation clavier uniquement
    • Action: Pas de souris, Tab → Enter → Tab → Enter
    • Pages à tester: Home, Game (si possible), Settings
    • Résultat attendu: Tous les boutons/inputs accessibles

[ ] TAcc002: Focus visibles
    • Action: Tab à travers tous les éléments
    • Résultat attendu: Focus outline visible à chaque étape

[ ] TAcc003: Lecteur d'écran (VoiceOver/NVDA)
    • Action: Activer VoiceOver (Mac Cmd+F5)
    • Tests:
      [ ] Page title annoncé
      [ ] Boutons labellisés correctement
      [ ] Regions labelisés (nav, main, etc)
      [ ] Scores annoncés en live (aria-live)

[ ] TAcc004: Contraste couleurs
    • Outils: Contrast Ratio Checker extension
    • Minima: 7:1 pour texte sur fond
    • Vérifier: Cyan #00d9ff sur #0f172a

[ ] TAcc005: Zoom 200%
    • Action: Ctrl++ × 6-7 (200% zoom)
    • Résultat attendu: Layout adaptatif, pas de scroll h horizontal excessif

[ ] TAcc006: Inverted colors (Windows High Contrast)
    • Action: Settings → Accessibility → High Contrast
    • Résultat attendu: Toujours lisible

[ ] TAcc007: Mode Dark utilisateur (prefers-color-scheme)
    • Action: OS settings → Dark mode
    • Résultat attendu: App detection & auto-switch (si implémenté)

[ ] TAcc008: Texte alternatif
    • Images: Vérifier alt=""
    • Emojis: aria-hidden="true" sur les décoratifs
```

### Responsive Design

```
[ ] TResp001: iPhone 12 mini (375px width)
    • Vérifier: 
      [ ] Navbar wrap pas cassée
      [ ] ScoreBoard grid 3 colonnes → 1
      [ ] Buttons 100% width sur mobile
      [ ] GameArea height adapt

[ ] TResp002: iPad (768px width, landscape)
    • Vérifier: Utilisation espace optimal

[ ] TResp003: Desktop 1440px
    • Vérifier: Max-width respected, padding symétrique

[ ] TResp004: Portrait → Landscape rotation
    • Action: Rotate device
    • Résultat attendu: Layout adapte fluidement

[ ] TResp005: Très petit écran (320px, anciens phones)
    • Vérifier: Pas de crash, minimal viable UI

[ ] TResp006: Écran 4K (2560px)
    • Vérifier: Max-width ~1440px, padding > 0
```

### Performance

```
[ ] TPer001: Profiler Game page
    • DevTools → Performance tab
    • Record 30 secondes de gameplay
    • Vérifier: 
      [ ] FPS > 50 most of time
      [ ] No Long Tasks (>50ms)
      [ ] Memory stable (no leaks)

[ ] TPer002: 100 cibles simultanées
    • SpawnInterval = 100ms, durée = 60s
    • Vérifier: App pas freeze/crash

[ ] TPer003: Memory leak après 10 parties
    • Action: Jouer 10 parties d'affilée
    • DevTools → Memory → Heap snapshots
    • Résultat attendu: Memory croissance linéaire pas exponentielle

[ ] TPer004: Startup time
    • DevTools → Network
    • Vérifier: First Contentful Paint < 1.5s

[ ] TPer005: Build size
    • Commande: pnpm build
    • Résultat attendu: dist/ < 150KB gzipped
```

### Compatibilité Navigateur

```
[ ] TBrowser001: Chrome 120+
    • Vérifier: Tous les cas

[ ] TBrowser002: Firefox 121+
    • Vérifier: Slider range input, Web Audio

[ ] TBrowser003: Safari 17+
    • Vérifier: 
      [ ] Prefix -webkit-
      [ ] LocalStorage persistence
      [ ] Web Audio API

[ ] TBrowser004: Edge 120+
    • Vérifier: Same as Chrome

[ ] TBrowser005: Mobile browsers
    • Chrome Android 120+
    • Safari iOS 17+
    • Vérifier: Touch events, Web Audio
```

### Audio et Sons

```
[ ] TAudio001: Bouton son sur/off fonctionne
    • Volume 0% → pas de son
    • Volume 100% → son audible

[ ] TAudio002: Web Audio API initié
    • Condition: Premier clic user
    • Résultat attendu: audioContext créé avec user gesture

[ ] TAudio003: Fréquences correctes
    • Succès: 800Hz (aigu)
    • Échec: 300Hz (grave)
    • Fin: 400Hz, 600Hz, 800Hz (séquence)

[ ] TAudio004: Pas de bruit audio excessif
    • Action: Jouer game entier
    • Résultat attendu: Sons clairs, sans distorsion
```

### Thème et Paramètres

```
[ ] TTheme001: Basculer thème Light/Dark
    • Action: Settings → Click button
    • Résultat attendu: Background change, text color adjust

[ ] TTheme002: Persistance thème
    • Change → Refresh → Refresh
    • Résultat attendu: Thème conservé

[ ] TTheme003: Slider volume 0-100
    • Tout % devrait marcher
    • Vérifier: localStorage update

[ ] TTheme004: Taille texte 12-20px
    • Change à 20px → Zoom page
    • Change à 12px → Zoom page
    • Résultat attendu: Effet visible

[ ] TTheme005: Settings persist après navigation
    • Change settings → Allez à Home → Game → Results
    • Résultat attendu: Paramètres restent appliqués
```

### Edge Cases d'Entrée

```
[ ] TInput001: Enter sur bouton profile
    • Action: Tab jusqu'au radio → Enter
    • Résultat attendu: Profil selected (visuel)

[ ] TInput002: Clic rapidement 100 fois
    • Action: AutoClicker sur une cible
    • Résultat attendu: Enregistrement unique

[ ] TInput003: Interférence tactile (mobile)
    • Swipe → tap → cible
    • Résultat attendu: Pas d'interférences
```

### UI/UX Flows

```
[ ] TFlow001: Home → Game → Results → Stats → Settings → Home
    • Action: Navigue complète
    • Vérifier: Navigation sans erreur

[ ] TFlow002: Jouer plusieurs parties d'affilée
    • Finish game → Click Rejouer → Finish → Rejouer
    • Résultat attendu: Historique accumule

[ ] TFlow003: Réinitialiser données → Jouer
    • Settings → Reset → Home → Game → Results
    • Résultat attendu: Nouvelle partie, pas d'ancien score
```

---

## Checklist d'Exécution

### Avant déploiement

- [ ] Tests sur 3 navigateurs (Chrome, Firefox, Safari)
- [ ] Tests sur 2 devices (Mobile + Desktop)
- [ ] Performance Audit (Lighthouse > 90)
- [ ] A11y Audit (axe DevTools pass)
- [ ] LocalStorage tests
- [ ] Game logic edge cases

### Avant certification DAWI

- [ ] Tous les cas limites passent
- [ ] Documentation complète et à jour
- [ ] Commentaires en français partout
- [ ] Console sans erreurs ou warnings
- [ ] Build production sans warning

---

## Outils Recommandés

```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://focus-reactor.vercel.app --view

# Accessibility audit
# Chrome → DevTools → Lighthouse → Accessibility

# Performance profile
# Chrome → DevTools → Performance tab → Record

# Memory leak detector
# Chrome → DevTools → Memory → Heap snapshot
```

