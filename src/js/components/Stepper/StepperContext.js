import { createContext, useContext } from 'react';

// Stepper-level context: shared across all steps
export const StepperContext = createContext({
  currentStep: undefined,
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  focusIndex: 0,
  setFocusIndex: () => {},
  stepRefs: [],
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
});

export const useStepper = () => useContext(StepperContext);
export const useStepItem = () => useContext(StepItemContext);

// Derive visual/interactive state from step.status + whether step is current
export const getEffectiveState = (step, isCurrent) => {
  if (!step) return 'pending';
  if (step.status === 'disabled') return 'disabled';
  if (isCurrent) {
    if (step.status === 'completed') return 'current-completed';
    if (step.status === 'error') return 'current-error';
    return 'current';
  }
  return step.status || 'pending';
};

// Map a step's status to its outgoing connector color token
export const getConnectorColorToken = (status) => {
  if (status === 'completed') return 'status-ok';
  if (status === 'error') return 'status-error';
  return 'border';
};
