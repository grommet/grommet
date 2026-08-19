"use strict";

exports.__esModule = true;
exports["default"] = exports.ThemingLightDark = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ThemingLightDark = exports.ThemingLightDark = function ThemingLightDark() {
  var _useState = (0, _react.useState)('step1'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'step1',
    title: 'Account',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Profile',
    status: 'pending'
  }, {
    id: 'step3',
    title: 'Review',
    status: 'pending'
  }];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    background: "background-front"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3
  }, "Light Theme"), /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
    steps: steps,
    currentStep: currentStep,
    onStepClick: function onStepClick(id) {
      return setCurrentStep(id);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      dark: true
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    background: "background-front"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3
  }, "Dark Theme"), /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
    steps: steps,
    currentStep: currentStep,
    onStepClick: function onStepClick(id) {
      return setCurrentStep(id);
    }
  }))));
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Theming Light Dark'
};