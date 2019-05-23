# react-recurly

*This documentation is strictly for in-development notation and does not reflect the final intent of a README*

## Demo

1. `make demo`
2. [https://localhost:8040](https://localhost:8040)

## Simplest Implementation

```jsx
import React from 'react';
import { CardElement, Elements, RecurlyProvider, useRecurly } from 'react-recurly';
import { render } from 'react-dom';

const App = () => {
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
    <div>
      <RecurlyProvider publicKey="ewr1-abcdefghijklmno">
        <Elements>
          <form onSubmit={handleSubmit} ref={form}>
            <CardElement onSubmit={handleSubmit} />
            <button>Submit</button>
          </form>
        </Elements>
      </RecurlyProvider>
    </div>
  );
};

render(<App />, document.querySelector('.App'));
```
