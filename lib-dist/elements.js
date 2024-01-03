"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RecurlyElementsContext = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _provider = require("./provider");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RecurlyElementsContext = /*#__PURE__*/_react["default"].createContext();
exports.RecurlyElementsContext = RecurlyElementsContext;
var Provider = RecurlyElementsContext.Provider;
var Elements = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Elements, _React$Component);
  var _super = _createSuper(Elements);
  function Elements(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, Elements);
    _this = _super.call(this, props, context);
    if (!context || !context.recurly) {
      throw new Error('<Elements> must be within a <RecurlyProvider> tree.');
    }
    _this._elements = _this.context.recurly.Elements();
    _this._elements.on('submit', function (el) {
      return _this.props.onSubmit(el);
    });
    return _this;
  }
  (0, _createClass2["default"])(Elements, [{
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
  return Elements;
}(_react["default"].Component);
exports["default"] = Elements;
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