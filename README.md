<img src="https://i.imgur.com/gGxJ8zx.png" align="right" />

# react-recurly &middot; [![build status][travis-image]][travis-url] [![coverage][coverage-image]][coverage-url] [![contributor covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)


React components for [Recurly.js][docs-recurly-js]

## Documentation

[Documentation & Reference][docs]

[Recurly.js Documentation][docs-recurly-js]

## Examples

[Interactive Demo][demo]

A great way to get started is to try the [interactive demo][demo] in our documentation, and look through the [demo source][demo-src] on GitHub.

## Installation

Install this package with npm

```bash
npm install @recurly/react-recurly
```

Then, include recurly.js in your application via our CDN.

```html
<script src="https://js.recurly.com/v4/recurly.js"></script>
<!-- optional: include recurly.css -->
<link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css">
```

## Implementation Guide

In this guide, we will cover the steps necessary to **create a payment form** that will submit your user's payment information to Recurly.

> ℹ️ If you haven't yet, please review the [Recurly.js documentation][docs-recurly-js]. This will give you a solid understanding of the total capabilities of the library before we begin implementing some of its features in React.

To start, we will use the [&lt;RecurlyProvider />][docs-component-recurly-provider] component to set our [public key][app-api-access].

```jsx
// app.js
import React from 'react';
import { RecurlyProvider } from '@recurly/react-recurly';

function App () {
  return (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY" />
  );
}
```

Now we can set up our payment form. For this, we will use [Recurly.js Elements][docs-recurly-js-elements]. First, we will use the [&lt;Elements />][docs-component-elements] component to group our Elements together. We'll also create a `<MyPaymentForm />` component to contain our payment form.

```jsx
// app.js
import React from 'react';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { MyPaymentForm } from './my-payment-form';

function App () {
  return (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY">
      <Elements>
        <MyPaymentForm />
      </Elements>
    </RecurlyProvider>
  );
}
```

Within our new `<MyPaymentForm />` component, we'll add a [&lt;CardElement />][docs-component-card-element] which will render a secure card element. We'll also add inputs for our users' name. To let react-recurly know that we want to use these fields, we'll use a `data-recurly` attribute. To include additional properties, see [this billing fields table][docs-recurly-js-billing-fields].

```jsx
// my-payment-form.js
import React from 'react';
import { CardElement } from '@recurly/react-recurly';

export function MyPaymentForm (props) {
  return (
    <form>
      <input type="text" data-recurly="first_name" placeholder="First name" />
      <input type="text" data-recurly="last_name" placeholder="Last name" />
      <CardElement />
    </form>
  );
}
```

We are now ready to add the final step: **getting a token**. When our users submit our form, we want to send their payment information to Recurly, which will return a token. We'll then keep this token to use in the Recurly API.

To accomplish this, we will use the [useRecurly][docs-hook-use-recurly] hook. This hook returns a Recurly.js instance, on which we will call [recurly.token][docs-recurly-js-token]. Since this function expects a `<form>`, we will create a [React ref](react-refs) to pass to it.

```jsx
// my-payment-form.js
import React from 'react';
import { CardElement, useRecurly } from '@recurly/react-recurly';

export function MyPaymentForm (props) {
  const formRef = React.useRef();
  const recurly = useRecurly();

  function handleSubmit (event) {
    event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) {
        // handle error
      } else {
        // save the token.id, and submit it to the Recurly API from your server
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="text" data-recurly="first_name" placeholder="First name" />
      <input type="text" data-recurly="last_name" placeholder="Last name" />
      <CardElement />
    </form>
  );
}
```

With that, we have implemented the essential components of a payment form using react-recurly. The tokens generated above may be used on any `billing_info` object in the [Recurly API][docs-recurly-api].

### Additional Usage

React-recurly also includes a [useCheckoutPricing][docs-hook-use-checkout-pricing] hook for generating a pricing preview before checking out.

```js
import { useCheckoutPricing, RecurlyProvider } from '@recurly/react-recurly';

function PricingPreview () {
  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ price, loading }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  if (!loading) {
    return <div>{price.now.subtotal}</div>
  };
};

export default function MyApp () {
  <RecurlyProvider>
    <PricingPreview />
  </RecurlyProvider>
};
```

For more details, see the [useCheckoutPricing Documentation][docs-hook-use-checkout-pricing].

## Additional resources

* [Documentation & Reference][docs]
* [Recurly.js Documentation][docs-recurly-js]
* [Interactive Demo][demo]
* [Code on GitHub][github]
* [Package on npm][npm]
* [Recurly API Documentation][docs-recurly-api]
* Questions? [GitHub issues][github-issues] and [Recurly support][support] are here for you.

## Licence

MIT

[github]: https://github.com/recurly/react-recurly
[github-issues]: https://github.com/recurly/react-recurly/issues
[npm]: https://www.npmjs.com/package/@recurly/react-recurly
[travis-url]: https://travis-ci.org/recurly/react-recurly/builds
[travis-image]: https://img.shields.io/travis/recurly/react-recurly/main.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/recurly/react-recurly
[coverage-image]: https://img.shields.io/coveralls/github/recurly/react-recurly.svg?style=flat-square

[docs]: https://recurly.github.io/react-recurly
[docs-component-recurly-provider]: https://recurly.github.io/react-recurly/?path=/docs/components-recurlyprovider--page
[docs-component-elements]: https://recurly.github.io/react-recurly/?path=/docs/components-elements--page
[docs-component-card-element]: https://recurly.github.io/react-recurly/?path=/docs/components-cardelement--default
[docs-hook-use-recurly]: https://recurly.github.io/react-recurly/?path=/docs/hooks-userecurly--page
[docs-hook-use-checkout-pricing]: https://recurly.github.io/react-recurly/?path=/docs/hooks-usecheckoutpricing--page

[docs-recurly-js]: https://developers.recurly.com/reference/recurly-js/
[docs-recurly-js-elements]: https://developers.recurly.com/reference/recurly-js/#elements
[docs-recurly-js-billing-fields]: https://developers.recurly.com/reference/recurly-js/#billing-fields
[docs-recurly-js-token]: https://developers.recurly.com/reference/recurly-js/#getting-a-token
[docs-recurly-api]: https://developers.recurly.com/api

[demo]: https://recurly.github.io/react-recurly/?path=/docs/introduction-interactive-demo--page
[demo-src]: https://github.com/recurly/react-recurly/tree/main/demo
[card-element-demo.js]: https://github.com/recurly/react-recurly/demo/src/card-element-demo.js

[app-api-access]: https://app.recurly.com/go/developer/api_access
[support]: https://recurly.zendesk.com

[react-refs]: https://reactjs.org/docs/refs-and-the-dom.html
