// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box } from 'grommet';
import { Stepper } from '../Stepper';
var ErrorStates = function ErrorStates() {
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
    status: 'error',
    errorMessage: 'Card number is invalid.'
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
      pad: "large"
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: steps,
      currentStep: currentStep,
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }))
    //  </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Error States'
};
export { ErrorStates };