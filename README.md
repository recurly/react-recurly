# react-recurly

*React components for Recurly.js*

## Demo

See the [demo](demo) directory.

These examples provide a quick start to using `react-recurly`. The [card-element-demo](demo/demos/card-element-demo.js) is a great place to begin seeing how you might structure your own payment form components.

1. `make demo`
2. [https://localhost:8040](https://localhost:8040)

## Getting Started

If you haven't yet, please review the [Recurly.js documentation](https://developers.recurly.com/reference/recurly-js/). This will give you a solid understanding of the total capabilities of the library before we begin implementing some of its features in React. Now let's begin!

First, install this package

```bash
npm install @recurly/react-recurly
```

Then, include recurly.js in your application via our CDN.

```html
<script src="https://js.recurly.com/v4/recurly.js"></script>
<!-- optional: include recurly.css -->
<link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css">
```

From here, you will structure your React application's checkout components in the following manner. We will go into more detail on each component below.

## Simplest Implementation

```jsx
import React from 'react';
import { CardElement, Elements, RecurlyProvider, useRecurly } from 'react-recurly';
import { render } from 'react-dom';

const App = () => {
  return (
    <RecurlyProvider publicKey="ewr1-abcdefghijklmno">
      <Elements>
        <CardForm />
      </Elements>
    </RecurlyProvider>
  );
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
    <form onSubmit={handleSubmit} ref={form}>
      <input type="text" data-recurly="first_name" defaultValue="John" />
      <input type="text" data-recurly="last_name" defaultValue="Rambo" />
      <CardElement onSubmit={handleSubmit} />
      <button>Submit</button>
    </form>
  );
}

render(<App />, document.querySelector('.App'));
```

### RecurlyProvider

This component accepts your `publicKey` as a prop. It is responsible for creating a `recurly` instance on which we will generate tokens. This should wrap any other `react-recurly` component you will use.

*`index.js`*
```jsx
import React from 'react';
import { RecurlyProvider } from 'react-recurly';
import { render } from 'react-dom';

import MyCardForm from './my-card-form';

const App = () => {
  return (
    <RecurlyProvider publicKey="ewr1-abcdefghijklmno">
      <MyCardForm />
    </RecurlyProvider>
  );
};

render(<App />, document.querySelector('.App'));
```

### Elements

This component groups `Element` components together. When generating tokens, it is used to determine which values will be tokenized. This should wrap your checkout form.

*`index.js`*
```jsx
import React from 'react';
import { Elements, RecurlyProvider } from 'react-recurly';
import { render } from 'react-dom';

import MyCardForm from './my-card-form';

const App = () => {
  return (
    <RecurlyProvider publicKey="ewr1-abcdefghijklmno">
      <Elements>
        <MyCardForm />
      </Elements>
    </RecurlyProvider>
  );
};

render(<App />, document.querySelector('.App'));
```

### CardElement

This component renders a [Card Element](https://developers.recurly.com/reference/recurly-js/#the-card-element). Your users will enter their card information (number, expiry, and cvv) here.

*`my-card-form.js`*
```jsx
import React from 'react';
import { CardElement } from 'react-recurly';

export function MyCardForm (props) {
  return (
    <form>
      <input type="text" data-recurly="first_name" />
      <input type="text" data-recurly="last_name" />
      <CardElement />
    </form>
  );
}
```

### CardNumberElement, CardMonthElement, CardYearElement, CardCvvElement

If the `CardElement` does not suit your design needs, you may alternatively use individual card fields.

### Getting a token: `useRecurly`

Use the `useRecurly` hook to generate a token! When your user submits your checkout form, this hook is used to submit their card information securely to Recurly, generate a token, and return that token to you. You will then send this token to your server, and [use it in the Recurly API](https://developers.recurly.com/reference/recurly-js/#using-a-token) to store or charge your customer's credit card.

`useRecurly` will return a `recurly` instance on which you will call `recurly.token`. You will create a ref to your form using [`React.createRef`](https://reactjs.org/docs/refs-and-the-dom.html), and pass this to `recurly.token`.

*`my-card-form.js`*
```jsx
import React from 'react';
import { CardElement, useRecurly } from 'react-recurly';

export function MyCardForm (props) {
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
    <form onSubmit={handleSubmit} ref={form}>
      <input type="text" data-recurly="first_name" />
      <input type="text" data-recurly="last_name" />
      <CardElement onSubmit={handleSubmit} />
      <button>Submit</button>
    </form>
  );
}
```
