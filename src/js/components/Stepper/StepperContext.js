// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useCallback, useContext, useRef } from 'react';

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

// Internal registration is separate from the public step item context.
export const StepperHelperContext = createContext(null);

export const useStepperHelperRef = (variant, id, forwardedRef) => {
  const register = useContext(StepperHelperContext);
  const token = useRef({});

  return useCallback(
    (element) => {
      if (register)
        register(
          token.current,
          variant,
          element ? element.id || id : undefined,
        );
      if (typeof forwardedRef === 'function') forwardedRef(element);
      else if (forwardedRef) Object.assign(forwardedRef, { current: element });
    },
    [register, variant, id, forwardedRef],
  );
};

export const useStepper = () => useContext(StepperContext);
export const useStepItem = () => useContext(StepItemContext);
