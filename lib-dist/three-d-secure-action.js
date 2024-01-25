"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var ThreeDSecureAction = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(ThreeDSecureAction, _React$PureComponent);
  var _super = _createSuper(ThreeDSecureAction);
  function ThreeDSecureAction(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, ThreeDSecureAction);
    _this = _super.call(this, props, context);
    if (!context || !context.recurly) {
      throw new Error('<ThreeDSecureAction> must be within a <RecurlyProvider> tree.');
    }
    var actionTokenId = props.actionTokenId;
    _this._container = /*#__PURE__*/_react["default"].createRef();
    _this._risk = _this.context.recurly.Risk();
    _this._threeDSecure = _this._risk.ThreeDSecure({
      actionTokenId: actionTokenId
    });
    _this._threeDSecure.on('ready', function () {
      var _this$props;
      return (_this$props = _this.props).onReady.apply(_this$props, arguments);
    });
    _this._threeDSecure.on('token', function () {
      var _this$props2;
      return (_this$props2 = _this.props).onToken.apply(_this$props2, arguments);
    });
    _this._threeDSecure.on('error', function () {
      var _this$props3;
      return (_this$props3 = _this.props).onError.apply(_this$props3, arguments);
    });
    return _this;
  }
  (0, _createClass2["default"])(ThreeDSecureAction, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._threeDSecure.attach(this._container.current);
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
  return ThreeDSecureAction;
}(_react["default"].PureComponent);
exports["default"] = ThreeDSecureAction;
(0, _defineProperty2["default"])(ThreeDSecureAction, "propTypes", {
  /**
   * Applied to the container.
   */
  id: _propTypes["default"].string,
  /**
   * Applied to the container.
   */
  className: _propTypes["default"].string,
  /**
   * `three_d_secure_action_token_id` returned by the Recurly API when 3-D Secure
   * authentication is required for a transaction.
   */
  actionTokenId: _propTypes["default"].string,
  /**
   * Called when the 3-D Secure flow is ready for interaction
   * @type {ThreeDSecureAction~onReady}
   */

  /**
   * @callback ThreeDSecureAction~onReady
   */
  onReady: _propTypes["default"].func,
  /**
   * Called when the user has completed the 3D Secure flow
   * @type {ThreeDSecureAction~onToken}
   */

  /**
   * @callback ThreeDSecureAction~onToken
   * @param {ThreeDSecureActionResultToken}
   */
  onToken: _propTypes["default"].func,
  /**
   * Called when an error is encountered
   * @type {ThreeDSecureAction~onError}
   */

  /**
   * @callback ThreeDSecureAction~onError
   * @param {RecurlyError}
   */
  onError: _propTypes["default"].func
});
(0, _defineProperty2["default"])(ThreeDSecureAction, "defaultProps", {
  id: undefined,
  className: undefined,
  actionTokenId: '',
  onReady: function onReady() {},
  onToken: function onToken() {},
  onError: function onError(e) {
    throw e;
  }
});
(0, _defineProperty2["default"])(ThreeDSecureAction, "contextType", _provider.RecurlyContext);
;