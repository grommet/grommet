"use strict";

exports.__esModule = true;
exports["default"] = exports.HorizontalSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var HorizontalSteps = exports.HorizontalSteps = function HorizontalSteps() {
  var _useState = (0, _react.useState)('profile'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'account',
    title: 'Account',
    status: 'completed'
  }, {
    id: 'profile',
    title: 'Profile',
    status: 'pending'
  }, {
    id: 'review',
    title: 'Review',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      gap: "medium",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "horizontal",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "background-contrast",
      round: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step content for \"", currentStep, "\"")))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Horizontal Steps'
};