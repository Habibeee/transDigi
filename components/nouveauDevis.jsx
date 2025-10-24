import React, { useState } from 'react';
import { 
  Upload,
  X,
  FileText,
  Calendar,
  LayoutGrid,
  Search,
  Clock,
  Truck,
  User
} from 'lucide-react';
import SideBare from './sideBare.jsx';
import { nouveauDevisCss } from '../styles/nouveauDeviStyle.jsx';

const NouveauDevis = () => {
  const [formData, setFormData] = useState({
    transportType: 'ftl',
    description: '',
    weight: '',
    packageType: '',
    length: '',
    width: '',
    height: '',
    pickupAddress: '',
    pickupDate: '',
    deliveryAddress: '',
    deliveryDate: '',
    specialRequirements: {
      dangerous: false,
      temperature: false,
      fragile: false
    },
    notes: '',
    uploadedFile: null
  });

  const [progress] = useState(33);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      specialRequirements: {
        ...prev.specialRequirements,
        [field]: !prev.specialRequirements[field]
      }
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, uploadedFile: file }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, uploadedFile: null }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-body" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <SideBare
        topOffset={96}
        activeId="devis"
        defaultOpen={true}
        closeOnNavigate={false}
        items={[
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid },
          { id: 'recherche', label: 'Trouver un transitaire', icon: Search },
          { id: 'devis', label: 'Nouveau devis', icon: FileText },
          { id: 'historique', label: 'Historique', icon: Clock },
          { id: 'envois', label: 'Suivi des envois', icon: Truck },
          { id: 'profile', label: 'Mon profil', icon: User },
        ]}
        onNavigate={(id) => {
          switch(id){
            case 'dashboard': window.location.hash = '#/dashboard-client'; break;
            case 'recherche': window.location.hash = '#/recherche-transitaire'; break;
            case 'devis': window.location.hash = '#/nouveau-devis'; break;
            case 'historique': window.location.hash = '#/historique'; break;
            case 'envois': window.location.hash = '#/envois'; break;
            case 'profile': window.location.hash = '#/profil-client'; break;
            default: break;
          }
        }}
      />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Header */}
            <div className="mb-4">
              <h1 className="display-5 fw-bold mb-3">Nouvelle Demande de Devis</h1>
              <p className="text-muted">
                Remplissez les détails ci-dessous pour obtenir un devis pour votre expédition.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small fw-semibold">{progress}% Complété</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${progress}%`, backgroundColor: '#28A745' }}
                ></div>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Détails de l'expédition */}
                <div className="mb-5">
                  <h5 className="fw-bold mb-4 section-title">Détails de l'expédition</h5>
                  
                  {/* Type de transport */}
                

                  {/* Description */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Description de la marchandise</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="ex. Électronique, Meubles"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  {/* Dimensions Row */}
                  <div className="row g-3 mb-4 dimension-row">
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold small">Poids total (kg)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg dim-input"
                        placeholder="1000"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold small">Type d'emballage</label>
                      <select 
                        className="form-select form-select-lg dim-input"
                        value={formData.packageType}
                        onChange={(e) => handleInputChange('packageType', e.target.value)}
                      >
                        <option value="">Palettes</option>
                        <option value="cartons">Cartons</option>
                        <option value="caisses">Caisses</option>
                        <option value="containers">Containers</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold small">Longueur (cm)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg dim-input"
                        placeholder="120"
                        value={formData.length}
                        onChange={(e) => handleInputChange('length', e.target.value)}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold small">Largeur (cm)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg dim-input"
                        placeholder="100"
                        value={formData.width}
                        onChange={(e) => handleInputChange('width', e.target.value)}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold small">Hauteur (cm)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg dim-input"
                        placeholder="150"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Origine & Destination */}
                <div className="mb-5">
                  <h5 className="fw-bold mb-4 section-title">Origine & Destination</h5>
                  
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Adresse d'enlèvement</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Entrez le lieu d'enlèvement"
                        value={formData.pickupAddress}
                        onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Date d'enlèvement souhaitée</label>
                      <div className="position-relative">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          value={formData.pickupDate}
                          onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Adresse de livraison</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Entrez le lieu de livraison"
                        value={formData.deliveryAddress}
                        onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">Date de livraison souhaitée</label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        value={formData.deliveryDate}
                        onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Upload File Section */}
                <div className="mb-5">
                  <h5 className="fw-bold mb-4 section-title">Document joint</h5>
                  <p className="text-muted small mb-3">
                    Joignez un document avec les détails de votre expédition (facture, liste de colisage, etc.)
                  </p>
                  
                  {!formData.uploadedFile ? (
                    <div className="border-2 border-dashed rounded-3 p-4 text-center" style={{ borderColor: '#DEE2E6' }}>
                      <input
                        type="file"
                        id="fileUpload"
                        className="d-none"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                      />
                      <label htmlFor="fileUpload" className="cursor-pointer">
                        <div 
                          className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                          style={{ width: '60px', height: '60px', backgroundColor: '#E8F5E9' }}
                        >
                          <Upload size={30} style={{ color: '#28A745' }} />
                        </div>
                        <p className="fw-semibold mb-1">Cliquez pour télécharger un fichier</p>
                        <p className="text-muted small mb-0">PDF, DOC, XLS, JPG, PNG (Max. 10MB)</p>
                      </label>
                    </div>
                  ) : (
                    <div className="border rounded-3 p-3 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: '48px', height: '48px', backgroundColor: '#E8F5E9' }}
                        >
                          <FileText size={24} style={{ color: '#28A745' }} />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">{formData.uploadedFile.name}</p>
                          <p className="mb-0 text-muted small">
                            {(formData.uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger"
                        onClick={removeFile}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Exigences supplémentaires */}
                <div className="mb-5">
                  <h5 className="fw-bold mb-4 section-title">Exigences supplémentaires</h5>
                  
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Manutention spéciale</label>
                    <div className="d-flex gap-3 flex-wrap">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="dangerous"
                          checked={formData.specialRequirements.dangerous}
                          onChange={() => handleCheckboxChange('dangerous')}
                        />
                        <label className="form-check-label" htmlFor="dangerous">
                          Matières dangereuses
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="temperature"
                          checked={formData.specialRequirements.temperature}
                          onChange={() => handleCheckboxChange('temperature')}
                        />
                        <label className="form-check-label" htmlFor="temperature">
                          Contrôle de température
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="fragile"
                          checked={formData.specialRequirements.fragile}
                          onChange={() => handleCheckboxChange('fragile')}
                        />
                        <label className="form-check-label" htmlFor="fragile">
                          Fragile
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">
                      Notes additionnelles 
                      <span className="text-muted fw-normal ms-2">
                        <small>(Optionnel)</small>
                      </span>
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      rows="4"
                      placeholder="ex. Maçon requise à la livraison, contacter le destinataire avant l'arrivée..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end">
  
                  <button 
                    className="btn text-white"
                    style={{ backgroundColor: '#28A745' }}
                    onClick={handleSubmit}
                  >
                    Soumettre la demande
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{nouveauDevisCss}</style>
    </div>
  );
};

export default NouveauDevis;
