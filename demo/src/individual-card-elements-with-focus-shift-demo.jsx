import React, { useRef } from 'react';

import {
  CardNumberElement,
  CardMonthElement,
  CardYearElement,
  CardCvvElement,
  Elements,
  RecurlyProvider,
  useRecurly
} from '@recurly/react-recurly';

export function IndividualCardElementsWithFocusShiftDemo () {
  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY} api={process.env.REACT_APP_RECURLY_API}>
        <Elements>
          <CardForm />
        </Elements>
      </RecurlyProvider>
    </div>
  );
}

export function CardForm ({ fontSize, handleBlur, handleFocus, handleReady }) {
  const formRef = useRef();
  const recurly = useRecurly();

  const handleSubmit = event => {
    event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) console.log('[error]', err);
      else console.log('[token]', token);
    });
  };

  const cardNumberElement = useRef();
  const cardMonthElement = useRef();
  const cardYearElement = useRef();
  const cardCvvElement = useRef();

  // Track previous lengths to detect when fields become complete
  const cardNumberLengthWas = useRef(0);
  const cardMonthLengthWas = useRef(0);
  const cardYearLengthWas = useRef(0);
  const cardCvvLengthWas = useRef(0);

  function handleCardNumberChange ({ brand, length }) {
    if (brand === 'american_express' && length === 15 && cardNumberLengthWas.current !== 15) {
      cardMonthElement.current._element.focus();
    } else if (brand !== 'american_express' && length === 16 && cardNumberLengthWas.current !== 16) {
      cardMonthElement.current._element.focus();
    }
    cardNumberLengthWas.current = length;
  }

  function handleCardMonthChange ({ length }) {
    if (length === 2 && cardMonthLengthWas.current !== 2) {
      cardYearElement.current._element.focus();
    }
    cardMonthLengthWas.current = length;
  }

  function handleCardYearChange ({ length }) {
    if (length === 2 && cardYearLengthWas.current !== 2) {
      cardCvvElement.current._element.focus();
    }
    cardYearLengthWas.current = length;
  }

  function handleCardCvvChange ({ length }) {
    const { brand } = cardNumberElement.current._element && cardNumberElement.current._element.state;
    if (brand === 'american_express' && length === 4 && cardCvvLengthWas.current !== 4) {
      // Move focus to another following ref if one were to exist
    } else if (brand !== 'american_express' && length === 3 && cardCvvLengthWas.current !== 3) {
      // Move focus to another following ref if one were to exist
    }
    cardCvvLengthWas.current = length;
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div>
        <input
          data-recurly="first_name"
          placeholder="First Name"
          defaultValue="John"
        />
        <input
          data-recurly="last_name"
          placeholder="Last Name"
          defaultValue="Smith"
        />
        <input
          data-recurly="postal_code"
          placeholder="Postal Code"
          defaultValue="94117"
        />
      </div>
      <CardNumberElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleCardNumberChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "Card number" } }}
        ref={cardNumberElement}
      />
      <CardMonthElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleCardMonthChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "MM" } }}
        ref={cardMonthElement}
      />
      <CardYearElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleCardYearChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "YY" } }}
        ref={cardYearElement}
      />
      <CardCvvElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleCardCvvChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "CVV" } }}
        ref={cardCvvElement}
      />
      <div>
        <button>Pay</button>
      </div>
    </form>
  );
}
