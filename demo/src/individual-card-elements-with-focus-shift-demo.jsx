import React, { useState } from 'react';

import {
  CardNumberElement,
  CardMonthElement,
  CardYearElement,
  CardCvvElement,
  Elements,
  RecurlyProvider,
  useRecurly
} from '@recurly/react-recurly';

export function IndividualCardElementsWithFocusShiftDemo (props) {
  const [fontSize, setFontSize] = useState('18');

  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY}>
        <Elements>
          <CardForm />
        </Elements>
      </RecurlyProvider>
    </div>
  );
}

export function CardForm (props) {
  const {
    fontSize,
    handleBlur,
    handleFocus,
    handleReady
  } = props;
  const formRef = React.useRef();
  const recurly = useRecurly();

  const handleSubmit = event => {
    if (event.preventDefault) event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) console.log('[error]', err);
      else console.log('[token]', token);
    });
  };

  const cardNumberElement = React.useRef();
  const cardMonthElement = React.useRef();
  const cardYearElement = React.useRef();
  const cardCvvElement = React.useRef();

  // Move focus based on detection of inputs having been deemed complete

  // Store the input lengths
  let cardNumberElementLengthWas = 0;
  let cardMonthElementLengthWas = 0;
  let cardYearElementLengthWas = 0;
  let cardCvvElementLengthWas = 0;

  function handleCardNumberChange ({ brand, length }) {
    if (brand === 'american_express' && length === 15 && cardNumberElementLengthWas !== 15) {
      cardMonthElement.current._element.focus();
    } else if (brand !== 'american_express' && length === 16 && cardNumberElementLengthWas !== 16) {
      cardMonthElement.current._element.focus();
    }
    cardNumberElementLengthWas = length;
  }

  function handleCardMonthChange ({ length }) {
    if (length === 2 && cardMonthElementLengthWas !== 2) {
      cardYearElement.current._element.focus();
    }
    cardMonthElementLengthWas = length;
  }

  function handleCardYearChange ({ length }) {
    if (length === 2 && cardYearElementLengthWas !== 2) {
      cardCvvElement.current._element.focus();
    }
    cardYearElementLengthWas = length;
  }

  function handleCardCvvChange ({ length }) {
    const { brand } = cardNumberElement.current._element && cardNumberElement.current._element.state;
    if (brand === 'american_express' && length === 4 && cardCvvElementLengthWas !== 4) {
      // Move focus to another following ref if one were to exist
    } else if (brand !== 'american_express' && length === 3 && cardCvvElementLengthWas !== 3) {
      // Move focus to another following ref if one were to exist
    }
    cardCvvElementLengthWas = length;
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
