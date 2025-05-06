import { useContext } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@mui/material';
import { CurrencyContext } from '../context/CurrencyContext';
import { useState } from 'react';

const AmortizationTable = ({ schedule }) => {
  const { currency, currencySymbol } = useContext(CurrencyContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Apply pagination
  const displayedSchedule = schedule.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Amortization Schedule ({currency})
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="amortization schedule table">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedSchedule.map((row) => (
              <TableRow
                key={row.month}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.month}
                </TableCell>
                <TableCell>
                  {currencySymbol}
                  {row.principal.toFixed(2)}
                </TableCell>
                <TableCell>
                  {currencySymbol}
                  {row.interest.toFixed(2)}
                </TableCell>
                <TableCell>
                  {currencySymbol}
                  {row.remainingBalance.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={schedule.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AmortizationTable;