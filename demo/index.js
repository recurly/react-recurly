import React from 'react';
import {render} from 'react-dom';

import {
  CardElement,
  CardNumberElement,
  CardMonthElement,
  CardYearElement,
  CardCVVElement,
  RecurlyProvider,
  Elements,
  useRecurly
} from '../lib/index';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        placeholder: {
          color: '#aab7c4'
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: '#9e2146'
      },
    },
  };
};

function CardForm (props) {
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
      <form onSubmit={handleSubmit} ref={form}>
        <div>
          First & Last Name
          <br />
          <input data-recurly="first_name" placeholder="First Name" defaultValue="John"></input>
          <input data-recurly="last_name" placeholder="Last Name" defaultValue="Rambo"></input>
          <br />
          Postal Code
          <br />
          <input data-recurly="postal_code" placeholder="Postal Code" defaultValue="94117"></input>
        </div>
        <label>
          Card Element
          <br />
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            onSubmit={handleSubmit}
            {...createOptions(props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    </div>
  );
}

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };

    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }

  render () {
    const { elementFontSize } = this.state;
    return (
      <Elements>
        <CardForm fontSize={elementFontSize} />
      </Elements>
    );
  }
}

const App = () => {
  return (
    <RecurlyProvider publicKey="dev-AUlPEVJpUXOM7bO3rf5VzS" api="https://api.lvh.me:3000/js/v1">
      <Checkout />
    </RecurlyProvider>
  );
};

render(<App />, document.querySelector('.App'));
