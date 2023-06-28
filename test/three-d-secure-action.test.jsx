import React from 'react';
import { mount, render } from '@testing-library/react';
import { suppressConsoleErrors, withRecurlyProvider } from './support/helpers';

import { ThreeDSecureAction } from '../lib';

describe('<ThreeDSecureAction />', function () {
  const getThreeDSecureInstanceFrom = ({ _threeDSecure }) => _threeDSecure;

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
        let fixture;

        render(withRecurlyProvider(
          <ThreeDSecureAction
            actionTokenId="test-action-token"
            onToken={subject}
            ref={ref => fixture = ref}
          />
        ));

        getThreeDSecureInstanceFrom(fixture).emit('token', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('does nothing when no handler is provided', function () {
        let fixture;

        render(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" ref={ref => fixture = ref} />
        ));

        expect(() => getThreeDSecureInstanceFrom(fixture).emit('token', example)).not.toThrow();
      });
    });

    describe('[onError]', function () {
      suppressConsoleErrors();

      it('is called when the underlying ThreeDSecure instance errors', function () {
        const subject = jest.fn();
        let fixture;

        render(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" onError={subject} ref={ref => fixture = ref} />
        ));

        getThreeDSecureInstanceFrom(fixture).emit('error', example);
        expect(subject).toHaveBeenCalledWith(example);
      });

      it('throws errors when no handler is provided', function () {
        let fixture;

        render(withRecurlyProvider(
          <ThreeDSecureAction actionTokenId="test-action-token" ref={ref => fixture = ref} />
        ));

        expect(() => {
          getThreeDSecureInstanceFrom(fixture).emit('error', JSON.stringify(example));
        }).toThrow(JSON.stringify(example));
      });
    });
  });
});
