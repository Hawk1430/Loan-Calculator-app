import { useState, useEffect, useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import axios from 'axios';

const useExchangeRates = () => {
  const { currency } = useContext(CurrencyContext);
  const [allRates, setAllRates] = useState([]);
  const [paginatedRates, setPaginatedRates] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`
        );

        const rates = response.data.conversion_rates;

        const ratesArray = Object.entries(rates).map(([code, rate]) => ({
          code,
          rate,
        }));

        setAllRates(ratesArray);
      } catch (err) {
        setError(err.message || 'Failed to fetch exchange rates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [currency, API_KEY]);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setPaginatedRates(allRates.slice(startIndex, endIndex));
  }, [allRates, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
    total: allRates.length,
  };
};

export default useExchangeRates;
