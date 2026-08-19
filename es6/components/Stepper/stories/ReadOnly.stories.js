// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from 'grommet';
import { Stepper } from '../Stepper';
var ReadOnly = function ReadOnly() {
  var steps = [{
    id: 'step1',
    title: 'Step 1',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Step 2',
    status: 'completed'
  }, {
    id: 'step3',
    title: 'Step 3',
    status: 'pending'
  }, {
    id: 'step4',
    title: 'Step 4',
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
      currentStep: "step3",
      clickableSteps: false
    }))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Read-Only'
};
export { ReadOnly };