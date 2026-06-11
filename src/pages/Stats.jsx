import React from 'react';
import { useFocusReactor } from '../context/FocusReactorContext';
import Navbar from '../components/Navbar';
import '../styles/pages/Stats.css';

/**
 * Page Statistiques
 * 
 * Affiche:
 * - Nombre total de parties
 * - Meilleur score et combo
 * - Score moyen
 * - Historique des 10 dernières parties
 */
export const Stats = () => {
  const {
    partiesJouees,
    meilleurScore,
    meilleurCombo,
    scoresMoyens,
    tempsReactionMoyen,
    historique,
    profil
  } = useFocusReactor();

  return (
    <>
      <Navbar activeRoute="stats" />
      <main className="stats-page">
        <div className="container stats-container">
          <h1 className="page-title">📊 Vos Statistiques</h1>

          {/* Résumé global */}
          <section className="summary-section" aria-labelledby="summary-title">
            <h2 id="summary-title" className="section-title">Résumé global</h2>
            
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-label">Parties jouées</div>
                <div className="summary-value">{partiesJouees}</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Meilleur score</div>
                <div className="summary-value">{meilleurScore}</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Score moyen</div>
                <div className="summary-value">{scoresMoyens}</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Meilleur combo</div>
                <div className="summary-value">{meilleurCombo}x</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Temps moyen</div>
                <div className="summary-value">{tempsReactionMoyen}ms</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Profil favori</div>
                <div className="summary-value">
                  {profil === 'debutant' ? '👶 Débutant' : '🚀 Expert'}
                </div>
              </div>
            </div>
          </section>

          {/* Historique */}
          <section className="history-section" aria-labelledby="history-title">
            <h2 id="history-title" className="section-title">
              Historique des {Math.min(10, historique.length)} dernières parties
            </h2>

            {historique.length === 0 ? (
              <div className="empty-state" aria-label="Aucune partie enregistrée">
                <p className="empty-icon" aria-hidden="true">🎮</p>
                <p className="empty-text">
                  Aucune partie enregistrée. 
                  <a href="/game"> Commencez votre première partie!</a>
                </p>
              </div>
            ) : (
              <div className="history-table-wrapper">
                <table className="history-table" role="table">
                  <thead role="rowgroup">
                    <tr role="row">
                      <th scope="col">Date</th>
                      <th scope="col">Score</th>
                      <th scope="col">Combo</th>
                      <th scope="col">Précision</th>
                      <th scope="col">Temps moyen</th>
                      <th scope="col">Profil</th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {historique.map((partie, index) => (
                      <tr key={partie.id} role="row" className={index === 0 ? 'latest' : ''}>
                        <td>{partie.date}</td>
                        <td className="score-cell">{partie.score}</td>
                        <td>{partie.combo}x</td>
                        <td>{partie.precision}%</td>
                        <td>{partie.tempsReaction}ms</td>
                        <td>
                          {partie.profil === 'debutant' ? '👶 Débutant' : '🚀 Expert'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Conseils */}
          <section className="tips-section" aria-labelledby="tips-title">
            <h2 id="tips-title" className="section-title">💡 Conseils pour progresser</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <h3>Échauffez-vous</h3>
                <p>Commencez par le mode Débutant pour vous échauffer avant de passer à Expert.</p>
              </div>

              <div className="tip-card">
                <h3>Régularité</h3>
                <p>Entraînez-vous régulièrement pour améliorer votre temps de réaction.</p>
              </div>

              <div className="tip-card">
                <h3>Analyse</h3>
                <p>Consultez vos statistiques pour identifier vos points forts et faibles.</p>
              </div>

              <div className="tip-card">
                <h3>Défi-vous</h3>
                <p>Essayez de battre votre meilleur score à chaque nouvelle partie.</p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="stats-actions">
            <a href="/game" className="btn-primary">
              🎮 Nouvelle partie
            </a>
            <a href="/" className="btn-secondary">
              🏠 Accueil
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Stats;
