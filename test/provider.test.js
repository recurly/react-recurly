import React, { useContext } from 'react';
import { render } from 'enzyme';
import { suppressConsoleErrors } from './support/helpers';

import { RecurlyProvider } from '../lib';
import { RecurlyContext } from '../lib/provider';
import { version } from '../package.json';
import isEqual from 'lodash/isEqual';

const api = `http://localhost:${process.env.PORT || 9877}`

describe('<RecurlyProvider />', function () {
  describe('without having included recurly.js', function () {
    const storedRecurly = window.recurly;

    suppressConsoleErrors();

    beforeEach(function () {
      delete window.recurly;
    });

    afterEach(function () {
      window.recurly = storedRecurly;
    });

    it('throws an error', function () {
      expect(() => {
        render(<RecurlyProvider publicKey="test-public-key" api={api} />);
      }).toThrow(/Please load Recurly\.js \(https:\/\/js\.recurly\.com\/v4\/recurly\.js\) on this page/);
    });
  });

  describe('without a publicKey', function () {
    suppressConsoleErrors();

    it('throws an error', function () {
      expect(() => {
        render(<RecurlyProvider />);
      }).toThrow(/Please pass your 'publicKey' value to this RecurlyProvider/);
    });
  });

  describe('with a publicKey', function () {
    it('reports a "react-recurly" event on initialization once', function () {
      const reportSpy = jest.spyOn(global.recurly.Recurly.prototype, 'report');

      render(
        <>
          <RecurlyProvider publicKey='test-public-key' api={api} />
          <RecurlyProvider publicKey='test-public-key' api={api} />
          <RecurlyProvider publicKey='test-public-key-2' api={api} />
        </>
      );

      const expected = ['react-recurly', { version }];
      const { calls } = reportSpy.mock;
      const reactRecurlyEventCalls = calls.filter(call => isEqual(call, expected));
      expect(reactRecurlyEventCalls.length).toBe(1);
    });

    it('does not throw an error', function () {
      expect(() => {
        render(<RecurlyProvider publicKey="test-public-key" api={api} />);
      }).not.toThrow();
    });

    it('does not throw an error when the fraud property is configured to be true', function () {
      expect(() => {
        render(<RecurlyProvider publicKey="test-public-key" api={api} fraud={{kount: {dataCollector: true}}} />);
      }).not.toThrow();
    });

    it('provides a Recurly instance', function () {
      render(
        <RecurlyProvider publicKey="test-public-key" api={api}>
          <StubComponent />
        </RecurlyProvider>
      );

      function StubComponent () {
        const { recurly } = useContext(RecurlyContext);
        expect(recurly).toBeInstanceOf(window.recurly.Recurly);
        return '';
      }
    });

    it('provides a memoized Recurly instance', function () {
      let memo;

      render(
        <div>
          <RecurlyProvider publicKey="test-public-key" api={api}>
            <StubComponent />
          </RecurlyProvider>

          <RecurlyProvider publicKey="test-public-key" api={api}>
            <StubComponentTwo />
          </RecurlyProvider>

          <RecurlyProvider publicKey="test-public-key-two" api={api}>
            <StubComponentThree />
          </RecurlyProvider>
        </div>
      );

      function StubComponent () {
        memo = useContext(RecurlyContext).recurly;
        return '';
      }

      function StubComponentTwo () {
        const { recurly } = useContext(RecurlyContext);
        expect(recurly).toBe(memo);
        expect(recurly.config.publicKey).toBe('test-public-key');
        return '';
      }

      function StubComponentThree () {
        const { recurly } = useContext(RecurlyContext);
        expect(recurly).not.toBe(memo);
        expect(recurly.config.publicKey).toBe('test-public-key-two');
        return '';
      }
    });
  });
});
