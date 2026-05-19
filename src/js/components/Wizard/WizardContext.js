import { createContext, useContext } from 'react';

export const WizardContext = createContext({
  currentStep: undefined,
  currentStepIndex: 0,
  steps: [],
  hasOnCancel: false,
  isValidating: false,
  isBlocked: false,
  isCompleted: false,
  stepStates: {},
  formValue: undefined,
  setFormValue: undefined,
  navigation: {
    next: () => {},
    previous: () => {},
    goTo: () => {},
    skip: () => {},
    complete: () => {},
    cancel: () => {},
  },
});

export const useWizard = () => useContext(WizardContext);
