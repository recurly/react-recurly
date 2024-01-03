"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RecurlyContext = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _package = require("../package.json");
var _excluded = ["children"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RecurlyContext = /*#__PURE__*/_react["default"].createContext({
  recurly: null
});
exports.RecurlyContext = RecurlyContext;
var Provider = RecurlyContext.Provider;

/**
 * This is the top-level component for `react-recurly`, and must wrap any other
 * `react-recurly` component you will use. It is responsible for creating a `Recurly.js`
 * instance for any descendant components to interact with.
 *
 * This component accepts your `publicKey` and other configuration options for Recurly.js as props.
 */
var RecurlyProvider = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(RecurlyProvider, _React$Component);
  var _super = _createSuper(RecurlyProvider);
  function RecurlyProvider(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, RecurlyProvider);
    _this = _super.call(this, props);
    if (!(_this.props.publicKey || _this.props.hostname)) {
      throw new Error("\n        Please pass your 'publicKey' value to this RecurlyProvider.\n        Example: <RecurlyProvider publicKey=\"MY_PUBLIC_KEY\">\n      ");
    }

    // TODO: ensure proper shape?
    if (!window.recurly || !window.recurly.Recurly) {
      throw new Error("\n        Please load Recurly.js (https://js.recurly.com/v4/recurly.js) on this page prior to\n        loading your React application.\n      ");
    }
    var _this$props = _this.props,
      children = _this$props.children,
      options = (0, _objectWithoutProperties2["default"])(_this$props, _excluded);
    _this._recurly = fetchRecurlyInstance(options);
    if (!RecurlyProvider.hasReportedInitialization && _this._recurly.report) {
      _this._recurly.ready(function () {
        _this._recurly.report('react-recurly', {
          version: _package.version
        });
      });
      RecurlyProvider.hasReportedInitialization = true;
    }
    return _this;
  }
  (0, _createClass2["default"])(RecurlyProvider, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(Provider, {
        value: {
          recurly: this._recurly
        }
      }, this.props.children);
    }
  }]);
  return RecurlyProvider;
}(_react["default"].Component);
exports["default"] = RecurlyProvider;
(0, _defineProperty2["default"])(RecurlyProvider, "propTypes", {
  /**
   * Your Recurly public key. See
   * [API Access](https://app.recurly.com/go/developer/api_access).
   */
  publicKey: _propTypes["default"].string,
  /**
   * Register the current hostname
   */
  hostname: _propTypes["default"].string,
  /**
   * Sets a default currency
   */
  currency: _propTypes["default"].string,
  /**
   * Adds additional field requirements for tokenization. ex: ['cvv']
   */
  required: _propTypes["default"].arrayOf(_propTypes["default"].string),
  /**
   * API request timeout in ms
   */
  timeout: _propTypes["default"].number,
  /**
   * Fraud configuration. See the
   * [Recurly-js docs on fraud configuration](https://developers.recurly.com/reference/recurly-js/index.html#fraud)
   */
  fraud: _propTypes["default"].shape({
    kount: _propTypes["default"].shape({
      dataCollector: _propTypes["default"].bool
    }),
    braintree: _propTypes["default"].shape({
      deviceData: _propTypes["default"].string
    }),
    litle: _propTypes["default"].shape({
      sessionId: _propTypes["default"].string
    })
  })
});
(0, _defineProperty2["default"])(RecurlyProvider, "defaultProps", {
  publicKey: ''
});
;

/**
 * Retrieves a recurly instance from a cache on the Recurly class, or creates one
 * if none found on the cache key. This is used when the Provider is being
 * regularly re-instantiated
 *
 * @param  {object} options instance instantiation options
 * @return {Recurly}
 */
function fetchRecurlyInstance(options) {
  var cache = window.recurly.Recurly.__instanceCache = window.recurly.Recurly.__instanceCache || {};
  var key = JSON.stringify(options);
  var recurly = cache[key] || new window.recurly.Recurly();
  recurly.configure(options);
  cache[key] = recurly;
  return recurly;
}