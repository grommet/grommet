function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';
export var StepperDescription = function StepperDescription(_ref) {
  var _theme$stepper;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = useStepper(),
    direction = _useStepper.direction;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useStepItem = useStepItem(),
    step = _useStepItem.step;
  if (!step || !step.description) return null;
  var descriptionProps = (_theme$stepper = theme.stepper) == null ? void 0 : _theme$stepper.description;
  return /*#__PURE__*/React.createElement(Text, _extends({}, descriptionProps, {
    truncate: direction === 'horizontal'
  }, rest), step.description);
};