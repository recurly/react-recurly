import React, { useState, useContext } from 'react';
import { RecurlyElementsContext } from './elements';

/**
 * Provides a recurly instance bound to the provider tree
 */
export default function useRecurly () {
  const elementsContext = useContext(RecurlyElementsContext);

  if (!elementsContext || !elementsContext.elements) {
    throw new Error(
      `It looks like you are trying to use Recurly outside of an Elements context.
       Please be sure the component that calls 'useRecurly' is within an <Elements> component.`
    );
  }

  const [ elements, setElements ] = useState(elementsContext.elements);
  const [ recurly, setRecurly ] = useState(elements.recurly);

  return {
    ...recurly,
    // Provide a curried token method to bind the elements from the closest context
    token: (...args) => recurly.token(elements, ...args)
  };
}
