// src/screens/ThankYou.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import './styles/ThankYou.css';
const ThankYou = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4" align="center" gutterBottom color="#4B0082">
      Thank You for Your Donation!
    </Typography>
    <Typography variant="body1" align="center">
      Your support helps us continue our work.
    </Typography>
  </Container>
);

export default ThankYou;