import  { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid2,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import './styles/NewsletterSignup.css';

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.consent) newErrors.consent = 'You must provide consent to subscribe.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/subscribe', formData);
      setMessage(response.data.message);
      setFormData({ firstName: '', lastName: '', email: '', consent: false });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-signup-container">
      <Typography className='newsletter-signup-heading' variant="h6">
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
              error={!!errors.firstName}
              helperText={errors.firstName}
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
              error={!!errors.email}
              helperText={errors.email}
              className='newsletter-signup-input'
            />
          </Grid2>
          <Grid2 item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  color="primary"
                  className='newsletter-signup-checkbox'
                />
              }
              label="I agree to receive communications from Indigo Projects. You can unsubscribe at any time."
              className='newsletter-signup-consent'
            />
            {errors.consent && (
              <Typography variant="body2" color="error">
                {errors.consent}
              </Typography>
            )}
          </Grid2>
          <Grid2 item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              className='newsletter-signup-button'
            >
              {loading ? <CircularProgress size={24} /> : 'Subscribe'}
            </Button>
          </Grid2>
        </Grid2>
      </form>
      {message && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default NewsletterSignup;