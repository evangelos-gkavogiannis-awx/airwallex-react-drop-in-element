const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


// Middleware to parse JSON bodies - communication between backend and front end
app.use(express.json());


// Middleware to enable CORS
app.use(cors());


app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, merchant_order_id, return_url, order } = req.body;

    try {
        const response = await axios.post('https://api-demo.airwallex.com/api/v1/pa/payment_intents/create', {
            request_id: `${Date.now()}`, // Unique ID for the request
            amount: amount,
            currency: currency, 
            merchant_order_id: merchant_order_id,
            return_url: return_url,
            order: order
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AIRWALLEX_BEARER_TOKEN}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
});


// endpoint to confirm a PaymentIntent using Bacs Direct Debit
app.post('/confirm-payment-intent', async (req, res) => {
    const { intent_id, bank_name } = req.body;

    try {
        const response = await axios.post(`https://api-demo.airwallex.com/api/v1/pa/payment_intents/${intent_id}/confirm`, {
            request_id: `${Date.now()}`, // Unique request ID
            payment_method: {
                type: 'bacs_direct_debit',
                bacs_direct_debit: {
                    bank_name: 'mock' // Bank name from TrueLayer
                }
            },
            payment_method_options: {
                bacs_direct_debit: {
                    verification_method: 'truelayer' // TrueLayer verification
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AIRWALLEX_BEARER_TOKEN}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error confirming PaymentIntent:', error);
        res.status(500).json({ error: 'Failed to confirm PaymentIntent' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});