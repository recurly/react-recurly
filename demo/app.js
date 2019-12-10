import React, { useState } from 'react';

import {
  RecurlyProvider,
  useRecurly,
  Elements,
  CardElement,
  CardNumberElement,
  CardMonthElement,
  CardYearElement,
  CardCvvElement,
  ThreeDSecureAction,
  useCheckoutPricing
} from '../lib/index';

const handleBlur = () => console.log('[blur]');
const handleChange = (change) => console.log('[change]', change);
const handleClick = () => console.log('[click]');
const handleFocus = () => console.log('[focus]');
const handleReady = () => console.log('[ready]');

const createOptions = (fontSize, placeholder) => {
  return {
    style: {
      fontSize,
      placeholder: {
        content: placeholder,
        color: '#a3a3a7'
      }
    }
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
      <h2>Card Element</h2>
      <form onSubmit={handleSubmit} ref={form}>
        <div>
          <input data-recurly="first_name" placeholder="First Name" defaultValue="John"></input>
          <input data-recurly="last_name" placeholder="Last Name" defaultValue="Rambo"></input>
          <input data-recurly="postal_code" placeholder="Postal Code" defaultValue="94117"></input>
        </div>
        <CardElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          onSubmit={handleSubmit}
          {...createOptions(props.fontSize)}
        />
        <div>
          <button>Pay</button>
        </div>
      </form>
    </div>
  );
}

function CardMultiForm (props) {
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
          <input data-recurly="first_name" placeholder="First Name" defaultValue="John"></input>
          <input data-recurly="last_name" placeholder="Last Name" defaultValue="Rambo"></input>
          <input data-recurly="postal_code" placeholder="Postal Code" defaultValue="94117"></input>
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

function CheckoutPricing() {
  const [plan, setPlan] = useState("basic");
  const [coupon, setCoupon] = useState("");
  const [giftCard, setGiftCard] = useState("");
  const [recurlyError, setRecurlyError] = useState(null);
  const [pricing, updatePricingInputs] = useCheckoutPricing({plan}, setRecurlyError);

  function updatePlan(e) {
    setRecurlyError(null);
    const plan = e.target.value;
    setPlan(plan);
    updatePricingInputs({plan});
    // updatePricingInputs(inputs => ({...inputs, plan}))
  }

  function updatePricing(e) {
    setRecurlyError(null);
    e.preventDefault();
    updatePricingInputs({coupon, giftCard});
  }

  return <div className="Checkout">
    <h2>Distinct Card Elements</h2>
    <div className="panel" style={{marginBottom: "30px"}}>
      <select id="plan" value={plan} onChange={updatePlan}>
        <option value="basic">Basic</option>
        <option value="advanced">Advanced</option>
      </select>
      <form onSubmit={updatePricing} >
        <label>
          Coupon
          <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} />
        </label>
        <label>
          Gift card
          <input type="text" value={giftCard} onChange={e => setGiftCard(e.target.value)} />
        </label>
        <button>Calculate subtotal</button>
      </form>
      <div style={{marginTop: "15px"}}>
        {recurlyError ? <span style={{color: "red"}}>{recurlyError.message}</span> : `Subtotal: ${pricing.now && pricing.now.subtotal || ""}`}
      </div>
    </div>
  </div>
}

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
      actionTokenId: ''
    };

    this.handleChangeFontSize = event => this.setState({ elementFontSize: `${event.target.value}px` });
    this.handleChangeActionToken = event => this.setState({ actionTokenId: event.target.value });
    this.handleThreeDSecureToken = token => console.log(`[three-d-secure-action-result-token]: ${token.id}`);
  }

  render () {
    const { elementFontSize, actionTokenId } = this.state;
    return (
      <div>
        <Elements>
          <CardForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <CardMultiForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <CheckoutPricing />
        </Elements>
        <div>
          {
            actionTokenId
              ?
                <ThreeDSecureAction
                  actionTokenId={actionTokenId}
                  onToken={this.handleThreeDSecureToken}
                  className="recurly-three-d-secure-action"
                />
              : ''
          }
        </div>
        <div>
          <input type="text" placeholder="ThreeDSecureActionTokenId" onChange={this.handleChangeActionToken}></input>
        </div>

        <div>
          <label htmlFor="element-font-size">font size </label>
          <input
            id="element-font-size"
            type="range"
            defaultValue={elementFontSize}
            onChange={this.handleChangeFontSize}
            min="0"
            max="32"
          ></input>
          {elementFontSize}
        </div>
      </div>
    );
  }
}

export default function App () {
  return (
    <div>
      <h1>react-recurly demo</h1>
      <RecurlyProvider publicKey="dev-hxy3uuUxjhBrFrxU0C47aH" api="https://api.lvh.me:3000/js/v1">
        <Checkout />
      </RecurlyProvider>
    </div>
  );
};
