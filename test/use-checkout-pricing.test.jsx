import { act, renderHook, waitFor } from '@testing-library/react';
import { withElements } from './support/helpers';

import useCheckoutPricing, { throwError } from '../lib/use-checkout-pricing';

describe('useCheckoutPricing', function () {
  const { Recurly } = window.recurly;

  const renderUseCheckoutPricing = (initialInput, handleError) => {
    const options = { wrapper: ({ children }) => withElements(children) };
    return renderHook(() => useCheckoutPricing(initialInput, handleError), options);
  };

  beforeEach(() => {
    jest.clearAllMocks();

    window.recurly.Recurly = () => new Recurly({
      publicKey: 'Public key',
      api: `http://localhost:${process.env.PORT || 9877}`
    });
  });

  describe('loading', () => {
    it('should be true initially, then false after initial pricingPromise resolves', async () => {
      const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }] };
      const { result } = renderUseCheckoutPricing(initialInput);

      expect(result.current[0].loading).toBe(true);

      await waitFor(() => expect(result.current[0].loading).toBe(false));
    });

    it('should be true when setPricing is called, then false after initial pricingPromise resolves', async () => {
      const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }] };
      const { result } = renderUseCheckoutPricing(initialInput);

      expect(result.current[0].loading).toBe(true);

      act(() => {
        result.current[1]({ subscriptions: [{ plan: 'basic-2', quantity: 3 }] });
      });

      await expect(result.current[0].loading).toBe(true);
      await waitFor(() => expect(result.current[0].loading).toBe(false));
    });
  });

  describe('setPricing', () => {
    it('should update output', async () => {
      const initialInput = { subscriptions: [{ plan: 'basic', quantity: 2 }] };
      const { result } = renderUseCheckoutPricing(initialInput);

      await waitFor(() => expect(result.current[0].price.next.total).toBe('39.98'));

      act(() => {
        result.current[1]({ subscriptions: [{ plan: 'basic-2', quantity: 3 }] });
      });

      expect(result.current[0].loading).toBe(true);

      await waitFor(() => {
        expect(result.current[0].price.next.total).toBe('270.27');
        expect(result.current[0].loading).toBe(false);
      });
    });
  });

  describe('calculates price total when given', () => {
    test('a subscription with a plan and quantity', async () => {
      const { result } = renderUseCheckoutPricing({
        subscriptions: [{ plan: 'basic-2', quantity: 2 }]
      });

      await waitFor(() => {
        const [{ price }] = result.current;
        expect(price.next.total).toBe('180.18');
      });
    });

    test('a subscription with addons', async () => {
      const { result } = renderUseCheckoutPricing({
        subscriptions: [{
          plan: 'basic',
          addons: [{ code: 'snarf', quantity: 5 }]
        }]
      });

      await waitFor(() => {
        const [{ price }] = result.current;
        expect(price.next.total).toBe('24.99');
      });
    });

    test('a subscription with tax', async () => {
      const { result } = renderUseCheckoutPricing({
        subscriptions: [{
          plan: 'basic',
          tax: [{ code: 'physical-goods', amounts: { now: '2.00', next: '0.00' } }]
        }]
      });

      await waitFor(() => {
        const [{ price }] = result.current;
        expect(price.now.total).toBe('21.99');
        expect(price.next.total).toBe('19.99');
      });
    });

    test('a currency and a subscription, then an updated currency', async () => {
      const { result } = renderUseCheckoutPricing({
        currency: 'EUR',
        subscriptions: [{
          plan: 'multiple-currencies',
          quantity: 1
        }]
      });

      await waitFor(() => {
        expect(result.current[0].price.next.total).toBe('19.99');
        expect(result.current[0].price.currency.code).toBe('EUR');
      });

      act(() => {
        result.current[1](prev => ({ ...prev, currency: 'USD' }));
      });

      await waitFor(() => {
        expect(result.current[0].price.next.total).toBe('19.99');
        expect(result.current[0].price.currency.code).toBe('USD');
      });
    });

    test('an item adjustment', async () => {
      const { result } = renderUseCheckoutPricing({
        adjustments: [{ itemCode: 'basic-item', quantity: 2 }]
      });

      await waitFor(() => {
        const [{ price }] = result.current;
        expect(price.now.total).toBe('80.00');
      });
    });
  });

  it('should call handleError if a promise is rejected', async () => {
    const handleError = jest.fn();

    renderUseCheckoutPricing({
      subscriptions: [{ plan: 'invalid' }]
    }, handleError);

    await waitFor(() => expect(handleError).toHaveBeenCalledWith({
      name: 'api-error',
      code: 'not-found',
      message: `Couldn't find Plan with plan_code = invalid`
    }));
  });

  describe('default handleError', () => {
    it('should throw an error', () => {
      expect(throwError).toThrow();
    });
  });
});
