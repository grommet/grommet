import { createContext, useContext } from 'react';
export var StepperContext = /*#__PURE__*/createContext({
  currentStep: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  showDescription: true,
  stepIndex: function stepIndex() {
    return -1;
  },
  isPriorStep: function isPriorStep() {
    return false;
  },
  isAfterStep: function isAfterStep() {
    return false;
  },
  isCurrentStep: function isCurrentStep() {
    return false;
  },
  canNavigateTo: function canNavigateTo() {
    return false;
  }
});

// Step-level context: provides the current step's data to subcomponents
export var StepItemContext = /*#__PURE__*/createContext({
  step: null,
  index: 0,
  isLast: false,
  isLabelRevealed: false,
  isSubStep: false
});
export var useStepper = function useStepper() {
  return useContext(StepperContext);
};
export var useStepItem = function useStepItem() {
  return useContext(StepItemContext);
};