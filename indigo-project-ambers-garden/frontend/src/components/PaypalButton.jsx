// import React, { useMemo } from 'react';
// import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import axios from 'axios';


// /**
//  * PayPal Button Component
//  *
//  * @param {object} props
//  * @param {number} props.amount - The donation amount
//  */
// const PayPalButton = ({ amount }) => {
//   const initialOptions = useMemo(() => ({
//     'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
//     currency: 'GBP',
//     intent: 'capture',
//   }), []);

//   const [{ isPending }] = usePayPalScriptReducer();

//   /**
//    * Create a new PayPal order
//    *
//    * @returns {string} Order ID
//    */
//   const createOrder = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/create-order', { amount });
//       return response.data.id;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw error; // Re-throw the error to prevent order creation
//     }
//   };

//   /**
//    * Handle PayPal approval
//    *
//    * @param {object} data - PayPal approval data
//    */
//   const onApprove = async (data) => {
//     try {
//       const response = await axios.post('https://www.paypal.com/ncp/payment/RRDLAPPHTY6AW', {
//         redirectUri: 'https://localhost:3000/thank-you',
//         orderID: data.orderID,
//       });
//       const orderData = response.data;
//       const name = orderData.payer.name.given_name;
//       console.log(`Thank you for your donation, ${name}!`);
//       window.location.href = '/thank-you';
//     } catch (error) {
//       console.error('Error capturing order:', error);
//     }
//   };

//   // <PayPalButtons
//   //   style={{ layout: 'ertical', color: 'gold', shape: 'ect', label: 'donate' }}
//   //   createOrder={createOrder}
//   //   onApprove={onApprove}
//   // />
//   return (
//     <PayPalScriptProvider options={initialOptions} deferLoading={false}>
//       {isPending? (
//         <div>Loading...</div>
//       ) : (
//         <form onClick={onApprove}>
//   <input className="btn-main" type="submit" value="Donate" />
// </form>
//       )}
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;
// src/components/PayPalButton.jsx
import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ amount }) => {
  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8000/create-order', { amount });
      return response.data.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await axios.post('http://localhost:8000/capture-order', {
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
    <PayPalButtons
      style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'donate' }}
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
};

export default PayPalButton;