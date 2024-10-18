// src/screens/ThankYou.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
// import './styles/ThankYou.css';
const ThankYou = () => (
  <Container sx={{ mt: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
      Thank You for Your Donation!
    </Typography>
    <Typography variant="body1">
      Your support helps us continue our work.
    </Typography>
  </Container>
);

export default ThankYou;