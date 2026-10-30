"use strict";

exports.__esModule = true;
exports.StepConnector = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _useThemeValue2 = require("../../utils/useThemeValue");
var _StyledStepper = require("./StyledStepper");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var StyledStepConnectorGroup = _styledComponents["default"].div.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return (0, _isPropValid["default"])(prop) && prop !== 'direction';
  }
}).withConfig({
  displayName: "StepConnector__StyledStepConnectorGroup",
  componentId: "sc-1k7y9sb-0"
})(["display:flex;flex-direction:column;position:relative;flex:1;overflow:visible;", ""], function (props) {
  return props.direction === 'horizontal' && (0, _styledComponents.css)(["align-items:center;"]);
});
var StepConnector = exports.StepConnector = function StepConnector(_ref) {
  var step = _ref.step,
    direction = _ref.direction,
    children = _ref.children;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/_react["default"].createElement(StyledStepConnectorGroup, _extends({
    direction: direction
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true",
    isBetween: true
  }, passThemeFlag)), children);
};