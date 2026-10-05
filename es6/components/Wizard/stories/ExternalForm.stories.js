function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Button, FormField, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';
import { WizardFooter } from '../WizardFooter';
import { useWizard } from '../WizardContext';
var validate = function validate(value) {
  var _value$name;
  return {
    details: (_value$name = value.name) != null && _value$name.trim() ? undefined : 'A request name is required.'
  };
};
var ExternalFormFooter = function ExternalFormFooter(_ref) {
  var errors = _ref.errors;
  var _useWizard = useWizard(),
    complete = _useWizard.complete,
    currentStep = _useWizard.currentStep,
    currentStepIndex = _useWizard.currentStepIndex,
    next = _useWizard.next,
    previous = _useWizard.previous,
    totalSteps = _useWizard.totalSteps;
  var isFirstStep = currentStepIndex === 0;
  var isLastStep = currentStepIndex === totalSteps - 1;
  var hasError = !!errors[currentStep];
  return /*#__PURE__*/React.createElement(WizardFooter, null, !isFirstStep && /*#__PURE__*/React.createElement(Button, {
    label: "Previous",
    secondary: true,
    onClick: previous
  }), /*#__PURE__*/React.createElement(Button, {
    label: isLastStep ? 'Complete' : 'Next',
    primary: true,
    disabled: hasError,
    onClick: isLastStep ? complete : next
  }));
};
var ExternalForm = function ExternalForm() {
  var _useState = useState(),
    submittedValue = _useState[0],
    setSubmittedValue = _useState[1];
  var _useState2 = useState({
      name: ''
    }),
    value = _useState2[0],
    setValue = _useState2[1];
  var errors = validate(value);
  var steps = [{
    id: 'details',
    title: 'Details',
    status: errors.details ? 'error' : 'completed',
    errorMessage: errors.details,
    render: function render() {
      return /*#__PURE__*/React.createElement(FormField, {
        htmlFor: "request-name",
        label: "Request name",
        name: "name",
        error: errors.details
      }, /*#__PURE__*/React.createElement(TextInput, {
        id: "request-name",
        name: "name",
        value: value.name,
        onChange: function onChange(event) {
          return setValue(function (currentValue) {
            return _extends({}, currentValue, {
              name: event.target.value
            });
          });
        }
      }));
    }
  }, {
    id: 'review',
    title: 'Review',
    render: function render() {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Review the request for ", value.name || 'an unnamed request', ".");
    }
  }];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "New request",
    form: false,
    title: "New request",
    showProgress: "vertical",
    steps: steps,
    footer: /*#__PURE__*/React.createElement(ExternalFormFooter, {
      errors: errors
    }),
    onComplete: function onComplete() {
      return setSubmittedValue(value);
    }
  }), submittedValue && /*#__PURE__*/React.createElement(Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Request submitted",
    message: "Created request " + submittedValue.name + ".",
    onClose: function onClose() {
      return setSubmittedValue(undefined);
    }
  }));
};
ExternalForm.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/External Form'
};
export { ExternalForm };