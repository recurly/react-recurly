import { useEffect, useState } from 'react';
import useRecurly from './use-recurly';

/**
 * A custom hook for interacting with the subscriptionPricing API meant to mimic
 * the return values/behavior of react.useState
 *
 * Accepts an `initialInputs` param (same as useState)
 *
 * Returns a tuple with a pricing object and a setter for updating pricing
 * inputs (same as useState)
 *
 * @param {PricingInput} initialInputs
 * @returns {[pricingObject, updateInputsFunction]}
 */
export default function useSubscriptionPricing(initialInputs = {}, catchE = () => {}) {
  if (catchE && typeof catchE !== 'function') {
    throw new Error('Second argument must be a function that handles an error');
  }

  if (!initialInputs.plan) {
    throw new Error('Plan is required');
  }

  const recurly = useRecurly();
  const [pricing, setPricing] = useState({});
  //   const [subscriptionPricingPromise, setSubscriptionPricingPromise] = useState();
  const [inputs, setInputs] = useState(initialInputs);
  const subscriptionPricing = recurly.Pricing.Subscription();

  useEffect(() => {
    const { plan, addon, addons = [] } = inputs;
    let subscriptionPricingPromise = subscriptionPricing.plan(plan);

    if (addon) {
      addons.push(normalizeAddon(addon));
    }

    if (addons.length) {
      subscriptionPricingPromise = addons.reduce(addonsReducer, subscriptionPricingPromise);
    }

    subscriptionPricingPromise.done(setPricing);
  }, [inputs.plan, inputs.addons, inputs.addon]);

  function updateInputs(newInputs) {
    setInputs({ ...inputs, ...newInputs });
    return pricing;
  }

  return [pricing, updateInputs];
}

function addonsReducer(pricingPromise, addons) {
  return addons.reduce((_, input) => pricingPromise.addon(input), pricingPromise);
}

function normalizeAddon(addon) {
  if (typeof addon === 'object') return addon;

  return {
    id: addon,
    quantity: 1,
  };
}
