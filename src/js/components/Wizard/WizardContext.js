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
  isBlocked: false,
  isCompleted: false,
  canGoNext: true,
  next: () => {},
  previous: () => {},
  goTo: () => {},
  skip: () => {},
  complete: () => {},
  cancel: () => {},
  // True when `onCancel` was provided; drives the footer Cancel button.
  hasCancelHandler: false,
  showProgress: false,
  renderStep: undefined,
});

export const useWizard = () => useContext(WizardContext);
