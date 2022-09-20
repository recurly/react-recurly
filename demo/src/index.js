/**
 * @recurly/react-recurly-demo
 *
 * This demo is designed to help you structure a React app using react-recurly
 *
 * 1. Take a look at the .env file. This file contains the public key this app
 *    will use to configure recurly.js. Set the value of `RECURLY_PUBLIC_KEY` to your own
 *    Recurly public key (https://app.recurly.com/go/developer/api_access)
 *
 * The `App` component in this file simply organizes the demos. If you're getting
 * started, have a look at src/card-element-demo.js
 */

import React from 'react';
import { render } from 'react-dom';

import { CardElementDemo } from './card-element-demo';
import { IndividualCardElementsDemo } from './individual-card-elements-demo';
import { ThreeDSecureDemo } from './three-d-secure-demo';
import { CheckoutPricing } from './checkout-pricing';
import { IndividualCardElementsWithFocusShiftDemo } from './individual-card-elements-with-focus-shift-demo';

function App () {
  return (
    <div>
      <h1>react-recurly demo</h1>

      <h2>Card Element</h2>
      <CardElementDemo />

      <h2>Individual Card Elements</h2>
      <IndividualCardElementsDemo />

      <h2>3D Secure</h2>
      <ThreeDSecureDemo />

      <h2>Checkout Pricing</h2>
      <CheckoutPricing />

      <h2>Individual Card Elements</h2>
      <h3>With smart focus shifting</h3>
      <IndividualCardElementsWithFocusShiftDemo />
    </div>
  );
};

render(<App />, document.querySelector('.App'));
