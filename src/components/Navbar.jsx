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
          import { Link } from 'react-router-dom';

<Link
  to="/"
  className={`nav-link ${activeRoute === 'home' ? 'active' : ''}`}
>
  Accueil
</Link>

<Link
  to="/stats"
  className={`nav-link ${activeRoute === 'stats' ? 'active' : ''}`}
>
  Statistiques
</Link>

<Link
  to="/settings"
  className={`nav-link ${activeRoute === 'settings' ? 'active' : ''}`}
>
  Paramètres
</Link>
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
