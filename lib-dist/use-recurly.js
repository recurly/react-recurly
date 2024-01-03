"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useRecurly;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = require("react");
var _elements = require("./elements");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Provides a recurly instance bound to the provider tree
 */
function useRecurly() {
  var elementsContext = (0, _react.useContext)(_elements.RecurlyElementsContext);
  if (!elementsContext || !elementsContext.elements) {
    throw new Error("It looks like you are trying to use Recurly outside of an Elements context.\n       Please be sure the component that calls 'useRecurly' is within an <Elements> component.");
  }
  var elements = elementsContext.elements;
  var recurly = _objectSpread(_objectSpread({}, elements.recurly), {}, {
    // Provide a curried token method to bind the elements from the closest context
    token: function token() {
      var _elements$recurly;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_elements$recurly = elements.recurly).token.apply(_elements$recurly, [elements].concat(args));
    }
  });
  Object.setPrototypeOf(recurly, elements.recurly);
  return recurly;
}