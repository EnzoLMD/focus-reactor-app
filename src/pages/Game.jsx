import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFocusReactor } from '../context/FocusReactorContext';
import { useGameLogic, useAudio } from '../hooks/useGameLogic';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Target from '../components/Target';
import ProgressBar from '../components/ProgressBar';
import '../styles/pages/Game.css';

/**
 * Page Jeu
 * 
 * Logique interactive:
 * - Timer 60 secondes
 * - Génération aléatoire des cibles
 * - Gestion des clics
 * - Feedback immédiat avec sons et animations
 */
export const Game = () => {
  const navigate = useNavigate();
  const { 
    profil, 
    enregistrerPartie, 
    volume,
    setScore: setContextScore
  } = useFocusReactor();

  const {
    tempsRestant,
    gameActive,
    score,
    combo,
    cibleActuelles,
    precision,
    tempsReactionMoyen,
    demarrerJeu,
    arreterJeu,
    surClicCible,
    targetHitCount,
    targetMissedCount
  } = useGameLogic(profil);

  const { jouerSonSucces, jouerSonEchec, jouerSonFin } = useAudio(volume);
  const gameAreaRef = useRef(null);
  const gameStartedRef = useRef(false);

  // Démarrer le jeu au montage
  useEffect(() => {
    if (!gameStartedRef.current && profil) {
      gameStartedRef.current = true;
      demarrerJeu();
    }

    return () => {
      if (gameActive) {
        arreterJeu();
      }
    };
  }, []);

  // Terminer le jeu quand le timer arrive à 0
  useEffect(() => {
    if (tempsRestant === 0 && gameActive === false) {
      // Petit délai pour laisser les animations terminer
      const timeout = setTimeout(() => {
        jouerSonFin();
        setContextScore(score);
        
        // Enregistrer les données de la partie
        enregistrerPartie({
          scorePartie: score,
          comboPartie: combo,
          precisionPartie: precision,
          tempsReactionPartie: tempsReactionMoyen
        });

        navigate('/results', { 
          state: { 
            score,
            combo,
            precision,
            tempsReactionMoyen,
            targetHitCount,
            targetMissedCount
          } 
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [tempsRestant, gameActive, score, combo, precision, tempsReactionMoyen, targetHitCount, targetMissedCount, jouerSonFin, setContextScore, enregistrerPartie, navigate]);

  // Gestion du clic sur une cible
  const handleTargetHit = (targetId) => {
    jouerSonSucces();
    surClicCible(targetId);
  };

  // Calcul de la progression
  const totalTargets = targetHitCount + targetMissedCount;
  const progression = totalTargets > 0 ? (targetHitCount / totalTargets) * 100 : 0;

  return (
    <>
      <Navbar activeRoute="game" />
      <main className="game-page">
        <div className="game-container">
          {/* En-tête du jeu */}
          <div className="game-header">
            <Timer tempsRestant={tempsRestant} />
            <ScoreBoard score={score} combo={combo} precision={precision} />
          </div>

          {/* Zone de jeu */}
          <div 
            id="game-area"
            ref={gameAreaRef}
            className="game-area"
            role="region"
            aria-label="Zone de jeu avec cibles cliquables"
          >
            {cibleActuelles.map(target => (
              <Target
                key={target.id}
                target={target}
                onHit={handleTargetHit}
              />
            ))}

            {!gameActive && tempsRestant === 0 && (
              <div className="game-over-overlay" aria-live="polite">
                <p className="game-over-text">Partie terminée!</p>
              </div>
            )}
          </div>

          {/* Statistiques en direct */}
          <div className="game-stats">
            <ProgressBar 
              progress={progression} 
              label="Précision"
            />
            <div className="stats-detail">
              <p>Cibles cliquées: <strong>{targetHitCount}</strong></p>
              <p>Cibles manquées: <strong>{targetMissedCount}</strong></p>
              <p>Temps moyen: <strong>{tempsReactionMoyen}ms</strong></p>
            </div>
          </div>

          {/* Pause/Reprendre */}
          {!gameActive && tempsRestant > 0 && (
            <button 
              className="btn-resume"
              onClick={demarrerJeu}
              aria-label="Reprendre la partie"
            >
              Reprendre
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Game;
