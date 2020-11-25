import React, { useRef } from 'react';

import {
  Elements,
  RecurlyProvider,
  CardElement,
  CardNumberElement,
  CardMonthElement,
  CardYearElement,
  CardCvvElement,
  RiskDataCollector,
  ThreeDSecureAction,
  useRecurly,
  useCheckoutPricing,
  CardElementChangeEvent,
  CardNumberElementChangeEvent,
  IndividualElementChangeEvent,
  UseCheckoutPricingInput
} from '@recurly/react-recurly';
import { RecurlyError } from '@recurly/recurly-js';

function TestComponent() {
  const recurly = useRecurly();
  const formRef = useRef<HTMLFormElement>();

  recurly.token(formRef.current as HTMLFormElement, (err, token) => {
    if (err) {
      // $ExpectType string
      err.classification;
      // $ExpectType string
      err.code;
      // $ExpectType string
      err.message;
    }
    // $ExpectType string
    token.id;
    // $ExpectType string
    token.type;
  });

  const commonElementProps = {
    onBlur: () => {},
    onFocus: () => {},
    onReady: () => {},
    onSubmit: () => {}
  };

  const cardElementProps = {
    ...commonElementProps,
    inputType: 'mobileSelect',
    displayIcon: true,
    style: {
      fontSize: '1em',
      placeholder: {
        color: 'gray !important',
        fontWeight: 'bold',
        content: {
          number: 'Card number',
          cvv: 'CVC'
        }
      },
      invalid: {
        fontColor: 'red'
      }
    },
    onChange: (e: CardElementChangeEvent) => {
      // $ExpectType boolean
      e.valid;
      // $ExpectType string
      e.firstSix;
      // $ExpectType string
      e.lastFour;
      // $ExpectType string
      e.brand;
      // $ExpectType boolean
      e.empty;
      // $ExpectType boolean
      e.focus;
    }
  };

  const elementProps = {
    ...commonElementProps,
    format: true,
    inputType: 'text',
    tabIndex: '1',
    style: {
      invalid: {},
      padding: '10px',
      placeholder: {
        color: 'red',
        content: 'content'
      }
    },
    onChange: (e: IndividualElementChangeEvent) => {
      // $ExpectType boolean
      e.empty;
      // $ExpectType number
      e.length;
      // $ExpectType boolean
      e.valid;
      // $ExpectType boolean
      e.focus;
    }
  };

  const CardNumberProps = {
    ...elementProps,
    onChange: (e: CardNumberElementChangeEvent) => {
      // $ExpectType boolean
      e.valid;
      // $ExpectType string
      e.firstSix;
      // $ExpectType string
      e.lastFour;
      // $ExpectType string
      e.brand;
      // $ExpectType number
      e.length;
      // $ExpectType boolean
      e.empty;
      // $ExpectType boolean
      e.focus;
    }
  };

  const checkoutPricingInput: UseCheckoutPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan',
        quantity: 3,
        addons: [{ code: 'item code', quantity: 5 }]
      }
    ],
    adjustments: [
      {
        itemCode: 'item-code',
        quantity: 3,
        currency: 'USD'
      },
      {
        id: 'id',
        amount: 10,
        quantity: 3,
        currency: 'USD',
        taxExempt: false,
        taxCode: 'tax-code',
      }
    ],
    currency: 'USD',
    address: {
      first_name: 'first',
      last_name: 'last',
      address1: 'address 1',
      address2: 'address 2',
      city: 'city',
      state: 'state',
      postal_code: 'postal code',
      country: 'US',
      phone: 'phone',
      vat_number: 'vat number'
    },
    giftCard: {
      code: 'gift-card-code'
    }
  };

  useCheckoutPricing(checkoutPricingInput);

  const [{ price, loading }, setPricing] = useCheckoutPricing(checkoutPricingInput, (e: RecurlyError) => {});

  setPricing(checkoutPricingInput);
  // $ExpectError
  setPricing();
  // $ExpectError
  setPricing({ ...checkoutPricingInput, fake: 'fake' });

  // $ExpectType boolean
  loading;
  // $ExpectType string
  price.now.items[0].addons;
  // $ExpectType string
  price.now.items[0].amount;
  // $ExpectType string
  price.now.items[0].id;
  // $ExpectType string
  price.now.items[0].plan;
  // $ExpectType string
  price.now.items[0].setupFee;
  // $ExpectType string
  price.now.items[0].type;
  // $ExpectType string
  price.now.subscriptions;
  // $ExpectType string
  price.now.adjustments;
  // $ExpectType string
  price.now.discount;
  // $ExpectType string
  price.now.subtotal;
  // $ExpectType string
  price.now.taxes;
  // $ExpectType string
  price.now.giftCard;
  // $ExpectType string
  price.now.total;
  // $ExpectType string
  price.next.items[0].addons;
  // $ExpectType string
  price.next.items[0].amount;
  // $ExpectType string
  price.next.items[0].id;
  // $ExpectType string
  price.next.items[0].plan;
  // $ExpectType string
  price.next.items[0].setupFee;
  // $ExpectType string
  price.next.items[0].type;
  // $ExpectType string
  price.next.subscriptions;
  // $ExpectType string
  price.next.adjustments;
  // $ExpectType string
  price.next.discount;
  // $ExpectType string
  price.next.subtotal;
  // $ExpectType string
  price.next.taxes;
  // $ExpectType string
  price.next.giftCard;
  // $ExpectType string
  price.next.total;
  // $ExpectType string
  price.currency.code;
  // $ExpectType string
  price.currency.symbol;
  // $ExpectType string
  price.taxes[0].rate;
  // $ExpectType string
  price.taxes[0].region;
  // $ExpectType string
  price.taxes[0].tax_type;

  return (
    <RecurlyProvider publicKey='my-public-key'>
      <Elements onSubmit={() => {}}>
        <CardElement {...cardElementProps} />
        <CardNumberElement {...CardNumberProps} />
        <CardMonthElement {...elementProps} />
        <CardYearElement {...elementProps} />
        <CardCvvElement {...elementProps} />
      </Elements>
      <RiskDataCollector
        id="test-risk-id"
        className="test-risk-class"
        strategy="kount"
        onError={() => {}}
      />
      <ThreeDSecureAction
        id="test-threeds-id"
        className="test-threeds-class"
        onToken={() => {}}
        onError={() => {}}
      />
    </RecurlyProvider>
  );
}
