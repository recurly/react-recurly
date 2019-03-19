import React, { useState, useContext } from 'react';
import { RecurlyContext } from './context';

/**
 * Provides a recurly instance bound to the provider tree
 */
export default function useRecurly () {
  const context = useContext(RecurlyContext);

  // TODO: adjust this to look for an <Elements> component context
  //       to ensure we have a recurly instance capable of tokenizing
  if (!context || !context.recurly) {
    throw new Error(
      `It looks like you are trying to inject a Recurly context outside of a RecurlyProvider context.
       Please be sure the component that calls 'token' is within a <RecurlyProvider> component.`
    );
  }

  const [recurly, setRecurly] = useState(context.recurly);

  return recurly;
}
