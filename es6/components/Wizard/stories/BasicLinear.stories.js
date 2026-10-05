// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, FormField, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';
var steps = [{
  id: 'account',
  title: 'Account',
  description: 'Tell us about your account.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Box, {
      gap: "small"
    }, /*#__PURE__*/React.createElement(Paragraph, null, "Enter an email to continue."), /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      name: "email",
      htmlFor: "email-field",
      required: true
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "email-field",
      placeholder: "you@example.com",
      name: "email"
    })));
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