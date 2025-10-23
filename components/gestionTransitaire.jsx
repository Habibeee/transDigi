import React, { useMemo, useState } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { gestionTransitaireCss } from '../styles/gestionTransitaireStyle.jsx';

const COLORS = {
  primary: '#28A745',
  lightGray: '#F8F9FA',
  lightGreen: '#E8F5E9',
  danger: '#DC2626',
  lightRed: '#FEE2E2',
  quaternary: '#5C757D'
};

const StatusBadge = ({ status, type = 'transitaire' }) => {
  const configs = {
    transitaire: {
      'Actif': { bg: COLORS.lightGreen, color: COLORS.primary },
      'Bloqué': { bg: COLORS.lightRed, color: COLORS.danger },
      'Archivé': { bg: COLORS.lightGray, color: COLORS.quaternary }
    }
  };
  const cfg = (configs[type] || {})[status] || { bg: COLORS.lightGray, color: COLORS.quaternary };
  return <span className="badge px-3 py-2 fw-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color, borderRadius: '999px', fontSize: 12 }}>{status}</span>;
};

const GestionTransitaires = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Tous');
  const [sector, setSector] = useState('Tous');
  const [page, setPage] = useState(1);

  const data = [
    { name: 'TransGlobal Logistics', email: 'contact@transglobal.com', sector: 'Maritime', status: 'Actif', date: '12/03/2023' },
    { name: 'RapidCargo Inc.', email: 'info@rapidcargo.com', sector: 'Aérien', status: 'Bloqué', date: '15/04/2023' },
    { name: 'RouteMaster', email: 'support@routemaster.net', sector: 'Routier', status: 'Actif', date: '21/05/2023' },
    { name: 'SeaBreeze Shipping', email: 'contact@seabreeze.com', sector: 'Maritime', status: 'Archivé', date: '02/06/2023' }
  ];

  const filtered = useMemo(() => {
    return data.filter(r =>
      (status === 'Tous' || r.status === status) &&
      (sector === 'Tous' || r.sector === sector) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) || 
       r.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, status, sector]);

  const pageSize = 4;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container-fluid px-3 px-md-4 py-4">
      <style>{gestionTransitaireCss}</style>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">Gestion des Transitaires</h1>
        <p className="text-muted">Gérez les comptes transitaires de la plateforme</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-3 p-md-4">
          {/* Search & Filters */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input 
                  className="form-control border-start-0" 
                  placeholder="Rechercher..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </div>
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <select 
                className="form-select" 
                value={status} 
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              >
                <option>Tous</option>
                <option>Actif</option>
                <option>Bloqué</option>
                <option>Archivé</option>
              </select>
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <select 
                className="form-select" 
                value={sector} 
                onChange={(e) => { setSector(e.target.value); setPage(1); }}
              >
                <option>Tous</option>
                <option>Maritime</option>
                <option>Aérien</option>
                <option>Routier</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2 flex-wrap mb-3">
            <button className="btn btn-outline-secondary btn-sm">Bloquer</button>
            <button className="btn btn-outline-secondary btn-sm">Débloquer</button>
            <button className="btn btn-outline-secondary btn-sm">Archiver</button>
            <button className="btn btn-outline-secondary btn-sm">Suprimer</button>
            <button className="btn btn-outline-secondary btn-sm">Désarchiver</button>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead style={{ backgroundColor: COLORS.lightGray }}>
                <tr>
                  <th style={{ width: 40 }}>
                    <input type="checkbox" className="form-check-input" />
                  </th>
                  <th className="fw-semibold">Entreprise</th>
                  <th className="fw-semibold d-none d-md-table-cell">Email</th>
                  <th className="fw-semibold d-none d-lg-table-cell">Secteur</th>
                  <th className="fw-semibold">Statut</th>
                  <th className="fw-semibold d-none d-xl-table-cell">Date</th>
                  <th className="fw-semibold text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td className="fw-semibold">{r.name}</td>
                    <td className="text-muted d-none d-md-table-cell">{r.email}</td>
                    <td className="d-none d-lg-table-cell">{r.sector}</td>
                    <td><StatusBadge status={r.status} type="transitaire" /></td>
                    <td className="text-muted d-none d-xl-table-cell">{r.date}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-light">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-2">
            <small className="text-muted">
              Page {page} sur {totalPages} • {filtered.length} résultat(s)
            </small>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => Math.max(1, p - 1))}>
                    <ChevronLeft size={16} />
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item d-none d-sm-block ${page === i + 1 ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setPage(i + 1)}
                      style={page === i + 1 ? { backgroundColor: COLORS.primary, borderColor: COLORS.primary } : {}}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                    <ChevronRight size={16} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionTransitaires;
