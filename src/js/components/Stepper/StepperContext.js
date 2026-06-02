import React, { useContext } from 'react';

export const StepperContext = React.createContext({
  currentStep: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  stepIndex: () => -1,
  isPriorStep: () => false,
  isAfterStep: () => false,
  isCurrentStep: () => false,
  canNavigateTo: () => false,
});

export const useStepper = () => useContext(StepperContext);
