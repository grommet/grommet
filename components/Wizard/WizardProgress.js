"use strict";

exports.__esModule = true;
exports.WizardProgress = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Stepper = require("../Stepper");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _MessageContext = require("../../contexts/MessageContext");
var _WizardContext = require("./WizardContext");
var _excluded = ["aria-label", "showDescription"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// WizardProgress delegates step rendering to <Stepper>. Descriptions
// are hidden by default (WizardStepHeader shows them in the body).
var WizardProgress = exports.WizardProgress = function WizardProgress(_ref) {
  var _theme$wizard, _theme$wizard2;
  var ariaLabelProp = _ref['aria-label'],
    _ref$showDescription = _ref.showDescription,
    showDescription = _ref$showDescription === void 0 ? false : _ref$showDescription,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var _useWizard = (0, _WizardContext.useWizard)(),
    steps = _useWizard.steps,
    clickableSteps = _useWizard.clickableSteps,
    currentStep = _useWizard.currentStep,
    goTo = _useWizard.goTo,
    showProgress = _useWizard.showProgress,
    stepStates = _useWizard.stepStates,
    messages = _useWizard.messages;

  // Opt-in: render nothing when `showProgress` is false.
  if (!showProgress) return null;
  var progressTheme = showProgress === 'vertical' ? (_theme$wizard = theme.wizard) == null || (_theme$wizard = _theme$wizard.progress) == null ? void 0 : _theme$wizard.vertical : (_theme$wizard2 = theme.wizard) == null || (_theme$wizard2 = _theme$wizard2.progress) == null ? void 0 : _theme$wizard2.horizontal;

  // Map wizard steps (with optional children) into Stepper's step model.
  var stepperSteps = steps.map(function (step) {
    var mapped = {
      id: step.id,
      title: step.title,
      description: step.description,
      status: stepStates[step.id]
    };
    if (step.disabledReason) mapped.disabledReason = step.disabledReason;
    if (step['aria-label']) mapped['aria-label'] = step['aria-label'];
    if (step.errorMessage) mapped.errorMessage = step.errorMessage;
    if (step.children && step.children.length) {
      mapped.children = step.children.map(function (child) {
        return _extends({
          id: child.id,
          title: child.title,
          description: child.description,
          status: stepStates[child.id]
        }, child.disabledReason ? {
          disabledReason: child.disabledReason
        } : {}, child['aria-label'] ? {
          'aria-label': child['aria-label']
        } : {}, child.errorMessage ? {
          errorMessage: child.errorMessage
        } : {});
      });
    }
    return mapped;
  });
  var ariaLabel = ariaLabelProp || format({
    id: 'wizard.progress',
    messages: messages
  });
  var onStepClick = clickableSteps ? function (stepId) {
    var _step$children;
    // if forward and form need to do form validation
    var step = steps.find(function (s) {
      return s.id === stepId;
    });
    if (step != null && (_step$children = step.children) != null && _step$children.length) {
      // find the first child we are allowed to go to
      var firstAllowedChild = step.children.find(function (child) {
        return !child.disabled;
      });
      if (firstAllowedChild) {
        goTo(firstAllowedChild.id);
      }
    } else {
      goTo(stepId);
    }
  } : undefined;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    pad: progressTheme == null ? void 0 : progressTheme.pad,
    width: showProgress === 'vertical' ? progressTheme == null ? void 0 : progressTheme.width : undefined,
    flex: false
    // Vertical rail should hug its steps, not stretch to the body height.
    ,
    alignSelf: showProgress === 'vertical' ? 'start' : undefined
  }, rest), /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
    steps: stepperSteps,
    currentStep: currentStep,
    direction: showProgress === 'vertical' ? 'vertical' : 'horizontal',
    clickableSteps: clickableSteps,
    onStepClick: onStepClick,
    showDescription: showDescription,
    "aria-label": ariaLabel
  }));
};
WizardProgress.displayName = 'WizardProgress';