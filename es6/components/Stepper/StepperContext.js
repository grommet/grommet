// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';
export var StepperContext = /*#__PURE__*/createContext({
  currentStep: '',
  focusedStepId: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  onFocusStep: function onFocusStep() {},
  registerStepRef: function registerStepRef() {},
  showDescription: true,
  errorAnnouncement: 'polite',
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
  isSubStep: false,
  isDisabled: false
});
export var useStepper = function useStepper() {
  return useContext(StepperContext);
};
export var useStepItem = function useStepItem() {
  return useContext(StepItemContext);
};