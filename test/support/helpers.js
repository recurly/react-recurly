import React from 'react';
import { RecurlyProvider, Elements } from '../../lib';

/**
 * This method deactivates the virtual console error method.
 * Useful when we expect a test to produce errors.
 */
export function suppressConsoleErrors () {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    console.error.mockRestore();
  });
}

/**
 * Wraps arbitrary react components in a valid RecurlyProvider
 */
export function withRecurlyProvider (children) {
  const api = `http://localhost:${process.env.PORT || 9877}`;

  return (
    <RecurlyProvider publicKey="test-public-key" api={api}>
      {children}
    </RecurlyProvider>
  );
}

/**
 * Wraps arbitrary react components in a valid Elements and RecurlyProvider
 */
export function withElements (children) {
  return withRecurlyProvider(
    <Elements>
      {children}
    </Elements>
  );
}
