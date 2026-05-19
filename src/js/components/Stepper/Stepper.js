import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Box } from '../Box';
import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StepperPropTypes } from './propTypes';

const Stepper = forwardRef(
  (
    {
      steps = [],
      currentStep,
      direction = 'horizontal',
      clickableSteps = true,
      onStepClick,
      a11yTitle,
      children,
      ...rest
    },
    ref,
  ) => {
    // Dev-mode warnings for invalid authored state
    if (process.env.NODE_ENV !== 'production') {
      if (currentStep) {
        const matched = steps.find((s) => s.id === currentStep);
        if (!matched) {
          console.warn(
            `Stepper: currentStep "${currentStep}" does not ` +
              `match any step id. Falling back to first non-disabled step.`,
          );
        } else if (matched.status === 'disabled') {
          console.warn(
            `Stepper: currentStep "${currentStep}" matches a disabled step. ` +
              `Rendering step as disabled.`,
          );
        }
      }
    }

    // Resolve effective current step: skip disabled/invalid targets
    const effectiveCurrentStep = useMemo(() => {
      if (!currentStep) return steps.find((s) => s.status !== 'disabled')?.id;
      const matched = steps.find((s) => s.id === currentStep);
      if (!matched || matched.status === 'disabled') {
        return steps.find((s) => s.status !== 'disabled')?.id || steps[0]?.id;
      }
      return currentStep;
    }, [currentStep, steps]);

    // Roving tabindex: one step holds tabIndex=0 at a time
    const initialFocusIndex = Math.max(
      0,
      steps.findIndex((s) => s.id === effectiveCurrentStep),
    );
    const [focusIndex, setFocusIndex] = useState(initialFocusIndex);

    // Sync focusIndex when currentStep changes (e.g. Wizard advances)
    useEffect(() => {
      const idx = steps.findIndex((s) => s.id === effectiveCurrentStep);
      if (idx >= 0) setFocusIndex(idx);
    }, [effectiveCurrentStep, steps]);

    // Stable refs for each step button (for programmatic focus)
    const stepRefs = useMemo(
      () => steps.map(() => React.createRef()),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [steps.length],
    );

    // Context helpers
    const stepIndex = useCallback(
      (id) => steps.findIndex((s) => s.id === id),
      [steps],
    );
    const isCurrentStep = useCallback(
      (id) => id === effectiveCurrentStep,
      [effectiveCurrentStep],
    );
    const isPriorStep = useCallback(
      (id) => {
        const idx = steps.findIndex((s) => s.id === id);
        const currentIdx = steps.findIndex(
          (s) => s.id === effectiveCurrentStep,
        );
        return idx < currentIdx;
      },
      [steps, effectiveCurrentStep],
    );
    const isAfterStep = useCallback(
      (id) => {
        const idx = steps.findIndex((s) => s.id === id);
        const currentIdx = steps.findIndex(
          (s) => s.id === effectiveCurrentStep,
        );
        return idx > currentIdx;
      },
      [steps, effectiveCurrentStep],
    );
    const canNavigateTo = useCallback(
      (id) => {
        const step = steps.find((s) => s.id === id);
        return clickableSteps && step?.status !== 'disabled';
      },
      [steps, clickableSteps],
    );

    // Keyboard navigation: arrow keys, Home, End
    const handleKeyDown = useCallback(
      (event) => {
        const { key } = event;
        const isHorizontal = direction === 'horizontal';
        let nextIndex = focusIndex;

        if (
          (isHorizontal && key === 'ArrowRight') ||
          (!isHorizontal && key === 'ArrowDown')
        ) {
          nextIndex = Math.min(focusIndex + 1, steps.length - 1);
        } else if (
          (isHorizontal && key === 'ArrowLeft') ||
          (!isHorizontal && key === 'ArrowUp')
        ) {
          nextIndex = Math.max(focusIndex - 1, 0);
        } else if (key === 'Home') {
          nextIndex = 0;
        } else if (key === 'End') {
          nextIndex = steps.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        if (nextIndex !== focusIndex) {
          setFocusIndex(nextIndex);
          stepRefs[nextIndex]?.current?.focus();
        }
      },
      [direction, focusIndex, steps.length, stepRefs],
    );

    const contextValue = useMemo(
      () => ({
        currentStep: effectiveCurrentStep,
        steps,
        direction,
        clickableSteps,
        onStepClick,
        focusIndex,
        setFocusIndex,
        stepRefs,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      }),
      [
        effectiveCurrentStep,
        steps,
        direction,
        clickableSteps,
        onStepClick,
        focusIndex,
        setFocusIndex,
        stepRefs,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      ],
    );

    return (
      <StepperContext.Provider value={contextValue}>
        <Box
          ref={ref}
          as="ol"
          direction={direction === 'horizontal' ? 'row' : 'column'}
          aria-label={a11yTitle || 'Progress steps'}
          onKeyDown={handleKeyDown}
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
          {...rest}
        >
          {children ||
            steps.map((step, index) => (
              <StepperStep key={step.id} stepId={step.id} index={index} />
            ))}
        </Box>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
Stepper.propTypes = StepperPropTypes;

export { Stepper };
