import React, { useContext } from 'react';

// WizardContext exposes wizard state and navigation actions to descendants.
// Consumers include WizardHeader, WizardProgress, WizardStepHeader,
// WizardContent, WizardFooter, and any custom composition inside <Wizard>.
export const WizardContext = React.createContext({
  steps: [],
  currentStep: '',
  currentStepIndex: 0,
  currentStepObj: undefined,
  totalSteps: 0,
  completedSteps: new Set(),
  visitedSteps: [],
  formValue: {},
  setFormValue: () => {},
  validationError: undefined,
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
  // True when Wizard was given `onCancel`; drives the footer Cancel button.
  hasCancelHandler: false,
  getStepStatus: () => 'pending',
  direction: 'horizontal',
  messages: undefined,
});

export const useWizard = () => useContext(WizardContext);
