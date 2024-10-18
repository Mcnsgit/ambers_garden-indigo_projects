// NewsletterSignup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid2,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import './styles/NewsletterSignup.css';  // Custom styles if needed

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setErrors] = useState('');
  const [consent, setConsent] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:3001/subscribe', formData);
      setMessage(response.data.message);
      setFormData({ firstName: '', lastName: '', email: '', consent: false });
    } catch (err) {
      setErrors({ form: err.response?.data?.error || 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="newsletter-signup-container" sx={{ padding: 4, backgroundColor: '#F0F8FF', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" align="center" sx={{ color: '#4B0082', marginBottom: 2 }} className='newsletter-signup-heading'>
        Subscribe to our Newsletter
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ borderRadius: '8px' }}
              className='newsletter-signup-input'
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ borderRadius: '8px' }}
              className='newsletter-signup-input'
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ borderRadius: '8px' }}
              className='newsletter-signup-input'
            />
          </Grid2>
          <Grid2 item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={consent} onChange={handleConsentChange} />}
              label="I agree to receive communications from Indigo Projects"
              className="newsletter-signup-consent"
            />
          </Grid2>
          <Grid2 item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className="newsletter-signup-button"
            >
              {loading ? <CircularProgress size={24} /> : 'Subscribe'}
            </Button>
          </Grid2>
        </Grid2>
      </form>
      {message && (
        <Typography variant="body1" className="newsletter-signup-success">
          {message}
        </Typography>
      )}
      {error && (
        <Typography variant="body1" className="newsletter-signup-error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default NewsletterSignup;