"use strict";

exports.__esModule = true;
exports["default"] = exports.ReadOnly = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ReadOnly = exports.ReadOnly = function ReadOnly() {
  var steps = [{
    id: 'step1',
    title: 'Step 1',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Step 2',
    status: 'completed'
  }, {
    id: 'step3',
    title: 'Step 3',
    status: 'pending'
  }, {
    id: 'step4',
    title: 'Step 4',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      steps: steps,
      currentStep: "step3",
      clickableSteps: false
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Read-Only'
};