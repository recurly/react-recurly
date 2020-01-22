import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { DocsPage } from '@storybook/addon-docs/blocks';

import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/knobs';
import { propsSlotFor, inputType } from '../../shared/prop-types';

import {
  RecurlyProvider,
  Elements,
  CardYearElement
} from '../../../lib';

export default {
  title: 'Components/Individual Card Elements/CardYearElement',
  component: CardYearElement,
  decorators: [withKnobs, withElements],
  parameters: {
    sortOrder: 5,
    componentSubtitle: 'Display a card expiration month input',
    docs: {
      page: () =>
        <DocsPage
          propsSlot={propsSlotFor(CardYearElement, inputType)}
        />
    }
  }
};

export const Default = () => {
  return (
    <CardYearElement
      onBlur={() => action('blur')()}
      onChange={action('change')}
      onFocus={() => action('focus')()}
      onReady={() => action('ready')()}
      onSubmit={() => action('submit')()}
      style={stylePropFor(CardYearElement)}
    />
  );
};

Default.story = {
  name: 'Default'
};

export const Select = () => {
  return (
    <CardYearElement inputType="select" />
  );
};

Select.story = {
  name: 'Dropdown',
  parameters: {
    docs: {
      storyDescription: 'Set `inputType="select"` or `inputType="mobileSelect"` to display use a `<select>` dropdown.'
    }
  }
};

export const Placeholder = () => {
  return (
    <CardYearElement
      style={{
        placeholder: {
          content: 'YY'
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
    <CardYearElement
      style={{
        placeholder: {
          content: 'AA'
        }
      }}
    />
  );
};

Localized.story = {
  name: 'Localized',
  parameters: {
    docs: { storyDescription: 'Set `placeholder.content` to localize the `CardYearElement`.' }
  }
};
