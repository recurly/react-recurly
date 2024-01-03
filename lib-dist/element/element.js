"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _memoizeOne = _interopRequireDefault(require("memoize-one"));
var _elements = require("../elements");
var _excluded = ["id", "className", "onChange", "onBlur", "onFocus", "onReady", "onSubmit"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var noop = function noop() {};
var extractOptions = function extractOptions(props) {
  var id = props.id,
    className = props.className,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    onReady = props.onReady,
    onSubmit = props.onSubmit,
    options = (0, _objectWithoutProperties2["default"])(props, _excluded);
  return options;
};

/**
 * An [Element](https://developers.recurly.com/reference/recurly-js/#elements)
 * component which wraps its Recurly.js analogue, passing configuration props to the underlying
 * Recurly.js Element and allowing event binding using props.
 */
var Element = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(Element, _React$PureComponent);
  var _super = _createSuper(Element);
  function Element(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, Element);
    _this = _super.call(this, props, context);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "configureElement", (0, _memoizeOne["default"])(function (element, options) {
      return element && Object.keys(options).length > 0 && element.configure(options);
    }));
    var elementClassName = _this.constructor.elementClassName;
    if (!context || !context.elements) {
      throw new Error("<".concat(elementClassName, "> must be within an <Elements> tree."));
    }
    _this._container = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  (0, _createClass2["default"])(Element, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var elementClassName = this.constructor.elementClassName;
      var options = extractOptions(this.props);
      var element = this._element = this.context.elements[elementClassName](options);
      element.on('attach', function () {
        var _this2$props;
        return (_this2$props = _this2.props).onReady.apply(_this2$props, arguments);
      });
      element.on('change', function () {
        var _this2$props2;
        return (_this2$props2 = _this2.props).onChange.apply(_this2$props2, arguments);
      });
      element.on('blur', function () {
        var _this2$props3;
        return (_this2$props3 = _this2.props).onBlur.apply(_this2$props3, arguments);
      });
      element.on('focus', function () {
        var _this2$props4;
        return (_this2$props4 = _this2.props).onFocus.apply(_this2$props4, arguments);
      });
      element.on('submit', function () {
        var _this2$props5;
        return (_this2$props5 = _this2.props).onSubmit.apply(_this2$props5, arguments);
      });
      this._element.attach(this._container.current);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._element.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var element = this._element,
        props = this.props;
      this.configureElement(element, extractOptions(props));
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: props.id,
        className: props.className,
        ref: this._container
      });
    }
  }]);
  return Element;
}(_react["default"].PureComponent);
exports["default"] = Element;
(0, _defineProperty2["default"])(Element, "propTypes", {
  /**
   * Applied to the container.
   */
  id: _propTypes["default"].string,
  /**
   * Applied to the container.
   */
  className: _propTypes["default"].string,
  /**
   * Called when the state of the Element changes.
   */
  onChange: _propTypes["default"].func,
  /**
   * Called when a user blurs from the Element.
   */
  onBlur: _propTypes["default"].func,
  /**
   * Called when a user focuses on the Element.
   */
  onFocus: _propTypes["default"].func,
  /**
   * Called when the Element has finished initializing.
   */
  onReady: _propTypes["default"].func,
  /**
   * Called when a user presses the <kbd>enter</kbd> key while focused on the Element.
   */
  onSubmit: _propTypes["default"].func,
  /**
   * Set style attributes for the Element.
   * See [Styling Elements](https://developers.recurly.com/reference/recurly-js/#styling-elements)
   * for available options.
   */
  style: _propTypes["default"].object,
  /**
   * [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
   * property to be applied to the outer iframe.
   */
  tabIndex: _propTypes["default"].string
});
(0, _defineProperty2["default"])(Element, "defaultProps", {
  id: undefined,
  className: undefined,
  onChange: function onChange(state) {},
  onBlur: noop,
  onFocus: noop,
  onReady: noop,
  onSubmit: noop,
  style: {},
  tabIndex: undefined
});
(0, _defineProperty2["default"])(Element, "contextType", _elements.RecurlyElementsContext);
;