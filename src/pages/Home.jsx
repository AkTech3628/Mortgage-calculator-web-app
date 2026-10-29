
import { useState } from 'react';
import MortgageForm from '../components/MortgageForm';
import ResultCard from '../components/ResultCard';
import { calculateMortgage } from '../utils/calculateMortgage';
import { useMortgage } from '../context/MortgageContext';

function Home() {
 
  const [result, setResult] = useState(null);


  const { addToHistory } = useMortgage();

  const handleCalculate = (formData) => {
    const { loan, rate, years, isNRI } = formData;
    
    // Call business logic
    const calculationResult = calculateMortgage(loan, rate, years);
    
    // Add NRI flag to result
    const fullResult = {
      ...calculationResult,
      isNRI
    };

    // Update local state (for ResultCard display)
    setResult(fullResult);

    addToHistory({
      loan,
      rate,
      years,
      ...calculationResult,
      isNRI
    });
  };

  return (
    <div className="home-page">
      <div className="container">
        <header className="page-header">
          <h1>🏡 Mortgage Calculator</h1>
          <p className="subtitle">
            Calculate your home loan EMI in seconds
          </p>
        </header>

        <div className="calculator-layout">
          {/* Left: Input Form */}
          <div className="form-section">
            <MortgageForm onCalculate={handleCalculate} />
          </div>

          {/* Right: Results Display */}
          <div className="result-section">
            <ResultCard result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

