import { useEffect, useState } from 'react';
import useRecurly from '../components/use-recurly';

/**
 * A custom hook for interacting with the checkoutPricing API
 * meant to mimic the return values/behavior of react.useEffect
 *
 * Accepts an `initialInputs` param (same as useState)
 *
 * Returns a tuple with a pricing object and a setter for
 * updating pricing inputs (same as useState)
 *
 * @param {PricingInput} initialInputs
 */
export default function useCheckoutPricing(initialInputs, catchE) {
    if (catchE && typeof catchE !== 'function') {
        throw new Error('Second argument must be a function that handles an error');
    }

    if (!initialInputs.plan) {
        throw new Error('Plan is required');
    }

    const recurly = useRecurly();
    const [pricing, setPricing] = useState({});
    const [inputs, setInputs] = useState(initialInputs);
    const subscriptionPricing = recurly.Pricing.Subscription();
    const checkoutPricing = recurly.Pricing.Checkout();

    useEffect(() => {
        const {plan, addons, ...checkoutPricingInputs} = inputs

        // iterates over methods and calls the pricingPromise with the name
        // of the method and passes in inputs.method then returns the
        // pricingPromise to the accumulator
        // after iterating, calls .done with setPricing
        subscriptionPricing.plan(plan)/*.addon(addons)*/.done(() => {
            Object.entries(checkoutPricingInputs).reduce((pricingPromise, input) => {
                const [method, value] = input;
                return pricingPromise[method](value);
            }, checkoutPricing.subscription(subscriptionPricing))
            .catch(catchE)
            .done(setPricing);
        });
    }, [inputs]);

    function updateInputs(newInputs) {
        setInputs({ ...inputs, ...newInputs });
        return pricing;
    }

    return [pricing, updateInputs];
}
