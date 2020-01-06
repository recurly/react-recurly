import React from 'react';
import { CardCvvElement, CardMonthElement, CardNumberElement, CardYearElement, useRecurly } from '../lib/index';

const handleBlur = () => console.log('[blur]');
const handleChange = change => console.log('[change]', change);
const handleClick = () => console.log('[click]');
const handleFocus = () => console.log('[focus]');
const handleReady = () => console.log('[ready]');

const createOptions = (fontSize, placeholder) => {
  return {
    style: {
      fontSize,
      placeholder: {
        content: placeholder,
        color: '#a3a3a7',
      },
    },
  };
};

export default function CardMultiForm(props) {
  const recurly = useRecurly();
  let form = React.createRef();

  const handleSubmit = event => {
    if (event.preventDefault) event.preventDefault();
    recurly.token(form.current, (err, token) => {
      if (err) console.log('[error]', err);
      else console.log('[token]', token);
    });
  };

  return (
    <div className="Checkout">
      <h2>Distinct Card Elements</h2>
      <form onSubmit={handleSubmit} ref={form}>
        <div>
          <input data-recurly="first_name" placeholder="First Name" defaultValue="John" />
          <input data-recurly="last_name" placeholder="Last Name" defaultValue="Rambo" />
          <input data-recurly="postal_code" placeholder="Postal Code" defaultValue="94117" />
        </div>
        <CardNumberElement
          className="recurly-element-inline"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          onSubmit={handleSubmit}
          {...createOptions(props.fontSize, 'Card number')}
        />
        <CardMonthElement
          className="recurly-element-inline"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          onSubmit={handleSubmit}
          {...createOptions(props.fontSize, 'MM')}
        />
        <CardYearElement
          className="recurly-element-inline"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          onSubmit={handleSubmit}
          {...createOptions(props.fontSize, 'YY')}
        />
        <CardCvvElement
          className="recurly-element-inline"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          onSubmit={handleSubmit}
          {...createOptions(props.fontSize, 'CVV')}
        />
        <div>
          <button>Pay</button>
        </div>
      </form>
    </div>
  );
}
