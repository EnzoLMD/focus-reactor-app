import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFocusReactor } from '../context/FocusReactorContext';
import Navbar from '../components/Navbar';
import '../styles/pages/Results.css';

/**
 * Page Résultats
 * 
 * Affiche:
 * - Score final
 * - Meilleur score
 * - Stats détaillées (précision, temps de réaction, combo)
 * - Message personnalisé
 */
export const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meilleurScore } = useFocusReactor();

  const state = location.state || {
    score: 0,
    combo: 0,
    precision: 0,
    tempsReactionMoyen: 0,
    targetHitCount: 0,
    targetMissedCount: 0
  };

  const {
    score,
    combo,
    precision,
    tempsReactionMoyen,
    targetHitCount,
    targetMissedCount
  } = state;

  /**
   * Génère un message personnalisé selon les performances
   */
  const getPerformanceMessage = () => {
    if (precision >= 90) {
      return {
        title: '🌟 Excellent travail !',
        message: 'Vous avez une précision exceptionnelle!',
        badge: 'Expert'
      };
    } else if (precision >= 75) {
      return {
        title: '👍 Bon niveau !',
        message: 'Continuez comme ça, vous progressez bien!',
        badge: 'Compétent'
      };
    } else if (precision >= 50) {
      return {
        title: '💪 À améliorer',
        message: 'Entraînez-vous pour améliorer votre précision!',
        badge: 'En progres'
      };
    } else {
      return {
        title: '🎯 Keep trying!',
        message: 'Chaque partie vous rapproche du succès!',
        badge: 'Débutant'
      };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <>
      <Navbar activeRoute="results" />
      <main className="results-page">
        <div className="container results-container">
          {/* Message personnalisé */}
          <section className="performance-section" aria-labelledby="performance-title">
            <div className="performance-card">
              <h2 id="performance-title" className="performance-title">
                {performance.title}
              </h2>
              <p className="performance-message">{performance.message}</p>
              <span className="badge">{performance.badge}</span>
            </div>
          </section>

          {/* Scores */}
          <section className="scores-section" aria-labelledby="scores-title">
            <h2 id="scores-title" className="section-title">Vos scores</h2>
            
            <div className="scores-grid">
              <div className="score-large">
                <div className="score-label">Score actuel</div>
                <div className="score-display">{score}</div>
              </div>

              <div className="score-large">
                <div className="score-label">Meilleur score</div>
                <div className="score-display best-score">
                  {meilleurScore}
                </div>
                {score === meilleurScore && (
                  <span className="new-record" aria-label="Nouveau record!">
                    🎉 NEW RECORD 🎉
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Statistiques détaillées */}
          <section className="stats-section" aria-labelledby="stats-title">
            <h2 id="stats-title" className="section-title">Statistiques détaillées</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">🎯</div>
                <div className="stat-content">
                  <h3>Précision</h3>
                  <p className="stat-value">{precision}%</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">⚡</div>
                <div className="stat-content">
                  <h3>Meilleur Combo</h3>
                  <p className="stat-value">{combo}x</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">⏱️</div>
                <div className="stat-content">
                  <h3>Temps moyen</h3>
                  <p className="stat-value">{tempsReactionMoyen}ms</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">📊</div>
                <div className="stat-content">
                  <h3>Cibles cliquées</h3>
                  <p className="stat-value">
                    {targetHitCount}
                    <span className="stat-secondary">/ {targetHitCount + targetMissedCount}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Boutons d'action */}
          <section className="actions-section" aria-label="Actions">
            <button
              className="btn-primary"
              onClick={() => navigate('/game')}
              aria-label="Rejouer une partie"
            >
              <span aria-hidden="true">🎮</span> Rejouer
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate('/stats')}
              aria-label="Voir les statistiques complètes"
            >
              <span aria-hidden="true">📊</span> Statistiques
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate('/')}
              aria-label="Retourner à l'accueil"
            >
              <span aria-hidden="true">🏠</span> Accueil
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Results;
