import React, { useState } from 'react';
import { gestionUtilisateurCss } from '../styles/gestionUtilisateurStyle.jsx';

const COLORS = { green: '#28A745' };

const GestionUtilisateurs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', date: '23 mai 2024', status: 'actif' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', date: '15 avril 2024', status: 'actif' },
    { id: 3, name: 'Robert Johnson', email: 'robertj@example.com', date: '1 mars 2024', status: 'bloque' }
  ];

  const filtered = users.filter(u => 
    (statusFilter === 'all' || u.status === statusFilter) &&
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><i className="fa-solid fa-trash"></i><span className="d-none d-sm-inline">Supprimer</span></button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><i className="fa-solid fa-ban"></i><span className="d-none d-sm-inline">Bloquer</span></button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><i className="fa-solid fa-unlock"></i><span className="d-none d-sm-inline">Débloquer</span></button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><i className="fa-solid fa-unlock"></i><span className="d-none d-sm-inline">Archiver</span></button>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2"><i className="fa-solid fa-unlock"></i><span className="d-none d-sm-inline">Désarciver</span></button>
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
                <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
                  <th style={{ width: 50 }}><input type="checkbox" className="form-check-input" /></th>
                  <th>Nom</th>
                  <th className="d-none d-md-table-cell">Email</th>
                  <th className="d-none d-lg-table-cell">Date d'inscription</th>
                  <th>Statut</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td className="fw-semibold">{u.name}</td>
                    <td className="text-muted d-none d-md-table-cell">{u.email}</td>
                    <td className="text-muted d-none d-lg-table-cell">{u.date}</td>
                    <td>{getStatusBadge(u.status)}</td>
                    <td className="text-end"><button className="btn btn-sm btn-link"><i className="fa-solid fa-ellipsis-vertical"></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
