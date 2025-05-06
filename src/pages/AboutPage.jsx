import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TableChartIcon from '@mui/icons-material/TableChart';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const AboutPage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            About This Loan Calculator
          </Typography>
          <Typography variant="body1" paragraph>
            This Loan Calculator App is a modern, single-page web application built using React JS and Material UI.
            It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization
            schedule, and see real-time currency conversions of their EMI using live exchange rates.
          </Typography>
          <Typography variant="body1" paragraph>
            Use this calculator to plan your finances, understand your loan repayments, and make informed
            decisions about borrowing. The app includes a comprehensive set of tools to help you visualize
            your loan journey from start to finish.
          </Typography>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          EMI Formula Used
        </Typography>
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            The EMI (Equated Monthly Installment) is calculated using the standard formula:
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ fontStyle: 'italic', my: 2 }}>
            EMI = [P × R × (1 + R)^N] ÷ [(1 + R)^N - 1]
          </Typography>
          <Typography variant="body1" component="div">
            Where:
            <ul>
              <li>P = Principal loan amount</li>
              <li>R = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
              <li>N = Loan term in months</li>
            </ul>
          </Typography>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Technology Stack
        </Typography>
        <Typography variant="body1">
          Built with React, Material UI, Context API for state management, and custom React hooks for business logic.
          Exchange rates are fetched from the Exchange Rate API.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
