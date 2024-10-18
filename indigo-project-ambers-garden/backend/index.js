//backend/server.js
import {config} from 'dotenv'
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { Client } from '@notionhq/client';

config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

//PAYPAL CONFIG

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const APP_SECRET = process.env.PAYPAL_APP_SECRET
const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';


// Mailchimp Configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

// Notion Configuration
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html")
})

  

//paypal TEST
app.get('/test', async (req, res) => {
  const data = await generateAccessToken();
  console.log(data);
  res.json
})

// GENERATE ACCESS TOKEN

// Generate PayPal Access Token
async function generateAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString('base64');
  try {
    const response = await axios({
      url: `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      data: 'grant_type=client_credentials',
    });
    return response.data.access_token;
  } catch (error) {
    console.error(
      'Error generating access token:',
      error.response?.data || error.message
    );
    throw new Error('Failed to generate PayPal access token');
  }
}
// var generateAccessToken = {
//   method: 'POST',
//   url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authorization: 'Basic QVQ5TDdTT1JyNWlnODhfOGctU3ZuM2tUdDd4WGEtTUtyYW84alJNMUpCZFJfSDFkLXMyU2h4cVpEa1lBUVluRTdldWhuZHNZUDVQaFl0UF86RURGM0VJZ2RhTmVKR0s3WFFGbXphMTY3THlZRjZvQWNldmhDRXR6LVRITXF6dmM4aE5UQkNzQWF5Q3ZhUHRjN3NkNmJKY20wek44YVZVeDQ='
//   },
//   data: 'grant_type=client_credentials'
// };

// axios.request(generateAccessToken).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
// Create PayPal Order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const accessToken = await generateAccessToken();
    const response = await axios({
      url: `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
    res.json({ id: response.data.id });
  } catch (error) {
    console.error(
      'Error creating PayPal order:',
      error.response?.data || error.message
    );
    res.status(500).send('Error creating order');
  }
});

// Capture PayPal Order
app.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  try {
    const accessToken = await generateAccessToken();
    const response = await axios({
      url: `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      'Error capturing PayPal order:',
      error.response?.data || error.message
    );
    res.status(500).send('Error capturing order');
  }
});

// Function to create Notion database if it doesn't exist
async function ensureNotionDatabase() {
  if (NOTION_DATABASE_ID) {
    return NOTION_DATABASE_ID;
  }

  try {
    const response = await notion.databases.create({
      parent: { page_id: NOTION_DATABASE_ID },
      title: [
        {
          type: 'text',
          text: {
            content: 'Subscriber Database',
          },
        },
      ],
      properties: {
        'First Name': { title: {} },
        'Last Name': { rich_text: {} },
        Email: { email: {} },
        Consent: { checkbox: {} },
        'Subscription Date': { date: {} },
      },
    });

    console.log('Created Notion database:', response.id);
    return response.id;
  } catch (error) {
    console.error('Error creating Notion database:', error.message);
    throw new Error('Failed to create Notion database');
  }
}

// Subscribe Route (Mailchimp and Notion)
app.post('/subscribe', async (req, res) => {
  const { firstName, lastName, email, consent } = req.body;

  if (!consent) {
    return res.status(400).json({ error: 'Consent is required to subscribe.' });
  }

  try {
    // Add subscriber to Mailchimp
    await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    // Ensure Notion database exists
    const databaseId = await ensureNotionDatabase();

    // Add subscriber to Notion database
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'First Name': {
          title: [
            {
              text: {
                content: firstName,
              },
            },
          ],
        },
        'Last Name': {
          rich_text: [
            {
              text: {
                content: lastName || '',
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Consent: {
          checkbox: consent,
        },
        'Subscription Date': {
          date: { start: new Date().toISOString() },
        },
      },
    });

    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error subscribing:', error.response?.data || error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while subscribing. Please try again.' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unexpected error:', error.message);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
// app.listen(3001)

