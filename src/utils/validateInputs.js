

/**
 * Validate mortgage input fields
 * @param {string|number} loan - Loan amount
 * @param {string|number} rate - Annual interest rate
 * @param {string|number} years - Loan tenure in years
 * @returns {Object} errors - Object with field-specific error messages
 * @returns {boolean} errors.isValid - Overall validation status
 */
export function validateInputs(loan, rate, years) {
  const errors = {};

  // Convert to numbers for validation
  const loanAmount = Number(loan);
  const interestRate = Number(rate);
  const tenure = Number(years);
  const isEmpty = value => value == null || String(value).trim() === '';

  // Validate Loan Amount
  if (isEmpty(loan)) {
    errors.loan = 'Loan amount is required';
  } else if (!Number.isFinite(loanAmount)) {
    errors.loan = 'Loan amount must be a valid number';
  } else if (loanAmount <= 0) {
    errors.loan = 'Loan amount must be greater than 0';
  } else if (loanAmount < 1000) {
    errors.loan = 'Minimum loan amount is ₹1,000';
  } else if (loanAmount > 100000000) {
    errors.loan = 'Maximum loan amount is ₹10 Crore';
  }

  // Validate Interest Rate
  if (isEmpty(rate)) {
    errors.rate = 'Interest rate is required';
  } else if (!Number.isFinite(interestRate)) {
    errors.rate = 'Interest rate must be a valid number';
  } else if (interestRate < 0) {
    errors.rate = 'Interest rate cannot be negative';
  } else if (interestRate > 30) {
    errors.rate = 'Interest rate cannot exceed 30%';
  }

  // Validate Years
  if (isEmpty(years)) {
    errors.years = 'Loan tenure is required';
  } else if (!Number.isFinite(tenure)) {
    errors.years = 'Loan tenure must be a valid number';
  } else if (tenure <= 0) {
    errors.years = 'Loan tenure must be greater than 0';
  } else if (tenure < 1) {
    errors.years = 'Minimum loan tenure is 1 year';
  } else if (!Number.isInteger(tenure)) {
    errors.years = 'Loan tenure must be a whole number of years';
  } else if (tenure > 30) {
    errors.years = 'Maximum loan tenure is 30 years';
  }

  // Add overall validity flag
  errors.isValid = Object.keys(errors).length === 0;

  return errors;
}

/**
 * Validate single field (for real-time validation)
 * @param {string} fieldName - Field to validate ('loan', 'rate', 'years')
 * @param {string|number} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export function validateField(fieldName, value) {
  const errors = validateInputs(
    fieldName === 'loan' ? value : 1000,
    fieldName === 'rate' ? value : 8,
    fieldName === 'years' ? value : 20
  );
  return errors[fieldName] || null;
}

