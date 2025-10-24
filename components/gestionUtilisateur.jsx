import React, { useMemo, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { gestionUtilisateurCss } from '../styles/gestionUtilisateurStyle.jsx';

const COLORS = { green: '#28A745' };

const GestionUtilisateurs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', date: '23 mai 2024', status: 'actif' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', date: '15 avril 2024', status: 'actif' },
    { id: 3, name: 'Robert Johnson', email: 'robertj@example.com', date: '1 mars 2024', status: 'bloque' }
  ]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => users.filter(u => 
    (statusFilter === 'all' || u.status === statusFilter) &&
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [users, statusFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const allVisibleSelected = rows.length > 0 && rows.every(u => selectedUsers.includes(u.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedUsers(prev => prev.filter(id => !rows.some(u => u.id === id)));
    } else {
      const ids = rows.map(u => u.id);
      setSelectedUsers(prev => Array.from(new Set([...prev, ...ids])));
    }
  };

  const rowAction = (id, type) => {
    setUsers(prev => {
      if (type === 'delete') return prev.filter(u => u.id !== id);
      return prev.map(u => {
        if (u.id !== id) return u;
        if (type === 'block') return { ...u, status: 'bloque' };
        if (type === 'unblock') return { ...u, status: 'actif' };
        if (type === 'archive') return { ...u, status: 'archive' };
        if (type === 'unarchive') return { ...u, status: 'actif' };
        return u;
      });
    });
    setOpenMenuId(null);
  };

  const toggleOne = (id) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const doAction = (type) => {
    if (selectedUsers.length === 0) return;
    setUsers(prev => {
      let next = [...prev];
      if (type === 'delete') {
        next = next.filter(u => !selectedUsers.includes(u.id));
      } else {
        next = next.map(u => {
          if (!selectedUsers.includes(u.id)) return u;
          if (type === 'block') return { ...u, status: 'bloque' };
          if (type === 'unblock') return { ...u, status: 'actif' };
          if (type === 'archive') return { ...u, status: 'archive' };
          if (type === 'unarchive') return { ...u, status: 'actif' };
          return u;
        });
      }
      return next;
    });
    // Clear selection after action
    setSelectedUsers([]);
  };

  const getStatusBadge = (status) => {
    const config = {
      actif: { bg: '#E8F5E9', color: COLORS.green, label: 'Actif' },
      bloque: { bg: '#FFEBEE', color: '#D32F2F', label: 'Bloqué' }
    };
    const c = config[status];
    return <span className="badge px-3 py-2" style={{ backgroundColor: c.bg, color: c.color }}>{c.label}</span>;
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <div className="container-fluid px-3 px-md-4 py-4">
        <h1 className="display-5 fw-bold mb-2">Gestion des Utilisateurs</h1>
        <p className="text-muted mb-4">Gérez les comptes clients de la plateforme.</p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={() => doAction('delete')} disabled={selectedUsers.length===0}><i className="fa-solid fa-trash"></i><span className="d-none d-sm-inline">Supprimer</span></button>
          <button className="btn btn-outline-warning d-flex align-items-center gap-2" onClick={() => doAction('block')} disabled={selectedUsers.length===0}><i className="fa-solid fa-ban"></i><span className="d-none d-sm-inline">Bloquer</span></button>
          <button className="btn btn-outline-success d-flex align-items-center gap-2" onClick={() => doAction('unblock')} disabled={selectedUsers.length===0}><i className="fa-solid fa-unlock"></i><span className="d-none d-sm-inline">Débloquer</span></button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={() => doAction('archive')} disabled={selectedUsers.length===0}><i className="fa-solid fa-box-archive"></i><span className="d-none d-sm-inline">Archiver</span></button>
          <button className="btn btn-outline-info d-flex align-items-center gap-2" onClick={() => doAction('unarchive')} disabled={selectedUsers.length===0}><i className="fa-solid fa-box-open"></i><span className="d-none d-sm-inline">Désarchiver</span></button>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="input-group">
                  <span className="input-group-text bg-white"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
                  <input type="text" className="form-control" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <select className="form-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="bloque">Bloqué</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th style={{ width: 50 }}><input type="checkbox" className="form-check-input" checked={allVisibleSelected} onChange={toggleSelectAll} /></th>
                  <th>Nom</th>
                  <th className="d-none d-md-table-cell">Email</th>
                  <th className="d-none d-lg-table-cell">Date d'inscription</th>
                  <th>Statut</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(u => (
                  <tr key={u.id}>
                    <td><input type="checkbox" className="form-check-input" checked={selectedUsers.includes(u.id)} onChange={() => toggleOne(u.id)} /></td>
                    <td className="fw-semibold">{u.name}</td>
                    <td className="text-muted d-none d-md-table-cell">{u.email}</td>
                    <td className="text-muted d-none d-lg-table-cell">{u.date}</td>
                    <td>{getStatusBadge(u.status)}</td>
                    <td className="text-end position-relative">
                      <button className="btn btn-sm btn-light" onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}>
                        <MoreHorizontal size={16} />
                      </button>
                      {openMenuId === u.id && (
                        <div className="card shadow-sm" style={{ position: 'absolute', right: 0, zIndex: 1050, minWidth: '180px' }}>
                          <div className="list-group list-group-flush">
                            <button className="list-group-item list-group-item-action text-warning" onClick={() => rowAction(u.id, 'block')}>Bloquer</button>
                            <button className="list-group-item list-group-item-action text-success" onClick={() => rowAction(u.id, 'unblock')}>Débloquer</button>
                            <button className="list-group-item list-group-item-action text-secondary" onClick={() => rowAction(u.id, 'archive')}>Archiver</button>
                            <button className="list-group-item list-group-item-action text-info" onClick={() => rowAction(u.id, 'unarchive')}>Désarchiver</button>
                            <button className="list-group-item list-group-item-action text-danger" onClick={() => rowAction(u.id, 'delete')}>Supprimer</button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-2">
          <small className="text-muted">Page {page} sur {totalPages} • {filtered.length} résultat(s)</small>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(p => Math.max(1, p - 1))}>
                  «
                </button>
              </li>
              {Array.from({length: totalPages}).map((_, i) => (
                <li key={i} className={`page-item d-none d-sm-block ${page === i + 1 ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setPage(i + 1)}
                    style={page === i + 1 ? { backgroundColor: COLORS.green, borderColor: COLORS.green } : {}}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                  »
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <style>{`
        .form-control:focus, .form-select:focus { border-color: ${COLORS.green}; box-shadow: 0 0 0 0.2rem rgba(40,167,69,.25); }
        .form-check-input:checked { background-color: ${COLORS.green}; border-color: ${COLORS.green}; }
      `}</style>
    </div>
  );
};

export default GestionUtilisateurs;
