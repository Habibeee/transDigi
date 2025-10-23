export const transitareStyles = {
  layout: { minHeight: '100vh', backgroundColor: '#F8F9FA' },
  sidebar: { width: '280px', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 1000 },
  mainMarginLg: '280px',
  primary: '#0EA5E9',
};

export const transitareCss = `
  .input-group-text { border-right: 0; }
  .form-control:focus { border-color: #0EA5E9; box-shadow: 0 0 0 0.2rem rgba(14, 165, 233, 0.25); }
  .card { transition: transform 0.2s; }
  .btn:hover { opacity: 0.9; }
  .table-hover tbody tr:hover { background-color: #F8F9FA; }
  @media (max-width: 991.98px) { .table { font-size: 0.875rem; } }
`;
