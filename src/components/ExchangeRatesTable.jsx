import { useContext } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CurrencyContext } from '../context/CurrencyContext';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRatesTable = () => {
  const { currency } = useContext(CurrencyContext);
  const {
    paginatedRates,
    page,
    rowsPerPage,
    isLoading,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    total,
  } = useExchangeRates();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading exchange rates: {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Exchange Rates (Base: {currency})
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="exchange rates table">
          <TableHead>
            <TableRow>
              <TableCell>Currency Code</TableCell>
              <TableCell>Exchange Rate</TableCell>
              <TableCell>Converted Value (1 {currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRates.map((row) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell>{row.rate.toFixed(4)}</TableCell>
                <TableCell>{(1 / row.rate).toFixed(2)} {row.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ExchangeRatesTable;