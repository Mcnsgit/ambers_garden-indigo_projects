// src/components/DonationForm.jsx
import React, { useState } from 'react';
import {Card,CardContent,  Typography,  TextField,  InputAdornment,  Button,  CircularProgress,} from '@mui/material';
import PayPalButton from './PayPalButton';
import './styles/DonationForm.css';
const DonationForm = () => {
  const [amount, setAmount] = useState('10.00');
  const [showPayPal, setShowPayPal] = useState(false);
  const [amountError, setAmountError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
      setAmountError('Please enter a valid amount');
    } else {
      setAmountError('');
    }
  };

  const handleDonateClick = () => {
    if (amountError || parseFloat(amount) <= 0) {
      setAmountError('Please enter a valid amount');
      return;
    }
    setShowPayPal(true);
  };

  return (
    <Card  className='donation-form-container'>
      <CardContent className='donation-form'>
        <Typography variant="h5" gutterBottom align="center">
          Make a Donation
        </Typography>
        {!showPayPal ? (
          <>
            <TextField
            className='donation-form-input'
              type="number"
              label="Donation Amount"
              value={amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              fullWidth
              error={!!amountError}
              helperText={amountError}
              sx={{ mb: 2 }}
            />
            <PayPalButton amount={amount} />
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleDonateClick}
              disabled={!!amountError}
              sx={{ backgroundColor: '#FFD700', color: '#4B0082' }}
            >
              Donate
            </Button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <PayPalButton amount={amount} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DonationForm;