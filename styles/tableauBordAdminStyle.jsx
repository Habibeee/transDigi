export const adminStyles = {
  layout: { minHeight: '100vh', backgroundColor: '#f8f9fa' },
  sidebar: { width: '280px', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 1000 },
  logoCircle: { width: '48px', height: '48px', backgroundColor: '#28A745' },
  activeMenuBtn: { backgroundColor: '#28A745', color: '#ffffff' },
  inactiveMenuBtn: { backgroundColor: 'transparent', color: '#212529' },
  menuBtnBase: { border: 'none', padding: '12px 16px', borderRadius: '8px' },
  statIconCircle: { borderRadius: '9999px', padding: '12px' },
  topBadge: { fontSize: '10px' },
  mainContent: { },
};

export const adminCss = `
  @media (max-width: 991.98px) {
    .sidebar-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
  }
  
  .btn:hover { opacity: 0.9; }
  
  .card { transition: transform 0.2s; }
  .card:hover { transform: translateY(-2px); }
`;
