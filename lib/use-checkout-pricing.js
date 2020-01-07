import { useEffect, useState } from 'react';
import useRecurly from './use-recurly';

/**
 * A custom hook for interacting with the checkoutPricing API meant to mimic
 * the return values/behavior of react.useState
 *
 * Accepts an `initialInputs` param (same as useState)
 *
 * Returns a tuple with a pricing object, a setter for updating pricing
 * inputs (same as useState), and a loading state represented as a boolean
 *
 * @param {PricingInput} initialInputs
 * @returns {[pricingObject, updateInputsFunction, loading]}
 */
export default function useCheckoutPricing(initialInputs = {}, handleError = console.error) {
  const recurly = useRecurly();
  const [pricing, setPricing] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);

  useEffect(() => {
    const checkoutPricing = recurly.Pricing.Checkout();
    const { plan, quantity, addons = [], subscriptions = [] } = inputs;

    const allSubscriptions = plan ? [{ plan, addons, quantity }, ...subscriptions] : subscriptions;

    if (!allSubscriptions.length) {
      handleError(Error('Must have plan or at least one subscription'));
    }

    setLoading(true);

    addSubscriptions(allSubscriptions, checkoutPricing)
      .then(() => {
        setPricing(checkoutPricing);
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }, [inputs]);

  function updateInputs(newInputs) {
    setInputs(inputs => ({ subscriptions: [], ...inputs, ...newInputs }));
  }

  function addSubscriptions(subscriptions, checkoutPricing) {
    const { subscriptionPromises } = subscriptions.reduce(
      (acc, sub) => {
        const subscriptionPricing = recurly.Pricing.Subscription()
          .plan(sub.plan, { quantity: sub.quantity || 1 })
          .tax(sub.tax)
          .catch(handleError);

        const checkoutPricingWithAddons = addAddons(sub.addons, subscriptionPricing);

        return {
          checkoutPricing: acc.checkoutPricing.subscription(checkoutPricingWithAddons.done()),
          subscriptionPromises: [...acc.subscriptionPromises, subscriptionPricing],
        };
      },
      { checkoutPricing, subscriptionPromises: [] },
    );

    return Promise.all(subscriptionPromises);
  }

  return [pricing, updateInputs, loading];
}

function addAddons(addons = [], subscriptionPricing) {
  return addons.reduce((acc, addon) => {
    return acc.addon(addon);
  }, subscriptionPricing);
}
