import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box } from '../Box';
import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StepperPropTypes } from './propTypes';

const MAX_SUPPORTED_STEP_LEVEL = 1;

const hasUnsupportedDepth = (steps, level = 0) =>
  steps.some((step) => {
    const children = Array.isArray(step.children) ? step.children : [];
    if (!children.length) return false;
    if (level >= MAX_SUPPORTED_STEP_LEVEL) return true;
    return hasUnsupportedDepth(children, level + 1);
  });

const normalizeStepHierarchy = (step, level = 0) => {
  const children =
    level < MAX_SUPPORTED_STEP_LEVEL && Array.isArray(step.children)
      ? step.children.map((child) => normalizeStepHierarchy(child, level + 1))
      : undefined;

  let { status } = step;
  if (children?.length) {
    const childStatuses = children.map((child) => child.status || 'pending');
    if (childStatuses.every((childStatus) => childStatus === 'completed')) {
      status = 'completed';
    } else if (childStatuses.some((childStatus) => childStatus === 'error')) {
      status = 'error';
    } else if (
      childStatuses.every((childStatus) => childStatus === 'disabled')
    ) {
      status = 'disabled';
    } else {
      status = 'pending';
    }
  }

  return {
    ...step,
    status,
    children,
  };
};

const flattenHierarchy = (steps, level = 0) =>
  steps.flatMap((step) => {
    const normalized = normalizeStepHierarchy(step, level);
    const currentNode = { ...normalized, level };
    const childNodes = normalized.children?.length
      ? flattenHierarchy(normalized.children, level + 1)
      : [];
    return [currentNode, ...childNodes];
  });

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
    const warnedUnsupportedDepthRef = useRef(false);
    const flattenedSteps = useMemo(() => flattenHierarchy(steps), [steps]);

    useEffect(() => {
      if (
        process.env.NODE_ENV !== 'production' &&
        !warnedUnsupportedDepthRef.current &&
        hasUnsupportedDepth(steps)
      ) {
        console.warn(
          'Stepper: v1 supports at most two step levels (parent + child). ' +
            'Descendants beyond child level are ignored.',
        );
        warnedUnsupportedDepthRef.current = true;
      }
    }, [steps]);

    // Dev-mode warnings for invalid authored state
    if (process.env.NODE_ENV !== 'production') {
      if (currentStep) {
        const matched = flattenedSteps.find((s) => s.id === currentStep);
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
      if (!currentStep)
        return flattenedSteps.find((s) => s.status !== 'disabled')?.id;
      const matched = flattenedSteps.find((s) => s.id === currentStep);
      if (!matched || matched.status === 'disabled') {
        return (
          flattenedSteps.find((s) => s.status !== 'disabled')?.id ||
          flattenedSteps[0]?.id
        );
      }
      return currentStep;
    }, [currentStep, flattenedSteps]);

    // Roving tabindex: one step holds tabIndex=0 at a time
    const initialFocusIndex = Math.max(
      0,
      flattenedSteps.findIndex((s) => s.id === effectiveCurrentStep),
    );
    const [focusIndex, setFocusIndex] = useState(initialFocusIndex);
    const [revealedParentIds, setRevealedParentIds] = useState(new Set());

    // Auto-reveal parent when child becomes current step
    useEffect(() => {
      const currentStepNode = flattenedSteps.find(
        (s) => s.id === effectiveCurrentStep,
      );
      if (currentStepNode && currentStepNode.level > 0) {
        // Find parent step (last step at previous level before current)
        const parentStep = flattenedSteps
          .slice(0, flattenedSteps.indexOf(currentStepNode))
          .reverse()
          .find((s) => s.level === currentStepNode.level - 1);

        if (parentStep) {
          setRevealedParentIds((prev) => {
            if (!prev.has(parentStep.id)) {
              return new Set([...prev, parentStep.id]);
            }
            return prev;
          });
        }
      }
    }, [effectiveCurrentStep, flattenedSteps]);

    // Sync focusIndex when currentStep changes (e.g. Wizard advances)
    useEffect(() => {
      const idx = flattenedSteps.findIndex(
        (s) => s.id === effectiveCurrentStep,
      );
      if (idx >= 0) setFocusIndex(idx);
    }, [effectiveCurrentStep, flattenedSteps]);

    // Stable refs for each step button (for programmatic focus)
    const stepRefs = useMemo(
      () => flattenedSteps.map(() => React.createRef()),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [flattenedSteps.length],
    );

    // Context helpers
    const stepIndex = useCallback(
      (id) => flattenedSteps.findIndex((s) => s.id === id),
      [flattenedSteps],
    );
    const isCurrentStep = useCallback(
      (id) => id === effectiveCurrentStep,
      [effectiveCurrentStep],
    );
    const isPriorStep = useCallback(
      (id) => {
        const idx = flattenedSteps.findIndex((s) => s.id === id);
        const currentIdx = flattenedSteps.findIndex(
          (s) => s.id === effectiveCurrentStep,
        );
        return idx < currentIdx;
      },
      [flattenedSteps, effectiveCurrentStep],
    );
    const isAfterStep = useCallback(
      (id) => {
        const idx = flattenedSteps.findIndex((s) => s.id === id);
        const currentIdx = flattenedSteps.findIndex(
          (s) => s.id === effectiveCurrentStep,
        );
        return idx > currentIdx;
      },
      [flattenedSteps, effectiveCurrentStep],
    );
    const canNavigateTo = useCallback(
      (id) => {
        const step = flattenedSteps.find((s) => s.id === id);
        return clickableSteps && step?.status !== 'disabled';
      },
      [flattenedSteps, clickableSteps],
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
          nextIndex = Math.min(focusIndex + 1, flattenedSteps.length - 1);
        } else if (
          (isHorizontal && key === 'ArrowLeft') ||
          (!isHorizontal && key === 'ArrowUp')
        ) {
          nextIndex = Math.max(focusIndex - 1, 0);
        } else if (key === 'Home') {
          nextIndex = 0;
        } else if (key === 'End') {
          nextIndex = flattenedSteps.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        if (nextIndex !== focusIndex) {
          setFocusIndex(nextIndex);
          stepRefs[nextIndex]?.current?.focus();
        }
      },
      [direction, focusIndex, flattenedSteps.length, stepRefs],
    );

    const contextValue = useMemo(
      () => ({
        currentStep: effectiveCurrentStep,
        steps: flattenedSteps,
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
        revealedParentIds,
        setRevealedParentIds,
      }),
      [
        effectiveCurrentStep,
        flattenedSteps,
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
        revealedParentIds,
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
            flattenedSteps
              .map((step, index) => {
                // Determine if child step should be rendered
                if (step.level > 0) {
                  // Find parent step (last step at previous level)
                  const parentStep = flattenedSteps
                    .slice(0, index)
                    .reverse()
                    .find((s) => s.level === step.level - 1);

                  // Only render child if parent is revealed
                  if (parentStep && !revealedParentIds.has(parentStep.id)) {
                    return null;
                  }
                }

                return (
                  <StepperStep key={step.id} stepId={step.id} index={index} />
                );
              })
              .filter(Boolean)}
        </Box>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
Stepper.propTypes = StepperPropTypes;

export { Stepper };
