import { useEffect, useState } from 'react';
import useRecurly from './use-recurly';
import cloneDeep from 'lodash/cloneDeep';

/**
 * @typedef {Object} address
 * @property {String} country
 * @property {String} postalCode
 * @property {String} vatNumber
 */

/**
 * useCheckoutPricing interface
 * @typedef {Object} useCheckoutPricingInterface
 * @property {Array} subscriptions
 * @property {Array} adjustments
 * @property {String} currency
 * @property {address} address
 * @property {address} shippingAddress
 * @property {String} coupon
 * @property {String} giftCard
 * @property {Object} tax
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
export default function useCheckoutPricing (initialInputs, handleError = throwError) {
  const recurly = useRecurly();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(initialInputs || {});
  const [pricing, setPricing] = useState(recurly.Pricing.Checkout());

  useEffect(() => {
    setLoading(true);
    const { subscriptions = [], adjustments = [], ...restInputs } = input;
    let checkoutPricing = recurly.Pricing.Checkout();

    if (Object.keys(restInputs).length) {
      checkoutPricing = addRestInputs(restInputs, checkoutPricing);
    };

    if (adjustments.length) {
      checkoutPricing = addAdjustments(adjustments, checkoutPricing);
    };

    addSubscriptions(subscriptions, checkoutPricing)
      .then(() => {
        checkoutPricing = checkoutPricing.reprice().done(() => {
          setPricing(checkoutPricing);
          setLoading(false);
        });
      })
      .catch(error => {
        handleError(error);
        setLoading(false);
      });

    function addAdjustments (adjustments, checkoutPricing) {
      return adjustments
        .reduce((checkoutPricing, adjustment) => {
          if (adjustment.itemCode) {
            return checkoutPricing.adjustment(adjustment).catch(handleError);
          }
          return checkoutPricing;
        }, checkoutPricing)
    };

    function addRestInputs(restInputs, checkoutPricing) {
      const { PRICING_METHODS } = checkoutPricing;
      const exclude = ['reset', 'remove', 'reprice', 'subscriptions', 'adjustments', 'addon', 'plan'];
      const permittedInputs = PRICING_METHODS.filter(method => !exclude.includes(method));

      return Object.entries(restInputs).reduce((acc, input) => {
        const [method, value] = input;
        const shouldCallPricingMethod = value && permittedInputs.includes(method);
        return shouldCallPricingMethod ? acc[method](value).catch(handleError) : acc;
      }, checkoutPricing);
    };

    function addSubscriptions(subscriptions, checkoutPricing) {
      const { subscriptionPricings } = subscriptions.reduce(
        ({ checkoutPricing, subscriptionPricings }, { plan, tax, addons = [], quantity }) => {
          if (!plan) {
            return { checkoutPricing, subscriptionPricings }
          }

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
            subscriptionPricings: [...subscriptionPricings, subscriptionPricing]
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
  }, [input, handleError, recurly.Pricing]);

  const pricingState = {
    price: (pricing && cloneDeep(pricing.price)) || {},
    loading,
  };

  return [pricingState, setInput];
};

function throwError(err) {
  throw err;
};
