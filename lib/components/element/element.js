import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyElementsContext } from '../elements';

const noop = () => {};

export default class Element extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onReady: PropTypes.func
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onReady: noop
  };

  static contextType = RecurlyElementsContext;

  constructor (props, context) {
    super(props, context);

    const options = extractOptions(this.props);
    this._options = options;
    this._element = context.elements[this.constructor.elementClassName](options);

    this._bindListeners(this._element);
  }

  componentDidMount () {
    const element = this._element;
    element.attach(this._ref);
  }

  componentWillReceiveProps (nextProps) {
    const options = extractOptions(nextProps);
    if (Object.keys(options).length !== 0 && JSON.stringify(options) !== JSON.stringify(this._options)) {
      this._options = options;
      if (this._element) this._element.configure(options);
    }
  }

  componentWillUnmount () {
    if (!this._element) return;
    this._element.destroy();
  }

  _bindListeners (element) {
    // element.on('ready', () => this.props.onReady(element));
    // element.on('change', ...args => this.props.onChange(...args));
    // element.on('blur', ...args => this.props.onBlur(...args));
    // element.on('focus', ...args => this.props.onFocus(...args));
  }

  render () {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        ref={ref => this._ref = ref}
      />
    );
  }
};

function extractOptions (props) {
  const { id, className, onChange, onBlur, onFocus, onReady, ...options } = props;
  return options;
}
