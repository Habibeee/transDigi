import React, { useEffect, useState } from 'react';
import logo from '../src/assets/logo1.png';
import { headerStyles } from '../styles/headerStyle.jsx';

function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
    document.body.classList.toggle('theme-dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.dataset.theme = next;
    document.body.classList.toggle('theme-dark', next === 'dark');
  };
  const applyTheme = (next) => {
    if (next === theme) return;
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.dataset.theme = next;
    document.body.classList.toggle('theme-dark', next === 'dark');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top w-100 navbar-compact">
      <div className="container-fluid px-1 py-0">
        <a className="navbar-brand d-flex flex-column align-items-start gap-0" href="#/">
          <img src={logo} alt="TransDigiSN" style={headerStyles.logo} />
              {/* <strong style={{ color: '#28A745', lineHeight: 1 }}>TransdigiSN</strong> */}

        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto me-4 me-lg-5 me-xl-5 mb-2 mb-lg-0 nav-main gap-3">
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#/" style={{ color: '#0b5f8a' }}>Accueil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#/apropos" style={{ color: '#0b5f8a' }}>A propos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#/contact" style={{ color: '#0b5f8a' }}>Contact</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <a className="btn fw-semibold px-4" href="#/connexion" style={{ backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '6px' }}>Se connecter</a>
            <div className="d-flex align-items-center ms-2">
              <div className="border rounded-pill overflow-hidden d-flex" style={{ height: 38 }}>
                <button
                  type="button"
                  onClick={() => applyTheme('light')}
                  className={`px-3 d-flex align-items-center gap-2 ${theme === 'light' ? 'bg-light text-dark' : 'bg-transparent text-secondary'}`}
                  aria-label="Mode clair"
                  aria-pressed={theme === 'light'}
                >
                  <i className="bi bi-brightness-high"></i>
                </button>
                <button
                  type="button"
                  onClick={() => applyTheme('dark')}
                  className={`px-3 d-flex align-items-center gap-2 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-transparent text-secondary'}`}
                  aria-label="Mode sombre"
                  aria-pressed={theme === 'dark'}
                >
                  <i className="bi bi-moon-stars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
