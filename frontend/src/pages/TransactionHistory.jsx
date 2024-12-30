import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axiosInstance from 'utils/axiosInstance';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/payment/all');
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Payment Intent ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => {
            // Conditional styling for the status cell
            const statusBackground = transaction.status === 'requires_payment_method' ? '#90EE90' : 'transparent';
            const statusColor = transaction.status === 'requires_payment_method' ? 'green' : 'black';

            return (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.paymentIntentId}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.currency}</TableCell>
                <TableCell
                  style={{
                    backgroundColor: statusBackground,
                    color: statusColor,
                    borderRadius:"10px",
                    fontWeight: statusBackground ? 'bold' : 'normal',
                  }}
                >
                  {transaction.status === 'requires_payment_method' ? 'Success' : transaction.status}
                </TableCell>
                <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionHistory;
