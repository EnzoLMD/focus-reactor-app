import React from 'react';
import '../styles/components/Navbar.css';
import { useFocusReactor } from '../context/FocusReactorContext';

/**
 * Composant Navbar
 * 
 * Affiche:
 * - Logo et titre
 * - Navigation vers les pages principales
 * - Bouton accès paramètres
 */
export const Navbar = ({ activeRoute }) => {
  const { basculerTheme, theme } = useFocusReactor();

  return (
    <nav className="navbar" role="navigation" aria-label="Navigation principale">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon" aria-hidden="true">⚡</span>
          <span className="logo-text">Focus Reactor</span>
        </div>

        <ul className="navbar-links" role="list">
          <li>
            <a 
              href="/" 
              className={`nav-link ${activeRoute === 'home' ? 'active' : ''}`}
              aria-current={activeRoute === 'home' ? 'page' : undefined}
            >
              Accueil
            </a>
          </li>
          <li>
            <a 
              href="/stats" 
              className={`nav-link ${activeRoute === 'stats' ? 'active' : ''}`}
              aria-current={activeRoute === 'stats' ? 'page' : undefined}
            >
              Statistiques
            </a>
          </li>
          <li>
            <a 
              href="/settings" 
              className={`nav-link ${activeRoute === 'settings' ? 'active' : ''}`}
              aria-current={activeRoute === 'settings' ? 'page' : undefined}
            >
              Paramètres
            </a>
          </li>
        </ul>

        <button 
          className="theme-toggle"
          onClick={basculerTheme}
          aria-label={`Basculer vers thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
          title={`Thème: ${theme}`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
