import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FocusReactorProvider } from './context/FocusReactorContext';

// Importation des pages
import Home from './pages/Home';
import Game from './pages/Game';
import Results from './pages/Results';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import Footer from './components/Footer';

/**
 * Composant App principal
 * 
 * Gère:
 * - La configuration de React Router
 * - Le contexte global Focus Reactor
 * - Les routes de l'application
 * - Le Footer global
 */
function App() {
  return (
    <FocusReactorProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/results" element={<Results />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Route 404 */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </FocusReactorProvider>
  );
}

export default App;
