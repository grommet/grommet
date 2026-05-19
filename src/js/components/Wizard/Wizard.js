import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box } from '../Box';
import { Grid } from '../Grid';
import { Text } from '../Text';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { WizardContent } from './WizardContent';
import { WizardContext } from './WizardContext';
import { WizardFooter } from './WizardFooter';
import { WizardHeader } from './WizardHeader';
import { WizardProgress } from './WizardProgress';
import { WizardStepHeader } from './WizardStepHeader';
import { WizardPropTypes } from './propTypes';

const MAX_SUPPORTED_STEP_LEVEL = 1;

const hasUnsupportedDepth = (steps, level = 0) =>
  steps.some((step) => {
    const children = Array.isArray(step.children) ? step.children : [];
    if (!children.length) return false;
    if (level >= MAX_SUPPORTED_STEP_LEVEL) return true;
    return hasUnsupportedDepth(children, level + 1);
  });

const flattenStepHierarchy = (steps, level = 0) =>
  steps.flatMap((step) => {
    const children =
      level < MAX_SUPPORTED_STEP_LEVEL && Array.isArray(step.children)
        ? step.children
        : [];
    return [step, ...flattenStepHierarchy(children, level + 1)];
  });

const stepIdSet = (steps) =>
  new Set(flattenStepHierarchy(steps).map((step) => step.id));

