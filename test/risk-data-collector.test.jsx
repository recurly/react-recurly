import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { RiskDataCollector } from '../lib';

describe('<RiskDataCollector />', function () {
  const getRiskDataCollectorInstanceFrom = ({ _fraud }) => _fraud;

  suppressConsoleErrors();

  describe('without a parent <RecurlyProvider />', function () {
    const subject = <RiskDataCollector />;

    it('throws an error', function () {
      expect(() => render(subject)).toThrow(
        '<RiskDataCollector> must be within a <RecurlyProvider> tree.'
      );
    });
  });

  describe('event handlers', function () {
    const example = { arbitrary: 'properties' };

    describe('[onError]', function () {
      it('is called when the underlying Risk Data Collector instance errors', async function () {
        const subject = jest.fn();
        let fixture;

        render(withRecurlyProvider(
          <RiskDataCollector strategy="kount" onError={subject} ref={ref => fixture = ref} />
        ));

        getRiskDataCollectorInstanceFrom(fixture).emit('error', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('throws errors when no handler is provided', function () {
        let fixture;

        render(withRecurlyProvider(
          <RiskDataCollector actionTokenId="test-action-token" ref={ref => fixture = ref} />
        ));

        expect(() => {
          getRiskDataCollectorInstanceFrom(fixture).emit('error', JSON.stringify(example));
        }).toThrow(JSON.stringify(example));
      });
    });
  });

  describe('with recurly.configuration', function () {
    const configureSpy = jest.spyOn(global.recurly.Recurly.prototype, 'configure');

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
