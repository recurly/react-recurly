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
    onReady: PropTypes.func,
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onReady: noop,
  };

  static contextType = RecurlyElementsContext;

  constructor (props, context) {
    super(props, context);

    const options = extractOptions(this.props);
    this._options = options;
    this._element = context.elements[this.constructor.elementClassName](options);
  }

  componentDidMount () {
    const element = this._element;
    element.attach(this._ref);
  }

  componentWillReceiveProps (nextProps) {
    // debugger;
    // const options = extractOptions(nextProps);
    // if (Object.keys(options).length !== 0 && JSON.stringify(options) !== JSON.stringify(this._options)) {
    //   this._options = options;
    //   // TODO: handle options updates for the field
    //   // if (this._element) this._element.update(options);
    // }
  }

  componentWillUnmount() {
    // if (this._element) {
    //   const field = this._element;
    //   field.destroy();
    //   this.context.unregisterField(field);
    // }
  }

  _setupEventListeners (field) {
    // field.on('ready', () => this.props.onReady(this._element));
    // field.on('change', state => this.props.onChange(state));
    // field.on('blur', ...args => this.props.onBlur(...args));
    // field.on('focus', ...args => this.props.onFocus(...args));
  }

  handleRef = ref => {
    this._ref = ref;
  };

  render () {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        ref={this.handleRef}
      />
    );
  }
};

function extractOptions (props) {
  const {id, className, onChange, onFocus, onBlur, onReady, ...options} = props;
  return options;
}
