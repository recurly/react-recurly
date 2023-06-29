import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/controls';
import { inputType } from '../../shared/args';

import { CardYearElement } from '../../../lib';

export default {
  component: CardYearElement,
  title: 'Components/Individual Card Elements/CardYearElement',
  tags: ['autodocs'],
  decorators: [withElements],
  parameters: {
    componentSubtitle: 'Display a card expiration month input',
  },
  argTypes: { inputType }
};

export const Default = {
  args: {
    style: stylePropFor(CardYearElement)
  }
};

export const Dropdown = {
  parameters: {
    docs: {
      description: {
        story: 'Set `inputType="select"` or `inputType="mobileSelect"` to display use a `<select>` dropdown.'
      }
    }
  },
  args: {
    inputType: 'select'
  }
};

export const Placeholder = {
  args: {
    style: {
      placeholder: {
        content: 'YY'
      }
    }
  }
};

export const Localized = {
  parameters: {
    docs: {
      description: {
        story: 'Set `placeholder.content` to localize the `CardYearElement`.'
      }
    }
  },
  args: {
    style: {
      placeholder: {
        content: 'AA'
      }
    }
  }
};
