"use strict";

exports.__esModule = true;
exports["default"] = exports.VerticalSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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