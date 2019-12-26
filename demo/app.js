import React from 'react';
import { RecurlyProvider } from '../lib/index';
import Checkout from './checkout';

export default function App() {
  return (
    <div>
      <h1>react-recurly demo</h1>
      <RecurlyProvider publicKey="dev-hxy3uuUxjhBrFrxU0C47aH" api="https://api.lvh.me:3000/js/v1">
        <Checkout />
      </RecurlyProvider>
    </div>
  );
}
