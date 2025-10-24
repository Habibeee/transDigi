import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, MapPin, LayoutGrid, FileText, Clock, Truck, Search as SearchIcon } from 'lucide-react';
import SideBare from './sideBare.jsx';
import { modofierProfClientCss } from '../styles/modofierProfClientStyle.jsx';

const ModofierProfClient = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    lastName: 'Doe',
    firstName: 'John',
    address: '123 Rue de la Logistique, 75001 Paris',
    phone: '+33 6 12 34 56 78',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to update profile
    console.log('Profile update payload:', form, avatarFile);
    alert('Modifications enregistrées');
  };

  const onAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(url);
  };

  const clearAvatar = () => {
    setAvatarFile(null);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview('');
    const input = document.getElementById('avatarInput');
    if (input) input.value = '';
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <style>{modofierProfClientCss}</style>
      <SideBare
        topOffset={96}
        activeId="profile"
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
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold brand-title">Modifier mon profil</h1>
              <div className="profile-avatar mx-auto" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Photo de profil" style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  'JD'
                )}
              </div>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <input id="avatarInput" type="file" accept="image/*" className="d-none" onChange={onAvatarChange} />
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => document.getElementById('avatarInput').click()}>Choisir une photo</button>
                {avatarPreview && (
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={clearAvatar}>Supprimer</button>
                )}
              </div>
            </div>

            {/* Card */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  {/* Informations personnelles */}
                  <h6 className="section-title">Informations Personnelles</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small">Nom</label>
                      <div className="input-group input-with-icon">
                        <span className="input-group-text"><User size={18} /></span>
                        <input type="text" className="form-control" value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small">Prénom</label>
                      <div className="input-group input-with-icon">
                        <span className="input-group-text"><User size={18} /></span>
                        <input type="text" className="form-control" value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small">Adresse complète</label>
                      <div className="input-group input-with-icon">
                        <span className="input-group-text"><MapPin size={18} /></span>
                        <input type="text" className="form-control" value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small">Numéro de téléphone</label>
                      <div className="input-group input-with-icon">
                        <span className="input-group-text"><Phone size={18} /></span>
                        <input type="tel" className="form-control" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small">Adresse e-mail</label>
                      <div className="input-group input-with-icon">
                        <span className="input-group-text"><Mail size={18} /></span>
                        <input type="email" className="form-control" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Sécurité */}
                  <h6 className="section-title">Sécurité</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-semibold small">Mot de passe actuel</label>
                      <div className="input-group input-with-icon">
                        <input type={showCurrent ? 'text' : 'password'} className="form-control" placeholder="Entrez votre mot de passe actuel" value={form.currentPassword} onChange={(e) => handleChange('currentPassword', e.target.value)} />
                        <button type="button" className="btn btn-light icon-toggle" onClick={() => setShowCurrent(s => !s)}>
                          {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small">Nouveau mot de passe</label>
                      <div className="input-group input-with-icon">
                        <input type={showNew ? 'text' : 'password'} className="form-control" placeholder="Entrez un nouveau mot de passe" value={form.newPassword} onChange={(e) => handleChange('newPassword', e.target.value)} />
                        <button type="button" className="btn btn-light icon-toggle" onClick={() => setShowNew(s => !s)}>
                          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small">Confirmer le nouveau mot de passe</label>
                      <div className="input-group input-with-icon">
                        <input type={showConfirm ? 'text' : 'password'} className="form-control" placeholder="Confirmez votre nouveau mot de passe" value={form.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} />
                        <button type="button" className="btn btn-light icon-toggle" onClick={() => setShowConfirm(s => !s)}>
                          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end">
                    <button type="button" className="btn btn-outline-secondary">Annuler</button>
                    <button type="submit" className="btn btn-primary brand-primary">Enregistrer les modifications</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModofierProfClient;
