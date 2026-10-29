import { useState } from 'react';
import InputField from './InputField';
import { validateInputs } from '../utils/validateInputs';

function MortgageForm({ onCalculate }) {
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [isNRI, setIsNRI] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs(loan, rate, years);
    
    if (!validationErrors.isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onCalculate({
      loan: Number(loan),
      rate: Number(rate),
      years: Number(years),
      isNRI
    });
  };

  const handleLoanChange = (e) => {
    setLoan(e.target.value);
    if (errors.loan) {
      setErrors({ ...errors, loan: null });
    }
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
    if (errors.rate) {
      setErrors({ ...errors, rate: null });
    }
  };

  const handleYearsChange = (e) => {
    setYears(e.target.value);
    if (errors.years) {
      setErrors({ ...errors, years: null });
    }
  };

  const handleNRIChange = (e) => {
    setIsNRI(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit} className="mortgage-form">
      <h2>Mortgage Calculator</h2>
      
      <InputField
        label="Loan Amount (₹)"
        name="loan"
        type="number"
        min="1000"
        max="100000000"
        step="any"
        value={loan}
        onChange={handleLoanChange}
        error={errors.loan}
        placeholder="e.g., 5000000"
      />

      <InputField
        label="Interest Rate (% per annum)"
        name="rate"
        type="number"
        min="0"
        max="30"
        step="any"
        value={rate}
        onChange={handleRateChange}
        error={errors.rate}
        placeholder="e.g., 8.5"
      />

      <InputField
        label="Loan Tenure (Years)"
        name="years"
        type="number"
        min="1"
        max="30"
        step="1"
        value={years}
        onChange={handleYearsChange}
        error={errors.years}
        placeholder="e.g., 20"
      />

      <label className={`checkbox-field${isNRI ? ' checked' : ''}`}>
        <input
          type="checkbox"
          checked={isNRI}
          onChange={handleNRIChange}
          className="checkbox"
        />
        <span className="checkbox-copy">
          <span className="checkbox-title">I am an NRI</span>
          <span className="checkbox-description">Show an estimated monthly EMI conversion to US dollars.</span>
        </span>
        <span className="checkbox-switch" aria-hidden="true" />
      </label>

      <button type="submit" className="btn-primary">
        <span>Calculate EMI</span>
        <span className="button-arrow" aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export default MortgageForm;
