"use strict";

exports.__esModule = true;
exports.StepperStep = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _StepperContext = require("./StepperContext");
var _StepperIndicator = require("./StepperIndicator");
var _StepperLabel = require("./StepperLabel");
var _StepperDescription = require("./StepperDescription");
var _StepperHelperText = require("./StepperHelperText");
var _StepConnector = require("./StepConnector");
var _StyledStepper = require("./StyledStepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var StepperStep = exports.StepperStep = function StepperStep(_ref) {
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
  var _useStepper = (0, _StepperContext.useStepper)(),
    currentStep = _useStepper.currentStep,
    clickableSteps = _useStepper.clickableSteps,
    showDescription = _useStepper.showDescription,
    onStepClick = _useStepper.onStepClick,
    steps = _useStepper.steps;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
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
  var stepItemValue = (0, _react.useMemo)(function () {
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
  return /*#__PURE__*/_react["default"].createElement(_StepperContext.StepItemContext.Provider, {
    value: stepItemValue
  }, /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepItem, _extends({
    direction: direction,
    isSubStep: isSubStep,
    isLast: isLast,
    hasSubSteps: !!(subSteps != null && subSteps.length)
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepButton, _extends({
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
  }, focusableProps, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StepperIndicator.StepperIndicator, null), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepContent, _extends({
    direction: direction,
    isSubStep: isSubStep,
    hasDescription: !!step.description
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StepperLabel.StepperLabel, null), showDescription && /*#__PURE__*/_react["default"].createElement(_StepperDescription.StepperDescription, null), /*#__PURE__*/_react["default"].createElement(_StepperHelperText.StepperError, null), /*#__PURE__*/_react["default"].createElement(_StepperHelperText.StepperDisabledReason, null))), (showConnector !== undefined ? showConnector : !isLast) && !(subSteps != null && subSteps.length) && /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true"
  }, passThemeFlag)), !!(subSteps != null && subSteps.length) && /*#__PURE__*/_react["default"].createElement(_StepConnector.StepConnector, {
    step: step,
    direction: direction
  }, /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledSubStepsList, _extends({
    direction: direction
  }, passThemeFlag), subSteps))));
};