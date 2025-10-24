import React, { useMemo, useState } from 'react';
import { validationCompteCss } from '../styles/validationCompteStyle.jsx';
import { Search } from 'lucide-react';

const seed = [
  { name: 'John Doe', email: 'john.doe@example.com', type: 'Client', date: '2023-10-27' },
  { name: 'Global Shipping Inc.', email: 'contact@globalshipping.com', type: 'Transitaire', date: '2023-10-26' },
  { name: 'Alice Smith', email: 'alice.smith@mail.com', type: 'Client', date: '2023-10-25' },
];

const getInitials = (label = '') => {
  const parts = label
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const BadgeType = ({ type }) => (
  <span className={`badge-type ${type === 'Client' ? 'client' : 'transitaire'}`}>{type}</span>
);

const Row = ({ item, onValidate, onRefuse }) => (
  <tr>
    <td>
      <div className="d-flex align-items-center gap-3">
        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, backgroundColor: '#E3F2FD', color: '#0d6efd', fontWeight: 700, fontSize: 12 }}>
          {getInitials(item.name)}
        </div>
        <div>
          <div className="fw-semibold">{item.name}</div>
          <div className="text-muted small">{item.email}</div>
        </div>
      </div>
    </td>
    <td className="align-middle"><BadgeType type={item.type} /></td>
    <td className="align-middle">{item.date}</td>
    <td className="align-middle text-nowrap">
      <button className="btn btn-success btn-sm me-2" onClick={onValidate}>Valider</button>
      <button className="btn btn-danger btn-sm" onClick={onRefuse}>Refuser</button>
    </td>
  </tr>
);

const ValidationCompte = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Tous');
  const [sort, setSort] = useState('desc');
  const [items] = useState(seed);
  const [actionMsg, setActionMsg] = useState({ text: '', type: '' });

  const data = useMemo(() => {
    let out = items.filter(s => (filter === 'Tous' || s.type === filter) && (
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase())
    ));
    out = out.sort((a,b)=> sort==='desc' ? (b.date.localeCompare(a.date)) : (a.date.localeCompare(b.date)));
    return out;
  }, [items, query, filter, sort]);

  const handleValidate = (email) => {
    const it = items.find(i => i.email === email);
    setActionMsg({ text: `${it?.name || 'Compte'} validé avec succès`, type: 'success' });
    setTimeout(() => setActionMsg({ text: '', type: '' }), 2500);
  };
  const handleRefuse = (email) => {
    const it = items.find(i => i.email === email);
    setActionMsg({ text: `${it?.name || 'Compte'} refusé`, type: 'danger' });
    setTimeout(() => setActionMsg({ text: '', type: '' }), 2500);
  };

  return (
    <div className="container-fluid px-3 px-md-4 py-4">
      <style>{validationCompteCss}</style>
      <h2 className="fw-bold mb-3 page-title">Comptes en Attente de Validation</h2>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {actionMsg.text && (
            <div className={`alert alert-${actionMsg.type} d-flex justify-content-between align-items-center`} role="alert">
              <span>{actionMsg.text}</span>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setActionMsg({ text: '', type: '' })}></button>
            </div>
          )}
          <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 toolbar mb-3">
            <div className="input-group" style={{ maxWidth: 420 }}>
              <span className="input-group-text bg-white"><Search size={18} /></span>
              <input className="form-control" placeholder="Rechercher par nom, email, société..." value={query} onChange={(e)=>setQuery(e.target.value)} />
            </div>
            <div className="ms-md-auto d-flex gap-2">
              <select className="form-select" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                <option>Tous</option>
                <option>Client</option>
                <option>Transitaire</option>
              </select>
              <select className="form-select" value={sort} onChange={(e)=>setSort(e.target.value)}>
                <option value="desc">Trier par date (récent)</option>
                <option value="asc">Trier par date (ancien)</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th>UTILISATEUR/SOCIÉTÉ</th>
                  <th>TYPE DE COMPTE</th>
                  <th className="d-none d-md-table-cell">DATE DE SOUMISSION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx)=> (
                  <Row
                    key={idx}
                    item={item}
                    onValidate={()=>handleValidate(item.email)}
                    onRefuse={()=>handleRefuse(item.email)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <small className="text-muted">Affichage de 1 à {data.length} sur {data.length} résultats</small>
            <div className="btn-group">
              <button className="btn btn-light" disabled>{'<'}</button>
              <button className="btn btn-light" disabled>{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationCompte;
