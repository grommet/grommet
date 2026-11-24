"use strict";

exports.__esModule = true;
exports.StepperStep = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _useId = require("../../utils/useId");
var _StepperContext = require("./StepperContext");
var _StepperIndicator = require("./StepperIndicator");
var _StepperLabel = require("./StepperLabel");
var _StepperDescription = require("./StepperDescription");
var _StepperHelperText = require("./StepperHelperText");
var _StyledStepper = require("./StyledStepper");
var _utils = require("./utils");
var _excluded = ["stepId", "children"],
  _excluded2 = ["gap"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var StepperStep = exports.StepperStep = function StepperStep(_ref) {
  var _steps$filter$slice$, _step$children, _step$children2, _step$children$find;
  var stepId = _ref.stepId,
    childrenProp = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var childElements = _react["default"].Children.toArray(childrenProp);
  var children = childElements.length ? childElements : undefined;
  var _useStepper = (0, _StepperContext.useStepper)(),
    currentStep = _useStepper.currentStep,
    clickableSteps = _useStepper.clickableSteps,
    direction = _useStepper.direction,
    showDescription = _useStepper.showDescription,
    onStepClick = _useStepper.onStepClick,
    focusedStepId = _useStepper.focusedStepId,
    onFocusStep = _useStepper.onFocusStep,
    registerStepRef = _useStepper.registerStepRef,
    steps = _useStepper.steps;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var step = steps.find(function (s) {
    return s.id === stepId;
  });
  var isSubStep = step.isSubStep;
  var isLastParent = ((_steps$filter$slice$ = steps.filter(function (s) {
    return !s.parentId;
  }).slice(-1)[0]) == null ? void 0 : _steps$filter$slice$.id) === step.id;
  var baseId = (0, _useId.useId)();
  var descriptionId = baseId + "-stepper-description-" + step.id;
  var errorId = baseId + "-stepper-error-" + step.id;
  var reasonId = baseId + "-stepper-reason-" + step.id;
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
  var isVertical = direction === 'vertical';
  var showConnector = !isSubStep && (!isLastParent || isVertical && (children == null ? void 0 : children.length));
  var stepTheme = (0, _utils.useStepTheme)(step, isSubStep);
  var stepItemValue = (0, _react.useMemo)(function () {
    return {
      step: step,
      isSubStep: isSubStep,
      isDisabled: isDisabled
    };
  }, [step, isSubStep, isDisabled]);
  var handleClick = function handleClick() {
    if (isClickable && navigationStepId && onStepClick) {
      onStepClick(navigationStepId);
    }
  };

  // Count every configured leaf, including unrevealed and disabled steps.
  var progressSteps = steps.filter(function (item) {
    return item.childIds.length === 0;
  });
  var progressIndex = progressSteps.findIndex(function (item) {
    return item.id === step.id;
  });
  var ariaLabel = step['aria-label'];
  if (!ariaLabel) {
    if (hasChildren) {
      ariaLabel = step.title;
    } else {
      var values = {
        step: progressIndex + 1,
        total: progressSteps.length,
        title: step.title
      };
      if (isSubStep) {
        var currentStepData = steps.find(function (item) {
          return item.id === step.id;
        });
        var parentStep = steps.find(function (item) {
          return item.id === currentStepData.parentId;
        });
        values.parent = parentStep.title;
      }
      ariaLabel = format({
        id: isSubStep ? 'stepper.subStep' : 'stepper.step',
        values: values
      });
    }
  }
  var statusId;
  if (step.status === 'completed') statusId = 'stepper.completed';
  if (step.status === 'error') statusId = 'stepper.error';
  var accessibleLabel = statusId ? format({
    id: statusId,
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

  // In vertical direction the gap between indicator and label is
  // applied as column-gap on the step item grid (shared with the
  // supporting content), not as a Box gap on the button.
  var _ref2 = stepTheme.button || {},
    gap = _ref2.gap,
    buttonThemeRest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var buttonThemeProps = isVertical ? buttonThemeRest : stepTheme.button;
  var focusableProps = isReadOnly ? {} : {
    forwardedAs: 'button',
    type: 'button',
    background: 'none',
    border: {
      size: '0px'
    },
    tabIndex: focusedStepId === step.id ? 0 : -1,
    onClick: function onClick(event) {
      if (event.type === 'keydown') event.preventDefault();
      handleClick();
    },
    // indicator provides focus-visible treatment; avoid a second ring
    focusIndicator: false,
    onFocus: function onFocus() {
      onFocusStep == null || onFocusStep(step.id);
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_StepperContext.StepItemContext.Provider, {
    value: stepItemValue
  }, /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepItem, _extends({
    direction: direction,
    isSubStep: isSubStep,
    stepTheme: stepTheme
  }, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepButton, _extends({
    role: isReadOnly ? 'group' : undefined,
    ref: function ref(el) {
      return registerStepRef == null ? void 0 : registerStepRef(step.id, el);
    },
    "aria-current": isHighlighted ? 'step' : undefined,
    "aria-disabled": isDisabled || clickableSteps && !isNavigable || undefined,
    "aria-label": accessibleLabel,
    "aria-describedby": describedBy.length > 0 ? describedBy.join(' ') : undefined,
    isVertical: isVertical
  }, focusableProps, buttonThemeProps), /*#__PURE__*/_react["default"].createElement(_StepperIndicator.StepperIndicator, null), /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepContent, {
    align: isVertical ? 'start' : 'center',
    isVertical: isVertical,
    stepTheme: stepTheme
  }, /*#__PURE__*/_react["default"].createElement(_StepperLabel.StepperLabel, null))), hasSupportingContent && /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledStepSupportingContent, _extends({
    align: isVertical ? 'start' : 'center',
    isVertical: isVertical
  }, passThemeFlag), showDescription && /*#__PURE__*/_react["default"].createElement(_StepperDescription.StepperDescription, {
    id: descriptionId
  }), /*#__PURE__*/_react["default"].createElement(_StepperHelperText.StepperError, {
    id: errorId
  }), /*#__PURE__*/_react["default"].createElement(_StepperHelperText.StepperDisabledReason, {
    id: reasonId
  })), !!(children != null && children.length) && /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledSubStepsList, _extends({
    forwardedAs: "ol",
    isVertical: isVertical,
    cssGap: true,
    stepTheme: stepTheme
  }, stepTheme == null ? void 0 : stepTheme.children), children), (showConnector !== undefined ? showConnector : !isLastParent) && /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true",
    stepTheme: stepTheme,
    spansStepGap: !isSubStep && !isLastParent
  }, passThemeFlag))));
};