import React, { memo } from 'react';
import '../styles/components/Target.css';

/**
 * Composant Target
 * 
 * Représente une cible à cliquer
 * 
 * Props:
 * - target: {id, x, y, size}
 * - onHit: callback quand cliquée
 * - onMiss: callback si manquée (timeout)
 */
export const Target = memo(({ target, onHit }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onHit(target.id);
  };

  // Calcul de l'animation d'apparition
  const timeAlive = Date.now() - target.createdAt;
  const progress = timeAlive / target.duration;
  const opacity = Math.max(0, 1 - progress);

  return (
    <button
      className="target"
      onClick={handleClick}
      style={{
        left: `${target.x}px`,
        top: `${target.y}px`,
        width: `${target.size}px`,
        height: `${target.size}px`,
        opacity: opacity,
      }}
      aria-label="Cible à cliquer"
      title="Cliquez pour scorer des points"
    >
      <span className="target-ripple" aria-hidden="true" />
    </button>
  );
});

Target.displayName = 'Target';

export default Target;
