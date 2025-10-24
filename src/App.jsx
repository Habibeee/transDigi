 import React, { useEffect, useState } from 'react';
import './App.css'
import Header from '../layout/header.jsx';
import Footer from '../layout/footer.jsx';
import HomeHero from '../components/index.jsx';
import SideBare from '../components/sideBare.jsx';
import { LayoutGrid, Search, FileText, Clock, Truck, User } from 'lucide-react';
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
import ModofierProfClient from '../components/modofierProfClient.jsx';
import DetailDevis from '../components/detailDevis.jsx';
import NouveauDevis from '../components/nouveauDevis.jsx';
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

  const isClientRoute = ['#/dashboard-client','#/recherche-transitaire','#/nouveau-devis','#/historique','#/profil-client','#/envois'].includes(route);

  const clientActiveId = (() => {
    switch(route){
      case '#/dashboard-client': return 'dashboard';
      case '#/recherche-transitaire': return 'recherche';
      case '#/nouveau-devis': return 'devis';
      case '#/historique': return 'historique';
      case '#/envois': return 'envois';
      case '#/profil-client': return 'profile';
      default: return 'dashboard';
    }
  })();

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
        return <HistoriqueDevis />;
      case '#/envois':
        return <ClientDashboard />;
      case '#/detail-devis':
        return <DetailDevis />;
      case '#/nouveau-devis':
        return <NouveauDevis />;
      case '#/connexion':
        return <Connexion />;
      case '#/modifierModpss':
        return <ModifierModpss />;
      case '#/contact':
        return <Contact />;
      case '#/profile':
        return <ProfilTransitaire />;
      case '#/profil-client':
        return <ModofierProfClient />;
      case '#/apropos':
        return <Apropos />;
      case '#/':
      default:
        return <HomeHero />;
    }
  };

  if (isClientRoute) {
    return (
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <style>{themeCss}</style>
        <SideBare
          topOffset={96}
          activeId={clientActiveId}
          defaultOpen={true}
          closeOnNavigate={false}
          items={[
            { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid },
            { id: 'recherche', label: 'Trouver un transitaire', icon: Search },
            { id: 'devis', label: 'Nouveau devis', icon: FileText },
            { id: 'historique', label: 'Historique', icon: Clock },
            { id: 'envois', label: 'Suivi des envois', icon: Truck },
            { id: 'profile', label: 'Mon profil', icon: User },
          ]}
          onNavigate={(id) => {
            switch(id){
              case 'dashboard': window.location.hash = '#/dashboard-client'; break;
              case 'recherche': window.location.hash = '#/recherche-transitaire'; break;
              case 'devis': window.location.hash = '#/nouveau-devis'; break;
              case 'historique': window.location.hash = '#/historique'; break;
              case 'envois': window.location.hash = '#/envois'; break;
              case 'profile': window.location.hash = '#/profil-client'; break;
              default: break;
            }
          }}
        />
        <div className="flex-grow-1">
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
      </div>
    );
  }

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
