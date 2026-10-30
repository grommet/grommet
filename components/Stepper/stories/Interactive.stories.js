"use strict";

exports.__esModule = true;
exports["default"] = exports.Interactive = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Interactive = exports.Interactive = function Interactive() {
  var _useState = (0, _react.useState)('step1'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'step1',
    title: 'Step 1',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Step 2',
    status: 'error',
    errorMessage: 'Fix the issue before proceeding.'
  }, {
    id: 'step3',
    title: 'Step 3',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Current : ", currentStep), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "xlarge"
    }, /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      steps: steps,
      currentStep: currentStep,
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "small"
    }, steps.map(function (step) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        key: step.id,
        label: "Go to " + step.id,
        onClick: function onClick() {
          return setCurrentStep(step.id);
        },
        disabled: step.status === 'disabled'
      });
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Interactive'
};