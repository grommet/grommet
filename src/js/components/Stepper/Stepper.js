// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box } from '../Box';
import { MessageContext } from '../../contexts/MessageContext';

import { useThemeValue } from '../../utils/useThemeValue';

import { Keyboard } from '../Keyboard';

import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StepperPropTypes } from './propTypes';
import { resolveStepperTheme } from './utils';

// Flattens steps with parent/child relationships into a linear list
// for keyboard navigation.
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

const isEnabledLeaf = (step) =>
  step.status !== 'disabled' && (!step.childIds.length || step.isSubStep);

const findFirstEnabledChild = (steps, parentId) =>
  steps.find(
    (step) => step.parentId === parentId && step.status !== 'disabled',
  );

const findFirstEnabledLeaf = (steps, startIndex = 0) =>
  steps.slice(startIndex).find(isEnabledLeaf) || steps.find(isEnabledLeaf);

const resolveCurrentStep = (steps, currentStepId) => {
  const requestedIndex = steps.findIndex((step) => step.id === currentStepId);
  const requestedStep = steps[requestedIndex];
  const canUseRequestedStep =
    requestedStep && requestedStep.status !== 'disabled';
  let requestedTarget;
  if (canUseRequestedStep) {
    requestedTarget = requestedStep.childIds.length
      ? findFirstEnabledChild(steps, requestedStep.id)
      : requestedStep;
  }

  // Parents with children are headings, not navigation stops. If the
  // requested group has no enabled child, scan in input order for an enabled
  // leaf, matching Wizard's forward-order navigation policy.
  const fallback =
    requestedTarget ||
    findFirstEnabledLeaf(steps, requestedIndex >= 0 ? requestedIndex + 1 : 0);
  return fallback?.id || steps[0]?.id || '';
};

