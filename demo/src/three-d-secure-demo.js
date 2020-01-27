import React, { useState } from 'react';

import {
  RecurlyProvider,
  ThreeDSecureAction,
} from '@recurly/react-recurly';

const handleThreeDSecureToken = token =>
  console.log(`[three-d-secure-action-result-token]: ${token.id}`);

export function ThreeDSecureDemo (props) {
  const [actionTokenId, setActionTokenId] = useState('');

  const handleChangeActionToken = event => setActionTokenId(event.target.value);

  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY}>
        <p>Provide a ThreeDSecureActionTokenId returned by the Recurly API</p>

        <div>
          <input
            type="text"
            placeholder="ThreeDSecureActionTokenId"
            width="200px"
            onChange={handleChangeActionToken}
          />
        </div>

        <p>The challenge prompt will appear below</p>

        {actionTokenId ? (
          <div>
            <ThreeDSecureAction
              actionTokenId={actionTokenId}
              onToken={handleThreeDSecureToken}
              className="recurly-three-d-secure-action"
            />
          </div>
        ) : null}
      </RecurlyProvider>
    </div>
  );
}
