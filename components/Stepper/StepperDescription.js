"use strict";

exports.__esModule = true;
exports.StepperDescription = void 0;
var _react = _interopRequireDefault(require("react"));
var _Text = require("../Text");
var _StepperContext = require("./StepperContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var StepperDescription = exports.StepperDescription = function StepperDescription(_ref) {
  var _theme$stepper;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = (0, _StepperContext.useStepper)(),
    direction = _useStepper.direction;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useStepItem = (0, _StepperContext.useStepItem)(),
    step = _useStepItem.step;
  if (!step || !step.description) return null;
  var descriptionProps = (_theme$stepper = theme.stepper) == null ? void 0 : _theme$stepper.description;
  return /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({}, descriptionProps, {
    truncate: direction === 'horizontal'
  }, rest), step.description);
};