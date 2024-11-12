import React from 'react';
import Header from '../components/Header';
import DonationForm from '../components/DonationForm';
import NewsletterSignup from '../components/NewsletterSignUpForm';
// import './styles/LandingPage.css';
import { Container, Typography, Box, styled } from '@mui/material';
import { Grid2 } from '@mui/material';
import Footer from '../components/Footer';

const LandingPage = ({ darkMode, setDarkMode }) => (
  <div className="landing-page">
    {/* Header */}
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '15px auto',
        padding: '30px',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        We don’t fight alone...
      </Typography>
      <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: '20px' }}>
        A Tribe for Shared Experience Trauma Warriors
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2} justifyContent="center">
          <GridItem item xs={12} md={6}>
            <DonationForm />
          </GridItem>
          <GridItem item xs={12} md={6}>
            <NewsletterSignup />
          </GridItem>
        </Grid2>
      </Box>
    </Container>
    <Footer />
  </div>
);

export default LandingPage;

const GridItem = styled(Grid2, {
  shouldForwardProp: (prop) => prop!== 'container',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: theme.palette.background.gridItem || theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));