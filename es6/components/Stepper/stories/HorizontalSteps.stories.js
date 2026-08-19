// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Paragraph } from 'grommet';
import { Stepper } from '../Stepper';
var HorizontalSteps = function HorizontalSteps() {
  var _useState = useState('profile'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'account',
    title: 'Account',
    status: 'completed'
  }, {
    id: 'profile',
    title: 'Profile',
    status: 'pending'
  }, {
    id: 'review',
    title: 'Review',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      gap: "medium",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "horizontal",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      background: "background-contrast",
      round: "small"
    }, /*#__PURE__*/React.createElement(Paragraph, null, "Step content for \"", currentStep, "\"")))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Horizontal Steps'
};
export { HorizontalSteps };