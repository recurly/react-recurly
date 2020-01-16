import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs'
import { DocsPage } from '@storybook/addon-docs/blocks';

import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/knobs';
import { propsSlotFor, inputType } from '../../shared/prop-types';

import {
  RecurlyProvider,
  Elements,
  CardMonthElement
} from '../../../lib';

export default {
  title: 'Components/Individual Card Elements/CardMonthElement',
  component: CardMonthElement,
  decorators: [withKnobs, withElements],
  parameters: {
    sortOrder: 4,
    componentSubtitle: 'Display a card expiration month input',
    docs: {
      page: () =>
        <DocsPage
          propsSlot={propsSlotFor(CardMonthElement, inputType)}
        />
    }
  }
};

export const Default = () => {
  return (
    <CardMonthElement
      onBlur={() => action('blur')()}
      onChange={action('change')}
      onFocus={() => action('focus')()}
      onReady={() => action('ready')()}
      onSubmit={() => action('submit')()}
      style={stylePropFor(CardMonthElement)}
    />
  );
};

Default.story = {
  name: 'Default'
};

export const Select = () => {
  return (
    <CardMonthElement inputType="select" />
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
    <CardMonthElement
      style={{
        placeholder: {
          content: 'MM'
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
    <CardMonthElement
      style={{
        placeholder: {
          content: 'Mo'
        }
      }}
    />
  );
};

Localized.story = {
  name: 'Localized',
  parameters: {
    docs: { storyDescription: 'Set `placeholder.content` to localize the `CardMonthElement`.' }
  }
};
