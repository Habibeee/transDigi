import React, { useState } from 'react';
import { 
  MapPin, Wrench, Building2, Search, Bell, User, Star,
  Plane, Truck, Ship, Package, ArrowUpDown, CheckCircle
} from 'lucide-react';
import { transitaireStyles, transitaireCss } from '../styles/rechercheTransitaireStyle.jsx';

const RechercheTransitaire = () => {
  const [searchFilters, setSearchFilters] = useState({ location: '', service: '', company: '' });

  const transitaires = [
    {
      name: 'Logistique Express',
      logo: 'LE',
      logoColor: '#FFF3E0',
      location: 'Marseille, France',
      verified: true,
      rating: 4.2,
      description: "Spécialistes du fret aérien et du dédouanement avec plus de 10 ans d'expérience.",
      services: [ { icon: Plane, label: 'Fret Aérien' }, { icon: Package, label: 'Dédouanement' } ]
    },
    {
      name: 'TransGlobal',
      logo: 'TG',
      logoColor: '#F5F5DC',
      location: 'Le Havre, France',
      verified: true,
      rating: 4.9,
      description: "Solutions de fret maritime et d'entreposage à l'échelle mondiale. Partenaire de confiance pour vos importations et exportations.",
      services: [ { icon: Ship, label: 'Fret Maritime' }, { icon: Package, label: 'Entreposage' } ]
    },
    {
      name: 'Cargo Rapide',
      logo: 'CR',
      logoColor: '#E8E8E8',
      location: 'Lyon, France',
      verified: true,
      rating: 3.8,
      description: 'Experts en fret terrestre et aérien. Nous garantissons une livraison rapide et sécurisée de vos marchandises.',
      services: [ { icon: Truck, label: 'Fret Terrestre' }, { icon: Plane, label: 'Fret Aérien' } ]
    }
  ];

  const renderStars = (rating) => (
    <div className="d-flex align-items-center gap-1">
      {[1,2,3,4,5].map((star) => (
        <Star key={star} size={16} fill={star <= Math.floor(rating) ? '#FFC107' : 'none'} stroke={star <= Math.floor(rating) ? '#FFC107' : '#D1D5DB'} />
      ))}
      <span className="ms-2 text-muted small">({rating})</span>
    </div>
  );

  return (
    <div style={transitaireStyles.app}>
      <style>{transitaireCss}</style>
   

      {/* Hero Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3" style={transitaireStyles.heroTitle}>Trouvez votre transitaire</h1>
          <p className="text-muted fs-5">Recherchez des transitaires par localisation, service ou nom d'entreprise.</p>
        </div>

        {/* Search Bar */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-12 col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0"><MapPin size={20} className="text-muted" /></span>
                  <input type="text" className="form-control border-start-0" placeholder="Localisation" value={searchFilters.location} onChange={(e)=>setSearchFilters({...searchFilters, location:e.target.value})} />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0"><Wrench size={20} className="text-muted" /></span>
                  <input type="text" className="form-control border-start-0" placeholder="Service" value={searchFilters.service} onChange={(e)=>setSearchFilters({...searchFilters, service:e.target.value})} />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0"><Building2 size={20} className="text-muted" /></span>
                  <input type="text" className="form-control border-start-0" placeholder="Entreprise" value={searchFilters.company} onChange={(e)=>setSearchFilters({...searchFilters, company:e.target.value})} />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <button className="btn w-100 text-white" style={transitaireStyles.publishBtn}>
                  <Search size={20} className="me-2" /> Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="text-muted mb-0">Affichage de 1-9 sur 128 résultats</p>
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
            <ArrowUpDown size={16} /> Trier par Pertinence
          </button>
        </div>

        {/* Transitaire Cards */}
        <div className="row g-4 mb-5">
          {transitaires.map((transitaire, index) => (
            <div key={index} className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm h-100" style={transitaireStyles.cardHover}>
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded d-flex align-items-center justify-content-center fw-bold" style={{ ...transitaireStyles.companyLogo, backgroundColor: transitaire.logoColor }}>
                        {transitaire.logo}
                      </div>
                      <div>
                        <h5 className="mb-1 fw-bold">{transitaire.name}</h5>
                        <p className="text-muted small mb-0">{transitaire.location}</p>
                      </div>
                    </div>
                    {transitaire.verified && (
                      <div className="d-flex align-items-center gap-1" style={transitaireStyles.verified}>
                        <CheckCircle size={16} />
                        <span className="small">Vérifié</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted small mb-3" style={{ minHeight: '80px' }}>{transitaire.description}</p>

                  {/* Rating */}
                  <div className="mb-3">{renderStars(transitaire.rating)}</div>

                  {/* Services */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {transitaire.services.map((service, idx) => {
                      const ServiceIcon = service.icon;
                      return (
                        <span key={idx} className="badge d-flex align-items-center gap-1 py-2 px-3" style={transitaireStyles.serviceBadge}>
                          <ServiceIcon size={14} /> {service.label}
                        </span>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <button className="btn w-100 text-white" style={transitaireStyles.primaryBtn}>Demander un devis</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item"><button className="page-link">Précédent</button></li>
            <li className="page-item active"><button className="page-link" style={{ backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' }}>1</button></li>
            <li className="page-item"><button className="page-link">2</button></li>
            <li className="page-item"><button className="page-link">3</button></li>
            <li className="page-item"><button className="page-link">Suivant</button></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RechercheTransitaire;
