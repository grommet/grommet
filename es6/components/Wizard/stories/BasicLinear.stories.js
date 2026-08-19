function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';
var steps = [{
  id: 'account',
  title: 'Account',
  description: 'Tell us about your account.',
  render: function render(step, api) {
    return /*#__PURE__*/React.createElement(Box, {
      gap: "small"
    }, /*#__PURE__*/React.createElement(Paragraph, null, "Enter an email to continue."), /*#__PURE__*/React.createElement(TextInput, {
      placeholder: "you@example.com",
      value: api.formValue.email || '',
      onChange: function onChange(event) {
        return api.setFormValue(_extends({}, api.formValue, {
          email: event.target.value
        }));
      }
    }));
  }
}, {
  id: 'profile',
  title: 'Profile',
  description: 'Fill in your profile details.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Placeholder profile form for the second step.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render(step, api) {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Ready to submit for ", api.formValue.email || 'unknown user', ".");
  }
}];
var BasicLinear = function BasicLinear() {
  var _useState = useState(false),
    complete = _useState[0],
    setComplete = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Onboarding",
    title: "Set up your account",
    steps: steps,
    onComplete: function onComplete() {
      return setComplete(true);
    }
  }), complete && /*#__PURE__*/React.createElement(Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    onClose: function onClose() {
      return setComplete(false);
    }
  }));
};
BasicLinear.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Basic Linear'
};
export { BasicLinear };