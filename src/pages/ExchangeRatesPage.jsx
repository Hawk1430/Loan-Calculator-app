import { Box, Container, Typography, Paper } from '@mui/material';
import ExchangeRatesTable from '../components/ExchangeRatesTable';

const ExchangeRatesPage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Live Exchange Rates
          </Typography>
          <Typography variant="body1" paragraph align="center">
            View up-to-date exchange rates for various currencies. These rates are updated regularly
            from a live exchange rate API. You can use these rates to see how your loan payments
            would convert to different currencies.
          </Typography>
        </Paper>
        
        <ExchangeRatesTable />
      </Box>
    </Container>
  );
};

export default ExchangeRatesPage;