import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs'
import { DocsPage } from '@storybook/addon-docs/blocks';

import { withElements } from '../shared/decorators';
import { stylePropFor } from '../shared/knobs';
import { propsSlotFor, inputType, displayIcon } from '../shared/prop-types';

import {
  RecurlyProvider,
  Elements,
  CardElement
} from '../../lib';

export default {
  title: 'Components/CardElement',
  component: CardElement,
  decorators: [withKnobs, withElements],
  parameters: {
    sortOrder: 2,
    componentSubtitle: 'Accept all card parameters in one place',
    docs: {
      page: () =>
        <DocsPage
          descriptionSlot={() => `
  A [Card Element](https://developers.recurly.com/reference/recurly-js/#the-card-element)
  component which wraps its Recurly.js analogue, passing configuration props to the underlying
  Recurly.js CardElement and allowing event binding using props.

  Your users will enter their card information (number, expiry, and cvv) here.
`}
          propsSlot={propsSlotFor(CardElement, inputType, displayIcon)}
        />
    }
  }
};

export const Default = () => {
  return (
    <CardElement
      onBlur={() => action('blur')()}
      onChange={action('change')}
      onFocus={() => action('focus')()}
      onReady={() => action('ready')()}
      onSubmit={() => action('submit')()}
      style={stylePropFor(CardElement)}
    />
  );
};

Default.story = {
  name: 'Default'
};

export const ExpirySelect = () => {
  return (
    <CardElement inputType="select" />
  );
};

ExpirySelect.story = {
  name: 'Dropdown expiry',
  parameters: {
    docs: { storyDescription: 'Set `inputType="select"` to render a `<select>` in place of default expiry text input.' }
  }
};

export const Localization = () => {
  return (
    <CardElement
      style={{
        placeholder: {
          content: {
            number: 'Numéro de Carte',
            expiry: 'MM / AA',
            cvv: 'CVC'
          }
        }
      }}
    />
  );
};

Localization.story = {
  name: 'Localized',
  parameters: {
    docs: { storyDescription: 'Set `placeholder.content` to localize the `CardElement`.' }
  }
};

export const WithoutIcon = () => {
  return (
    <CardElement displayIcon={false} />
  );
};

WithoutIcon.story = {
  name: 'Without card icon',
  parameters: {
    docs: { storyDescription: 'Set `displayIcon={false}` to disable the card brand icon.' }
  }
};
