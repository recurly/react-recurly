import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs'

import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/knobs';

import {
  RecurlyProvider,
  Elements,
  CardNumberElement
} from '../../../lib';

export default {
  title: 'Components/Individual Card Elements/CardNumberElement',
  component: CardNumberElement,
  decorators: [withKnobs, withElements],
  parameters: {
    sortOrder: 3,
    componentSubtitle: 'Display a card number input'
  }
};

export const Default = () => {
  return (
    <CardNumberElement
      onBlur={() => action('blur')()}
      onChange={action('change')}
      onFocus={() => action('focus')()}
      onReady={() => action('ready')()}
      onSubmit={() => action('submit')()}
      style={stylePropFor(CardNumberElement)}
    />
  );
};

Default.story = {
  name: 'Default'
};

export const Placeholder = () => {
  return (
    <CardNumberElement
      style={{
        placeholder: {
          content: 'Card number'
        }
      }}
    />
  );
};

Placeholder.story = {
  name: 'Placeholder'
};

export const Localized = () => {
  return (
    <CardNumberElement
      style={{
        placeholder: {
          content: 'Numéro de Carte'
        }
      }}
    />
  );
};

Localized.story = {
  name: 'Localized',
  parameters: {
    docs: { storyDescription: 'Set `placeholder.content` to localize the `CardNumberElement`.' }
  }
};
