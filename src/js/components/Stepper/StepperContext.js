// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';

export const StepperContext = createContext({
  currentStep: '',
  focusedStepId: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  onFocusStep: () => {},
  registerStepRef: () => {},
  showDescription: true,
  errorAnnouncement: 'polite',
  stepIndex: () => -1,
  isPriorStep: () => false,
  isAfterStep: () => false,
  isCurrentStep: () => false,
  canNavigateTo: () => false,
});

// Step-level context: provides the current step's data to subcomponents
export const StepItemContext = createContext({
  step: null,
  isSubStep: false,
  isDisabled: false,
});

export const useStepper = () => useContext(StepperContext);
export const useStepItem = () => useContext(StepItemContext);
