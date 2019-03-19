// @flow
import RecurlyProvider from './components/context';
import useRecurly from './components/use-recurly';
import Fields from './components/fields';
import Field from './components/field';
import CardField from './components/field/card';

// const CardField = new Field('card');
// const CardNumberField = new Field('cardNumber');
// const CardExpiryField = new Field('cardExpiry');
// const CardCVCField = new Field('cardCvc');
// const PostalCodeField = new Field('postalCode');

export {
  RecurlyProvider,
  useRecurly,
  Fields,
  CardField,
  // CardNumberField,
  // CardExpiryField,
  // CardCVVField
};
