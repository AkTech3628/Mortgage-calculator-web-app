

import { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const MortgageContext = createContext();



export function MortgageProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('mortgageHistory');
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mortgageHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history to localStorage:', error);
    }
  }, [history]);

  const addToHistory = (calculation) => {
    const newEntry = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      ...calculation
    };

    setHistory(currentHistory => [newEntry, ...currentHistory]);
  };

  const deleteFromHistory = (id) => {
    setHistory(currentHistory => currentHistory.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const value = {
    history,
    addToHistory,
    deleteFromHistory,
    clearHistory
  };

  return (
    <MortgageContext.Provider value={value}>
      {children}
    </MortgageContext.Provider>
  );
}


export function useMortgage() {
  const context = useContext(MortgageContext);
  
  if (context === undefined) {
    throw new Error('useMortgage must be used within MortgageProvider');
  }
  
  return context;
}

