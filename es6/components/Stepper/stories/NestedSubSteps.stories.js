// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { Stepper } from '../Stepper';
var NestedSubSteps = function NestedSubSteps() {
  var _steps$find;
  var _useState = useState('email'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'account',
    title: 'Account Setup',
    children: [{
      id: 'email',
      title: 'Email',
      status: 'completed'
    }, {
      id: 'password',
      title: 'Password',
      status: 'pending'
    }]
  }, {
    id: 'profile',
    title: 'Profile Setup',
    children: [{
      id: 'name',
      title: 'Name',
      status: 'pending'
    }, {
      id: 'photo',
      title: 'Photo',
      status: 'error',
      errorMessage: 'Please upload a valid photo.'
    }]
  }, {
    id: 'confirm',
    title: 'Confirm',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "vertical",
      "aria-label": "Account setup progress",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/React.createElement(Text, null, "Parent:", ' ', ((_steps$find = steps.find(function (s) {
      var _s$children;
      return (_s$children = s.children) == null ? void 0 : _s$children.some(function (c) {
        return c.id === currentStep;
      });
    })) == null ? void 0 : _steps$find.title) || 'None'), /*#__PURE__*/React.createElement(Text, null, "Current Step: ", currentStep))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Nested Sub-Steps'
};
export { NestedSubSteps };