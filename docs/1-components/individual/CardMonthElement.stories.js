import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/controls';
import { inputType } from '../../shared/args';
import { CardMonthElement } from '../../../lib';

export default {
  component: CardMonthElement,
  title: 'Components/Individual Card Elements/CardMonthElement',
  tags: ['autodocs'],
  argTypes: { inputType },
  decorators: [withElements],
  parameters: {
    componentSubtitle: 'Display a card expiration month input'
  }
};

export const Default = {
  args: {
    style: stylePropFor(CardMonthElement)
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
        content: 'MM'
      }
    }
  }
};

export const Localized = {
  parameters: {
    docs: {
      description: {
        story: 'Set `placeholder.content` to localize the `CardMonthElement`.'
      }
    }
  },
  args: {
    style: {
      placeholder: {
        content: 'Mo'
      }
    }
  }
};
