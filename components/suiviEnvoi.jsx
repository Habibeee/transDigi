import React, { useState } from 'react';
import { Search, Package, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { suiviEnvoiCss } from '../styles/suiviEnvoiStyle.jsx';

const TrackingApp = () => {
  const [activeTab, setActiveTab] = useState('en-cours');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const shipments = [
    {
      id: 'MASTERJ2P4',
      date: '06/04/2024',
      status: 'en-transit',
      statusLabel: 'Transporté: Chronopost',
      progress: 60,
      origin: 'Lyon, FR',
      destination: 'Paris, FR',
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
      destination: 'Paris, FR'
    },
    {
      id: 'CIPR47H2',
      date: '',
      status: 'livre',
      statusLabel: 'Terminée',
      progress: 100,
      origin: 'Paris, FR',
      destination: 'Lyon, FR'
    }
  ];

  const filteredShipments = shipments.filter(s => 
    activeTab === 'en-cours' ? s.status !== 'livre' : s.status === 'livre'
  ).filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <style>{suiviEnvoiCss}</style>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h4 className="fw-bold mb-4">Suivi de mes envois</h4>

              {/* Search Bar */}
              <div className="position-relative mb-4">
                <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Rechercher un envoi par numéro de suivi"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '12px 12px 12px 45px' }}
                />
              </div>

              {/* Filters */}
              <div className="d-flex gap-3 mb-4 flex-wrap">
                <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle" type="button">
                    Filtrer par date <ChevronDown size={16} />
                  </button>
                </div>
                <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle" type="button">
                    Filtrer par statut <ChevronDown size={16} />
                  </button>
                </div>
                <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle" type="button">
                    Filtrer par transitaire <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'en-cours' ? 'active' : ''}`}
                    onClick={() => setActiveTab('en-cours')}
                    style={{ 
                      color: activeTab === 'en-cours' ? '#007BFF' : '#6c757d',
                      borderBottom: activeTab === 'en-cours' ? '3px solid #007BFF' : 'none',
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
                      color: activeTab === 'terminee' ? '#007BFF' : '#6c757d',
                      borderBottom: activeTab === 'terminee' ? '3px solid #007BFF' : 'none',
                      fontWeight: activeTab === 'terminee' ? '600' : '400'
                    }}
                  >
                    Terminée
                  </button>
                </li>
              </ul>

              {/* Shipments List */}
              <div className="d-flex flex-column gap-3">
                {filteredShipments.map((shipment) => (
                  <div 
                    key={shipment.id}
                    className="border rounded-3 p-3 bg-white shipment-card"
                    style={{ cursor: 'pointer', backgroundColor: selectedShipment?.id === shipment.id ? '#f0f8ff' : 'white' }}
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-start gap-3">
                        <div className="bg-light rounded-circle p-2" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={20} color="#6c757d" />
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

                {/* Map Placeholder */}
                <div className="mb-4" style={{ 
                  height: '200px', 
                  backgroundColor: '#e8d7c3', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={40} color="#8b7355" />
                </div>

                {/* History */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Historique de l'envoi</h6>
                  <div className="timeline">
                    {selectedShipment.history?.map((event, index) => (
                      <div key={index} className="timeline-item d-flex">
                        <div className="timeline-axis position-relative">
                          <span className={`timeline-dot ${index === 0 ? 'is-current' : ''}`}></span>
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
                <Package size={48} color="#dee2e6" className="mb-3" />
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
