

import ExchangeRate from './ExchangeRate';

/**
 * Display calculated mortgage results
 * @param {Object} props
 * @param {Object} props.result - Calculation result
 * @param {number} props.result.emi - Monthly EMI
 * @param {number} props.result.totalPayment - Total amount paid
 * @param {number} props.result.totalInterest - Total interest paid
 * @param {boolean} props.result.isNRI - NRI status
 */
function ResultCard({ result }) {
 
  if (!result) {
    return null; // Don't render anything if no result
  }


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="result-card">
      <h2>Your EMI Breakdown</h2>
      
      {/* Monthly EMI - Most important metric */}
      <div className="result-highlight">
        <div className="result-label">Monthly EMI</div>
        <div className="result-value-large">
          {formatCurrency(result.emi)}
        </div>
      </div>

      {/* Other metrics */}
      <div className="result-grid">
        <div className="result-item">
          <div className="result-label">Total Payment</div>
          <div className="result-value">
            {formatCurrency(result.totalPayment)}
          </div>
        </div>

        <div className="result-item">
          <div className="result-label">Total Interest</div>
          <div className="result-value">
            {formatCurrency(result.totalInterest)}
          </div>
        </div>

        <div className="result-item">
          <div className="result-label">Interest %</div>
          <div className="result-value">
            {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING - Show ExchangeRate only for NRI */}
      {/* 🎯 INTERVIEW PATTERN: Short-circuit evaluation */}
      {result.isNRI && <ExchangeRate emi={result.emi} />}
    </div>
  );
}

export default ResultCard;


