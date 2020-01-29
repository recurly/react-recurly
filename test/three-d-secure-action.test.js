import React from 'react';
import { mount, render } from 'enzyme';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { ThreeDSecureAction } from '../lib';

describe('<ThreeDSecureAction />', function () {
  const getThreeDSecureFrom = fixture => fixture.instance()._threeDSecure;

  describe('without a parent <RecurlyProvider />', function () {
    const subject = <ThreeDSecureAction />;
    suppressConsoleErrors();

    it('throws an error', function () {
      expect(() => render(subject)).toThrow(
        '<ThreeDSecureAction> must be within a <RecurlyProvider> tree.'
      );
    });
  });

  describe('with a parent <RecurlyProvider />', function () {
    describe('without an actionTokenId', function () {
      const subject = withRecurlyProvider(<ThreeDSecureAction />);

      suppressConsoleErrors();

      it('throws an error', function () {
        expect(() => render(subject)).toThrow(
          /Option actionTokenId must be a three_d_secure_action_token_id/
        );
      });
    });

    describe('with an actiontokenId', function () {
      const subject = withRecurlyProvider(
        <ThreeDSecureAction actionTokenId="test-action-token" />
      );

      it('does not throw an error', function () {
        expect(() => render(subject)).not.toThrow();
      });
    });
  });

  describe('event handlers', function () {
    const example = { arbitrary: 'properties' };

    describe('[onToken]', function () {
      it('is called when the underlying ThreeDSecure instance receives a token', function () {
        const subject = jest.fn();
        const fixture = mount(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" onToken={subject} />
        )).find(ThreeDSecureAction);

        getThreeDSecureFrom(fixture).emit('token', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('does nothing when no handler is provided', function () {
        const fixture = mount(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" />
        )).find(ThreeDSecureAction);

        expect(() => getThreeDSecureFrom(fixture).emit('token', example)).not.toThrow();
      });
    });

    describe('[onError]', function () {
      suppressConsoleErrors();

      it('is called when the underlying ThreeDSecure instance errors', function () {
        const subject = jest.fn();
        const fixture = mount(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" onError={subject} />
        )).find(ThreeDSecureAction);

        getThreeDSecureFrom(fixture).emit('error', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('throws errors when no handler is provided', function () {
        const fixture = mount(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" />
        )).find(ThreeDSecureAction);

        expect(() => {
          getThreeDSecureFrom(fixture).emit('error', JSON.stringify(example));
        }).toThrow(JSON.stringify(example));
      });
    });
  });
});
