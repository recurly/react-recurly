"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useCheckoutPricing;
exports.throwError = throwError;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _useRecurly = _interopRequireDefault(require("./use-recurly"));
var _excluded = ["subscriptions", "adjustments"];
/**
 * @typedef {Object} address
 * @property {String} country
 * @property {String} postalCode
 * @property {String} vatNumber
 */

/**
 * useCheckoutPricing interface
 * @typedef {Object} useCheckoutPricingInterface
 * @property {Array} subscriptions
 * @property {Array} adjustments
 * @property {String} currency
 * @property {address} address
 * @property {address} shippingAddress
 * @property {String} coupon
 * @property {String} giftCard
 * @property {Object} tax
 */
/**
 * A custom hook for interfacing with recurly.js' checkoutPricing API meant to mimic the call signature, return
 * type, and behavior of `react.useState`.
 *
 * Accepts an `initialInputs` param (same as useState) and an error handling function.
 *
 * Returns a tuple with an output object and an update function similar to useState.
 *
 * @typedef {Object} output
 * @property {Object} price
 * @property {Object} pricing
 * @property {Boolean} loading
 *
 * @typedef {Function} setPricing
 * @typedef {[output, setPricing]} useCheckoutPricingInstance
 *
 * @param {PricingInput} useCheckoutPricingInterface
 * @param {function} handleError
 * @returns {useCheckoutPricingInstance} useCheckoutPricingInstance
 */
function useCheckoutPricing(initialInputs) {
  var handleError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : throwError;
  var recurly = (0, _useRecurly["default"])();
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(initialInputs || {}),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    input = _useState4[0],
    setInput = _useState4[1];
  var _useState5 = (0, _react.useState)(recurly.Pricing.Checkout()),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    pricing = _useState6[0],
    setPricing = _useState6[1];
  (0, _react.useEffect)(function () {
    setLoading(true);
    var _input$subscriptions = input.subscriptions,
      subscriptions = _input$subscriptions === void 0 ? [] : _input$subscriptions,
      _input$adjustments = input.adjustments,
      adjustments = _input$adjustments === void 0 ? [] : _input$adjustments,
      restInputs = (0, _objectWithoutProperties2["default"])(input, _excluded);
    var checkoutPricing = recurly.Pricing.Checkout();
    addSubscriptions(subscriptions, checkoutPricing).then(function () {
      checkoutPricing = addAdjustments(adjustments, checkoutPricing);
      checkoutPricing = addRestInputs(restInputs, checkoutPricing);
      checkoutPricing = checkoutPricing.reprice().done(function () {
        setPricing(checkoutPricing);
        setLoading(false);
      });
    });
    function addAdjustments(adjustments, checkoutPricing) {
      if (!adjustments.length) return checkoutPricing.reprice();
      return adjustments.reduce(function (checkoutPricing, adjustment) {
        return checkoutPricing.adjustment(adjustment)["catch"](handleError);
      }, checkoutPricing);
    }
    ;
    function addRestInputs(restInputs, checkoutPricing) {
      var restInputsEntries = Object.entries(restInputs);
      if (!restInputsEntries.length) return checkoutPricing.reprice();
      var PRICING_METHODS = checkoutPricing.pricing.PRICING_METHODS;
      var exclude = ['reset', 'remove', 'reprice', 'subscription', 'adjustment', 'addon', 'plan'];
      var permittedInputs = PRICING_METHODS.filter(function (method) {
        return !exclude.includes(method);
      });
      return restInputsEntries.reduce(function (acc, input) {
        var _input = (0, _slicedToArray2["default"])(input, 2),
          method = _input[0],
          value = _input[1];
        var shouldCallPricingMethod = value && permittedInputs.includes(method);
        return shouldCallPricingMethod ? acc[method](value)["catch"](handleError) : acc;
      }, checkoutPricing);
    }
    ;
    function addSubscriptions(subscriptions, checkoutPricing) {
      var _subscriptions$reduce = subscriptions.reduce(function (_ref, _ref2) {
          var checkoutPricing = _ref.checkoutPricing,
            subscriptionPricings = _ref.subscriptionPricings;
          var id = _ref2.id,
            plan = _ref2.plan,
            tax = _ref2.tax,
            _ref2$addons = _ref2.addons,
            addons = _ref2$addons === void 0 ? [] : _ref2$addons,
            quantity = _ref2.quantity;
          var subscriptionPricing = recurly.Pricing.Subscription();
          if (id) {
            subscriptionPricing.id = id;
          }
          if (restInputs.currency) {
            subscriptionPricing = subscriptionPricing.currency(restInputs.currency);
          }
          subscriptionPricing = subscriptionPricing.plan(plan, {
            quantity: quantity
          });
          if (addons.length) {
            subscriptionPricing = addAddons(addons, subscriptionPricing);
          }
          if (tax) {
            subscriptionPricing = subscriptionPricing.tax(tax);
          }
          subscriptionPricing = subscriptionPricing["catch"](handleError);
          return {
            checkoutPricing: checkoutPricing.subscription(subscriptionPricing.done())["catch"](handleError),
            subscriptionPricings: [].concat((0, _toConsumableArray2["default"])(subscriptionPricings), [subscriptionPricing])
          };
        }, {
          checkoutPricing: checkoutPricing,
          subscriptionPricings: []
        }),
        subscriptionPricings = _subscriptions$reduce.subscriptionPricings;
      return Promise.all(subscriptionPricings);
    }
    ;
    function addAddons() {
      var addons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var subscriptionPricing = arguments.length > 1 ? arguments[1] : undefined;
      return addons.reduce(function (subscriptionPricing, _ref3) {
        var code = _ref3.code,
          quantity = _ref3.quantity;
        return subscriptionPricing.addon(code, {
          quantity: quantity
        });
      }, subscriptionPricing)["catch"](handleError);
    }
    ;
  }, [input, handleError, recurly.Pricing]);
  var pricingState = {
    price: pricing && structuredClone(pricing.price) || {},
    loading: loading
  };
  return [pricingState, setInput, pricing];
}
;
function throwError(err) {
  throw err;
}
;