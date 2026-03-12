import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Elements, RecurlyProvider, useRecurly } from '@recurly/react-recurly';

export function ApplePayDemo () {
  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY} api={process.env.REACT_APP_RECURLY_API}>
        <Elements>
          <ApplePayForm />
        </Elements>
      </RecurlyProvider>
    </div>
  );
}

function ApplePayForm () {
  const [fields, setFields] = useState({
    first_name: 'John',
    last_name: 'Smith',
    address1: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94117',
    country: 'US',
  });
  const [total] = useState('10.00');

  const { isReady, isSessionActive, begin } = useApplePay({ fields, total });

  function handleChange (name, value) {
    setFields(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div>
      <div>
        <input
          placeholder="First Name"
          value={fields.first_name}
          onChange={e => handleChange('first_name', e.target.value)}
        />
        <input
          placeholder="Last Name"
          value={fields.last_name}
          onChange={e => handleChange('last_name', e.target.value)}
        />
        <input
          placeholder="Country (e.g. US)"
          value={fields.country}
          onChange={e => handleChange('country', e.target.value)}
        />
        <input
          placeholder="Postal Code"
          value={fields.postal_code}
          onChange={e => handleChange('postal_code', e.target.value)}
        />
      </div>
      <div>
        {isReady
          ? <button
              className="apple-pay-button"
              type="button"
              disabled={isSessionActive}
              onClick={begin}
            />
          : <p>Apple Pay is not available on this device or browser.</p>
        }
      </div>
    </div>
  );
}

function useApplePay ({ fields, total }) {
  const recurly = useRecurly();
  const [isReady, setIsReady] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const applePayRef = useRef();

  useEffect(() => {
    const isSupportApplePay = window.ApplePaySession?.canMakePayments();
    if (!isSupportApplePay || applePayRef.current || !fields.country) return;

    const applePay = recurly.ApplePay({
      country: fields.country,
      currency: 'USD',
      label: 'Your merchant name',
      total: String(total),
      form: fields,
      callbacks: {
        onPaymentAuthorized: ({ payment }) => {
          setIsSessionActive(false);
          console.log('[apple-pay-token]', payment.recurlyToken.id);
        },
      },
    });

    applePayRef.current = applePay;
    applePay.on('ready', () => setIsReady(true));
    applePay.on('cancel', () => {
      console.log('[apple-pay-cancel]');
      setIsSessionActive(false);
    });
    applePay.on('error', error => console.log('[apple-pay-error]', error));

    return () => {
      applePayRef.current = undefined;
      applePay.off('ready');
      applePay.off('cancel');
      applePay.off('error');
    };
  }, [fields, total, recurly]);

  const begin = useCallback(() => {
    if (!isSessionActive) {
      applePayRef.current?.begin();
      setIsSessionActive(true);
    }
  }, [isSessionActive]);

  return { isReady, isSessionActive, begin };
}
