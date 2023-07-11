import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyContext } from './provider';

export const RISK_STRATEGIES = ['kount'];

/**
 * Injects risk data collection point in your checkout.
 *
 * <https://docs.recurly.com/docs/kount>
 */
export default class RiskDataCollector extends React.Component {
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
     * Risk data collection strategy.
     *
     * Possible values: 'kount'
     */
    strategy: PropTypes.oneOf(RISK_STRATEGIES),

    /**
     * Called when an error is encountered
     * @type {FraudDataCollector~onError}
     */

    /**
     * @callback FraudDataCollector~onError
     * @param {RecurlyError}
     */
    onError: PropTypes.func
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    strategy: RISK_STRATEGIES[0],
    onError: e => { throw e }
  };

  static contextType = RecurlyContext;

  constructor (props, context) {
    super(props, context);

    if (!context || !context.recurly) {
      throw new Error('<RiskDataCollector> must be within a <RecurlyProvider> tree.');
    }

    /**
     * TODO
     * Once recurly.Fraud is decommissioned in favor of recurly.Risk.FraudConcern,
     * this will change to consume a RiskProvider.
     */
    this._container = React.createRef();
    this._recurly = this.context.recurly;
  }

  componentDidMount () {
    const { _container: container, _recurly: recurly } = this;
    const { strategy, onError } = this.props;

    recurly.configure({ fraud: { [strategy]: { dataCollector: true, form: container.current } } });
    const fraud = this._fraud = recurly.fraud;
    fraud.on('error', (...args) => onError(...args));
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
