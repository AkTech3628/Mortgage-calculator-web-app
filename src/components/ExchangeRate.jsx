
import { useState, useEffect } from 'react';
import { fetchExchangeRate } from '../services/exchangeRate';

/**
 * Display EMI in foreign currency for NRI users
 * @param {Object} props
 * @param {number} props.emi - Monthly EMI in INR
 */
function ExchangeRate({ emi }) {
  const [exchange, setExchange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRate() {
      try {
        setLoading(true);
        setError(null);
        const latestExchange = await fetchExchangeRate('INR', 'USD', controller.signal);
        setExchange(latestExchange);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRate();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="exchange-rate loading" role="status">
        <p>Fetching the latest exchange rate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exchange-rate error" role="alert">
        <p>Exchange rate unavailable: {error}</p>
        <p className="conversion-note">Your INR EMI is still available above.</p>
      </div>
    );
  }

  const emiInUSD = (emi * exchange.rate).toFixed(2);

  return (
    <div className="exchange-rate">
      <h3>💱 NRI Currency Conversion</h3>
      <div className="conversion-info">
        <p className="conversion-label">Your Monthly EMI in USD:</p>
        <p className="conversion-value">${emiInUSD}</p>
        <p className="conversion-rate">
          ₹1 = ${exchange.rate.toFixed(6)} · Rate date: {exchange.date}
        </p>
      </div>
      <p className="conversion-note">
        Indicative conversion using the latest available market rate; your lender’s rate may differ.
      </p>
    </div>
  );
}

export default ExchangeRate;
