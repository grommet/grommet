// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';

// WizardContext exposes wizard state and navigation actions to descendants.
export var WizardContext = /*#__PURE__*/React.createContext({
  steps: [],
  currentStep: '',
  currentStepIndex: 0,
  currentStepObj: undefined,
  totalSteps: 0,
  stepStates: {},
  formValue: {},
  setFormValue: function setFormValue() {},
  validationError: undefined,
  isValidating: false,
  isBlocked: false,
  isCompleted: false,
  canGoNext: true,
  next: function next() {},
  previous: function previous() {},
  goTo: function goTo() {},
  skip: function skip() {},
  complete: function complete() {},
  cancel: function cancel() {},
  // True when `onCancel` was provided; drives the footer Cancel button.
  hasCancelHandler: false,
  showProgress: false,
  renderStep: undefined
});
export var useWizard = function useWizard() {
  return useContext(WizardContext);
};