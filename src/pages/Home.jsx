import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFocusReactor } from '../context/FocusReactorContext';
import Navbar from '../components/Navbar';
import '../styles/pages/Home.css';

/**
 * Page Accueil
 * 
 * Contenu:
 * - Logo/titre
 * - Présentation du jeu
 * - Sélection du profil
 * - Bouton Commencer
 */
export const Home = () => {
  const navigate = useNavigate();
  const { setProfil, profil } = useFocusReactor();
  const [selectedProfile, setSelectedProfile] = useState(profil);

  const handleStart = () => {
    setProfil(selectedProfile);
    navigate('/game');
  };

  return (
    <>
      <Navbar activeRoute="home" />
      <main className="home-page">
        <div className="container">
          {/* Hero Section */}
          <section className="hero" aria-labelledby="hero-title">
            <h1 id="hero-title" className="hero-title">
              <span className="title-icon" aria-hidden="true">⚡</span>
              Focus Reactor
            </h1>
            <p className="hero-subtitle">
              Entraînez votre concentration et vos réflexes
            </p>
            <p className="hero-description">
              Une plateforme interactive pour mesurer votre vitesse de réaction, 
              votre précision et progresser continuellement.
            </p>
          </section>

          {/* Règles */}
          <section className="rules" aria-labelledby="rules-title">
            <h2 id="rules-title">Comment jouer ?</h2>
            <div className="rules-grid">
              <div className="rule-card">
                <div className="rule-icon" aria-hidden="true">🎯</div>
                <h3>Cliquez sur les cibles</h3>
                <p>Cliquez rapidement sur les cibles avant qu'elles ne disparaissent</p>
              </div>

              <div className="rule-card">
                <div className="rule-icon" aria-hidden="true">⏱️</div>
                <h3>60 secondes</h3>
                <p>Vous avez exactement 60 secondes pour marquer le maximum de points</p>
              </div>

              <div className="rule-card">
                <div className="rule-icon" aria-hidden="true">🔥</div>
                <h3>Combo multiplier</h3>
                <p>Chaque cible cliquée augmente votre combo pour plus de points</p>
              </div>

              <div className="rule-card">
                <div className="rule-icon" aria-hidden="true">📊</div>
                <h3>Mesurez vos progrès</h3>
                <p>Consultez votre précision, temps de réaction et statistiques</p>
              </div>
            </div>
          </section>

          {/* Sélection du profil */}
          <section className="profile-selection" aria-labelledby="profile-title">
            <h2 id="profile-title">Choisissez votre difficulté</h2>
            
            <div className="profile-cards">
              <label className={`profile-card ${selectedProfile === 'debutant' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="profile"
                  value="debutant"
                  checked={selectedProfile === 'debutant'}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="sr-only"
                />
                <div className="profile-content">
                  <h3>👶 Débutant</h3>
                  <ul className="profile-features">
                    <li>✓ Cibles plus grandes</li>
                    <li>✓ Temps de disparition long</li>
                    <li>✓ Idéal pour débuter</li>
                  </ul>
                </div>
              </label>

              <label className={`profile-card ${selectedProfile === 'expert' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="profile"
                  value="expert"
                  checked={selectedProfile === 'expert'}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="sr-only"
                />
                <div className="profile-content">
                  <h3>🚀 Expert</h3>
                  <ul className="profile-features">
                    <li>✓ Cibles petites</li>
                    <li>✓ Temps de disparition court</li>
                    <li>✓ Défi intense</li>
                  </ul>
                </div>
              </label>
            </div>
          </section>

          {/* Bouton Commencer */}
          <button 
            className="btn-start"
            onClick={handleStart}
            aria-label="Commencer le jeu avec le profil sélectionné"
          >
            Commencer <span aria-hidden="true">→</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
