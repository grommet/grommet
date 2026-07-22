import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useAnalytics } from '../../contexts';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { Box } from '../Box';
import { WizardContext } from './WizardContext';
import { WizardHeader } from './WizardHeader';
import { WizardProgress } from './WizardProgress';
import { WizardStepHeader } from './WizardStepHeader';
import { WizardContent } from './WizardContent';
import { WizardFooter } from './WizardFooter';
import {
  StyledWizard,
  StyledWizardBody,
  StyledWizardCenter,
  StyledWizardContentColumn,
  StyledWizardFocusAnchor,
  StyledWizardMiddle,
} from './StyledWizard';
import { WizardPropTypes } from './propTypes';

// Flatten step tree into ordered leaves; parents with children are
// aggregate-only, never nav targets.
const flattenLeaves = (steps) => {
  const leaves = [];
  steps.forEach((step) => {
    if (step.children && step.children.length) {
      step.children.forEach((child) => leaves.push(child));
    } else {
      leaves.push(step);
    }
  });
  return leaves;
};

// Find step by id in the tree or leaf list.
const findStepById = (steps, id) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const step of steps) {
    if (step.id === id) return step;
    if (step.children) {
      const match = step.children.find((child) => child.id === id);
      if (match) return match;
    }
  }
  return undefined;
};

// Nearest scrollable ancestor for scrollToTop.
const findScrollableAncestor = (node) => {
  let element = node?.parentElement;
  while (element && element !== document.body) {
    const { overflowY } = window.getComputedStyle(element);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      element.scrollHeight > element.clientHeight
    ) {
      return element;
    }
    element = element.parentElement;
  }
  return undefined;
};

