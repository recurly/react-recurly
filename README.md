# react-recurly

*This documentation is strictly for in-development notation and does not reflect the final intent of a README*

## Demo

1. `make demo`
2. [https://localhost:8040](https://localhost:8040)

## Simplest Implementation

```jsx
import React from 'react';
import {render} from 'react-dom';
import {RecurlyProvider, Fields, CardField, injectRecurly} from 'react-recurly';

class Checkout extends React.component {
  handleSubmit (event) {
    event.preventDefault();
    this.props.recurly
      .token()
      .then(token => console.log('token:', token.id));
  }

  render () {
    <RecurlyProvider publicKey="ewr1-zfJT5nPe1qW7jihI32LIRH">
      <Fields>
        <form onSubmit={this.handleSubmit}>
          <CardField />
          <button>Submit</button>
        </form>
      </Fields>
    </RecurlyProvider>
  }
}

const App = injectRecurly(Checkout);

render(<App />, document.querySelector('.App'));
```
