import React from 'react';
import '../styles/components/Timer.css';

/**
 * Composant Timer
 * 
 * Affiche le temps restant avec animation de compte à rebours
 */
export const Timer = ({ tempsRestant }) => {
  const isLow = tempsRestant <= 10;
  const isVeryLow = tempsRestant <= 3;

  return (
    <div 
      className={`timer ${isLow ? 'warning' : ''} ${isVeryLow ? 'critical' : ''}`}
      role="timer"
      aria-label={`Temps restant: ${tempsRestant} secondes`}
      aria-live="assertive"
    >
      <div className="timer-circle">
        <svg className="timer-svg" viewBox="0 0 100 100">
          <circle
            className="timer-bg"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className="timer-progress"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDashoffset: `${282.7 * (1 - tempsRestant / 60)}`
            }}
          />
        </svg>
        <div className="timer-text">
          {tempsRestant}
        </div>
      </div>
    </div>
  );
};

export default Timer;
