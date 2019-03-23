import React, { useState, useContext } from 'react';
import { RecurlyContext } from './context';
import { RecurlyElementsContext } from './elements';

/**
 * Provides a recurly instance bound to the provider tree
 */
export default function useRecurly () {
  const recurlyContext = useContext(RecurlyContext);
  const elementsContext = useContext(RecurlyElementsContext);

  if (!recurlyContext || !recurlyContext.recurly) {
    throw new Error(
      `It looks like you are trying to use Recurly outside of a RecurlyProvider context.
       Please be sure the component that calls 'token' is within a <RecurlyProvider> component.`
    );
  }

  if (!elementsContext || !elementsContext.elements) {
    throw new Error(
      `It looks like you are trying to use Recurly outside of an Elements context.
       Please be sure the component that calls 'token' is within an <Elements> component.`
    );
  }

  const [recurly, setRecurly] = useState(recurlyContext.recurly);
  const [elements, setElements] = useState(elementsContext.elements);

  return {
    ...recurly,
    // Provide a curried token method to bind the elements from the closest context
    token: (...args) => recurly.token(elements, ...args)
  };
}
