"use strict";

exports.__esModule = true;
exports["default"] = exports.ThemingLightDark = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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