export const clientStyles = {
  layout: { minHeight: '100vh', backgroundColor: 'var(--bg)' },
  sidebar: { width: '280px', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 1000 },
  primary: '#0EA5E9',
  mainMarginLg: '280px',
  menuBtnBase: { border: 'none', padding: '12px 16px', borderRadius: '8px' },
  activeMenuBtn: { backgroundColor: '#0EA5E9', color: '#ffffff' },
  inactiveMenuBtn: { backgroundColor: 'transparent', color: 'var(--text)' },
};

export const clientCss = `
  .card { transition: transform 0.2s; }
  .btn:hover { opacity: 0.9; }
  .table-hover tbody tr:hover { background-color: #F8F9FA; }
  [data-theme="dark"] .table-hover tbody tr:hover { background-color: rgba(255,255,255,0.03); }
  @media (max-width: 991.98px) { .table { font-size: 0.875rem; } }
`;

