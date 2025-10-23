import React, { useMemo, useState } from 'react';
import { validationCompteCss } from '../styles/validationCompteStyle.jsx';
import { Search } from 'lucide-react';

const seed = [
  { name: 'John Doe', email: 'john.doe@example.com', type: 'Client', date: '2023-10-27', avatar: '🧑' },
  { name: 'Global Shipping Inc.', email: 'contact@globalshipping.com', type: 'Transitaire', date: '2023-10-26', avatar: '🚢' },
  { name: 'Alice Smith', email: 'alice.smith@mail.com', type: 'Client', date: '2023-10-25', avatar: '👩' },
];

const BadgeType = ({ type }) => (
  <span className={`badge-type ${type === 'Client' ? 'client' : 'transitaire'}`}>{type}</span>
);

const Row = ({ item, onValidate, onRefuse }) => (
  <tr>
    <td>
      <div className="d-flex align-items-center gap-3">
        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
          <span style={{ fontSize: 18 }}>{item.avatar}</span>
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

  const data = useMemo(() => {
    let out = seed.filter(s => (filter === 'Tous' || s.type === filter) && (
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase())
    ));
    out = out.sort((a,b)=> sort==='desc' ? (b.date.localeCompare(a.date)) : (a.date.localeCompare(b.date)));
    return out;
  }, [query, filter, sort]);

  return (
    <div className="container-fluid px-3 px-md-4 py-4">
      <style>{validationCompteCss}</style>
      <h2 className="fw-bold mb-3 page-title">Comptes en Attente de Validation</h2>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
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
                    onValidate={()=>{}}
                    onRefuse={()=>{}}
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
