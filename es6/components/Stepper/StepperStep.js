function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper, StepItemContext } from './StepperContext';
import { StepperIndicator } from './StepperIndicator';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperError, StepperDisabledReason } from './StepperHelperText';
import { StepConnector } from './StepConnector';
import { StyledStepItem, StyledStepButton, StyledStepContent, StyledConnector, StyledSubStepsList } from './StyledStepper';
export var StepperStep = function StepperStep(_ref) {
  var _step$children, _stepsRef$current;
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
  var index = indexProp !== undefined ? indexProp : steps.findIndex(function (s) {
    return s.id === step.id;
  });
  var isCurrent = currentStep === step.id;
  var hasCurrentChild = !isSubStep && ((_step$children = step.children) == null ? void 0 : _step$children.some(function (c) {
    return c.id === currentStep;
  }));
  var isHighlighted = isCurrent || hasCurrentChild;
  var isDisabled = step.status === 'disabled';
  var isClickable = clickableSteps && !isDisabled;
  var isReadOnly = !clickableSteps;
  var stepItemValue = useMemo(function () {
    return {
      step: step,
      index: index,
      isLast: isLast,
      isLabelRevealed: direction === 'vertical' || focusedIndex === index,
      isSubStep: isSubStep
    };
  }, [step, index, isLast, direction, focusedIndex, isSubStep]);
  var handleClick = function handleClick() {
    if (isClickable && onStepClick) {
      onStepClick(step.id);
    }
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isClickable && onStepClick) {
        onStepClick(step.id);
      }
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
  var describedBy = [];
  if (step.errorMessage && step.status === 'error') {
    describedBy.push("stepper-error-" + step.id);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push("stepper-reason-" + step.id);
  }
  var focusableProps = isReadOnly ? {} : {
    tabIndex: focusedIndex === index ? 0 : -1,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onFocus: function onFocus() {
      if (onFocusStep) onFocusStep(index);
    },
    type: 'button'
  };
  return /*#__PURE__*/React.createElement(StepItemContext.Provider, {
    value: stepItemValue
  }, /*#__PURE__*/React.createElement(StyledStepItem, _extends({
    direction: direction,
    isSubStep: isSubStep,
    isLast: isLast,
    hasSubSteps: !!(subSteps != null && subSteps.length)
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledStepButton, _extends({
    as: isReadOnly ? 'div' : 'button',
    role: isReadOnly ? 'group' : undefined,
    ref: function ref(el) {
      if (stepRefs) {
        if (el) stepRefs.current.set(index, el);else stepRefs.current["delete"](index);
      }
    },
    "aria-current": isHighlighted ? 'step' : undefined,
    "aria-disabled": isDisabled || undefined,
    "aria-label": ariaLabel,
    "aria-describedby": describedBy.length > 0 ? describedBy.join(' ') : undefined,
    isClickable: isClickable,
    isDisabled: isDisabled,
    isSubStep: isSubStep,
    direction: direction
  }, focusableProps, passThemeFlag), /*#__PURE__*/React.createElement(StepperIndicator, null), /*#__PURE__*/React.createElement(StyledStepContent, _extends({
    direction: direction,
    isSubStep: isSubStep,
    hasDescription: !!step.description
  }, passThemeFlag), /*#__PURE__*/React.createElement(StepperLabel, null), showDescription && /*#__PURE__*/React.createElement(StepperDescription, null), /*#__PURE__*/React.createElement(StepperError, null), /*#__PURE__*/React.createElement(StepperDisabledReason, null))), (showConnector !== undefined ? showConnector : !isLast) && !(subSteps != null && subSteps.length) && /*#__PURE__*/React.createElement(StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true"
  }, passThemeFlag)), !!(subSteps != null && subSteps.length) && /*#__PURE__*/React.createElement(StepConnector, {
    step: step,
    direction: direction
  }, /*#__PURE__*/React.createElement(StyledSubStepsList, _extends({
    direction: direction
  }, passThemeFlag), subSteps))));
};