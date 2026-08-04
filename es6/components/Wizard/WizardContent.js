function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export var WizardContent = function WizardContent(_ref) {
  var _theme$wizard, _theme$wizard2;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var wizard = useWizard();
  var currentStepObj = wizard.currentStepObj,
    renderStep = wizard.renderStep,
    validationError = wizard.validationError;
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  var errorTheme = (_theme$wizard2 = theme.wizard) == null ? void 0 : _theme$wizard2.error;
  if (!currentStepObj) return null;
  var stepRender = currentStepObj.render || renderStep;
  var body = stepRender ? stepRender(currentStepObj, wizard) : null;
  return /*#__PURE__*/React.createElement(Box, _extends({
    pad: contentTheme == null ? void 0 : contentTheme.pad,
    background: contentTheme == null ? void 0 : contentTheme.background,
    round: contentTheme == null ? void 0 : contentTheme.round,
    margin: contentTheme == null ? void 0 : contentTheme.margin
    // Grow to fill the middle region without shrinking. The scroll
    // region lives on the middle (StyledWizardMiddle), not here.
    ,
    flex: "grow"
  }, rest), body, validationError && /*#__PURE__*/React.createElement(Text, _extends({
    role: "alert",
    "aria-live": "polite"
  }, errorTheme), validationError));
};
WizardContent.displayName = 'WizardContent';