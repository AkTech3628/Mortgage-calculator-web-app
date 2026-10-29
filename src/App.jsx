import AppRoutes from './routes/AppRoutes';
import { MortgageProvider } from './context/MortgageContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <MortgageProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </MortgageProvider>
    </ThemeProvider>
  );
}

export default App;

