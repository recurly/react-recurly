import React from 'react';
import PropTypes from 'prop-types';

export const providerContextTypes = {
  recurly: PropTypes.object
};

/**
 * Provides a Recurly instance
 */
export default class Provider extends React.Component {
  static propTypes = {
    recurly: PropTypes.object,
    children: PropTypes.node,
  };

  static childContextTypes = providerContextTypes;
  static defaultProps = {
    recurly: undefined,
    children: null,
  };

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

  getChildContext () {
    return { recurly: this._external.recurly };
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    return React.Children.only(this.props.children);
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

  return recurly;
}
