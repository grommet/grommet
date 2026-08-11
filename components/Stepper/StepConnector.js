"use strict";

exports.__esModule = true;
exports.StepConnector = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _useThemeValue2 = require("../../utils/useThemeValue");
var _StyledStepper = require("./StyledStepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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