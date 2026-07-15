var _excluded = ["renderStep"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step's body via renderStep(). It also
// hosts the wizard-level validation error region so any error message
// shares its color with the error icon defined in the theme.
//
// Sub-component follows the composition-primitive pattern: theme values
// drive default Box props, but callers can override any Box prop by
// passing it directly (spread as {...rest} last).
export var WizardContent = function WizardContent(_ref) {
  var _theme$wizard, _theme$wizard2;
  var renderStep = _ref.renderStep,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useWizard = useWizard(),
    currentStepObj = _useWizard.currentStepObj,
    formValue = _useWizard.formValue,
    setFormValue = _useWizard.setFormValue,
    next = _useWizard.next,
    previous = _useWizard.previous,
    goTo = _useWizard.goTo,
    skip = _useWizard.skip,
    complete = _useWizard.complete,
    cancel = _useWizard.cancel,
    validationError = _useWizard.validationError;
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  var helperTheme = (_theme$wizard2 = theme.wizard) == null || (_theme$wizard2 = _theme$wizard2.error) == null ? void 0 : _theme$wizard2.helperText;
  if (!currentStepObj) return null;

  // API exposed to renderStep callbacks.
  var wizardApi = {
    formValue: formValue,
    setFormValue: setFormValue,
    next: next,
    previous: previous,
    goTo: goTo,
    skip: skip,
    complete: complete,
    cancel: cancel
  };
  var stepRender = renderStep || currentStepObj.render;
  var body = stepRender ? stepRender(currentStepObj, wizardApi) : null;
  return /*#__PURE__*/React.createElement(Box, _extends({
    pad: contentTheme == null ? void 0 : contentTheme.pad,
    background: contentTheme == null ? void 0 : contentTheme.background,
    round: contentTheme == null ? void 0 : contentTheme.round,
    elevation: contentTheme == null ? void 0 : contentTheme.elevation,
    margin: contentTheme == null ? void 0 : contentTheme.margin,
    width: contentTheme == null ? void 0 : contentTheme.width,
    height: contentTheme == null ? void 0 : contentTheme.height,
    align: contentTheme == null ? void 0 : contentTheme.align
    // Scrolling region for the step body. `flex` (1 1 auto) + `minHeight: 0`
    // lets this Box shrink below its content so `overflow: auto` engages;
    // `flex="grow"` (1 0 auto) would refuse to shrink.
    ,
    flex: true,
    overflow: "auto",
    style: {
      minHeight: 0
    }
  }, passThemeFlag, rest), /*#__PURE__*/React.createElement(Box, {
    flex: false
  }, body), validationError && /*#__PURE__*/React.createElement(Text, {
    role: "alert",
    "aria-live": "polite",
    size: helperTheme == null ? void 0 : helperTheme.size,
    color: helperTheme == null ? void 0 : helperTheme.color,
    margin: helperTheme == null ? void 0 : helperTheme.margin
  }, validationError));
};
WizardContent.displayName = 'WizardContent';