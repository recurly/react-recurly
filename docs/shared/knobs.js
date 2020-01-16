import { color, object, select, text } from '@storybook/addon-knobs';
import { CardElement } from '../../lib';

const styleGroup = 'Style';
const placeholderStyleGroup = 'Placeholder style';
const advancedStyleGroup = 'Advanced style';
const invalidStyleGroup = 'Style when invalid';

const OPTIONS = {
  FONT_KERNING: ['auto', 'normal', 'none'],
  FONT_STYLE: ['normal', 'italic', 'oblique'],
  FONT_WEIGHT: ['normal', 'bold'],
  TEXT_ALIGN: ['', 'left', 'center', 'right'],
  TEXT_RENDERING: ['auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision'],
  TEXT_TRANSFORM: ['none', 'capitalize', 'uppercase', 'lowercase', 'full-width', 'full-size-kana']
};

export function publicKeyProp () {
  const defaultPublicKey = 'ewr1-zfJT5nPe1qW7jihI32LIRH';
  return text('publicKey', defaultPublicKey, 'RecurlyProvider');
}

export function stylePropFor (component) {
  if (component === CardElement) {
    return {
      ...commonStyleProp(),
      placeholder: {
        content: {
          number: text('style.placeholder.content.number', 'Card number', placeholderStyleGroup),
          expiry: text('style.placeholder.content.expiry', 'MM / YY', placeholderStyleGroup),
          cvv: text('style.placeholder.content.cvv', 'CVV', placeholderStyleGroup)
        },
        color: color('style.placeholder.color', undefined, placeholderStyleGroup)
      },
      invalid: object('style.invalid', {
        fontColor: '#e35256'
      }, invalidStyleGroup)
    }
  } else {
    return {
      ...commonStyleProp(),
      placeholder: {
        content: text('style.placeholder.content', '', placeholderStyleGroup),
        color: color('style.placeholder.color', undefined, placeholderStyleGroup)
      },
      padding: text('style.padding', '0', styleGroup)
    }
  }
}

export function commonStyleProp () {
  return {
    fontColor: color('style.fontColor', 'black', styleGroup),
    fontFamily: text('style.fontFamily', 'Helvetica', styleGroup),
    fontFeatureSettings: text('style.fontFeatureSettings', 'normal', advancedStyleGroup),
    fontKerning: select('style.fontKerning', OPTIONS.FONT_KERNING, 'auto', advancedStyleGroup),
    fontSize: text('style.fontSize', 'inherit', styleGroup),
    fontSmoothing: text('style.fontSmoothing', 'auto', advancedStyleGroup),
    fontStretch: text('style.fontStretch', 'normal', advancedStyleGroup),
    fontStyle: select('style.fontStyle', OPTIONS.FONT_STYLE, 'normal', styleGroup),
    fontVariant: text('style.fontVariant', 'normal', advancedStyleGroup),
    fontWeight: select('style.fontWeight', OPTIONS.FONT_WEIGHT, 'normal', styleGroup),
    letterSpacing: text('style.letterSpacing', 'normal', advancedStyleGroup),
    textAlign: select('style.textAlign', OPTIONS.TEXT_ALIGN, '', styleGroup),
    textDecoration: text('style.textDecoration', '', advancedStyleGroup),
    textRendering: select('style.textRendering', OPTIONS.TEXT_RENDERING, 'auto', advancedStyleGroup),
    textShadow: text('style.textShadow', 'none', advancedStyleGroup),
    textTransform: select('style.textTransform', OPTIONS.TEXT_TRANSFORM, 'none', advancedStyleGroup),
  };
}
