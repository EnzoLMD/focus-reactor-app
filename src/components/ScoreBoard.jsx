import React from 'react';
import '../styles/components/ScoreBoard.css';

/**
 * Composant ScoreBoard
 * 
 * Affiche:
 * - Score actuel
 * - Combo actuel
 * - Précision en direct
 */
export const ScoreBoard = ({ score, combo, precision }) => {
  return (
    <div className="scoreboard" role="region" aria-label="Tableau de bord du jeu">
      <div className="score-item">
        <div className="score-label">Score</div>
        <div className="score-value" aria-live="polite" aria-atomic="true">
          {score}
        </div>
      </div>

      <div className="score-item">
        <div className="score-label">Combo</div>
        <div className="score-value combo-value" aria-live="polite" aria-atomic="true">
          {combo}x
        </div>
      </div>

      <div className="score-item">
        <div className="score-label">Précision</div>
        <div className="score-value precision-value" aria-live="polite" aria-atomic="true">
          {precision}%
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
