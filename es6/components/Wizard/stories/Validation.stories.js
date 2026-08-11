// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Notification, Paragraph, TextInput, Form, FormField } from 'grommet';
import { Wizard } from '../Wizard';
var validateEmail = function validateEmail(email) {
  if (!email) return 'Email is required.';
  if (!email.includes('@')) return 'Enter a valid email address.';
  return undefined;
};
var validatePassword = function validatePassword(password) {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return undefined;
};
var Validation = function Validation() {
  var _useState = useState(null),
    result = _useState[0],
    setResult = _useState[1];
  var steps = [{
    id: 'email',
    title: 'Email',
    description: 'Enter a valid email address.',
    skippable: true,
    validate: function validate(value) {
      return validateEmail(value.email) ? 'Fix the issues to continue' : true;
    },
    render: function render(step, api) {
      var emailError = api.validationError && validateEmail(api.formValue.email);
      return /*#__PURE__*/React.createElement(Form, {
        value: api.formValue,
        onChange: function onChange(nextValue) {
          return api.setFormValue(nextValue);
        },
        validate: "submit"
      }, /*#__PURE__*/React.createElement(FormField, {
        htmlFor: "wizard-email",
        label: "Email",
        name: "email",
        required: true,
        validate: validateEmail,
        error: emailError
      }, /*#__PURE__*/React.createElement(TextInput, {
        id: "wizard-email",
        name: "email",
        placeholder: "you@example.com"
      })));
    }
  }, {
    id: 'password',
    title: 'Password',
    description: 'Choose a password.',
    validate: function validate(value) {
      return validatePassword(value.password) ? 'Fix the issues to continue' : true;
    },
    render: function render(step, api) {
      var passwordError = api.validationError && validatePassword(api.formValue.password);
      return /*#__PURE__*/React.createElement(Form, {
        value: api.formValue,
        onChange: function onChange(nextValue) {
          return api.setFormValue(nextValue);
        },
        validate: "change"
      }, /*#__PURE__*/React.createElement(FormField, {
        htmlFor: "wizard-password",
        label: "Password",
        name: "password",
        required: true,
        validate: validatePassword,
        error: passwordError
      }, /*#__PURE__*/React.createElement(TextInput, {
        id: "wizard-password",
        name: "password",
        type: "password",
        placeholder: "password"
      })));
    }
  }, {
    id: 'confirm',
    title: 'Confirm',
    description: 'Ready to submit.',
    render: function render(step, api) {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Confirm sign-up for ", api.formValue.email, ".");
    }
  }];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Sign up",
    title: "Create your account",
    showProgress: "vertical",
    steps: steps,
    defaultValue: {
      email: '',
      password: ''
    },
    onComplete: function onComplete(_ref) {
      var value = _ref.value;
      return setResult({
        status: 'complete',
        value: value
      });
    }
  }), result && /*#__PURE__*/React.createElement(Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    message: "Account created for " + result.value.email + ".",
    onClose: function onClose() {
      return setResult(null);
    }
  }));
};
Validation.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Validation'
};
export { Validation };