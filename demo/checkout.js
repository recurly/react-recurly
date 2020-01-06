import React from 'react';
import { Elements, ThreeDSecureAction } from '../lib/index';
import CardForm from './card-form';
import CardMultiForm from './card-multi-form';
import CheckoutPricing from './checkout-pricing';

export default class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
      actionTokenId: '',
    };

    this.handleChangeFontSize = event => this.setState({ elementFontSize: `${event.target.value}px` });
    this.handleChangeActionToken = event => this.setState({ actionTokenId: event.target.value });
    this.handleThreeDSecureToken = token => console.log(`[three-d-secure-action-result-token]: ${token.id}`);
  }

  render() {
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
          {actionTokenId ? (
            <ThreeDSecureAction
              actionTokenId={actionTokenId}
              onToken={this.handleThreeDSecureToken}
              className="recurly-three-d-secure-action"
            />
          ) : null}
        </div>
        <div>
          <input type="text" placeholder="ThreeDSecureActionTokenId" onChange={this.handleChangeActionToken} />
        </div>

        <div>
          <label htmlFor="element-font-size">font size </label>
          <input
            id="element-font-size"
            type="range"
            value={elementFontSize}
            onChange={this.handleChangeFontSize}
            min="0"
            max="32"
          />
          {elementFontSize}
        </div>
      </div>
    );
  }
}
