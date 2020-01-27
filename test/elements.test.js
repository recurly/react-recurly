import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { suppressConsoleErrors } from './support/helpers';

import { Elements, RecurlyProvider } from '../lib';
import { RecurlyElementsContext } from '../lib/elements';

describe('<Elements />', function () {
  describe('without a parent <RecurlyProvider />', function () {
    const storedRecurly = window.recurly;

    suppressConsoleErrors();

    it('throws an error', function () {
      expect(() => {
        render(<Elements />);
      }).toThrow('<Elements> must be within a <RecurlyProvider> tree.');
    });
  });

  describe('with a parent <RecurlyProvider />', function () {
    it('does not throw an error', function () {
      expect(() => {
        render(
          <RecurlyProvider publicKey="test-public-key">
            <Elements />
          </RecurlyProvider>
        );
      }).not.toThrow();
    });

    it('provides an Elements instance', function () {
      render(
        <RecurlyProvider publicKey="test-public-key">
          <Elements>
            <StubComponent />
          </Elements>
        </RecurlyProvider>
      );

      function StubComponent () {
        const { elements } = useContext(RecurlyElementsContext);
        expect(elements).toBeInstanceOf(window.recurly.Elements().constructor);
        return '';
      }
    });

    it(`accepts an onSubmit func prop which is called when Elements emits 'submit'`, function (done) {
      const stubEvent = { arbitrary: 'properties' };

      render(
        <RecurlyProvider publicKey="test-public-key">
          <Elements onSubmit={stubSubmitListener}>
            <StubComponent />
          </Elements>
        </RecurlyProvider>
      );

      function stubSubmitListener (event) {
        expect(event).toBe(stubEvent);
        done();
      }

      function StubComponent () {
        const { elements } = useContext(RecurlyElementsContext);
        elements.emit('submit', stubEvent);
        return '';
      }
    });
  });
});

