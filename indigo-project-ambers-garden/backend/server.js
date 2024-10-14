// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout', async (req, res) => {
  const { amount } = req.body;

  try {
    // Step 1: Get Access Token
    const tokenResponse = await axios.post(
      'https://api.sumup.com/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        auth: {
          username: process.env.SUMUP_CLIENT_ID,
          password: process.env.SUMUP_CLIENT_SECRET,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Create Checkout
    const checkoutResponse = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        amount,
        currency: 'GBP', // Adjust the currency as needed
        checkout_reference: 'donation-' + Date.now(),
        pay_to_email: process.env.SUMUP_ACCOUNT_EMAIL,
        description: 'Donation',
        return_url: 'http://localhost:3000/thank-you', // Adjust the return URL
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json({ checkoutUrl: checkoutResponse.data.checkout.checkout_url });
  } catch (error) {
    console.error('Error creating checkout:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error initiating payment' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SumUp backend server is running on port ${PORT}`);
});