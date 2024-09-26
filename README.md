# Getting Started with Create React App

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It integrates with Airwallex [Drop-in Element](https://www.airwallex.com/docs/payments__drop-in-element)



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
- The simple ecommerce app is built with React
- The backend can be found in the `server.js` (It's used to create the payment intent)
- The frontend can be found in the `store` directory


The React hooks used for managing the cart in the provided code are:

1. **`useState`**:
   - This hook is used to manage the state of the cart products (`cartProducts`) and the modal display state (`show`). In the `CartProvider` component, `useState` is used to maintain the list of products in the cart and their quantities.
   - **`useState([])`** is initializing an empty array for `cartProducts`, which will store the cart's contents.
   - **`useState(false)`** in the `NavbarComponent` is used to handle whether the modal showing the cart is visible or not.

2. **`useContext`**:
   - This hook is used to access context values provided by `CartContext` and `CheckoutContext`. In `NavbarComponent`, `useContext(CartContext)` is used to access the cart's state, while `useContext(CheckoutContext)` is used to update checkout data.
   - It allows components like `NavbarComponent` to interact with the cart (e.g., retrieving the cart items, total cost) and with the checkout process (setting the checkout data).

3. **`useEffect`** (though not present in the current code, it is imported):
   - While it's imported but not used in this specific code snippet, `useEffect` could be used in future updates to run side effects when cart-related state changes, such as saving the cart data to local storage or making API calls when the cart is updated.

4. **`useNavigate`** (from `react-router-dom`):
   - This hook is used to programmatically navigate to the checkout page after successful creation of a payment intent. In this case, `navigate('/checkout')` redirects the user to the checkout page after the payment data is processed.

These hooks work together to manage the state of the cart, checkout process, and navigation flow in the app.

