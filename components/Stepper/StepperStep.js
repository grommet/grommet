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
var _utils = require("./utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var StepperStep = exports.StepperStep = function StepperStep(_ref) {
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
  var hasChildren = !!((_step$children2 = step.children) != null && _step$children2.length);
  var navigationStepId = hasChildren ? (_step$children$find = step.children.find(function (child) {
    return child.status !== 'disabled';
  })) == null ? void 0 : _step$children$find.id : step.id;
  var isDisabled = step.status === 'disabled';
  var isNavigable = !isDisabled && !!navigationStepId;
  var isClickable = clickableSteps && isNavigable;
  var isReadOnly = !clickableSteps;
  var stepTheme = (0, _utils.useStepTheme)(step, isSubStep);
  var stepItemValue = (0, _react.useMemo)(function () {
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
  if (step.errorMessage && step.status === 'error') {
    describedBy.push("stepper-error-" + step.id);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push("stepper-reason-" + step.id);
  }
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
  return /*#__PURE__*/_react["default"].createElement(_StepperContext.StepItemContext.Provider, {
    value: stepItemValue
  }, /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepItem, _extends({
    direction: direction,
    isSubStep: isSubStep,
    isLast: isLast,
    hasSubSteps: !!(subSteps != null && subSteps.length),
    stepTheme: stepTheme
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepButton, _extends({
    role: isReadOnly ? 'group' : undefined,
    ref: function ref(el) {
      if (stepRefs) {
        if (el) stepRefs.current.set(index, el);else stepRefs.current["delete"](index);
      }
    },
    "aria-current": isHighlighted ? 'step' : undefined,
    "aria-disabled": isDisabled || clickableSteps && !isNavigable || undefined,
    "aria-label": accessibleLabel,
    "aria-describedby": describedBy.length > 0 ? describedBy.join(' ') : undefined
  }, focusableProps, stepTheme.button), /*#__PURE__*/_react["default"].createElement(_StepperIndicator.StepperIndicator, null), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepContent, {
    align: direction === 'vertical' ? 'start' : 'center',
    isVertical: direction === 'vertical',
    isSubStep: isSubStep,
    hasDescription: !!step.description,
    stepTheme: stepTheme
  }, /*#__PURE__*/_react["default"].createElement(_StepperLabel.StepperLabel, null), showDescription && /*#__PURE__*/_react["default"].createElement(_StepperDescription.StepperDescription, null), /*#__PURE__*/_react["default"].createElement(_StepperHelperText.StepperError, null), /*#__PURE__*/_react["default"].createElement(_StepperHelperText.StepperDisabledReason, null))), (showConnector !== undefined ? showConnector : !isLast) && !(subSteps != null && subSteps.length) && /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true",
    stepTheme: stepTheme
  }, passThemeFlag)), !!(subSteps != null && subSteps.length) && /*#__PURE__*/_react["default"].createElement(_StepConnector.StepConnector, null, /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledSubStepsList, _extends({
    forwardedAs: "ol",
    isVertical: direction === 'vertical',
    cssGap: true,
    stepTheme: stepTheme
  }, stepTheme == null ? void 0 : stepTheme.children), subSteps))));
};