import Emitter from 'component-emitter';
import uuid from 'uuid/v4';

export default class Element extends Emitter {
  constructor ({ recurly }) {
    super();
    this.recurly = recurly;
    this.id = `recurly-element--${uuid()}`;

  }

  get iframe () {
    if (this._iframe) return this._iframe;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('name', this.id);
    iframe.setAttribute('allowpaymentrequest', 'true');
    iframe.src = this.url;
  }

  get url () {
    let config = encodeURIComponent(JSON.stringify(this.config));
    return `${this.recurly.api}/field.html#config=${config}`;
  }

  attach (container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error(
        'Invalid container passed to `attach`. Expected an HTMLElement.'
      );
    }
    container.appendChild(this.iframe);
    this.attached = true;
    this.emit('attach');
  }

  remove () {
    this.attached = false;
    this.emit('remove');
  }

  destroy () {
    this.remove();
    const parent = this.iframe.parentElement;
    if (!parent) return;
    parent.removeChild(this.iframe);
    this.emit('destroy');
  }
}
