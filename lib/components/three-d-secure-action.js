import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyContext } from './provider';

export const ThreeDSecureActionContext = React.createContext();

const { Provider, Consumer } = ThreeDSecureActionContext;

export default class ThreeDSecureAction extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    actionTokenId: PropTypes.string,
    onToken: PropTypes.func
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    actionTokenId: '',
    onToken: () => {}
  };

  static contextType = RecurlyContext;

  constructor (props, context) {
    super(props, context);

    if (!context || !context.recurly) {
      throw new Error('<ThreeDSecureAction> must be within a <RecurlyProvider> tree.');
    }

    const { actionTokenId } = props;

    this._container = React.createRef();
    this._risk = this.context.recurly.Risk();
    this._threeDSecure = this._risk.ThreeDSecure({ actionTokenId })
    this._threeDSecure.on('token', res => this.props.onToken(res));
  }

  componentDidMount () {
    const threeDSecure = this._threeDSecure;
    threeDSecure.attach(this._container.current);
  }

  render () {
    const risk = this._risk;
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        ref={this._container}
      />
    );
  }
};