const Wizard = forwardRef(
  (
    {
      steps = [],
      // Uncontrolled mode
      defaultStep,
      // Controlled mode
      currentStep: currentStepProp,
      onStepChange,
      // Completion / cancellation
      onComplete,
      onCancel,
      // Progress display
      showProgress = false,
      // Behavior
      scrollToTop = true,
      // Content injection
      renderStep,
      // Layout
      id,
      a11yTitle,
      children,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
    const wizardTheme = theme.wizard || {};
    const warnedUnsupportedDepthRef = useRef(false);

    const isControlled = currentStepProp !== undefined;
    const linearSteps = useMemo(() => flattenStepHierarchy(steps), [steps]);
    const validStepIds = useMemo(() => stepIdSet(steps), [steps]);

    // Internal state used when currentStep is uncontrolled.
    const [internalStep, setInternalStep] = useState(
      defaultStep || linearSteps[0]?.id,
    );
    const [isValidating, setIsValidating] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [stepStates, setStepStates] = useState({});
    const [formValue, setFormValue] = useState(undefined);

    const requestedStepId = isControlled ? currentStepProp : internalStep;
    const hasValidRequestedStep = validStepIds.has(requestedStepId);
    const effectiveStepId = hasValidRequestedStep
      ? requestedStepId
      : linearSteps[0]?.id;

    useEffect(() => {
      if (
        process.env.NODE_ENV !== 'production' &&
        !warnedUnsupportedDepthRef.current &&
        hasUnsupportedDepth(steps)
      ) {
        console.warn(
          'Wizard: v1 supports at most two step levels (parent + child). ' +
            'Descendants beyond child level are ignored.',
        );
        warnedUnsupportedDepthRef.current = true;
      }
    }, [steps]);

    useEffect(() => {
      if (
        process.env.NODE_ENV !== 'production' &&
        requestedStepId !== undefined &&
        requestedStepId !== null &&
        !hasValidRequestedStep &&
        linearSteps.length
      ) {
        console.warn(
          `Wizard: invalid step id "${requestedStepId}".` +
            ` Falling back to first step "${linearSteps[0].id}".`,
        );
      }
    }, [requestedStepId, hasValidRequestedStep, linearSteps]);

    useEffect(() => {
      if (
        !isControlled &&
        effectiveStepId &&
        effectiveStepId !== internalStep
      ) {
        setInternalStep(effectiveStepId);
      }
    }, [isControlled, effectiveStepId, internalStep]);

    const activeStepId = effectiveStepId;
    const activeStepIndex = linearSteps.findIndex((s) => s.id === activeStepId);

    // Keep history of step ids visited (for "previous" navigation)
    const historyRef = useRef(activeStepId ? [activeStepId] : []);

    useEffect(() => {
      if (!activeStepId) return;
      const prev = historyRef.current;
      if (!prev.length) {
        historyRef.current = [activeStepId];
        return;
      }
      if (prev[prev.length - 1] !== activeStepId) {
        historyRef.current = [...prev, activeStepId];
      }
    }, [activeStepId]);

    // Scroll to top of Wizard after a successful step transition
    const containerRef = useForwardedRef(ref);
    const doScrollToTop = useCallback(() => {
      if (!scrollToTop) return;
      const el = containerRef.current;
      if (!el) return;
      // Container-first: scroll nearest scrollable ancestor
      let target = el.parentElement;
      while (target && target !== document.body) {
        const { overflow, overflowY } = window.getComputedStyle(target);
        if (/(auto|scroll)/.test(overflow + overflowY)) {
          target.scrollTop = 0;
          return;
        }
        target = target.parentElement;
      }
      window.scrollTo({ top: 0 });
    }, [scrollToTop, containerRef]);

    const emitStepChange = useCallback(
      (event) => {
        if (onStepChange) onStepChange(event);
      },
      [onStepChange],
    );

    const focusStepHeader = useCallback((stepId) => {
      if (!stepId || typeof document === 'undefined') return;
      requestAnimationFrame(() => {
        const heading = document.getElementById(
          `wizard-step-heading-${stepId}`,
        );
        if (heading) heading.focus();
      });
    }, []);

    const focusErrorSummary = useCallback((stepId) => {
      if (!stepId || typeof document === 'undefined') return;
      requestAnimationFrame(() => {
        const errorNode = document.getElementById(`wizard-error-${stepId}`);
        if (errorNode) errorNode.focus();
      });
    }, []);

    // Mark a step as completed in internal step state
    const markCompleted = useCallback((stepId) => {
      setStepStates((prev) => ({
        ...prev,
        [stepId]: { ...prev[stepId], completed: true, hasError: false },
      }));
    }, []);

    const markError = useCallback((stepId, error) => {
      setStepStates((prev) => ({
        ...prev,
        [stepId]: { ...prev[stepId], hasError: true, error },
      }));
    }, []);

    const clearError = useCallback((stepId) => {
      setStepStates((prev) => ({
        ...prev,
        [stepId]: { ...prev[stepId], hasError: false, error: undefined },
      }));
    }, []);

    // Perform the actual step transition
    const performTransition = useCallback(
      (fromStepId, toStepId, trigger) => {
        markCompleted(fromStepId);
        clearError(fromStepId);
        historyRef.current.push(toStepId);
        emitStepChange({
          fromStepId,
          toStepId,
          trigger,
          phase: 'completed',
        });
        if (!isControlled) setInternalStep(toStepId);
        doScrollToTop();
        focusStepHeader(toStepId);
      },
      [
        markCompleted,
        clearError,
        emitStepChange,
        isControlled,
        doScrollToTop,
        focusStepHeader,
      ],
    );

    // Validate current step and advance if valid
    const next = useCallback(async () => {
      const currentStep = linearSteps[activeStepIndex];
      if (!currentStep) return;

      emitStepChange({
        fromStepId: currentStep.id,
        toStepId: linearSteps[activeStepIndex + 1]?.id,
        trigger: 'next',
        phase: 'attempted',
      });

      setIsValidating(true);
      setIsBlocked(false);

      try {
        if (currentStep.validation) {
          await currentStep.validation(formValue);
        }

        // Resolve next step (branching support)
        let toStepId;
        if (currentStep.nextStep) {
          toStepId = currentStep.nextStep(formValue);
          if (!validStepIds.has(toStepId)) {
            const message =
              `Wizard: nextStep() returned unknown step id ` +
              `"${toStepId}". Staying on current step.`;
            if (process.env.NODE_ENV !== 'production') {
              console.warn(message);
            }
            setIsValidating(false);
            setIsBlocked(true);
            focusErrorSummary(currentStep.id);
            emitStepChange({
              fromStepId: currentStep.id,
              toStepId,
              trigger: 'next',
              phase: 'blocked',
              blocked: true,
              error: message,
            });
            return;
          }
        } else {
          toStepId = linearSteps[activeStepIndex + 1]?.id;
        }

        if (!toStepId) {
          // On final step, emit terminal blocked phase for attempted next.
          setIsValidating(false);
          emitStepChange({
            fromStepId: currentStep.id,
            toStepId: currentStep.id,
            trigger: 'next',
            phase: 'blocked',
            blocked: true,
            error: 'No next step available. Use complete() on the final step.',
          });
          return;
        }

        setIsValidating(false);
        performTransition(currentStep.id, toStepId, 'next');
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error.message : String(error);
        markError(currentStep.id, normalizedError);
        setIsBlocked(true);
        focusErrorSummary(currentStep.id);
        setIsValidating(false);
        emitStepChange({
          fromStepId: currentStep.id,
          toStepId: linearSteps[activeStepIndex + 1]?.id,
          trigger: 'next',
          phase: 'blocked',
          blocked: true,
          error: normalizedError,
        });
      }
    }, [
      linearSteps,
      activeStepIndex,
      formValue,
      emitStepChange,
      performTransition,
      markError,
      focusErrorSummary,
      validStepIds,
    ]);

    // Navigate to previous step (no validation)
    const previous = useCallback(() => {
      const currentStep = linearSteps[activeStepIndex];
      if (!currentStep || activeStepIndex === 0) return; // first step

      emitStepChange({
        fromStepId: currentStep.id,
        toStepId: linearSteps[activeStepIndex - 1]?.id,
        trigger: 'previous',
        phase: 'attempted',
      });

      let toStepId;
      const prevHistory = historyRef.current;
      if (prevHistory.length >= 2) {
        toStepId = prevHistory[prevHistory.length - 2];
        historyRef.current = prevHistory.slice(0, -1);
      } else {
        // No navigation history: fall back to linear previous
        toStepId = linearSteps[activeStepIndex - 1]?.id;
      }

      if (!toStepId) return;

      emitStepChange({
        fromStepId: currentStep.id,
        toStepId,
        trigger: 'previous',
        phase: 'completed',
      });
      if (!isControlled) setInternalStep(toStepId);
      doScrollToTop();
      focusStepHeader(toStepId);
    }, [
      linearSteps,
      activeStepIndex,
      emitStepChange,
      isControlled,
      doScrollToTop,
      focusStepHeader,
    ]);

    // Jump to a specific step
    const goTo = useCallback(
      async (toStepId) => {
        const currentStep = linearSteps[activeStepIndex];
        if (!currentStep) return;
        const toIndex = linearSteps.findIndex((s) => s.id === toStepId);

        // Same-step goTo is a no-op.
        if (toIndex === activeStepIndex) return;

        emitStepChange({
          fromStepId: currentStep.id,
          toStepId,
          trigger: 'goTo',
          phase: 'attempted',
        });

        if (toIndex === -1) {
          emitStepChange({
            fromStepId: currentStep.id,
            toStepId,
            trigger: 'goTo',
            phase: 'blocked',
            blocked: true,
            error: `Step "${toStepId}" not found`,
          });
          return;
        }

        const targetStep = linearSteps[toIndex];
        if (
          stepStates[toStepId]?.disabled ||
          targetStep?.status === 'disabled'
        ) {
          emitStepChange({
            fromStepId: currentStep.id,
            toStepId,
            trigger: 'goTo',
            phase: 'blocked',
            blocked: true,
            error: 'Target step is disabled',
          });
          return;
        }

        const isForwardNavigation = toIndex > activeStepIndex;
        if (isForwardNavigation) {
          // Validate current step before jumping forward
          setIsValidating(true);
          try {
            if (currentStep.validation) {
              await currentStep.validation(formValue);
            }
            setIsValidating(false);
            performTransition(currentStep.id, toStepId, 'goTo');
          } catch (error) {
            const normalizedError =
              error instanceof Error ? error.message : String(error);
            markError(currentStep.id, normalizedError);
            setIsBlocked(true);
            focusErrorSummary(currentStep.id);
            setIsValidating(false);
            emitStepChange({
              fromStepId: currentStep.id,
              toStepId,
              trigger: 'goTo',
              phase: 'blocked',
              blocked: true,
              error: normalizedError,
            });
          }
        } else {
          // Backward navigation: no validation
          performTransition(currentStep.id, toStepId, 'goTo');
        }
      },
      [
        linearSteps,
        activeStepIndex,
        stepStates,
        formValue,
        emitStepChange,
        performTransition,
        markError,
        focusErrorSummary,
      ],
    );

    // Skip without validation (only if step is skippable)
    const skip = useCallback(() => {
      const currentStep = linearSteps[activeStepIndex];
      if (!currentStep?.skippable) return;
      const toStepId = linearSteps[activeStepIndex + 1]?.id;
      if (!toStepId) return;

      emitStepChange({
        fromStepId: currentStep.id,
        toStepId,
        trigger: 'skip',
        phase: 'attempted',
      });
      performTransition(currentStep.id, toStepId, 'skip');
    }, [linearSteps, activeStepIndex, emitStepChange, performTransition]);

    // Complete the workflow
    const complete = useCallback(() => {
      const currentStep = linearSteps[activeStepIndex];
      if (!currentStep) return;

      emitStepChange({
        fromStepId: currentStep.id,
        trigger: 'complete',
        phase: 'attempted',
      });

      const completedSteps = linearSteps
        .filter(
          (step, index) =>
            stepStates[step.id]?.completed || index < activeStepIndex,
        )
        .map((step) => step.id);

      setIsCompleted(true);
      emitStepChange({
        fromStepId: currentStep.id,
        trigger: 'complete',
        phase: 'completed',
      });

      if (onComplete) {
        onComplete({ completedSteps, formValue });
      }
    }, [
      linearSteps,
      activeStepIndex,
      stepStates,
      formValue,
      emitStepChange,
      onComplete,
    ]);

    // Cancel the workflow
    const cancel = useCallback(() => {
      const currentStep = linearSteps[activeStepIndex];
      if (!currentStep) return;

      emitStepChange({
        fromStepId: currentStep.id,
        trigger: 'cancel',
        phase: 'attempted',
      });
      emitStepChange({
        fromStepId: currentStep.id,
        trigger: 'cancel',
        phase: 'completed',
        reason: 'user',
      });

      if (onCancel) onCancel('user');
    }, [linearSteps, activeStepIndex, emitStepChange, onCancel]);

    const navigation = useMemo(
      () => ({ next, previous, goTo, skip, complete, cancel }),
      [next, previous, goTo, skip, complete, cancel],
    );

    const contextValue = useMemo(
      () => ({
        currentStep: activeStepId,
        currentStepIndex: activeStepIndex,
        steps,
        linearSteps,
        hasOnCancel: Boolean(onCancel),
        isValidating,
        isBlocked,
        isCompleted,
        stepStates,
        formValue,
        setFormValue,
        navigation,
      }),
      [
        activeStepId,
        activeStepIndex,
        steps,
        linearSteps,
        onCancel,
        isValidating,
        isBlocked,
        isCompleted,
        stepStates,
        formValue,
        navigation,
      ],
    );

    const defaultHeader = (
      <Box gridArea="header">
        <WizardHeader>
          <Text as="h1" margin="none" weight="bold">
            {a11yTitle || 'Multi-step workflow'}
          </Text>
        </WizardHeader>
      </Box>
    );

    const currentStepDef = linearSteps[activeStepIndex];

    const defaultStepRegion = (
      <Box gridArea="step">
        <WizardStepHeader />
        <WizardContent>
          {/* Validation error */}
          {isBlocked && (
            <Box
              role="alert"
              id={`wizard-error-${activeStepId}`}
              tabIndex={-1}
              aria-live="polite"
              pad={wizardTheme.error?.pad || 'small'}
              background={wizardTheme.error?.background || 'status-error'}
              round="xsmall"
              margin={wizardTheme.error?.margin || { bottom: 'small' }}
            >
              {stepStates[activeStepId]?.error ||
                'Please fix the error before continuing.'}
            </Box>
          )}
          {renderStep && currentStepDef
            ? renderStep(currentStepDef, contextValue)
            : null}
        </WizardContent>
      </Box>
    );

    const defaultFooter = (
      <Box gridArea="footer">
        <WizardFooter />
      </Box>
    );

    const renderDefaultContract = () => {
      const baseGap = wizardTheme.container?.gap;

      if (!showProgress) {
        return (
          <Grid
            areas={[['header'], ['step'], ['footer']]}
            columns={['flex']}
            rows={['auto', 'flex', 'auto']}
            gap={baseGap}
          >
            {defaultHeader}
            {defaultStepRegion}
            {defaultFooter}
          </Grid>
        );
      }

      const progress = (
        <Box gridArea="progress">
          <WizardProgress
            direction={showProgress === 'vertical' ? 'vertical' : 'horizontal'}
          />
        </Box>
      );

      if (showProgress === 'vertical') {
        return (
          <Grid
            areas={[
              ['header', 'header'],
              ['progress', 'step'],
              ['footer', 'footer'],
            ]}
            columns={[wizardTheme.vertical?.progress?.width || 'small', 'flex']}
            rows={['auto', 'flex', 'auto']}
            gap={{
              row: baseGap,
              column: wizardTheme.vertical?.body?.gap || 'medium',
            }}
            align="start"
          >
            {defaultHeader}
            {progress}
            {defaultStepRegion}
            {defaultFooter}
          </Grid>
        );
      }

      return (
        <Grid
          areas={[['header'], ['progress'], ['step'], ['footer']]}
          columns={['flex']}
          rows={['auto', 'auto', 'flex', 'auto']}
          gap={baseGap}
        >
          {defaultHeader}
          {progress}
          {defaultStepRegion}
          {defaultFooter}
        </Grid>
      );
    };

    const renderWithProgress = () => {
      // In custom composition mode, consumers place WizardProgress explicitly.
      if (children) return children;
      return renderDefaultContract();
    };

    return (
      <WizardContext.Provider value={contextValue}>
        <Box
          ref={containerRef}
          id={id}
          role="region"
          aria-label={a11yTitle || 'Multi-step workflow'}
          aria-busy={isValidating}
          background={wizardTheme.container?.background}
          gap={wizardTheme.container?.gap}
          pad={wizardTheme.container?.pad}
          {...rest}
        >
          {renderWithProgress()}
        </Box>
      </WizardContext.Provider>
    );
  },
);

Wizard.displayName = 'Wizard';
Wizard.propTypes = WizardPropTypes;

export { Wizard };
