import React from 'react';
import { render } from 'enzyme';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { Elements, useRecurly } from '../lib';
import { RecurlyElementsContext } from '../lib/elements';

describe('useRecurly', function () {
  describe('when not a descendant of <Elements />', function () {
    const message = /you are trying to use Recurly outside of an Elements context/;

    suppressConsoleErrors();

    it('throws an error', function () {
      expect(() => {
        render(<TestComponent />);
      }).toThrow(message);

      expect(() => render(withRecurlyProvider(<TestComponent />))).toThrow(message);
    });

    function TestComponent () {
      const recurly = useRecurly();
      return '';
    }
  });

  describe('when a descendant of <Elements />', function () {
    const fixture = TestComponent => () => {
      render(withRecurlyProvider(
        <Elements>
          <TestComponent />
        </Elements>
      ));
    };

    it('returns a Recurly instance', function () {
      expect(fixture(TestComponent)).not.toThrow();

      function TestComponent () {
        const recurly = useRecurly();
        expect(recurly.token).toBeInstanceOf(Function);
        expect(recurly.config.publicKey).toBe('test-public-key');
        expect(recurly).toBeInstanceOf(window.recurly.Recurly);
        return '';
      }
    });

    describe('recurly.token', function () {
      it('tokenizes the parent Elements instance', function () {
        fixture(TestComponent)();

        function TestComponent () {
          const recurly = useRecurly();
          const elements = React.useContext(RecurlyElementsContext).elements;
          const underlyingRecurly = elements.recurly;

          jest.spyOn(underlyingRecurly, 'token');
          underlyingRecurly.token.mockImplementation(() => {});

          expect(elements).toBeInstanceOf(recurly.Elements().constructor);
          recurly.token(1, 2 ,3);
          expect(underlyingRecurly.token).toHaveBeenCalledWith(elements, 1, 2, 3);
          return '';
        }
      });
    });
  });
});
