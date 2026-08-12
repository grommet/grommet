function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from '../Box';
import { Notification } from '../Notification';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export var WizardContent = function WizardContent(_ref) {
  var _theme$wizard;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var wizard = useWizard();
  var currentStepObj = wizard.currentStepObj,
    renderStep = wizard.renderStep,
    validationError = wizard.validationError;
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  if (!currentStepObj) return null;
  var stepRender = currentStepObj.render || renderStep;
  var body = stepRender ? stepRender(currentStepObj, wizard) : null;
  return /*#__PURE__*/React.createElement(Box, _extends({}, contentTheme, {
    flex: "grow"
  }, rest), body, validationError && /*#__PURE__*/React.createElement(Notification, {
    status: "critical",
    message: validationError
  }));
};
WizardContent.displayName = 'WizardContent';