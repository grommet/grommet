function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { Form } from '../Form';
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
  var currentStep = wizard.currentStep,
    currentStepObj = wizard.currentStepObj,
    formValue = wizard.formValue,
    next = wizard.next,
    renderStep = wizard.renderStep,
    setFormValue = wizard.setFormValue,
    validationError = wizard.validationError;
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  var onValidate = useCallback(function (_ref2) {
    var valid = _ref2.valid,
      errors = _ref2.errors,
      submitting = _ref2.submitting;
    var formElement = document.getElementById(currentStep + "-form");
    if (formElement) {
      formElement.setAttribute('data-form-valid', String(valid));
    }
    if (submitting) {
      // focus the first error field that exists in the DOM
      var names = Object.keys(errors || {});
      var firstInvalid = names.reduce(function (found, name) {
        if (found) return found;
        var matches = document.getElementsByName(name);
        return matches.length > 0 ? matches[0] : null;
      }, null);
      if (firstInvalid) {
        setTimeout(function () {
          return firstInvalid.focus();
        }, 0);
      }
      if (!valid) {
        // Since onSubmit won't get called in this case, go ahead and
        // call next() to trigger wizard-level state changes. By calling
        // next() here, it will get to the runValidation step, see that
        // the form is invalid from the data-form-valid attribute and set
        // the appropriate blocked state.
        // TODO: consider a method on the wizard context to set the
        //       blocked state directly instead of calling next()
        next();
      }
    }
  }, [currentStep, next]);
  if (!currentStepObj) return null;
  var stepRender = currentStepObj.render || renderStep;
  var body = stepRender ? stepRender(currentStepObj, wizard) : null;
  return /*#__PURE__*/React.createElement(Form, {
    id: currentStep + "-form",
    value: formValue,
    onChange: setFormValue,
    onSubmit: next,
    onValidate: onValidate,
    method: "post",
    "data-form-valid": "true",
    style: {
      display: 'flex',
      flex: '1 1 auto'
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({}, contentTheme, {
    flex: "grow"
  }, rest), body, validationError && /*#__PURE__*/React.createElement(Notification, {
    status: "critical",
    message: validationError
  })));
};
WizardContent.displayName = 'WizardContent';