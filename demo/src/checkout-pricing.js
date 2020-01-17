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
  const [planQuantity, setPlanQuantity] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [{ price, loading }, setPricing] = useCheckoutPricing({}, setRecurlyError);

  function updatePlan (e) {
    const plan = e.target.value;
    setRecurlyError(null);
    setPlan(plan);
    setPricing(prev => ({ ...prev, subscriptions: [{ plan, quantity: planQuantity }] }));
  };

  function updatePlanQuantity (e) {
    const planQuantity = e.target.value;
    setRecurlyError(null);
    setPlanQuantity(planQuantity);
    setPricing(prev => ({ ...prev, subscriptions: [{ plan, quantity: planQuantity }] }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setPricing({
      subscriptions: [{ plan, quantity: planQuantity }],
      adjustments: [{ itemCode, quantity: itemQuantity }],
    });
  }

  return (
    <div className="DemoSection">
      <form onSubmit={handleSubmit}>
        <div>
          <select value={plan} onChange={updatePlan}>
            <option value="">Select a plan</option>
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
            <option value="error">Error</option>
          </select>
          <input
            type="number"
            value={planQuantity}
            onChange={updatePlanQuantity}
            placeholder="Quantity"
            min="0"
          />
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              value={itemCode}
              onChange={e => setItemCode(e.target.value)}
              placeholder="Item code"
            />
            <input
              type="number"
              onChange={itemQuantity}
              onChange={e => setItemQuantity(e.target.value)}
              placeholder="Quantity"
              min="0"
            />
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          {recurlyError ? <span style={{ color: 'red' }}>{recurlyError.message}</span> : ''}
          {price && price.now && !recurlyError ? <span>Subtotal: ${price.now.subtotal}</span> : ''}
        </div>
        <button>Calculate subtotal</button>
      </form>
    </div>
  );
};
