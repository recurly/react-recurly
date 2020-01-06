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
export default function useCheckoutPricing(initialInputs, catchE) {
  const recurly = useRecurly();
  const [pricing, setPricing] = useState({});
  const [inputs, setInputs] = useState(initialInputs);
  const subscriptionPricing = recurly.Pricing.Subscription();
  const checkoutPricing = recurly.Pricing.Checkout();

  useEffect(() => {
    const { plan, addons, subscriptions, ...checkoutPricingInputs } = inputs;

    const checkoutPricing = recurly.Pricing.Checkout();

    (async () => {
      Promise.all(
        subscriptions.map(sub => {
          const subscription = recurly.Pricing.Subscription()
            .plan('basic', { quantity: sub.quantity || 1 })
            .tax(sub.tax);

          sub.addons &&
            sub.addons.length &&
            sub.addons.forEach(addon => {
              subscription.addon(addon);
            });

          return checkoutPricing.subscription(subscription.done());
        }),
      ).then(() => {
        setPricing({ price: checkoutPricing.price, checkoutPricing });
        //   console.log(checkoutPricing);
        //   const [pricing] = x;

        //   console.log({ pricing });
      });
    })();

    window.pricing = checkoutPricing;

    // const subscription = recurly.Pricing.Subscription()
    //   .plan(plan)
    //   .catch(catchE)
    //   .done(() => {
    //     const checkoutPricing = recurly.Pricing.Checkout().done(console.log);

    // for (const key in checkoutPricingInputs) {
    //   switch (key) {
    //     case 'subscriptions':
    //       addSubscriptions(checkoutPricingInputs.subscriptions, checkoutPricing);
    //     default:
    //       addPricingOption(pricing, option, value);
    //   }
    // }
    //   });

    // checkoutPricing.catch(console.error).done(setPricing);

    // subscriptionPricing.plan(plan)/*.addon(addons)*/.done(() => {
    //     Object.entries(checkoutPricingInputs)
    //         .reduce(checkoutPricingReducer, checkoutPricing.subscription(subscriptionPricing))
    //         .catch(catchE)
    //         .done(setPricing);
    // });
  }, [inputs]);

  function updateInputs(newInputs) {
    setInputs({ ...inputs, ...newInputs });
    return pricing;
  }

  return [pricing, updateInputs];
}

function addSubscriptions(subscriptions, checkoutPricing) {
  for (const sub of subscriptions) {
    const newSubscription = recurly.Pricing.Subscription();

    for (const key of sub) {
      addPricingOption(key, sub[key], newSubscription);
    }

    newSubscription.done();
    checkoutPricing.subscription(newSubscription);
  }
}

function addPricingOption(pricing, option, value) {
  pricing[option](value);
}
