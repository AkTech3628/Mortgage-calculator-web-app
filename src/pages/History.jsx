

import HistoryList from '../components/HistoryList';

function History() {
  return (
    <div className="history-page">
      <div className="container">
        <header className="page-header">
          <h1>📋 Calculation History</h1>
          <p className="subtitle">
            View and manage your past EMI calculations
          </p>
        </header>

        <div className="page-content">
         
          <HistoryList />
        </div>
      </div>
    </div>
  );
}

export default History;

