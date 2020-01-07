import React, { useState } from 'react';
import { useCheckoutPricing } from '../lib/index';

export default function CheckoutPricing() {
  return (
    <div>
      <h2>Pricing</h2>
      <SingleSubscription />
      <MultipleSubscriptions />
    </div>
  );
}

function SingleSubscription() {
  const [recurlyError, setRecurlyError] = useState(null);
  const [plan, setPlan] = useState('');
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const [pricing, updatePricingInputs] = useCheckoutPricing(
    {
      plan,
    },
    setRecurlyError,
  );

  function updatePlan(e) {
    const plan = e.target.value;
    setRecurlyError(null);
    setPlan(plan);
    updatePricingInputs({
      plan,
    });
  }

  function updatePricing(e) {
    e.preventDefault();
    updatePricingInputs({ coupon, giftCard, plan });
  }

  return (
    <div className="checkout">
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={updatePricing}>
          <div style={{ marginBottom: '10px' }}>
            <h3>Single subscription</h3>
            <select value={plan} onChange={updatePlan}>
              <option value="">Select a plan</option>
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
            </select>
            <input placeholder="Coupon" type="text" value={coupon} onChange={e => setCoupon(e.target.value)} />
            <input placeholder="Gift card" type="text" value={giftCard} onChange={e => setGiftCard(e.target.value)} />
          </div>
          <div>
            <button>Calculate subtotal</button>
          </div>
          {
            <div style={{ marginTop: '15px' }}>
              {recurlyError ? (
                <span data-testid="error" style={{ color: 'red' }}>
                  {recurlyError.message}
                </span>
              ) : (
                <>Subtotal: {pricing.price ? <span data-testid="subtotal">{pricing.price.now.subtotal}</span> : ''}</>
              )}
            </div>
          }
        </form>
      </div>
    </div>
  );
}

function MultipleSubscriptions() {
  const [recurlyError, setRecurlyError] = useState(null);
  const [pricing, updatePricingInputs, loading] = useCheckoutPricing({}, setRecurlyError);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({ plan: 'basic', addons: [], tax: '', quantity: 1 });

  function addSubscription(e) {
    e.preventDefault();
    setRecurlyError(null);
    updatePricingInputs({ subscriptions: [...subscriptions, newSubscription] });
    setSubscriptions([...subscriptions, { ...newSubscription, key: Math.random() }]);
  }

  function removeSubscription(key) {
    const updatedSubscriptions = subscriptions.filter(sub => sub.key !== key);
    setSubscriptions(updatedSubscriptions);
    updatePricingInputs({ subscriptions: updatedSubscriptions });
  }

  const updateNewSubscription = property => e => {
    const { value } = e.target;
    setNewSubscription(newSubscription => ({ ...newSubscription, [property]: value }));
  };

  return (
    <div className="checkout">
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={addSubscription}>
          <div>
            <h3>Multiple subscriptions</h3>
            <select value={newSubscription.plan} onChange={updateNewSubscription('plan')}>
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
            </select>
            <input
              placeholder="Quantity"
              type="number"
              value={newSubscription.quantity}
              onChange={updateNewSubscription('quantity')}
            />
            <button>Add subscription</button>
          </div>
          {subscriptions.length ? (
            <div>
              <p>Active subscriptions</p>
              <table>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(({ key, plan, quantity }) => (
                    <tr key={key}>
                      <td>{plan}</td>
                      <td>{quantity}</td>
                      <td>
                        <button type="button" style={{ margin: 0 }} onClick={() => removeSubscription(key)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {
            <div style={{ marginTop: '15px' }}>
              {subscriptions.length ? (
                recurlyError ? (
                  <span data-testid="error" style={{ color: 'red' }}>
                    {recurlyError.message}
                  </span>
                ) : (
                  <>
                    Subtotal: {loading ? 'Loading' : <span data-testid="subtotal">{pricing.price.now.subtotal}</span>}
                  </>
                )
              ) : null}
            </div>
          }
        </form>
      </div>
    </div>
  );
}
