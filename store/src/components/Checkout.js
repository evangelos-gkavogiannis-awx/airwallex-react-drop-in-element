import React, { useEffect, useState, useContext, createContext } from 'react';
import { CheckoutContext } from './CheckoutContext';
import { init, createElement } from '@airwallex/components-sdk';


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

  const initAirwallex = async () => {
    try {
      // 1. Initialize Airwallex (only once)
      if (!window.__airwallexInitialized) {
        await init({
          env: 'demo',
          origin: window.location.origin,
          locale: 'en',
          enabledElements: ['payments'], // Make sure 'payments' is included
        });
        window.__airwallexInitialized = true;
        console.log('Airwallex initialized');
      }

      // 2. Create the Drop-in element
      const element = await createElement('dropIn', {
        intent_id: intentId,
        client_secret: clientSecret,
        currency: 'USD',
      });

      if (!element || typeof element.mount !== 'function') {
        console.error('Failed to create dropIn element:', element);
        setErrorMessage('Drop-in could not be created. Check your intent details or SDK setup.');
        return;
      }

      element.mount('dropIn');

      element.on('success', () => alert('Payment was successful!'));
      element.on('error', () => alert('Payment failed. Please try again.'));
      element.on('ready', (e) => console.log('Drop-in ready:', e.detail));
    } catch (err) {
      console.error('Airwallex init error:', err);
      setErrorMessage('Error initializing Airwallex');
    }
  };

  initAirwallex();
}, [checkoutData]);


  return (
    <>
      <h2>Checkout</h2>
      <div id="dropIn"></div>
    </>

  )
}

export default Checkout;
