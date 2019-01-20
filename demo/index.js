import React from 'react';
import {render} from 'react-dom';

import {
  CardField,
  // CardNumberField,
  // CardExpiryField,
  // CardCVCField,
  RecurlyProvider,
  Fields,
  injectRecurly
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

class _CardForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.recurly
      .token()
      .then(payload => console.log('[token]', payload));
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card Field
          {/*<CardField
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />*/}
        </label>
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectRecurly(_CardForm);

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      fieldFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };

    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.fieldFontSize !== '14px') {
        this.setState({ fieldFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.fieldFontSize !== '18px'
      ) {
        this.setState({ fieldFontSize: '18px' });
      }
    });
  }

  render() {
    const {fieldFontSize} = this.state;
    return (
      <div className="Checkout">
        <h1>Fields</h1>
        <Fields>
          <CardForm fontSize={fieldFontSize} />
        </Fields>
      </div>
    );
  }
}

const App = () => {
  return (
    <RecurlyProvider publicKey="ewr1-zfJT5nPe1qW7jihI32LIRH">
      <Checkout />
    </RecurlyProvider>
  );
};

render(<App />, document.querySelector('.App'));
