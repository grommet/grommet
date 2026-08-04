import React, { useState } from 'react';
import { Box, Heading, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
import { WizardHeader } from '../WizardHeader';
import { WizardProgress } from '../WizardProgress';
import { WizardContent } from '../WizardContent';
import { WizardFooter } from '../WizardFooter';

// Composable wizard: consumers assemble the layout from sub-components.
// Passing `children` bypasses the default layout — each sub-component
// reads from WizardContext, so no props need to be threaded through.
// Insert <WizardStepHeader /> between progress and content to show the
// current step's title and description.
var steps = [{
  id: 'account',
  title: 'Account',
  description: 'Tell us about your account.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Placeholder account form.");
  }
}, {
  id: 'profile',
  title: 'Profile',
  description: 'Fill in your profile details.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Placeholder profile form.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Ready to submit.");
  }
}];
var Composable = function Composable() {
  var _useState = useState(false),
    complete = _useState[0],
    setComplete = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Composable wizard",
    showProgress: "horizontal",
    steps: steps,
    onComplete: function onComplete() {
      return setComplete(true);
    }
  }, /*#__PURE__*/React.createElement(WizardHeader, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "small",
    margin: "none"
  }, "Set up your account")), /*#__PURE__*/React.createElement(WizardProgress, null), /*#__PURE__*/React.createElement(WizardContent, {
    background: "light-3"
  }), /*#__PURE__*/React.createElement(WizardFooter, null)), complete && /*#__PURE__*/React.createElement(Notification, {
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
Composable.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Composable'
};
export { Composable };