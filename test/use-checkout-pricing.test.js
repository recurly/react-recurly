import { act, renderHook } from '@testing-library/react-hooks';
import useCheckoutPricing from '../lib/use-checkout-pricing';
import { withElements } from './support/helpers';

const subscriptionPricingReturn = {
  addon: jest.fn(() => subscriptionPricingReturn),
  catch: jest.fn(() => subscriptionPricingReturn),
  done: jest.fn(() => subscriptionPricingReturn),
  plan: jest.fn(() => subscriptionPricingReturn),
  tax: jest.fn(() => subscriptionPricingReturn),
  currency: jest.fn(() => subscriptionPricingReturn)
};

const PRICING_METHODS = [
  'reset',
  'remove',
  'reprice',
  'addon',
  'address',
  'coupon',
  'currency',
  'giftCard',
  'plan',
  'shippingAddress',
  'tax'
];

const checkoutPricingReturn = {
  address: jest.fn(() => checkoutPricingReturn),
  adjustment: jest.fn(() => checkoutPricingReturn),
  catch: jest.fn(() => checkoutPricingReturn),
  coupon: jest.fn(() => checkoutPricingReturn),
  currency: jest.fn(() => checkoutPricingReturn),
  done: jest.fn(cb => {
    cb();
    return checkoutPricingReturn;
  }),
  giftCard: jest.fn(() => checkoutPricingReturn),
  reprice: jest.fn(() => checkoutPricingReturn),
  shippingAddress: jest.fn(() => checkoutPricingReturn),
  subscription: jest.fn(() => checkoutPricingReturn),
  tax: jest.fn(() => checkoutPricingReturn),
  pricing: { PRICING_METHODS }
};

