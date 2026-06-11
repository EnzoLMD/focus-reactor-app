import React from 'react';
import '../styles/components/ProgressBar.css';

/**
 * Composant ProgressBar
 * 
 * Affiche une barre de progression
 * 
 * Props:
 * - progress: 0-100
 * - label: texte du label
 */
export const ProgressBar = ({ progress, label }) => {
  return (
    <div className="progress-container">
      <label className="progress-label">{label}</label>
      <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div 
          className="progress-fill"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <span className="progress-percent" aria-live="polite">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProgressBar;
