function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useStepTheme } from './utils';
export var StepperDescription = function StepperDescription(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = useStepper(),
    direction = _useStepper.direction;
  var _useStepItem = useStepItem(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  var stepTheme = useStepTheme(step, isSubStep);
  if (!step || !step.description) return null;
  return /*#__PURE__*/React.createElement(Text, _extends({
    truncate: direction === 'horizontal'
  }, stepTheme.description, rest), step.description);
};