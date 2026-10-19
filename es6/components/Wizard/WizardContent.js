function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef } from 'react';
import { Form } from '../Form';
import { Box } from '../Box';
import { Notification } from '../Notification';
import { useThemeValue } from '../../utils/useThemeValue';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export var WizardContent = function WizardContent(_ref) {
  var _theme$wizard, _stepValidation$curre;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var wizard = useWizard();
  var currentStep = wizard.currentStep,
    currentStepObj = wizard.currentStepObj,
    form = wizard.form,
    formValue = wizard.formValue,
    renderStep = wizard.renderStep,
    setFormValue = wizard.setFormValue,
    validationError = wizard.validationError,
    stepValidation = wizard.stepValidation,
    updateValidation = wizard.updateValidation,
    registerForm = wizard.registerForm;
  var formRef = useRef(null);
  var pendingSubmission = useRef();
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  useLayoutEffect(function () {
    if (!form || !formRef.current) return undefined;
    var unregister = registerForm(currentStep, function () {
      return new Promise(function (resolve) {
        pendingSubmission.current = {
          stepId: currentStep,
          resolve: resolve
        };
        formRef.current.requestSubmit();
      });
    });
    return function () {
      var _pendingSubmission$cu;
      unregister();
      if (((_pendingSubmission$cu = pendingSubmission.current) == null ? void 0 : _pendingSubmission$cu.stepId) === currentStep) {
        pendingSubmission.current.resolve({
          cancelled: true
        });
        pendingSubmission.current = undefined;
      }
    };
  }, [currentStep, form, registerForm]);
  var onValidate = useCallback(function (_ref2) {
    var valid = _ref2.valid,
      errors = _ref2.errors,
      submitting = _ref2.submitting;
    var formElement = formRef.current;
    var result = {
      ok: valid,
      errors: _extends({}, errors)
    };
    Promise.resolve().then(function () {
      var _pendingSubmission$cu2;
      updateValidation(currentStep, 'form', result);
      if (submitting && ((_pendingSubmission$cu2 = pendingSubmission.current) == null ? void 0 : _pendingSubmission$cu2.stepId) === currentStep) {
        pendingSubmission.current.resolve(result);
        pendingSubmission.current = undefined;
      }
    });
    if (submitting && !valid) {
      // focus the first error field that exists in the DOM
      var names = Object.keys(errors || {});
      var firstInvalid = names.reduce(function (found, name) {
        if (found) return found;
        var matches = formElement == null ? void 0 : formElement.elements.namedItem(name);
        return matches != null && matches.focus ? matches : (matches == null ? void 0 : matches[0]) || null;
      }, null);
      if (firstInvalid) {
        setTimeout(function () {
          if (formElement != null && formElement.isConnected && formRef.current === formElement) firstInvalid.focus();
        }, 0);
      }
    }
  }, [currentStep, updateValidation]);
  if (!currentStepObj) return null;
  var stepRender = currentStepObj.render || renderStep;
  var body = stepRender ? stepRender(currentStepObj, wizard) : null;
  var content = /*#__PURE__*/React.createElement(Box, _extends({}, contentTheme, {
    flex: "grow"
  }, rest), body, validationError && /*#__PURE__*/React.createElement(Notification, {
    status: "critical",
    message: validationError
  }));
  return form ? /*#__PURE__*/React.createElement(Form, {
    key: currentStep,
    id: currentStep + "-form",
    ref: formRef,
    value: formValue,
    onChange: setFormValue,
    onValidate: onValidate,
    errors: (_stepValidation$curre = stepValidation[currentStep]) == null || (_stepValidation$curre = _stepValidation$curre.form) == null ? void 0 : _stepValidation$curre.errors,
    method: "post",
    noValidate: true,
    style: {
      display: 'flex',
      flex: '1 1 auto'
    }
  }, content) : content;
};
WizardContent.displayName = 'WizardContent';