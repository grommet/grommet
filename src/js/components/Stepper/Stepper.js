import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box } from '../Box';
import { MessageContext } from '../../contexts/MessageContext';

import { Keyboard } from '../Keyboard';

import { StepConnector } from './StepConnector';
import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StepperPropTypes } from './propTypes';

// Flattens steps with parent/child relationships into a linear list
// for keyboard navigation and index-based tracking.
const flattenSteps = (steps) => {
  const flat = [];
  let hasSubSubSteps = false;

  steps.forEach((step, parentIdx) => {
    const hasChildren = step.children && step.children.length > 0;
    const isLastParent = parentIdx === steps.length - 1;
    flat.push({
      ...step,
      isSubStep: false,
      showConnector: !isLastParent,
      childIds: hasChildren ? step.children.map((c) => c.id) : [],
    });
    if (hasChildren) {
      step.children.forEach((child) => {
        flat.push({
          ...child,
          isSubStep: true,
          showConnector: false,
          parentId: step.id,
          childIds: [],
        });
        if (child.children && child.children.length > 0) {
          hasSubSubSteps = true;
        }
      });
    }
  });
  if (process.env.NODE_ENV !== 'production' && hasSubSubSteps) {
    console.warn(
      'Stepper: sub-steps with their own children are not supported.',
    );
  }
  return flat;
};

