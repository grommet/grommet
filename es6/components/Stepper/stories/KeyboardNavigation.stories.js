import React, { useEffect, useRef, useState } from 'react';
import { Box, Text } from 'grommet';
import { Stepper } from '../Stepper';
var KeyboardNavigation = function KeyboardNavigation() {
  var _useState = useState('step1'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var stepperRef = useRef();
  var steps = [{
    id: 'step1',
    title: 'Step 1',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Step 2',
    status: 'pending'
  }, {
    id: 'step3',
    title: 'Step 3',
    status: 'pending'
  }, {
    id: 'step4',
    title: 'Step 4',
    status: 'disabled',
    disabledReason: 'Complete all prior steps.'
  }, {
    id: 'step5',
    title: 'Step 5',
    status: 'pending'
  }];
  useEffect(function () {
    var _stepperRef$current;
    // Auto-focus the first step button so the focus ring is visible immediately
    var firstButton = (_stepperRef$current = stepperRef.current) == null ? void 0 : _stepperRef$current.querySelector('button');
    if (firstButton) firstButton.focus();
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "Use Arrow keys to navigate and Enter/Space to select."), /*#__PURE__*/React.createElement(Stepper, {
      ref: stepperRef,
      steps: steps,
      currentStep: currentStep,
      onStepClick: function onStepClick(id) {
        setCurrentStep(id);
      }
    }), /*#__PURE__*/React.createElement(Text, null, "Selected : ", currentStep))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Stepper/Keyboard Navigation'
};
export { KeyboardNavigation };