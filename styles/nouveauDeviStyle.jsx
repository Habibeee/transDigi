export const nouveauDevisCss = `
  .card {
    border-radius: 16px !important;
  }
  .card.shadow-sm:hover {
    box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,.08) !important;
  }

  .form-control,
  .form-select {
    border-radius: 12px !important;
    padding: 12px 14px !important;
    min-height: 52px;
    color: #212529;
    background-color: #ffffff;
  }
  .form-control-lg,
  .form-select-lg {
    min-height: 56px;
    font-size: 1rem;
  }
  .form-control:focus,
  .form-select:focus {
    border-color: #28A745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  }

  .form-check-input:checked {
    background-color: #28A745;
    border-color: #28A745;
  }

  .form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .border-dashed {
    border-style: dashed !important;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .section-title {
    letter-spacing: -.01em;
  }

  .input-group .input-group-text {
    border-radius: 12px !important;
  }

  .input-group {
    display: flex;
    align-items: stretch;
    flex-wrap: nowrap !important;
    gap: 0;
  }

  .input-group .form-control,
  .input-group .input-group-text {
    height: 56px;
  }

  /* Dimension row sizing fixes */
  .dimension-row .input-group {
    width: 100%;
  }
  .dimension-row .input-group .form-control {
    flex: 1 1 auto !important;
    width: 100% !important;
    min-width: 0;
  }

  /* Dimension row bigger, pill-like controls */
  .dimension-row .form-control,
  .dimension-row .form-select,
  .dimension-row .input-group-text {
    height: 64px !important;
    min-height: 64px !important;
    border-radius: 16px !important;
    font-size: 1.05rem;
    padding: 14px 16px !important;
  }
  .dimension-row .unit-addon {
    border-radius: 16px !important;
    font-weight: 600;
  }

  /* Ensure digits are clearly visible in dimension inputs */
  .dim-input {
    color: #111827 !important;
    background-color: #ffffff !important;
    font-size: 1.05rem !important;
    font-weight: 500;
    line-height: 1.4;
    caret-color: #111827;
  }

  /* Remove number spinners for cleaner UI */
  .dim-input::-webkit-outer-spin-button,
  .dim-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .dim-input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Normalize select appearance to align with inputs */
  .dimension-row .form-select.dim-input {
    height: 64px !important;
    min-height: 64px !important;
    padding-top: 14px !important;
    padding-bottom: 14px !important;
    line-height: 1.4 !important;
    background-position: right 12px center; /* dropdown arrow position */
  }

  .progress {
    background-color: #E9ECEF;
    border-radius: 999px;
  }

  .form-control::placeholder {
    color: #9aa0a6;
    opacity: 1;
  }

  .input-group .form-control {
    position: relative;
    z-index: 1;
  }

  .unit-addon {
    background-color: #f1f3f5;
    color: #495057;
    font-weight: 600;
    white-space: nowrap;
    padding-inline: 14px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
