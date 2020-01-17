import { useEffect, useState } from 'react';
import useRecurly from './use-recurly';
import cloneDeep from 'lodash/cloneDeep';

/**
 * useCheckoutPricing interface
 *
 * Used to describe:
 *  1. `initialInputs` argument in `useCheckoutPricing`
 *  2. `newInputs` argument in `updateInputs`
 *  3. `useEffect` dependencies
 *
 * @typedef {Object} useCheckoutPricingInterface
 * @property {Array} subscriptions
 */

/**
 * A custom hook for interfacing with recurly.js' checkoutPricing API meant to mimic the call signature, return
 * type, and behavior of `react.useState`.
 *
 * Accepts an `initialInputs` param (same as useState) and an error handling function.
 *
 * Returns a tuple with an output object and an update function similar to useState.
 *
 * @typedef {Object} output
 * @property {Object} price
 * @property {Object} pricing
 * @property {Boolean} loading
 *
 * @typedef {Function} setPricing
 * @typedef {[output, setPricing]} useCheckoutPricingInstance
 *
 * @param {PricingInput} useCheckoutPricingInterface
 * @param {function} handleError
 * @returns {useCheckoutPricingInstance} useCheckoutPricingInstance
 */
export default function useCheckoutPricing(initialInputs = {}, handleError = throwError) {
  const recurly = useRecurly();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(initialInputs);
  let checkoutPricing = recurly.Pricing.Checkout();
  const [pricing, setPricing] = useState(checkoutPricing);

  useEffect(() => {
    setLoading(true);
    const { subscriptions = [] } = input;
    addSubscriptions(subscriptions, checkoutPricing)
      .then(() => {
        setPricing(checkoutPricing);
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }, [input]);

  function addSubscriptions(subscriptions, checkoutPricing) {
    const { subscriptionPricings } = subscriptions.reduce(
      ({ checkoutPricing, subscriptionPricings }, { plan, tax, addons = [], quantity }) => {
        let subscriptionPricing = recurly.Pricing.Subscription().plan(plan, { quantity });

        if (addons.length) {
          subscriptionPricing = addAddons(addons, subscriptionPricing);
        }

        if (tax) {
          subscriptionPricing = subscriptionPricing.tax(tax);
        }

        subscriptionPricing = subscriptionPricing.catch(handleError);

        return {
          checkoutPricing: checkoutPricing.subscription(subscriptionPricing.done()),
          subscriptionPricings: [...subscriptionPricings, subscriptionPricing],
        };
      },
      { checkoutPricing, subscriptionPricings: [] },
    );

    return Promise.all(subscriptionPricings);
  };

  function addAddons(addons = [], subscriptionPricing) {
    return addons
      .reduce((subscriptionPricing, { code, quantity }) => {
        return subscriptionPricing.addon(code, { quantity });
      }, subscriptionPricing)
      .catch(handleError);
  };

  const output = {
    price: (pricing && cloneDeep(pricing.price)) || {},
    pricing,
    loading,
  };

  return [output, setInput];
};

function throwError(err) {
  throw err;
};
