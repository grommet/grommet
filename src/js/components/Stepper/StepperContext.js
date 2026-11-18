// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';

export const StepperContext = createContext({
  currentStep: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  showDescription: true,
  errorAnnouncement: 'polite',
  stepIndex: () => -1,
  isPriorStep: () => false,
  isAfterStep: () => false,
  isCurrentStep: () => false,
  canNavigateTo: () => false,
});

// Rendering details stay internal while public StepperStep items use them
// to preserve roving focus when composed by consumers.
export const StepperRenderContext = createContext({
  flatSteps: [],
  focusedIndex: 0,
  defaultSubSteps: {},
  defaultLayout: false,
  registerStepRef: () => {},
  updateFocusedIndex: () => {},
});

// Step-level context: provides the current step's data to subcomponents.
export const StepItemContext = createContext({
  step: null,
  index: 0,
  isLast: false,
  isSubStep: false,
  isDisabled: false,
  descriptionId: undefined,
  errorId: undefined,
  reasonId: undefined,
});

export const useStepper = () => useContext(StepperContext);
export const useStepItem = () => useContext(StepItemContext);
