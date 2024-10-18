// src/components/DonationSection.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './styles/DonationSection.css';

const stripePromise = loadStripe('pk_test_51Q86Y5FW9lrIqbJSVD4HZbW8JZB75LymrfpoqDlHaIYDzf3Ckce0z2gHvksY25izuumchpm6BJIKqPBDDcue6cBz00Qws1OjjS');


const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    consent: false,
  });
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: donorDetails.name,
        email: donorDetails.email,
      },
    });

    if (methodError) {
      setMessage(methodError.message);
      return;
    }

    if (recurring) {
      // Recurring donation
      const response = await fetch('http://localhost:4242/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: donorDetails.email,
          paymentMethodId: paymentMethod.id,
          priceId: 'price_YOUR_PRICE_ID',
          donorDetails,
        }),
      });
      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
        return;
      }

      const confirmResult = await stripe.confirmCardPayment(data.clientSecret);

      if (confirmResult.error) {
        setMessage(confirmResult.error.message);
      } else {
        setMessage('Subscription successful! Thank you for your support.');
      }
    } else {
      // One-time donation
      const response = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email: donorDetails.email,
          donorDetails,
        }),
      });
      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
        return;
      }

      const confirmResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmResult.error) {
        setMessage(confirmResult.error.message);
      } else {
        setMessage('Donation successful! Thank you for your support.');
      }
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        <h2>Make a Donation</h2>

        <label>
          Donation Amount (GBP):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required={!recurring}
            disabled={recurring}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
          Make this a monthly donation
        </label>

        <label>
          Name:
          <input
            type="text"
            value={donorDetails.name}
            onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={donorDetails.email}
            onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
            required
          />
        </label>

        <label>
  <input
    type="checkbox"
    required
  />
  I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
</label>

        <CardElement />

        <button type="submit" disabled={!stripe}>
          Donate
        </button>

        {message && <p>{message}</p>}
      </form>
    </Elements>
  );
};

export default DonationForm;