import React, { useState } from 'react';
import { Box, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';

// Nested wizard with sub-steps under a parent group. Parent is never a
// navigation target; child steps are visited in order.
var steps = [{
  id: 'setup',
  title: 'Setup',
  children: [{
    id: 'setup-account',
    title: 'Account',
    description: 'Create an account.',
    render: function render() {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Account form here.");
    }
  }, {
    id: 'setup-profile',
    title: 'Profile',
    description: 'Fill in your profile.',
    render: function render() {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Profile form here.");
    }
  }]
}, {
  id: 'billing',
  title: 'Billing',
  description: 'Set up billing.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Billing form here.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and submit.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Review summary here.");
  }
}];
var NestedSubSteps = function NestedSubSteps() {
  var _useState = useState(null),
    result = _useState[0],
    setResult = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Nested wizard",
    title: "Set up your organization",
    showProgress: "vertical",
    steps: steps,
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
    message: result.value && Object.keys(result.value).length > 0 ? "Completed: " + JSON.stringify(result.value) : undefined,
    onClose: function onClose() {
      return setResult(null);
    }
  }));
};
NestedSubSteps.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Nested Sub-Steps'
};
export { NestedSubSteps };