import React from 'react';
import PropTypes from 'prop-types';

export const providerContextTypes = {
  recurly: PropTypes.object,
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
    if (!this.props.recurly) throw new Error("Please pass a 'recurly' reference to RecurlyProvider.");
  }

  getChildContext () {
    const { recurly } = this.props;
    return { recurly };
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    return React.Children.only(this.props.children);
  }
};
