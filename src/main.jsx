import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

/**
 * Point d'entrée de l'application Focus Reactor
 * 
 * Initialise:
 * - React Router pour la navigation
 * - Contexte global Focus Reactor
 * - Styles globaux
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
