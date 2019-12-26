import React, { useState } from 'react';
import { useCheckoutPricing } from '../lib/index';

export default function CheckoutPricing() {
  const [plan, setPlan] = useState('basic');
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const [recurlyError, setRecurlyError] = useState(null);
  const [pricing, updatePricingInputs] = useCheckoutPricing({ plan }, setRecurlyError);

  function updatePlan(e) {
    setRecurlyError(null);
    const plan = e.target.value;
    setPlan(plan);
    updatePricingInputs({ plan });
  }

  function updatePricing(e) {
    setRecurlyError(null);
    e.preventDefault();
    updatePricingInputs({ coupon, giftCard });
  }

  return (
    <div className="Checkout">
      <h2>Checkout Pricing</h2>
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={updatePricing}>
          <div style={{ marginBottom: '10px' }}>
            <select id="plan" value={plan} onChange={updatePlan}>
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <input placeholder="Coupon" type="text" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <input placeholder="Gift card" type="text" value={giftCard} onChange={e => setGiftCard(e.target.value)} />
          <div>
            <button>Calculate subtotal</button>
          </div>
          <div style={{ marginTop: '15px' }}>
            {recurlyError ? (
              <span data-testid="error" style={{ color: 'red' }}>
                {recurlyError.message}
              </span>
            ) : (
              <>Subtotal: {pricing.now ? <span data-testid="subtotal">{pricing.now.subtotal}</span> : ''}</>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
