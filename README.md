# Getting Started with Create React App

Integration of Airwallex [Drop-in Element](https://www.airwallex.com/docs/payments__drop-in-element)


# How to run the app
1. Create an `.env` on the home directory
2. Hit the `api/v1/authentication/login` endpoint and create a new access token
3. Update the `.env` file with AIRWALLEX_BEARER_TOKEN
4. On the home directory run `npm install` and `npm start`. This will run the server
5. Navigate to the `store` folder and run `npm install` and `npm start`. This will run the client
6. Go to http://localhost:3000/
7. Add items to the cart
8. Complete the payment


# Technical details of the project 
- The backend can be found in the `server.js` (It's used to create the payment intent)
- The frontend can be found in the `store` directory


