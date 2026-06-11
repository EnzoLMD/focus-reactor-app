import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FocusReactorProvider } from './context/FocusReactorContext';

// Importation des pages
import Home from './pages/Home';
import Game from './pages/Game';
import Results from './pages/Results';
import Stats from './pages/Stats';
import Settings from './pages/Settings';

/**
 * Composant App principal
 * 
 * Gère:
 * - La configuration de React Router
 * - Le contexte global Focus Reactor
 * - Les routes de l'application
 */
function App() {
  return (
    <FocusReactorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/results" element={<Results />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Route 404 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </FocusReactorProvider>
  );
}

export default App;
