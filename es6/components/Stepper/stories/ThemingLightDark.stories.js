// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Heading, ThemeContext } from 'grommet';
import { Stepper } from '../Stepper';
var ThemingLightDark = function ThemingLightDark() {
  var _useState = useState('step1'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'step1',
    title: 'Account',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Profile',
    status: 'pending'
  }, {
    id: 'step3',
    title: 'Review',
    status: 'pending'
  }];
  return /*#__PURE__*/React.createElement(Box, {
    gap: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    background: "background-front"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3
  }, "Light Theme"), /*#__PURE__*/React.createElement(Stepper, {
    steps: steps,
    currentStep: currentStep,
    onStepClick: function onStepClick(id) {
      return setCurrentStep(id);
    }
  })), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: {
      dark: true
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    background: "background-front"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3
  }, "Dark Theme"), /*#__PURE__*/React.createElement(Stepper, {
    steps: steps,
    currentStep: currentStep,
    onStepClick: function onStepClick(id) {
      return setCurrentStep(id);
    }
  }))));
};
export default {
  title: 'Visualizations/Stepper/Theming Light Dark'
};
export { ThemingLightDark };