import React, { useState } from 'react';
import { connexionStyles } from '../styles/connexionStyle.jsx';
import { login as apiLogin } from '../services/apiClient.js';

function Connexion() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = (v) => /^\+?\d[\d\s.-]{7,}$/.test(v);
  const validateEmailOrPhone = (v) => {
    if (!v.trim()) return 'Ce champ est obligatoire';
    if (!(isEmail(v) || isPhone(v))) return "Saisissez un e‑mail ou un numéro valide";
    return '';
  };
  const validatePassword = (v) => {
    if (!v) return 'Ce champ est obligatoire';
    if (v.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Incluez au moins 1 lettre et 1 chiffre';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const emailErr = validateEmailOrPhone(email);
    const pwdErr = validatePassword(password);
    setErrors({ email: emailErr, password: pwdErr });
    if (emailErr || pwdErr) return;
    try {
      setLoading(true);
      const data = await apiLogin(email, password);
      const token = (data?.token || data?.accessToken || '').trim();
      if (!token) {
        throw new Error(data?.message || 'Identifiants invalides');
      }
      localStorage.setItem('token', token);
      const serverRole = data?.user?.role || data?.role;
      if (serverRole === 'transitaire') {
        window.location.hash = '#/dashboard-transitaire';
      } else if (serverRole === 'admin') {
        window.location.hash = '#/dashboard-admin';
      } else {
        window.location.hash = '#/dashboard-client';
      }
    } catch (err) {
      setAuthError(err?.message || "Échec de l'authentification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-body" style={connexionStyles.section}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="p-4 p-md-5 border rounded-4" style={connexionStyles.card}>
              <div className="text-center mb-4">
                <h1 className="fw-bold mb-1">Accédez à votre espace</h1>
                <div className="text-muted">Connectez-vous à votre compte TransDigiSN</div>
              </div>

              {/* Form */}
              <form className="d-grid gap-3" onSubmit={handleSubmit}>
                <div>
                  <label className="form-label mb-1">Email ou Numéro de téléphone</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Entrez votre email ou numéro de téléphone"
                      value={email}
                      onChange={(e) => {
                        const v = e.target.value;
                        setEmail(v);
                        setErrors((er) => ({ ...er, email: validateEmailOrPhone(v) }));
                      }}
                      onBlur={() => setErrors((er) => ({ ...er, email: validateEmailOrPhone(email) }))}
                      aria-invalid={!!errors.email}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  {errors.email && (
                    <div id="emailHelp" className="text-danger small mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label className="form-label mb-1">Mot de passe</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type={showPwd ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPassword(v);
                        setErrors((er) => ({ ...er, password: validatePassword(v) }));
                      }}
                      onBlur={() => setErrors((er) => ({ ...er, password: validatePassword(password) }))}
                      aria-invalid={!!errors.password}
                      aria-describedby="pwdHelp pwdCriteria"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPwd(s => !s)}
                      aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      <i className={`bi ${showPwd ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <div id="pwdHelp" className="text-danger small mt-1">{errors.password}</div>
                  )}
                  <div id="pwdCriteria" className="text-muted small mt-1">Au moins 8 caractères, incluant 1 lettre et 1 chiffre.</div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Se souvenir de moi</label>
                    </div>
                    <a href="#/modifierModpss" className="small">Mot de passe oublié ?</a>
                  </div>
                </div>

                <div>
                  <label className="form-label mb-1">Rôle</label>
                  <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="client">Client</option>
                    <option value="transitaire">Transitaire</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-success fw-semibold py-2" disabled={loading || !!(errors.email || errors.password) || !email || !password}>
                  Se connecter
                </button>
                {authError && (
                  <div className="text-danger small">{authError}</div>
                )}

                <div className="text-center text-muted">ou</div>

                <button type="button" className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuer avec Google
                </button>

                <div className="text-center small text-muted">
                  Pas encore de compte ? <a href="#/signup">S'inscrire</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Connexion;
