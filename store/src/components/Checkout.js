import React, { useEffect, useState, useContext, createContext } from 'react';
import { CheckoutContext } from './CheckoutContext';
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

const Checkout = () => {

  const { checkoutData } = useContext(CheckoutContext);
  const [errorMessage, setErrorMessage] = useState('');


 /*
 placing the initiliazation code inside useEffect guarantees that it will run only after the component is mounted
 */
  useEffect(() => {
    const { clientSecret, intentId } = checkoutData;

    if (!intentId || !clientSecret) {
      setErrorMessage('Payment initialization failed. Please try again.');
      return;
    }

    //Load airwallex
    loadAirwallex({
      env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
      origin: window.location.origin, // Set up your event target to receive the browser events message
    }).then(() => {
      const element = createElement('dropIn', {
        // Required, dropIn use intent Id, client_secret and currency to prepare checkout
        intent_id: intentId,
        client_secret: clientSecret,
        currency: 'USD',
      })

      element.mount('dropIn');

      element.on('success', (event) => {
        alert('Payment was successful!');
      });

      element.on('error', (event) => {
        alert('Payment failed. Please try again.');
      });

      element.on('ready', (event) => {
        console.log('Drop-in Element is ready:', event.detail);
      });
    })

  }, [checkoutData])


  return (
    <>
      <h2>Checkout</h2>
      <div id="dropIn"></div>
    </>

  )
}

export default Checkout;
