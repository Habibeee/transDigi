export const modofierProfClientCss = `
  /* Brand tokens */
  :root {
    --brand-green: #28A745;
    --brand-yellow: #FFC107;
    --brand-blue: #007BFF;
    --brand-gray: #5C757D;
  }

  .brand-title {
    color: #0F172A;
  }

  .brand-primary {
    background-color: var(--brand-blue) !important;
    border-color: var(--brand-blue) !important;
  }

  .profile-avatar {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: #F1F5F9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #334155;
    margin-bottom: 8px;
  }

  .section-title {
    color: #0F172A;
    margin-bottom: 12px;
  }

  .input-with-icon .input-group-text {
    background-color: #F8FAFC;
    border-right: 0;
  }
  .input-with-icon .form-control {
    border-left: 0;
  }
  .form-control:focus, .form-select:focus {
    border-color: var(--brand-green);
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.15);
  }

  .icon-toggle {
    border-left: 0;
  }
`;
