import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './Payment.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentButton = ({ jobId, amount, description, onPaymentSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const stripe = await stripePromise;
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment/create-checkout-session`,
        { jobId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (result.error) {
        console.error('Error en pago:', result.error.message);
        alert('Error procesando el pago');
      }
    } catch (error) {
      console.error('Error iniciando pago:', error);
      alert('Error al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-details">
        <h3>Resumen del Pago</h3>
        <p>{description}</p>
        <div className="amount">
          <strong>Total: €{amount}</strong>
        </div>
      </div>
      
      <button 
        onClick={handlePayment}
        disabled={isLoading}
        className="payment-button"
      >
        {isLoading ? 'Procesando...' : `Pagar €${amount}`}
      </button>
      
      <div className="payment-info">
        <small>Pago seguro procesado por Stripe</small>
      </div>
    </div>
  );
};

export default PaymentButton;