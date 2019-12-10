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

        subscriptionPricing.plan(plan)/*.addon(addons)*/.done(() => {
            Object.entries(checkoutPricingInputs)
                .reduce(checkoutPricingReducer, checkoutPricing.subscription(subscriptionPricing))
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

// handles multiple adjustments
function adjustmentsReducer(pricingPromise, adjustments) {
    return adjustments.reduce((_, input) => pricingPromise.adjustment(input), pricingPromise);
}

function checkoutPricingReducer(pricingPromise, input) {
    const [method, value] = input;

    if (method === "adjustments") {
        return adjustmentsReducer(pricingPromise, value);
    }

    return pricingPromise[method](value);
}
