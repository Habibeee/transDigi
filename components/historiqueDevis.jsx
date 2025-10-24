import React, { useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, LayoutGrid, FileText, Clock, User, Truck, Search as SearchIcon } from 'lucide-react';
import SideBare from './sideBare.jsx';
import { historiqueDevisCss } from '../styles/historiqueDevisStyle.jsx';

const statusMeta = {
  accepte: { label: 'Accepté', className: 'badge-status success' },
  attente: { label: 'En attente', className: 'badge-status warning' },
};

const seedRows = [
  { id: '#DEV001', transitaire: 'Transports Rapides SA', date: '15/03/2023', destination: 'Port de Marseille', statut: 'accepte', total: '2,500€' },
  { id: '#DEV002', transitaire: 'Logistique Globale', date: '12/03/2023', destination: "Port d’Anvers", statut: 'attente', total: '1,800€' },
  { id: '#DEV003', transitaire: 'Mer et Ciel Cargo', date: '10/03/2023', destination: 'Port de Rotterdam', statut: 'attente', total: '3,200€' },
  { id: '#DEV005', transitaire: 'Transports Dubois', date: '02/03/2023', destination: 'Port de Valence', statut: 'accepte', total: '2,900€' },
];

const HistoriqueDevis = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('tous');
  const [type, setType] = useState('tous');
  const [destination, setDestination] = useState('tous');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let rows = seedRows;
    if (query) {
      const q = query.toLowerCase();
      rows = rows.filter(r => r.id.toLowerCase().includes(q) || r.transitaire.toLowerCase().includes(q));
    }
    if (status !== 'tous') rows = rows.filter(r => r.statut === status);
    if (destination !== 'tous') rows = rows.filter(r => r.destination === destination);
    // type and date are placeholders for future logic
    return rows;
  }, [query, status, destination]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const reset = () => {
    setQuery('');
    setStatus('tous');
    setType('tous');
    setDestination('tous');
    setDate('');
    setPage(1);
  };

  return (
    <div className="bg-body" style={{ minHeight: '100vh' }}>
      <style>{historiqueDevisCss}</style>
      <SideBare
        topOffset={96}
        activeId="historique"
        defaultOpen={true}
        closeOnNavigate={false}
        items={[
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid },
          { id: 'recherche', label: 'Trouver un transitaire', icon: SearchIcon },
          { id: 'devis', label: 'Nouveau devis', icon: FileText },
          { id: 'envois', label: 'Suivi des envois', icon: Truck },
          { id: 'historique', label: 'Historique', icon: Clock },
          { id: 'profile', label: 'Mon profil', icon: User },
        ]}
        onNavigate={(id) => {
          switch(id){
            case 'dashboard': window.location.hash = '#/dashboard-client'; break;
            case 'recherche': window.location.hash = '#/recherche-transitaire'; break;
            case 'devis': window.location.hash = '#/nouveau-devis'; break;
            case 'envois': window.location.hash = '#/envois'; break;
            case 'historique': window.location.hash = '#/historique'; break;
            case 'profile': window.location.hash = '#/profil-client'; break;
            default: break;
          }
        }}
      />
      <div className="container-fluid px-3 px-md-4 py-4">
        <h2 className="fw-bold mb-3">Mon Historique de Devis</h2>

        {/* Filter Bar */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-xl-row align-items-stretch gap-2">
              <div className="position-relative flex-grow-1">
                <Search size={18} className="text-muted" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input className="form-control ps-5" placeholder="Rechercher par transitaire ou numéro" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select className="form-select filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="tous">Statut: Tous</option>
                <option value="accepte">Accepté</option>
                <option value="attente">En attente</option>
              </select>
              <select className="form-select filter-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="tous">Type de marchandise</option>
              </select>
              <select className="form-select filter-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="tous">Destination</option>
                {Array.from(new Set(seedRows.map(r => r.destination))).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <input type="date" className="form-control filter-select" value={date} onChange={(e) => setDate(e.target.value)} />
              <div className="d-flex gap-2">
                <button className="btn btn-primary">Appliquer</button>
                <button type="button" className="btn btn-link text-decoration-none" onClick={reset}>Réinitialiser</button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0 quotes-table">
              <thead>
                <tr>
                  <th>Numéro de devis</th>
                  <th>Transitaire</th>
                  <th className="d-none d-md-table-cell">Date de la demande</th>
                  <th className="d-none d-lg-table-cell">Destination</th>
                  <th>Statut</th>
                  <th className="text-end d-none d-sm-table-cell">Montant total</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r) => (
                  <tr key={r.id}>
                    <td><a href="#" className="link-primary fw-semibold">{r.id}</a></td>
                    <td>{r.transitaire}</td>
                    <td className="d-none d-md-table-cell">{r.date}</td>
                    <td className="d-none d-lg-table-cell">{r.destination}</td>
                    <td><span className={statusMeta[r.statut].className}>{statusMeta[r.statut].label}</span></td>
                    <td className="text-end d-none d-sm-table-cell">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <small className="text-muted">Page {page} sur {totalPages}</small>
            <div className="btn-group">
              <button className="btn btn-outline-secondary" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft size={16} />
              </button>
              <button className="btn btn-outline-secondary" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueDevis;
