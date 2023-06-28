import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { Elements } from '../lib';
import { RecurlyElementsContext } from '../lib/elements';

describe('<Elements />', function () {
  const getElementsInstanceFor = ({ _elements }) => _elements;

  describe('without a parent <RecurlyProvider />', function () {
    suppressConsoleErrors();

    it('throws an error', function () {
      expect(() => render(<Elements />)).toThrow('<Elements> must be within a <RecurlyProvider> tree.');
    });
  });

  describe('with a parent <RecurlyProvider />', function () {
    it('does not throw an error', function () {
      expect(() => render(withRecurlyProvider(<Elements />))).not.toThrow();
    });

    it('provides an Elements instance', function () {
      render(withRecurlyProvider(
        <Elements>
          <StubComponent />
        </Elements>
      ));

      function StubComponent () {
        const { elements } = useContext(RecurlyElementsContext);
        expect(elements).toBeInstanceOf(window.recurly.Elements().constructor);
        return '';
      }
    });
  });

  describe('event handlers', function () {
    const example = { arbitrary: 'properties' };

    describe('[onSubmit]', function () {
      it(`is called when Elements emits 'submit'`, function () {
        const subject = jest.fn();
        let fixture;

        render(withRecurlyProvider(<Elements onSubmit={subject} ref={ref => fixture = ref} />));

        getElementsInstanceFor(fixture).emit('submit', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('does nothing by default', function () {
        let fixture;

        render(withRecurlyProvider(<Elements ref={ref => fixture = ref} />));

        expect(() => getElementsInstanceFor(fixture).emit('submit', example)).not.toThrow();
      });
    });
  });
});

