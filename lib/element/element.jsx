import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { RecurlyElementsContext } from '../elements';

const noop = () => {};
const extractOptions = props => {
  const { id, className, onChange, onBlur, onFocus, onReady, onSubmit, ...options } = props;
  return options;
};

/**
 * An [Element](https://developers.recurly.com/reference/recurly-js/#elements)
 * component which wraps its Recurly.js analogue, passing configuration props to the underlying
 * Recurly.js Element and allowing event binding using props.
 */
export default class Element extends React.PureComponent {
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
     * Called when the state of the Element changes.
     */
    onChange: PropTypes.func,

    /**
     * Called when a user blurs from the Element.
     */
    onBlur: PropTypes.func,

    /**
     * Called when a user focuses on the Element.
     */
    onFocus: PropTypes.func,

    /**
     * Called when the Element has finished initializing.
     */
    onReady: PropTypes.func,

    /**
     * Called when a user presses the <kbd>enter</kbd> key while focused on the Element.
     */
    onSubmit: PropTypes.func,

    /**
     * Set style attributes for the Element.
     * See [Styling Elements](https://developers.recurly.com/reference/recurly-js/#styling-elements)
     * for available options.
     */
    style: PropTypes.object,

    /**
     * [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
     * property to be applied to the outer iframe.
     */
    tabIndex: PropTypes.string
  };

  static defaultProps = {
    id: undefined,
    className: undefined,
    onChange: state => {},
    onBlur: noop,
    onFocus: noop,
    onReady: noop,
    onSubmit: noop,
    style: {},
    tabIndex: undefined
  };

  static contextType = RecurlyElementsContext;

  configureElement = memoize(
    (element, options) => element && Object.keys(options).length > 0 && element.configure(options)
  );

  constructor (props, context) {
    super(props, context);
    const { elementClassName } = this.constructor;

    if (!context || !context.elements) {
      throw new Error(`<${elementClassName}> must be within an <Elements> tree.`);
    }

    this._container = React.createRef();
  }

  componentDidMount () {
    const { elementClassName } = this.constructor;
    const options = extractOptions(this.props);
    const element = this._element = this.context.elements[elementClassName](options);

    element.on('attach', (...args) => this.props.onReady(...args));
    element.on('change', (...args) => this.props.onChange(...args));
    element.on('blur', (...args) => this.props.onBlur(...args));
    element.on('focus', (...args) => this.props.onFocus(...args));
    element.on('submit', (...args) => this.props.onSubmit(...args));

    this._element.attach(this._container.current);
  }

  componentWillUnmount () {
    this._element.destroy();
  }

  render () {
    const { _element: element, props } = this;

    this.configureElement(element, extractOptions(props));

    return (
      <div
        id={props.id}
        className={props.className}
        ref={this._container}
      />
    );
  }
};
