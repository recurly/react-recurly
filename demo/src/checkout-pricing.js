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
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const [currency, setCurrency] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [billingVatNumber, setBillingVatNumber] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingVatNumber, setShippingVatNumber] = useState('');
  const [{ price, loading }, setPricing] = useCheckoutPricing({}, setRecurlyError);
  const showPrice = !loading && !recurlyError;

  function updatePlan (e) {
    const plan = e.target.value;
    setPlan(plan);
  };

  function updatePlanQuantity (e) {
    const planQuantity = e.target.value;
    setPlanQuantity(planQuantity);
  };

  function handleSubmit (e) {
    e.preventDefault();
    const address = {
      billingCountry,
      billingPostalCode,
      billingVatNumber,
    };
    setRecurlyError(null);
    setPricing({
      subscriptions: [{ plan, quantity: planQuantity }],
      adjustments: [{ itemCode, quantity: itemQuantity }],
      coupon,
      giftCard,
      address
    });
  };

  return (
    <form onSubmit={handleSubmit} className="DemoSection">
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
          placeholder="Plan quantity"
          min="0"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={itemCode}
          onChange={e => setItemCode(e.target.value)}
          placeholder="Item code"
        />
        <input
          type="number"
          onChange={e => setItemQuantity(e.target.value)}
          placeholder="Quantity"
          min="0"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          placeholder="Coupon"
          />
        <input
          type="text"
          value={giftCard}
          onChange={e => setGiftCard(e.target.value)}
          placeholder="Gift card"
          />
        <input
          type="text"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          placeholder="Currency"
          />
      </div>
      <div style={{ marginTop: '10px' }}>
        <h3>Billing address</h3>
        <input
          type="text"
          value={billingCountry}
          onChange={e => setBillingCountry(e.target.value)}
          placeholder="Country"
        />
        <input
          type="text"
          value={billingPostalCode}
          onChange={e => setBillingPostalCode(e.target.value)}
          placeholder="Postal code"
        />
        <input
          type="text"
          value={billingVatNumber}
          onChange={e => setBillingVatNumber(e.target.value)}
          placeholder="Vat number"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <h3>Shipping address</h3>
        <input
          type="text"
          value={shippingCountry}
          onChange={e => setShippingCountry(e.target.value)}
          placeholder="Country"
        />
        <input
          type="text"
          value={shippingPostalCode}
          onChange={e => setShippingPostalCode(e.target.value)}
          placeholder="Postal code"
        />
        <input
          type="text"
          value={shippingVatNumber}
          onChange={e => setShippingVatNumber(e.target.value)}
          placeholder="Vat number"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {recurlyError ? <span style={{ color: 'red' }}>{recurlyError.message}</span> : ''}
        {showPrice ? (
          <span>
            {'Subtotal: '}
            <span style={{ visibility: loading ? 'hidden' : '' }}>${price.now.subtotal}</span>
          </span>
        ) : null}
      </div>
      <button>Submit</button>
    </form>
  );
};
