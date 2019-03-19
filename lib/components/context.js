import React from 'react';

export const RecurlyContext = React.createContext();

const { Provider, Consumer } = RecurlyContext;

/**
 * Provides a Recurly instance
 */
export default class RecurlyProvider extends React.Component {
  constructor (props) {
    super(props);

    if (!this.props.publicKey) {
      throw new Error(`
        Please pass your 'publicKey' value to RecurlyProvider.
      `);
    }

    // TODO: ensure proper shape?
    if (!window.recurly || !window.recurly.Recurly) {
      throw new Error(`
        Please load Recurly.js (https://js.recurly.com/v4/recurly.js) on this page prior to
        your react application.
      `);
    }

    const { children, ...options } = this.props;
    this._external = { recurly: fetchRecurlyInstance(options) };
  }

  render() {
    return (
      <Provider value={{ recurly: this._external.recurly }}>{this.props.children}</Provider>
    )
  }
};

/**
 * Retrieves a recurly instance from a cache on the Recurly class, or creates one
 * if none found on the cache key. This is used when the Provider is being
 * regularly re-instantiated
 *
 * @param  {object} options instance instantiation options
 * @return {Recurly}
 */
function fetchRecurlyInstance (options) {
  let cache = window.recurly.Recurly.__instanceCache = window.recurly.Recurly.__instanceCache || {};
  const key = JSON.stringify(options);

  const recurly = cache[key] || new window.recurly.Recurly(options);
  cache[key] = recurly;

  debugger;

  return recurly;
}