const Stepper = forwardRef(
  (
    {
      steps = [],
      currentStep,
      direction: directionProp = 'horizontal',
      clickableSteps = true,
      showDescription = true,
      onStepClick,
      'aria-label': ariaLabel,
      children,
      id,
      ...rest
    },
    ref,
  ) => {
    const { format } = useContext(MessageContext);
    const stepRefs = useRef(new Map());
    const flatSteps = useMemo(() => flattenSteps(steps), [steps]);
    const stepsRef = useRef(flatSteps);
    stepsRef.current = flatSteps;

    // Force vertical if steps have children
    // (horizontal substeps not supported)
    const hasSubSteps = steps.some(
      (step) => step.children && step.children.length > 0,
    );
    const direction =
      hasSubSteps && directionProp === 'horizontal'
        ? 'vertical'
        : directionProp;

    // Warn in dev about invalid state
    if (process.env.NODE_ENV !== 'production') {
      if (hasSubSteps && directionProp === 'horizontal') {
        console.warn(
          'Stepper: horizontal direction with sub-steps is not supported. ' +
            'Falling back to vertical.',
        );
      }
      if (currentStep) {
        const currentStepObj = flatSteps.find((s) => s.id === currentStep);
        if (!currentStepObj) {
          console.warn(
            'Stepper: currentStep "' +
              `${currentStep}" does not match any ` +
              'step id. Falling back to the ' +
              'first non-disabled step.',
          );
        } else if (currentStepObj.status === 'disabled') {
          console.warn(
            `Stepper: currentStep "${currentStep}" matches a disabled step. ` +
              `This is an invalid state. The step will render as disabled.`,
          );
        }
      }
    }

    // Determine effective current step (fallback to first non-disabled)
    const effectiveCurrentStep = useMemo(() => {
      const match = flatSteps.find((s) => s.id === currentStep);
      if (match && match.status !== 'disabled') return currentStep;
      const fallback = flatSteps.find((s) => s.status !== 'disabled');
      return fallback ? fallback.id : flatSteps[0]?.id || '';
    }, [currentStep, flatSteps]);

    // Roving tabindex: only the focused step has tabIndex=0,
    // all others have tabIndex=-1. A ref keeps the index synchronous
    // for keyboard handlers that fire before React re-renders.
    const currentIndex = flatSteps.findIndex(
      (s) => s.id === effectiveCurrentStep,
    );
    const flatStepsLength = flatSteps.length;
    const [focusedIndex, setFocusedIndex] = useState(
      currentIndex >= 0 ? currentIndex : 0,
    );
    const focusedIndexRef = useRef(focusedIndex);

    const updateFocusedIndex = useCallback((idx) => {
      focusedIndexRef.current = idx;
      setFocusedIndex(idx);
    }, []);

    const stepIndex = useCallback(
      (stepId) => flatSteps.findIndex((s) => s.id === stepId),
      [flatSteps],
    );

    const isPriorStep = useCallback(
      (stepId) => {
        const idx = stepIndex(stepId);
        const curIdx = stepIndex(effectiveCurrentStep);
        return idx < curIdx;
      },
      [stepIndex, effectiveCurrentStep],
    );

    const isAfterStep = useCallback(
      (stepId) => {
        const idx = stepIndex(stepId);
        const curIdx = stepIndex(effectiveCurrentStep);
        return idx > curIdx;
      },
      [stepIndex, effectiveCurrentStep],
    );

    const isCurrentStep = useCallback(
      (stepId) => stepId === effectiveCurrentStep,
      [effectiveCurrentStep],
    );

    const canNavigateTo = useCallback(
      (stepId) => {
        const step = flatSteps.find((s) => s.id === stepId);
        return clickableSteps && step && step.status !== 'disabled';
      },
      [flatSteps, clickableSteps],
    );

    const contextValue = useMemo(
      () => ({
        currentStep: effectiveCurrentStep,
        steps: flatSteps,
        direction,
        clickableSteps,
        onStepClick,
        showDescription,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      }),
      [
        effectiveCurrentStep,
        flatSteps,
        direction,
        clickableSteps,
        onStepClick,
        showDescription,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      ],
    );

    // Wraps around the step list to find the next step
    // in the given direction (+1 forward, -1 backward).
    const findNextEnabledIndex = useCallback(
      (startIndex, delta) =>
        (startIndex + delta + flatStepsLength) % flatStepsLength,
      [flatStepsLength],
    );

    const findFirstEnabledIndex = useCallback(() => 0, []);

    const findLastEnabledIndex = useCallback(
      () => flatStepsLength - 1,
      [flatStepsLength],
    );

    const moveFocus = useCallback(
      (nextIndex) => {
        if (nextIndex !== undefined && nextIndex !== focusedIndexRef.current) {
          updateFocusedIndex(nextIndex);
          const nextButton = stepRefs.current.get(nextIndex);
          if (nextButton) {
            nextButton.focus();
          }
        }
      },
      [updateFocusedIndex],
    );

    const onNext = useCallback(() => {
      moveFocus(findNextEnabledIndex(focusedIndexRef.current, 1));
    }, [findNextEnabledIndex, moveFocus]);

    const onPrevious = useCallback(() => {
      moveFocus(findNextEnabledIndex(focusedIndexRef.current, -1));
    }, [findNextEnabledIndex, moveFocus]);

    const handleKeyDown = useCallback(
      (event) => {
        const isHorizontal = direction === 'horizontal';
        switch (event.key) {
          case 'ArrowRight':
            if (isHorizontal) {
              event.preventDefault();
              onNext();
            }
            break;
          case 'ArrowLeft':
            if (isHorizontal) {
              event.preventDefault();
              onPrevious();
            }
            break;
          case 'ArrowDown':
            if (!isHorizontal) {
              event.preventDefault();
              onNext();
            }
            break;
          case 'ArrowUp':
            if (!isHorizontal) {
              event.preventDefault();
              onPrevious();
            }
            break;
          case 'Home':
            event.preventDefault();
            moveFocus(findFirstEnabledIndex());
            break;
          case 'End':
            event.preventDefault();
            moveFocus(findLastEnabledIndex());
            break;
          default:
            break;
        }
      },
      [
        direction,
        onNext,
        onPrevious,
        findFirstEnabledIndex,
        findLastEnabledIndex,
        moveFocus,
      ],
    );

    const renderDefaultSteps = () => {
      let flatIndex = 0;
      const elements = [];
      steps.forEach((step, parentIdx) => {
        const parentFlatIndex = flatIndex;
        flatIndex += 1;
        const childElements = step.children
          ? step.children.map((child) => {
              const childFlatIndex = flatIndex;
              flatIndex += 1;
              return (
                <StepperStep
                  key={child.id}
                  step={child}
                  stepNumber={childFlatIndex + 1}
                  isLast={false}
                  showConnector={false}
                  direction={direction}
                  focusedIndex={focusedIndex}
                  index={childFlatIndex}
                  isSubStep
                  onFocusStep={updateFocusedIndex}
                  stepsRef={stepsRef}
                  stepRefs={stepRefs}
                />
              );
            })
          : null;
        const isLastParent = parentIdx === steps.length - 1;
        elements.push(
          <StepperStep
            key={step.id}
            step={step}
            stepNumber={parentFlatIndex + 1}
            isLast={isLastParent}
            showConnector={
              direction === 'horizontal'
                ? false
                : !isLastParent || !!childElements
            }
            direction={direction}
            focusedIndex={focusedIndex}
            index={parentFlatIndex}
            isSubStep={false}
            onFocusStep={updateFocusedIndex}
            stepsRef={stepsRef}
            stepRefs={stepRefs}
          />,
        );
        if (!isLastParent || (childElements && direction === 'vertical')) {
          elements.push(
            <StepConnector
              key={`${step.id}-connector`}
              step={step}
              direction={direction}
            >
              {childElements}
            </StepConnector>,
          );
        }
      });
      return elements;
    };

    const stepperContent = (
      <Box
        ref={ref}
        as="ol"
        aria-label={
          ariaLabel ||
          format({
            id: 'stepper.progress',
          })
        }
        direction={direction === 'horizontal' ? 'row' : 'column'}
        fill={direction}
        id={id}
        overflow="hidden"
        pad="none"
        margin="none"
        style={{ listStyle: 'none' }}
        {...rest}
      >
        {children || renderDefaultSteps()}
      </Box>
    );

    return (
      <StepperContext.Provider value={contextValue}>
        {clickableSteps ? (
          <Keyboard onKeyDown={handleKeyDown}>{stepperContent}</Keyboard>
        ) : (
          stepperContent
        )}
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
Stepper.propTypes = StepperPropTypes;

export { Stepper };
