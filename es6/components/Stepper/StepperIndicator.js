var _excluded = ["color", "icon", "iconSize", "size"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepTheme } from './utils';
import { useStepper, useStepItem } from './StepperContext';
import { StyledIndicator } from './StyledStepper';
var getMetricSize = function getMetricSize(theme, size) {
  var _theme$global;
  return ((_theme$global = theme.global) == null || (_theme$global = _theme$global.edgeSize) == null ? void 0 : _theme$global[size]) || size;
};
var renderIcon = function renderIcon(Icon, props) {
  if (!Icon) return null;
  var iconProps = _extends({
    color: 'currentColor'
  }, props);
  if (/*#__PURE__*/React.isValidElement(Icon)) {
    return /*#__PURE__*/React.cloneElement(Icon, _extends({}, iconProps, {
      'aria-hidden': true
    }));
  }
  return /*#__PURE__*/React.createElement(Icon, _extends({}, iconProps, {
    "aria-hidden": true
  }));
};
export var StepperIndicator = function StepperIndicator(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = useStepper(),
    clickableSteps = _useStepper.clickableSteps;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useStepItem = useStepItem(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep,
    isDisabled = _useStepItem.isDisabled;
  var stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;
  var isClickable = clickableSteps && !isDisabled;

  // grab the icon pieces and size. Size will be handled
  // in the StyledIndicator component but we pull it out
  // here to leave other props as boxProps
  var indicatorTheme = (stepTheme == null ? void 0 : stepTheme.indicator) || {};
  var color = indicatorTheme.color,
    icon = indicatorTheme.icon,
    iconSize = indicatorTheme.iconSize,
    size = indicatorTheme.size,
    boxProps = _objectWithoutPropertiesLoose(indicatorTheme, _excluded);

  // Convert the icon-related size to a width and height for a box.
  // T-shirt sizes for Box are
  var indicatorSizeToken = (indicatorTheme == null ? void 0 : indicatorTheme.size) || 'medium';
  var sizeMetric = getMetricSize(theme, indicatorSizeToken);
  return /*#__PURE__*/React.createElement(StyledIndicator, _extends({
    stepTheme: stepTheme,
    flex: false,
    isClickable: isClickable,
    width: {
      width: sizeMetric,
      max: sizeMetric
    },
    height: {
      height: sizeMetric,
      max: sizeMetric
    }
  }, boxProps, passThemeFlag, rest), renderIcon(icon, {
    size: iconSize
  }));
};