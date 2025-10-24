import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Shield, 
  Users, 
  Truck, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  CheckCircle, 
  XCircle, 
  UserPlus, 
  FileText,
  Menu,
  X,
  User
} from 'lucide-react';
import { adminStyles, adminCss } from '../styles/tableauBordAdminStyle.jsx';
import SideBare from './sideBare';
import GestionUtilisateurs from './gestionUtilisateur.jsx';
import GestionTransitaire from './gestionTransitaire.jsx';
import ValidationCompte from './validationCompte.jsx';
import HistoriqueDevis from './historiqueDevis.jsx';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('apercu');
  const [section, setSection] = useState('validation');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const avatarUrl = 'https://i.pravatar.cc/64?img=12';

  const stats = [
    { label: 'Comptes en attente', value: '12', icon: Shield, bgColor: '#E3F2FD', iconColor: '#2196F3' },
    { label: 'Utilisateurs actifs', value: '1,250', icon: Users, bgColor: '#E8F5E9', iconColor: '#28A745' },
    { label: 'Transitaires vérifiés', value: '340', icon: Truck, bgColor: '#FFF3E0', iconColor: '#FF9800' },
    { label: 'Comptes bloqués', value: '15', icon: XCircle, bgColor: '#FFEBEE', iconColor: '#F44336' }
  ];

  const recentActivities = [
    { type: 'success', icon: CheckCircle, bgColor: '#E8F5E9', iconColor: '#28A745', title: "Compte de 'Transports Rapides' validé.", time: 'Il y a 2 minutes' },
    { type: 'danger', icon: XCircle, bgColor: '#FFEBEE', iconColor: '#F44336', title: "Utilisateur 'client.test@email.com' bloqué.", time: 'Il y a 15 minutes' },
    { type: 'info', icon: UserPlus, bgColor: '#E3F2FD', iconColor: '#2196F3', title: "Nouveau transitaire 'Logistique Mondiale' en attente de validation.", time: 'Il y a 1 heure' },
    { type: 'warning', icon: FileText, bgColor: '#FFF9E6', iconColor: '#FFC107', title: "Nouveau devis demandé par 'Client Express'.", time: 'Il y a 3 heures' }
  ];

  const accountsToValidate = [
    { user: 'Jean Dupont', company: 'Logistique Mondiale', date: '2023-10-26', type: 'Transitaire' },
    { user: 'Marie Claire', company: 'Import SARL', date: '2023-10-25', type: 'Client' }
  ];

  const menuItems = [
    { id: 'apercu', label: 'Aperçu', icon: LayoutGrid },
    { id: 'validation', label: 'Validation des comptes', icon: Shield },
    { id: 'utilisateurs', label: 'Utilisateurs', icon: Users },
    { id: 'transitaires', label: 'Transitaires', icon: Truck },
    { id: 'statistiques', label: 'Statistiques des devis', icon: TrendingUp }
  ];

  const isLgUp = typeof window !== 'undefined' ? window.innerWidth >= 992 : false;

  return (
    <div className="d-flex bg-body" style={adminStyles.layout}>
      <style>{adminCss}</style>

      {/* Sidebar (SideBare) */}
      <SideBare
        topOffset={96}
        activeId={section}
        items={[
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid },
          { id: 'validation', label: 'Validation des comptes', icon: Shield },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'transitaires', label: 'Transitaires', icon: Truck },
        ]}
        closeOnNavigate={false}
        defaultOpen={true}
        onNavigate={(id) => {
          setSection(id);
        }}
      />

      {/* Main Content */}
      <div className="flex-grow-1 bg-body" style={{ marginLeft: '0' }}>
        <div className="d-flex justify-content-end align-items-center gap-2 position-relative">
          <button className="btn btn-link">
            <Bell size={20} />
          </button>
          <button className="btn p-0 border-0 bg-transparent" onClick={() => setProfileMenuOpen(!profileMenuOpen)} aria-label="Ouvrir menu profil">
            <img 
              src={avatarUrl}
              alt="Profil"
              className="rounded-circle"
              style={{ width: 36, height: 36, objectFit: 'cover', border: '2px solid #e9ecef' }}
            />
          </button>
          {profileMenuOpen && (
            <div className="card shadow-sm" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1050, minWidth: '200px' }}>
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action" onClick={() => { setProfileMenuOpen(false); window.location.hash = '#/modifier-profil'; }}>
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

        {/* Stats Cards */}
        <div className="container-fluid py-4">
          {section === 'clients' ? (
            <GestionUtilisateurs />
          ) : section === 'transitaires' ? (
            <GestionTransitaire />
          ) : section === 'validation' ? (
            <ValidationCompte />
          ) : (
          <>
            <div className="row g-4 mb-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="col-12 col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="text-muted small mb-1">{stat.label}</div>
                            <div className="h2 fw-bold mb-0">{stat.value}</div>
                          </div>
                          <div 
                            className="rounded-circle p-3"
                            style={{ backgroundColor: stat.bgColor }}
                          >
                            <Icon size={24} style={{ color: stat.iconColor }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="row g-4">
              {/* Chart Section */}
              <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-4">Statistiques des devis</h5>
                    <div style={{ height: '300px', position: 'relative' }}>
                      <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#28A745" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#28A745" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 250 Q 100 200 200 180 T 400 150 T 600 100 T 800 80 L 800 300 L 0 300 Z" fill="url(#gradient)" />
                        <path d="M 0 250 Q 100 200 200 180 T 400 150 T 600 100 T 800 80" fill="none" stroke="#28A745" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="col-12 col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-4">Activité récente</h5>
                    <div className="d-flex flex-column gap-3">
                      {recentActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} className="d-flex gap-3">
                            <div 
                              className="rounded-circle p-2 flex-shrink-0"
                              style={{ backgroundColor: activity.bgColor, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Icon size={20} style={{ color: activity.iconColor }} />
                            </div>
                            <div className="flex-grow-1">
                              <div className="small">{activity.title}</div>
                              <div className="text-muted" style={{ fontSize: '12px' }}>{activity.time}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
