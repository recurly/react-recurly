import React from 'react';
import { RecurlyProvider } from '../lib/index';
import Checkout from './checkout';

export default function App() {
  return (
    <div>
      <h1>react-recurly demo</h1>
      <RecurlyProvider publicKey="ewr1-BrfKUWEllwCxdpRZvZloaJ">
        <Checkout />
      </RecurlyProvider>
    </div>
  );
}
