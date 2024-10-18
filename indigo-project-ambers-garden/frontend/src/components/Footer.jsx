// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { SocialIcon } from 'react-social-icons';
// Footer.jsx
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'background.paper',
        padding: '20px 0',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        &copy; {new Date().getFullYear()} Indigo Projects
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Contact us:{' '}
        <Link href="mailto:hello@teamindigo.uk" color="warning.main">
          hello@teamindigo.uk
        </Link>
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">Follow us on social media:</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 1 }}>
          <SocialIcon url="https://x.com/teamindigo" style={{ height: 35, width: 35 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;