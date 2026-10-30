"use strict";

exports.__esModule = true;
exports["default"] = exports.VerticalSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var VerticalSteps = exports.VerticalSteps = function VerticalSteps() {
  var _steps$find, _steps$find2;
  var _useState = (0, _react.useState)('deploy'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'setup',
    title: 'Setup',
    description: 'Configure your environment.',
    status: 'completed'
  }, {
    id: 'deploy',
    title: 'Deploy',
    status: 'pending'
  }, {
    id: 'verify',
    title: 'Verify',
    description: 'Run post-deployment checks.',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "medium",
      pad: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "vertical",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true,
      pad: "medium",
      background: "background-contrast",
      round: "small",
      height: {
        min: 'medium'
      },
      gap: "none"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2
    }, (_steps$find = steps.find(function (s) {
      return s.id === currentStep;
    })) == null ? void 0 : _steps$find.title), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      color: "text-strong"
    }, (_steps$find2 = steps.find(function (s) {
      return s.id === currentStep;
    })) == null ? void 0 : _steps$find2.description), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step content")))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Vertical Steps'
};