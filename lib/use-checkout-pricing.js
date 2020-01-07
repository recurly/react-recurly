import { useEffect, useState } from 'react';
import useRecurly from './use-recurly';

/**
 * A custom hook for interacting with the checkoutPricing API meant to mimic
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
export default function useCheckoutPricing(initialInputs, catchE = console.error) {
  const recurly = useRecurly();
  const [pricing, setPricing] = useState({});
  const [inputs, setInputs] = useState(initialInputs);

  useEffect(() => {
    const checkoutPricing = recurly.Pricing.Checkout();
    const { plan, quantity, addons = [], subscriptions = [], ...checkoutPricingInputs } = inputs;

    console.log(checkoutPricingInputs);

    Object.entries(checkoutPricingInputs).reduce((checkoutPricing, input) => {
      const [key, value] = input;
      return checkoutPricing[key](value);
    }, checkoutPricing);

    if (plan) {
      subscriptions.push({ plan, addons, quantity });
    }

    if (!subscriptions.length) {
      throw Error('Must have plan or subscription');
    }

    addSubscriptions(subscriptions, checkoutPricing).then(() => {
      setPricing(checkoutPricing);
    });
  }, [inputs]);

  function updateInputs(newInputs) {
    setInputs({ ...inputs, ...newInputs });
  }

  function addSubscriptions(subscriptions, checkoutPricing) {
    const { subscriptionPromises } = subscriptions.reduce(
      (acc, sub) => {
        const subscriptionPricing = recurly.Pricing.Subscription()
          .plan(sub.plan, { quantity: sub.quantity || 1 })
          .tax(sub.tax);

        // addAddons(sub.addons, subscriptionPricing)

        return {
          checkoutPricing: acc.checkoutPricing.subscription(subscriptionPricing.done()),
          subscriptionPromises: [...acc.subscriptionPromises, subscriptionPricing],
        };
      },
      { checkoutPricing, subscriptionPromises: [] },
    );

    return Promise.all(subscriptionPromises);
  }

  return [pricing, updateInputs];
}

function addAddons(addons = [], subscriptionPricing) {
  if (addons.length) {
    sub.addons.forEach(subscriptionPricing.addon);
  }
}
