const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest';

export async function fetchExchangeRate(from = 'INR', to = 'USD', signal) {
  const response = await fetch(`${EXCHANGE_RATE_API}/${encodeURIComponent(from)}`, { signal });
  if (!response.ok) {
    throw new Error(`Exchange-rate service returned ${response.status}`);
  }

  const data = await response.json();
  if (!data || data.result !== 'success') {
    throw new Error('Exchange-rate service returned invalid data');
  }

  const rate = data.rates?.[to];
  const updatedAt = data.time_last_update_utc;
  if (!Number.isFinite(rate) || rate <= 0 || !updatedAt) {
    throw new Error('Exchange-rate service returned invalid data');
  }

  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Exchange-rate service returned an invalid update date');
  }

  return { rate, date: date.toISOString().slice(0, 10), from, to };
}
