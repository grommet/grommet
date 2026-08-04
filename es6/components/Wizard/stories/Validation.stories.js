function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { Box, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';
var Validation = function Validation() {
  var _useState = useState(null),
    result = _useState[0],
    setResult = _useState[1];
  var steps = [{
    id: 'email',
    title: 'Email',
    description: 'Enter a valid email address.',
    validate: function validate(value) {
      if (!value.email) return 'Email is required.';
      if (!value.email.includes('@')) return 'Enter a valid email address.';
      return true;
    },
    render: function render(step, api) {
      return /*#__PURE__*/React.createElement(TextInput, {
        placeholder: "you@example.com",
        value: api.formValue.email || '',
        onChange: function onChange(event) {
          return api.setFormValue(_extends({}, api.formValue, {
            email: event.target.value
          }));
        }
      });
    }
  }, {
    id: 'password',
    title: 'Password',
    description: 'Choose a password.',
    validate: function validate(value) {
      return value.password && value.password.length >= 6 ? true : 'Password must be at least 6 characters.';
    },
    render: function render(step, api) {
      return /*#__PURE__*/React.createElement(TextInput, {
        type: "password",
        placeholder: "password",
        value: api.formValue.password || '',
        onChange: function onChange(event) {
          return api.setFormValue(_extends({}, api.formValue, {
            password: event.target.value
          }));
        }
      });
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