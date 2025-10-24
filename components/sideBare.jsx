import React, { useState, useEffect } from 'react';
import { LayoutGrid, Search, FileText, Truck, Clock, Settings, Menu, ArrowLeft } from 'lucide-react';
import { sideBareStyles, sideBareCss } from '../styles/sideBareStyle.jsx';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid },
  { id: 'recherche', label: 'Trouver un transitaire', icon: Search },
  { id: 'devis', label: 'Mes devis', icon: FileText },
  { id: 'envois', label: "Suivi des envois", icon: Truck },
  { id: 'historique', label: 'Historique', icon: Clock },
  { id: 'parametres', label: 'Paramètres', icon: Settings },
];

export default function SideBare({ activeId = 'dashboard', onNavigate, className = '', topOffset = 96, items, closeOnNavigate = true, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  // When sidebar opens, push the page content to the right; when closes, reset
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.transition = 'margin-left 0.25s ease';
      document.body.style.marginLeft = open ? '280px' : '0';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.marginLeft = '0';
      }
    };
  }, [open]);

  const handleNavigate = (id) => {
    if (onNavigate) onNavigate(id);
    if (closeOnNavigate) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <style>{sideBareCss}</style>
      {!open && (
        <button
          className="btn btn-link"
          style={{ position: 'fixed', top: topOffset, left: 12, zIndex: 2147483647, pointerEvents: 'auto', backgroundColor: '#e6f2ff', borderRadius: 8, padding: '6px 8px' }}
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={22} color={sideBareStyles.primary} />
        </button>
      )}

      {open && (
        <div
          className={`bg-white sidebare-shadow ${className}`}
          style={{
            ...sideBareStyles.sidebar,
            top: topOffset,
            height: `calc(100vh - ${topOffset}px)`,
            zIndex: 2147483647
          }}
        >
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <div className="fw-bold">Menu</div>
            <button className="btn btn-link" onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="p-3">
            {(items || menuItems).map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  className={`btn w-100 text-start d-flex align-items-center gap-3 mb-2 sidebare-btn ${isActive ? 'text-white' : 'text-dark'}`}
                  style={{ ...(isActive ? sideBareStyles.activeMenuBtn : sideBareStyles.inactiveMenuBtn), ...sideBareStyles.menuBtnBase }}
                  onClick={() => handleNavigate(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
