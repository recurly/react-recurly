// import { color, object, select, text } from '@storybook/controls';
import { CardElement } from '../../lib';

export function stylePropFor (component) {
  if (component === CardElement) {
    return {
      ...commonStyleProp(),
      placeholder: {
        content: {
          number: 'Card number',
          expiry: 'MM / YY',
          cvv: 'CVV'
        },
        color: undefined
      },
      invalid: {
        fontColor: '#e35256'
      }
    }
  } else {
    return {
      ...commonStyleProp(),
      placeholder: {
        content: '',
        color: undefined
      },
      padding: '0'
    }
  }
}

export function commonStyleProp () {
  return {
    fontColor: 'black',
    fontFamily: 'Helvetica',
    fontFeatureSettings: 'normal',
    fontKerning: 'auto',
    fontSize: 'inherit',
    fontSmoothing: 'auto',
    fontStretch: 'normal',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textAlign: '',
    textDecoration: '',
    textRendering: 'auto',
    textShadow: 'none',
    textTransform: 'none',
  };
}
