"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RecurlyElementsContext = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _provider = require("./provider");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var RecurlyElementsContext = exports.RecurlyElementsContext = /*#__PURE__*/_react["default"].createContext();
var Provider = RecurlyElementsContext.Provider;
var Elements = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function Elements(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, Elements);
    _this = _callSuper(this, Elements, [props, context]);
    if (!context || !context.recurly) {
      throw new Error('<Elements> must be within a <RecurlyProvider> tree.');
    }
    _this._elements = _this.context.recurly.Elements();
    _this._elements.on('submit', function (el) {
      return _this.props.onSubmit(el);
    });
    return _this;
  }
  (0, _inherits2["default"])(Elements, _React$Component);
  return (0, _createClass2["default"])(Elements, [{
    key: "render",
    value: function render() {
      var elements = this._elements;
      return /*#__PURE__*/_react["default"].createElement(Provider, {
        value: {
          elements: elements
        }
      }, this.props.children);
    }
  }]);
}(_react["default"].Component);
(0, _defineProperty2["default"])(Elements, "propTypes", {
  /**
   * Called when a user presses the <kbd>enter</kbd> key while
   * focused on any descendant `*Element`.
   */
  onSubmit: _propTypes["default"].func
});
(0, _defineProperty2["default"])(Elements, "defaultProps", {
  onSubmit: function onSubmit() {}
});
(0, _defineProperty2["default"])(Elements, "contextType", _provider.RecurlyContext);
;