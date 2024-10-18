// src/components/DonationForm.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, InputAdornment, OutlinedInput, Button, CircularProgress } from '@mui/material';
import {Grid2} from '@mui/material';
import { useCreatePaymentIntent } from '../hooks/useCreatePaymentIntent';
import StripeForm from './StripeForm';

import { loadStripe } from '@stripe/stripe-js';

const DonationForm = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const [clientSecret, setClientSecret] = useState(null);
    const [amount, setAmount] = useState(10);
    const { mutate, isLoading, data, error } = useCreatePaymentIntent();

    useEffect(() => {
        if (data) {
          setClientSecret(data.client_secret);
        }
      }, [data]);
      
      const handleCancel = () => {
        setClientSecret(null);
      };
      
      const handleSuccess = () => {
        // Handle successful payment    
        setClientSecret(null);
      };
  const handleSubmit = () => {
    mutate(amount);
  };
const handleChange = (e) => {
    setAmount(e.target.value);
}
  return (
    <Card>
        {!clientSecret ? (
      <CardContent>
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 item xs={12}>
            <Typography variant="h5">Make a Donation</Typography>
          </Grid2>
          <Grid2 item xs={6}>
            <OutlinedInput
              type="number"
              value={amount}
              onChange={handleChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              fullWidth
            />
          </Grid2>
          <Grid2 item xs={12}>
            <Button fullWidth variant="contained" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Donate'}
            </Button>
            {error && <Typography color="error">Something went wrong</Typography>}
          </Grid2>
        </Grid2>
      </CardContent>
        ):(
            <StripeForm
            clientSecret={clientSecret}
            amount={amount}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        )}
    </Card>
  );
};

export default DonationForm;