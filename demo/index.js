import React from 'react';
import { render } from 'react-dom';

import { CardElementDemo } from './src/card-element-demo';
import { IndividualCardElementsDemo } from './src/individual-card-elements-demo';
import { ThreeDSecureDemo } from './src/three-d-secure-demo';

function App () {
  return (
    <div>
      <h1>react-recurly demo</h1>

      <h2>Card Element</h2>
      <CardElementDemo />

      <h2>Individual Card Elements</h2>
      <IndividualCardElementsDemo />

      <h2>3D Secure</h2>
      <ThreeDSecureDemo />
    </div>
  );
};

render(<App />, document.querySelector('.App'));
