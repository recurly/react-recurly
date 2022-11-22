import React from 'react';
import { mount, render } from 'enzyme';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { RiskDataCollector } from '../lib';

describe('<RiskDataCollector />', function () {
  const getRiskDataCollectorFrom = fixture => fixture.instance()._fraud;

  describe('without a parent <RecurlyProvider />', function () {
    const subject = <RiskDataCollector />;
    suppressConsoleErrors();

    it('throws an error', function () {
      expect(() => render(subject)).toThrow(
        '<RiskDataCollector> must be within a <RecurlyProvider> tree.'
      );
    });
  });

  describe('with a parent <RecurlyProvider />', function () {
    describe('with an invalid strategy', function () {
      const subject = () => withRecurlyProvider(<RiskDataCollector strategy="arbitrary" />);
      const example = /Invalid prop `strategy`/;

      suppressConsoleErrors();

      it('throws an error', function () {
        render(subject());
        expect(console.error).toHaveBeenCalledWith(expect.stringMatching(example));
      });
    });

    describe('with a valid strategy', function () {
      const subject = withRecurlyProvider(
        <RiskDataCollector strategy="kount" />
      );

      suppressConsoleErrors();

      it('does not throw an error', function () {
        expect(() => render(subject)).not.toThrow();
        expect(console.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('event handlers', function () {
    const example = { arbitrary: 'properties' };

    describe('[onError]', function () {
      suppressConsoleErrors();

      it('is called when the underlying Risk Data Collector instance errors', function () {
        const subject = jest.fn();
        const fixture = mount(withRecurlyProvider(
          <RiskDataCollector strategy="kount" onError={subject} />
        )).find(RiskDataCollector);

        getRiskDataCollectorFrom(fixture).emit('error', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('throws errors when no handler is provided', function () {
        const fixture = mount(withRecurlyProvider(
          <RiskDataCollector actionTokenId="test-action-token" />
        )).find(RiskDataCollector);

        expect(() => {
          getRiskDataCollectorFrom(fixture).emit('error', JSON.stringify(example));
        }).toThrow(JSON.stringify(example));
      });
    });
  });

  describe('with recurly.configuration', function () {
    const configureSpy = jest.spyOn(global.recurly.Recurly.prototype, 'configure');

    suppressConsoleErrors();

    it('gives form option a DOM Element', function () {
      const subject = withRecurlyProvider(
        <RiskDataCollector strategy="kount" />
      );

      expect(() => render(subject)).not.toThrow();
      expect(console.error).not.toHaveBeenCalled();
      expect(configureSpy).toHaveBeenCalledWith({
        fraud: {
          kount: {
            dataCollector: true,
            form: expect.any(Element)
          }
        }
      });
    });
  });
});
