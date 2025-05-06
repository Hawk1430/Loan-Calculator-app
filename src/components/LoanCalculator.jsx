import { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputAdornment,
} from '@mui/material';
import useEMICalculation from '../hooks/useEMICalculation';
import AmortizationTable from './AmortizationTable';
import CurrencySelector from './CurrencySelector';
import { CurrencyContext } from '../context/CurrencyContext';

const LoanCalculator = () => {
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emi,
    amortizationSchedule,
  } = useEMICalculation();

  const { currency, currencySymbol } = useContext(CurrencyContext);
  const [showTable, setShowTable] = useState(false);

  const handleLoanAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setLoanAmount(isNaN(value) ? 0 : value);
  };

  const handleInterestRateChange = (e) => {
    const value = parseFloat(e.target.value);
    setInterestRate(isNaN(value) ? 0 : value);
  };

  const handleLoanTermChange = (e) => {
    const value = parseInt(e.target.value);
    setLoanTerm(isNaN(value) ? 0 : value);
  };

  const handleCalculate = () => {
    setShowTable(true);
  };

  const handleResetTable = () => {
    setShowTable(false);
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Loan Calculator Dashboard
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          maxWidth: 800,
          mx: 'auto',
          borderRadius: 2,
          transition: 'all 0.3s ease',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Loan Amount"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{currencySymbol}</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              value={interestRate}
              onChange={handleInterestRateChange}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Term (Years)"
              value={loanTerm}
              onChange={handleLoanTermChange}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Years</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCalculate}
              fullWidth
              sx={{ mt: 2 }}
            >
              CALCULATE
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {emi > 0 && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Monthly EMI: {currencySymbol}
            {emi.toFixed(2)}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 800, mx: 'auto', mt: 2 }}>
            <CurrencySelector />
            
            {showTable && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleResetTable}
                sx={{ ml: 'auto' }}
              >
                RESET TABLE
              </Button>
            )}
          </Box>
        </Box>
      )}

      {showTable && amortizationSchedule.length > 0 && (
        <AmortizationTable schedule={amortizationSchedule} />
      )}
    </Box>
  );
};

export default LoanCalculator;