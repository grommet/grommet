import { createContext, useContext } from 'react';

export const StepperContext = createContext({
  currentStep: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  showDescription: true,
  stepIndex: () => -1,
  isPriorStep: () => false,
  isAfterStep: () => false,
  isCurrentStep: () => false,
  canNavigateTo: () => false,
});

// Step-level context: provides the current step's data to subcomponents
export const StepItemContext = createContext({
  step: null,
  index: 0,
  isLast: false,
  isLabelRevealed: false,
  isSubStep: false,
});

export const useStepper = () => useContext(StepperContext);
export const useStepItem = () => useContext(StepItemContext);
