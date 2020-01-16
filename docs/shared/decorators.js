import React from 'react';
import { RecurlyProvider, Elements } from '../../lib';
import { publicKeyProp } from './knobs';

export function withRecurlyProvider (storyFn) {
  return (
    <RecurlyProvider publicKey={publicKeyProp()}>
      {storyFn()}
    </RecurlyProvider>
  );
}

export function withElements (storyFn) {
  return withRecurlyProvider(() =>
    <Elements>
      {storyFn()}
    </Elements>
  );
}
