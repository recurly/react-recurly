import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyContext } from './provider';

export default class ThreeDSecureAction extends React.PureComponent {
  static propTypes = {
    /**
     * Applied to the container.
     */
    id: PropTypes.string,

    /**
     * Applied to the container.
     */
    className: PropTypes.string,

    /**
     * `three_d_secure_action_token_id` returned by the Recurly API when 3-D Secure
     * authentication is required for a transaction.
     */
    actionTokenId: PropTypes.string,

    /**
     * Called when the user has completed the 3D Secure flow
     * @type {ThreeDSecureAction~onToken}
     */

    /**
     * @callback ThreeDSecureAction~onToken
     * @param {ThreeDSecureActionResultToken}
     */
    onToken: PropTypes.func,

    /**
     * Called when an error is encountered
     * @type {ThreeDSecureAction~onError}
     */

    /**
     * @callback ThreeDSecureAction~onError
     * @param {RecurlyError}
     */
    onError: PropTypes.func
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    actionTokenId: '',
    onToken: () => {},
    onError: e => { throw e }
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
    this._threeDSecure = this._risk.ThreeDSecure({ actionTokenId });
    this._threeDSecure.on('token', (...args) => this.props.onToken(...args));
    this._threeDSecure.on('error', (...args) => this.props.onError(...args));
  }

  componentDidMount () {
    this._threeDSecure.attach(this._container.current);
  }

  render () {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        ref={this._container}
      />
    );
  }
};
