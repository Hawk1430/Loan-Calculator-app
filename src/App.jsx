import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import { CurrencyContextProvider } from './context/CurrencyContext';

function App() {
  return (
    <ThemeContextProvider>
      <CurrencyContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/error-demo" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </CurrencyContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
