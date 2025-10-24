import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Package, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { suiviEnvoiCss } from '../styles/suiviEnvoiStyle.jsx';

const TrackingApp = () => {
  const [activeTab, setActiveTab] = useState('en-cours');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: 'all', carrier: 'all', dateFrom: '', dateTo: '' });
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const pathRef = useRef([]);
  const pathIndexRef = useRef(0);
  const moveTimerRef = useRef(null);

  const currentHistoryIndex = useMemo(() => {
    if (!selectedShipment?.history || selectedShipment.history.length === 0) return null;
    const history = selectedShipment.history;
    const norm = (s) => (s || '').toLowerCase();
    const labels = history.map(e => norm(e.status));

    if (norm(selectedShipment.status) === 'livre') {
      const i = labels.indexOf('livré');
      if (i !== -1) return i;
    } else {
      const preference = ['en cours de livraison', 'arrivé au centre de tri', 'colis pris en charge'];
      for (const p of preference) {
        const i = labels.indexOf(p);
        if (i !== -1) return i;
      }
    }
    return 0; // fallback: plus récent
  }, [selectedShipment]);

  const shipments = [
    {
      id: 'MASTERJ2P4',
      date: '06/04/2024',
      status: 'en-transit',
      statusLabel: 'Transporté: Chronopost',
      progress: 60,
      origin: 'Lyon, FR',
      destination: 'Paris, FR',
      originCoords: [45.764, 4.8357],
      destinationCoords: [48.8566, 2.3522],
      history: [
        { status: 'Livré', date: '01/04/2024 - 14:30', description: 'Votre colis a été livré.', location: '' },
        { status: 'En cours de livraison', date: '01/04/2024 - 09:00', description: 'Le colis est avec le livreur.', location: '' },
        { status: 'Arrivé au centre de tri', date: '31/03/2024 - 18:00', description: '', location: 'Paris, France' },
        { status: 'Colis pris en charge', date: '30/03/2024 - 15:00', description: '', location: 'Lyon, France' }
      ],
      details: {
        origin: 'Lyon, FR',
        destination: 'Paris, FR',
        poids: '2.5 kg',
        dimensions: '30x20x15 cm'
      }
    },
    {
      id: '89SC20IE7',
      date: '08/05/2024',
      status: 'en-transit',
      statusLabel: 'Transporté: Fedex',
      progress: 40,
      origin: 'Dakar, SN',
      destination: 'Paris, FR',
      originCoords: [14.7167, -17.4677],
      destinationCoords: [48.8566, 2.3522]
    },
    {
      id: 'CIPR47H2',
      date: '',
      status: 'livre',
      statusLabel: 'Terminée',
      progress: 100,
      origin: 'Paris, FR',
      destination: 'Lyon, FR',
      originCoords: [48.8566, 2.3522],
      destinationCoords: [45.764, 4.8357]
    }
  ];

  const interpolatePath = (a, b, steps = 30) => {
    if (!a || !b) return [];
    const [lat1, lng1] = a; const [lat2, lng2] = b;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push([lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t]);
    }
    return pts;
  };

  const filteredShipments = shipments
    .filter(s => (activeTab === 'en-cours' ? s.status !== 'livre' : s.status === 'livre'))
    .filter(s => s.id.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(s => {
      if (filters.status !== 'all') {
        if (filters.status === 'livre' && s.status !== 'livre') return false;
        if (filters.status === 'en-transit' && s.status !== 'en-transit') return false;
      }
      if (filters.carrier !== 'all') {
        if (!s.statusLabel.toLowerCase().includes(filters.carrier.toLowerCase())) return false;
      }
      if (filters.dateFrom) {
        const sd = s.date ? new Date(s.date.split('/').reverse().join('-')) : null;
        const from = new Date(filters.dateFrom);
        if (sd && sd < from) return false;
      }
      if (filters.dateTo) {
        const sd = s.date ? new Date(s.date.split('/').reverse().join('-')) : null;
        const to = new Date(filters.dateTo);
        if (sd && sd > to) return false;
      }
      return true;
    });

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize));
  const currentPageShipments = filteredShipments.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters, activeTab]);

  useEffect(() => {
    // Initialize or update map when a shipment is selected
    const L = window.L;
    if (!selectedShipment || !L) return;

    const path = interpolatePath(selectedShipment.originCoords, selectedShipment.destinationCoords, 40);
    pathRef.current = path;
    // derive starting index from progress
    const startIdx = Math.floor((selectedShipment.progress / 100) * (path.length - 1));
    pathIndexRef.current = Math.min(Math.max(startIdx, 0), path.length - 1);

    if (!mapRef.current) {
      mapRef.current = L.map('leafletMap').setView(path[pathIndexRef.current] || selectedShipment.originCoords || [14.7, -17.4], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView(path[pathIndexRef.current] || selectedShipment.originCoords || [14.7, -17.4], 5);
    }

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    markerRef.current = L.marker(path[pathIndexRef.current] || selectedShipment.originCoords).addTo(mapRef.current);

    // clear previous timer
    if (moveTimerRef.current) {
      clearInterval(moveTimerRef.current);
      moveTimerRef.current = null;
    }
    // simulate live movement for en-transit only
    if (selectedShipment.status === 'en-transit') {
      moveTimerRef.current = setInterval(() => {
        pathIndexRef.current = Math.min(pathIndexRef.current + 1, pathRef.current.length - 1);
        if (markerRef.current) markerRef.current.setLatLng(pathRef.current[pathIndexRef.current]);
        if (pathIndexRef.current >= pathRef.current.length - 1) {
          clearInterval(moveTimerRef.current);
          moveTimerRef.current = null;
        }
      }, 1500);
    }

    return () => {
      if (moveTimerRef.current) {
        clearInterval(moveTimerRef.current);
        moveTimerRef.current = null;
      }
    };
  }, [selectedShipment]);

  return (
    <div className="bg-body" style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <style>{suiviEnvoiCss}</style>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h4 className="fw-bold mb-4">Suivi de mes envois</h4>

              {/* Search Bar */}
              <div className="position-relative mb-4">
                <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Rechercher un envoi par numéro de suivi"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: 'var(--card)', border: 'none', padding: '12px 12px 12px 45px' }}
                />
              </div>

              {/* Filters */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-3">
                  <label className="form-label small text-muted">Statut</label>
                  <select className="form-select" value={filters.status} onChange={(e)=>setFilters(f=>({...f, status: e.target.value }))}>
                    <option value="all">Tous</option>
                    <option value="en-transit">En transit</option>
                    <option value="livre">Livré</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small text-muted">Transporteur</label>
                  <select className="form-select" value={filters.carrier} onChange={(e)=>setFilters(f=>({...f, carrier: e.target.value }))}>
                    <option value="all">Tous</option>
                    <option value="chronopost">Chronopost</option>
                    <option value="fedex">Fedex</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted">Du</label>
                  <input type="date" className="form-control" value={filters.dateFrom} onChange={(e)=>setFilters(f=>({...f, dateFrom: e.target.value }))} />
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted">Au</label>
                  <input type="date" className="form-control" value={filters.dateTo} onChange={(e)=>setFilters(f=>({...f, dateTo: e.target.value }))} />
                </div>
              </div>

              {/* Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'en-cours' ? 'active' : ''}`}
                    onClick={() => setActiveTab('en-cours')}
                    style={{ 
                      color: activeTab === 'en-cours' ? 'var(--primary)' : 'var(--muted)',
                      borderBottom: activeTab === 'en-cours' ? '3px solid var(--primary)' : 'none',
                      fontWeight: activeTab === 'en-cours' ? '600' : '400'
                    }}
                  >
                    En cours
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'terminee' ? 'active' : ''}`}
                    onClick={() => setActiveTab('terminee')}
                    style={{ 
                      color: activeTab === 'terminee' ? 'var(--primary)' : 'var(--muted)',
                      borderBottom: activeTab === 'terminee' ? '3px solid var(--primary)' : 'none',
                      fontWeight: activeTab === 'terminee' ? '600' : '400'
                    }}
                  >
                    Terminée
                  </button>
                </li>
              </ul>

              {/* Shipments List */}
              <div className="d-flex flex-column gap-3">
                {currentPageShipments.map((shipment) => (
                  <div 
                    key={shipment.id}
                    className="border rounded-3 p-3 bg-white shipment-card"
                    style={{ cursor: 'pointer', backgroundColor: selectedShipment?.id === shipment.id ? 'rgba(52, 211, 153, 0.12)' : 'var(--card)' }}
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-start gap-3">
                        <div className="bg-light rounded-circle p-2" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={20} color="var(--muted)" />
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Envoi {shipment.id}</h6>
                          <p className="text-muted small mb-2">Livraison prévue : {shipment.date}</p>
                          <span className="carrier-pill">{shipment.statusLabel}</span>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedShipment(shipment); }}>Suivre</button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="progress progress-thick rounded-pill">
                      <div className="progress-bar progress-green rounded-pill" style={{ width: `${shipment.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">Page {page} sur {totalPages}</small>
                <div className="btn-group">
                  <button className="btn btn-outline-secondary btn-sm" disabled={page === 1} onClick={()=>setPage(p=>Math.max(1, p-1))}>Précédent</button>
                  <button className="btn btn-outline-secondary btn-sm" disabled={page === totalPages} onClick={()=>setPage(p=>Math.min(totalPages, p+1))}>Suivant</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Shipment Details */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            {selectedShipment ? (
              <div className="bg-white rounded-3 shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Détails de l'envoi #{selectedShipment.id}</h5>
                  <span 
                    className="badge" 
                    style={{ 
                      backgroundColor: selectedShipment.status === 'livre' ? '#d4edda' : '#e3f2fd',
                      color: selectedShipment.status === 'livre' ? '#28A745' : '#007BFF'
                    }}
                  >
                    {selectedShipment.status === 'livre' ? 'Livré' : 'En transit'}
                  </span>
                </div>

                {/* Map */}
                <div id="leafletMap" className="mb-4" style={{ height: '240px', borderRadius: '8px', overflow: 'hidden' }} />

                {/* History */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Historique de l'envoi</h6>
                  <div className="timeline">
                    {selectedShipment.history?.map((event, index) => (
                      <div key={index} className="timeline-item d-flex">
                        <div className="timeline-axis position-relative">
                          <span className={`timeline-dot ${index === currentHistoryIndex ? 'is-current' : ''}`}></span>
                          {index < selectedShipment.history.length - 1 && (
                            <span className="timeline-line"></span>
                          )}
                        </div>
                        <div className="timeline-content">
                          <p className="fw-bold mb-1">{event.status}</p>
                          <p className="text-muted small mb-1">{event.date}</p>
                          {event.description && (
                            <p className="text-muted small mb-1">{event.description}</p>
                          )}
                          {event.location && (
                            <p className="text-muted small mb-0">{event.location}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h6 className="fw-bold mb-3">Détails supplémentaires</h6>
                  <div className="row g-3">
                    <div className="col-6">
                      <p className="text-muted small mb-1">Origine</p>
                      <p className="fw-semibold small mb-0">{selectedShipment.details?.origin || selectedShipment.origin}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Destination</p>
                      <p className="fw-semibold small mb-0">{selectedShipment.details?.destination || selectedShipment.destination}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Poids</p>
                      <p className="fw-semibold small mb-0">{selectedShipment.details?.poids || '-'}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Dimensions</p>
                      <p className="fw-semibold small mb-0">{selectedShipment.details?.dimensions || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3 shadow-sm p-4 text-center text-muted">
                <Package size={48} color="var(--border)" className="mb-3" />
                <p>Sélectionnez un envoi pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingApp;
