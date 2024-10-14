//backend/server.js
import {config} from 'dotenv'
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import mailchimp from '@mailchimp/mailchimp_marketing';
import pg from 'pg';
import bodyParser from 'body-parser';

config();
const { CLIENT_ID, APP_SECRET} = process.env;

const base = "https://api-m.sandbox.paypal.com"

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;


    

// // const pool = new Pool({
//   // connectionString: process.env.DATABASE_URL,  
// // })

//   mailchimp.setConfig({
//       apiKey: process.env.MAILCHIMP_API_KEY,
//       server: process.env.MAILCHIMP_SERVER_PREFIX,
//     });
  
//   app.get('/' , (req, res) => {
//     res.send('Hello World!');
//   });

// TEST
app.get('/test', async (req, res) => {
  const data = await generateAccessToken();
  console.log(data);
  res.json
})

// GENERATE ACCESS TOKEN
// async function generateAccessToken() {
  
//   const response = await axios({
//     url: base + '/v1/oauth2/token',
//     method: 'post',
//     data: "grant_type=client_credentials",
//     auth: {
//       username: CLIENT_ID,
//       password: APP_SECRET,
//     },
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     }
//   });
//   return response.data.access_token;
// } catch (error) {
//   console.error('Error generating access token:', error.response?.data || error.message);
//   throw new Error('Failed to generate PayPal access token');
// }
// }
var generateAccessToken = {
  method: 'POST',
  url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic QVQ5TDdTT1JyNWlnODhfOGctU3ZuM2tUdDd4WGEtTUtyYW84alJNMUpCZFJfSDFkLXMyU2h4cVpEa1lBUVluRTdldWhuZHNZUDVQaFl0UF86RURGM0VJZ2RhTmVKR0s3WFFGbXphMTY3THlZRjZvQWNldmhDRXR6LVRITXF6dmM4aE5UQkNzQWF5Q3ZhUHRjN3NkNmJKY20wek44YVZVeDQ='
  },
  data: 'grant_type=client_credentials'
};

axios.request(generateAccessToken).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
// Create PayPal Order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const accessToken = await generateAccessToken();
    const response = await axios({
      method: 'post',
      url: `${base}/v2/checkout/orders`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'GBP',
              value: amount,
            },
          },
        ],
      },
    });

    res.json(response.data); // Send the order ID back to the frontend
  } catch (error) {
    console.error('Error creating PayPal order:', error.response?.data || error.message);
    res.status(500).send('Error creating order');
  }
});
  
  // Capture PayPal Order
app.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  try {
    const accessToken = await generateAccessToken();
    const response = await axios({
      method: 'post',
      url: `${base}/v2/checkout/orders/${orderID}/capture`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data); // Send the capture result back to the frontend
  } catch (error) {
    console.error('Error capturing PayPal order:', error.response?.data || error.message);
    res.status(500).send('Error capturing order');
  }
});
  
//   app.post('/create-payment-intent', async (req, res) => {
//   const { amount, email, donorDetails } = req.body;
  
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount * 100, // Convert to cents
//     currency: 'gbp',
//     receipt_email: email,
//     automatic_payment_methods: { enabled: true },
//   });
  
//   try {
//     await pool.query(
//       'INSERT INTO donors (name, email, consent) VALUES ($1, $2, $3)',
//       [donorDetails.name, donorDetails.email, donorDetails.consent]
//     );
//     res.send({ clientSecret: paymentIntent.client_secret });
//     if (donorDetails.consent) {
//       const subscriber = {
//         email_address: donorDetails.email,
//         status: 'subscribed',
//         merge_fields: {
//           FNAME: donorDetails.name,
//         },
//       };
//       try {
//         await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, subscriber);
//       } catch (error) {
//         console.error('Error adding subscriber to Mailchimp:', error);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error processing donation' });
//   }
// });

// app.post('/subscribe', async (req, res) => {
//   const { firstName, lastName, email } = req.body;

//   try {
//     await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
//       email_address: email,
//       status: 'subscribed',
//       merge_fields: {
//         FNAME: firstName,
//         LNAME: lastName,
//       },
//     });

//     res.status(200).json({ message: 'Subscription successful!' });
//   } catch (error) {
//     console.error('Error subscribing:', error);
//     res.status(500).json({ error: 'An error occurred while subscribing. Please try again.' });
//   }
// });

// // // Newsletter Sign-Up Route
// // app.post('/newsletter-signup', async (req, res) => {
//   //   const { name, email } = req.body;
  
//   //   try {
//     //     // Add subscriber to Mailchimp
//     //     await lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
//       //       email_address: email,
//       //       status: 'subscribed',
//       //       merge_fields: {
//         //         FNAME: name,
//         //       },
//         //     });
        
//         //     //Optionally, store subscriber details in your database
//         //     await query(
//           //       'INSERT INTO newsletter_subscribers (name, email, created_at) VALUES ($1, $2, NOW())',
//           //       [name, email, new Date()]
//           //     );
          
//           //     res.status(200).send({ message: 'Subscription successful!' });
//           //   } catch (error) {
//             //     console.error('Error adding subscriber:', error);
//             //     res.status(500).send({ error: 'An error occurred while processing your request.' });
//             //   }
//             // });
            
            app.use((error, req, res, next) => {
              res.status(500).json({ error: error.message });
            });

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
// app.listen(3001)