const Stepper = forwardRef(
  (
    {
      steps = [],
      currentStep,
      direction: directionProp = 'horizontal',
      clickableSteps = true,
      showDescription = true,
      errorAnnouncement = 'polite',
      onStepClick,
      'aria-label': ariaLabel,
      children,
      id,
      ...rest
    },
    ref,
  ) => {
    const { format } = useContext(MessageContext);
    const { theme } = useThemeValue();

    const stepRefs = useRef(new Map());
    const allSteps = useMemo(() => flattenSteps(steps), [steps]);

    useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'Warning: Stepper is currently in beta. The API is subject ' +
            'to change in future releases.',
        );
      }
    }, []);

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
        const currentStepObj = allSteps.find((s) => s.id === currentStep);
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
    const effectiveCurrentStep = useMemo(
      () => resolveCurrentStep(allSteps, currentStep),
      [currentStep, allSteps],
    );

    // Reveal a whole group on entry, not just the active child. Remember
    // groups by id so controlled changes and recreated step objects do not
    // collapse visited children. Adjust during render so an initial
    // current child is visible immediately, without an effect or hidden frame.
    const currentParentId = allSteps.find(
      (step) => step.id === effectiveCurrentStep,
    )?.parentId;
    const [localRevealedParents, setLocalRevealedParents] = useState(
      () => new Set(),
    );
    const revealedParents = localRevealedParents;
    if (currentParentId && !localRevealedParents.has(currentParentId)) {
      setLocalRevealedParents(
        new Set(Array.from(localRevealedParents).concat(currentParentId)),
      );
    }
    const flatSteps = useMemo(
      () =>
        allSteps.filter(
          (step) =>
            !step.isSubStep ||
            step.parentId === currentParentId ||
            revealedParents.has(step.parentId),
        ),
      [allSteps, currentParentId, revealedParents],
    );
    // Roving tabindex: only the focused step has tabIndex=0,
    // all others have tabIndex=-1. Track focus by id so inserting
    // revealed children does not shift focus.
    const [focusedStep, setFocusedStep] = useState(effectiveCurrentStep);
    const focusedStepId = flatSteps.some((s) => s.id === focusedStep)
      ? focusedStep
      : effectiveCurrentStep;
    const focusedStepRef = useRef(focusedStepId);
    focusedStepRef.current = focusedStepId;

    const updateFocusedStep = useCallback((stepId) => {
      focusedStepRef.current = stepId;
      setFocusedStep(stepId);
    }, []);

    const registerStepRef = useCallback((stepId, element) => {
      if (element) stepRefs.current.set(stepId, element);
      else stepRefs.current.delete(stepId);
    }, []);

    const stepIndex = useCallback(
      (stepId) => allSteps.findIndex((s) => s.id === stepId),
      [allSteps],
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
        const step = allSteps.find((s) => s.id === stepId);
        if (!clickableSteps || !step || step.status === 'disabled')
          return false;
        if (step.childIds.length) {
          return allSteps.some(
            (child) =>
              child.parentId === step.id && child.status !== 'disabled',
          );
        }
        return true;
      },
      [allSteps, clickableSteps],
    );

    const contextValue = useMemo(
      () => ({
        currentStep: effectiveCurrentStep,
        focusedStepId,
        steps: allSteps,
        direction,
        clickableSteps,
        onStepClick,
        onFocusStep: updateFocusedStep,
        registerStepRef,
        showDescription,
        errorAnnouncement,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      }),
      [
        effectiveCurrentStep,
        focusedStepId,
        allSteps,
        direction,
        clickableSteps,
        onStepClick,
        updateFocusedStep,
        registerStepRef,
        showDescription,
        errorAnnouncement,
        stepIndex,
        isPriorStep,
        isAfterStep,
        isCurrentStep,
        canNavigateTo,
      ],
    );

    // Wraps around the step list to find the next step
    // in the given direction (+1 forward, -1 backward).
    const findNextStepId = useCallback(
      (delta) => {
        if (!flatSteps.length) return undefined;
        const index = flatSteps.findIndex(
          (step) => step.id === focusedStepRef.current,
        );
        const startIndex = index >= 0 ? index : 0;
        const nextIndex =
          (startIndex + delta + flatSteps.length) % flatSteps.length;
        return flatSteps[nextIndex]?.id;
      },
      [flatSteps],
    );

    const moveFocus = useCallback(
      (nextStepId) => {
        if (nextStepId && nextStepId !== focusedStepRef.current) {
          updateFocusedStep(nextStepId);
          const nextButton = stepRefs.current.get(nextStepId);
          if (nextButton) {
            nextButton.focus();
          }
        }
      },
      [updateFocusedStep],
    );

    const onNext = useCallback(() => {
      moveFocus(findNextStepId(1));
    }, [findNextStepId, moveFocus]);

    const onPrevious = useCallback(() => {
      moveFocus(findNextStepId(-1));
    }, [findNextStepId, moveFocus]);

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
            moveFocus(flatSteps[0]?.id);
            break;
          case 'End':
            event.preventDefault();
            moveFocus(flatSteps[flatSteps.length - 1]?.id);
            break;
          default:
            break;
        }
      },
      [direction, onNext, onPrevious, flatSteps, moveFocus],
    );

    const renderDefaultSteps = () => {
      const elements = [];
      steps.forEach((step) => {
        const visibleChildren =
          revealedParents.has(step.id) || step.id === currentParentId
            ? step.children
            : undefined;
        const childElements = visibleChildren
          ? visibleChildren.map((child) => (
              <StepperStep key={child.id} stepId={child.id} />
            ))
          : null;
        elements.push(
          <StepperStep key={step.id} stepId={step.id}>
            {childElements}
          </StepperStep>,
        );
      });
      return elements;
    };

    const stepperTheme = resolveStepperTheme(theme, direction);

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
        // string gaps must still render as CSS gap, never spacer divs,
        // to keep the list's li-only children
        cssGap
        // avoiding letting the pad shrink for now
        responsive={false}
        id={id}
        overflow="visible"
        pad="none"
        margin="none"
        style={{ listStyle: 'none' }}
        {...stepperTheme.container}
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
