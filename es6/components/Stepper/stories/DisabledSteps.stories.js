// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box } from 'grommet';
import { Stepper } from '../Stepper';
var DisabledSteps = function DisabledSteps() {
  var _useState = useState('billing'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'account',
    title: 'Account',
    status: 'completed'
  }, {
    id: 'billing',
    title: 'Billing',
    status: 'pending'
  }, {
    id: 'confirm',
    title: 'Confirm',
    status: 'disabled',
    disabledReason: 'Complete billing first.'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: steps,
      currentStep: currentStep,
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Disabled Steps'
};
export { DisabledSteps };