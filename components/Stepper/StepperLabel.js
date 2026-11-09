"use strict";

exports.__esModule = true;
exports.StepperLabel = void 0;
var _react = _interopRequireDefault(require("react"));
var _StepperContext = require("./StepperContext");
var _utils = require("./utils");
var _StyledStepper = require("./StyledStepper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var StepperLabel = exports.StepperLabel = function StepperLabel(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = (0, _StepperContext.useStepper)(),
    clickableSteps = _useStepper.clickableSteps,
    direction = _useStepper.direction;
  var _useStepItem = (0, _StepperContext.useStepItem)(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  var stepTheme = (0, _utils.useStepTheme)(step, isSubStep);
  if (!step) return null;
  var isDisabled = step.status === 'disabled';
  var isClickable = clickableSteps && !isDisabled;
  return /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepLabel, _extends({}, stepTheme.label, {
    truncate: direction === 'horizontal',
    stepTheme: stepTheme,
    isClickable: isClickable
  }, rest), step.title);
};