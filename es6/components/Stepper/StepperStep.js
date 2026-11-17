var _excluded = ["gap"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useId } from '../../utils/useId';
import { useStepper, StepItemContext } from './StepperContext';
import { StepperIndicator } from './StepperIndicator';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperError, StepperDisabledReason } from './StepperHelperText';
import { StyledStepItem, StyledStepButton, StyledStepContent, StyledStepSupportingContent, StyledConnector, StyledSubStepsList } from './StyledStepper';
import { useStepTheme } from './utils';
export var StepperStep = function StepperStep(_ref) {
  var _step$children, _step$children2, _step$children$find, _stepsRef$current;
  var step = _ref.step,
    stepNumber = _ref.stepNumber,
    isLast = _ref.isLast,
    showConnector = _ref.showConnector,
    direction = _ref.direction,
    focusedIndex = _ref.focusedIndex,
    indexProp = _ref.index,
    isSubStep = _ref.isSubStep,
    subSteps = _ref.subSteps,
    onFocusStep = _ref.onFocusStep,
    stepsRef = _ref.stepsRef,
    stepRefs = _ref.stepRefs;
  var _useStepper = useStepper(),
    currentStep = _useStepper.currentStep,
    clickableSteps = _useStepper.clickableSteps,
    showDescription = _useStepper.showDescription,
    onStepClick = _useStepper.onStepClick,
    steps = _useStepper.steps;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var baseId = useId();
  var descriptionId = baseId + "-stepper-description-" + step.id;
  var errorId = baseId + "-stepper-error-" + step.id;
  var reasonId = baseId + "-stepper-reason-" + step.id;
  var index = indexProp !== undefined ? indexProp : steps.findIndex(function (s) {
    return s.id === step.id;
  });
  var isCurrent = currentStep === step.id;
  var hasCurrentChild = !isSubStep && ((_step$children = step.children) == null ? void 0 : _step$children.some(function (c) {
    return c.id === currentStep;
  }));
  var isHighlighted = isCurrent || hasCurrentChild;
  var hasChildren = !!((_step$children2 = step.children) != null && _step$children2.length);
  var navigationStepId = hasChildren ? (_step$children$find = step.children.find(function (child) {
    return child.status !== 'disabled';
  })) == null ? void 0 : _step$children$find.id : step.id;
  var isDisabled = step.status === 'disabled';
  var isNavigable = !isDisabled && !!navigationStepId;
  var isClickable = clickableSteps && isNavigable;
  var isReadOnly = !clickableSteps;
  var stepTheme = useStepTheme(step, isSubStep);
  var stepItemValue = useMemo(function () {
    return {
      step: step,
      index: index,
      isLast: isLast,
      isSubStep: isSubStep,
      isDisabled: isDisabled
    };
  }, [step, index, isLast, isSubStep, isDisabled]);
  var handleClick = function handleClick() {
    if (isClickable && navigationStepId && onStepClick) {
      onStepClick(navigationStepId);
    }
  };
  var totalSteps = ((_stepsRef$current = stepsRef.current) == null ? void 0 : _stepsRef$current.length) || stepNumber;
  var ariaLabel = step['aria-label'] || format({
    id: 'stepper.step',
    values: {
      step: stepNumber,
      total: totalSteps,
      title: step.title
    }
  });
  var accessibleLabel = step.status === 'completed' ? format({
    id: 'stepper.completed',
    values: {
      step: ariaLabel
    }
  }) : ariaLabel;
  var describedBy = [];
  if (showDescription && step.description) {
    describedBy.push(descriptionId);
  }
  if (step.errorMessage && step.status === 'error') {
    describedBy.push(errorId);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push(reasonId);
  }
  var hasSupportingContent = showDescription && !!step.description || step.status === 'error' && !!step.errorMessage || step.status === 'disabled' && !!step.disabledReason;
  var isVertical = direction === 'vertical';
  // In vertical direction the gap between indicator and label is
  // applied as column-gap on the step item grid (shared with the
  // supporting content), not as a Box gap on the button.
  var _ref2 = stepTheme.button || {},
    gap = _ref2.gap,
    buttonThemeRest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var buttonThemeProps = isVertical ? buttonThemeRest : stepTheme.button;
  var focusableProps = isReadOnly ? {} : {
    forwardedAs: 'button',
    type: 'button',
    background: 'none',
    border: {
      size: '0px'
    },
    tabIndex: focusedIndex === index ? 0 : -1,
    onClick: function onClick(event) {
      if (event.type === 'keydown') event.preventDefault();
      handleClick();
    },
    // indicator provides focus-visible treatment; avoid a second ring
    focusIndicator: false,
    onFocus: function onFocus() {
      if (onFocusStep) onFocusStep(index);
    }
  };
  return /*#__PURE__*/React.createElement(StepItemContext.Provider, {
    value: stepItemValue
  }, /*#__PURE__*/React.createElement(StyledStepItem, _extends({
    direction: direction,
    isSubStep: isSubStep,
    stepTheme: stepTheme
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledStepButton, _extends({
    role: isReadOnly ? 'group' : undefined,
    ref: function ref(el) {
      if (stepRefs) {
        if (el) stepRefs.current.set(index, el);else stepRefs.current["delete"](index);
      }
    },
    "aria-current": isHighlighted ? 'step' : undefined,
    "aria-disabled": isDisabled || clickableSteps && !isNavigable || undefined,
    "aria-label": accessibleLabel,
    "aria-describedby": describedBy.length > 0 ? describedBy.join(' ') : undefined,
    isVertical: isVertical
  }, focusableProps, buttonThemeProps), /*#__PURE__*/React.createElement(StepperIndicator, null), /*#__PURE__*/React.createElement(StyledStepContent, {
    align: isVertical ? 'start' : 'center',
    isVertical: isVertical,
    stepTheme: stepTheme
  }, /*#__PURE__*/React.createElement(StepperLabel, null))), hasSupportingContent && /*#__PURE__*/React.createElement(StyledStepSupportingContent, _extends({
    align: isVertical ? 'start' : 'center',
    isVertical: isVertical
  }, passThemeFlag), showDescription && /*#__PURE__*/React.createElement(StepperDescription, {
    id: descriptionId
  }), /*#__PURE__*/React.createElement(StepperError, {
    id: errorId
  }), /*#__PURE__*/React.createElement(StepperDisabledReason, {
    id: reasonId
  })), !!(subSteps != null && subSteps.length) && /*#__PURE__*/React.createElement(StyledSubStepsList, _extends({
    forwardedAs: "ol",
    isVertical: isVertical,
    cssGap: true,
    stepTheme: stepTheme
  }, stepTheme == null ? void 0 : stepTheme.children), subSteps), (showConnector !== undefined ? showConnector : !isLast) && /*#__PURE__*/React.createElement(StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true",
    stepTheme: stepTheme,
    spansStepGap: !isSubStep && !isLast
  }, passThemeFlag))));
};