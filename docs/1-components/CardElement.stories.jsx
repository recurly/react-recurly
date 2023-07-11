import { stylePropFor } from '../shared/controls';
import { displayIcon, inputType } from '../shared/args';
import { withElements } from '../shared/decorators';
import {
  RecurlyProvider,
  Elements,
  CardElement
} from '../../lib';

export default {
  component: CardElement,
  title: 'Components/Card Element',
  argTypes: { displayIcon, inputType },
  tags: ['autodocs'],
  decorators: [withElements],
  parameters: {
    componentSubtitle: 'Accept all card parameters in one place',
    docs: {
      description: {
        component: `
  A [Card Element](https://developers.recurly.com/reference/recurly-js/#the-card-element)
  component which wraps its Recurly.js analogue, passing configuration props to the underlying
  Recurly.js CardElement and allowing event binding using props.

  Your users will enter their card information (number, expiry, and cvv) here.
`
      }
    }
  }
};

export const Default = {
  args: {
    style: stylePropFor(CardElement)
  }
};

export const DropdownExpiry = {
  parameters: {
    docs: {
      description: {
        story: 'Set `inputType="select"` to render a `<select>` in place of default expiry text input.'
      }
    }
  },
  args: {
    inputType: 'select'
  }
};

export const Localized = {
  parameters: {
    docs: {
      description: {
        story: 'Set `placeholder.content` to localize the `CardElement`.'
      }
    }
  },
  args: {
    style: {
      placeholder: {
        content: {
          number: 'Numéro de Carte',
          expiry: 'MM / AA',
          cvv: 'CVC'
        }
      }
    }
  }
};

export const WithoutCardIcon = {
  parameters: {
    docs: {
      description: {
        story: 'Set `displayIcon={false}` to disable the card brand icon.'
      }
    }
  },
  args: {
    displayIcon: false
  }
};