const Wizard = forwardRef(
  (
    {
      steps,
      currentStep: currentStepProp,
      defaultStep,
      showProgress = false,
      kind = 'full',
      onStepChange,
      onComplete,
      onCancel,
      renderStep,
      title,
      footer,
      scrollToTop = true,
      value: valueProp,
      defaultValue,
      onValueChange,
      id,
      'aria-label': ariaLabel,
      messages,
      children,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const { format } = React.useContext(MessageContext);
    const responsiveSize = React.useContext(ResponsiveContext);
    const sendAnalytics = useAnalytics();

    // Horizontal progress + sub-steps: fall back to vertical.
    const hasSubSteps = steps.some(
      (step) => step.children && step.children.length > 0,
    );
    const effectiveShowProgress =
      hasSubSteps && showProgress === 'horizontal' ? 'vertical' : showProgress;

    // Only two levels supported (step > child); warn on deeper nesting.
    const hasDeepNesting = steps.some((step) =>
      step.children?.some(
        (child) => child.children && child.children.length > 0,
      ),
    );

    if (process.env.NODE_ENV !== 'production') {
      if (hasSubSteps && showProgress === 'horizontal') {
        console.warn(
          'Wizard: horizontal showProgress with sub-steps is not supported. ' +
            'Falling back to vertical.',
        );
      }
      if (hasDeepNesting) {
        console.warn(
          'Wizard: nesting deeper than one level (step > child) is not ' +
            'supported. Descendants beyond the child level are ignored ' +
            'by default.',
        );
      }
    }

    const wizardRef = useForwardedRef(ref);
    const focusAnchorRef = useRef(null);

    const flatSteps = useMemo(() => flattenLeaves(steps), [steps]);
    const firstEnabled =
      flatSteps.find((step) => !step.disabled) || flatSteps[0];

    const isControlled = currentStepProp !== undefined;
    const [uncontrolledStep, setUncontrolledStep] = useState(
      defaultStep || firstEnabled?.id,
    );
    const currentStep = isControlled ? currentStepProp : uncontrolledStep;

    const isValueControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue || {},
    );
    const formValue = isValueControlled ? valueProp : uncontrolledValue;

    const setFormValue = useCallback(
      (nextValueOrFn) => {
        const resolved =
          typeof nextValueOrFn === 'function'
            ? nextValueOrFn(formValue)
            : nextValueOrFn;
        if (!isValueControlled) setUncontrolledValue(resolved);
        if (onValueChange) onValueChange(resolved);
      },
      [formValue, isValueControlled, onValueChange],
    );

    const [visitedSteps, setVisitedSteps] = useState([currentStep]);
    const [completedSteps, setCompletedSteps] = useState(() => new Set());
    const [validationError, setValidationError] = useState(undefined);
    const [isValidating, setIsValidating] = useState(false);
    // Without `onCancel`, cancel self-closes the wizard.
    const [isOpen, setIsOpen] = useState(true);
    const hasCancelHandler = onCancel !== undefined;

    // Keep visited history in sync when currentStep is externally set.
    useEffect(() => {
      setVisitedSteps((prev) =>
        prev[prev.length - 1] === currentStep ? prev : [...prev, currentStep],
      );
    }, [currentStep]);

    const currentStepObj = useMemo(
      () => findStepById(steps, currentStep),
      [steps, currentStep],
    );

    const currentStepIndex = useMemo(
      () => flatSteps.findIndex((step) => step.id === currentStep),
      [flatSteps, currentStep],
    );

    const totalSteps = flatSteps.length;
    const isFirstStep = currentStepIndex <= 0;
    const isLastStep = currentStepIndex >= totalSteps - 1;

    // Derive step status; parents aggregate from their children.
    const getStepStatus = useCallback(
      (stepId) => {
        // Parent-with-children aggregate
        const parent = steps.find(
          (step) => step.id === stepId && step.children && step.children.length,
        );
        if (parent) {
          const childStatuses = parent.children.map((child) => {
            if (child.disabled) return 'disabled';
            if (child.id === currentStep && validationError) return 'error';
            if (completedSteps.has(child.id)) return 'completed';
            return 'pending';
          });
          if (childStatuses.some((status) => status === 'error'))
            return 'error';
          if (childStatuses.every((status) => status === 'completed'))
            return 'completed';
          if (childStatuses.every((status) => status === 'disabled'))
            return 'disabled';
          return 'pending';
        }
        const step = findStepById(steps, stepId);
        if (!step) return 'pending';
        if (step.disabled) return 'disabled';
        if (stepId === currentStep && validationError) return 'error';
        if (completedSteps.has(stepId)) return 'completed';
        return 'pending';
      },
      [steps, currentStep, completedSteps, validationError],
    );

    // Record<id, status> for every step (top-level + children).
    const stepStates = useMemo(() => {
      const record = {};
      const walk = (nodes) => {
        nodes.forEach((node) => {
          record[node.id] = getStepStatus(node.id);
          if (node.children && node.children.length) walk(node.children);
        });
      };
      walk(steps);
      return record;
    }, [steps, getStepStatus]);

    // Emit a step change event to onStepChange.
    const emitStepChange = useCallback(
      (event) => {
        if (onStepChange) onStepChange(event);
      },
      [onStepChange],
    );

    // Resolve next step id, honoring step.nextStep(formValue) branching.
    const resolveNextStepId = useCallback(() => {
      if (!currentStepObj) return undefined;
      if (typeof currentStepObj.nextStep === 'function') {
        const nextId = currentStepObj.nextStep(formValue);
        if (!nextId) return undefined;
        const match = findStepById(steps, nextId);
        if (!match) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Wizard: nextStep("${nextId}") does not match any step id. ` +
                'Staying on current step.',
            );
          }
          return undefined;
        }
        return nextId;
      }
      const nextIndex = currentStepIndex + 1;
      return flatSteps[nextIndex]?.id;
    }, [currentStepObj, currentStepIndex, flatSteps, formValue, steps]);

    // Apply a navigation transition (id, history, completion, focus).
    const applyTransition = useCallback(
      (nextId, { markCompleted } = {}) => {
        if (!nextId) return;
        if (markCompleted && currentStep) {
          setCompletedSteps((prev) => {
            const next = new Set(prev);
            next.add(currentStep);
            return next;
          });
        }
        setValidationError(undefined);
        setVisitedSteps((prev) => [...prev, nextId]);
        if (!isControlled) setUncontrolledStep(nextId);
      },
      [currentStep, isControlled],
    );

    // Run step.validate (sync or async). Returns { ok, error }.
    const runValidation = useCallback(async () => {
      if (typeof currentStepObj?.validate !== 'function') {
        return { ok: true };
      }
      setIsValidating(true);
      try {
        const result = await currentStepObj.validate(formValue);
        setIsValidating(false);
        if (result === true || result === undefined) return { ok: true };
        if (result === false) {
          return {
            ok: false,
            error:
              messages?.validationError ||
              format({ id: 'wizard.validationError' }),
          };
        }
        if (typeof result === 'string') return { ok: false, error: result };
        if (typeof result === 'object' && result.error)
          return { ok: false, error: result.error };
        return { ok: true };
      } catch (err) {
        setIsValidating(false);
        return {
          ok: false,
          error: err?.message || format({ id: 'wizard.validationError' }),
        };
      }
    }, [currentStepObj, formValue, format, messages]);

    const next = useCallback(async () => {
      if (isValidating) return;
      emitStepChange({
        trigger: 'next',
        phase: 'requested',
        from: currentStep,
      });
      emitStepChange({
        trigger: 'next',
        phase: 'validating',
        from: currentStep,
      });
      const { ok, error } = await runValidation();
      if (!ok) {
        setValidationError(error);
        emitStepChange({
          trigger: 'next',
          phase: 'blocked',
          from: currentStep,
          error,
        });
        return;
      }
      emitStepChange({
        trigger: 'next',
        phase: 'validated',
        from: currentStep,
      });
      const nextId = resolveNextStepId();
      if (!nextId) return;
      applyTransition(nextId, { markCompleted: true });
      emitStepChange({
        trigger: 'next',
        phase: 'navigated',
        from: currentStep,
        to: nextId,
      });
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardNext', element: 'Wizard' });
    }, [
      sendAnalytics,
      applyTransition,
      currentStep,
      emitStepChange,
      isValidating,
      resolveNextStepId,
      runValidation,
    ]);

    const previous = useCallback(() => {
      // History-aware; falls back to the linear predecessor.
      const historyDest =
        visitedSteps.length > 1
          ? visitedSteps[visitedSteps.length - 2]
          : undefined;
      const fallbackDest = flatSteps[currentStepIndex - 1]?.id;
      const dest = historyDest || fallbackDest;
      if (!dest) return;
      setVisitedSteps((prev) => prev.slice(0, -1));
      setValidationError(undefined);
      if (!isControlled) setUncontrolledStep(dest);
      emitStepChange({
        trigger: 'previous',
        phase: 'navigated',
        from: currentStep,
        to: dest,
      });
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardPrevious', element: 'Wizard' });
    }, [
      sendAnalytics,
      currentStep,
      currentStepIndex,
      emitStepChange,
      flatSteps,
      isControlled,
      visitedSteps,
    ]);

    const goTo = useCallback(
      async (stepId) => {
        if (!stepId || stepId === currentStep) return;
        const target = findStepById(steps, stepId);
        if (!target || target.disabled) return;
        const targetIndex = flatSteps.findIndex((step) => step.id === stepId);
        const forward = targetIndex > currentStepIndex;
        emitStepChange({
          trigger: 'goTo',
          phase: 'requested',
          from: currentStep,
          to: stepId,
        });
        if (forward) {
          emitStepChange({
            trigger: 'goTo',
            phase: 'validating',
            from: currentStep,
            to: stepId,
          });
          const { ok, error } = await runValidation();
          if (!ok) {
            setValidationError(error);
            emitStepChange({
              trigger: 'goTo',
              phase: 'blocked',
              from: currentStep,
              to: stepId,
              error,
            });
            return;
          }
          emitStepChange({
            trigger: 'goTo',
            phase: 'validated',
            from: currentStep,
            to: stepId,
          });
        }
        applyTransition(stepId, { markCompleted: forward });
        emitStepChange({
          trigger: 'goTo',
          phase: 'navigated',
          from: currentStep,
          to: stepId,
        });
      },
      [
        applyTransition,
        currentStep,
        currentStepIndex,
        emitStepChange,
        flatSteps,
        runValidation,
        steps,
      ],
    );

    const skip = useCallback(() => {
      if (!currentStepObj?.skippable) return;
      const nextId = resolveNextStepId();
      if (!nextId) return;
      // Skip: no validation, no completion.
      setValidationError(undefined);
      setVisitedSteps((prev) => [...prev, nextId]);
      if (!isControlled) setUncontrolledStep(nextId);
      emitStepChange({
        trigger: 'skip',
        phase: 'navigated',
        from: currentStep,
        to: nextId,
      });
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardSkip', element: 'Wizard' });
    }, [
      sendAnalytics,
      currentStep,
      currentStepObj,
      emitStepChange,
      isControlled,
      resolveNextStepId,
    ]);

    const complete = useCallback(async () => {
      if (isValidating) return;
      emitStepChange({
        trigger: 'complete',
        phase: 'requested',
        from: currentStep,
      });
      emitStepChange({
        trigger: 'complete',
        phase: 'validating',
        from: currentStep,
      });
      const { ok, error } = await runValidation();
      if (!ok) {
        setValidationError(error);
        emitStepChange({
          trigger: 'complete',
          phase: 'blocked',
          from: currentStep,
          error,
        });
        return;
      }
      emitStepChange({
        trigger: 'complete',
        phase: 'validated',
        from: currentStep,
      });
      setCompletedSteps((prev) => {
        const nextCompleted = new Set(prev);
        nextCompleted.add(currentStep);
        return nextCompleted;
      });
      // Emit 'completed' before invoking onComplete.
      emitStepChange({
        trigger: 'complete',
        phase: 'completed',
        from: currentStep,
      });
      if (onComplete) onComplete(formValue);
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardComplete', element: 'Wizard' });
    }, [
      sendAnalytics,
      currentStep,
      emitStepChange,
      formValue,
      isValidating,
      onComplete,
      runValidation,
    ]);

    const cancel = useCallback(() => {
      emitStepChange({
        trigger: 'cancel',
        phase: 'cancelled',
        from: currentStep,
      });
      if (onCancel) {
        onCancel(formValue);
      } else {
        // Self-close; parent must change `key` to remount.
        setIsOpen(false);
      }
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardCancel', element: 'Wizard' });
    }, [sendAnalytics, currentStep, emitStepChange, formValue, onCancel]);

    // Scroll to top on step transition: container, then ancestor, then window.
    useLayoutEffect(() => {
      if (!scrollToTop) return;
      // Focus the anchor so SR announces the new step.
      if (focusAnchorRef.current) {
        focusAnchorRef.current.focus({ preventScroll: true });
      }
      const safeScrollTo = (target) => {
        if (!target || typeof target.scrollTo !== 'function') return;
        try {
          target.scrollTo({ top: 0, behavior: 'auto' });
        } catch {
          // jsdom may throw on scrollTo; ignore.
        }
      };
      const container = wizardRef.current;
      safeScrollTo(container);
      safeScrollTo(findScrollableAncestor(container));
      if (typeof window !== 'undefined') safeScrollTo(window);
    }, [currentStep, scrollToTop, wizardRef]);

    const canGoNext = !currentStepObj?.disabled && !isValidating;
    const isBlocked = !!validationError && !currentStepObj?.skippable;
    const isCompleted = completedSteps.has(currentStep);

    const contextValue = useMemo(
      () => ({
        steps,
        flatSteps,
        currentStep,
        currentStepIndex,
        currentStepObj,
        totalSteps,
        stepStates,
        formValue,
        setFormValue,
        validationError,
        isValidating,
        isBlocked,
        isCompleted,
        canGoNext,
        next,
        previous,
        goTo,
        skip,
        complete,
        cancel,
        hasCancelHandler,
        showProgress: effectiveShowProgress,
        // Internal only: `messages` is not part of the public
        // WizardContextValue but is read by internal subcomponents
        // (same pattern as `hasCancelHandler`).
        messages,
      }),
      [
        steps,
        flatSteps,
        currentStep,
        currentStepIndex,
        currentStepObj,
        totalSteps,
        stepStates,
        formValue,
        setFormValue,
        validationError,
        isValidating,
        isBlocked,
        isCompleted,
        canGoNext,
        next,
        previous,
        goTo,
        skip,
        complete,
        cancel,
        hasCancelHandler,
        effectiveShowProgress,
        messages,
      ],
    );

    // Resolve footer node (function, node, or default).
    let footerNode;
    if (typeof footer === 'function') {
      footerNode = footer({
        next,
        previous,
        goTo,
        skip,
        complete,
        cancel,
        currentStep,
        currentStepObj,
        isFirstStep,
        isLastStep,
      });
    } else if (footer !== undefined) {
      footerNode = footer;
    } else {
      footerNode = <WizardFooter />;
    }

    const containerTheme = theme.wizard?.container;
    const bodyTheme = theme.wizard?.body;
    const kindTheme = theme.wizard?.kind?.[kind];

    // Default layout: header + middle (progress + step body) + footer.
    // Header/footer stay pinned; only WizardContent scrolls internally.
    const defaultLayout = (
      <>
        <WizardHeader title={title} />
        <StyledWizardMiddle {...passThemeFlag}>
          <StyledWizardCenter maxWidth={kindTheme?.maxWidth} {...passThemeFlag}>
            <Box
              pad={bodyTheme?.pad}
              gap={bodyTheme?.gap}
              // Shrink so <WizardContent>'s `overflow: auto` engages.
              flex
              style={{ minHeight: 0 }}
            >
              {effectiveShowProgress === 'horizontal' &&
                responsiveSize !== 'small' && <WizardProgress />}
              <StyledWizardBody
                direction={
                  effectiveShowProgress === 'vertical'
                    ? 'vertical'
                    : 'horizontal'
                }
              >
                {effectiveShowProgress === 'vertical' &&
                  responsiveSize !== 'small' && <WizardProgress />}
                <StyledWizardContentColumn>
                  <StyledWizardFocusAnchor
                    ref={focusAnchorRef}
                    tabIndex={-1}
                    aria-live="polite"
                  >
                    <WizardStepHeader />
                  </StyledWizardFocusAnchor>
                  <WizardContent renderStep={renderStep} />
                </StyledWizardContentColumn>
              </StyledWizardBody>
            </Box>
          </StyledWizardCenter>
        </StyledWizardMiddle>
        {footerNode}
      </>
    );

    if (!isOpen) return null;

    return (
      <WizardContext.Provider value={contextValue}>
        <StyledWizard
          ref={wizardRef}
          id={id}
          aria-label={ariaLabel}
          role="region"
          {...passThemeFlag}
          {...rest}
        >
          {children || (
            <Box
              background={containerTheme?.background}
              pad={containerTheme?.pad}
              gap={containerTheme?.gap}
              round={containerTheme?.round}
              elevation={containerTheme?.elevation}
              // Shrink so the middle region can bound <WizardContent>.
              flex
              style={{ minHeight: 0 }}
            >
              {defaultLayout}
            </Box>
          )}
        </StyledWizard>
      </WizardContext.Provider>
    );
  },
);

Wizard.displayName = 'Wizard';
Wizard.propTypes = WizardPropTypes;

export { Wizard };
