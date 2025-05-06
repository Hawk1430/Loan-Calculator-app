import { useState, useEffect, useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
// import axios from 'axios';

// Custom hook for fetching and paginating exchange rates
const useExchangeRates = () => {
  const { currency } = useContext(CurrencyContext);
  const [allRates, setAllRates] = useState({});
  const [paginatedRates, setPaginatedRates] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Key - in production, this should be an environment variable
  const API_KEY = 'YOUR_API_KEY';

  // Fetch all exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // For demonstration purposes, we'll mock the API response
        // In production, replace this with the actual API call:
        // const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`);
        
        // Mock response with more currencies
        setTimeout(() => {
          const mockRates = {
            USD: 1,
            EUR: 0.91,
            GBP: 0.78,
            JPY: 148.67,
            INR: 83.12,
            CAD: 1.35,
            AUD: 1.51,
            CNY: 7.19,
            MXN: 16.81,
            BRL: 4.94,
            ZAR: 18.61,
            SGD: 1.33,
            CHF: 0.87,
            SEK: 10.26,
            NZD: 1.62,
            HKD: 7.81,
            NOK: 10.49,
            KRW: 1326.86,
            TRY: 30.62,
            RUB: 88.75,
            // More mock rates...
          };
          
          // Convert to array for pagination
          const ratesArray = Object.entries(mockRates).map(([code, rate]) => ({
            code,
            rate,
          }));
          
          setAllRates(ratesArray);
          setIsLoading(false);
        }, 500);
        
      } catch (err) {
        setError(err.message || 'Failed to fetch exchange rates');
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [currency]);

  // Handle pagination
  useEffect(() => {
    if (Array.isArray(allRates)) {
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setPaginatedRates(allRates.slice(startIndex, endIndex));
    }
  }, [allRates, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    allRates,
    paginatedRates,
    page,
    rowsPerPage,
    isLoading,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    total: Array.isArray(allRates) ? allRates.length : 0,
  };
};

export default useExchangeRates;