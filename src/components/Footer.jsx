import React from 'react';
import '../styles/components/Footer.css';

/**
 * Composant Footer
 * 
 * Affiche:
 * - Informations de l'application
 * - Copyright
 * - Liens utiles
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Focus Reactor</h3>
            <p className="footer-description">
              Entraînement interactif à la concentration et aux réflexes
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Navigation</h4>
            <nav className="footer-nav">
              <a href="/" className="footer-link">Accueil</a>
              <a href="/stats" className="footer-link">Statistiques</a>
              <a href="/settings" className="footer-link">Paramètres</a>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">À Propos</h4>
            <p className="footer-text">
              Application web moderne construite avec React, Vite et CSS pur.
              Certifiée DAWI et optimisée pour l'accessibilité.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Focus Reactor. Tous droits réservés.
          </p>
          <p className="footer-meta">
            v1.0 • React 18 + Vite • Production Ready
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
