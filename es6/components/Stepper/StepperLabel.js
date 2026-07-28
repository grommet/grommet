function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { getEffectiveState } from './StepperIndicator';
import { useThemeValue } from '../../utils/useThemeValue';
var getStateProps = function getStateProps(theme, effectiveState) {
  var _theme$stepper;
  return ((_theme$stepper = theme.stepper) == null || (_theme$stepper = _theme$stepper[effectiveState]) == null ? void 0 : _theme$stepper.label) || {};
};
export var StepperLabel = function StepperLabel(_ref) {
  var _step$children, _theme$stepper2, _theme$stepper3;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = useStepper(),
    currentStep = _useStepper.currentStep,
    direction = _useStepper.direction;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useStepItem = useStepItem(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  if (!step) return null;
  var isCurrent = currentStep === step.id;
  var hasCurrentChild = !isSubStep && ((_step$children = step.children) == null ? void 0 : _step$children.some(function (c) {
    return c.id === currentStep;
  }));
  var isHighlighted = isCurrent || hasCurrentChild;
  var effectiveState = getEffectiveState(step.status, isHighlighted);
  var stateProps = getStateProps(theme, effectiveState);
  var size = isSubStep ? ((_theme$stepper2 = theme.stepper) == null || (_theme$stepper2 = _theme$stepper2.label) == null || (_theme$stepper2 = _theme$stepper2.substep) == null ? void 0 : _theme$stepper2.size) || 'small' : ((_theme$stepper3 = theme.stepper) == null || (_theme$stepper3 = _theme$stepper3.label) == null ? void 0 : _theme$stepper3.size) || 'medium';
  return /*#__PURE__*/React.createElement(Text, _extends({
    size: size,
    truncate: direction === 'horizontal'
  }, stateProps, rest), step.title);
};