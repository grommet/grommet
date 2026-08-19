function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';
import { StyledWizardFocusAnchor } from './StyledWizard';

// Renders the "Step X of Y" counter, title, and description. Wrapped in an
// `aria-live="polite"` focus anchor (located via `data-g-wizard-focus-anchor`)
// so Wizard can move focus here on step transitions for screen readers.
export var WizardStepHeader = function WizardStepHeader(_ref) {
  var _theme$wizard, _theme$wizard2;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _React$useContext = React.useContext(MessageContext),
    format = _React$useContext.format;
  var _useWizard = useWizard(),
    currentStepObj = _useWizard.currentStepObj,
    currentStepIndex = _useWizard.currentStepIndex,
    totalSteps = _useWizard.totalSteps,
    messages = _useWizard.messages;
  if (!currentStepObj) return null;
  var stepHeaderTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.stepHeader;
  var counterTheme = (_theme$wizard2 = theme.wizard) == null || (_theme$wizard2 = _theme$wizard2.stepHeader) == null ? void 0 : _theme$wizard2.counter;
  var counterTemplate = format({
    id: 'wizard.stepHeader.counter',
    values: {
      step: currentStepIndex + 1,
      total: totalSteps
    },
    messages: messages
  });
  return /*#__PURE__*/React.createElement(StyledWizardFocusAnchor, {
    "data-g-wizard-focus-anchor": true,
    tabIndex: -1,
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement(Box, _extends({
    pad: stepHeaderTheme == null ? void 0 : stepHeaderTheme.pad,
    gap: stepHeaderTheme == null ? void 0 : stepHeaderTheme.gap,
    flex: false
  }, rest), /*#__PURE__*/React.createElement(Text, counterTheme, counterTemplate), /*#__PURE__*/React.createElement(Heading, _extends({
    level: 2
  }, stepHeaderTheme == null ? void 0 : stepHeaderTheme.title), currentStepObj.title), currentStepObj.description && /*#__PURE__*/React.createElement(Paragraph, stepHeaderTheme == null ? void 0 : stepHeaderTheme.description, currentStepObj.description)));
};
WizardStepHeader.displayName = 'WizardStepHeader';