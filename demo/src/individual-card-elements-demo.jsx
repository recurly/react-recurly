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

const handleBlur = () => console.log('[blur]');
const handleChange = change => console.log('[change]', change);
const handleFocus = () => console.log('[focus]');
const handleReady = () => console.log('[ready]');

export function IndividualCardElementsDemo (props) {
  const [fontSize, setFontSize] = useState('18');

  const handleChangeFontSize = event => setFontSize(event.target.value);

  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY}>
        <Elements>
          <CardForm fontSize={`${fontSize}px`} />
        </Elements>
      </RecurlyProvider>

      <div>
        <label htmlFor="element-font-size-indiv-card-demo">font size</label>
        <input
          id="element-font-size-indiv-card-demo"
          type="range"
          value={fontSize}
          onChange={handleChangeFontSize}
          min="0"
          max="32"
        />
        {fontSize}px
      </div>
    </div>
  );
}

function CardForm (props) {
  const { fontSize } = props;
  const recurly = useRecurly();
  const formRef = React.useRef();

  const handleSubmit = event => {
    if (event.preventDefault) event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) console.log('[error]', err);
      else console.log('[token]', token);
    });
  };

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
        onChange={handleChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "Card number" } }}
      />
      <CardMonthElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "MM" } }}
      />
      <CardYearElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "YY" } }}
      />
      <CardCvvElement
        className="recurly-element-inline"
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onReady={handleReady}
        onSubmit={handleSubmit}
        style={{ fontSize, placeholder: { content: "CVV" } }}
      />
      <div>
        <button>Pay</button>
      </div>
    </form>
  );
}
