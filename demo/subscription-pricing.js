import React, { useState } from 'react';
import { useSubscriptionPricing } from '../lib/index';

export default function SubscriptionPricing() {
  const [plan, setPlan] = useState('basic');
  const [recurlyError, setRecurlyError] = useState(null);
  const [pricing, updatePricingInputs] = useSubscriptionPricing({ plan }, setRecurlyError);
  const [addons, setAddons] = useState([]);
  const [newAddon, setNewAddon] = useState('');
  const [quantity, setQuantity] = useState(1);

  function updatePlan(e) {
    setRecurlyError(null);
    const plan = e.target.value;

    setPlan(plan);
    updatePricingInputs({ plan });
  }

  function addNewAddon(e) {
    e.preventDefault();
    const newAddons = [...addons, { addon: newAddon, quantity }];

    setAddons(newAddons);
    setQuantity(1);
    setNewAddon('');
    updatePricingInputs({ addons: newAddons });
  }

  return (
    <div className="Checkout">
      <h2>Subscription Pricing</h2>
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={addNewAddon}>
          <select id="plan" value={plan} onChange={updatePlan}>
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
          </select>
          <div style={{ marginTop: '10px' }}>
            <input
              placeholder="Add on"
              id="new-addon"
              type="text"
              value={newAddon}
              onChange={e => setNewAddon(e.target.value)}
            />
            <select value={quantity} onChange={e => setQuantity(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div>
            <button>Add addon</button>
          </div>
          {addons.length ? (
            <>
              <h2 style={{ marginTop: '30px' }}>Current addons</h2>
              <ul>
                {addons.map(({ addon, quantity }) => (
                  <li key={addon}>
                    <strong>Addon:</strong> {addon} <strong style={{ marginLeft: '5px' }}>Quantity:</strong> {quantity}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
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
