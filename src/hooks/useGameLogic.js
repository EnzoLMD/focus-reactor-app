import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook pour gérer la logique du jeu
 * 
 * Gère:
 * - Timer 60 secondes
 * - Apparition des cibles
 * - Calcul du score et combo
 * - Precision (cibles cliquées / cibles générées)
 */
export const useGameLogic = (profil) => {
  const [tempsRestant, setTempsRestant] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [cibleActuelles, setCibleActuelles] = useState([]);
  const [targetHitCount, setTargetHitCount] = useState(0);
  const [targetMissedCount, setTargetMissedCount] = useState(0);
  const [tempsReactions, setTempsReactions] = useState([]);

  const gameLoopRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const cibleIdRef = useRef(0);

  // Configuration selon le profil
  const config = profil === 'expert' ? {
    targetSize: 30,
    targetDuration: 1500,
    spawnInterval: 800,
    hitScore: 10,
    missedPenalty: -5
  } : {
    targetSize: 50,
    targetDuration: 2500,
    spawnInterval: 1200,
    hitScore: 5,
    missedPenalty: -2
  };

  /**
   * Génère une nouvelle cible aléatoire
   */
  const genererCible = useCallback(() => {
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;

    const rect = gameArea.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - config.targetSize - 10);
    const maxY = Math.max(0, rect.height - config.targetSize - 10);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    const id = ++cibleIdRef.current;

    const nouvelleCible = {
      id,
      x,
      y,
      size: config.targetSize,
      createdAt: Date.now(),
      duration: config.targetDuration,
      clicked: false
    };

    setCibleActuelles(prev => [...prev, nouvelleCible]);

    // Supprimer la cible après sa durée de vie
    setTimeout(() => {
      setCibleActuelles(prev => {
        const updated = prev.filter(c => c.id !== id);
        if (prev.find(c => c.id === id && !c.clicked)) {
          // Cible manquée
          setTargetMissedCount(count => count + 1);
          setCombo(0);
          setScore(s => Math.max(0, s + config.missedPenalty));
        }
        return updated;
      });
    }, config.targetDuration);
  }, [config]);

  /**
   * Démarre la boucle de jeu
   */
  const demarrerJeu = useCallback(() => {
    setGameActive(true);
    setTempsRestant(60);
    setScore(0);
    setCombo(0);
    setCibleActuelles([]);
    setTargetHitCount(0);
    setTargetMissedCount(0);
    setTempsReactions([]);
    cibleIdRef.current = 0;

    // Timer
    timerIntervalRef.current = setInterval(() => {
      setTempsRestant(prev => {
        if (prev <= 1) {
          setGameActive(false);
          clearInterval(timerIntervalRef.current);
          clearInterval(gameLoopRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Boucle de génération des cibles
    let spawned = 0;
    gameLoopRef.current = setInterval(() => {
      genererCible();
      spawned++;
    }, config.spawnInterval);
  }, [config, genererCible]);

  /**
   * Arrête le jeu
   */
  const arreterJeu = useCallback(() => {
    setGameActive(false);
    clearInterval(timerIntervalRef.current);
    clearInterval(gameLoopRef.current);
  }, []);

  /**
   * Gère le clic sur une cible
   */
  const surClicCible = useCallback((cibleId, tempsClicMs) => {
    setCibleActuelles(prev => {
      const cible = prev.find(c => c.id === cibleId);
      if (!cible || cible.clicked) return prev;

      const cibleUpdated = { ...cible, clicked: true };
      
      // Enregistrer le temps de réaction
      const tempsReaction = Date.now() - cible.createdAt;
      setTempsReactions(prev => [...prev, tempsReaction]);
      setTargetHitCount(count => count + 1);

      // Calcul du score avec bonus combo
      const scoreGain = config.hitScore * (1 + combo * 0.1);
      setScore(s => s + Math.round(scoreGain));
      setCombo(c => c + 1);

      // Retirer la cible
      return prev.filter(c => c.id !== cibleId);
    });
  }, [combo, config]);

  /**
   * Calcule la précision
   */
  const calculerPrecision = useCallback(() => {
    const total = targetHitCount + targetMissedCount;
    return total === 0 ? 0 : Math.round((targetHitCount / total) * 100);
  }, [targetHitCount, targetMissedCount]);

  /**
   * Calcule le temps moyen de réaction
   */
  const calculerTempsReactionMoyen = useCallback(() => {
    if (tempsReactions.length === 0) return 0;
    const total = tempsReactions.reduce((a, b) => a + b, 0);
    return Math.round(total / tempsReactions.length);
  }, [tempsReactions]);

  return {
    tempsRestant,
    gameActive,
    score,
    combo,
    cibleActuelles,
    precision: calculerPrecision(),
    tempsReactionMoyen: calculerTempsReactionMoyen(),
    demarrerJeu,
    arreterJeu,
    surClicCible,
    targetHitCount,
    targetMissedCount
  };
};

/**
 * Hook pour gérer les sons
 */
export const useAudio = (volume) => {
  const audioContextRef = useRef(null);

  /**
   * Joue un son de succès (beep court)
   */
  const jouerSonSucces = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 800;
    gain.gain.setValueAtTime((volume / 100) * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }, [volume]);

  /**
   * Joue un son d'échec (beep grave)
   */
  const jouerSonEchec = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 300;
    gain.gain.setValueAtTime((volume / 100) * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }, [volume]);

  /**
   * Joue un son de fin (sonnerie)
   */
  const jouerSonFin = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const frequencies = [400, 600, 800];

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      gain.gain.setValueAtTime((volume / 100) * 0.2, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.2);
      
      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.2);
    });
  }, [volume]);

  // Initialiser le contexte audio à la première utilisation
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  return {
    jouerSonSucces,
    jouerSonEchec,
    jouerSonFin
  };
};
