import React, { useContext } from 'react';

// WizardContext exposes wizard state and navigation actions to descendants.
export const WizardContext = React.createContext({
  steps: [],
  currentStep: '',
  currentStepIndex: 0,
  currentStepObj: undefined,
  totalSteps: 0,
  stepStates: {},
  formValue: {},
  setFormValue: () => {},
  validationError: undefined,
  isValidating: false,
  isFirstStep: true,
  isLastStep: false,
  canGoNext: true,
  canGoPrevious: false,
  next: () => {},
  previous: () => {},
  goTo: () => {},
  skip: () => {},
  complete: () => {},
  cancel: () => {},
  // True when `onCancel` was provided; drives the footer Cancel button.
  hasCancelHandler: false,
  showProgress: false,
  messages: undefined,
});

export const useWizard = () => useContext(WizardContext);
