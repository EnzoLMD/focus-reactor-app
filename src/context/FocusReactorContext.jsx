import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Contexte Global Focus Reactor
 * 
 * Gère l'état application:
 * - Données utilisateur (profil, score, statistiques)
 * - Préférences (thème, volume, taille texte)
 * - Historique des parties
 */

const FocusReactorContext = createContext(undefined);

export const FocusReactorProvider = ({ children }) => {
  // État utilisateur
  const [profil, setProfil] = useState('debutant'); // 'debutant' ou 'expert'
  const [score, setScore] = useState(0);
  const [meilleurScore, setMeilleurScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [meilleurCombo, setMeilleurCombo] = useState(0);
  const [precision, setPrecision] = useState(0);
  const [partiesJouees, setPartiesJouees] = useState(0);
  const [scoresMoyens, setScoresMoyens] = useState(0);
  const [tempsReactionMoyen, setTempsReactionMoyen] = useState(0);
  const [historique, setHistorique] = useState([]);

  // Préférences utilisateur
  const [theme, setTheme] = useState('dark');
  const [volume, setVolume] = useState(100);
  const [tailleTexte, setTailleTexte] = useState(16);

  // Charger les données du localStorage au montage
  useEffect(() => {
    try {
      const donnees = localStorage.getItem('focusReactorData');
      if (donnees) {
        const parsed = JSON.parse(donnees);
        if (parsed.meilleurScore) setMeilleurScore(parsed.meilleurScore);
        if (parsed.meilleurCombo) setMeilleurCombo(parsed.meilleurCombo);
        if (parsed.partiesJouees) setPartiesJouees(parsed.partiesJouees);
        if (parsed.scoresMoyens) setScoresMoyens(parsed.scoresMoyens);
        if (parsed.tempsReactionMoyen) setTempsReactionMoyen(parsed.tempsReactionMoyen);
        if (parsed.historique) setHistorique(parsed.historique);
      }

      // Préférences - thème très important
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }

      const savedVolume = localStorage.getItem('volume');
      if (savedVolume) setVolume(parseInt(savedVolume));

      const savedTailleTexte = localStorage.getItem('tailleTexte');
      if (savedTailleTexte) setTailleTexte(parseInt(savedTailleTexte));
    } catch (error) {
      console.error('[v0] Erreur chargement localStorage:', error);
    }
  }, []);

  // Appliquer le thème
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Appliquer la taille du texte
  useEffect(() => {
    document.documentElement.style.fontSize = `${tailleTexte}px`;
    localStorage.setItem('tailleTexte', tailleTexte.toString());
  }, [tailleTexte]);

  /**
   * Charge les données du localStorage
   */
  const chargerDonneesLocales = useCallback(() => {
    try {
      const donnees = localStorage.getItem('focusReactorData');
      if (donnees) {
        const parsed = JSON.parse(donnees);
        if (parsed.meilleurScore) setMeilleurScore(parsed.meilleurScore);
        if (parsed.meilleurCombo) setMeilleurCombo(parsed.meilleurCombo);
        if (parsed.partiesJouees) setPartiesJouees(parsed.partiesJouees);
        if (parsed.scoresMoyens) setScoresMoyens(parsed.scoresMoyens);
        if (parsed.tempsReactionMoyen) setTempsReactionMoyen(parsed.tempsReactionMoyen);
        if (parsed.historique) setHistorique(parsed.historique);
      }

      // Préférences
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) setTheme(savedTheme);

      const savedVolume = localStorage.getItem('volume');
      if (savedVolume) setVolume(parseInt(savedVolume));

      const savedTailleTexte = localStorage.getItem('tailleTexte');
      if (savedTailleTexte) setTailleTexte(parseInt(savedTailleTexte));
    } catch (error) {
      console.error('[v0] Erreur chargement localStorage:', error);
    }
  }, []);

  /**
   * Enregistre la partie terminée
   */
  const enregistrerPartie = useCallback((donnéesPartie) => {
    const {
      scorePartie,
      comboPartie,
      precisionPartie,
      tempsReactionPartie
    } = donnéesPartie;

    // Mise à jour des meilleurs scores
    if (scorePartie > meilleurScore) {
      setMeilleurScore(scorePartie);
    }
    if (comboPartie > meilleurCombo) {
      setMeilleurCombo(comboPartie);
    }

    // Calcul des moyennes
    const nouveauNombreParties = partiesJouees + 1;
    const nouveauScoreMoyen = Math.round(
      (scoresMoyens * partiesJouees + scorePartie) / nouveauNombreParties
    );
    const nouveauTempsReactionMoyen = Math.round(
      (tempsReactionMoyen * partiesJouees + tempsReactionPartie) / nouveauNombreParties
    );

    setPartiesJouees(nouveauNombreParties);
    setScoresMoyens(nouveauScoreMoyen);
    setTempsReactionMoyen(nouveauTempsReactionMoyen);

    // Ajouter à l'historique (max 10 dernières parties)
    const nouvellePartie = {
      id: Date.now(),
      date: new Date().toLocaleDateString('fr-FR'),
      score: scorePartie,
      combo: comboPartie,
      precision: precisionPartie,
      profil: profil,
      tempsReaction: tempsReactionPartie
    };

    const nouvelHistorique = [nouvellePartie, ...historique].slice(0, 10);
    setHistorique(nouvelHistorique);

    // Sauvegarder dans localStorage
    const donneesFinales = {
      meilleurScore: scorePartie > meilleurScore ? scorePartie : meilleurScore,
      meilleurCombo: comboPartie > meilleurCombo ? comboPartie : meilleurCombo,
      partiesJouees: nouveauNombreParties,
      scoresMoyens: nouveauScoreMoyen,
      tempsReactionMoyen: nouveauTempsReactionMoyen,
      historique: nouvelHistorique
    };

    localStorage.setItem('focusReactorData', JSON.stringify(donneesFinales));
  }, [meilleurScore, meilleurCombo, partiesJouees, scoresMoyens, tempsReactionMoyen, historique, profil]);

  /**
   * Réinitialise les données utilisateur
   */
  const reinitialiserDonnees = useCallback(() => {
    if (confirm('Êtes-vous sûr ? Cette action est irréversible.')) {
      setMeilleurScore(0);
      setMeilleurCombo(0);
      setPartiesJouees(0);
      setScoresMoyens(0);
      setTempsReactionMoyen(0);
      setHistorique([]);
      localStorage.removeItem('focusReactorData');
    }
  }, []);

  /**
   * Bascule le thème
   */
  const basculerTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  /**
   * Met à jour le volume
   */
  const mettreAJourVolume = useCallback((newVolume) => {
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
  }, []);

  /**
   * Met à jour la taille du texte
   */
  const mettreAJourTailleTexte = useCallback((newTaille) => {
    setTailleTexte(newTaille);
  }, []);

  const value = {
    // État utilisateur
    profil,
    setProfil,
    score,
    setScore,
    meilleurScore,
    combo,
    setCombo,
    meilleurCombo,
    precision,
    setPrecision,
    partiesJouees,
    scoresMoyens,
    tempsReactionMoyen,
    historique,

    // Préférences
    theme,
    basculerTheme,
    volume,
    mettreAJourVolume,
    tailleTexte,
    mettreAJourTailleTexte,

    // Actions
    enregistrerPartie,
    reinitialiserDonnees,
    chargerDonneesLocales
  };

  return (
    <FocusReactorContext.Provider value={value}>
      {children}
    </FocusReactorContext.Provider>
  );
};

/**
 * Hook personnalisé pour accéder au contexte
 */
export const useFocusReactor = () => {
  const context = useContext(FocusReactorContext);
  if (!context) {
    throw new Error('useFocusReactor doit être utilisé dans FocusReactorProvider');
  }
  return context;
};
