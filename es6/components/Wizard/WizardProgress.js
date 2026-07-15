var _excluded = ["ariaLabel"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Box } from '../Box';
import { Stepper } from '../Stepper';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';
import { useWizard } from './WizardContext';

// WizardProgress delegates ALL step indicator + connector rendering to the
// existing Stepper component. It maps Wizard-derived state onto the
// Stepper step model — no connectors, indicators, or icons of its own.
export var WizardProgress = function WizardProgress(_ref) {
  var _theme$wizard, _theme$wizard2;
  var ariaLabelProp = _ref.ariaLabel,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _React$useContext = React.useContext(MessageContext),
    format = _React$useContext.format;
  var _useWizard = useWizard(),
    steps = _useWizard.steps,
    currentStep = _useWizard.currentStep,
    direction = _useWizard.direction,
    getStepStatus = _useWizard.getStepStatus,
    messages = _useWizard.messages;
  var progressTheme = direction === 'vertical' ? (_theme$wizard = theme.wizard) == null || (_theme$wizard = _theme$wizard.progress) == null ? void 0 : _theme$wizard.vertical : (_theme$wizard2 = theme.wizard) == null || (_theme$wizard2 = _theme$wizard2.progress) == null ? void 0 : _theme$wizard2.horizontal;

  // Map wizard step tree into a Stepper-compatible step[] (with optional
  // children for two-level nesting). Wizard-driven status → Stepper status.
  var stepperSteps = steps.map(function (step) {
    var mapped = {
      id: step.id,
      title: step.title,
      description: step.description,
      status: getStepStatus(step.id)
    };
    if (step.disabledReason) mapped.disabledReason = step.disabledReason;
    if (step['aria-label']) mapped['aria-label'] = step['aria-label'];
    if (step.children && step.children.length) {
      mapped.children = step.children.map(function (child) {
        return _extends({
          id: child.id,
          title: child.title,
          description: child.description,
          status: getStepStatus(child.id)
        }, child.disabledReason ? {
          disabledReason: child.disabledReason
        } : {}, child['aria-label'] ? {
          'aria-label': child['aria-label']
        } : {});
      });
    }
    return mapped;
  });
  var ariaLabel = ariaLabelProp || (messages == null ? void 0 : messages.progress) || format({
    id: 'wizard.progress'
  });
  return /*#__PURE__*/React.createElement(Box, _extends({
    pad: progressTheme == null ? void 0 : progressTheme.pad,
    border: progressTheme == null ? void 0 : progressTheme.border,
    width: direction === 'vertical' ? progressTheme == null ? void 0 : progressTheme.width : undefined,
    flex: false
    // In vertical layout, don't let the flex row's default
    // align-items:stretch grow this rail to the wizard body's
    // full height — the Stepper should be tall enough for its
    // steps only, not stretched to match the content column.
    ,
    alignSelf: direction === 'vertical' ? 'start' : undefined
  }, passThemeFlag, rest), /*#__PURE__*/React.createElement(Stepper, {
    steps: stepperSteps,
    currentStep: currentStep,
    direction: direction,
    clickableSteps: false,
    "aria-label": ariaLabel
  }));
};
WizardProgress.displayName = 'WizardProgress';