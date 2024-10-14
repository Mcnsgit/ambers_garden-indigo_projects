import React, { useCallback } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './styles/PaypalButton.css';
import axios from 'axios';




const PayPalButton = ({ amount }) => {
  const initialOptions = React.useMemo(() => ({
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: 'GBP',
    intent: 'capture',
  }), []);

  // const [{isPending }] = usePayPalScriptReducer();

  function createOrder() {
    return axios.post('http://localhost:3001/create-order', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: {amount},
        amount: amount.toString(),
        currency: 'GBP',
        description: 'Donation',
        intent: 'capture',
      })
    })
  }


  const redirectToThankYouPage = () => {
    window.location.href = '/thank-you';
  };

  async function onApprove(data) {
    const response = await axios.post('http://localhost:3001/execute-payment', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      })
    });
    const orderData = response.json();
    const name = orderData.payer.name.given_name;
    console.log(`Thank you for your donation, ${name}!`);
    redirectToThankYouPage();
  }



  return (
    <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
    </PayPalScriptProvider>
  );
}


export default PayPalButton;
// {isPending ? <div className="spinner" /> : null} 