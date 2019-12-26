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
  const recurly = useRecurly();
  const [pricing, setPricing] = useState({});
  const [inputs, setInputs] = useState(initialInputs);
  const subscriptionPricing = recurly.Pricing.Subscription();

  useEffect(() => {
    const { plan, addon, addons = [] } = inputs;
    let subscriptionPricingPromise = subscriptionPricing.plan(plan);

    if (addon) {
      addons.push(normalizeAddon(addon));
    }

    if (addons.length) {
      subscriptionPricingPromise = addons.reduce((pricingPromise, addon) => {
        return pricingPromise.addon(addon);
      }, subscriptionPricingPromise);
    }

    subscriptionPricingPromise.done(setPricing);
  }, [inputs.plan, inputs.addons, inputs.addon]);

  function updateInputs(newInputs) {
    setInputs({ ...inputs, ...newInputs });
    return pricing;
  }

  return [pricing, updateInputs];
}

function normalizeAddon(addon) {
  if (typeof addon === 'object') return addon;

  return {
    addon,
    quantity: 1,
  };
}
