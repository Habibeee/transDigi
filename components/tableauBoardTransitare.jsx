import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid,
  User,
  Settings,
  HelpCircle,
  Search,
  Bell,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Archive,
  Eye,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { transitareStyles, transitareCss } from '../styles/tableauBoardTransitareStyle.jsx';
import SideBare from './sideBare';

const TransitaireDashboard = () => {
  const [activeTab, setActiveTab] = useState('en-attente');
  const [searchFilter, setSearchFilter] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeSideItem, setActiveSideItem] = useState(() => (typeof window !== 'undefined' && window.location.hash === '#/profile') ? 'profil' : 'dashboard');
  const avatarUrl = 'https://i.pravatar.cc/64?img=22';

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#/profile') setActiveSideItem('profil');
      else if (hash === '#/dashboard-transitaire') setActiveSideItem('dashboard');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const stats = [
    { label: 'Total Devis Reçus', value: '1,234' },
    { label: "Taux d'Acceptation", value: '85%' },
    { label: 'Devis en Attente', value: '12' }
  ];

  const tabs = [
    { id: 'en-attente', label: 'En attente', count: 12 },
    { id: 'en-cours', label: 'En cours', count: 5 },
    { id: 'traites', label: 'Traités', count: 128 }
  ];

  const devis = [
    { id: '#QT-00754', client: 'Global Imports Inc.', date: '2023-10-26', route: 'Shanghai, CN → Los Angeles, US', status: 'en-attente', statusLabel: 'En attente', statusColor: '#FFF3E0', statusTextColor: '#F57C00' },
    { id: '#QT-00753', client: 'Euro Exports', date: '2023-10-25', route: 'Hamburg, DE → New York, US', status: 'en-cours', statusLabel: 'En cours', statusColor: '#E3F2FD', statusTextColor: '#1976D2' },
    { id: '#QT-00752', client: 'Tech Solutions Ltd.', date: '2023-10-25', route: 'Shenzhen, CN → Rotterdam, NL', status: 'traite', statusLabel: 'Traité', statusColor: '#E8F5E9', statusTextColor: '#28A745' },
  ];

  

  const getStatusActions = (status) => {
    switch (status) {
      case 'en-attente':
        return (
          <>
            <button className="btn btn-sm btn-link text-decoration-none" style={{ color: transitareStyles.primary }} onClick={() => { window.location.hash = '#/detail-devis'; }}>
              Répondre
            </button>
          
          </>
        );
      case 'en-cours':
        return (
          <>
          <button className="btn btn-sm btn-link text-decoration-none" style={{ color: transitareStyles.primary }} onClick={() => { window.location.hash = '#/detail-devis'; }}>
              Répondre
            </button>
            
          </>
        );
      case 'traite':
        return (
          <>
             <button className="btn btn-sm btn-link text-decoration-none" style={{ color: transitareStyles.primary }} onClick={() => { window.location.hash = '#/detail-devis'; }}>
              Répondre
            </button>
            
          </>
        );
      default:
       
    }
  };

  const isLgUp = typeof window !== 'undefined' ? window.innerWidth >= 992 : false;

  return (
    <div className="d-flex bg-body" style={transitareStyles.layout}>
      <style>{transitareCss}</style>
      {/* Sidebar (SideBare) */}
      <SideBare
        topOffset={96}
        closeOnNavigate={false}
        defaultOpen={true}
        activeId={activeSideItem}
        items={[
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid },
          { id: 'profil', label: 'Mon profil', icon: User },
        ]}
        onNavigate={(id) => {
          setActiveSideItem(id);
          if (id === 'dashboard') {
            window.location.hash = '#/dashboard-transitaire';
          } else if (id === 'profil') {
            window.location.hash = '#/profile';
          }
        }}
      />

      {/* Main Content */}
      <div className="flex-grow-1 bg-body" style={{ marginLeft: '0' }}>
        <div className="d-flex justify-content-end align-items-center gap-2 position-relative">
          <button className="btn btn-link">
            <Bell size={20} />
          </button>
          <button className="btn p-0 border-0 bg-transparent" onClick={() => setProfileMenuOpen(!profileMenuOpen)} aria-label="Ouvrir menu profil">
            <img src={avatarUrl} alt="Profil" className="rounded-circle" style={{ width: 36, height: 36, objectFit: 'cover', border: '2px solid #e9ecef' }} />
          </button>
          {profileMenuOpen && (
            <div className="card shadow-sm" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1050, minWidth: '200px' }}>
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action" onClick={() => { setProfileMenuOpen(false); window.location.hash = '#/profile'; }}>
                  Modifier profil
                </button>
                <button className="list-group-item list-group-item-action" onClick={() => { setProfileMenuOpen(false); window.location.hash = '#/modifierModpss'; }}>
                  Modifier mot de passe
                </button>
                <button className="list-group-item list-group-item-action text-danger" onClick={() => { setProfileMenuOpen(false); window.location.hash = '#/connexion'; }}>
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="container-fluid px-4 py-4">
          {/* Page Title */}
          <h1 className="h2 fw-bold mb-4">Tableau de Bord des Devis</h1>

          {/* Stats Section */}
          <div className="mb-4">
            <h5 className="fw-semibold mb-3">Vue d'ensemble de l'activité</h5>
            <div className="row g-3">
              {stats.map((stat, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="text-muted small mb-2">{stat.label}</div>
                      <div className="h3 fw-bold mb-0">{stat.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devis Table */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              {/* Tabs */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 border-bottom">
                <div className="d-flex gap-2 flex-wrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`btn ${activeTab === tab.id ? 'text-white' : 'btn-light'}`}
                      style={{ backgroundColor: activeTab === tab.id ? transitareStyles.primary : undefined, border: 'none' }}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>
                <div className="input-group" style={{ maxWidth: '300px' }}>
                  <span className="input-group-text bg-white">
                    <Search size={18} />
                  </span>
                  <input type="text" className="form-control" placeholder="Filtrer par ID, client..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3">ID DEVIS</th>
                      <th className="py-3">CLIENT</th>
                      <th className="py-3">DATE</th>
                      <th className="py-3">ORIGINE/DESTINATION</th>
                      <th className="py-3">STATUT</th>
                      <th className="py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devis.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 fw-semibold">{item.id}</td>
                        <td className="py-3">{item.client}</td>
                        <td className="py-3 text-muted">{item.date}</td>
                        <td className="py-3">{item.route}</td>
                        <td className="py-3">
                          <span className="badge px-3 py-2" style={{ backgroundColor: item.statusColor, color: item.statusTextColor, fontWeight: '500' }}>
                            {item.statusLabel}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-2">{getStatusActions(item.status)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center p-3 border-top">
                <p className="text-muted small mb-0">Affichage de 1-4 sur 12</p>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className="page-item"><button className="page-link">Précédent</button></li>
                    <li className="page-item"><button className="page-link">Suivant</button></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransitaireDashboard;
