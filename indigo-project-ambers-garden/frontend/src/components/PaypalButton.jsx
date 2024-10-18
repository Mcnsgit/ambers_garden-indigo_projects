import React, { useMemo } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import './styles/PaypalButton.css';
import axios from 'axios';




const PayPalButton = ({ amount }) => {
  const initialOptions = React.useMemo(() => ({
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: 'GBP',
    intent: 'capture',
  }), []);

  // const [{isPending }] = usePayPalScriptReducer();

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3001/create-order', { amount });
      return response.data.id;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/capture-order', {
        orderID: data.orderID,
      });
      const orderData = response.data;
      const name = orderData.payer.name.given_name;
      console.log(`Thank you for your donation, ${name}!`);
      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Error capturing order:', error);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'donate' }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;