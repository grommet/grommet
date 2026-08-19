// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Text, Heading, Paragraph } from 'grommet';
import { Stepper } from '../Stepper';
var VerticalSteps = function VerticalSteps() {
  var _steps$find, _steps$find2;
  var _useState = useState('deploy'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'setup',
    title: 'Setup',
    description: 'Configure your environment.',
    status: 'completed'
  }, {
    id: 'deploy',
    title: 'Deploy',
    status: 'pending'
  }, {
    id: 'verify',
    title: 'Verify',
    description: 'Run post-deployment checks.',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      direction: "row",
      gap: "medium",
      pad: "medium"
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "vertical",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/React.createElement(Box, {
      flex: true,
      pad: "medium",
      background: "background-contrast",
      round: "small",
      height: {
        min: 'medium'
      },
      gap: "none"
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 2
    }, (_steps$find = steps.find(function (s) {
      return s.id === currentStep;
    })) == null ? void 0 : _steps$find.title), /*#__PURE__*/React.createElement(Text, {
      color: "text-strong"
    }, (_steps$find2 = steps.find(function (s) {
      return s.id === currentStep;
    })) == null ? void 0 : _steps$find2.description), /*#__PURE__*/React.createElement(Paragraph, null, "Step content")))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Vertical Steps'
};
export { VerticalSteps };