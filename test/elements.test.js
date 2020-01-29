import React, { useContext } from 'react';
import { render, mount } from 'enzyme';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { Elements } from '../lib';
import { RecurlyElementsContext } from '../lib/elements';

describe('<Elements />', function () {
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
        const fixture = mount(withRecurlyProvider(<Elements onSubmit={subject} />)).find(Elements);

        fixture.instance()._elements.emit('submit', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('does nothing by default', function () {
        const fixture = mount(withRecurlyProvider(<Elements />)).find(Elements);
        expect(() => fixture.instance()._elements.emit('submit', example)).not.toThrow();
      });
    });
  });
});

