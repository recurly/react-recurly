import { withElements } from '../../shared/decorators';
import { stylePropFor } from '../../shared/controls';
import { CardNumberElement } from '../../../lib';

export default {
  component: CardNumberElement,
  title: 'Components/Individual Card Elements/CardNumberElement',
  tags: ['autodocs'],
  decorators: [withElements],
  parameters: {
    componentSubtitle: 'Display a card number input'
  }
};

export const Default = {
  args: {
    style: stylePropFor(CardNumberElement)
  }
};

export const Placeholder = {
  args: {
    style: {
      placeholder: {
        content: 'Card number'
      }
    }
  }
};


export const Localized = {
  parameters: {
    docs: {
      description: {
        story: 'Set `placeholder.content` to localize the `CardNumberElement`.'
      }
    }
  },
  args: {
    style: {
      placeholder: {
        content: 'Numéro de Carte'
      }
    }
  }
};
