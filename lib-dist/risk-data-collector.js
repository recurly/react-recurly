"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RISK_STRATEGIES = void 0;
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
var RISK_STRATEGIES = exports.RISK_STRATEGIES = ['kount'];

/**
 * Injects risk data collection point in your checkout.
 *
 * <https://docs.recurly.com/docs/kount>
 */
var RiskDataCollector = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function RiskDataCollector(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, RiskDataCollector);
    _this = _callSuper(this, RiskDataCollector, [props, context]);
    if (!context || !context.recurly) {
      throw new Error('<RiskDataCollector> must be within a <RecurlyProvider> tree.');
    }

    /**
     * TODO
     * Once recurly.Fraud is decommissioned in favor of recurly.Risk.FraudConcern,
     * this will change to consume a RiskProvider.
     */
    _this._container = /*#__PURE__*/_react["default"].createRef();
    _this._recurly = _this.context.recurly;
    return _this;
  }
  (0, _inherits2["default"])(RiskDataCollector, _React$Component);
  return (0, _createClass2["default"])(RiskDataCollector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = this._container,
        recurly = this._recurly;
      var _this$props = this.props,
        strategy = _this$props.strategy,
        onError = _this$props.onError;
      recurly.configure({
        fraud: (0, _defineProperty2["default"])({}, strategy, {
          dataCollector: true,
          form: container.current
        })
      });
      var fraud = this._fraud = recurly.fraud;
      fraud.on('error', function () {
        return onError.apply(void 0, arguments);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: this.props.id,
        className: this.props.className,
        ref: this._container
      });
    }
  }]);
}(_react["default"].Component);
(0, _defineProperty2["default"])(RiskDataCollector, "propTypes", {
  /**
   * Applied to the container.
   */
  id: _propTypes["default"].string,
  /**
   * Applied to the container.
   */
  className: _propTypes["default"].string,
  /**
   * Risk data collection strategy.
   *
   * Possible values: 'kount'
   */
  strategy: _propTypes["default"].oneOf(RISK_STRATEGIES),
  /**
   * Called when an error is encountered
   * @type {FraudDataCollector~onError}
   */

  /**
   * @callback FraudDataCollector~onError
   * @param {RecurlyError}
   */
  onError: _propTypes["default"].func
});
(0, _defineProperty2["default"])(RiskDataCollector, "defaultProps", {
  id: undefined,
  className: undefined,
  strategy: RISK_STRATEGIES[0],
  onError: function onError(e) {
    throw e;
  }
});
(0, _defineProperty2["default"])(RiskDataCollector, "contextType", _provider.RecurlyContext);
;