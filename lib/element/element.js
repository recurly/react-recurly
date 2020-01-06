import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { RecurlyElementsContext } from '../elements';

const noop = () => {};
const extractOptions = props => {
  const { id, className, onChange, onBlur, onFocus, onReady, onSubmit, ...options } = props;
  return options;
};

export default class Element extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onReady: noop,
    onSubmit: noop,
  };

  static contextType = RecurlyElementsContext;

  configureElement = memoize(
    (element, options) => element && Object.keys(options).length > 0 && element.configure(options),
  );

  constructor(props, context) {
    super(props, context);

    const options = extractOptions(this.props);
    const element = (this._element = context.elements[this.constructor.elementClassName](options));
    this._container = React.createRef();

    element.on('ready', (...args) => this.props.onReady(...args));
    element.on('change', (...args) => this.props.onChange(...args));
    element.on('blur', (...args) => this.props.onBlur(...args));
    element.on('focus', (...args) => this.props.onFocus(...args));
    element.on('submit', (...args) => this.props.onSubmit(...args));
  }

  componentDidMount() {
    this._element.attach(this._container.current);
  }

  componentWillUnmount() {
    this._element.destroy();
  }

  render() {
    const { _element: element, props } = this;

    this.configureElement(element, extractOptions(props));

    console.log({ element });

    return <div id={props.id} className={props.className} ref={this._container} />;
  }
}
