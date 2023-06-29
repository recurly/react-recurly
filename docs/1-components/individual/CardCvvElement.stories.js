import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/controls';
import { CardCvvElement } from '../../../lib';

export default {
  component: CardCvvElement,
  title: 'Components/Individual Card Elements/CardCvvElement',
  tags: ['autodocs'],
  decorators: [withElements],
  parameters: {
    componentSubtitle: 'Display a Card Verification Value (CVV) input'
  }
};

export const Default = {
  args: {
    style: stylePropFor(CardCvvElement)
  }
};

export const Placeholder = {
  args: {
    placeholder: {
      content: 'CVV'
    }
  }
};

export const Localized = {
  parameters: {
    docs: {
      description: {
        story: 'Set `placeholder.content` to localize the `CardCvvElement`.'
      }
    }
  },
  args: {
    placeholder: {
      content: 'CVC'
    }
  }
};
