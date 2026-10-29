
import { useMortgage } from '../context/MortgageContext';

function HistoryList() {
  const { history, deleteFromHistory, clearHistory } = useMortgage();

  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  /**
   * Format date timestamp
   */
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

 
  const handleDelete = (id) => {
    if (window.confirm('Delete this calculation?')) {
      deleteFromHistory(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      clearHistory();
    }
  };


   
  if (history.length === 0) {
    return (
      <div className="history-empty">
        <div className="empty-icon">📊</div>
        <h3>No History Yet</h3>
        <p>Your calculation history will appear here.</p>
        <p className="empty-hint">
          Calculate a mortgage to see it saved here!
        </p>
      </div>
    );
  }

  return (
    <div className="history-list">
      <div className="history-header">
        <h2>Calculation History</h2>
        <button 
          onClick={handleClearAll}
          className="btn-clear"
          title="Clear all history"
        >
          🗑️ Clear All
        </button>
      </div>

      <div className="history-items">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-item-header">
              <span className="history-date">
                {formatDate(item.timestamp)}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="btn-delete"
                aria-label="Delete this calculation"
              >
                ❌
              </button>
            </div>

            <div className="history-item-details">
              <div className="history-detail">
                <span className="detail-label">Loan Amount:</span>
                <span className="detail-value">
                  {formatCurrency(item.loan)}
                </span>
              </div>

              <div className="history-detail">
                <span className="detail-label">Interest Rate:</span>
                <span className="detail-value">{item.rate}%</span>
              </div>

              <div className="history-detail">
                <span className="detail-label">Tenure:</span>
                <span className="detail-value">{item.years} years</span>
              </div>

              <div className="history-detail highlight">
                <span className="detail-label">Monthly EMI:</span>
                <span className="detail-value-large">
                  {formatCurrency(item.emi)}
                </span>
              </div>

              <div className="history-detail">
                <span className="detail-label">Total Payment:</span>
                <span className="detail-value">
                  {formatCurrency(item.totalPayment)}
                </span>
              </div>

              <div className="history-detail">
                <span className="detail-label">Total Interest:</span>
                <span className="detail-value">
                  {formatCurrency(item.totalInterest)}
                </span>
              </div>

              {item.isNRI && (
                <div className="history-nri-badge">
                  💱 NRI Calculation
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;

