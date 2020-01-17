import React, { useState } from 'react';
import { Elements, RecurlyProvider, useCheckoutPricing } from '@recurly/react-recurly';

export function CheckoutPricing () {
  return (
    <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY}>
      <Elements>
        <CheckoutPricingForm />
      </Elements>
    </RecurlyProvider>
  );
};

function CheckoutPricingForm () {
  const [recurlyError, setRecurlyError] = useState(null);
  const [plan, setPlan] = useState('');
  const [quantity, setQuantity] = useState('');
  const [{ price, loading }, setPricing] = useCheckoutPricing({}, setRecurlyError);

  function updatePlan (e) {
    const plan = e.target.value;
    setRecurlyError(null);
    setPlan(plan);
    setPricing(prev => ({ ...prev, subscriptions: [{ plan, quantity }] }));
  };

  function updateQuantity (e) {
    const quantity = e.target.value;
    setRecurlyError(null);
    setQuantity(() => quantity);
    setPricing(prev => ({ ...prev, subscriptions: [{ plan, quantity }] }));
  };

  return (
    <div className="DemoSection">
      <div>
        <select value={plan} onChange={updatePlan}>
          <option value="">Select a plan</option>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="error">Error</option>
        </select>
        <input
          type="number"
          value={quantity}
          onChange={updateQuantity}
          placeholder="Quantity"
          min="0"
        />
      </div>
      <div style={{ marginTop: '15px', visibility: loading ? "hidden" : "" }}>
        {recurlyError ? <span style={{ color: 'red' }}>{recurlyError.message}</span> : ''}
        {price && price.now && !recurlyError ? <span>Subtotal: ${price.now.subtotal}</span> : ''}
      </div>
    </div>
  );
};
