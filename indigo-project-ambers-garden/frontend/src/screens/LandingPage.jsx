import React from 'react';
import Header from '../components/Header';
import DonationForm from '../components/DonationForm';
import NewsletterSignup from '../components/NewsletterSignUpForm';
import './styles/LandingPage.css';
import { Container, Grid2, Typography } from '@mui/material';
import Footer from '../components/Footer';


const LandingPage = () => (
  <div className="landing-page">
    {/* Header */}
    <Header />

    {/* Main Section */}
    <div className="Container">
      <div className="main-section">
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#4B0082', fontWeight: 'bold' }}>
          We don’t fight alone...
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#800080', marginBottom: '20px' }}>
          A Tribe for Shared experience Trauma Warriors
        </Typography>
      </div>

      {/* Donation Form Section */}
      <Grid2 container spacing={2} justifyContent="center" alignItems="center">
        <Grid2 item xs={12} sm={6}>
          <DonationForm amount={10.00} />
        </Grid2>

        {/* Newsletter Signup Section */}
        <Grid2 item xs={12} sm={6} >
          <NewsletterSignup />
        </Grid2>
      </Grid2>
    </div>

    {/* Footer */}
    <div className="footer">
    <Footer />
    </div>
  </div>
);

export default LandingPage;