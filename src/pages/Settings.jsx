import React from 'react';
import { useFocusReactor } from '../context/FocusReactorContext';
import Navbar from '../components/Navbar';
import '../styles/pages/Settings.css';

/**
 * Page Paramètres
 * 
 * Fonctionnalités:
 * - Thème clair/sombre
 * - Volume audio
 * - Taille du texte
 * - Réinitialisation des données
 */
export const Settings = () => {
  const {
    theme,
    basculerTheme,
    volume,
    mettreAJourVolume,
    tailleTexte,
    mettreAJourTailleTexte,
    reinitialiserDonnees
  } = useFocusReactor();

  return (
    <>
      <Navbar activeRoute="settings" />
      <main className="settings-page">
        <div className="container settings-container">
          <h1 className="page-title">⚙️ Paramètres</h1>

          {/* Affichage */}
          <section className="settings-section" aria-labelledby="display-title">
            <h2 id="display-title" className="section-title">Affichage</h2>

            <div className="setting-item">
              <div className="setting-label-container">
                <label htmlFor="theme-toggle" className="setting-label">Thème</label>
                <span className="setting-description">Basculer entre thème clair et sombre</span>
              </div>
              <button
                id="theme-toggle"
                className="theme-button"
                onClick={basculerTheme}
                aria-label={`Basculer vers thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
              >
                <span className="theme-badge">
                  {theme === 'dark' ? '🌙 Sombre' : '☀️ Clair'}
                </span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-label-container">
                <label htmlFor="text-size" className="setting-label">Taille du texte</label>
                <span className="setting-description">Ajustez la taille pour plus de lisibilité</span>
              </div>
              <div className="setting-control">
                <input
                  id="text-size"
                  type="range"
                  min="12"
                  max="20"
                  value={tailleTexte}
                  onChange={(e) => mettreAJourTailleTexte(parseInt(e.target.value))}
                  className="slider"
                  aria-label="Taille du texte"
                />
                <span className="size-value">{tailleTexte}px</span>
              </div>
            </div>
          </section>

          {/* Audio */}
          <section className="settings-section" aria-labelledby="audio-title">
            <h2 id="audio-title" className="section-title">Audio</h2>

            <div className="setting-item">
              <div className="setting-label-container">
                <label htmlFor="volume" className="setting-label">Volume</label>
                <span className="setting-description">Contrôlez le volume des effets sonores</span>
              </div>
              <div className="setting-control">
                <span className="volume-icon" aria-hidden="true">🔊</span>
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => mettreAJourVolume(parseInt(e.target.value))}
                  className="slider"
                  aria-label="Volume audio"
                />
                <span className="volume-value">{volume}%</span>
              </div>
            </div>
          </section>

          {/* Données */}
          <section className="settings-section danger-section" aria-labelledby="data-title">
            <h2 id="data-title" className="section-title">Données</h2>

            <div className="setting-item">
              <div className="setting-label-container">
                <label className="setting-label">Réinitialiser les données</label>
                <span className="setting-description">
                  ⚠️ Cette action supprimera tous vos scores et statistiques. 
                  Cette action est irréversible.
                </span>
              </div>
              <button
                className="btn-danger"
                onClick={reinitialiserDonnees}
                aria-label="Réinitialiser toutes les données utilisateur"
              >
                🗑️ Réinitialiser
              </button>
            </div>
          </section>

          {/* À propos */}
          <section className="settings-section about-section" aria-labelledby="about-title">
            <h2 id="about-title" className="section-title">À propos</h2>

            <div className="about-content">
              <div className="about-item">
                <h3>Focus Reactor</h3>
                <p>v1.0.0 - Application d'entraînement à la concentration</p>
              </div>

              <div className="about-item">
                <h3>Certification DAWI</h3>
                <p>
                  Cette application respecte les critères de la certification DAWI:
                </p>
                <ul>
                  <li>✓ Design responsif et accessible (WCAG 2.1 AA)</li>
                  <li>✓ Architecture modulaire et maintenable</li>
                  <li>✓ Code commenté et documenté</li>
                  <li>✓ State management centralisé</li>
                  <li>✓ Persistance des données (LocalStorage)</li>
                </ul>
              </div>

              <div className="about-item">
                <h3>Cookies & Confidentialité</h3>
                <p>
                  Focus Reactor stocke uniquement vos données localement sur votre appareil 
                  via LocalStorage. Aucune donnée n'est envoyée à un serveur.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="settings-actions">
            <a href="/" className="btn-secondary">
              🏠 Retour à l'accueil
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
