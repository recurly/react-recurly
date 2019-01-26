import Emitter from 'component-emitter';
import uuid from 'uuid/v4';

export default class Elements extends Emitter {
  constructor ({ recurly }) {
    super();
    this.recurly = recurly;
    this.id = `recurly-elements--${uuid()}`;
  }

  // TODO: tokenize from the associated Element instances
  token () {
  }

  // TODO: destroy associated Element instances
  destroy () {
  }
}
