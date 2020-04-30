import React, { useState, useEffect } from 'react';
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
  const [pricingFormState, setPricingFormState] = useState({
    plan: '',
    planQuantity: '',
    itemCode: '',
    itemQuantity: '',
    coupon: '',
    giftCard: '',
    currency: '',
    billingCountry: '',
    billingPostalCode: '',
    billingVatNumber: '',
    shippingCountry: '',
    shippingPostalCode: '',
    shippingVatNumber: ''
  });

  const [{ price, loading }, setPricing] = useCheckoutPricing(null, setRecurlyError);
  const showPrice = !loading && !recurlyError;

  function handleChange (name, value) {
    const newState = { ...pricingFormState, [name]: value };
    setPricingFormState(newState);
  };

  useEffect(() => {
    setRecurlyError(null);

    const subscriptions = pricingFormState.plan ? [{
      plan: pricingFormState.plan,
      quantity: pricingFormState.planQuantity
    }] : [];
    const adjustments = pricingFormState.itemCode ? [{
      itemCode: pricingFormState.itemCode,
      quantity: pricingFormState.itemQuantity
    }] : [];
    const address = {
      country: pricingFormState.billingCountry,
      postal_code: pricingFormState.billingPostalCode
    };
    const shippingAddress = {
      country: pricingFormState.shippingCountry,
      postal_code: pricingFormState.shippingPostalCode
    };

    setPricing({ ...pricingFormState, subscriptions, adjustments, address, shippingAddress });
  }, [pricingFormState, setPricing]);

  return (
    <div className="DemoSection">
      <div>
        <h3>Subscription</h3>
        <select value={pricingFormState.plan} onChange={e => handleChange('plan', e.target.value)}>
          <option value="">Select a plan</option>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="error">Error</option>
        </select>
        <input
          type="number"
          value={pricingFormState.planQuantity}
          onChange={e => handleChange('planQuantity', e.target.value)}
          placeholder="Plan quantity"
          min="0"
        />
        <select
          type="text"
          value={pricingFormState.currency}
          onChange={e => handleChange('currency', e.target.value)}
          placeholder="Currency"
        >
          <option value="USD">USD</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <div style={{ marginTop: '10px' }}>
        <h3>Item/adjustments</h3>
        <input
          type="text"
          value={pricingFormState.itemCode}
          onChange={e => handleChange('itemCode', e.target.value)}
          placeholder="Item code"
        />
        <input
          type="number"
          value={pricingFormState.itemQuantity}
          onChange={e => handleChange('itemQuantity', e.target.value)}
          placeholder="Quantity"
          min="0"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <h3>Coupon and giftcard</h3>
        <input
          type="text"
          value={pricingFormState.coupon}
          onChange={e => handleChange('coupon', e.target.value)}
          placeholder="Coupon"
        />
        <input
          type="text"
          value={pricingFormState.giftCard}
          onChange={e => handleChange('giftCard', e.target.value)}
          placeholder="Gift card"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <h3>Billing address</h3>
        <input
          type="text"
          value={pricingFormState.billingCountry}
          onChange={e => handleChange('billingCountry', e.target.value)}
          placeholder="Country"
        />
        <input
          type="text"
          value={pricingFormState.billingPostalCode}
          onChange={e => handleChange('billingPostalCode', e.target.value)}
          placeholder="Postal code"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <h3>Shipping address</h3>
        <input
          type="text"
          value={pricingFormState.shippingCountry}
          onChange={e => handleChange('shippingCountry', e.target.value)}
          placeholder="Country"
        />
        <input
          type="text"
          value={pricingFormState.shippingPostalCode}
          onChange={e => handleChange('shippingPostalCode', e.target.value)}
          placeholder="Postal code"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {recurlyError ? <span style={{ color: 'red' }}>{recurlyError.message}</span> : ''}
        {showPrice ? (
          <span>
            {'Subtotal: '}
            <span>{`${price.currency.symbol}${price.now.subtotal}`}</span>
          </span>
        ) : null}
        {loading && 'Loading'}
      </div>
    </div>
  );
};
