// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
      const match = findStepById(step.children, id);
      if (match) return match;
    }
  }
  return undefined;
};

const formHasErrors = (result) =>
  Object.keys(result?.form?.errors || {}).length > 0;

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
      clickableSteps = false,
      closable = true,
      currentStep: currentStepProp,
      defaultStep,
      form = true,
      showProgress = false,
      onStepChange,
      onComplete,
      onCancel,
      renderStep,
      title,
      footer,
      scrollToTop = true,
      value: valueProp,
      defaultValue,
      onChange,
      id,
      'aria-label': ariaLabel,
      messages,
      children,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
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

    useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'Warning: Wizard is currently in beta. The API is subject ' +
            'to change in future releases.',
        );
      }
    }, []);

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

    const flatSteps = useMemo(() => flattenLeaves(steps), [steps]);
    const firstEnabled =
      flatSteps.find((step) => !step.disabled) || flatSteps[0];

    const isControlled = currentStepProp !== undefined;
    const [uncontrolledStep, setUncontrolledStep] = useState(
      defaultStep || firstEnabled?.id,
    );
    const currentStep = isControlled ? currentStepProp : uncontrolledStep;
    const latest = useRef({ currentStep, steps });
    latest.current = { currentStep, steps };
    const mounted = useRef(false);
    const navigationVersion = useRef(0);
    const validationInFlight = useRef();
    const formValidators = useRef(new Map());

    useLayoutEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useLayoutEffect(() => {
      navigationVersion.current += 1;
    }, [currentStep]);

    const registerForm = useCallback((stepId, validateForm) => {
      formValidators.current.set(stepId, validateForm);
      return () => {
        if (formValidators.current.get(stepId) === validateForm)
          formValidators.current.delete(stepId);
      };
    }, []);

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
        if (onChange) onChange({ value: resolved });
      },
      [formValue, isValueControlled, onChange],
    );

    const [completedSteps, setCompletedSteps] = useState(() => new Set());
    const [stepValidation, setStepValidation] = useState({});
    const updateValidation = useCallback((stepId, source, result) => {
      if (!mounted.current || !findStepById(latest.current.steps, stepId))
        return;
      setStepValidation((previousResults) => ({
        ...previousResults,
        [stepId]: { ...previousResults[stepId], [source]: result },
      }));
      if (result.ok === false) {
        setCompletedSteps((previousCompleted) => {
          if (!previousCompleted.has(stepId)) return previousCompleted;
          const nextCompleted = new Set(previousCompleted);
          nextCompleted.delete(stepId);
          return nextCompleted;
        });
      }
    }, []);
    const currentValidation = stepValidation[currentStep];
    const validationError =
      !formHasErrors(currentValidation) &&
      currentValidation?.callback?.ok === false
        ? currentValidation.callback.error
        : undefined;
    const [isValidating, setIsValidating] = useState(false);
    // Without `onCancel`, cancel self-closes the wizard.
    const [isOpen, setIsOpen] = useState(true);
    const hasCancelHandler = onCancel !== undefined;

    useEffect(() => {
      if (
        validationInFlight.current &&
        !findStepById(steps, validationInFlight.current.stepId)
      )
        validationInFlight.current.removed = true;
      setStepValidation((previousResults) => {
        const entries = Object.entries(previousResults).filter(([stepId]) =>
          findStepById(steps, stepId),
        );
        return entries.length === Object.keys(previousResults).length
          ? previousResults
          : Object.fromEntries(entries);
      });
      setCompletedSteps((previousCompleted) => {
        const remaining = Array.from(previousCompleted).filter((stepId) =>
          findStepById(steps, stepId),
        );
        return remaining.length === previousCompleted.size
          ? previousCompleted
          : new Set(remaining);
      });
    }, [steps]);

    const currentStepObj = useMemo(
      () => findStepById(steps, currentStep),
      [steps, currentStep],
    );

    const currentStepIndex = useMemo(
      () => flatSteps.findIndex((step) => step.id === currentStep),
      [flatSteps, currentStep],
    );

    const totalSteps = flatSteps.length;

    const statusFromStep = useCallback(
      (step) => {
        if (!step) return 'pending';
        if (step.disabled) return 'disabled';
        if (step.status) return step.status;
        if (
          formHasErrors(stepValidation[step.id]) ||
          stepValidation[step.id]?.callback?.ok === false
        )
          return 'error';
        if (completedSteps.has(step.id)) return 'completed';
        return 'pending';
      },
      [stepValidation, completedSteps],
    );

    // Derive step status; parents aggregate from their children.
    const getStepStatus = useCallback(
      (stepId) => {
        // Parent-with-children aggregate
        const step = findStepById(steps, stepId);
        if (step?.disabled || step?.status) return statusFromStep(step);
        const parent = step?.children?.length > 0;
        if (parent) {
          const childStatuses = step.children.map(statusFromStep);
          if (childStatuses.some((status) => status === 'error'))
            return 'error';
          if (childStatuses.every((status) => status === 'completed'))
            return 'completed';
          if (childStatuses.every((status) => status === 'disabled'))
            return 'disabled';
          return 'pending';
        }
        return statusFromStep(step);
      },
      [steps, statusFromStep],
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

    const stepErrorMessages = useMemo(() => {
      const record = {};
      const walk = (nodes) => {
        nodes.forEach((node) => {
          record[node.id] =
            stepStates[node.id] === 'error'
              ? node.errorMessage ??
                (formHasErrors(stepValidation[node.id])
                  ? undefined
                  : stepValidation[node.id]?.callback?.error)
              : undefined;
          if (node.children?.length) walk(node.children);
        });
      };
      walk(steps);
      return record;
    }, [steps, stepStates, stepValidation]);

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
      let nextIndex = currentStepIndex + 1;
      while (nextIndex < flatSteps.length) {
        const nextStep = flatSteps[nextIndex];
        if (!nextStep?.disabled) return nextStep.id;
        if (nextStep?.disabled && (clickableSteps || nextStep?.skippable)) {
          nextIndex += 1;
        } else {
          return undefined;
        }
      }
      return undefined;
    }, [
      clickableSteps,
      currentStepObj,
      currentStepIndex,
      flatSteps,
      formValue,
      steps,
    ]);

    const resolvePreviousStepId = useCallback(() => {
      let prevIndex = currentStepIndex - 1;
      while (prevIndex >= 0) {
        const prevStep = flatSteps[prevIndex];
        if (!prevStep?.disabled) return prevStep.id;
        prevIndex -= 1;
      }
      return undefined;
    }, [currentStepIndex, flatSteps]);

    // Apply a navigation transition (id, history, completion, focus).
    const applyTransition = useCallback(
      (nextId, { markCompleted } = {}) => {
        if (!nextId) return;
        navigationVersion.current += 1;
        if (markCompleted && currentStep) {
          setCompletedSteps((prev) => {
            const next = new Set(prev);
            next.add(currentStep);
            return next;
          });
        }
        if (!isControlled) setUncontrolledStep(nextId);
      },
      [currentStep, isControlled],
    );

    // Run step.validate (sync or async). Returns { ok, error }.
    const runStepValidation = useCallback(async () => {
      if (typeof currentStepObj?.validate !== 'function') {
        return { ok: true };
      }
      try {
        const result = await currentStepObj.validate(formValue);
        if (result === true || result === undefined) return { ok: true };
        if (result === false) {
          return {
            ok: false,
            error: format({ id: 'wizard.validationError', messages }),
          };
        }
        if (typeof result === 'string') return { ok: false, error: result };
        if (result && typeof result === 'object' && result.error)
          return { ok: false, error: result.error };
        return { ok: true };
      } catch (err) {
        return {
          ok: false,
          error:
            err?.message || format({ id: 'wizard.validationError', messages }),
        };
      }
    }, [currentStepObj, formValue, format, messages]);

    const runValidation = useCallback(async () => {
      if (validationInFlight.current) return { cancelled: true };
      const attempt = {
        stepId: currentStep,
        version: navigationVersion.current,
      };
      validationInFlight.current = attempt;
      setIsValidating(true);
      const isStale = () =>
        !mounted.current ||
        attempt.removed ||
        latest.current.currentStep !== attempt.stepId ||
        navigationVersion.current !== attempt.version ||
        !findStepById(latest.current.steps, attempt.stepId);
      try {
        const validateForm = form && formValidators.current.get(currentStep);
        if (validateForm) {
          const result = await validateForm();
          if (result.cancelled) return { cancelled: true };
          if (!result.ok) return { ok: false, cancelled: isStale() };
          if (isStale()) return { cancelled: true };
        }
        const result = await runStepValidation();
        if (!attempt.removed)
          updateValidation(attempt.stepId, 'callback', result);
        return { ...result, cancelled: isStale() };
      } finally {
        validationInFlight.current = undefined;
        if (mounted.current) setIsValidating(false);
      }
    }, [currentStep, form, runStepValidation, updateValidation]);

    const next = useCallback(async () => {
      if (validationInFlight.current || currentStepObj?.disabled) return;
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
      const { ok, error, cancelled } = await runValidation();
      if (cancelled) return;
      if (!ok && !currentStepObj?.skippable) {
        emitStepChange({
          trigger: 'next',
          phase: 'blocked',
          from: currentStep,
          error,
        });
        return;
      }
      if (ok)
        emitStepChange({
          trigger: 'next',
          phase: 'validated',
          from: currentStep,
        });
      const nextId = resolveNextStepId();
      if (!nextId) return;
      applyTransition(nextId, { markCompleted: ok });
      emitStepChange({
        trigger: 'next',
        phase: 'navigated',
        from: currentStep,
        to: nextId,
        ...(!ok && error ? { error } : {}),
      });
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardNext', element: 'Wizard' });
    }, [
      sendAnalytics,
      applyTransition,
      currentStep,
      currentStepObj,
      emitStepChange,
      resolveNextStepId,
      runValidation,
    ]);

    const previous = useCallback(() => {
      const dest = resolvePreviousStepId();
      if (!dest) return;
      navigationVersion.current += 1;
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
      resolvePreviousStepId,
      emitStepChange,
      isControlled,
    ]);

    const goTo = useCallback(
      async (stepId) => {
        if (!stepId || stepId === currentStep) return;
        const target = findStepById(steps, stepId);
        if (!target || target.disabled) return;
        const targetIndex = flatSteps.findIndex((step) => step.id === stepId);
        if (targetIndex < 0) return;
        const forward = targetIndex > currentStepIndex;
        let markCompleted = false;
        let navigationError;
        if (forward && validationInFlight.current) return;
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
          const { ok, error, cancelled } = await runValidation();
          if (cancelled) return;
          if (!ok && !currentStepObj?.skippable) {
            emitStepChange({
              trigger: 'goTo',
              phase: 'blocked',
              from: currentStep,
              to: stepId,
              error,
            });
            return;
          }
          markCompleted = ok;
          navigationError = error;
          if (ok)
            emitStepChange({
              trigger: 'goTo',
              phase: 'validated',
              from: currentStep,
              to: stepId,
            });
        }
        applyTransition(stepId, { markCompleted });
        emitStepChange({
          trigger: 'goTo',
          phase: 'navigated',
          from: currentStep,
          to: stepId,
          ...(navigationError ? { error: navigationError } : {}),
        });
      },
      [
        applyTransition,
        currentStep,
        currentStepIndex,
        currentStepObj,
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
      navigationVersion.current += 1;
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
      if (validationInFlight.current || currentStepObj?.disabled) return;
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
      const { ok, error, cancelled } = await runValidation();
      if (cancelled) return;
      if (!ok && !currentStepObj?.skippable) {
        emitStepChange({
          trigger: 'complete',
          phase: 'blocked',
          from: currentStep,
          error,
        });
        return;
      }
      if (ok)
        emitStepChange({
          trigger: 'complete',
          phase: 'validated',
          from: currentStep,
        });
      if (ok)
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
      if (onComplete) {
        // setCompletedSteps above is async; include currentStep here so the
        // payload reflects the just-completed final step.
        const nextCompleted = new Set(completedSteps);
        if (ok) nextCompleted.add(currentStep);
        else nextCompleted.delete(currentStep);
        const completedStepsList = Array.from(nextCompleted);
        onComplete({ value: formValue, completedSteps: completedStepsList });
      }
      if (sendAnalytics)
        sendAnalytics({ type: 'wizardComplete', element: 'Wizard' });
    }, [
      sendAnalytics,
      completedSteps,
      currentStep,
      currentStepObj,
      emitStepChange,
      formValue,
      onComplete,
      runValidation,
    ]);

    const cancel = useCallback(() => {
      navigationVersion.current += 1;
      emitStepChange({
        trigger: 'cancel',
        phase: 'cancelled',
        from: currentStep,
      });
      if (onCancel) {
        onCancel({ value: formValue, reason: 'user' });
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
      // Focus the anchor rendered by WizardStepHeader so screen readers
      // announce the new step. The anchor is located via a data attribute
      // so composed layouts get the same behavior for free.
      wizardRef.current
        ?.querySelector('[data-g-wizard-focus-anchor]')
        ?.focus({ preventScroll: true });
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
    const isBlocked =
      (currentValidation?.form?.ok === false ||
        currentValidation?.callback?.ok === false) &&
      !currentStepObj?.skippable;
    const isCompleted = completedSteps.has(currentStep);

    const contextValue = useMemo(
      () => ({
        steps,
        flatSteps,
        clickableSteps,
        closable,
        currentStep,
        currentStepIndex,
        currentStepObj,
        totalSteps,
        stepStates,
        stepErrorMessages,
        stepValidation,
        updateValidation,
        registerForm,
        form,
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
        renderStep,
        // Internal only: `messages` is not part of the public
        // WizardContextValue but is read by internal subcomponents
        // (same pattern as `hasCancelHandler`).
        messages,
      }),
      [
        steps,
        flatSteps,
        clickableSteps,
        closable,
        currentStep,
        currentStepIndex,
        currentStepObj,
        totalSteps,
        stepStates,
        stepErrorMessages,
        stepValidation,
        updateValidation,
        registerForm,
        form,
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
        renderStep,
        messages,
      ],
    );

    if (!isOpen) return null;

    // Custom composition: consumers supply their own tree via `children`.
    let content = children;

    if (!content) {
      const footerNode = footer ?? <WizardFooter />;

      const bodyTheme = theme.wizard?.body;

      // Default layout: header + middle (progress + step body) + footer.
      // Header/footer stay pinned; only WizardContent scrolls internally.
      content = (
        <Box {...theme.wizard?.container} flex>
          <>
            <WizardHeader title={title} />
            <Box
              align="center"
              flex={{ grow: 1, shrink: 1 }}
              fill="horizontal"
              overflow="auto"
            >
              <Box
                pad={bodyTheme?.pad}
                gap={bodyTheme?.gap}
                flex="grow"
                fill="horizontal"
                direction={
                  effectiveShowProgress === 'vertical' ? 'row' : 'column'
                }
              >
                {effectiveShowProgress &&
                  responsiveSize !== 'small' &&
                  responsiveSize !== 'xsmall' && <WizardProgress />}
                <Box flex="grow">
                  <WizardStepHeader />
                  <WizardContent />
                </Box>
              </Box>
            </Box>
            {footerNode}
          </>
        </Box>
      );
    }
    return (
      <WizardContext.Provider value={contextValue}>
        <Box
          ref={wizardRef}
          id={id}
          aria-label={ariaLabel}
          role="region"
          flex={{ grow: 1, shrink: 1 }}
          {...rest}
        >
          {content}
        </Box>
      </WizardContext.Provider>
    );
  },
);

Wizard.displayName = 'Wizard';
Wizard.propTypes = WizardPropTypes;

export { Wizard };
