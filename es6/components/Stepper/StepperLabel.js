function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useStepper, useStepItem } from './StepperContext';
import { useStepTheme } from './utils';
import { StyledStepLabel } from './StyledStepper';
export var StepperLabel = function StepperLabel(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = useStepper(),
    clickableSteps = _useStepper.clickableSteps,
    direction = _useStepper.direction;
  var _useStepItem = useStepItem(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  var stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;
  var isDisabled = step.status === 'disabled';
  var isClickable = clickableSteps && !isDisabled;
  return /*#__PURE__*/React.createElement(StyledStepLabel, _extends({}, stepTheme.label, {
    truncate: direction === 'horizontal',
    stepTheme: stepTheme,
    isClickable: isClickable
  }, rest), step.title);
};