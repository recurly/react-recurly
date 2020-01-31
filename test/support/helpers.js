import React from 'react';
import { RecurlyProvider, Elements } from '../../lib';

/**
 * This method deactivates the virtual console error method.
 * Useful when we expect a test to produce errors.
 */
export function suppressConsoleErrors () {
  beforeEach(() => {
    jest.spyOn(console, 'error');
  });

  afterEach(() => {
    console.error.mockRestore();
  });
}

/**
 * Wraps arbitrary react components in a valid RecurlyProvider
 */
export function withRecurlyProvider (children) {
  return (
    <RecurlyProvider publicKey="test-public-key">
      ${children}
    </RecurlyProvider>
  );
}

/**
 * Wraps arbitrary react components in a valid Elements and RecurlyProvider
 */
export function withElements (children) {
  return withRecurlyProvider(
    <Elements>
      ${children}
    </Elements>
  );
}