describe('useCheckoutPricing', function() {
  const { Recurly } = window.recurly;

  beforeEach(() => {
    jest.clearAllMocks();
    window.recurly.Recurly = () => {
      return {
        ...new Recurly('Public key'),
        Pricing: {
          Subscription: jest.fn(() => subscriptionPricingReturn),
          Checkout: jest.fn(() => checkoutPricingReturn)
        },
      };
    };
  });

  afterEach(() => {
    window.recurly.Recurly = Recurly;
  });

  describe('loading', () => {
    it('should be true initially, then false after initial pricingPromise resolves', async () => {
      const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }] };
      const { result, waitForNextUpdate } = renderUseCheckoutPricing(initialInput);

      await act(async () => {
        expect(result.current[0].loading).toBe(true);
        await waitForNextUpdate();
        await expect(result.current[0].loading).toBe(false);
      });
    });
  });

  describe('subscriptions', () => {
    it('should call subscriptionPricing.plan for each subscription', async () => {
      const initialInput = {
        subscriptions: [
          { plan: 'basic', quantity: 2 },
          { plan: 'advanced', quantity: 5 }
        ]
      };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        await expect(subscriptionPricingReturn.plan).toHaveBeenCalledWith('basic', { quantity: 2 });
        await expect(subscriptionPricingReturn.plan).toHaveBeenCalledWith('advanced', { quantity: 5 });
      });
    });

    it('should call checkoutPricing.subscription for each subscription', async () => {
      const initialInput = {
        subscriptions: [
          { plan: 'basic', quantity: 2 },
          { plan: 'advanced', quantity: 5 }
        ]
      };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        await expect(checkoutPricingReturn.subscription).toHaveBeenCalledTimes(2);
        await expect(checkoutPricingReturn.subscription).toHaveBeenCalledWith(subscriptionPricingReturn);
      });
    });

    it('should call subscriptionPricing.addons for each addon in each subscription', async () => {
      const initialInput = {
        subscriptions: [
          {
            plan: 'basic',
            quantity: 2,
            addons: [{ code: 'item code', quantity: 5 }]
          }
        ]
      };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        await expect(subscriptionPricingReturn.addon).toHaveBeenCalledWith('item code', { quantity: 5 });
      });
    });

    it('should call subscriptionPricing.tax', async () => {
      const initialInput = {
        subscriptions: [
          {
            plan: 'basic',
            quantity: 2,
            tax: {
              vatNumber: 5,
              amounts: {
                now: '3.00',
                next: '4.00',
              }
            }
          }
        ]
      };

      const { waitForNextUpdate } = renderUseCheckoutPricing(initialInput);

      await waitForNextUpdate();
      await expect(subscriptionPricingReturn.tax).toHaveBeenCalledWith(initialInput.subscriptions[0].tax);
    });

    it('should call subscriptionPricing.currency', async () => {
      const initialInput = {
        currency: 'USD',
        subscriptions: [
          {
            plan: 'basic',
            quantity: 2,
            tax: {
              vatNumber: 5,
              amounts: {
                now: '3.00',
                next: '4.00',
              }
            }
          }
        ]
      };

      const { waitForNextUpdate } = renderUseCheckoutPricing(initialInput);

      await waitForNextUpdate();
      await expect(subscriptionPricingReturn.currency).toHaveBeenCalledWith('USD');
    })
  });

  describe('adjustments', () => {
    it('should call checkoutPricing.adjustment for each adjustment', async () => {
      const initialInput = {
        adjustments: [
          { itemCode: 'item-1', quantity: 2 },
          { itemCode: 'item-2', quantity: 5 }
        ]
      };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        await expect(checkoutPricingReturn.adjustment).toHaveBeenCalledWith({ itemCode: 'item-1', quantity: 2 });
        await expect(checkoutPricingReturn.adjustment).toHaveBeenCalledWith({ itemCode: 'item-2', quantity: 5 });
      });
    });

    it("should not call checkoutPricing.adjustment if adjustment doesn't contain an item code", async () => {
      const initialInput = { adjustments: [{ codeItem: 'item', quantity: 2 }] };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        await expect(checkoutPricingReturn.adjustment).not.toHaveBeenCalled();
      });
    });
  });

  describe('setPricing update function', () => {
    it('should call subscription pricing method when passed an object with subscriptions', async () => {
      const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }] };
      const { result, waitForNextUpdate } = renderUseCheckoutPricing(initialInput);

      await act(async () => {
        await expect(subscriptionPricingReturn.plan).toHaveBeenCalledWith('basic', { quantity: 2 });
        const setPricing = result.current[1];
        setPricing({ subscriptions: [{ plan: 'plan', quantity: 5 }] });
        await waitForNextUpdate();
        await expect(subscriptionPricingReturn.plan).toHaveBeenCalledWith('plan', { quantity: 5 });
      });
    });
  });

  describe('Rest inputs', () => {
    const checkoutPricingMethods = ['giftCard', 'address', 'shippingAddress', 'tax'];

    checkoutPricingMethods.forEach(async checkoutPricingMethod => {
      it(`should call checkoutPricing#${checkoutPricingMethod} with input value`, async () => {
        const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }], [checkoutPricingMethod]: 'Some value' };
        renderUseCheckoutPricing(initialInput);
        await act(async () => {
          await expect(checkoutPricingReturn[checkoutPricingMethod]).toHaveBeenCalledWith('Some value');
        });
      });
    });
  });

  describe('Call order', () => {
    it('should call checkoutPricing.subscriptions before checkoutPricing.adjustments', async () => {
      const initialInput = {
        subscriptions: [{ plan: 'basic' }],
        adjustments: { itemCode: 'item-1', quantity: 2 },
      };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        setTimeout(() => {
          expect(checkoutPricingReturn.subscription).toHaveBeenCalled();
          expect(checkoutPricingReturn.adjustment).toHaveBeenCalled();
          expect(checkoutPricingReturn.subscription)
            .toHaveBeenCalledBefore(checkoutPricingReturn.adjustment);
        }, 10);
      });
    });

    it('should call checkoutPricing.adjustments before checkoutPricing rest inputs', async () => {
      const initialInput = {
        currency: "USD",
        adjustments: { itemCode: 'item-1', quantity: 2 },
      };

      renderUseCheckoutPricing(initialInput);

      await act(async () => {
        setTimeout(() => {
          expect(checkoutPricingReturn.currency).toHaveBeenCalled();
          expect(checkoutPricingReturn.adjustment).toHaveBeenCalled();
          expect(checkoutPricingReturn.adjustment)
            .toHaveBeenCalledBefore(checkoutPricingReturn.currency);
        }, 10);
      });
    });
  });

  describe('Error handler', () => {
    it('should be passed to .catch', async () => {
      const handleError = jest.fn();
      const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }] };

      await act(async () => {
        await renderUseCheckoutPricing(initialInput, handleError);
        setTimeout(() => {
          expect(handleError).toHaveBeenCalled();
          expect(checkoutPricingReturn.catch).toHaveBeenCalled();
          expect(subscriptionPricingReturn.catch).toHaveBeenCalled();
        }, 10);
      });
    });
  });
});

function renderUseCheckoutPricing(initialInput, handleError) {
  const options = { wrapper: ({ children }) => withElements(children) };
  return renderHook(() => useCheckoutPricing(initialInput, handleError), options);
}
