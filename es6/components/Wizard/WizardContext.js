import React, { useContext } from 'react';

// WizardContext exposes wizard state and navigation actions to descendants.
// Consumers include WizardHeader, WizardProgress, WizardStepHeader,
// WizardContent, WizardFooter, and any custom composition inside <Wizard>.
export var WizardContext = /*#__PURE__*/React.createContext({
  steps: [],
  currentStep: '',
  currentStepIndex: 0,
  currentStepObj: undefined,
  totalSteps: 0,
  completedSteps: new Set(),
  visitedSteps: [],
  formValue: {},
  setFormValue: function setFormValue() {},
  validationError: undefined,
  isFirstStep: true,
  isLastStep: false,
  canGoNext: true,
  canGoPrevious: false,
  next: function next() {},
  previous: function previous() {},
  goTo: function goTo() {},
  skip: function skip() {},
  complete: function complete() {},
  cancel: function cancel() {},
  // True when Wizard was given `onCancel`; drives the footer Cancel button.
  hasCancelHandler: false,
  getStepStatus: function getStepStatus() {
    return 'pending';
  },
  direction: 'horizontal',
  messages: undefined
});
export var useWizard = function useWizard() {
  return useContext(WizardContext);
};