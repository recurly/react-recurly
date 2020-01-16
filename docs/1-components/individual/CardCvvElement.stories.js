import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs'

import { withElements } from '../../shared/decorators';
import { publicKeyProp, stylePropFor } from '../../shared/knobs';
import { propsSlotFor, inputType, displayIcon } from '../../shared/prop-types';

import {
  RecurlyProvider,
  Elements,
  CardCvvElement
} from '../../../lib';

export default {
  title: 'Components/Individual Card Elements/CardCvvElement',
  component: CardCvvElement,
  decorators: [withKnobs, withElements],
  parameters: {
    sortOrder: 6,
    componentSubtitle: 'Display a Card Verification Value (CVV) input'
  }
};

export const Default = () => {
  return (
    <CardCvvElement
      onBlur={() => action('blur')()}
      onChange={action('change')}
      onFocus={() => action('focus')()}
      onReady={() => action('ready')()}
      onSubmit={() => action('submit')()}
      style={stylePropFor(CardCvvElement)}
    />
  );
};

Default.story = {
  name: 'Default'
};

export const Placeholder = () => {
  return (
    <CardCvvElement
      style={{
        placeholder: {
          content: 'CVV'
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
    <CardCvvElement
      style={{
        placeholder: {
          content: 'CVC'
        }
      }}
    />
  );
};

Localized.story = {
  name: 'Localized',
  parameters: {
    docs: { storyDescription: 'Set `placeholder.content` to localize the `CardCvvElement`.' }
  }
};
