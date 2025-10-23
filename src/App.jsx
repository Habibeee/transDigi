 import React, { useEffect, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../layout/header.jsx';
import Footer from '../layout/footer.jsx';
import HomeHero from '../components/index.jsx';
import Contact from '../components/contact.jsx';
import Connexion from '../components/connexion.jsx';
import Signup from '../components/signup.jsx';
import FormClient from '../components/formClient.jsx';
import FormulaireTransitaire from '../components/formulaireTransitaire.jsx';
import RechercheTransitaire from '../components/rechercheTransitaire.jsx';
import TransitaireDashboard from '../components/tableauBoardTransitare.jsx';
import ClientDashboard from '../components/tableauBordClient.jsx';
import AdminDashboard from '../components/tableauBordAdmin.jsx';
import GestionUtilisateurs from '../components/gestionUtilisateur.jsx';
import HistoriqueDevis from '../components/historiqueDevis.jsx';
import ProfilTransitaire from '../components/profilTransitaire.jsx';
import DetailDevis from '../components/detailDevis.jsx';
import { themeCss } from '../styles/themeStyle.jsx';
import Apropos from '../components/apropos.jsx';
import ModifierModpss from '../components/modifierModpss.jsx';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const renderRoute = () => {
    switch (route) {
      case '#/signup':
        return <Signup />;
      case '#/client':
        return <FormClient />;
      case '#/transitaire':
        return <FormulaireTransitaire />;
      case '#/recherche-transitaire':
        return <RechercheTransitaire />;
      case '#/dashboard-transitaire':
        return <TransitaireDashboard />;
      case '#/dashboard-client':
        return <ClientDashboard />;
      case '#/dashboard-admin':
        return <AdminDashboard />;
      case '#/gestion-utilisateurs':
        return <GestionUtilisateurs />;
      case '#/historique':
        return <ClientDashboard />;
      case '#/detail-devis':
        return <DetailDevis />;
      case '#/connexion':
        return <Connexion />;
      case '#/modifierModpss':
        return <ModifierModpss />;
      case '#/contact':
        return <Contact />;
      case '#/profile':
        return <ProfilTransitaire />;
      case '#/apropos':
        return <Apropos />;
      case '#/':
      default:
        return <HomeHero />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <style>{themeCss}</style>
      <Header />
      <main className="flex-fill">
        {renderRoute()}
        <button
          type="button"
          className="btn btn-light border position-fixed"
          style={{ right: 16, bottom: 16, zIndex: 1050 }}
          onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
          aria-label="Basculer thème"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </main>
      <Footer />
    </div>
  )
}

export default App
