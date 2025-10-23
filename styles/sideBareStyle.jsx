export const sideBareStyles = {
  sidebar: { width: '280px', position: 'fixed', top: 0, left: 0, height: '100vh', overflowY: 'auto', zIndex: 1000, backgroundColor: 'var(--card)', color: 'var(--text)' },
  primary: '#28A745',
  menuBtnBase: { border: 'none', padding: '12px 16px', borderRadius: '8px' },
  activeMenuBtn: { backgroundColor: '#0EA5E9', color: '#ffffff' },
  inactiveMenuBtn: { backgroundColor: 'transparent', color: 'var(--text)' }
};

export const sideBareCss = `
  .sidebare-shadow { box-shadow: 0 0 0 1px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
  .sidebare-btn:hover { opacity: 0.95; }
  [data-theme="dark"] .sidebare-shadow { box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 10px 15px -3px rgba(0,0,0,0.6), 0 4px 6px -4px rgba(0,0,0,0.6); }
  @media (max-width: 991.98px) { .sidebare-sm { font-size: 0.95rem; } }
`;
