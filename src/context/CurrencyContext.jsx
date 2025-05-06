import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// Create context
export const CurrencyContext = createContext({
  currency: 'USD',
  currencySymbol: '$',
  exchangeRates: {},
  setCurrency: () => {},
  isLoading: false,
  error: null,
});

// Currency provider component
export const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // Currency symbols mapping
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
    CNY: '¥',
    // Add more as needed
  };

  // Update symbol when currency changes
  useEffect(() => {
    setCurrencySymbol(currencySymbols[currency] || currency);
  }, [currency]);

  // Fetch exchange rates
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchExchangeRates = async (baseCurrency = 'USD') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
      
      console.log(response);
      setExchangeRates(response.data.conversion_rates);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch exchange rates');
      setIsLoading(false);
    }
  };
  

  // Initial fetch
  useEffect(() => {
    fetchExchangeRates(currency);
  }, [currency]);

  const value = {
    currency,
    currencySymbol,
    exchangeRates,
    setCurrency,
    isLoading,
    error,
    fetchExchangeRates,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};