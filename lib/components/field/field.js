import React from 'react';
import PropTypes from 'prop-types';
import {fieldContextTypes} from '../fields';

const noop = () => {};

export default class Field extends React.Component {
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

  static displayName = 'Field';

  static contextTypes = fieldContextTypes;

  constructor(props, context) {
    super(props, context);

    this._field = null;

    const options = _extractOptions(this.props);

    this._options = options;
  }

  componentDidMount () {
    this.context.addFieldsLoadListener((recurly) => {
      // TODO: This should be a Field controller, but for now is the recurly instance
      // const field = new fields[type](this._options);
      const field = new recurly.HostedFields;
      this._field = field;

      this._setupEventListeners(field);

      // TODO: handle mount of the field
      field.mount(this._ref);

      this.context.registerField(field);
    });
  }

  componentWillReceiveProps (nextProps) {
    const options = _extractOptions(nextProps);
    if (Object.keys(options).length !== 0 && JSON.stringify(options) !== JSON.stringify(this._options)) {
      this._options = options;
      // TODO: handle options updates for the field
      // if (this._field) this._field.update(options);
    }
  }

  componentWillUnmount() {
    if (this._field) {
      const field = this._field;
      field.destroy();
      this.context.unregisterField(field);
    }
  }

  _setupEventListeners (field) {
    field.on('ready', () => this.props.onReady(this._element));
    field.on('change', state => this.props.onChange(state));
    field.on('blur', ...args => this.props.onBlur(...args));
    field.on('focus', ...args => this.props.onFocus(...args));
  }

  handleRef = ref => {
    this._ref = ref;
  };
};

function _extractOptions (props) {
  const {id, className, onChange, onFocus, onBlur, onReady, ...options} = props;
  return options;
}
