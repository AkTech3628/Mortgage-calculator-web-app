

/**
 * Calculate monthly EMI and total payment details
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate (e.g., 8.5 for 8.5%)
 * @param {number} years - Loan tenure in years
 * @returns {Object} { emi, totalPayment, totalInterest }
 */
export function calculateMortgage(principal, annualRate, years) {
  // Convert inputs to proper numeric values
  const P = Number(principal);
  const rate = Number(annualRate);
  const tenure = Number(years);

  if (!Number.isFinite(P) || P <= 0) {
    throw new RangeError('Principal must be a finite number greater than 0');
  }
  if (!Number.isFinite(rate) || rate < 0) {
    throw new RangeError('Annual interest rate must be a finite, non-negative number');
  }
  if (!Number.isFinite(tenure) || tenure <= 0) {
    throw new RangeError('Loan tenure must be a finite number greater than 0');
  }

  // Edge case: If rate is 0, EMI = Principal / Total Months
  if (rate === 0) {
    const months = tenure * 12;
    const emi = P / months;
    return {
      emi: parseFloat(emi.toFixed(2)),
      totalPayment: parseFloat(P.toFixed(2)),
      totalInterest: 0
    };
  }

  // Calculate monthly interest rate (decimal)
  const r = rate / 12 / 100;
  
  // Calculate total number of months
  const n = tenure * 12;

  // EMI Formula: [P × r × (1 + r)^n] / [(1 + r)^n - 1]
  const numerator = P * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  const emi = numerator / denominator;

  // Calculate totals
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  // Return rounded values (2 decimal places for currency)
  return {
    emi: parseFloat(emi.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2))
  };
}

