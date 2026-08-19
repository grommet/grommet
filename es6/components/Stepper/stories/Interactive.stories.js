// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Text, Button } from 'grommet';
import { Stepper } from '../Stepper';
var Interactive = function Interactive() {
  var _useState = useState('step1'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'step1',
    title: 'Step 1',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Step 2',
    status: 'error',
    errorMessage: 'Fix the issue before proceeding.'
  }, {
    id: 'step3',
    title: 'Step 3',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, null, "Current : ", currentStep), /*#__PURE__*/React.createElement(Box, {
      width: "xlarge"
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: steps,
      currentStep: currentStep,
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    })), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      gap: "small"
    }, steps.map(function (step) {
      return /*#__PURE__*/React.createElement(Button, {
        key: step.id,
        label: "Go to " + step.id,
        onClick: function onClick() {
          return setCurrentStep(step.id);
        },
        disabled: step.status === 'disabled'
      });
    })))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Interactive'
};
export { Interactive };